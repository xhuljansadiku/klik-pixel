"use client";

import { useRef, useState } from "react";
import { ensureGSAP, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/gsap";
import SectionMark from "@/components/SectionMark";

const serviceItems = [
  {
    title: "Web & E-Commerce",
    short: "Website Development · E-commerce · Maintenance",
    desc: "Ndërtojmë website dhe dyqane online që duken premium, ngarkohen shpejt dhe kthejnë vizitorët në klientë.",
    href: "/sherbimet/web-ecommerce",
    metrics: ["Website Development", "UX/UI", "Performance optimization"],
    cta: "Zbulo më shumë"
  },
  {
    title: "Marketing & Growth",
    short: "SEO · Google Ads · Meta Ads",
    desc: "Rrisim biznesin tuaj me SEO, reklama dhe strategji digjitale që sjellin trafik cilësor dhe kërkesa reale.",
    href: "/sherbimet/marketing-growth",
    metrics: ["SEO", "Google Ads", "Conversion optimization"],
    cta: "Zbulo më shumë"
  },
  {
    title: "Branding & Content",
    short: "Branding · Photography · Content creation",
    desc: "Krijojmë identitet vizual, fotografi dhe përmbajtje që e bëjnë brandin tuaj të duket profesional dhe i besueshëm.",
    href: "/sherbimet/branding-content",
    metrics: ["Visual identity", "Photography", "Social media visuals"],
    cta: "Zbulo më shumë"
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
      <div className="pointer-events-none absolute right-[18%] top-[46%] h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,155,46,0.06),transparent_70%)] animate-[servicesBreath_7s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute right-[14%] top-[44%] h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-accent/10 blur-[140px] opacity-60" />
      <div className="services-grain pointer-events-none absolute inset-0 opacity-30" />
      <div className="section-wrap">
        <div className="cadence-label services-intro-item">
          <SectionMark label="SHËRBIMET TONA" />
        </div>
        <h2 className="services-intro-item cadence-title section-title mt-3 max-w-4xl">
          Ne <span className="text-accent">punojmë</span>.
          <br />
          Biznesi juaj <span className="text-accent">rritet</span>.
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
              className={`service-bento-card group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[24px] border p-5 backdrop-blur-[2px] [perspective:1000px] [transform-style:preserve-3d] transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:absolute before:inset-y-0 before:left-[-34%] before:z-[2] before:w-[42%] before:-skew-x-12 before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.15),transparent)] before:opacity-0 before:translate-x-[-120%] before:transition-all before:duration-[800ms] before:[transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:before:opacity-25 group-hover:before:translate-x-[120%] animate-[servicesIdleGlow_3.6s_ease-in-out_infinite] ${
                idx === 0
                  ? "border-accent/45 shadow-[0_25px_80px_rgba(200,155,46,0.25)] hover:[transform:translateY(-8px)_scale(1.03)_rotateX(2deg)_rotateY(2deg)]"
                  : "border-white/10 opacity-95 hover:[transform:translateY(-8px)_scale(1.03)_rotateX(2deg)_rotateY(2deg)] hover:border-accent/45 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(200,155,46,0.15)]"
              } ${hoveredCard !== null && hoveredCard !== idx ? "opacity-70 scale-[0.99]" : ""}`}
            >
              <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_8%,rgba(200,155,46,0.09),transparent_55%)] opacity-70 transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[radial-gradient(circle_at_72%_20%,rgba(200,155,46,0.16),transparent_58%)] group-hover:opacity-100" />
              <p className="relative z-[3] text-[11px] tracking-[0.14em] text-accent/82">{service.short}</p>
              <h3 className="relative z-[3] mt-2 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[0.92] text-accent/85 translate-y-[10px] opacity-90 tracking-[0.002em] transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:tracking-[0em] group-hover:text-accent group-hover:[text-shadow:0_0_12px_rgba(200,155,46,0.22)]">
                {service.title}
              </h3>
              <p className="relative z-[3] mt-3 text-sm leading-relaxed text-white/68 opacity-85 transition-opacity duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100">
                {service.desc}
              </p>
              <div className="relative z-[3] mt-4 flex flex-wrap gap-2">
                {service.metrics.map((metric, metricIdx) => (
                  <span
                    key={metric}
                    style={{ transitionDelay: `${metricIdx * 40}ms` }}
                    className="rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 text-[10px] tracking-[0.08em] text-white/76 scale-[0.98] transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:shadow-[0_0_10px_rgba(200,155,46,0.2)]"
                  >
                    {metric}
                  </span>
                ))}
              </div>
              <p className="relative z-[3] mt-auto inline-flex items-center gap-2 pt-5 text-[11px] tracking-[0.16em] text-white/76 transition-colors duration-300 group-hover:text-accent">
                <span className="relative inline-block pb-[2px] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:opacity-80 after:transition-all after:duration-300 after:ease-out group-hover:after:scale-x-100 group-hover:after:opacity-100">
                  {service.cta}
                </span>
                <span aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-[6px]">→</span>
              </p>
            </a>
          ))}
        </div>
        <div className="mt-10 border-t border-white/10 pt-8">
          <a
            href="/sherbimet"
            className="inline-flex items-center gap-3 font-display text-[clamp(1.45rem,3.2vw,2.4rem)] leading-[0.95] !text-[#f5f5f0] opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.16)] transition-transform duration-300 hover:translate-x-[6px]"
          >
            Të gjitha shërbimet <span aria-hidden className="text-accent">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
