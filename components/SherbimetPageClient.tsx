"use client";

import { useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalCTA from "@/components/GlobalCTA";
import { serviceCategories } from "@/lib/serviceCategories";
import { ensureGSAP, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/gsap";

export default function SherbimetPageClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroStatsRef = useRef<HTMLParagraphElement>(null);
  const heroTextureRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reduced) return;
    const { gsap, ScrollTrigger } = ensureGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(".sv-label", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.05 });
      gsap.fromTo(
        heroTitleRef.current,
        { opacity: 0, y: 48, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.05, ease: "power3.out", delay: 0.15 }
      );
      gsap.fromTo(
        heroStatsRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.5 }
      );

      if (heroSectionRef.current && heroTitleRef.current && window.matchMedia("(min-width: 900px)").matches) {
        gsap.to(heroTitleRef.current, {
          scale: 0.88,
          transformOrigin: "left top",
          ease: "none",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            pin: heroSectionRef.current,
            pinSpacing: true
          }
        });
      }

      gsap.to(heroTextureRef.current, {
        backgroundPositionX: "68%",
        backgroundPositionY: "44%",
        ease: "none",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <>
      <Navbar />
      <main ref={containerRef} className="relative overflow-hidden bg-bg text-text pt-14 md:pt-16">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_8%_10%,rgba(200,155,46,0.09),transparent_30%)]" />

        <section ref={heroSectionRef} className="relative z-[1] border-b border-white/10">
          <div className="section-wrap py-20 md:py-28">
            <div
              ref={heroTextureRef}
              className="pointer-events-none absolute inset-0 bg-[url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1800&q=80')] bg-[length:180%] bg-[position:20%_50%] opacity-0"
            />
            <div className="sv-label mb-5 h-px w-[180px] bg-gradient-to-r from-accent/80 to-transparent" />
            <p className="sv-label text-[10px] uppercase tracking-[0.3em] text-accent/80">SHËRBIMET</p>
            <h1
              ref={heroTitleRef}
              data-cursor="headline"
              className="hero-headline-trigger cadence-title mt-4 max-w-4xl bg-[url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1800&q=80')] bg-[length:170%] bg-[position:22%_48%] bg-clip-text font-display text-[clamp(2.2rem,6vw,4.8rem)] leading-[0.96] text-transparent"
            >
              3 kategori premium.
              <br />
              Të gjitha kapacitetet brenda.
            </h1>
            <p ref={heroStatsRef} className="mt-8 max-w-[56ch] text-base text-white/62">
              E thjeshtojmë vendimin: zgjidhni kategorinë që i përshtatet objektivit tuaj dhe ne bëjmë pjesën tjetër.
            </p>
          </div>
        </section>

        <section className="relative z-[1] border-b border-white/10">
          <div className="section-wrap py-14 md:py-20">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {serviceCategories.map((category) => (
                <article
                  key={category.slug}
                  className="group rounded-[1rem] border border-white/10 bg-[linear-gradient(155deg,rgba(18,18,18,0.95),rgba(11,11,11,0.92))] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-[2px] hover:border-accent/45 hover:shadow-[0_18px_42px_rgba(0,0,0,0.32)]"
                >
                  <p className="text-[12px] text-accent/90">{category.icon}</p>
                  <h2 className="mt-3 font-display text-[clamp(1.7rem,3.6vw,2.3rem)] leading-[0.96] text-white">{category.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/66">{category.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.subServices.map((item) => (
                      <span key={item} className="rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] text-white/70">
                        {item}
                      </span>
                    ))}
                  </div>
                  <Link href={`/sherbimet/${category.slug}`} className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-accent/92">
                    Zbulo më shumë <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <GlobalCTA title="Nuk jeni të sigurt cilën kategori të zgjidhni?" />
      </main>
      <Footer />
    </>
  );
}
