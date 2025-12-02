import type { Metadata } from "next";
import Link from "next/link";
import TopNotificationBar from "@/components/sections/top-notification-bar";
import HeaderTopInfo from "@/components/sections/header-top-info";
import MainHeader from "@/components/sections/main-header";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { blogPosts } from "@/lib/blogPosts";
import { brandName, primaryKeywords } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Mulveer Journal | ${brandName} Insights & Jewellery Guides`,
  description:
    "SEO-focused guides for Belagavi jewellery shoppers—find the best jewellery store tips, bridal collections, and custom design advice from Mulveer Jewellers.",
  keywords: primaryKeywords,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Mulveer Journal | Jewellery Guides for Belagavi`,
    description:
      "Learn about BIS hallmarked gold, bridal jewellery collections and custom designers in Belagavi from Mulveer Jewellers.",
    url: "/blog",
  },
};

const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopNotificationBar />
      <HeaderTopInfo />
      <MainHeader />
      <MainNavigation />

      <main className="w-full">
        <section className="bg-gradient-to-b from-[#3f0d1c] to-[#5a1024] text-white py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f6e2c7]/80 mb-4">
              Mulveer Journal
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Jewellery Guides for Belagavi & Belgaum
            </h1>
            <p className="text-lg sm:text-xl text-[#f6e2c7] max-w-3xl mx-auto">
              Insider advice from Mulveer Jewellers—Belagavi&apos;s BIS hallmarked gold, silver
              and custom jewellery specialists since 2000.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-[#f9f5f0]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              {sortedPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#e8d7c3] transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#5a1024] font-semibold">
                      <span className="rounded-full bg-[#3f0d1c]/10 px-3 py-1">
                        {post.category}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-[#3f0d1c] group-hover:text-[#5a1024] transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-gray-700 leading-relaxed">{post.excerpt}</p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#5a1024] font-semibold">
                      {post.keywords.slice(0, 3).map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full bg-[#f6e2c7] px-3 py-1"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
                      <span>
                        Published{" "}
                        {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-[#5a1024] font-semibold hover:underline"
                      >
                        Read article →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#3f0d1c]">
              Ready to Visit the Best Jewellery Store in Belagavi?
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              Explore BIS hallmarked gold, silver gifting pieces, bridal sets, and custom jewellery
              designed for Belagavi and Belgaum families.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/custom-designs"
                className="rounded-lg bg-[#5a1024] px-6 py-3 text-white font-semibold hover:bg-[#6a1424] transition-colors"
              >
                Start a Custom Design
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border-2 border-[#5a1024] px-6 py-3 text-[#5a1024] font-semibold hover:bg-[#5a1024] hover:text-white transition-colors"
              >
                Visit Our Belagavi Store
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
