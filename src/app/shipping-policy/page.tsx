'use client';

import Link from 'next/link';
import TopNotificationBar from '@/components/sections/top-notification-bar';
import HeaderTopInfo from '@/components/sections/header-top-info';
import MainHeader from '@/components/sections/main-header';
import MainNavigation from '@/components/sections/main-navigation';
import Footer from '@/components/sections/footer';

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopNotificationBar />
      <HeaderTopInfo />
      <MainHeader />
      <MainNavigation />
      <main className="w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#3f0d1c] to-[#5a1024] text-white py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-white">
                Shipping Policy
              </h1>
              <p className="text-xl text-[#f6e2c7] max-w-3xl mx-auto">
                Safe, Secure, and Timely Delivery
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-sm text-gray-600 mb-8">
                Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Shipping Commitment</h2>
                  <p className="text-gray-700 leading-relaxed">
                    At Mulveer Jewellers, we understand that your jewelry purchase is precious and personal. We are committed to delivering your orders safely, securely, and on time. Our shipping policy ensures that your valuable items reach you in perfect condition.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Processing Time</h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="bg-[#f9f5f0] p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-[#5a1024] mb-3">Standard Orders</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li><strong>In-Stock Items:</strong> 1-2 business days</li>
                        <li><strong>Custom Orders:</strong> 7-14 business days</li>
                        <li><strong>Special Commissions:</strong> 15-30 business days</li>
                        <li><strong>Rush Orders:</strong> Available upon request</li>
                      </ul>
                    </div>

                    <div className="bg-[#f9f5f0] p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-[#5a1024] mb-3">Order Processing</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Orders are processed Monday through Saturday, excluding public holidays. You will receive an email confirmation with tracking information once your order ships.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Shipping Methods & Delivery Times</h2>
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-[#5a1024]">Express Shipping</h3>
                        <span className="text-2xl font-bold text-[#3f0d1c]">₹500</span>
                      </div>
                      <ul className="text-gray-700 space-y-1">
                        <li>• Delivery within 1-2 business days</li>
                        <li>• Real-time tracking available</li>
                        <li>• Signature required upon delivery</li>
                        <li>• Insurance included for orders over ₹50,000</li>
                      </ul>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-[#5a1024]">Standard Shipping</h3>
                        <span className="text-2xl font-bold text-[#3f0d1c]">₹300</span>
                      </div>
                      <ul className="text-gray-700 space-y-1">
                        <li>• Delivery within 3-5 business days</li>
                        <li>• Tracking information provided</li>
                        <li>• Signature required upon delivery</li>
                        <li>• Insurance included for orders over ₹25,000</li>
                      </ul>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-[#5a1024]">Free Shipping</h3>
                        <span className="text-2xl font-bold text-green-600">FREE</span>
                      </div>
                      <ul className="text-gray-700 space-y-1">
                        <li>• Available for orders over ₹10,000</li>
                        <li>• Delivery within 3-7 business days</li>
                        <li>• Full insurance coverage included</li>
                        <li>• Premium packaging and handling</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Shipping Coverage</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#5a1024] mb-2">Within Karnataka</h3>
                      <p className="text-gray-700 leading-relaxed">
                        We provide reliable shipping services across Karnataka with our extensive network of trusted courier partners. Express delivery is available for major cities including Bangalore, Mysore, Mangalore, and Hubli-Dharwad.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#5a1024] mb-2">Pan-India Delivery</h3>
                      <p className="text-gray-700 leading-relaxed">
                        We ship to all major cities and towns across India. Delivery times may vary based on location and chosen shipping method. Remote areas may require additional 2-3 business days.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#5a1024] mb-2">International Shipping</h3>
                      <p className="text-gray-700 leading-relaxed">
                        International shipping is available upon request. Please contact us for custom quotes, duties, and delivery timeframes. All international shipments include full insurance and tracking.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Packaging & Security</h2>
                  <div className="bg-[#f9f5f0] p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[#5a1024] mb-4">Premium Packaging Standards</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="font-semibold text-[#3f0d1c] mb-2">Security Features</h4>
                        <ul className="text-gray-700 space-y-1 text-sm">
                          <li>• Tamper-evident packaging</li>
                          <li>• GPS tracking throughout transit</li>
                          <li>• Insurance coverage included</li>
                          <li>• Secure chain of custody</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#3f0d1c] mb-2">Quality Assurance</h4>
                        <ul className="text-gray-700 space-y-1 text-sm">
                          <li>• Anti-tarnish protective materials</li>
                          <li>• Individual compartments for each item</li>
                          <li>• Certificate of authenticity included</li>
                          <li>• Quality inspection before shipping</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Tracking & Delivery</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#5a1024] mb-2">Order Tracking</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Once your order ships, you will receive a tracking number via email and SMS. You can track your package in real-time through our website or the courier's tracking portal.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#5a1024] mb-2">Delivery Requirements</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Signature required for all deliveries</li>
                        <li>Valid ID may be requested for high-value orders</li>
                        <li>Delivery attempts will be made up to 3 times</li>
                        <li>Failed deliveries will be returned to our facility</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Shipping Insurance</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    All shipments are fully insured against loss or damage during transit. Our insurance coverage includes:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>Full Value Coverage:</strong> Complete replacement value protection</li>
                    <li><strong>Loss Protection:</strong> Coverage for lost or stolen packages</li>
                    <li><strong>Damage Protection:</strong> Repair or replacement for damaged items</li>
                    <li><strong>Claim Process:</strong> Fast and hassle-free claims processing</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Shipping Restrictions</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Due to the valuable nature of our products, we have certain shipping restrictions:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>PO Box deliveries are not available</li>
                    <li>Military base deliveries require special arrangements</li>
                    <li>Some remote locations may have extended delivery times</li>
                    <li>Customs regulations may apply for international shipments</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Contact Information</h2>
                  <div className="bg-[#f9f5f0] p-6 rounded-lg">
                    <p className="text-gray-700"><strong>Mulveer Jewellers</strong></p>
                    <p className="text-gray-700">Belagavi, Karnataka</p>
                    <p className="text-gray-700">Email: shipping@mulveerjewellers.com</p>
                    <p className="text-gray-700">Phone: +91 XXXXX XXXXX</p>
                    <p className="text-gray-700">Business Hours: Monday - Saturday, 10:00 AM - 8:00 PM</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Important Notes</h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Shipping costs are calculated at checkout and may vary based on weight and destination</li>
                    <li>Delivery dates are estimates and not guaranteed</li>
                    <li>We are not responsible for delays caused by carriers or customs</li>
                    <li>Additional charges may apply for remote locations or special handling</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#f9f5f0] py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-[#3f0d1c] mb-6">
              Questions About Shipping?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Our shipping specialists are here to help you choose the best delivery option for your needs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-[#5a1024] text-white font-semibold rounded-lg hover:bg-[#711533] transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#5a1024] text-[#5a1024] font-semibold rounded-lg hover:bg-[#5a1024] hover:text-white transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}