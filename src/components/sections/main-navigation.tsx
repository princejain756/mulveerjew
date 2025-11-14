"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import GoldRatePopup from "@/components/GoldRatePopup";

type NavItem = {
  title: string;
  href: string;
};

export const navLinks: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Collections", href: "/collections" },
  { title: "Custom Designs", href: "/custom-designs" },
  { title: "About", href: "/about" },
  { title: "FAQ", href: "/faq" },
  { title: "Contact", href: "/contact" },
];

const MainNavigation = () => {
  const pathname = usePathname();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [goldData, setGoldData] = useState<{ rate22k: number | null } | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch("/api/gold-price");
        if (res.ok) {
          const json = await res.json();
          setGoldData({ rate22k: json.rate22k });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav className="sticky top-[105px] z-40 hidden lg:block bg-[#2a0714] border-b border-[#5f2130] text-white shadow-sm">
        <div className="mx-auto max-w-[1200px]">
          <ul className="flex items-center justify-center">
            {navLinks.map((link) => (
              <li key={link.title} className="group relative">
                <Link
                  href={link.href}
                  className={`flex items-center gap-1.5 px-4 py-4 text-xs font-semibold uppercase tracking-[0.18em] border-b-2 transition-colors duration-200
                    ${pathname === link.href ? 'text-accent border-accent' : 'text-white border-transparent hover:text-accent'}
                  `}
                >
                  <span>{link.title}</span>
                </Link>
              </li>
            ))}
            {/* Gold Rate Button */}
            <li className="relative">
              <button
                onClick={() => setIsPopupOpen(true)}
                className="ml-4 flex items-center gap-2 rounded-md bg-[#5a1024] px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:bg-[#6a1424]"
              >
                <span>Today's Rate</span>
                {goldData?.rate22k && (
                  <span className="text-yellow-300">
                    ₹{goldData.rate22k.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <GoldRatePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
};

export default MainNavigation;
