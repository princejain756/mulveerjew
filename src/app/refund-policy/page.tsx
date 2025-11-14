'use client';

import Link from 'next/link';
import TopNotificationBar from '@/components/sections/top-notification-bar';
import HeaderTopInfo from '@/components/sections/header-top-info';
import MainHeader from '@/components/sections/main-header';
import MainNavigation from '@/components/sections/main-navigation';
import Footer from '@/components/sections/footer';

export default function RefundPolicyPage() {
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
                Refund Policy
              </h1>
              <p className="text-xl text-[#f6e2c7] max-w-3xl mx-auto">
                Your Satisfaction is Our Priority
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
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Overview</h2>
                  <p className="text-gray-700 leading-relaxed">
                    At Mulveer Jewellers, we strive to ensure your complete satisfaction with every purchase. Our refund policy is designed to provide you with peace of mind when shopping for fine jewelry. We understand that jewelry is a significant investment, and we want you to be completely happy with your choice.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Standard Return Policy</h2>
                  <div className="bg-[#f9f5f0] p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-semibold text-[#5a1024] mb-3">30-Day Return Window</h3>
                    <p className="text-gray-700 leading-relaxed">
                      You may return most items within 30 days of purchase for a full refund or exchange, provided the items are in their original condition with all original packaging, certificates, and documentation.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#5a1024] mb-2">Eligible Items</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Ready-to-wear jewelry from our standard collections</li>
                        <li>Items that are undamaged and unworn</li>
                        <li>Items with all original tags, certificates, and packaging</li>
                        <li>Items purchased directly from our showroom or website</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#5a1024] mb-2">Non-Eligible Items</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Custom-made or personalized jewelry</li>
                        <li>Items that have been resized, repaired, or altered</li>
                        <li>Items damaged due to misuse or normal wear</li>
                        <li>Gift items that have been opened or used</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Custom Orders & Special Commissions</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    For custom-designed jewelry and special commissions, our policy is more flexible to accommodate the unique nature of these pieces:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>Design Approval Stage:</strong> Full refund if you change your mind before production begins</li>
                    <li><strong>During Production:</strong> 50% refund if cancellation occurs during the crafting process</li>
                    <li><strong>After Completion:</strong> Custom pieces may be returned within 7 days for sizing adjustments only</li>
                    <li><strong>Final Sale:</strong> Custom pieces are considered final sale once worn or after 7 days</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Refund Process</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#5a1024] mb-2">How to Initiate a Return</h3>
                      <ol className="list-decimal list-inside text-gray-700 space-y-2">
                        <li>Contact our customer service team within the return window</li>
                        <li>Provide your order number and reason for return</li>
                        <li>Receive return authorization and shipping instructions</li>
                        <li>Package the item securely with all original materials</li>
                        <li>Ship the item back to us (shipping costs may apply)</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#5a1024] mb-2">Processing Time</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Refunds are processed within 5-7 business days after receipt of returned items</li>
                        <li>Original payment method will be refunded</li>
                        <li>You will receive email confirmation once refund is processed</li>
                        <li>Bank processing time may vary (3-5 business days)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Exchanges</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We offer complimentary exchanges for items of equal or greater value. For items of lesser value, the difference will be refunded to you.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Same return conditions apply as refunds</li>
                    <li>Exchange items must be available in stock</li>
                    <li>Custom orders cannot be exchanged for standard items</li>
                    <li>Price differences will be settled at current market rates</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Damaged or Defective Items</h2>
                  <p className="text-gray-700 leading-relaxed">
                    If you receive a damaged or defective item, please contact us immediately. We will arrange for repair, replacement, or full refund at no cost to you. All BIS Hallmarked items come with our quality guarantee.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Gold Price Adjustments</h2>
                  <p className="text-gray-700 leading-relaxed">
                    For purchases made during gold price fluctuations, we offer price protection. If gold prices drop significantly within 30 days of purchase, we will adjust your purchase price accordingly.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Contact Information</h2>
                  <div className="bg-[#f9f5f0] p-6 rounded-lg">
                    <p className="text-gray-700"><strong>Mulveer Jewellers</strong></p>
                    <p className="text-gray-700">Belagavi, Karnataka</p>
                    <p className="text-gray-700">Email: returns@mulveerjewellers.com</p>
                    <p className="text-gray-700">Phone: +91 XXXXX XXXXX</p>
                    <p className="text-gray-700">Business Hours: Monday - Saturday, 10:00 AM - 8:00 PM</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Important Notes</h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>This policy applies to purchases made directly from Mulveer Jewellers</li>
                    <li>Items purchased from third-party sellers are subject to their return policies</li>
                    <li>We reserve the right to modify this policy with reasonable notice</li>
                    <li>All decisions regarding returns are made at our discretion</li>
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
              Need Help with a Return?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Our customer service team is here to assist you with any questions about returns, exchanges, or refunds.
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
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}