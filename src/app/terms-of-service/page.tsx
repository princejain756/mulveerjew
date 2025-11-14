'use client';

import Link from 'next/link';
import TopNotificationBar from '@/components/sections/top-notification-bar';
import HeaderTopInfo from '@/components/sections/header-top-info';
import MainHeader from '@/components/sections/main-header';
import MainNavigation from '@/components/sections/main-navigation';
import Footer from '@/components/sections/footer';

export default function TermsOfServicePage() {
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
                Terms of Service
              </h1>
              <p className="text-xl text-[#f6e2c7] max-w-3xl mx-auto">
                Building Trust Through Transparency
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
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Agreement to Terms</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Welcome to Mulveer Jewellers. These Terms of Service ("Terms") govern your use of our website, mobile application, and services provided by Mulveer Jewellers ("we," "us," or "our"). By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access our services.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Our Services</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Mulveer Jewellers provides the following services:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>Jewelry Sales:</strong> Purchase of gold, silver, diamond, and gemstone jewelry</li>
                    <li><strong>Custom Design:</strong> Bespoke jewelry creation services</li>
                    <li><strong>Repair Services:</strong> Jewelry repair, resizing, and restoration</li>
                    <li><strong>Appraisal Services:</strong> Professional jewelry valuation</li>
                    <li><strong>Educational Content:</strong> Information about jewelry care and investment</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">User Accounts</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#5a1024] mb-2">Account Creation</h3>
                      <p className="text-gray-700 leading-relaxed">
                        To access certain features of our services, you may be required to create an account. You must provide accurate, complete, and current information during the registration process and keep your account information updated.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#5a1024] mb-2">Account Security</h3>
                      <p className="text-gray-700 leading-relaxed">
                        You are responsible for safeguarding your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Purchases and Payment</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#5a1024] mb-2">Pricing and Payment</h3>
                      <p className="text-gray-700 leading-relaxed">
                        All prices are subject to change without notice. Payment must be made in full at the time of purchase. We accept various payment methods including cash, credit/debit cards, UPI, and bank transfers.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#5a1024] mb-2">Gold Price Fluctuations</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Gold prices fluctuate daily. The final price of gold jewelry will be calculated based on the prevailing gold rate at the time of billing. We provide price protection for certain periods as outlined in our refund policy.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#5a1024] mb-2">Taxes and Duties</h3>
                      <p className="text-gray-700 leading-relaxed">
                        All applicable taxes, including GST, will be added to your purchase price. You are responsible for any customs duties or taxes that may apply to international shipments.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Custom Orders</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    For custom-designed jewelry:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>You must provide clear specifications and approve designs before production begins</li>
                    <li>Deposits may be required for custom orders</li>
                    <li>Production timelines will be communicated clearly</li>
                    <li>Changes to approved designs may incur additional costs</li>
                    <li>Custom pieces are non-refundable once production is complete</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Intellectual Property</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#5a1024] mb-2">Our Content</h3>
                      <p className="text-gray-700 leading-relaxed">
                        All content on our website and in our materials, including text, graphics, logos, images, and software, is owned by Mulveer Jewellers or our licensors and is protected by copyright and trademark laws.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#5a1024] mb-2">Your Content</h3>
                      <p className="text-gray-700 leading-relaxed">
                        By submitting content to us (such as custom design requests), you grant us a non-exclusive, royalty-free license to use, modify, and display that content for the purpose of providing our services.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Prohibited Uses</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You may not use our services:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                    <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                    <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                    <li>To submit false or misleading information</li>
                    <li>To upload or transmit viruses or any other type of malicious code</li>
                    <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Disclaimer of Warranties</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Our services are provided on an "as is" and "as available" basis. We make no representations or warranties of any kind, express or implied, as to the operation of our services or the information, content, or materials included therein. You expressly agree that your use of our services is at your sole risk.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Limitation of Liability</h2>
                  <p className="text-gray-700 leading-relaxed">
                    In no event shall Mulveer Jewellers, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our services.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Indemnification</h2>
                  <p className="text-gray-700 leading-relaxed">
                    You agree to defend, indemnify, and hold harmless Mulveer Jewellers and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Termination</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may terminate or suspend your account and bar access to our services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Governing Law</h2>
                  <p className="text-gray-700 leading-relaxed">
                    These Terms shall be interpreted and governed by the laws of Karnataka, India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Changes to Terms</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Contact Information</h2>
                  <div className="bg-[#f9f5f0] p-6 rounded-lg">
                    <p className="text-gray-700"><strong>Mulveer Jewellers</strong></p>
                    <p className="text-gray-700">Belagavi, Karnataka, India</p>
                    <p className="text-gray-700">Email: legal@mulveerjewellers.com</p>
                    <p className="text-gray-700">Phone: +91 XXXXX XXXXX</p>
                    <p className="text-gray-700">Business Hours: Monday - Saturday, 10:00 AM - 8:00 PM IST</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Severability</h2>
                  <p className="text-gray-700 leading-relaxed">
                    If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our services and supersede and replace any prior agreements we might have had between us regarding the services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#f9f5f0] py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-[#3f0d1c] mb-6">
              Questions About Our Terms?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Our legal team is available to clarify any aspects of our Terms of Service or other policies.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-[#5a1024] text-white font-semibold rounded-lg hover:bg-[#711533] transition-colors"
              >
                Contact Legal Team
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#5a1024] text-[#5a1024] font-semibold rounded-lg hover:bg-[#5a1024] hover:text-white transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}