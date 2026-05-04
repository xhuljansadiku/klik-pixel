"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import FitOneLineHeading from "@/components/FitOneLineHeading";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalCTA from "@/components/GlobalCTA";
import ServiceCardHeroVisual, {
  type ServiceCardVisualVariant
} from "@/components/ServiceCardHeroVisual";
import { serviceCategories, type ServiceCategory } from "@/lib/serviceCategories";
import { useReducedMotion } from "@/lib/gsap";
import { usePinnedHeroScroll } from "@/lib/usePinnedHeroScroll";

const OVERVIEW_SLUGS = ["website", "marketing-growth", "branding-content"] as const;

const visualVariantBySlug: Partial<Record<ServiceCategory["slug"], ServiceCardVisualVariant>> = {
  "website":          "web",
  "marketing-growth": "marketing",
  "branding-content": "branding",
};

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
              Tre shërbime,
              <br />
              çdo gjë që ju duhet.
            </h1>
            <p ref={heroStatsRef} className="mt-8 max-w-[56ch] text-base text-white/62">
              E thjeshtojmë vendimin: zgjidhni kategorinë që i përshtatet objektivit tuaj dhe ne bëjmë pjesën tjetër.
            </p>
          </div>
        </section>

        <section className="relative z-[1] border-b border-white/10">
          <div className="section-wrap py-14 md:py-20">
            <div className="mt-2 grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
              {serviceCategories.filter(c => (OVERVIEW_SLUGS as readonly string[]).includes(c.slug)).map((category, idx) => (
                <Link
                  key={category.slug}
                  href={`/services/${category.slug}`}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`services-lux-grid-card service-bento-card group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[24px] border border-[#333] !bg-[linear-gradient(165deg,#0B0B0B_0%,#000000_55%,#050505_100%)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-[6px] [perspective:1000px] [transform-style:preserve-3d] transition-[transform,border-color,box-shadow,opacity,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform before:pointer-events-none before:absolute before:inset-y-0 before:left-[-34%] before:z-[2] before:w-[42%] before:-skew-x-12 before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.15),transparent)] before:opacity-0 before:translate-x-[-120%] before:transition-all before:duration-[800ms] before:[transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:before:opacity-25 group-hover:before:translate-x-[120%] animate-[servicesIdleGlow_3.6s_ease-in-out_infinite] hover:-translate-y-1.5 hover:border-[#D4AF37] hover:shadow-[0_28px_64px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,175,55,0.45),0_0_56px_rgba(212,175,55,0.18),inset_0_1px_0_rgba(212,175,55,0.12)] hover:[animation-play-state:paused] motion-reduce:transition-[border-color,box-shadow,opacity] motion-reduce:hover:translate-y-0 md:min-h-[448px] md:rounded-3xl md:p-8 ${
                    hoveredCard !== null && hoveredCard !== idx ? "opacity-[0.68]" : "opacity-100"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_60%_at_15%_-10%,rgba(171,131,57,0.07),transparent_55%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_90%_100%,rgba(212,175,55,0.04),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div
                    className="pointer-events-none absolute inset-x-6 top-0 z-[4] h-px bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent opacity-30 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                  <FitOneLineHeading
                    as="h2"
                    minRem={0.76}
                    className="relative z-[6] mt-1 block w-full min-w-0 pr-10 font-ui text-[clamp(1.05rem,2.2vw,1.35rem)] font-bold lowercase leading-[1.2] tracking-[1px] text-accent transition-all duration-300 ease-out group-hover:text-accentLight group-hover:[text-shadow:0_0_20px_rgba(171,131,57,0.18)] md:pr-12"
                  >
                    {category.title}
                  </FitOneLineHeading>
                  <p className="relative z-[6] mt-4 min-h-0 max-w-[54ch] flex-shrink-0 font-body text-[0.9375rem] font-normal leading-[1.6] text-text transition-[color,opacity] duration-300 ease-out group-hover:text-[#ececec] md:text-[15px]">
                    {category.description}
                  </p>
                  <div className="relative z-[4] -mt-6 flex min-h-[156px] flex-1 items-center justify-center md:-mt-7 md:min-h-[172px]">
                    <ServiceCardHeroVisual variant={visualVariantBySlug[category.slug] ?? "web"} />
                  </div>
                  <p className="relative z-[6] mt-auto border-t border-white/[0.09] pt-6">
                    <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/88 transition-colors duration-300 ease-out group-hover:text-[#D4AF37]">
                      Lexo më shumë
                      <span
                        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-normal leading-none text-white/70 transition-[transform,border-color,background-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:border-[#D4AF37]/35 group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37]"
                        aria-hidden
                      >
                        →
                      </span>
                    </span>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <GlobalCTA
          title="Nuk jeni të sigurt cilën kategori të zgjidhni?"
          body="Flasim pak, pa kosto. Na thoni çfarë kërkoni, ne ju themi çfarë përshtatet."
        />
      </main>
      <Footer />
    </>
  );
}
