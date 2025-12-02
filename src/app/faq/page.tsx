import type { Metadata } from "next";
import Script from "next/script";
import TopNotificationBar from "@/components/sections/top-notification-bar";
import HeaderTopInfo from "@/components/sections/header-top-info";
import MainHeader from "@/components/sections/main-header";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import FAQContent from "./FAQContent";
import { faqCategories } from "./faq-data";
import { absoluteUrl, brandName, primaryKeywords } from "@/lib/seo";

export const metadata: Metadata = {
  title: `FAQ | ${brandName} Belagavi Jewellery & Custom Designs`,
  description:
    "Get answers about BIS hallmarked gold, silver and diamond jewellery, bridal collections, custom designs, pricing and store details for Mulveer Jewellers in Belagavi.",
  keywords: primaryKeywords,
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: `Mulveer Jewellers FAQ | Best Jewellery Store in Belagavi`,
    description:
      "Mulveer Jewellers answers about BIS hallmarked gold, silver jewellery, bridal sets, pricing and custom design services in Belagavi.",
    url: absoluteUrl("/faq"),
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategories.flatMap((category) =>
    category.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    }))
  ),
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopNotificationBar />
      <HeaderTopInfo />
      <MainHeader />
      <MainNavigation />
      <main className="w-full">
        <FAQContent categories={faqCategories} />
      </main>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Footer />
    </div>
  );
}
