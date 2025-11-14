import { NextRequest, NextResponse } from 'next/server';
import { cancelOrder, getOrderById } from '@/lib/orders';
import { refundPayment } from '@/lib/razorpay';
import { verifyToken } from '@/lib/auth';
import { query } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const orderId = parseInt(params.id);

    // Get order and verify it belongs to user
    const order = await getOrderById(orderId);
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    if (order.user_id !== userId && decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Check if order can be cancelled
    if (order.status !== 'pending' && order.status !== 'confirmed') {
      return NextResponse.json(
        { error: `Cannot cancel order with status: ${order.status}` },
        { status: 400 }
      );
    }

    // Handle refund for Razorpay
    if (order.payment_method === 'razorpay' && order.payment_status === 'paid') {
      try {
        // Get payment info
        const payments = await query('SELECT * FROM payments WHERE order_id = ?', [orderId]);
        if (payments && payments.length > 0) {
          const payment = payments[0];
          await refundPayment(payment.payment_id, order.final_amount);
        }
      } catch (error) {
        console.error('Razorpay refund error:', error);
        return NextResponse.json(
          { error: 'Failed to process refund' },
          { status: 500 }
        );
      }
    }

    // Cancel order
    const cancelledOrder = await cancelOrder(orderId);

    return NextResponse.json(
      {
        message: 'Order cancelled successfully',
        order: cancelledOrder,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error cancelling order:', error);
    return NextResponse.json(
      { error: 'Failed to cancel order' },
      { status: 500 }
    );
  }
}
