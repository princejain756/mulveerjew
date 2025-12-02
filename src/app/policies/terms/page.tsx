'use client';

import Link from 'next/link';
import TopNotificationBar from '@/components/sections/top-notification-bar';
import HeaderTopInfo from '@/components/sections/header-top-info';
import MainHeader from '@/components/sections/main-header';
import MainNavigation from '@/components/sections/main-navigation';
import Footer from '@/components/sections/footer';

const principleHighlights = [
  {
    title: 'Transparency First',
    body: 'Every decision, fee, and process is logged and explained so you always understand the why and the how.',
    accent: 'from-amber-200 to-yellow-300',
  },
  {
    title: 'Human-Centered Trust',
    body: 'We design every policy around your experience and respect your rights at every step of your journey.',
    accent: 'from-pink-200 to-rose-300',
  },
  {
    title: 'Future-Proof Protections',
    body: 'Built upon local laws and international best practices, our terms evolve with industry standards.',
    accent: 'from-sky-200 to-cyan-300',
  },
];

const clauses = [
  {
    title: 'Agreement & Scope',
    badge: '1',
    summary:
      'These Terms govern your access to Mulveer Jewellers digital and in-store services. By engaging with us you consent to this agreement, which may be updated with notice.',
    points: [
      'Our services include jewelry sales, bespoke design, repair, appraisal, and educational content.',
      'Any reference to “we,” “us,” or “Mulveer Jewellers” includes our affiliates, employees, and representatives.',
    ],
  },
  {
    title: 'Account Responsibility',
    badge: '2',
    summary:
      'Accounts must reflect authentic information and remain secure. You are liable for the privacy of your credentials and any activities tied to them.',
    points: [
      'Notify us immediately if you suspect unauthorized access.',
      'We may suspend or close accounts that breach these terms without prior notice.',
    ],
  },
  {
    title: 'Purchases & Pricing',
    badge: '3',
    summary:
      'Pricing adapts to live market rates for precious metals and gemstones. Taxes and duties are added to your final invoice.',
    points: [
      'Payment must be received in full before delivery; multiple payment methods are accepted.',
      'Price protection programs are described in our refund policy and subject to eligibility.',
    ],
  },
  {
    title: 'Custom Creations',
    badge: '4',
    summary:
      'Custom pieces demand clear specifications, documentation, and upfront deposits, with timelines defined before production.',
    points: [
      'Revisions after approval may incur additional charges.',
      'Custom pieces are finalized upon completion and typically non-refundable.',
    ],
  },
  {
    title: 'Content & IP',
    badge: '5',
    summary:
      'All proprietary content you encounter belongs to Mulveer Jewellers or our partners. When you submit designs, we receive a license for service delivery.',
    points: [
      'Reproducing our trademarks, text, or images without permission is prohibited.',
      'You retain ownership of your submissions, while we keep the right to display and modify them for service fulfillment.',
    ],
  },
  {
    title: 'Legal Safeguards',
    badge: '6',
    summary:
      'Our liability is limited to the fullest extent allowed by law. You agree to defend and indemnify us for claims linked to your conduct.',
    points: [
      'Services are provided “as is.” We disclaim warranties to the maximum extent permitted.',
      'Disputes shall be governed by the laws of Karnataka, India, with courts of Belagavi having exclusive jurisdiction.',
    ],
  },
];

const policyFooterLinks = [
  { label: 'Security Procedures', href: '/security' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Refund Policy', href: '/refunds' },
];

export default function TermsOfServicePage() {
  const lastUpdated = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#f6f4f0] text-gray-900">
      <TopNotificationBar />
      <HeaderTopInfo />
      <MainHeader />
      <MainNavigation />

      <main className="w-full">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0f0308] via-[#3a0b15] to-[#6d1d30] text-white pb-20 pt-24">
          <div className="absolute inset-0 opacity-40">
            <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_55%)]" />
          </div>
          <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 text-center">
              <p className="text-sm uppercase tracking-[0.5em] text-[#f7d8c3]">Mulveer Jewellers</p>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-6xl">
                Terms & Conditions
              </h1>
              <p className="mx-auto max-w-3xl text-lg text-[#f3ded2] sm:text-xl">
                Crafted with care to protect your trust. These policies explain what to expect when you experience Mulveer Jewellers—whether you are browsing, purchasing,
                or designing heirlooms.
              </p>
            </div>

            <div className="grid gap-6 text-left sm:grid-cols-2">
              {[
                { label: 'Last updated', value: lastUpdated },
                { label: 'Applicable Region', value: 'Karnataka & Global Visitors' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/20 bg-white/5 px-6 py-5 backdrop-blur"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-[#f3d5c6]">
                    {item.label}
                  </p>
                  <p className="text-lg font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-12">
          <div className="rounded-[40px] border border-[#ebd7cf] bg-white/90 px-6 py-10 shadow-[0_25px_60px_rgba(15,3,8,0.18)] backdrop-blur">
            <div className="flex flex-col gap-2 text-center">
              <p className="text-xs uppercase tracking-[0.6em] text-[#c86b51]">Guiding lights</p>
              <h3 className="text-2xl font-semibold text-[#1d1014] sm:text-3xl">Promises that keep our policies human</h3>
              <p className="text-sm text-[#5a1024]">
                We balance bold elegance with clarity so you know exactly how we protect your experience.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {principleHighlights.map((highlight) => (
                <article
                  key={highlight.title}
                  className={`group rounded-3xl border border-white/30 bg-gradient-to-br ${highlight.accent} p-6 shadow-[0_30px_80px_rgba(15,3,8,0.35)] transition duration-300 hover:-translate-y-1`}
                >
                  <p className="text-sm font-medium uppercase tracking-[0.4em] text-white/80">
                    Pillar
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-white">{highlight.title}</h3>
                  <p className="mt-4 text-base text-white/90">{highlight.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 mt-16">
          <div className="flex items-center justify-between gap-6 pb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.5em] text-[#5a1024]">Commitments</p>
              <h2 className="text-3xl font-semibold text-[#1b0a12] sm:text-4xl">
                A refined experience, spelled out in full clarity
              </h2>
            </div>
            <p className="hidden text-base text-gray-600 sm:block">
              Every clause is curated to give you clarity about ownership, payment, and care.
            </p>
          </div>

          <div className="space-y-8">
            {clauses.map((clause) => (
              <div
                key={clause.title}
                className="rounded-3xl border border-[#e3d7ce] bg-white/80 px-6 py-8 shadow-lg shadow-indigo-100/80"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5a1024] text-2xl font-bold text-white">
                    #{clause.badge}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#3f0d1c]">{clause.title}</h3>
                    <p className="text-sm text-[#6b4a4a]">{clause.summary}</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3 text-gray-700">
                  {clause.points.map((point) => (
                    <li key={point} className="flex gap-3 text-base leading-relaxed">
                      <span aria-hidden className="mt-1 h-3 w-3 rounded-full bg-[#f0c267]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#0f0308] px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-10 text-center">
            <p className="text-sm uppercase tracking-[0.5em] text-[#f3d8d1]">
              Ready when you are
            </p>
            <h4 className="text-3xl font-semibold sm:text-4xl">
              Questions about memberships, repairs, or legal terms?
            </h4>
            <p className="text-lg text-[#f3e4da]">
              Our legal concierge is available Monday through Saturday, and our door is always open for clarity before every purchase.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-8 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:border-white hover:bg-white hover:text-[#0f0308]"
              >
                Contact Legal Concierge
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-white hover:text-[#0f0308]"
              >
                Return to Atelier
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-[#d6c0b7]">
              {policyFooterLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
