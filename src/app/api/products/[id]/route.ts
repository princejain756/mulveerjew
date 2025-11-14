import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// GET /api/products/[id] - Get single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;

    const sql = `
      SELECT p.*, c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ? AND p.is_active = true
    `;

    const [products] = await query(sql, [productId]);

    if (!products || products.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const product = products[0];
    if (product.images) {
      product.images = JSON.parse(product.images);
    }

    return NextResponse.json({ product });

  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Update product (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const productId = params.id;
    const body = await request.json();

    const {
      name,
      description,
      price,
      discount_price,
      category_id,
      stock_quantity,
      weight,
      purity,
      material,
      images,
      is_active
    } = body;

    // Check if product exists
    const [existing] = await query('SELECT id FROM products WHERE id = ?', [productId]);
    if (!existing || existing.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Build update query
    const fields = [];
    const values = [];

    if (name !== undefined) {
      fields.push('name = ?');
      values.push(name);
    }
    if (description !== undefined) {
      fields.push('description = ?');
      values.push(description);
    }
    if (price !== undefined) {
      fields.push('price = ?');
      values.push(price);
    }
    if (discount_price !== undefined) {
      fields.push('discount_price = ?');
      values.push(discount_price);
    }
    if (category_id !== undefined) {
      fields.push('category_id = ?');
      values.push(category_id);
    }
    if (stock_quantity !== undefined) {
      fields.push('stock_quantity = ?');
      values.push(stock_quantity);
    }
    if (weight !== undefined) {
      fields.push('weight = ?');
      values.push(weight);
    }
    if (purity !== undefined) {
      fields.push('purity = ?');
      values.push(purity);
    }
    if (material !== undefined) {
      fields.push('material = ?');
      values.push(material);
    }
    if (images !== undefined) {
      fields.push('images = ?');
      values.push(JSON.stringify(images));
    }
    if (is_active !== undefined) {
      fields.push('is_active = ?');
      values.push(is_active);
    }

    if (fields.length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    values.push(productId);
    const sql = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`;

    await query(sql, values);

    return NextResponse.json({ message: 'Product updated successfully' });

  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete product (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const productId = params.id;

    // Check if product exists
    const [existing] = await query('SELECT id FROM products WHERE id = ?', [productId]);
    if (!existing || existing.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Soft delete by setting is_active to false
    await query('UPDATE products SET is_active = false WHERE id = ?', [productId]);

    return NextResponse.json({ message: 'Product deleted successfully' });

  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}