import { query } from './db';

let razorpay: any = null;

// Initialize Razorpay only if credentials are available
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  try {
    const Razorpay = require('razorpay');
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  } catch (error) {
    console.error('Failed to initialize Razorpay:', error);
  }
}

// Create payment order
export async function createPaymentOrder(
  orderId: number,
  amount: number,
  currency: string = 'INR',
  receipt?: string
) {
  if (!razorpay) {
    throw new Error('Razorpay is not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables.');
  }

  try {
    const options = {
      amount: Math.round(amount * 100), // Amount in paise
      currency,
      receipt: receipt || `order_${orderId}`,
      notes: {
        orderId,
      },
    };

    const order = await razorpay.orders.create(options);
    
    // Store payment info in database
    await query(
      `INSERT INTO payments (order_id, payment_id, amount, currency, payment_method, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [orderId, order.id, amount, currency, 'razorpay', 'pending']
    );

    return order;
  } catch (error) {
    console.error('Razorpay error:', error);
    throw error;
  }
}

// Verify payment
export async function verifyPayment(
  orderId: string,
  paymentId: string,
  signature: string
): Promise<boolean> {
  try {
    const crypto = require('crypto');
    
    const body = orderId + '|' + paymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(body)
      .digest('hex');

    return expectedSignature === signature;
  } catch (error) {
    console.error('Payment verification error:', error);
    return false;
  }
}

// Fetch payment details
export async function getPaymentDetails(paymentId: string) {
  if (!razorpay) {
    throw new Error('Razorpay is not configured');
  }

  try {
    const payment = await razorpay.payments.fetch(paymentId);
    return payment;
  } catch (error) {
    console.error('Error fetching payment:', error);
    throw error;
  }
}

// Refund payment
export async function refundPayment(
  paymentId: string,
  amount?: number,
  notes?: Record<string, string>
) {
  if (!razorpay) {
    throw new Error('Razorpay is not configured');
  }

  try {
    const refundOptions: any = {
      payment_id: paymentId,
    };

    if (amount) {
      refundOptions.amount = Math.round(amount * 100); // Amount in paise
    }

    if (notes) {
      refundOptions.notes = notes;
    }

    const refund = await razorpay.payments.refund(paymentId, refundOptions);
    
    return refund;
  } catch (error) {
    console.error('Refund error:', error);
    throw error;
  }
}

// Update payment status
export async function updatePaymentStatus(
  paymentId: string,
  status: 'pending' | 'success' | 'failed' | 'cancelled'
) {
  try {
    await query(
      'UPDATE payments SET status = ? WHERE payment_id = ?',
      [status, paymentId]
    );
    return true;
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
}
