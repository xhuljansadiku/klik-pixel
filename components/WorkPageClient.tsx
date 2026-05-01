"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/caseStudies";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalCTA from "@/components/GlobalCTA";
import { ensureGSAP, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/gsap";
import { usePinnedHeroScroll } from "@/lib/usePinnedHeroScroll";

export default function WorkPageClient({ projects }: { projects: CaseStudy[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroStatsRef = useRef<HTMLDivElement>(null);
  const heroTextureRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  usePinnedHeroScroll({
    enabled: !reduced,
    heroSectionRef,
    heroTitleRef,
    heroStatsRef,
    heroTextureRef,
    refreshKey: projects.length
  });

  useIsomorphicLayoutEffect(() => {
    if (reduced) return;
    const { gsap, ScrollTrigger } = ensureGSAP();

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".wk-project").forEach((project) => {
        const meta = project.querySelector(".wk-project-meta");
        const title = project.querySelector(".wk-project-title");
        const imgWrapper = project.querySelector(".wk-img-wrapper");
        const imgInner = project.querySelector(".wk-img-inner");
        const footer = project.querySelector(".wk-project-footer");

        gsap.fromTo(
          meta,
          { opacity: 0, y: 10 },
          {
            opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
            scrollTrigger: { trigger: project, start: "top 88%", once: true }
          }
        );

        gsap.fromTo(
          title,
          { opacity: 0, y: 36, filter: "blur(6px)" },
          {
            opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: project, start: "top 84%", once: true }
          }
        );

        gsap.fromTo(
          imgWrapper,
          { clipPath: "inset(100% 0 0 0 round 1.1rem)" },
          {
            clipPath: "inset(0% 0 0 0 round 1.1rem)", duration: 1.2, ease: "power4.out",
            scrollTrigger: { trigger: project, start: "top 78%", once: true }
          }
        );

        gsap.fromTo(
          imgInner,
          { y: 0 },
          {
            y: -52, ease: "none",
            scrollTrigger: { trigger: imgWrapper, start: "top bottom", end: "bottom top", scrub: 1.4 }
          }
        );

        gsap.fromTo(
          footer,
          { opacity: 0, y: 16 },
          {
            opacity: 1, y: 0, duration: 0.65, ease: "power3.out",
            scrollTrigger: { trigger: project, start: "top 72%", once: true }
          }
        );
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [reduced, projects.length]);

  return (
    <>
      <Navbar />
      <main ref={containerRef} className="relative overflow-hidden bg-bg pt-14 text-text md:pt-16">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_8%_10%,rgba(200,155,46,0.09),transparent_30%)]" />

        {/* ── Hero ── */}
        <section ref={heroSectionRef} className="relative z-[1] border-b border-white/10">
          <div
            ref={heroTextureRef}
            className="pointer-events-none absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1800&q=80')] bg-[length:180%] bg-[position:20%_50%] opacity-0"
          />
          <div className="section-wrap relative z-[1] py-20 md:py-28">
            <div className="sv-label mb-5 h-px w-[180px] bg-gradient-to-r from-accent/80 to-transparent" />
            <p className="sv-label text-[10px] uppercase tracking-[0.3em] text-accent/80">
              PUNËT TONA
            </p>
            <h1
              ref={heroTitleRef}
              data-cursor="headline"
              className="hero-headline-trigger cadence-title mt-4 max-w-4xl bg-[url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1800&q=80')] bg-[length:170%] bg-[position:22%_48%] bg-clip-text font-display text-[clamp(2.55rem,7.8vw,6.9rem)] leading-[0.95] tracking-[0.01em] pb-[0.12em] text-transparent"
            >
              Çfarë kemi
              <br />
              <span className="text-white/35">ndërtuar.</span>
            </h1>
            <div ref={heroStatsRef} className="wk-stats mt-8 max-w-[56ch] space-y-1 text-base leading-relaxed text-white/62">
              <p>Klientë nga Italia, Gjermania, Kosova, Anglia dhe Shqipëria.</p>
              <p>Punë ndërkombëtare me <span className="text-white/90">cilësi Gjermane</span>.</p>
            </div>
          </div>
        </section>

        {/* ── Project cards grid (2x3) ── */}
        <section className="relative z-[1]">
          <div className="section-wrap py-14 md:py-20">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((cs) => (
                <article
                  key={cs.slug}
                  className="wk-project group flex h-full flex-col overflow-hidden rounded-[1.1rem] border border-white/10 bg-[#111111]/80 px-5 pb-5 pt-8 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-accent/35"
                >
                  {/* Title */}
                  <h2 className="wk-project-title min-h-[2.3em] line-clamp-2 text-center font-display text-[clamp(1.55rem,3.45vw,2.55rem)] font-medium tracking-[0.012em] leading-[0.95]">
                    {cs.title === "ESM Group" ? (
                      <>
                        ESM
                        <br />
                        Group
                      </>
                    ) : cs.title === "Bardhi Wellness" ? (
                      <>
                        Bardhi
                        <br />
                        Wellness
                      </>
                    ) : (
                      cs.title
                    )}
                  </h2>

                  {/* Image with parallax */}
                  <div className="wk-img-wrapper relative mt-5 h-[240px] overflow-hidden rounded-[0.95rem] md:h-[280px]">
                    <div className="wk-img-inner absolute -bottom-10 -top-10 left-0 right-0">
                      <Image
                        src={cs.heroImage}
                        alt={cs.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 48vw, 32vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0b0b]/55 to-transparent" />
                    </div>
                  </div>

                  {/* Footer row */}
                  <div className="wk-project-footer mt-auto pt-5 flex items-center justify-end gap-4">
                    <Link
                      href={`/work/${cs.slug}`}
                      className="group flex shrink-0 items-center gap-2 text-sm text-white/50 transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-accent"
                    >
                      Shiko projektin
                      <span
                        className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-[5px]"
                        aria-hidden
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <GlobalCTA
          title="Gati për të ndërtuar diçka të jashtëzakonshme?"
          body="Rezervo një thirrje hyrëse për të transformuar vizionin tënd në një ekzekutim strategjik."
        />
        <Footer />
      </main>
    </>
  );
}
