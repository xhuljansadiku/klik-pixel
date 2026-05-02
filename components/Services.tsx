"use client";

import { Fragment, useRef, useState } from "react";
import { ensureGSAP, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/gsap";
import FitOneLineHeading from "@/components/FitOneLineHeading";
import SectionMark from "@/components/SectionMark";

const serviceItems = [
  {
    title: "Web & E-Commerce",
    short: "Website · E-commerce · Maintenance",
    desc: "Ndërtojmë website dhe dyqane online, që duken premium, ngarkohen shpejt dhe kthejnë vizitorët në klientë.",
    href: "/services/web-ecommerce",
    metrics: ["Website Development", "UX/UI", "Performance optimization"],
    cta: "Lexo më shumë"
  },
  {
    title: "Marketing & Growth",
    short: "SEO · Google Ads · Meta Ads",
    desc: "Rrisim biznesin tuaj me SEO, reklama dhe strategji digjitale të fokusuara që sjellin trafik cilësor dhe kërkesa reale.",
    href: "/services/marketing-growth",
    metrics: ["SEO", "Google Ads", "Conversion optimization"],
    forcePillsRowBreak: true,
    cta: "Lexo më shumë"
  },
  {
    title: "Branding & Content",
    short: "Branding · Photography · Content creation",
    desc: "Krijojmë identitet vizual, fotografi dhe përmbajtje që e bëjnë brandin tuaj profesional dhe të besueshëm.",
    href: "/services/branding-content",
    metrics: ["Visual identity", "Photography", "Social media visuals"],
    cta: "Lexo më shumë"
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
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          clearProps: "transform,opacity",
          stagger: 0.1,
          duration: 0.85,
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
      <div className="pointer-events-none absolute right-[18%] top-[46%] h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,155,46,0.045)_0%,rgba(200,155,46,0.022)_32%,transparent_74%)] blur-[16px] animate-[servicesBreath_7s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute right-[14%] top-[44%] h-[470px] w-[470px] -translate-y-1/2 rounded-full bg-accent/[0.07] blur-[170px] opacity-55" />
      <div className="services-grain pointer-events-none absolute inset-0 opacity-30" />
      <div className="section-wrap">
        <div className="cadence-label services-intro-item">
          <SectionMark label="SHËRBIMET TONA" />
        </div>
        <h2 className="services-intro-item cadence-title section-title mt-3 max-w-4xl tracking-[-0.02em]">
          Ne <span className="text-[#C89B2E]">punojmë</span>.
          <br />
          Biznesi juaj <span className="text-[#C89B2E]">rritet</span>.
        </h2>
        <div className="services-intro-item mt-4 max-w-2xl">
          <p className="cadence-body muted text-sm md:text-base">
            Bashkëpunojmë me biznese që duan më shumë se sa një faqe interneti.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
          {serviceItems.map((service, idx) => (
            <a
              key={service.title}
              ref={(node) => {
                cardRefs.current[idx] = node;
              }}
              href={service.href}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`service-bento-card group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.03)] p-5 backdrop-blur-[2px] transition-[border-color,box-shadow,opacity] duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:absolute before:inset-y-0 before:left-[-34%] before:z-[2] before:w-[42%] before:-skew-x-12 before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.15),transparent)] before:opacity-0 before:translate-x-[-120%] before:transition-all before:duration-[800ms] before:[transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:before:opacity-25 group-hover:before:translate-x-[120%] animate-[servicesIdleGlow_3.6s_ease-in-out_infinite] hover:[animation-play-state:paused] ${
                idx === 0
                  ? "border-accent/35 shadow-[0_25px_80px_rgba(200,155,46,0.25)] hover:shadow-[0_28px_88px_rgba(200,155,46,0.28)]"
                  : "opacity-95 hover:border-accent/35 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(200,155,46,0.15)]"
              } ${hoveredCard !== null && hoveredCard !== idx ? "opacity-70" : ""}`}
            >
              <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_8%,rgba(200,155,46,0.065),transparent_62%)] opacity-70 transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[radial-gradient(circle_at_72%_20%,rgba(200,155,46,0.14),transparent_64%)] group-hover:opacity-100" />
              <p className="relative z-[3] text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{service.short}</p>
              <FitOneLineHeading
                as="h3"
                className="relative z-[3] mt-2 block w-full min-w-0 font-display leading-[1.12] text-accent/85 translate-y-[10px] opacity-90 tracking-[-0.02em] transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:tracking-[-0.02em] group-hover:text-accent group-hover:[text-shadow:0_0_12px_rgba(200,155,46,0.22)]"
              >
                {service.title}
              </FitOneLineHeading>
              <p className="relative z-[3] mt-3 max-w-[58ch] text-sm leading-relaxed text-white/82 transition-opacity duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100">
                {service.desc}
              </p>
              <div className="relative z-[3] mt-4 flex min-h-[62px] flex-wrap content-start gap-2">
                {service.metrics.map((metric, metricIdx) => (
                  <Fragment key={metric}>
                    <span
                      style={{ transitionDelay: `${metricIdx * 40}ms` }}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1 font-body text-[11px] tracking-[0.02em] text-white/76 scale-[0.98] transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:shadow-[0_0_10px_rgba(200,155,46,0.2)]"
                    >
                      {metric}
                    </span>
                    {"forcePillsRowBreak" in service &&
                    service.forcePillsRowBreak &&
                    metricIdx === service.metrics.length - 2 ? (
                      <span
                        aria-hidden
                        className="h-0 w-full shrink-0 basis-full"
                      />
                    ) : null}
                  </Fragment>
                ))}
              </div>
              <p className="relative z-[3] mt-auto pt-5">
                <span className="luxury-link-look">
                  {service.cta}
                  <span aria-hidden>→</span>
                </span>
              </p>
            </a>
          ))}
        </div>
        <div className="mt-10 border-t border-white/10 pt-8">
          <a href="/sherbimet" className="luxury-link">
            Të gjitha shërbimet <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
