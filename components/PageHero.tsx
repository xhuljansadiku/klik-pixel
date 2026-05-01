"use client";

import Image from "next/image";
import { useRef } from "react";
import { usePinnedHeroScroll } from "@/lib/usePinnedHeroScroll";
import { useReducedMotion } from "@/lib/gsap";

const HERO_TEXTURE =
  "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1800&q=80";

type PageHeroProps = {
  label: string;
  title: string;
  description: string;
  image?: string;
};

export default function PageHero({ label, title, description, image }: PageHeroProps) {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroStatsRef = useRef<HTMLParagraphElement>(null);
  const heroTextureRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  usePinnedHeroScroll({
    enabled: !reduced,
    heroSectionRef,
    heroTitleRef,
    heroStatsRef,
    heroTextureRef,
    refreshKey: `${label}|${title}|${description}|${image ?? ""}`
  });

  return (
    <section ref={heroSectionRef} className="relative z-[1] overflow-hidden border-b border-white/10">
      <div
        ref={heroTextureRef}
        className="pointer-events-none absolute inset-0 z-0 bg-[length:180%] bg-[position:20%_50%] opacity-0"
        style={{ backgroundImage: `url(${HERO_TEXTURE})` }}
      />
      <div
        className={`section-wrap relative z-[1] py-20 md:py-28${image ? " grid items-end gap-10 lg:grid-cols-[1.04fr_0.96fr]" : ""}`}
      >
        <div className="relative z-[1]">
          <div className="sv-label mb-5 h-px w-[180px] bg-gradient-to-r from-accent/80 to-transparent" />
          <p className="sv-label text-[10px] uppercase tracking-[0.3em] text-accent/80">{label}</p>
          <h1
            ref={heroTitleRef}
            data-cursor="headline"
            className="hero-headline-trigger cadence-title mt-4 max-w-4xl bg-[url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1800&q=80')] bg-[length:170%] bg-[position:22%_48%] bg-clip-text font-display text-[clamp(2.55rem,7.8vw,6.9rem)] leading-[0.95] tracking-[0.01em] pb-[0.12em] text-transparent"
          >
            {title}
          </h1>
          <p ref={heroStatsRef} className="mt-8 max-w-[56ch] text-base text-white/62">
            {description}
          </p>
        </div>
        {image ? (
          <div className="relative z-[1] h-[260px] overflow-hidden rounded-[1rem] border border-white/12 bg-[#111111] md:h-[320px]">
            <Image
              src={image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/20 to-transparent" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
