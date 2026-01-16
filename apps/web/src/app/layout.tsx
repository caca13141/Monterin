import type { Metadata } from "next";
import { Suspense } from "react";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { MicrosoftClarity } from "@/components/analytics/MicrosoftClarity";
import { PostHogAnalytics } from "@/components/analytics/PostHogAnalytics";
import { TawkTo } from "@/components/chat/TawkTo";
import { StructuredData } from "@/components/seo/StructuredData";
import { LanguageProvider } from "@/contexts/LanguageContext";

const cinzel = Cinzel({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Montérin | Haute Joaillerie Montreal",
  description: "Exceptional diamonds and bespoke jewelry from Montreal. Lab-grown and natural diamonds. Custom engagement rings and high jewelry. Book a private appointment.",
  keywords: "Montreal jewelry, haute joaillerie, diamonds Montreal, bespoke jewelry, custom engagement rings, lab grown diamonds, natural diamonds, luxury jewelry Canada",
  authors: [{ name: "Montérin" }],
  creator: "Montérin",
  publisher: "Montérin",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Montérin | Haute Joaillerie Montreal",
    description: "Exceptional diamonds and bespoke jewelry from Montreal. Lab-grown and natural diamonds.",
    type: "website",
    locale: "en_CA",
    siteName: "Montérin",
  },
  twitter: {
    card: "summary_large_image",
    title: "Montérin | Haute Joaillerie Montreal",
    description: "Exceptional diamonds and bespoke jewelry from Montreal",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          cinzel.variable,
          inter.variable
        )}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>

        {/* SEO */}
        <StructuredData />

        {/* Analytics & Tracking */}
        <GoogleAnalytics />
        <MicrosoftClarity />
        <Suspense fallback={null}>
          <PostHogAnalytics />
        </Suspense>

        {/* Live Chat */}
        <TawkTo />
      </body>
    </html>
  );
}
