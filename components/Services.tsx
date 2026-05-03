"use client";

import { useRef, useState } from "react";
import { ensureGSAP, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/gsap";
import FitOneLineHeading from "@/components/FitOneLineHeading";
import SectionMark from "@/components/SectionMark";
import ServiceCardHeroVisual, { type ServiceCardVisualVariant } from "@/components/ServiceCardHeroVisual";

const serviceItems: Array<{
  ordinal: string;
  title: string;
  desc: string;
  href: string;
  cta: string;
  visualVariant: ServiceCardVisualVariant;
}> = [
  {
    ordinal: "01",
    title: "Web & E-Commerce",
    desc: "Zhvillim website dhe dyqane online (E-commerce) të optimizuara për SEO, shpejtësi maksimale dhe konvertim klientësh.",
    href: "/services/web-ecommerce",
    visualVariant: "web",
    cta: "LEXO M\u00cb SHUM\u00cb"
  },
  {
    ordinal: "02",
    title: "Marketing & Growth",
    desc: "Rrisim biznesin tuaj me SEO, reklama dhe strategji digjitale të fokusuara që sjellin trafik cilësor dhe kërkesa reale.",
    href: "/services/marketing-growth",
    visualVariant: "marketing",
    cta: "LEXO M\u00cb SHUM\u00cb"
  },
  {
    ordinal: "03",
    title: "Branding & Content",
    desc: "Krijojmë identitet vizual, fotografi dhe përmbajtje që e bëjnë brandin tuaj profesional dhe të besueshëm.",
    href: "/services/branding-content",
    visualVariant: "branding",
    cta: "LEXO M\u00cb SHUM\u00cb"
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const reducedMotion = useReducedMotion();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current || reducedMotion) return;
    const { gsap } = ensureGSAP();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-intro-item",
        { opacity: 0, y: 26, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.82,
          stagger: 0.1,
          ease: "power3.out"
        }
      );

      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          clearProps: "transform,opacity",
          stagger: 0.12,
          duration: 0.88,
          ease: "power3.out"
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="services" ref={sectionRef} className="cinematic-section section-tone-services relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="services-ambient-gradient absolute inset-0" />
        <div className="absolute -left-20 top-8 h-72 w-72 rounded-full bg-accent/12 blur-[95px]" />
        <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute right-[18%] top-[46%] h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(171, 131, 57,0.045)_0%,rgba(171, 131, 57,0.022)_32%,transparent_74%)] blur-[16px] animate-[servicesBreath_7s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute right-[14%] top-[44%] h-[470px] w-[470px] -translate-y-1/2 rounded-full bg-accent/[0.07] blur-[170px] opacity-55" />
      <div className="services-grain pointer-events-none absolute inset-0 opacity-30" />
      <div className="section-wrap">
        <div className="cadence-label services-intro-item">
          <SectionMark label="SHËRBIMET TONA" eyebrowClassName="!tracking-[0.32em] md:!tracking-[0.4em]" />
        </div>
        <h2 className="services-intro-item cadence-title section-title mt-3 max-w-4xl tracking-[-0.02em]">
          Ne <span className="text-[#ab8339]">punojmë</span>.
          <br />
          Biznesi juaj <span className="text-[#ab8339]">rritet</span>.
        </h2>
        <div className="services-intro-item mt-4 max-w-2xl">
          <p className="cadence-body muted text-sm md:text-base">
            Bashkëpunojmë me biznese që duan më shumë se sa një faqe interneti.
          </p>
        </div>

        <div className="mt-14 grid auto-rows-[1fr] gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch lg:gap-8">
          {serviceItems.map((service, idx) => (
            <a
              key={service.title}
              ref={(node) => {
                cardRefs.current[idx] = node;
              }}
              href={service.href}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`services-lux-grid-card service-bento-card group relative grid min-h-[420px] w-full grid-rows-[auto_minmax(0,1fr)_auto_auto] overflow-hidden rounded-[1.35rem] border border-[#333] !bg-[linear-gradient(165deg,#0B0B0B_0%,#000000_55%,#050505_100%)] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-[6px] transition-[transform,border-color,box-shadow,opacity,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform before:pointer-events-none before:absolute before:inset-y-0 before:left-[-40%] before:z-[3] before:w-[45%] before:-skew-x-12 before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.1),transparent)] before:opacity-0 before:translate-x-[-130%] before:transition-all before:duration-500 before:ease-out hover:before:opacity-30 hover:before:translate-x-[130%] hover:-translate-y-1.5 hover:border-[#D4AF37] hover:shadow-[0_28px_64px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,175,55,0.45),0_0_56px_rgba(212,175,55,0.18),inset_0_1px_0_rgba(212,175,55,0.12)] motion-reduce:transition-[border-color,box-shadow,opacity] motion-reduce:hover:translate-y-0 md:min-h-[448px] md:rounded-3xl md:p-8 h-full ${
                hoveredCard !== null && hoveredCard !== idx ? "opacity-[0.68]" : "opacity-100"
              }`}
            >
              <div
                className="pointer-events-none absolute inset-x-6 top-0 z-[4] h-px bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent opacity-30 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
              <span
                className="absolute right-6 top-6 z-[7] select-none font-display text-[10px] font-light tabular-nums tracking-[0.28em] text-[#D4AF37]/30 transition-colors duration-300 group-hover:text-[#D4AF37]/75 md:right-8 md:top-8 md:text-[11px]"
                aria-hidden
              >
                {service.ordinal}
              </span>

              <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_60%_at_15%_-10%,rgba(171,131,57,0.07),transparent_55%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_90%_100%,rgba(212,175,55,0.04),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <FitOneLineHeading
                as="h3"
                minRem={0.76}
                className="relative z-[6] row-start-1 block w-full min-w-0 pr-12 font-display text-[clamp(1.15rem,2.4vw,1.45rem)] leading-[1.15] text-[#ab8339]/88 tracking-[-0.02em] transition-all duration-300 ease-out group-hover:text-[#ab8339] group-hover:[text-shadow:0_0_20px_rgba(171,131,57,0.18)] md:pr-14"
              >
                {service.title}
              </FitOneLineHeading>

              <p className="relative z-[6] row-start-2 mt-4 min-h-0 max-w-[54ch] self-start text-[0.9375rem] leading-[1.68] text-white/[0.78] transition-[color,opacity] duration-300 ease-out group-hover:text-white/[0.86] md:text-[15px]">
                {service.desc}
              </p>

              <div className="relative z-[4] row-start-3 -mt-6 flex min-h-[156px] items-center justify-center md:-mt-7 md:min-h-[172px]">
                <ServiceCardHeroVisual variant={service.visualVariant} />
              </div>

              <div className="relative z-[6] row-start-4 mt-6 flex min-h-[3.5rem] w-full items-end border-t border-white/[0.09] pt-6">
                <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/88 transition-colors duration-300 ease-out group-hover:text-[#D4AF37]">
                  {service.cta}
                  <span
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-normal leading-none text-white/70 transition-[transform,border-color,background-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:border-[#D4AF37]/35 group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37]"
                    aria-hidden
                  >
                    →
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 flex justify-start border-t border-white/10 pt-9 md:mt-14 md:pt-10">
          <a href="/sherbimet" className="luxury-link">
            {"T\u00cb GJITHA SH\u00cbRBIMET "}
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
