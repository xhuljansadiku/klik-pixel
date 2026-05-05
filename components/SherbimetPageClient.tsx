"use client";

import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalCTA from "@/components/GlobalCTA";
import ServiceOverviewLuxCard from "@/components/ServiceOverviewLuxCard";
import { SHERBIMET_PAGE_CARDS } from "@/lib/serviceOverviewCards";
import { useReducedMotion } from "@/lib/gsap";
import { usePinnedHeroScroll } from "@/lib/usePinnedHeroScroll";

export default function SherbimetPageClient() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroStatsRef = useRef<HTMLParagraphElement>(null);
  const heroTextureRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const reduced = useReducedMotion();

  usePinnedHeroScroll({
    enabled: !reduced,
    heroSectionRef,
    heroTitleRef,
    heroStatsRef,
    heroTextureRef
  });

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden bg-bg text-text pt-14 md:pt-16">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_8%_10%,rgba(171, 131, 57,0.09),transparent_30%)]" />

        <section ref={heroSectionRef} className="relative z-[1] border-b border-white/10">
          <div
            ref={heroTextureRef}
            className="pointer-events-none absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1800&q=80')] bg-[length:180%] bg-[position:20%_50%] opacity-0"
          />
          <div className="section-wrap relative z-[1] py-20 md:py-28">
            <div className="sv-label mb-5 h-px w-[180px] bg-gradient-to-r from-accent/80 to-transparent" />
            <p className="sv-label text-[10px] uppercase tracking-[0.3em] text-accent/80">SHËRBIMET</p>
            <h1
              ref={heroTitleRef}
              data-cursor="headline"
              className="hero-headline-trigger cadence-title mt-4 max-w-4xl bg-[url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1800&q=80')] bg-[length:170%] bg-[position:22%_48%] bg-clip-text font-display text-[clamp(2.55rem,7.8vw,6.9rem)] leading-[0.95] tracking-[0.01em] pb-[0.12em] text-transparent"
            >
              Gjashtë shërbime,
              <br />
              çdo gjë që ju duhet.
            </h1>
            <p ref={heroStatsRef} className="mt-8 max-w-[56ch] text-base text-white/62">
              Zgjidhni kategorinë që i përshtatet objektivit tuaj dhe ne bëjmë pjesën tjetër.
            </p>
          </div>
        </section>

        <section className="relative z-[1] border-b border-white/10">
          <div className="section-wrap py-14 md:py-20">
            <div className="mt-2 grid auto-rows-[1fr] gap-6 sm:gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:items-stretch lg:gap-8">
              {SHERBIMET_PAGE_CARDS.map((service, idx) => (
                <ServiceOverviewLuxCard
                  key={service.href}
                  service={service}
                  idx={idx}
                  hoveredCard={hoveredCard}
                  setHoveredCard={setHoveredCard}
                  headingAs="h2"
                  headingMaxRem={1.1}
                />
              ))}
            </div>
          </div>
        </section>

        <GlobalCTA
          title="Nuk jeni të sigurt cilën kategori të zgjidhni?"
          body="Na thoni çfarë kërkoni, ne ju themi çfarë përshtatet."
        />
      </main>
      <Footer />
    </>
  );
}
