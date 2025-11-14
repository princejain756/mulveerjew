import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import WhatsAppButton from "@/components/WhatsAppButton";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Mulveer Jewellers – Promises of Purity and Perfection",
  description:
    "Mulveer Jewellers, Belagavi – BIS hallmarked gold, pure silver and certified diamond jewellery. Trusted since 2000 for transparent pricing, minimal making charges and custom-made ornaments.",
  icons: {
    icon: '/mulverrlog.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          {children}
          <WhatsAppButton />
          <VisualEditsMessenger />
        </Providers>
      </body>
    </html>
  );
}
