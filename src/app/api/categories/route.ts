import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  try {
    const categories = await query(
      'SELECT id, name, description FROM categories ORDER BY name ASC',
      [],
    );

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Fetch categories error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 },
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 },
      );
    }

    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const description =
      typeof body.description === 'string' ? body.description.trim() : '';

    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 },
      );
    }

    const result: any = await query(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [name, description || null],
    );

    const newId = result.insertId;
    const categoryRows = await query(
      'SELECT id, name, description FROM categories WHERE id = ?',
      [newId],
    );
    const category = Array.isArray(categoryRows) ? categoryRows[0] : categoryRows;

    return NextResponse.json(
      {
        message: 'Category created successfully',
        category,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Create category error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
