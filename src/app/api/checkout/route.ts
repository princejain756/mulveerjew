import { NextRequest, NextResponse } from 'next/server';
import { query, transaction } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export interface OrderData {
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
  shipping_phone?: string;
  payment_method: 'razorpay' | 'cod';
  order_notes?: string;
}

// POST /api/checkout - Create order
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
    const orderData: OrderData = body;

    // Validate required fields
    const requiredFields = ['shipping_address', 'shipping_city', 'shipping_state', 'shipping_pincode', 'payment_method'];
    for (const field of requiredFields) {
      if (!orderData[field as keyof OrderData]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate payment method
    if (!['razorpay', 'cod'].includes(orderData.payment_method)) {
      return NextResponse.json(
        { error: 'Invalid payment method' },
        { status: 400 }
      );
    }

    // Get user's cart
    const [cartItems] = await query(`
      SELECT
        c.*,
        p.name,
        p.price,
        p.discount_price,
        p.stock_quantity
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ? AND p.is_active = true
    `, [userId]);

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Calculate totals and validate stock
    let totalAmount = 0;
    const orderItems: Array<{
      product_id: number;
      quantity: number;
      price: number;
      total: number;
    }> = [];

    for (const item of cartItems) {
      if (item.stock_quantity < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${item.name}` },
          { status: 400 }
        );
      }

      const price = item.discount_price || item.price;
      const itemTotal = price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        product_id: item.product_id,
        quantity: item.quantity,
        price: price,
        total: itemTotal,
      });
    }

    // Add shipping (you can make this configurable)
    const shippingAmount = totalAmount > 500 ? 0 : 50;
    const finalAmount = totalAmount + shippingAmount;

    // Generate order number
    const orderNumber = `MJ${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    let orderId: number = 0;
    let paymentStatus = 'pending';

    // For COD, mark as paid since no payment needed upfront
    if (orderData.payment_method === 'cod') {
      paymentStatus = 'paid';
    }

    // Create order in transaction
    await transaction(async (connection) => {
      // Insert order
      const [orderResult] = await connection.execute(`
        INSERT INTO orders (
          user_id, order_number, total_amount, shipping_amount, final_amount,
          status, payment_method, payment_status, shipping_address, shipping_city,
          shipping_state, shipping_pincode, shipping_phone, order_notes
        ) VALUES (?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        userId, orderNumber, totalAmount, shippingAmount, finalAmount,
        orderData.payment_method, paymentStatus, orderData.shipping_address,
        orderData.shipping_city, orderData.shipping_state, orderData.shipping_pincode,
        orderData.shipping_phone || null, orderData.order_notes || null
      ]);

      orderId = (orderResult as any).insertId;

      // Insert order items
      for (const item of orderItems) {
        await connection.execute(`
          INSERT INTO order_items (order_id, product_id, quantity, price, total)
          VALUES (?, ?, ?, ?, ?)
        `, [orderId, item.product_id, item.quantity, item.price, item.total]);

        // Update product stock
        await connection.execute(`
          UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?
        `, [item.quantity, item.product_id]);
      }

      // Clear user's cart
      await connection.execute('DELETE FROM cart WHERE user_id = ?', [userId]);
    });

    const orderResponse: any = {
      id: orderId,
      order_number: orderNumber,
      total_amount: totalAmount,
      shipping_amount: shippingAmount,
      final_amount: finalAmount,
      payment_method: orderData.payment_method,
      payment_status: paymentStatus,
      items: orderItems,
    };

    const response = {
      message: 'Order created successfully',
      order: orderResponse
    };

    // For RazorPay, you would typically create a payment order here
    if (orderData.payment_method === 'razorpay') {
      // This is where you would integrate with RazorPay API
      // For now, we'll just return the order details
      orderResponse.razorpay_order_id = `rzp_${orderId}_${Date.now()}`;
    }

    return NextResponse.json(response, { status: 201 });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}