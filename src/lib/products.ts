import { query } from './db';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  category_id: number;
  stock_quantity: number;
  weight: number | null;
  purity: string | null;
  material: string | null;
  images: string[];
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// Get all products
export async function getAllProducts(): Promise<Product[]> {
  const products = await query('SELECT * FROM products WHERE is_active = TRUE ORDER BY created_at DESC');
  return products.map((p: any) => ({
    ...p,
    images: p.images ? JSON.parse(p.images) : [],
  }));
}

// Get product by ID
export async function getProductById(id: number): Promise<Product | null> {
  const products = await query('SELECT * FROM products WHERE id = ? AND is_active = TRUE', [id]);
  if (!products || products.length === 0) return null;
  
  const product = products[0];
  return {
    ...product,
    images: product.images ? JSON.parse(product.images) : [],
  };
}

// Get products by category
export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  const products = await query(
    'SELECT * FROM products WHERE category_id = ? AND is_active = TRUE ORDER BY created_at DESC',
    [categoryId]
  );
  return products.map((p: any) => ({
    ...p,
    images: p.images ? JSON.parse(p.images) : [],
  }));
}

// Create product (admin only)
export async function createProduct(productData: {
  name: string;
  description: string;
  price: number;
  discount_price?: number | null;
  category_id: number;
  stock_quantity: number;
  weight?: number | null;
  purity?: string | null;
  material?: string | null;
  images?: string[];
}): Promise<Product> {
  const sql = `
    INSERT INTO products (name, description, price, discount_price, category_id, stock_quantity, weight, purity, material, images)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    productData.name,
    productData.description,
    productData.price,
    productData.discount_price || null,
    productData.category_id,
    productData.stock_quantity,
    productData.weight || null,
    productData.purity || null,
    productData.material || null,
    JSON.stringify(productData.images || []),
  ];

  const result = await query(sql, values);
  const productId = result.insertId;

  const created = await getProductById(productId);
  if (!created) throw new Error('Failed to create product');
  return created;
}

// Update product (admin only)
export async function updateProduct(
  id: number,
  updates: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>
): Promise<Product> {
  const fields = [];
  const values = [];

  if (updates.name !== undefined) {
    fields.push('name = ?');
    values.push(updates.name);
  }
  if (updates.description !== undefined) {
    fields.push('description = ?');
    values.push(updates.description);
  }
  if (updates.price !== undefined) {
    fields.push('price = ?');
    values.push(updates.price);
  }
  if (updates.discount_price !== undefined) {
    fields.push('discount_price = ?');
    values.push(updates.discount_price);
  }
  if (updates.category_id !== undefined) {
    fields.push('category_id = ?');
    values.push(updates.category_id);
  }
  if (updates.stock_quantity !== undefined) {
    fields.push('stock_quantity = ?');
    values.push(updates.stock_quantity);
  }
  if (updates.weight !== undefined) {
    fields.push('weight = ?');
    values.push(updates.weight);
  }
  if (updates.purity !== undefined) {
    fields.push('purity = ?');
    values.push(updates.purity);
  }
  if (updates.material !== undefined) {
    fields.push('material = ?');
    values.push(updates.material);
  }
  if (updates.images !== undefined) {
    fields.push('images = ?');
    values.push(JSON.stringify(updates.images));
  }
  if (updates.is_active !== undefined) {
    fields.push('is_active = ?');
    values.push(updates.is_active);
  }

  if (fields.length === 0) throw new Error('No fields to update');

  values.push(id);
  const sql = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`;
  await query(sql, values);

  const updated = await getProductById(id);
  if (!updated) throw new Error('Failed to update product');
  return updated;
}

// Delete product (soft delete)
export async function deleteProduct(id: number): Promise<boolean> {
  await query('UPDATE products SET is_active = FALSE WHERE id = ?', [id]);
  return true;
}

// Search products
export async function searchProducts(searchTerm: string): Promise<Product[]> {
  const products = await query(
    'SELECT * FROM products WHERE is_active = TRUE AND (name LIKE ? OR description LIKE ?) ORDER BY created_at DESC',
    [`%${searchTerm}%`, `%${searchTerm}%`]
  );
  return products.map((p: any) => ({
    ...p,
    images: p.images ? JSON.parse(p.images) : [],
  }));
}
