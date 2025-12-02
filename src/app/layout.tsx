import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import WhatsAppButton from "@/components/WhatsAppButton";
import Script from "next/script";
import {
  absoluteUrl,
  brandName,
  brandTagline,
  businessAddress,
  businessPhone,
  primaryKeywords,
  seoImage,
  siteUrl,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${brandName} – ${brandTagline}`,
  description:
    "Mulveer Jewellers in Belagavi offers BIS hallmarked gold, silver and certified diamond jewellery with transparent pricing, minimal making charges, custom designs and bridal collections crafted since 2000.",
  keywords: primaryKeywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${brandName} | Best Jewellery Store in Belgaum & Belagavi`,
    description:
      "Discover BIS hallmarked gold, silver and diamond jewellery from Mulveer Jewellers in Belagavi. Bridal sets, custom designs, transparent pricing and trusted craftsmanship since 2000.",
    url: siteUrl,
    siteName: brandName,
    images: [
      {
        url: seoImage,
        width: 1200,
        height: 630,
        alt: `${brandName} showroom and signature collections`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brandName} – Promises of Purity and Perfection`,
    description:
      "Belagavi's trusted BIS hallmarked jeweller for gold, silver, bridal and custom-made jewellery.",
    images: [seoImage],
  },
  icons: {
    icon: "/mulverrlog.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: brandName,
    description:
      "BIS hallmarked gold, silver and diamond jewellery with custom designs, bridal sets and transparent pricing in Belagavi.",
    url: siteUrl,
    telephone: businessPhone,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessAddress.street,
      addressLocality: businessAddress.city,
      addressRegion: businessAddress.state,
      postalCode: businessAddress.postalCode,
      addressCountry: businessAddress.country,
    },
    areaServed: {
      "@type": "City",
      name: "Belagavi",
    },
    priceRange: "$$$",
    image: seoImage,
    sameAs: ["https://www.instagram.com/mulveer_jewellers"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "21:00",
      },
    ],
  };

  const webSiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brandName,
    url: siteUrl,
    potentialAction: {
      "@type": "ContactAction",
      target: `${absoluteUrl("/contact")}`,
    },
    inLanguage: "en-IN",
  };

  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <ErrorReporter />
          <Script
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
            strategy="afterInteractive"
            data-target-origin="*"
            data-message-type="ROUTE_CHANGE"
            data-include-search-params="true"
            data-only-in-iframe="true"
            data-debug="true"
            data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
          />
          <Script
            id="mulveer-schema"
            type="application/ld+json"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([localBusinessLd, webSiteLd]),
            }}
          />
          {children}
          <WhatsAppButton />
          <VisualEditsMessenger />
        </Providers>
      </body>
    </html>
  );
}
