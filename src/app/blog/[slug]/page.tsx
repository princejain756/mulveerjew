import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import TopNotificationBar from "@/components/sections/top-notification-bar";
import HeaderTopInfo from "@/components/sections/header-top-info";
import MainHeader from "@/components/sections/main-header";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import { blogPosts, getBlogPostBySlug } from "@/lib/blogPosts";
import {
  absoluteUrl,
  brandName,
  primaryKeywords,
  seoImage,
  siteUrl,
} from "@/lib/seo";

type BlogPostPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    return {};
  }

  const keywords = Array.from(new Set([...primaryKeywords, ...post.keywords]));

  return {
    title: `${post.title} | ${brandName}`,
    description: post.description,
    keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: absoluteUrl(`/blog/${post.slug}`),
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [
        {
          url: seoImage,
          alt: `${brandName} jewellery in Belagavi`,
        },
      ],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: seoImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: brandName,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: brandName,
      logo: {
        "@type": "ImageObject",
        url: seoImage,
      },
    },
    keywords: post.keywords.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
    articleSection: post.category,
  };

  return (
    <div className="min-h-screen bg-white">
      <TopNotificationBar />
      <HeaderTopInfo />
      <MainHeader />
      <MainNavigation />

      <main className="w-full">
        <section className="bg-gradient-to-b from-[#3f0d1c] to-[#5a1024] text-white py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#f6e2c7]/80 font-semibold">
              <span className="rounded-full bg-[#3f0d1c]/30 px-3 py-1">
                {post.category}
              </span>
              <span>{post.readTime}</span>
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl font-bold text-white leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-[#f6e2c7]">{post.subtitle}</p>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-[#f9f5f0]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-white p-6 sm:p-10 shadow-sm ring-1 ring-[#e8d7c3]">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5a1024]">
                    Why this matters
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-[#3f0d1c]">
                    Takeaways for Belagavi shoppers
                  </h2>
                </div>
                <ul className="space-y-2 text-gray-700">
                  {post.takeaway.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#5a1024]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 space-y-10">
                {post.sections.map((section) => (
                  <div key={section.heading} className="space-y-4">
                    <h3 className="text-2xl font-semibold text-[#3f0d1c]">
                      {section.heading}
                    </h3>
                    {section.content.map((paragraph) => (
                      <p key={paragraph} className="text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets && (
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {section.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-12 flex flex-wrap gap-2 text-xs font-semibold text-[#5a1024]">
                {post.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full bg-[#f6e2c7] px-3 py-1"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap justify-between gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-lg bg-[#5a1024] px-6 py-3 text-white font-semibold hover:bg-[#6a1424] transition-colors"
              >
                Visit the Belagavi Showroom
              </Link>
              <Link
                href="/custom-designs"
                className="inline-flex items-center rounded-lg border-2 border-[#5a1024] px-6 py-3 text-[#5a1024] font-semibold hover:bg-[#5a1024] hover:text-white transition-colors"
              >
                Start a Custom Design
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center rounded-lg border-2 border-[#3f0d1c] px-6 py-3 text-[#3f0d1c] font-semibold hover:bg-[#3f0d1c] hover:text-white transition-colors"
              >
                Browse Collections
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Script
        id={`article-schema-${post.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <Footer />
    </div>
  );
}
