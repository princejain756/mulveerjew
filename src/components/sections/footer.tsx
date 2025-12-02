import { Facebook, Instagram, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
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
              <li><Link href="/products?category=gold" className="text-[15px] text-white hover:text-[#d4af37] transition-colors">Gold Jewellery</Link></li>
              <li><Link href="/products?category=diamond" className="text-[15px] text-white hover:text-[#d4af37] transition-colors">Diamond Jewellery</Link></li>
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
    </footer>
  );
};

export default Footer;
