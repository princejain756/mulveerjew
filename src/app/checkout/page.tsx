'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ArrowLeft } from 'lucide-react';

interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  product?: any;
  added_at: Date;
}

interface CheckoutFormData {
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
  shipping_phone: string;
  payment_method: 'razorpay' | 'cod';
  order_notes: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user, accessToken, isLoading } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<CheckoutFormData>({
    shipping_address: user?.address || '',
    shipping_city: user?.city || '',
    shipping_state: user?.state || '',
    shipping_pincode: user?.pincode || '',
    shipping_phone: user?.phone || '',
    payment_method: 'cod',
    order_notes: '',
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      if (!accessToken) return;
      try {
        const response = await fetch('/api/cart', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setCartItems(data.items || []);
      } catch (err) {
        console.error('Error fetching cart:', err);
        setError('Failed to load cart');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [accessToken]);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.product?.discount_price || item.product?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  const shippingAmount = subtotal > 500 ? 0 : 50;
  const finalAmount = subtotal + shippingAmount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (!accessToken) throw new Error('Not authenticated');

      const orderItems = cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product?.discount_price || item.product?.price || 0,
        total: (item.product?.discount_price || item.product?.price || 0) * item.quantity,
      }));

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          total_amount: subtotal,
          shipping_amount: shippingAmount,
          discount_amount: 0,
          final_amount: finalAmount,
          payment_method: formData.payment_method,
          shipping_address: formData.shipping_address,
          shipping_city: formData.shipping_city,
          shipping_state: formData.shipping_state,
          shipping_pincode: formData.shipping_pincode,
          shipping_phone: formData.shipping_phone,
          order_notes: formData.order_notes,
          items: orderItems,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      // Redirect to order confirmation or payment
      if (formData.payment_method === 'razorpay') {
        router.push(`/payment/${data.order.id}`);
      } else {
        router.push(`/orders/${data.order.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
        <Button onClick={() => router.push('/')}>
          <ArrowLeft className="mr-2 w-4 h-4" />
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Checkout</CardTitle>
                <CardDescription>Complete your order</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Shipping Address */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Shipping Address</h3>

                    <div>
                      <Label htmlFor="shipping_address">Address *</Label>
                      <Textarea
                        id="shipping_address"
                        name="shipping_address"
                        value={formData.shipping_address}
                        onChange={handleChange}
                        required
                        placeholder="Enter your address"
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="shipping_city">City *</Label>
                        <Input
                          id="shipping_city"
                          name="shipping_city"
                          value={formData.shipping_city}
                          onChange={handleChange}
                          required
                          placeholder="City"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="shipping_state">State *</Label>
                        <Input
                          id="shipping_state"
                          name="shipping_state"
                          value={formData.shipping_state}
                          onChange={handleChange}
                          required
                          placeholder="State"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="shipping_pincode">Pincode *</Label>
                        <Input
                          id="shipping_pincode"
                          name="shipping_pincode"
                          value={formData.shipping_pincode}
                          onChange={handleChange}
                          required
                          placeholder="Pincode"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="shipping_phone">Phone</Label>
                        <Input
                          id="shipping_phone"
                          name="shipping_phone"
                          value={formData.shipping_phone}
                          onChange={handleChange}
                          placeholder="Phone number"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Payment Method</h3>
                    <RadioGroup value={formData.payment_method} onValueChange={(value: any) => setFormData({ ...formData, payment_method: value })}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="cursor-pointer">Cash on Delivery (COD)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="razorpay" id="razorpay" />
                        <Label htmlFor="razorpay" className="cursor-pointer">Razorpay</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Order Notes */}
                  <div>
                    <Label htmlFor="order_notes">Order Notes (Optional)</Label>
                    <Textarea
                      id="order_notes"
                      name="order_notes"
                      value={formData.order_notes}
                      onChange={handleChange}
                      placeholder="Add any special instructions"
                      className="mt-1"
                    />
                  </div>

                  <Button type="submit" disabled={submitting} className="w-full">
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.product?.name} x{item.quantity}</span>
                      <span>₹{((item.product?.discount_price || item.product?.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shippingAmount === 0 ? 'text-green-600 font-semibold' : ''}>
                      ₹{shippingAmount.toFixed(2)}
                      {shippingAmount === 0 && ' (Free)'}
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{finalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {subtotal < 500 && (
                  <Alert>
                    <AlertDescription>
                      Free shipping on orders above ₹500
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
