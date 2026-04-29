"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/caseStudies";
import { ensureGSAP, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/gsap";

export default function CaseStudyCard({ item }: { item: CaseStudy }) {
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!mediaRef.current || reduced) return;
    const { gsap } = ensureGSAP();
    const el = mediaRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(0 100% 0 0 round 1rem)", opacity: 0.72 },
        {
          clipPath: "inset(0 0% 0 0 round 1rem)",
          opacity: 1,
          duration: 1.05,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true
          }
        }
      );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <article className="group overflow-hidden rounded-[1rem] border border-white/10 bg-[#151515]">
      <div ref={mediaRef} className="relative h-56 overflow-hidden">
        <Image
          src={item.heroImage}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/15 to-transparent" />
      </div>
      <div className="p-5">
        <p className="text-[11px] tracking-[0.18em] text-accent/88">
          {item.category} • {item.year}
        </p>
        <h3 className="mt-2 font-display text-[2rem] leading-[0.95] text-white">{item.title}</h3>
        <p className="mt-2 inline-flex items-center gap-2 text-xs text-white/62">
          <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-1.5 py-0.5" aria-hidden>
            {item.flagCodes.map((code) => (
              <img
                key={code}
                src={`https://flagcdn.com/w20/${code}.png`}
                alt=""
                className="h-3.5 w-5 rounded-[2px] object-cover"
                loading="lazy"
              />
            ))}
          </span>
          {item.location}
        </p>
        <p className="mt-2 text-sm text-white/62">{item.intro}</p>
        <Link href={`/work/${item.slug}`} className="luxury-link mt-4">
          Shiko case study <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
