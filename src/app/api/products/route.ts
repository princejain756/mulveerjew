import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  category_id?: number;
  stock_quantity: number;
  weight?: number;
  purity?: string;
  material?: string;
  images?: string[];
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// GET /api/products - Get all products (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    let sql = `
      SELECT p.*, c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = true
    `;
    const params: any[] = [];

    if (category) {
      sql += ' AND c.name = ?';
      params.push(category);
    }

    sql += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [products] = await query(sql, params);

    return NextResponse.json({ products });

  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/products - Create product (admin only)
export async function POST(request: NextRequest) {
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
      images
    } = body;

    // Validate required fields
    if (!name || !description || !price || stock_quantity === undefined) {
      return NextResponse.json(
        { error: 'Name, description, price, and stock quantity are required' },
        { status: 400 }
      );
    }

    const sql = `
      INSERT INTO products (name, description, price, discount_price, category_id, stock_quantity, weight, purity, material, images)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name,
      description,
      price,
      discount_price || null,
      category_id || null,
      stock_quantity,
      weight || null,
      purity || null,
      material || null,
      images ? JSON.stringify(images) : null,
    ];

    const result = await query(sql, values);

    return NextResponse.json(
      {
        message: 'Product created successfully',
        productId: result.insertId
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}