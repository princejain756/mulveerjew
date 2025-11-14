'use client';

import Link from 'next/link';
import TopNotificationBar from '@/components/sections/top-notification-bar';
import HeaderTopInfo from '@/components/sections/header-top-info';
import MainHeader from '@/components/sections/main-header';
import MainNavigation from '@/components/sections/main-navigation';
import Footer from '@/components/sections/footer';

export default function PrivacyPolicyPage() {
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
                Privacy Policy
              </h1>
              <p className="text-xl text-[#f6e2c7] max-w-3xl mx-auto">
                Your Trust and Privacy Matter to Us
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
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Introduction</h2>
                  <p className="text-gray-700 leading-relaxed">
                    At Mulveer Jewellers, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from our showroom.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Information We Collect</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#5a1024] mb-2">Personal Information</h3>
                      <p className="text-gray-700 leading-relaxed">
                        We may collect personal information such as your name, email address, phone number, shipping address, and payment information when you:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                        <li>Make a purchase or inquiry</li>
                        <li>Create an account</li>
                        <li>Subscribe to our newsletter</li>
                        <li>Contact us for custom design services</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#5a1024] mb-2">Usage Information</h3>
                      <p className="text-gray-700 leading-relaxed">
                        We automatically collect certain information about your device and browsing activity, including:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                        <li>IP address and location data</li>
                        <li>Browser type and version</li>
                        <li>Pages visited and time spent</li>
                        <li>Device information</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">How We Use Your Information</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Process and fulfill your orders</li>
                    <li>Provide customer service and support</li>
                    <li>Send you important updates about your orders</li>
                    <li>Improve our products and services</li>
                    <li>Send marketing communications (with your consent)</li>
                    <li>Prevent fraud and ensure security</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Information Sharing</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>With service providers who help us operate our business (payment processors, shipping companies)</li>
                    <li>When required by law or to protect our rights</li>
                    <li>With your explicit consent</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Data Security</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes secure payment processing and encrypted data transmission.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Your Rights</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Access the personal information we hold about you</li>
                    <li>Correct inaccurate or incomplete information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to or restrict processing of your information</li>
                    <li>Data portability</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    To exercise these rights, please contact us using the information provided below.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Cookies and Tracking</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Contact Us</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="bg-[#f9f5f0] p-6 rounded-lg">
                    <p className="text-gray-700"><strong>Mulveer Jewellers</strong></p>
                    <p className="text-gray-700">Belagavi, Karnataka</p>
                    <p className="text-gray-700">Email: privacy@mulveerjewellers.com</p>
                    <p className="text-gray-700">Phone: +91 XXXXX XXXXX</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-[#3f0d1c] mb-4">Changes to This Policy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
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
              Questions About Your Privacy?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We're here to help. Contact our team for any privacy-related concerns or questions.
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