'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ChevronLeft, ChevronRight, MessageCircle, X } from 'lucide-react';
import TopNotificationBar from '@/components/sections/top-notification-bar';
import HeaderTopInfo from '@/components/sections/header-top-info';
import MainHeader from '@/components/sections/main-header';
import MainNavigation from '@/components/sections/main-navigation';
import Footer from '@/components/sections/footer';

type LatestDesign = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  images: string[];
};

const DesignShowcaseCard = ({ design }: { design: LatestDesign }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalImages = design.images.length;

  const goToSlide = (direction: 'next' | 'prev') => {
    setActiveIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % totalImages;
      }
      return (prev - 1 + totalImages) % totalImages;
    });
  };

  return (
    <div className="flex flex-col rounded-2xl border border-[#e8d7c3] bg-white shadow-sm hover:shadow-xl transition-shadow">
      <div className="relative h-[360px] overflow-hidden rounded-t-2xl bg-[#fdf8f3]">
        <Image
          key={design.images[activeIndex]}
          src={design.images[activeIndex]}
          alt={`${design.title} view ${activeIndex + 1}`}
          fill
          className="object-contain transition-opacity duration-300"
          sizes="(min-width: 1024px) 320px, 100vw"
        />
        {totalImages > 1 && (
          <>
            <button
              type="button"
              onClick={() => goToSlide('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-[#3f0d1c] shadow hover:bg-white"
              aria-label="Previous view"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goToSlide('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-[#3f0d1c] shadow hover:bg-white"
              aria-label="Next view"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {design.images.map((_, index) => (
                <button
                  key={`${design.id}-dot-${index}`}
                  type="button"
                  aria-label={`Show view ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 w-8 rounded-full transition-all ${
                    activeIndex === index ? 'bg-[#5a1024]' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#5a1024]">
          {activeIndex + 1} / {totalImages}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-[#a55a35]">{design.subtitle}</p>
          <h3 className="text-2xl font-semibold text-[#3f0d1c]">{design.title}</h3>
          <p className="mt-2 text-sm text-gray-600">{design.description}</p>
        </div>
        <ul className="space-y-2">
          {design.highlights.map((highlight) => (
            <li key={`${design.id}-${highlight}`} className="flex items-center gap-2 text-sm text-[#3f0d1c]">
              <span className="h-2 w-2 rounded-full bg-[#f4c430]" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function CollectionsPage() {
  const collections = [
    {
      id: 'signature',
      name: 'Signature Collections',
      description: 'Curated timeless pieces that define our brand identity and exceptional craftsmanship.',
      icon: '/icons/signature-collections.webp',
      href: '/products?collection=signature'
    },
    {
      id: 'bridal',
      name: 'Bridal Elegance',
      description: 'Complete bridal sets designed to celebrate your special moments with grace and sophistication.',
      icon: '/icons/bridal-elegance.webp',
      href: '/products?collection=bridal'
    },
    {
      id: 'everyday',
      name: 'Everyday Elegance',
      description: 'Versatile pieces perfect for daily wear, combining comfort with understated luxury.',
      icon: '/icons/everyday-elegance.webp',
      href: '/products?collection=everyday'
    },
    {
      id: 'ethnic',
      name: 'Ethnic Heritage',
      description: 'Traditional designs celebrating cultural richness and timeless Indian aesthetics.',
      icon: '/icons/ethnic-heritage.webp',
      href: '/products?collection=ethnic'
    },
    {
      id: 'minimal',
      name: 'Modern Minimalist',
      description: 'Contemporary designs featuring clean lines and bold statements for the modern woman.',
      icon: '/icons/modern-minimalist.webp',
      href: '/products?collection=minimal'
    },
    {
      id: 'festival',
      name: 'Festival Specials',
      description: 'Stunning pieces for Diwali, celebrations, and special occasions throughout the year.',
      icon: '/icons/festival-jewelry.webp',
      href: '/products?collection=festival'
    },
    {
      id: 'diamond',
      name: 'Diamond Brilliance',
      description: 'Premium diamond jewelry showcasing exceptional sparkle and investment value.',
      icon: '/icons/iconforge-diamond-brilliance-1764524797236.webp',
      href: '/products?collection=diamond'
    },
    {
      id: 'under99',
      name: 'Treasure Hunt',
      description: 'Amazing pieces starting from just ₹99—beauty and quality within your budget.',
      icon: '/icons/iconforge-treasure-hunt-1764524800686.webp',
      href: '/products?collection=under99'
    }
  ];

  const [activeCollection, setActiveCollection] = useState<(typeof collections)[number] | null>(null);
  const [activeCategory, setActiveCategory] = useState<{ name: string; icon: string } | null>(null);
  const whatsappBase = 'https://wa.me/917204456583';

  const categories = [
    { name: 'Rings', icon: '/icons/rings.webp', count: '120+' },
    { name: 'Necklaces', icon: '/icons/necklaces.webp', count: '85+' },
    { name: 'Earrings', icon: '/icons/earrings.webp', count: '95+' },
    { name: 'Bracelets', icon: '/icons/bracelets.webp', count: '60+' },
    { name: 'Bangles', icon: '/icons/bangles.webp', count: '75+' },
    { name: 'Sets', icon: '/icons/sets.webp', count: '45+' }
  ];

  const latestDesigns: LatestDesign[] = [
    {
      id: 'design-1',
      title: 'Design 1',
      subtitle: 'Signature Ensemble',
      description: 'Paired bridal sets featuring ornate gold layering for statement entrances.',
      highlights: [
        'Includes Haaram & Choker combinations',
        'Balanced to sit beautifully on silk sarees',
        'Detailed motifs showcased from two angles'
      ],
      images: [
        '/Designs/bridal-gold-necklace-set-traditional-south-indian-mulveer-jewellers.webp',
        '/Designs/south-indian-bridal-gold-jewellery-set-mulveer-jewellers.jpg.webp'
      ]
    },
    {
      id: 'design-2',
      title: 'Design 2',
      subtitle: 'Gold Beaded Elegance',
      description: 'Two perspectives of the same handcrafted beaded set to highlight the ruby drop detail.',
      highlights: [
        'Matching jhumkas complete the look',
        'Polished finish keeps beads luminous',
        'Ruby pendant brings colour pop'
      ],
      images: [
        '/Designs/gold-beaded-necklace-with-jhumka-earrings-mulveer-jewellers.jpg.webp',
        '/Designs/gold-beaded-necklace-with-ruby-pendant-and-jhumka-earrings-mulveer-jewellers.jpg.webp'
      ]
    },
    {
      id: 'design-3',
      title: 'Design 3',
      subtitle: 'Temple Classic',
      description: 'Rich-toned haaram captured from the new collection for close-up inspection.',
      highlights: [
        'Two curated angles showing beadwork',
        'Perfect drape length for traditional occasions',
        'Pair with bold jhumkas for symmetry'
      ],
      images: [
        '/collections/gold/1.webp',
        '/collections/gold/2.webp'
      ]
    },
    {
      id: 'design-4',
      title: 'Design 4',
      subtitle: 'Ruby Heritage',
      description: 'Minimalist collar that still delivers drama through ruby-inspired pendants.',
      highlights: [
        'Balanced collar fit keeps it comfortable all day',
        'Detailed close-up views for online shoppers',
        'Subtle matte-gold finish keeps spotlight on the ruby'
      ],
      images: [
        '/collections/gold/3.webp',
        '/collections/gold/4.webp'
      ]
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
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-white">
              Our Collections
            </h1>
            <p className="text-xl text-[#f6e2c7] max-w-3xl mx-auto">
              Explore our carefully curated collections, each telling a unique story of craftsmanship and elegance.
            </p>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {collections.map((collection) => (
              <button
                key={collection.id}
                type="button"
                onClick={() => setActiveCollection(collection)}
                className="group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all bg-white text-left focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2"
                aria-label={`${collection.name} coming soon, tap to WhatsApp`}
              >
                <div className="h-48 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="relative h-32 w-32">
                    <Image
                      src={collection.icon}
                      alt={`${collection.name} icon`}
                      fill
                      sizes="160px"
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="bg-white p-6">
                  <h3 className="text-xl font-bold text-[#3f0d1c] mb-2 group-hover:text-[#5a1024] transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {collection.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[#5a1024] font-semibold group-hover:gap-3 transition-all">
                    <span>Coming Soon</span>
                    <span>→</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-[#f9f5f0] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#3f0d1c] mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Find exactly what you're looking for
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
            {categories.map((category) => (
              <button
                key={category.name}
                type="button"
                onClick={() => setActiveCategory(category)}
                className="rounded-lg bg-white p-6 text-center hover:shadow-lg transition-shadow border border-[#e8d7c3] hover:border-[#5a1024] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2"
                aria-label={`${category.name} coming soon, tap to WhatsApp`}
              >
                <div className="flex justify-center mb-3">
                  <div className="relative h-16 w-16">
                    <Image
                      src={category.icon}
                      alt={`${category.name} icon`}
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#3f0d1c] mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-[#5a1024] font-semibold">Coming Soon</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Metals Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#3f0d1c] mb-4">
              Choose Your Metal
            </h2>
            <p className="text-xl text-gray-600">
              Premium quality in every choice
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {[
              {
                name: '24K Gold',
                purity: '99.99%',
                description: 'Purest form of gold—ideal for sacred pieces and investment-worthy heirlooms.',
                color: '#f4c430'
              },
              {
                name: '22K Gold',
                purity: '91.67%',
                description: 'Our signature collection featuring the finest 22K gold, perfect for daily wear and special occasions.',
                color: '#D4AF37'
              },
              {
                name: '20K Gold',
                purity: '83.33%',
                description: 'Balanced purity for ornate designs that still enjoy excellent durability.',
                color: '#d1a54b'
              },
              {
                name: '18K Gold',
                purity: '75%',
                description: 'Premium quality with durability, ideal for studded pieces and modern designs.',
                color: '#E6B800'
              },
              {
                name: '925 Silver',
                purity: '92.5%',
                description: 'Exquisite silver jewelry with timeless appeal and exceptional shine.',
                color: '#C0C0C0'
              }
            ].map((metal) => (
              <div key={metal.name} className="rounded-lg border border-[#e8d7c3] p-8 hover:shadow-lg transition-shadow">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                  style={{ backgroundColor: metal.color }}
                />
                <h3 className="text-2xl font-bold text-[#3f0d1c] text-center mb-1">
                  {metal.name}
                </h3>
                <p className="text-lg text-[#5a1024] font-semibold text-center mb-4">
                  {metal.purity} Pure
                </p>
                <p className="text-gray-600 text-center">
                  {metal.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#3f0d1c] text-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-[#f6e2c7]" />
              <h3 className="text-xl font-bold mb-2 text-white">BIS Hallmarked</h3>
              <p className="text-[#f6e2c7]">Every piece certified for authenticity and purity</p>
            </div>
            <div className="text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-[#f6e2c7]" />
              <h3 className="text-xl font-bold mb-2 text-white">Expert Crafted</h3>
              <p className="text-[#f6e2c7]">Handmade by master artisans with decades of experience</p>
            </div>
            <div className="text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-[#f6e2c7]" />
              <h3 className="text-xl font-bold mb-2 text-white">Lifetime Care</h3>
              <p className="text-[#f6e2c7]">Repair, cleaning, and maintenance for life</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Additions */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#3f0d1c] mb-4">
              Just Launched
            </h2>
            <p className="text-xl text-gray-600">
              Fresh designs added weekly
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {latestDesigns.map((design) => (
              <DesignShowcaseCard key={design.id} design={design} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f9f5f0] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#3f0d1c] mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We create custom designs tailored to your vision. Let's bring your dream piece to life.
          </p>
          <Link
            href="/custom-designs"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#5a1024] text-white font-semibold rounded-lg hover:bg-[#711533] transition-colors"
          >
            Explore Custom Designs
          </Link>
        </div>
      </section>
      </main>
      {activeCollection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-2xl rounded-2xl border border-[#e8d7c3] bg-white p-6 sm:p-8 shadow-2xl">
            <button
              aria-label="Close dialog"
              onClick={() => setActiveCollection(null)}
              className="absolute right-4 top-4 rounded-full bg-[#f9f5f0] p-2 text-[#3f0d1c] hover:bg-[#f1e5d8] focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            >
              <X size={18} />
            </button>
            <div className="inline-flex items-center rounded-full bg-[#f6e2c7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5a1024]">
              Coming Soon
            </div>
            <h3 className="mt-4 text-3xl font-bold text-[#3f0d1c]">
              {activeCollection.name}
            </h3>
            <p className="mt-3 text-base text-gray-700 leading-relaxed">
              {activeCollection.description} — this collection is about to launch. Chat with our Belagavi stylist to preview designs, pre-book pieces, or reserve launch offers before the drop.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href={`${whatsappBase}?text=${encodeURIComponent(
                  `Hi Mulveer team, I want to explore the ${activeCollection.name} collection. Please share options, pricing, and launch dates.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-white font-semibold shadow-sm transition hover:bg-[#1ebe5a] focus:outline-none focus:ring-2 focus:ring-[#1ebe5a] focus:ring-offset-2 focus:ring-offset-white"
              >
                <MessageCircle size={18} />
                WhatsApp a Stylist
              </a>
              <button
                type="button"
                onClick={() => setActiveCollection(null)}
                className="inline-flex items-center justify-center rounded-lg border border-[#5a1024] px-4 py-3 text-[#5a1024] font-semibold transition hover:bg-[#5a1024] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#5a1024] focus:ring-offset-2 focus:ring-offset-white"
              >
                Close
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Prefer a call? Dial{' '}
              <a href="tel:+917204456583" className="font-semibold text-[#5a1024] hover:underline">
                +91 7204456583
              </a>{' '}
              and mention “{activeCollection.name} launch”.
            </p>
          </div>
        </div>
      )}
      {activeCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-xl rounded-2xl border border-[#e8d7c3] bg-white p-6 sm:p-8 shadow-2xl">
            <button
              aria-label="Close dialog"
              onClick={() => setActiveCategory(null)}
              className="absolute right-4 top-4 rounded-full bg-[#f9f5f0] p-2 text-[#3f0d1c] hover:bg-[#f1e5d8] focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            >
              <X size={18} />
            </button>
            <div className="inline-flex items-center rounded-full bg-[#f6e2c7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5a1024]">
              Coming Soon
            </div>
            <h3 className="mt-4 text-3xl font-bold text-[#3f0d1c]">
              {activeCategory.name}
            </h3>
            <p className="mt-3 text-base text-gray-700 leading-relaxed">
              This category is about to launch online. Chat with a stylist to see available designs, reserve pieces, or request previews before we publish.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href={`${whatsappBase}?text=${encodeURIComponent(
                  `Hi Mulveer team, I'm interested in the ${activeCategory.name} category. Please share options and prices.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-white font-semibold shadow-sm transition hover:bg-[#1ebe5a] focus:outline-none focus:ring-2 focus:ring-[#1ebe5a] focus:ring-offset-2 focus:ring-offset-white"
              >
                <MessageCircle size={18} />
                WhatsApp a Stylist
              </a>
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className="inline-flex items-center justify-center rounded-lg border border-[#5a1024] px-4 py-3 text-[#5a1024] font-semibold transition hover:bg-[#5a1024] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#5a1024] focus:ring-offset-2 focus:ring-offset-white"
              >
                Close
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Prefer a call? Dial{' '}
              <a href="tel:+917204456583" className="font-semibold text-[#5a1024] hover:underline">
                +91 7204456583
              </a>{' '}
              and mention “{activeCategory.name} launch”.
            </p>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
