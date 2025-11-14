"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Search, Settings, Heart, ShoppingBag } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { navLinks } from './main-navigation';
import { useAuth } from '@/contexts/AuthContext';

function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: (event: MouseEvent | TouchEvent) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default function MainHeader() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [goldData, setGoldData] = useState<{ rate20k: number | null; rate22k: number | null } | null>(null);

  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  const settingsRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(settingsRef, () => setIsSettingsOpen(false));
  useOnClickOutside(mobileMenuRef, () => setIsMobileMenuOpen(false));

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch("/api/gold-price");
        if (res.ok) {
          const json = await res.json();
          setGoldData({ rate20k: json.rate20k, rate22k: json.rate22k });
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
    <header className="sticky top-0 z-50 w-full border-b border-[#5f2130] bg-[#3f0d1c] text-white shadow-sm">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-col">
          <div className="flex w-full items-center">
            {/* Left Side */}
            <div className="flex-1">
              <div className="flex items-center lg:hidden">
                <button
                  className="p-2"
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-main-nav"
                  onClick={() => setIsMobileMenuOpen(prev => !prev)}
                >
                  <Menu size={22} />
                </button>
                <button className="p-2" aria-label="Search">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Center: Logo */}
            <div className="py-5">
              <Link href="/" aria-label="Mulveer Jewellers">
                <Image
                  src="/mulverrlog.png"
                  alt="Mulveer Jewellers"
                  width={150}
                  height={38}
                  priority
                />
              </Link>
            </div>

            {/* Right Side: Icons */}
            <div className="flex flex-1 items-center justify-end space-x-0 md:space-x-1">
              <a href="#" className="hidden p-2 transition-colors hover:text-accent lg:block" aria-label="Search">
                <Search size={20} />
              </a>
              <div ref={settingsRef} className="relative">
                <button onClick={() => setIsSettingsOpen(prev => !prev)} className="p-2 transition-colors hover:text-accent" aria-label="Account">
                  <Settings size={20} />
                </button>
                {isSettingsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 border border-border bg-background p-4 text-left shadow-lg">
                    {isAuthenticated ? (
                      <>
                        <p className="mb-2 text-sm font-semibold text-foreground">
                          Hello, {user?.name || 'Guest'}
                        </p>
                        {user?.role === 'admin' && (
                          <button
                            className="mb-2 block w-full rounded-sm bg-primary py-2 text-sm text-primary-foreground hover:bg-primary/90"
                            onClick={() => {
                              setIsSettingsOpen(false);
                              router.push('/admin');
                            }}
                          >
                            Admin Dashboard
                          </button>
                        )}
                        <button
                          className="mb-2 block w-full rounded-sm bg-secondary py-2 text-sm text-secondary-foreground hover:bg-secondary/90"
                          onClick={() => {
                            setIsSettingsOpen(false);
                            router.push('/orders');
                          }}
                        >
                          My Orders
                        </button>
                        <button
                          className="mt-1 w-full text-left text-sm text-destructive hover:underline"
                          onClick={() => {
                            logout();
                            setIsSettingsOpen(false);
                            router.push('/');
                          }}
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="mb-3 block w-full bg-primary py-2 text-center text-sm text-primary-foreground no-underline hover:bg-primary/90"
                          onClick={() => setIsSettingsOpen(false)}
                        >
                          LOGIN
                        </Link>
                        <p className="text-center text-sm text-muted-foreground">
                          New User?{' '}
                          <Link
                            href="/register"
                            className="text-primary hover:underline"
                            onClick={() => setIsSettingsOpen(false)}
                          >
                            Register Now
                          </Link>
                        </p>
                      </>
                    )}
                    <Link
                      href="/pages/wishlist"
                      className="mt-2 block text-center text-sm text-primary hover:underline lg:hidden"
                      onClick={() => setIsSettingsOpen(false)}
                    >
                      Wishlist
                    </Link>
                  </div>
                )}
              </div>
              <a href="/pages/wishlist" className="relative hidden p-2 transition-colors hover:text-accent lg:block" aria-label="Wishlist">
                <Heart size={20} />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  0
                </span>
              </a>
              <a href="/cart" className="relative p-2 transition-colors hover:text-accent" aria-label="Cart">
                <ShoppingBag size={20} />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  0
                </span>
              </a>
            </div>
          </div>

          <div className="w-full flex items-center justify-center gap-2 pb-2 pt-2 text-xs md:text-sm lg:pb-3.5 lg:pt-3">
            <p className="text-center tracking-wide text-[#f6e2c7]">
              Gold, Silver & Diamond Jewellery · Belagavi · Since 2000
            </p>
            {goldData && (
              <span className="ml-2 border-l border-[#f6e2c7] pl-2 text-[#f6e2c7] whitespace-nowrap">
                {goldData.rate22k && (
                  <span>22K: ₹{goldData.rate22k.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                )}
                {goldData.rate22k && goldData.rate20k && <span className="mx-1">•</span>}
                {goldData.rate20k && (
                  <span>20K: ₹{goldData.rate20k.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                )}
              </span>
            )}
          </div>

          {/* Mobile navigation (hamburger menu) */}
          {isMobileMenuOpen && (
            <nav
              id="mobile-main-nav"
              ref={mobileMenuRef}
              className="mt-1 border-t border-[#5f2130] pt-2 pb-3 lg:hidden"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className={`block px-2 py-2 text-sm font-semibold uppercase tracking-[0.15em] ${
                        pathname === link.href
                          ? 'text-accent'
                          : 'text-white hover:text-accent'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
