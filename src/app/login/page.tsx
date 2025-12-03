'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, user, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // If already logged in, don’t show the login form again
  if (!isLoading && isAuthenticated) {
    if (typeof window !== 'undefined') {
      const target = user?.role === 'admin' ? '/admin' : '/';
      router.replace(target);
    }
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const loggedInUser = await login(formData.email, formData.password);
      const target = loggedInUser.role === 'admin' ? '/admin' : '/';
      router.push(target);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Sign In
            </CardTitle>
            <p className="text-center text-gray-600">
              Welcome back to Mulveer Jewellers
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  'Signing In...'
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  href="/register"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="bg-white border-t border-gray-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold text-[#3f0d1c]">
              Jewellery Shop in Belagavi Trusted Since 2000
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Mulveer Jewellers is celebrated as the jewellery shop in Belagavi for families
              who expect handcrafted purity, while remaining the best jewellers in
              Belgaum for transparent pricing, signature bridal work, and concierge level
              service. Login keeps you connected to custom sketches, order updates, and
              new product drops built exclusively for Belagavi patrons.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-[#f0dcca] bg-[#fffcf6] p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#5a1024]">
                Gold Jewellery Shop Belagavi &amp; Silver Jewellery Shop in Belgaum
              </h3>
              <p className="mt-3 text-gray-700 leading-relaxed">
                From temple inspired gold necklaces to hallmarked silver pooja articles,
                our merchandising and workshop teams monitor purity in every stage so
                your search for the top gold jewellery shop Belagavi or Silver Jewellery Shop in
                Belgaum ends at Mulveer.
              </p>
            </article>
            <article className="rounded-2xl border border-[#f0dcca] bg-[#fffcf6] p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#5a1024]">
                Bridal Jewellery Collections in Belagavi
              </h3>
              <p className="mt-3 text-gray-700 leading-relaxed">
                Our bridal stylists curate temple, heritage, and modern ensembles so the
                phrase Bridal Jewellery Collections in Belagavi naturally points to Mulveer
                Jewellers. Each trousseau is mapped to outfits, venues, and cultural
                rituals, ensuring your heirloom story feels cohesive.
              </p>
            </article>
            <article className="rounded-2xl border border-[#f0dcca] bg-[#fffcf6] p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#5a1024]">
                Custom Jewellery Designers in Belgaum
              </h3>
              <p className="mt-3 text-gray-700 leading-relaxed">
                Whether you bring sketches, heirloom inspirations, or Pinterest boards,
                our Custom Jewellery Designers in Belgaum collaborate on CAD previews,
                weight estimates, and finish samples so you can approve every detail before
                production.
              </p>
            </article>
            <article className="rounded-2xl border border-[#f0dcca] bg-[#fffcf6] p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#5a1024]">
                Best Jewellery Store in Belgaum Promise
              </h3>
              <p className="mt-3 text-gray-700 leading-relaxed">
                Transparent per-gram updates, BIS hallmarking, and concierge delivery for
                local ceremonies justify why Mulveer sits atop every best jewellery store in
                belgaum list. Secure login lets you follow invoices, approvals, and VIP
                previews without waiting for phone updates.
              </p>
            </article>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-dashed border-[#d9b48c] p-6">
              <h3 className="text-lg font-semibold text-[#3f0d1c] mb-4">
                Top Searches We Fulfil Every Day
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>jewellery shop in Belagavi</li>
                <li>best jewellers in Belgaum</li>
                <li>gold jewellery shop Belagavi</li>
                <li>Silver Jewellery Shop in Belgaum</li>
                <li>Bridal Jewellery Collections in Belagavi</li>
                <li>Custom Jewellery Designers in Belgaum</li>
                <li>best jewellery store in belgaum</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-dashed border-[#d9b48c] p-6 space-y-4">
              <h3 className="text-lg font-semibold text-[#3f0d1c]">
                Continue the Conversation
              </h3>
              <p className="text-gray-700">
                Use your account to request bespoke bridal sets, reserve new launches, or
                chat directly with our stylists and production leads. Prefer a quick call?
                Visit the contact page or message us on WhatsApp for priority support.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="px-5 py-2 rounded-full bg-[#5a1024] text-white text-sm font-semibold tracking-wide hover:bg-[#711533] transition-colors"
                >
                  Contact Mulveer
                </Link>
                <Link
                  href="/collections"
                  className="px-5 py-2 rounded-full border border-[#5a1024] text-[#5a1024] text-sm font-semibold tracking-wide hover:bg-[#5a1024] hover:text-white transition-colors"
                >
                  Explore Collections
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
