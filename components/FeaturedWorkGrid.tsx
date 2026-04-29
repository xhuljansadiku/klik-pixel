"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ensureGSAP, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/gsap";
import SectionMark from "@/components/SectionMark";
import { caseStudies } from "@/lib/caseStudies";

export default function FeaturedWorkGrid() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current || reducedMotion) return;
    const { gsap, ScrollTrigger } = ensureGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-chapters-intro > *",
        { opacity: 0, y: 26, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%"
          }
        }
      );

      chapterRefs.current.forEach((chapter, idx) => {
        if (!chapter) return;
        const imageWrap = imageRefs.current[idx];
        const content = chapter.querySelector(".chapter-copy");

        gsap.fromTo(
          content,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            scrollTrigger: {
              trigger: chapter,
              start: "top 70%"
            }
          }
        );

        if (imageWrap) {
          gsap.fromTo(
            imageWrap,
            { opacity: 0.75, scale: 0.98, clipPath: "inset(0 100% 0 0 round 1.25rem)" },
            {
              opacity: 1,
              scale: 1,
              clipPath: "inset(0 0% 0 0 round 1.25rem)",
              duration: 1.05,
              ease: "power4.out",
              scrollTrigger: {
                trigger: chapter,
                start: "top 72%"
              }
            }
          );

          gsap.to(imageWrap, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });
        }

        ScrollTrigger.create({
          trigger: chapter,
          start: "top 52%",
          end: "bottom 52%",
          onEnter: () => setActiveIdx(idx),
          onEnterBack: () => setActiveIdx(idx)
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  useIsomorphicLayoutEffect(() => {
    if (!progressRef.current) return;
    const { gsap } = ensureGSAP();
    const progress = caseStudies.length > 1 ? activeIdx / (caseStudies.length - 1) : 0;
    gsap.to(progressRef.current, { scaleY: Math.max(0.05, progress), duration: 0.4, ease: "power2.out" });
  }, [activeIdx]);

  return (
    <section id="featured-work" ref={sectionRef} className="cinematic-section section-tone-work relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_22%,rgba(200,155,46,0.08),transparent_36%),radial-gradient(circle_at_84%_78%,rgba(200,155,46,0.05),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(200,155,46,0.04),transparent_48%,rgba(200,155,46,0.03))] animate-[featuredAmbient_20s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025] [background-image:repeating-radial-gradient(circle_at_0_0,rgba(255,255,255,0.4)_0_1px,transparent_1px_4px)]" />

      <div className="section-wrap featured-chapters-intro">
        <SectionMark label="PROJEKTET" />
        <h2 className="section-title mt-3 max-w-4xl">
          Faqe që punojnë.
          <br />
          Biznese që <span className="text-accent">rriten</span>.
        </h2>
      </div>

      <div className="mt-8">
        {caseStudies.map((project, idx) => (
          <article
            key={project.slug}
            ref={(node) => {
              chapterRefs.current[idx] = node;
            }}
            className="relative flex min-h-[90svh] items-center py-12 md:py-16"
          >
            <div className="section-wrap grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
              <div className={`chapter-copy transition-opacity duration-500 ${activeIdx === idx ? "opacity-100" : "opacity-90"}`}>
                <p className="text-[11px] tracking-[0.2em] text-accent/85">{project.category}</p>
                <h3 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] leading-[0.92] text-white">{project.title}</h3>
                <p className="mt-2 inline-flex items-center gap-2 text-xs text-white/66">
                  <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-1.5 py-0.5" aria-hidden>
                    {project.flagCodes.map((code) => (
                      <Image
                        key={code}
                        src={`https://flagcdn.com/w20/${code}.png`}
                        alt=""
                        width={20}
                        height={14}
                        className="h-3.5 w-5 rounded-[2px] object-cover"
                        loading="lazy"
                        unoptimized
                      />
                    ))}
                  </span>
                  {project.location}
                </p>
                <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-white/72 md:text-base">{project.intro}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.metrics.slice(0, 2).map((metric) => (
                    <span key={metric} className="rounded-full border border-white/14 bg-white/[0.03] px-3 py-1.5 text-[10px] tracking-[0.12em] text-white/80">
                      {metric}
                    </span>
                  ))}
                </div>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-grid-cta mt-7 inline-flex items-center gap-2 text-[12px] tracking-[0.18em]"
                  >
                    Shiko projektin live <span aria-hidden className="transition-transform duration-300 hover:translate-x-1">→</span>
                  </a>
                ) : (
                  <span className="featured-grid-cta mt-7 inline-flex items-center gap-2 text-[12px] tracking-[0.18em]">Së shpejti</span>
                )}
              </div>

              <div
                ref={(node) => {
                  imageRefs.current[idx] = node;
                }}
                className={`relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#111]/90 shadow-[0_22px_66px_rgba(0,0,0,0.44)] transition-all duration-500 ${
                  activeIdx === idx ? "scale-[1.01] border-accent/30" : "scale-[0.985]"
                }`}
              >
                <div className="relative aspect-[16/10]">
                  <Image src={project.heroImage} alt={`Pamje e projektit ${project.title}`} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover object-top" />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,9,0.06)_0%,rgba(9,9,9,0.28)_58%,rgba(9,9,9,0.86)_100%)]" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="text-[11px] tracking-[0.16em] text-accent/85">CHAPTER {String(idx + 1).padStart(2, "0")}</p>
                  <p className="mt-2 text-sm text-white/74 md:text-base">{project.result}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="section-wrap pb-2">
        <Link href="/work" className="featured-grid-cta group inline-flex items-center gap-2 text-[13px] tracking-[0.18em]">
          Shiko të gjitha projektet <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
