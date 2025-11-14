import { query } from './db';
import { getProductById, Product } from './products';

export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  product?: Product;
  added_at: Date;
}

// Add to cart
export async function addToCart(userId: number, productId: number, quantity: number = 1): Promise<CartItem> {
  // Check if product exists and has stock
  const product = await getProductById(productId);
  if (!product) throw new Error('Product not found');
  if (product.stock_quantity < quantity) throw new Error('Insufficient stock');

  // Check if item already in cart
  const existing = await query(
    'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
    [userId, productId]
  );

  if (existing && existing.length > 0) {
    // Update quantity
    const newQuantity = existing[0].quantity + quantity;
    if (product.stock_quantity < newQuantity) throw new Error('Insufficient stock');
    
    await query(
      'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
      [newQuantity, userId, productId]
    );
  } else {
    // Add new item
    await query(
      'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
      [userId, productId, quantity]
    );
  }

  const items = await query(
    'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
    [userId, productId]
  );

  return items[0];
}

// Get cart items
export async function getCartItems(userId: number): Promise<CartItem[]> {
  const items = await query(
    'SELECT * FROM cart WHERE user_id = ? ORDER BY added_at DESC',
    [userId]
  );

  // Enrich with product data
  const enrichedItems = await Promise.all(
    items.map(async (item: any) => {
      const product = await getProductById(item.product_id);
      return { ...item, product };
    })
  );

  return enrichedItems;
}

// Update cart item quantity
export async function updateCartItemQuantity(userId: number, productId: number, quantity: number): Promise<CartItem | null> {
  if (quantity <= 0) {
    await removeFromCart(userId, productId);
    return null;
  }

  // Check stock
  const product = await getProductById(productId);
  if (!product) throw new Error('Product not found');
  if (product.stock_quantity < quantity) throw new Error('Insufficient stock');

  await query(
    'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
    [quantity, userId, productId]
  );

  const items = await query(
    'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
    [userId, productId]
  );

  return items && items.length > 0 ? items[0] : null;
}

// Remove from cart
export async function removeFromCart(userId: number, productId: number): Promise<boolean> {
  await query(
    'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
    [userId, productId]
  );
  return true;
}

// Clear cart
export async function clearCart(userId: number): Promise<boolean> {
  await query('DELETE FROM cart WHERE user_id = ?', [userId]);
  return true;
}

// Get cart total
export async function getCartTotal(userId: number): Promise<{
  subtotal: number;
  itemCount: number;
  items: CartItem[];
}> {
  const items = await getCartItems(userId);
  
  let subtotal = 0;
  items.forEach((item: any) => {
    if (item.product) {
      const price = item.product.discount_price || item.product.price;
      subtotal += price * item.quantity;
    }
  });

  return {
    subtotal,
    itemCount: items.length,
    items,
  };
}
