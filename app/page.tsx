import type { Metadata } from "next";
import Link from "next/link";
import { faqSchema } from "@/lib/seo";
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
import PseNe from "@/components/PseNe";
import Services from "@/components/Services";
import TrustedClients from "@/components/TrustedClients";
import SocialFollowSection from "@/components/SocialFollowSection";
import SocialProofToasts from "@/components/SocialProofToasts";
import Testimonials from "@/components/Testimonials";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Illyrian Pixel — Agjenci Ueb Dizajni Luksoz & Marketing Premium",
  description:
    "Ndërtojmë website premium, landing page që konvertojnë dhe marketing strategjik për biznese ambicioze. Konsultim falas · Plan brenda 24h · Illyrian Pixel."
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
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="overflow-x-clip bg-bg pb-4 pt-14 md:pt-16">
        <Hero />
        <Services />
        <PseNe />
        <TrustedClients />
        <FeaturedWork />
        <Process />
        <Testimonials />

        {/* Mini Sales Block */}
        <section className="relative border-b border-white/[0.06]">
          <div className="section-wrap py-14 md:py-20 text-center">
            <p className="font-body text-[0.95rem] font-light tracking-[0.04em] text-white/50">
              Klientët tuaj të ardhshëm po ju kërkojnë tani në Google.
            </p>
            <p className="font-display mt-3 text-[clamp(1.6rem,3.5vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.02em] text-white">
              A po ju gjejnë?
            </p>
            <Link
              href="/contact"
              className="interactive-button ip-cta-primary ip-cta-primary--lg mt-8 inline-flex"
            >
              Rezervo konsultë
            </Link>
          </div>
        </section>

        <BlogPreview />
        <LeadMagnet />
        <FAQ />
        <CTA />
        <SocialFollowSection />

        {/* SEO Boost Line */}
        <div className="border-t border-white/[0.04]">
          <div className="section-wrap py-4">
            <p className="text-center font-body text-[11px] font-light leading-relaxed tracking-[0.04em] text-white/18">
              Agjensi digjitale për biznese shqiptare — website, e-commerce, SEO, Google Ads, branding dhe social media marketing për tregun vendor dhe diasporën.
            </p>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
