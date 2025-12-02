"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

type CollectionCard = {
  name: string;
  href: string;
  badge: string;
  description: string;
};

const collections = [
  {
    name: "Gold Jewellery",
    href: "/products?category=gold",
    badge: "24K, 22K, 20K & 18K",
    description: "Temple, bridal & everyday gold designs crafted with purity.",
  },
  {
    name: "Silver Jewellery",
    href: "/products?category=silver",
    badge: "Pure Silver",
    description: "Elegant silver ornaments and articles with guaranteed purity.",
  },
  {
    name: "Diamond Jewellery",
    href: "/products?category=diamond",
    badge: "Certified Diamonds",
    description: "Timeless diamond pieces for special moments and daily grace.",
  },
]; // pre-launch items; show modal instead of navigating

const CollectionShowcase = () => {
  const [activeCollection, setActiveCollection] = useState<CollectionCard | null>(null);
  const whatsappBase = "https://wa.me/917204456583";

  return (
    <>
      <section id="collections" className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-center text-foreground font-medium mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "40px", lineHeight: 1.1 }}
          >
            Explore Our Jewellery Collections
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-muted-foreground">
            From sacred temple-inspired gold to modern minimal silver and certified diamonds,
            each collection is crafted to reflect both devotion and contemporary elegance.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {collections.map((collection) => (
              <button
                key={collection.name}
                type="button"
                onClick={() => setActiveCollection(collection)}
                className="group relative flex h-full flex-col justify-between overflow-hidden border border-border bg-card px-6 py-7 text-left shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-background"
                aria-label={`${collection.name} coming soon, tap to WhatsApp`}
              >
                <div className="mb-6">
                  <span className="inline-flex items-center rounded-full bg-[#f6e2c7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5a1024]">
                    {collection.badge}
                  </span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {collection.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center text-xs font-semibold uppercase tracking-[0.18em] text-[#d4af37]">
                  Coming Soon
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeCollection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-xl rounded-2xl border border-[#e8d7c3] bg-white p-6 sm:p-8 shadow-2xl">
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
              {activeCollection.description} — this collection is about to launch. Chat with our Belagavi stylist to pre-book designs, get live photos, or reserve pieces before they go online.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href={`${whatsappBase}?text=${encodeURIComponent(
                  `Hi Mulveer team, I'm interested in the ${activeCollection.name} collection. Can you share options and prices?`
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
              Prefer a call? Dial <a href="tel:+917204456583" className="font-semibold text-[#5a1024] hover:underline">+91 7204456583</a> and mention “{activeCollection.name} launch”.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionShowcase;
