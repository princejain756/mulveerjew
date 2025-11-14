"use client";

import Link from "next/link";
import { Heart, Sparkles, ShieldCheck, CalendarCheck, Gift, Gem, ArrowRight } from "lucide-react";
import TopNotificationBar from "@/components/sections/top-notification-bar";
import HeaderTopInfo from "@/components/sections/header-top-info";
import MainHeader from "@/components/sections/main-header";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";

const wishlistItems = [
  {
    id: "noor-polki",
    name: "Noor Polki Choker",
    description: "Royal kundan setting with cascading emerald droplets crafted for modern bridal looks.",
    price: "₹2,65,000",
    savedOn: "Saved on 12 Feb 2024",
    availability: "Ready within 7 days",
    tags: ["Limited Release", "22K Gold", "Polki"],
    accent: "from-[#f6d365] to-[#fda085]"
  },
  {
    id: "tara-studs",
    name: "Tara Diamond Studs",
    description: "Round brilliant diamonds with halo setting for everyday sparkle.",
    price: "₹74,800",
    savedOn: "Saved on 8 Feb 2024",
    availability: "Made to order in 3 days",
    tags: ["Diamond", "18K Gold", "Ready for Try-on"],
    accent: "from-[#fee2f8] to-[#d7a1f9]"
  },
  {
    id: "kalika-bangle",
    name: "Kalika Kada Bangle",
    description: "Intricately engraved kada with meenakari highlights inspired by temple motifs.",
    price: "₹1,48,600",
    savedOn: "Saved on 3 Feb 2024",
    availability: "Ships in 5 days",
    tags: ["Heritage", "Handcrafted", "Custom size"],
    accent: "from-[#f9f586] to-[#f0c27b]"
  }
];

const perks = [
  {
    title: "Reserve for free",
    description: "Lock-in today's price for 7 days with zero booking amount.",
    icon: ShieldCheck
  },
  {
    title: "Try at boutique",
    description: "Private appointment at our Belagavi studio with styling expert.",
    icon: Sparkles
  },
  {
    title: "Concierge updates",
    description: "Get WhatsApp reminders before pieces go out of stock.",
    icon: CalendarCheck
  }
];

const recommendations = [
  {
    name: "Aarna Diamond Pendant",
    description: "Minimalistic pendant with detachable chain for multi-wear styling.",
    theme: "from-rose-500/90 to-pink-400/90",
    badge: "Trending",
    href: "/products?category=pendant"
  },
  {
    name: "Heritage Bridal Suite",
    description: "Layered haar + choker + earrings curated by our design desk.",
    theme: "from-amber-500/90 to-orange-400/90",
    badge: "Customizable",
    href: "/custom-designs"
  },
  {
    name: "Minimal Daily Stack",
    description: "Three-piece bracelet stack in rose, yellow and white gold.",
    theme: "from-indigo-500/90 to-sky-400/90",
    badge: "Editor’s Pick",
    href: "/collections"
  }
];

const conciergeHighlights = [
  {
    title: "Personal stylist call",
    content: "Share outfits and occasions—our stylists recommend perfect matches from your wishlist.",
    icon: Gem
  },
  {
    title: "Gift wrapping",
    content: "Handwritten notes, velvet boxes and insured delivery across India.",
    icon: Gift
  },
  {
    title: "Wishlist monitoring",
    content: "We notify you as soon as prices change or complimentary offers begin.",
    icon: Heart
  }
];

export default function WishlistPage() {
  const hasItems = wishlistItems.length > 0;

  return (
    <div className="min-h-screen bg-[#f9f5f0]">
      <TopNotificationBar />
      <HeaderTopInfo />
      <MainHeader />
      <MainNavigation />
      <main className="pb-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#3f0d1c] to-[#5a1024] text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <div className="space-y-6 text-center">
              <p className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-1 text-sm tracking-[0.3em] uppercase">
                <Heart className="h-4 w-4" /> Wishlist
              </p>
              <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">Treasures you are saving for the perfect moment</h1>
              <p className="mx-auto max-w-3xl text-lg text-[#f6e2c7]">
                Keep favourite pieces close, track availability and book a private preview whenever you are ready.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/collections"
                  className="rounded-full bg-white px-8 py-3 text-base font-semibold uppercase tracking-[0.3em] text-[#3f0d1c] transition hover:bg-[#f6e2c7]"
                >
                  Explore collections
                </Link>
                <Link
                  href="/custom-designs"
                  className="rounded-full border border-white/40 px-8 py-3 text-base font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white"
                >
                  Book design consult
                </Link>
              </div>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { label: "Pieces saved", value: "03" },
                { label: "Next showcase", value: "Saturday, 5 PM" },
                { label: "Concierge", value: "+91 80882 40840" }
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-white/10 p-4 text-center">
                  <p className="text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="text-sm tracking-[0.35em] uppercase text-[#f6e2c7]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wishlist list */}
        <section className="relative -mt-12 px-4">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-3xl bg-white/90 p-6 shadow-2xl ring-1 ring-[#e8d7c3]/70 sm:p-10">
              <div className="flex flex-col gap-2 pb-6 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#b88d63]">Saved items</p>
                <h2 className="text-3xl font-semibold text-[#3f0d1c]">Your personalised edit</h2>
                <p className="text-gray-500">Ready when you are—reserve, customise or schedule an exclusive trial.</p>
              </div>
              {hasItems ? (
                <div className="space-y-6">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-[#f0e2d0] bg-gradient-to-br from-white to-[#fffaf5] p-6 shadow-sm"
                    >
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex flex-1 flex-col gap-4">
                          <div className={`inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r ${item.accent} px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#3f0d1c]`}>
                            <Sparkles className="h-4 w-4" /> Spotlight pick
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold text-[#3f0d1c]">{item.name}</h3>
                            <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                            <p className="mt-3 text-sm uppercase tracking-[0.3em] text-[#b88d63]">{item.savedOn}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <span key={tag} className="rounded-full border border-[#e5c8aa] px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#6f4127]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex w-full flex-col items-center gap-4 rounded-2xl bg-white/80 p-5 lg:w-64">
                          <p className="text-sm uppercase tracking-[0.3em] text-[#b88d63]">Valuation</p>
                          <p className="text-3xl font-semibold text-[#3f0d1c]">{item.price}</p>
                          <p className="text-sm text-gray-500">{item.availability}</p>
                          <div className="flex w-full flex-col gap-2">
                            <button className="rounded-full bg-[#3f0d1c] px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#541024]">
                              Move to cart
                            </button>
                            <button className="rounded-full border border-[#3f0d1c] px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#3f0d1c] transition hover:bg-[#3f0d1c] hover:text-white">
                              Schedule viewing
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6 rounded-2xl border border-dashed border-[#e8d7c3] bg-white/70 py-16 text-center">
                  <Heart className="h-12 w-12 text-[#e8d7c3]" />
                  <div>
                    <h3 className="text-2xl font-semibold text-[#3f0d1c]">Your wishlist is empty</h3>
                    <p className="mt-2 text-gray-600">Save favourites from the collection to unlock exclusive recommendations.</p>
                  </div>
                  <Link href="/collections" className="rounded-full bg-[#3f0d1c] px-6 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white">
                    Browse jewellery
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Perks */}
        <section className="mt-16">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row">
            <div className="flex-1 rounded-3xl bg-[#3f0d1c] p-8 text-white">
              <p className="text-sm uppercase tracking-[0.4em] text-[#f6e2c7]">Mulveer privilege</p>
              <h3 className="mt-4 text-3xl font-semibold">Wishlist concierge</h3>
              <p className="mt-3 text-[#f6e2c7]">
                Dedicated stylists monitor each wishlist and keep you informed about price protection, festive offers and workshop slots.
              </p>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {perks.map((perk) => {
                  const Icon = perk.icon;
                  return (
                    <div key={perk.title} className="rounded-2xl bg-white/10 p-4 text-sm">
                      <Icon className="mb-3 h-6 w-6 text-[#f6e2c7]" />
                      <p className="font-semibold uppercase tracking-[0.3em]">{perk.title}</p>
                      <p className="mt-2 text-xs text-[#f6e2c7]">{perk.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full rounded-3xl bg-white p-8 shadow-lg ring-1 ring-[#e8d7c3]/80 lg:w-[420px]">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#b88d63]">Complimentary service</p>
              <h4 className="mt-4 text-2xl font-semibold text-[#3f0d1c]">Book a private showing</h4>
              <p className="mt-2 text-gray-600">
                Choose two pieces from your wishlist and we will set up a studio experience with refreshments and instant resizing.
              </p>
              <form className="mt-6 space-y-4">
                <input type="text" placeholder="Full name" className="w-full rounded-xl border border-[#f0e2d0] px-4 py-3 text-sm focus:border-[#3f0d1c] focus:outline-none" />
                <input type="tel" placeholder="Phone number" className="w-full rounded-xl border border-[#f0e2d0] px-4 py-3 text-sm focus:border-[#3f0d1c] focus:outline-none" />
                <input type="text" placeholder="Preferred date" className="w-full rounded-xl border border-[#f0e2d0] px-4 py-3 text-sm focus:border-[#3f0d1c] focus:outline-none" />
                <button type="button" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#3f0d1c] px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white">
                  Request slot <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section className="mt-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#b88d63]">Curated for you</p>
              <h3 className="mt-3 text-3xl font-semibold text-[#3f0d1c]">Pieces that complement your wishlist</h3>
              <p className="mt-2 text-gray-600">Handpicked by stylists based on similar silhouettes and budgets.</p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {recommendations.map((rec) => (
                <div key={rec.name} className={`rounded-3xl bg-gradient-to-br ${rec.theme} p-6 text-white shadow-lg`}>
                  <div className="flex items-center justify-between text-sm uppercase tracking-[0.4em]">
                    <span>{rec.badge}</span>
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h4 className="mt-6 text-2xl font-semibold">{rec.name}</h4>
                  <p className="mt-2 text-sm text-white/80">{rec.description}</p>
                  <Link href={rec.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em]">
                    View details <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Concierge */}
        <section className="mt-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="rounded-3xl bg-[#fdf7f0] p-8 ring-1 ring-[#f0e2d0]">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#b88d63]">Concierge desk</p>
                  <h3 className="mt-3 text-3xl font-semibold text-[#3f0d1c]">We nurture every wishlist until it becomes yours</h3>
                  <p className="mt-4 max-w-2xl text-gray-600">
                    Our team monitors purity certifications, making-charge benefits and seasonal launches so the pieces you love stay reserved until purchase day.
                  </p>
                  <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#3f0d1c] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white">
                    Talk to concierge <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid w-full gap-6 sm:grid-cols-2 lg:w-auto">
                  {conciergeHighlights.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="rounded-2xl border border-[#f0e2d0] bg-white p-5">
                        <Icon className="h-6 w-6 text-[#3f0d1c]" />
                        <p className="mt-3 text-lg font-semibold text-[#3f0d1c]">{item.title}</p>
                        <p className="mt-2 text-sm text-gray-600">{item.content}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
