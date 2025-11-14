'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Award, Heart, Zap, Users } from 'lucide-react';
import TopNotificationBar from '@/components/sections/top-notification-bar';
import HeaderTopInfo from '@/components/sections/header-top-info';
import MainHeader from '@/components/sections/main-header';
import MainNavigation from '@/components/sections/main-navigation';
import Footer from '@/components/sections/footer';

export default function AboutPage() {
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
              About Mulveer Jewellers
            </h1>
            <p className="text-xl text-[#f6e2c7] max-w-3xl mx-auto">
              Crafting Heritage. Celebrating Elegance. Honoring Your Story.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5a1024] mb-4">
                Our Heritage
              </p>
              <h2 className="text-4xl font-bold text-[#3f0d1c] mb-6">
                More Than Two Decades of Excellence
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Founded in 2000, Mulveer Jewellers has been a beacon of trust, quality, and craftsmanship in the heart of Belagavi. What began as a small family venture has blossomed into a beloved destination for jewellery enthusiasts across the region.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our journey is woven with stories of happy customers, timeless pieces, and an unwavering commitment to purity and excellence. Every piece we craft carries the legacy of 24 years of dedication.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we stand as a BIS Hallmarked Gold specialist, blending traditional craftsmanship with modern design to create jewellery that transcends trends and becomes treasured family heirlooms.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3f0d1c] to-[#5a1024] flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl font-bold mb-2">24+</div>
                  <p className="text-xl text-[#f6e2c7]">Years of Excellence</p>
                  <p className="text-sm text-[#f6e2c7] mt-4">Since 2000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-[#f9f5f0] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5a1024] mb-4">
              Our Principles
            </p>
            <h2 className="text-4xl font-bold text-[#3f0d1c]">
              Values That Guide Us
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Purity */}
            <div className="rounded-lg bg-white p-8 shadow-sm hover:shadow-lg transition-shadow text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3f0d1c]/10 mb-4">
                <Award className="w-8 h-8 text-[#5a1024]" />
              </div>
              <h3 className="text-xl font-bold text-[#3f0d1c] mb-3">Purity</h3>
              <p className="text-gray-600">
                BIS Hallmarked gold ensures every piece meets the highest purity standards. Transparency in certification is our promise.
              </p>
            </div>

            {/* Craftsmanship */}
            <div className="rounded-lg bg-white p-8 shadow-sm hover:shadow-lg transition-shadow text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3f0d1c]/10 mb-4">
                <Zap className="w-8 h-8 text-[#5a1024]" />
              </div>
              <h3 className="text-xl font-bold text-[#3f0d1c] mb-3">Craftsmanship</h3>
              <p className="text-gray-600">
                Our in-house workshop blends traditional techniques with contemporary design, creating pieces that tell your story.
              </p>
            </div>

            {/* Trust */}
            <div className="rounded-lg bg-white p-8 shadow-sm hover:shadow-lg transition-shadow text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3f0d1c]/10 mb-4">
                <Heart className="w-8 h-8 text-[#5a1024]" />
              </div>
              <h3 className="text-xl font-bold text-[#3f0d1c] mb-3">Trust</h3>
              <p className="text-gray-600">
                Every customer is family. We stand behind our work with complete transparency in pricing, weight, and carat.
              </p>
            </div>

            {/* Community */}
            <div className="rounded-lg bg-white p-8 shadow-sm hover:shadow-lg transition-shadow text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3f0d1c]/10 mb-4">
                <Users className="w-8 h-8 text-[#5a1024]" />
              </div>
              <h3 className="text-xl font-bold text-[#3f0d1c] mb-3">Community</h3>
              <p className="text-gray-600">
                We celebrate milestones with our customers. From engagements to anniversaries, we're part of your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5a1024] mb-4">
              Unique Advantages
            </p>
            <h2 className="text-4xl font-bold text-[#3f0d1c]">
              Why Choose Mulveer Jewellers?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#5a1024] text-white">
                  <span className="text-lg font-bold">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#3f0d1c] mb-2">
                  BIS Hallmarked Certification
                </h3>
                <p className="text-gray-600">
                  Every piece is certified for purity and quality, giving you complete peace of mind with your investment.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#5a1024] text-white">
                  <span className="text-lg font-bold">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#3f0d1c] mb-2">
                  In-House Workshop
                </h3>
                <p className="text-gray-600">
                  Our skilled artisans craft custom designs with precision, ensuring your vision becomes reality with exceptional quality.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#5a1024] text-white">
                  <span className="text-lg font-bold">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#3f0d1c] mb-2">
                  Transparent Pricing
                </h3>
                <p className="text-gray-600">
                  No hidden charges. We break down every aspect—weight, purity, craftsmanship—so you know exactly what you're paying for.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#5a1024] text-white">
                  <span className="text-lg font-bold">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#3f0d1c] mb-2">
                  Custom Design Services
                </h3>
                <p className="text-gray-600">
                  From heirloom recreations to contemporary concepts, we bring your inspiration to life with artistic excellence.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#5a1024] text-white">
                  <span className="text-lg font-bold">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#3f0d1c] mb-2">
                  Expert Consultation
                </h3>
                <p className="text-gray-600">
                  Our experienced team guides you through every decision, from metal choice to design intricacies and investment potential.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#5a1024] text-white">
                  <span className="text-lg font-bold">✓</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#3f0d1c] mb-2">
                  Convenient Showroom
                </h3>
                <p className="text-gray-600">
                  Located in the heart of Belagavi with extended hours. Visit us anytime to explore our curated collections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Highlight */}
      <section className="bg-[#3f0d1c] text-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f6e2c7] mb-4">
              Our Pride
            </p>
            <h2 className="text-4xl font-bold mb-4">
              Experienced Artisans & Team
            </h2>
            <p className="text-[#f6e2c7] max-w-2xl mx-auto">
              Our team consists of master craftsmen with decades of combined experience, passionate about creating jewelry that exceeds expectations.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="text-center">
                <div className="mb-4 h-48 rounded-lg bg-white/10 flex items-center justify-center">
                  <div className="text-[#f6e2c7] text-6xl">👑</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Master Craftsman</h3>
                <p className="text-[#f6e2c7]">
                  Specializing in intricate designs with 15+ years of expertise in precious metal work.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#3f0d1c] mb-6">
            Ready to Find Your Perfect Piece?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Visit our showroom in Belagavi or explore our collections online. Our team is here to help you every step of the way.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#5a1024] text-white font-semibold rounded-lg hover:bg-[#711533] transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#5a1024] text-[#5a1024] font-semibold rounded-lg hover:bg-[#5a1024] hover:text-white transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
