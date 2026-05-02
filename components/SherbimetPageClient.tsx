"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import FitOneLineHeading from "@/components/FitOneLineHeading";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalCTA from "@/components/GlobalCTA";
import { serviceCategories } from "@/lib/serviceCategories";
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
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_8%_10%,rgba(200,155,46,0.09),transparent_30%)]" />

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
              {serviceCategories.map((category, idx) => (
                <Link
                  key={category.slug}
                  href={`/services/${category.slug}`}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`service-bento-card group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.03)] p-5 backdrop-blur-[2px] [perspective:1000px] [transform-style:preserve-3d] transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:absolute before:inset-y-0 before:left-[-34%] before:z-[2] before:w-[42%] before:-skew-x-12 before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.15),transparent)] before:opacity-0 before:translate-x-[-120%] before:transition-all before:duration-[800ms] before:[transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:before:opacity-25 group-hover:before:translate-x-[120%] animate-[servicesIdleGlow_3.6s_ease-in-out_infinite] hover:[animation-play-state:paused] ${
                    idx === 0
                      ? "border-accent/35 shadow-[0_25px_80px_rgba(200,155,46,0.25)]"
                      : "opacity-95 hover:border-accent/35 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(200,155,46,0.15)]"
                  } ${hoveredCard !== null && hoveredCard !== idx ? "opacity-70 scale-[0.99]" : ""}`}
                >
                  <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_8%,rgba(200,155,46,0.065),transparent_62%)] opacity-70 transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[radial-gradient(circle_at_72%_20%,rgba(200,155,46,0.14),transparent_64%)] group-hover:opacity-100" />
                  <p className="relative z-[3] text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    {category.subServices.slice(0, 3).join(" · ")}
                  </p>
                  <FitOneLineHeading
                    as="h2"
                    className="relative z-[3] mt-2 block w-full min-w-0 font-display leading-[1.12] text-accent/85 translate-y-[10px] opacity-90 tracking-[-0.02em] transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:tracking-[-0.02em] group-hover:text-accent group-hover:[text-shadow:0_0_12px_rgba(200,155,46,0.22)]"
                  >
                    {category.title}
                  </FitOneLineHeading>
                  <p className="relative z-[3] mt-3 max-w-[58ch] text-sm leading-relaxed text-white/82 transition-opacity duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100">
                    {category.description}
                  </p>
                  <div className="relative z-[3] mt-4 flex min-h-[62px] flex-wrap content-start gap-2">
                    {category.subServices.map((item, itemIdx) => (
                      <span
                        key={item}
                        style={{ transitionDelay: `${itemIdx * 40}ms` }}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1 font-body text-[11px] tracking-[0.02em] text-white/76 scale-[0.98] transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:shadow-[0_0_10px_rgba(200,155,46,0.2)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="relative z-[3] mt-auto pt-5">
                    <span className="luxury-link-look">
                      Lexo më shumë
                      <span aria-hidden>→</span>
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
