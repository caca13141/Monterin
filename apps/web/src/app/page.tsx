"use client";

import { Hero } from "@/components/landing/Hero";
import { AboutSection } from "@/components/landing/AboutSection";
import { NewsletterSection } from "@/components/landing/NewsletterSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { LuxuryFooter } from "@/components/layout/LuxuryFooter";
import InquiryToast from "@/components/ui/InquiryToast";
import { LiquidNavbar } from "@/components/layout/LiquidNavbar";

export default function Home() {
  return (
    <>
      <LiquidNavbar />
      <main className="min-h-screen bg-black">
        <Hero />
        <AboutSection />
        <TestimonialsSection />
        <NewsletterSection />
        <LuxuryFooter />
        <InquiryToast />
      </main>
    </>
  );
}
