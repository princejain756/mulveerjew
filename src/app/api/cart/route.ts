import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  added_at: Date;
  product?: {
    id: number;
    name: string;
    price: number;
    discount_price?: number;
    images?: string[];
  };
}

// GET /api/cart - Get user's cart
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const userId = decoded.userId;

    const sql = `
      SELECT
        c.*,
        p.name,
        p.price,
        p.discount_price,
        p.images,
        p.stock_quantity
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ? AND p.is_active = true
      ORDER BY c.added_at DESC
    `;

    const [cartItems] = await query(sql, [userId]);

    // Parse images JSON
    const formattedCart = cartItems.map((item: any) => ({
      ...item,
      product: {
        id: item.product_id,
        name: item.name,
        price: item.price,
        discount_price: item.discount_price,
        images: item.images ? JSON.parse(item.images) : [],
        stock_quantity: item.stock_quantity,
      }
    }));

    return NextResponse.json({ cart: formattedCart });

  } catch (error) {
    console.error('Get cart error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/cart - Add item to cart
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const userId = decoded.userId;
    const body = await request.json();
    const { product_id, quantity = 1 } = body;

    // Validate input
    if (!product_id || quantity < 1) {
      return NextResponse.json(
        { error: 'Valid product ID and quantity are required' },
        { status: 400 }
      );
    }

    // Check if product exists and is active
    const [products] = await query(
      'SELECT id, stock_quantity FROM products WHERE id = ? AND is_active = true',
      [product_id]
    );

    if (!products || products.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const product = products[0];

    // Check stock availability
    if (product.stock_quantity < quantity) {
      return NextResponse.json(
        { error: 'Insufficient stock' },
        { status: 400 }
      );
    }

    // Check if item already exists in cart
    const [existing] = await query(
      'SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ?',
      [userId, product_id]
    );

    if (existing && existing.length > 0) {
      // Update quantity
      const newQuantity = existing[0].quantity + quantity;

      // Check if new quantity exceeds stock
      if (newQuantity > product.stock_quantity) {
        return NextResponse.json(
          { error: 'Insufficient stock for requested quantity' },
          { status: 400 }
        );
      }

      await query(
        'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
        [newQuantity, userId, product_id]
      );

      return NextResponse.json({ message: 'Cart updated successfully' });
    } else {
      // Add new item to cart
      await query(
        'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [userId, product_id, quantity]
      );

      return NextResponse.json(
        { message: 'Item added to cart successfully' },
        { status: 201 }
      );
    }

  } catch (error) {
    console.error('Add to cart error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/cart - Update cart item quantity
export async function PUT(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const userId = decoded.userId;
    const body = await request.json();
    const { product_id, quantity } = body;

    // Validate input
    if (!product_id || quantity < 0) {
      return NextResponse.json(
        { error: 'Valid product ID and quantity are required' },
        { status: 400 }
      );
    }

    // Check if item exists in cart
    const [existing] = await query(
      'SELECT id FROM cart WHERE user_id = ? AND product_id = ?',
      [userId, product_id]
    );

    if (!existing || existing.length === 0) {
      return NextResponse.json(
        { error: 'Item not found in cart' },
        { status: 404 }
      );
    }

    if (quantity === 0) {
      // Remove item from cart
      await query(
        'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
        [userId, product_id]
      );
      return NextResponse.json({ message: 'Item removed from cart' });
    } else {
      // Check stock availability
      const [products] = await query(
        'SELECT stock_quantity FROM products WHERE id = ? AND is_active = true',
        [product_id]
      );

      if (!products || products.length === 0 || products[0].stock_quantity < quantity) {
        return NextResponse.json(
          { error: 'Insufficient stock' },
          { status: 400 }
        );
      }

      // Update quantity
      await query(
        'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
        [quantity, userId, product_id]
      );

      return NextResponse.json({ message: 'Cart updated successfully' });
    }

  } catch (error) {
    console.error('Update cart error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/cart - Clear cart or remove specific item
export async function DELETE(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const userId = decoded.userId;
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('product_id');

    if (productId) {
      // Remove specific item
      await query(
        'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );
      return NextResponse.json({ message: 'Item removed from cart' });
    } else {
      // Clear entire cart
      await query('DELETE FROM cart WHERE user_id = ?', [userId]);
      return NextResponse.json({ message: 'Cart cleared successfully' });
    }

  } catch (error) {
    console.error('Delete cart error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}