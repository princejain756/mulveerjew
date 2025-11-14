"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <nav className="hidden lg:block bg-[#2a0714] border-b border-[#5f2130] text-white shadow-sm">
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
        </ul>
      </div>
    </nav>
  );
};

export default MainNavigation;
