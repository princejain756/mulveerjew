'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Zap, Heart, Award, ArrowRight } from 'lucide-react';
import TopNotificationBar from '@/components/sections/top-notification-bar';
import HeaderTopInfo from '@/components/sections/header-top-info';
import MainHeader from '@/components/sections/main-header';
import MainNavigation from '@/components/sections/main-navigation';
import Footer from '@/components/sections/footer';

export default function CustomDesignsPage() {
  const steps = [
    {
      number: 1,
      title: "Share Your Vision",
      description: "Share your inspiration, sketch, or reference design with our team. Whether it's a vintage heirloom or a modern concept, we're ready to listen.",
      image: "/customdesigns/SHAREYOURVISION.webp",
      details: [
        "Bring reference images or sketches",
        "Describe your style preferences",
        "Share budget expectations",
        "Express any special requirements"
      ]
    },
    {
      number: 2,
      title: "Expert Evaluation",
      description: "We carefully evaluate feasibility and provide detailed estimates for weight, metal purity, carat, and cost.",
      image: "/customdesigns/EXPERTEVAULATION.webp",
      details: [
        "Technical feasibility assessment",
        "Weight and material estimates",
        "Purity and carat breakdown",
        "Transparent cost analysis"
      ]
    },
    {
      number: 3,
      title: "Craftsmanship",
      image: "/customdesigns/CRAFTSMANSHIP.webp",
      description: "Once approved, our master craftsmen in-house workshop creates your bespoke piece with meticulous care and precision.",
      details: [
        "Expert artisan selection",
        "Detailed crafting process",
        "Regular progress updates",
        "Quality checkpoints"
      ]
    },
    {
      number: 4,
      title: "Final Excellence",
      image: "/customdesigns/finalexcellence.webp",
      description: "Final polishing, rigorous quality checks, and hallmark certification ensure your piece is perfect before handover.",
      details: [
        "Professional polishing",
        "Quality verification",
        "BIS Hallmark certification",
        "Secure packaging"
      ]
    }
  ];

  const designCategories = [
    {
      icon: "/icons/engagement-rings.webp",
      title: "Engagement Rings",
      description: "Create the perfect symbol of your love with a custom engagement ring designed just for your story."
    },
    {
      icon: "/icons/bridal-collections.webp",
      title: "Bridal Collections",
      description: "Complete bridal sets featuring coordinated necklace, earrings, and bangles for your special day."
    },
    {
      icon: "/icons/festival-jewelry.webp",
      title: "Festival Jewelry",
      description: "Stunning pieces for Diwali, weddings, and celebrations that capture the essence of tradition."
    },
    {
      icon: "/icons/heirloom-recreation.webp",
      title: "Heirloom Recreation",
      description: "Recreate precious family heirlooms with the same beauty, weight, and significance."
    },
    {
      icon: "/icons/contemporary-art.webp",
      title: "Contemporary Art",
      description: "Modern, bold designs that make a statement and showcase your unique personal style."
    },
    {
      icon: "/icons/statement-pieces.webp",
      title: "Statement Pieces",
      description: "One-of-a-kind showstopper jewelry that becomes a treasured conversation piece."
    }
  ];

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
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f6e2c7] mb-4">
              Bespoke Jewelry Crafting
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-white">
              Custom Designs Made Just For You
            </h1>
            <p className="text-xl text-[#f6e2c7] max-w-3xl mx-auto">
              Transform your inspiration into a masterpiece. From sketches to reality, we create jewelry that tells your unique story.
            </p>
          </div>
        </div>
      </section>

      {/* Why Custom Designs */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#3f0d1c] mb-4">
              Why Choose Custom Designs?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mass-produced jewelry tells a generic story. Custom-designed jewelry tells yours.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-[#f9f5f0] p-8 text-center">
              <Heart className="w-12 h-12 text-[#5a1024] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#3f0d1c] mb-3">Personal Touch</h3>
              <p className="text-gray-600">
                Every piece reflects your personality, preferences, and the moments that matter most to you.
              </p>
            </div>

            <div className="rounded-lg bg-[#f9f5f0] p-8 text-center">
              <Award className="w-12 h-12 text-[#5a1024] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#3f0d1c] mb-3">Guaranteed Quality</h3>
              <p className="text-gray-600">
                Handcrafted with precision by master artisans using only the finest materials and BIS certification.
              </p>
            </div>

            <div className="rounded-lg bg-[#f9f5f0] p-8 text-center">
              <Zap className="w-12 h-12 text-[#5a1024] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#3f0d1c] mb-3">Transparent Process</h3>
              <p className="text-gray-600">
                Know exactly what you're getting—complete clarity on weight, purity, carat, and pricing at every stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="bg-[#f9f5f0] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#3f0d1c] mb-4">
              Our 4-Step Custom Design Process
            </h2>
            <p className="text-xl text-gray-600">
              From concept to creation, we ensure every step reflects your vision
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="grid gap-8 md:grid-cols-2 md:items-center">
                  {/* Step Info */}
                  <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="rounded-lg bg-white p-8 shadow-lg">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#5a1024] text-white text-2xl font-bold">
                          {step.number}
                        </div>
                        <h3 className="text-3xl font-bold text-[#3f0d1c]">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 text-lg mb-6">{step.description}</p>
                      <ul className="space-y-3">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#5a1024] flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className="rounded-lg overflow-hidden h-64 md:h-96">
                      <Image
                        src={step.image}
                        alt={step.title}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                        priority={index < 2}
                      />
                    </div>
                  </div>
                </div>

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-8">
                    <ArrowRight className="w-6 h-6 text-[#5a1024] transform rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Categories */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#3f0d1c] mb-4">
              What We Create
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We specialize in bringing to life jewelry pieces across every category and occasion
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {designCategories.map((category, index) => (
              <div
                key={index}
                className="rounded-lg border border-[#e8d7c3] p-8 hover:shadow-lg transition-all hover:border-[#5a1024]"
              >
                <div className="flex justify-center mb-4">
                  <div className="relative h-20 w-20">
                    <Image
                      src={category.icon}
                      alt={`${category.title} icon`}
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#3f0d1c] mb-3">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#3f0d1c] text-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote: "I couldn't imagine a better experience. They took my grandmother's design and recreated it beautifully. The craftsmanship is exceptional.",
                author: "Priya M.",
                service: "Heirloom Recreation"
              },
              {
                quote: "My engagement ring turned out to be more beautiful than I ever imagined. Every detail was perfect, and the team was so supportive throughout.",
                author: "Sarah K.",
                service: "Custom Engagement Ring"
              },
              {
                quote: "The transparency in pricing and the regular updates during the crafting process made me feel confident in my investment. Highly recommended!",
                author: "Anjali S.",
                service: "Bridal Collection"
              }
            ].map((testimonial, i) => (
              <div key={i} className="rounded-lg bg-white/10 p-8 backdrop-blur-sm border border-white/20">
                <p className="text-lg text-[#f6e2c7] mb-6 italic">"{testimonial.quote}"</p>
                <div className="border-t border-white/20 pt-4">
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-[#f6e2c7]">{testimonial.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Value */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#3f0d1c] mb-6">
                An Investment in Timeless Beauty
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Custom-designed jewelry isn't just beautiful—it's a smart investment. Handcrafted pieces with certified purity and quality appreciate in value over time.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Unlike mass-produced items, your custom piece is one-of-a-kind and irreplaceable. It becomes part of your family legacy, passed down with stories and memories.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#5a1024] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">BIS Hallmark certification ensures authenticity</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#5a1024] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Transparent documentation of weight and purity</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#5a1024] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Lifetime craftsmanship and quality guarantee</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#5a1024] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Appreciates in value with precious metals</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-[#3f0d1c] to-[#5a1024] h-96 flex items-center justify-center text-white">
              <div className="relative h-48 w-48">
                <Image
                  src="/icons/iconforge-diamond-brilliance-1764524797236.webp"
                  alt="Diamond brilliance icon"
                  fill
                  sizes="192px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f9f5f0] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#3f0d1c] mb-6">
            Ready to Create Your Masterpiece?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's start your custom design journey today. Our team is excited to bring your vision to life!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#5a1024] text-white font-semibold rounded-lg hover:bg-[#711533] transition-colors"
            >
              Start Your Design
            </Link>
            <a
              href="https://wa.me/917204456583?text=I'd%20like%20to%20create%20a%20custom%20design"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#5a1024] text-[#5a1024] font-semibold rounded-lg hover:bg-[#5a1024] hover:text-white transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
