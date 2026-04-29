import type { Metadata } from "next";
import BackToTop from "@/components/BackToTop";
import BrandSignature from "@/components/BrandSignature";
import BlogPreview from "@/components/BlogPreview";
import CTA from "@/components/CTA";
import CursorTrail from "@/components/CursorTrail";
import CursorSpotlight from "@/components/CursorSpotlight";
import CustomCursor from "@/components/CustomCursor";
import EasterEggOverlay from "@/components/EasterEggOverlay";
import FAQ from "@/components/FAQ";
import FeaturedWork from "@/components/FeaturedWork";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LeadMagnet from "@/components/LeadMagnet";
import Navbar from "@/components/Navbar";
import PageTransitionOverlay from "@/components/PageTransitionOverlay";
import Preloader from "@/components/Preloader";
import Process from "@/components/Process";
import SectionAura from "@/components/SectionAura";
import ScrollProgress from "@/components/ScrollProgress";
import Services from "@/components/Services";
import SocialProofToasts from "@/components/SocialProofToasts";
import Testimonials from "@/components/Testimonials";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Illyrian Pixel — Agjensi Dixhitale për Biznese Shqiptare",
  description:
    "Website profesionale, marketing dixhital dhe branding për biznese shqiptare në Shqipëri, Kosovë dhe diasporë. Analizë falas — kontaktoni sot."
};

export default function HomePage() {
  return (
    <>
      <SectionAura />
      <Preloader />
      <PageTransitionOverlay />
      <Navbar />
      <ScrollProgress />
      <div className="site-grade" />
      <div className="ambient-noise" />
      <div className="site-vignette" />
      <BrandSignature />
      <CustomCursor />
      <CursorSpotlight />
      <CursorTrail />
      <EasterEggOverlay />
      <SocialProofToasts />
      <WhatsAppButton />
      <BackToTop />
      <main className="overflow-x-clip bg-bg pb-4 pt-14 md:pt-16">
        <Hero />
        <Services />
        <FeaturedWork />
        <Process />
        <Testimonials />
        <BlogPreview />
        <LeadMagnet />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
