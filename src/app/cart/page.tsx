"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Truck,
  BadgePercent,
  Leaf,
  ArrowRight,
  CheckCircle2,
  Gift
} from "lucide-react";
import TopNotificationBar from "@/components/sections/top-notification-bar";
import HeaderTopInfo from "@/components/sections/header-top-info";
import MainHeader from "@/components/sections/main-header";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";

const cartItems = [
  {
    id: "radiant-haar",
    name: "Radiant Gulbahar Haar",
    details: "22K gold • kundan setting • detachable layers",
    price: 185000,
    making: 11000,
    weight: "62 g",
    delivery: "Ready in 5 days",
    tier: "Wedding Edit"
  },
  {
    id: "nayah-ring",
    name: "Nayah Illusion Ring",
    details: "18K gold • VS-SI diamonds • comfort fit",
    price: 42000,
    making: 3200,
    weight: "7 g",
    delivery: "Ships in 48 hours",
    tier: "Daily Chic"
  }
];

const addOns = [
  { title: "Complimentary engraving", description: "Add initials, mantras or wedding dates." },
  { title: "Lifetime polish plan", description: "Two spa treatments every year without cost." },
  { title: "Gift wrap rituals", description: "Velvet trays, fragrance sachets and handwritten notes." }
];

const assurances = [
  {
    title: "Transparent invoices",
    description: "BIS hallmarking, stone weights and making charges documented in detail.",
    icon: ShieldCheck
  },
  {
    title: "Express insured shipping",
    description: "Doorstep delivery in tamper-proof packaging with full insurance.",
    icon: Truck
  },
  {
    title: "Festive benefits",
    description: "Making-charge waivers & loyalty rewards automatically applied.",
    icon: BadgePercent
  }
];

const steps = [
  { title: "Crafting", body: "Artisans calibrate weights & purity before hallmarking." },
  { title: "Quality desk", body: "Multi-point inspection + diamond certification." },
  { title: "Packaging", body: "Eco wrapped with velvet keepsake boxes and story cards." },
  { title: "Dispatch", body: "Tracked insured shipping with concierge support." }
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export default function CartPage() {
  const totals = useMemo(() => {
    const subTotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    const making = cartItems.reduce((acc, item) => acc + item.making, 0);
    const gst = Math.round((subTotal + making) * 0.03);
    const grandTotal = subTotal + making + gst;

    return { subTotal, making, gst, grandTotal };
  }, []);

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
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-6">
                <p className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em]">
                  <ShoppingBag className="h-4 w-4" /> Cart
                </p>
                <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">Curate. Confirm. Celebrate.</h1>
                <p className="max-w-2xl text-lg text-[#f6e2c7]">
                  You're a step away from wearing art. Review your selections, enjoy complimentary add-ons, and choose how you want them delivered.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="/collections" className="rounded-full bg-white px-7 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#3f0d1c]">
                    Continue browsing
                  </Link>
                  <Link href="/checkout" className="rounded-full border border-white/40 px-7 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white">
                    Proceed to checkout
                  </Link>
                </div>
              </div>
              <div className="grid w-full gap-4 rounded-3xl bg-white/10 p-6 text-sm uppercase tracking-[0.3em] text-[#f6e2c7] lg:w-80">
                <div className="flex items-center justify-between">
                  <span>Items</span>
                  <span className="text-3xl text-white">{cartItems.length}</span>
                </div>
                <div className="h-px bg-white/30" />
                <div className="flex items-center justify-between">
                  <span>Grand total</span>
                  <span className="text-3xl text-white">{formatCurrency(totals.grandTotal)}</span>
                </div>
                <p className="text-xs text-[#f6e2c7]">Includes complimentary insurance & purity certificates.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="-mt-12 px-4">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-[#e8d7c3]/70">
              <div className="flex flex-col gap-2 pb-6 border-b border-[#f0e2d0]">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#b88d63]">Your selection</p>
                <h2 className="text-3xl font-semibold text-[#3f0d1c]">Elegance curated</h2>
              </div>
              <div className="space-y-6 pt-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-[#f0e2d0] bg-gradient-to-r from-[#fffaf5] to-white p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b88d63]">{item.tier}</p>
                        <h3 className="mt-2 text-2xl font-semibold text-[#3f0d1c]">{item.name}</h3>
                        <p className="mt-2 text-sm text-gray-600">{item.details}</p>
                        <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#6f4127]">
                          <span className="rounded-full border border-[#e8d7c3] px-3 py-1">Weight {item.weight}</span>
                          <span className="rounded-full border border-[#e8d7c3] px-3 py-1">{item.delivery}</span>
                        </div>
                      </div>
                      <div className="flex w-full flex-col items-center gap-3 rounded-2xl bg-white p-4 sm:w-60">
                        <p className="text-sm uppercase tracking-[0.3em] text-[#b88d63]">Price</p>
                        <p className="text-3xl font-semibold text-[#3f0d1c]">{formatCurrency(item.price)}</p>
                        <div className="flex w-full items-center justify-between text-xs text-gray-500">
                          <span>Making</span>
                          <span>{formatCurrency(item.making)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="rounded-full border border-[#3f0d1c] px-3 py-1 text-sm font-semibold text-[#3f0d1c]">-</button>
                          <span className="text-lg font-semibold text-[#3f0d1c]">1</span>
                          <button className="rounded-full border border-[#3f0d1c] px-3 py-1 text-sm font-semibold text-[#3f0d1c]">+</button>
                        </div>
                        <div className="flex w-full flex-col gap-2">
                          <button className="rounded-full bg-[#3f0d1c] px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white">
                            Checkout item
                          </button>
                          <button className="rounded-full border border-[#3f0d1c] px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#3f0d1c]">
                            Save for later
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-3xl bg-[#3f0d1c] p-6 text-white shadow-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#f6e2c7]">Investment summary</p>
                <h3 className="mt-4 text-2xl font-semibold">Peace of mind pricing</h3>
                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex items-center justify-between uppercase tracking-[0.35em]">
                    <span>Jewellery value</span>
                    <span>{formatCurrency(totals.subTotal)}</span>
                  </div>
                  <div className="flex items-center justify-between uppercase tracking-[0.35em]">
                    <span>Making</span>
                    <span>{formatCurrency(totals.making)}</span>
                  </div>
                  <div className="flex items-center justify-between uppercase tracking-[0.35em] text-[#f6e2c7]">
                    <span>GST (3%)</span>
                    <span>{formatCurrency(totals.gst)}</span>
                  </div>
                  <div className="h-px bg-white/20" />
                  <div className="flex items-center justify-between text-lg font-semibold uppercase tracking-[0.3em]">
                    <span>Total due</span>
                    <span>{formatCurrency(totals.grandTotal)}</span>
                  </div>
                </div>
                <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#3f0d1c]">
                  Secure checkout <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-3 text-xs text-[#f6e2c7]">Need support? Call concierge at +91 80882 40840</p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-[#e8d7c3]/80">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b88d63]">Mulveer assurances</p>
                <div className="mt-4 space-y-5">
                  {assurances.map((assurance) => {
                    const Icon = assurance.icon;
                    return (
                      <div key={assurance.title} className="flex items-start gap-3">
                        <Icon className="h-6 w-6 text-[#3f0d1c]" />
                        <div>
                          <p className="text-base font-semibold text-[#3f0d1c]">{assurance.title}</p>
                          <p className="text-sm text-gray-600">{assurance.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Add-ons */}
        <section className="mt-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="rounded-3xl bg-[#fdf7f0] p-8 ring-1 ring-[#f0e2d0]">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b88d63]">Enhance the gifting moment</p>
                  <h3 className="mt-3 text-3xl font-semibold text-[#3f0d1c]">Compliments on us</h3>
                  <p className="mt-2 text-gray-600">Select add-ons tailored by our stylists. They are complimentary for cart orders above ₹50,000.</p>
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#3f0d1c] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white">
                  Speak to stylist <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {addOns.map((addOn) => (
                  <div key={addOn.title} className="rounded-2xl border border-[#f0e2d0] bg-white p-5">
                    <Gift className="h-6 w-6 text-[#3f0d1c]" />
                    <p className="mt-3 text-lg font-semibold text-[#3f0d1c]">{addOn.title}</p>
                    <p className="mt-2 text-sm text-gray-600">{addOn.description}</p>
                    <button className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#3f0d1c]">
                      Add complimentary <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Journey */}
        <section className="mt-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-3xl bg-[#3f0d1c] p-8 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f6e2c7]">Craft journey</p>
                <h3 className="mt-3 text-3xl font-semibold">Where your order travels</h3>
                <div className="mt-8 space-y-6">
                  {steps.map((step) => (
                    <div key={step.title} className="flex items-start gap-4">
                      <CheckCircle2 className="h-6 w-6 text-[#f6e2c7]" />
                      <div>
                        <p className="text-lg font-semibold">{step.title}</p>
                        <p className="text-sm text-[#f6e2c7]">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-[#e8d7c3] bg-white p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b88d63]">Sustainability promise</p>
                <h3 className="mt-3 text-3xl font-semibold text-[#3f0d1c]">Beautiful for you, gentle on earth</h3>
                <div className="mt-6 space-y-5 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <Leaf className="h-5 w-5 text-[#3f0d1c]" />
                    <p>Responsible sourcing network for gold and gemstones with traceable documentation.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-[#3f0d1c]" />
                    <p>Re-polishing and repair atelier extends the lifecycle of every Mulveer creation.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-[#3f0d1c]" />
                    <p>Every diamond is certified conflict-free and verified by our in-house gemologist.</p>
                  </div>
                </div>
                <div className="mt-6 rounded-2xl bg-[#fff6ec] p-5 text-sm">
                  <p className="font-semibold uppercase tracking-[0.35em] text-[#b88d63]">Need help?</p>
                  <p className="mt-2 text-[#3f0d1c]">Chat with our concierge on WhatsApp +91 80882 40840 for resizing, delivery or payment assistance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20">
          <div className="mx-auto max-w-4xl px-4">
            <div className="rounded-3xl bg-gradient-to-r from-[#f6d365] to-[#fda085] p-10 text-center text-[#3f0d1c]">
              <p className="text-xs font-semibold uppercase tracking-[0.4em]">Mulveer promise</p>
              <h3 className="mt-4 text-4xl font-semibold">Purchase with confidence</h3>
              <p className="mt-3 text-base">
                Complimentary lifetime cleaning, annual gemstone inspection and transparent buyback ensure your cart is a long-term investment.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href="/checkout" className="rounded-full bg-[#3f0d1c] px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white">
                  Proceed to checkout
                </Link>
                <Link href="/contact" className="rounded-full border border-[#3f0d1c] px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#3f0d1c]">
                  Talk to us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
