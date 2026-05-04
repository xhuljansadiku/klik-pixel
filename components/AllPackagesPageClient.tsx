"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionMark from "@/components/SectionMark";
import ServicePackageCard from "@/components/ServicePackageCard";
import { serviceCategories, type ServiceCategory } from "@/lib/serviceCategories";
import { useReducedMotion } from "@/lib/gsap";
import { usePinnedHeroScroll } from "@/lib/usePinnedHeroScroll";

const HERO_TEXTURE =
  "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1800&q=80";

const FILTERS: { slug: ServiceCategory["slug"]; label: string }[] = [
  { slug: "website",          label: "Website" },
  { slug: "ecommerce",        label: "E-Commerce" },
  { slug: "marketing-growth", label: "Marketing" },
  { slug: "branding-content", label: "Branding" },
  { slug: "smm",              label: "Social Media" },
];

export default function AllPackagesPageClient() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroTitleRef   = useRef<HTMLHeadingElement>(null);
  const heroStatsRef   = useRef<HTMLParagraphElement>(null);
  const heroTextureRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState<ServiceCategory["slug"]>("website");

  usePinnedHeroScroll({
    enabled: !reduced,
    /** Pinning the hero leaves a high z-index layer that eats clicks on the sticky filter tabs below. */
    enablePin: false,
    heroSectionRef,
    heroTitleRef,
    heroStatsRef,
    heroTextureRef,
  });

  const visible = serviceCategories.filter((c) => c.slug === active);

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden bg-bg pb-4 pt-14 text-text md:pt-16">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_8%_10%,rgba(171,131,57,0.09),transparent_30%)]" />

        {/* ── HERO ── */}
        <section ref={heroSectionRef} className="relative z-[1] border-b border-white/10">
          <div
            ref={heroTextureRef}
            className="pointer-events-none absolute inset-0 z-0 bg-[length:180%] bg-[position:20%_50%] opacity-0"
            style={{ backgroundImage: `url(${HERO_TEXTURE})` }}
          />
          <div className="section-wrap relative z-[1] py-20 md:py-28">
            <div className="sv-label mb-5 h-px w-[180px] bg-gradient-to-r from-accent/80 to-transparent" />
            <p className="sv-label text-[10px] uppercase tracking-[0.3em] text-accent/80">ÇMIMET & PAKETAT</p>
            <h1
              ref={heroTitleRef}
              data-cursor="headline"
              className="hero-headline-trigger cadence-title mt-4 max-w-4xl bg-[url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1800&q=80')] bg-[length:170%] bg-[position:22%_48%] bg-clip-text font-display text-[clamp(2.55rem,7.8vw,6.9rem)] leading-[0.95] tracking-[0.01em] pb-[0.12em] text-transparent"
            >
              Të gjitha paketat në një vend.
            </h1>
            <p ref={heroStatsRef} className="mt-8 max-w-[56ch] text-base text-white/62">
              Krahaso paketat për Website, E-Commerce, Marketing, Branding dhe Social Media. Çdo ofertë
              mund të personalizohet — konsultimi fillestar është falas.
            </p>
          </div>
        </section>

        {/* ── FILTER TABS ── */}
        <section className="sticky top-14 z-[50] border-b border-white/[0.07] bg-bg/90 backdrop-blur-[14px] md:top-[72px]">
          <div className="mx-auto flex w-full max-w-[1280px] items-center gap-0 overflow-x-auto px-5 md:px-10 lg:px-14">
            {FILTERS.map((f) => (
              <button
                key={f.slug}
                type="button"
                onClick={() => setActive(f.slug)}
                className={`font-ui relative shrink-0 px-4 py-4 text-[12px] font-medium tracking-[0.8px] transition-colors duration-200 md:px-5 md:text-[13px] ${
                  active === f.slug
                    ? "text-accent"
                    : "text-white/45 hover:text-white/75"
                }`}
              >
                {f.label}
                {active === f.slug && (
                  <span className="absolute inset-x-0 bottom-0 h-[1.5px] bg-accent" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* ── PACKAGE SECTIONS ── */}
        {visible.map((category) => (
          <section
            key={category.slug}
            id={category.slug}
            className="relative z-[1] scroll-mt-28 border-b border-white/[0.07]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-24 bg-gradient-to-b from-accent/[0.025] to-transparent" />
            <div className="section-wrap relative z-[1] py-14 md:py-20">

              {/* Section header */}
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <SectionMark label={category.title} eyebrowClassName="tracking-[0.18em]" />
                  <h2 className="mt-2 max-w-2xl font-display text-[clamp(1.65rem,3.5vw,2.75rem)] leading-[1.06] tracking-[-0.02em] text-white">
                    Paketat për{" "}
                    <span className="text-accent/85">{category.title}</span>
                  </h2>
                  <p className="mt-3 max-w-[52ch] text-[14px] leading-relaxed text-white/48">
                    {category.short}
                  </p>
                </div>
                <Link
                  href={`/services/${category.slug}`}
                  className="luxury-link shrink-0 text-[12px] uppercase tracking-[0.12em]"
                >
                  Detaje & proces <span aria-hidden>→</span>
                </Link>
              </div>

              {/* Cards */}
              <div className="mt-12 grid items-stretch gap-5 md:grid-cols-3">
                {category.packages.map((pkg) => (
                  <ServicePackageCard
                    key={`${category.slug}-${pkg.name}`}
                    pkg={pkg}
                    conversionCta
                  />
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="relative z-[1]">
          <div className="section-wrap py-10 md:py-12">
            <p className="text-center text-[11px] text-white/28">
              Të gjitha çmimet janë pa TVSH · Konsultimi fillestar është gjithmonë falas
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
