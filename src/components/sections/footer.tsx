'use client';

import { useState } from 'react';
import { Instagram, MessageSquare, X } from 'lucide-react';
import Link from 'next/link';

const goldDiamondCTA = [
  {
    id: 'gold',
    title: 'Gold Jewellery',
    description:
      'BIS hallmarked purity plus transparent pricing. Chat with us to pre-book pieces before the launch.',
    whatsappText: 'Hi Mulveer team, I would like to know about your gold jewellery collection launch.',
  },
  {
    id: 'diamond',
    title: 'Diamond Jewellery',
    description:
      'Certified diamonds with lifetime care. Reach out to preview upcoming diamond sets and reserve yours.',
    whatsappText: 'Hi Mulveer team, I am interested in your diamond jewellery collection.',
  },
];

const Footer = () => {
  const [activeCTA, setActiveCTA] = useState<string | null>(null);
  const whatsappBase = 'https://wa.me/917204456583';
  const activeCTAData = goldDiamondCTA.find((item) => item.id === activeCTA) ?? null;

  return (
    <footer className="bg-[#1a050d] text-white font-body">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Informations Column */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Informations</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-[15px] text-white hover:text-[#d4af37] transition-colors">About Mulveer</Link></li>
              <li><Link href="/contact" className="text-[15px] text-white hover:text-[#d4af37] transition-colors">Contact & Store Timings</Link></li>
              <li><Link href="/blog" className="text-[15px] text-white hover:text-[#d4af37] transition-colors">Blog & Guides</Link></li>
              <li><Link href="/orders" className="text-[15px] text-white hover:text-[#d4af37] transition-colors">Order History</Link></li>
              <li><Link href="/faq" className="text-[15px] text-white hover:text-[#d4af37] transition-colors">FAQ</Link></li>
              <li><Link href="/policies/terms" className="text-[15px] text-white hover:text-[#d4af37] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Customer Services Column */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Customer Services</h3>
            <ul className="space-y-3 text-white text-[15px]">
              <li>Jewellery Repair &amp; Polishing</li>
              <li>Gold Exchange &amp; Buyback</li>
              <li>Custom &amp; Made‑to‑Order Designs</li>
              <li>Wedding &amp; Festive Consultation</li>
            </ul>
          </div>

          {/* You might also like Column */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Explore Collections</h3>
            <ul className="space-y-3">
              <li><Link href="/collections" className="text-[15px] text-white hover:text-[#d4af37] transition-colors">All Collections</Link></li>
              <li><Link href="/custom-designs" className="text-[15px] text-white hover:text-[#d4af37] transition-colors">Custom Designs</Link></li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveCTA('gold')}
                  className="flex items-center gap-2 text-[15px] text-white hover:text-[#d4af37] transition-colors focus:outline-none focus:underline"
                >
                  Gold Jewellery
                  <span className="rounded-full bg-[#f6e2c7] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5a1024]">
                    Coming Soon
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveCTA('diamond')}
                  className="flex items-center gap-2 text-[15px] text-white hover:text-[#d4af37] transition-colors focus:outline-none focus:underline"
                >
                  Diamond Jewellery
                  <span className="rounded-full bg-[#f6e2c7] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5a1024]">
                    Coming Soon
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contact Us</h3>
            <div className="space-y-3 text-[15px] text-white">
              <p className="font-bold text-sm" style={{color: '#f5f5f0'}}>78, Jamboti Road, Piranwadi, Belagavi, Karnataka, PIN - 590011</p>
              <p>
                <a
                  href="tel:+919481656583"
                  className="text-white hover:text-[#d4af37] transition-colors"
                >
                  +91 9481656583
                </a>
              </p>
              <p>
                <a
                  href="tel:+919448340076"
                  className="text-white hover:text-[#d4af37] transition-colors"
                >
                  +91 9448340076
                </a>
              </p>
              <p>
                <a
                  href="tel:08312412030"
                  className="text-white hover:text-[#d4af37] transition-colors"
                >
                  0831-2412030
                </a>
              </p>
              <p>
                <a
                  href="mailto:support@mulveerjewellers.com"
                  className="text-white hover:text-[#d4af37] transition-colors"
                >
                  support@mulveerjewellers.com
                </a>
              </p>
            </div>
            <h3 className="text-lg font-bold mt-6 mb-4 text-white">Follow Us</h3>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/mulveer_jewellers/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#d4af37] transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://api.whatsapp.com/send?phone=+919481656583" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-[#d4af37] transition-colors">
                <MessageSquare size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-400">
          <p className="text-sm">© 2025 Mulveer Jewellers. All Rights Reserved</p>
        </div>
      </div>
      {activeCTAData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-[#e8d7c3] bg-white p-6 sm:p-8 shadow-2xl">
            <button
              aria-label="Close modal"
              onClick={() => setActiveCTA(null)}
              className="absolute right-4 top-4 rounded-full bg-[#f9f5f0] p-2 text-[#3f0d1c] hover:bg-[#f1e5d8] focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            >
              <span className="sr-only">Close</span>
              <X size={18} />
            </button>
            <div className="inline-flex items-center rounded-full bg-[#f6e2c7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5a1024]">
              Coming Soon
            </div>
            <h3 className="mt-4 text-3xl font-bold text-[#3f0d1c]">
              {activeCTAData.title}
            </h3>
            <p className="mt-3 text-base text-gray-700 leading-relaxed">
              {activeCTAData.description}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href={`${whatsappBase}?text=${encodeURIComponent(activeCTAData.whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-white font-semibold shadow-sm transition hover:bg-[#1ebe5a] focus:outline-none focus:ring-2 focus:ring-[#1ebe5a] focus:ring-offset-2"
              >
                <MessageSquare size={18} />
                WhatsApp Now
              </a>
              <button
                type="button"
                onClick={() => setActiveCTA(null)}
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
              and mention the {activeCTAData.title} launch.
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
