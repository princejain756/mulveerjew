'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Package, AlertCircle, CheckCircle } from 'lucide-react';

interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
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

const statusColors: Record<string, string> = {
  pending: 'yellow',
  confirmed: 'blue',
  processing: 'blue',
  shipped: 'purple',
  delivered: 'green',
  cancelled: 'red',
};

const paymentStatusColors: Record<string, string> = {
  pending: 'yellow',
  paid: 'green',
  failed: 'red',
  refunded: 'orange',
};

export default function OrdersPage() {
  const router = useRouter();
  const { user, accessToken, isLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingOrderId, setCancellingOrderId] = useState<number | null>(null);
  const [cancelSuccess, setCancelSuccess] = useState('');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!accessToken) return;
      try {
        const response = await fetch('/api/orders', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [accessToken]);

  const handleCancelOrder = async (orderId: number) => {
    if (!accessToken) return;
    if (!window.confirm('Are you sure you want to cancel this order?')) return;

    setCancellingOrderId(orderId);
    try {
      const response = await fetch(`/api/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to cancel order');
      }

      setCancelSuccess('Order cancelled successfully');
      // Refresh orders
      const ordersResponse = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const ordersData = await ordersResponse.json();
      setOrders(ordersData.orders || []);

      setTimeout(() => setCancelSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel order');
    } finally {
      setCancellingOrderId(null);
    }
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-gray-600">View and manage your orders</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {cancelSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-800">{cancelSuccess}</AlertDescription>
          </Alert>
        )}

        {orders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="w-16 h-16 text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
              <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
              <Button onClick={() => router.push('/')}>
                Start Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>Order #{order.order_number}</CardTitle>
                      <CardDescription>
                        Ordered on {new Date(order.ordered_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <Badge className={`bg-${statusColors[order.status]}-100 text-${statusColors[order.status]}-800`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <Badge className={`bg-${paymentStatusColors[order.payment_status]}-100 text-${paymentStatusColors[order.payment_status]}-800 ml-2`}>
                          {order.payment_status === 'paid' ? 'Paid' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold mb-3">Items</h3>
                    <div className="space-y-2">
                      {order.items?.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                          <div>
                            <span>Product #{item.product_id}</span>
                            <span className="text-gray-600"> × {item.quantity}</span>
                          </div>
                          <span className="font-medium">₹{item.total.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50 p-4 rounded space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{order.total_amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>₹{order.shipping_amount.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{order.final_amount.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <p className="text-sm text-gray-600">
                      {order.shipping_address}
                      <br />
                      {order.shipping_city}, {order.shipping_state} {order.shipping_pincode}
                      {order.shipping_phone && <><br />{order.shipping_phone}</>}
                    </p>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="font-semibold mb-2">Payment Method</h3>
                    <p className="text-sm text-gray-600">
                      {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Razorpay'}
                    </p>
                  </div>

                  {/* Order Notes */}
                  {order.order_notes && (
                    <div>
                      <h3 className="font-semibold mb-2">Order Notes</h3>
                      <p className="text-sm text-gray-600">{order.order_notes}</p>
                    </div>
                  )}

                  {/* Cancel Button */}
                  {(order.status === 'pending' || order.status === 'confirmed') && (
                    <div className="pt-4 border-t">
                      <Button
                        variant="destructive"
                        onClick={() => handleCancelOrder(order.id)}
                        disabled={cancellingOrderId === order.id}
                      >
                        {cancellingOrderId === order.id ? (
                          <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            Cancelling...
                          </>
                        ) : (
                          'Cancel Order'
                        )}
                      </Button>
                      {order.payment_method === 'razorpay' && order.payment_status === 'paid' && (
                        <p className="text-sm text-gray-600 mt-2">
                          A refund of ₹{order.final_amount.toFixed(2)} will be processed to your original payment method.
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
