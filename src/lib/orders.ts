import { query } from './db';

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: number;
  user_id: number;
  order_number: string;
  total_amount: number;
  shipping_amount: number;
  discount_amount: number;
  final_amount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_method: 'razorpay' | 'cod';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
  shipping_phone?: string;
  order_notes?: string;
  ordered_at: Date;
  updated_at: Date;
  items?: OrderItem[];
}

// Generate unique order number
function generateOrderNumber(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

// Create order
export async function createOrder(orderData: {
  user_id: number;
  total_amount: number;
  shipping_amount: number;
  discount_amount: number;
  final_amount: number;
  payment_method: 'razorpay' | 'cod';
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
  shipping_phone?: string;
  order_notes?: string;
  items: Array<{
    product_id: number;
    quantity: number;
    price: number;
    total: number;
  }>;
}): Promise<Order> {
  const orderNumber = generateOrderNumber();

  const orderSql = `
    INSERT INTO orders (
      user_id, order_number, total_amount, shipping_amount, 
      discount_amount, final_amount, payment_method, 
      shipping_address, shipping_city, shipping_state, shipping_pincode, shipping_phone, order_notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const orderValues = [
    orderData.user_id,
    orderNumber,
    orderData.total_amount,
    orderData.shipping_amount,
    orderData.discount_amount,
    orderData.final_amount,
    orderData.payment_method,
    orderData.shipping_address,
    orderData.shipping_city,
    orderData.shipping_state,
    orderData.shipping_pincode,
    orderData.shipping_phone || null,
    orderData.order_notes || null,
  ];

  const orderResult = await query(orderSql, orderValues);
  const orderId = orderResult.insertId;

  // Insert order items
  for (const item of orderData.items) {
    const itemSql = `
      INSERT INTO order_items (order_id, product_id, quantity, price, total)
      VALUES (?, ?, ?, ?, ?)
    `;
    await query(itemSql, [orderId, item.product_id, item.quantity, item.price, item.total]);
  }

  return getOrderById(orderId) as Promise<Order>;
}

// Get order by ID
export async function getOrderById(id: number): Promise<Order | null> {
  const orders = await query('SELECT * FROM orders WHERE id = ?', [id]);
  if (!orders || orders.length === 0) return null;

  const order = orders[0];
  const items = await query('SELECT * FROM order_items WHERE order_id = ?', [id]);

  return {
    ...order,
    items: items || [],
  };
}

// Get orders by user ID
export async function getOrdersByUserId(userId: number): Promise<Order[]> {
  const orders = await query(
    'SELECT * FROM orders WHERE user_id = ? ORDER BY ordered_at DESC',
    [userId]
  );

  const ordersWithItems = await Promise.all(
    orders.map(async (order: any) => {
      const items = await query('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
      return { ...order, items: items || [] };
    })
  );

  return ordersWithItems;
}

// Get all orders (admin)
export async function getAllOrders(): Promise<Order[]> {
  const orders = await query('SELECT * FROM orders ORDER BY ordered_at DESC');

  const ordersWithItems = await Promise.all(
    orders.map(async (order: any) => {
      const items = await query('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
      return { ...order, items: items || [] };
    })
  );

  return ordersWithItems;
}

// Update order status
export async function updateOrderStatus(
  id: number,
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
): Promise<Order | null> {
  await query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
  return getOrderById(id);
}

// Update payment status
export async function updatePaymentStatus(
  id: number,
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
): Promise<Order | null> {
  await query('UPDATE orders SET payment_status = ? WHERE id = ?', [paymentStatus, id]);
  return getOrderById(id);
}

// Cancel order
export async function cancelOrder(id: number): Promise<Order | null> {
  const order = await getOrderById(id);
  if (!order) return null;

  // Can only cancel pending or confirmed orders
  if (order.status !== 'pending' && order.status !== 'confirmed') {
    throw new Error('Cannot cancel order with status: ' + order.status);
  }

  // Refund if payment was made
  if (order.payment_method === 'razorpay' && order.payment_status === 'paid') {
    await updatePaymentStatus(id, 'refunded');
  }

  return updateOrderStatus(id, 'cancelled');
}

// Get order analytics
export async function getOrderAnalytics(): Promise<{
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  averageOrderValue: number;
}> {
  const stats = await query(`
    SELECT 
      COUNT(*) as totalOrders,
      SUM(final_amount) as totalRevenue,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pendingOrders,
      SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) as completedOrders,
      SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelledOrders,
      AVG(final_amount) as averageOrderValue
    FROM orders
  `);

  if (!stats || stats.length === 0) {
    return {
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      completedOrders: 0,
      cancelledOrders: 0,
      averageOrderValue: 0,
    };
  }

  return {
    totalOrders: stats[0].totalOrders || 0,
    totalRevenue: parseFloat(stats[0].totalRevenue) || 0,
    pendingOrders: stats[0].pendingOrders || 0,
    completedOrders: stats[0].completedOrders || 0,
    cancelledOrders: stats[0].cancelledOrders || 0,
    averageOrderValue: parseFloat(stats[0].averageOrderValue) || 0,
  };
}
