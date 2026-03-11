"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Screenshots from "@/components/Screenshots";
import ContactForm from "@/components/ContactForm";
import CTA from "@/components/CTA";
import ComingSoon from "@/components/ComingSoon";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Screenshots />
      <ContactForm />
      <CTA />
      <ComingSoon />
      <Footer />
    </main>
  );
}
