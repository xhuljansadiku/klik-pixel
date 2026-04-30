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
          scrollTrigger: { trigger: el, start: "top 86%", once: true }
        }
      );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <article className="group overflow-hidden rounded-[1.1rem] border border-white/10 bg-[#151515] transition-all duration-300 hover:border-white/20">
      <div ref={mediaRef} className="relative h-64 overflow-hidden">
        <Image
          src={item.heroImage}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b]/80 via-[#0b0b0b]/10 to-transparent" />
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/50 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.14em] text-white/60 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5 md:p-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-accent/80">
          {item.category} • {item.year}
        </p>
        <h3 className="mt-2 font-display text-[1.9rem] leading-[0.95] text-white">
          {item.title}
        </h3>
        <p className="mt-2 inline-flex items-center gap-2 text-xs text-white/50">
          <span className="inline-flex items-center gap-1 rounded-md bg-white/8 px-1.5 py-0.5" aria-hidden>
            {item.flagCodes.map((code) => (
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
          {item.location}
        </p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/55">{item.intro}</p>
        <Link href={`/work/${item.slug}`} className="luxury-link mt-5">
          Shiko case study <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
