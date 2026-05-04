"use client";

import Link from "next/link";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionMark from "@/components/SectionMark";
import StickyConsultCTA from "@/components/StickyConsultCTA";
import ConversionLandingSections from "@/components/ConversionLandingSections";
import { brandingConversionLandingData } from "@/lib/brandingContentConversionContent";
import type { ConversionLandingData } from "@/lib/conversionLandingShared";
import { marketingConversionLandingData } from "@/lib/marketingGrowthConversionContent";
import type { ServiceCategory } from "@/lib/serviceCategories";
import { webConversionLandingData } from "@/lib/webEcommerceConversionContent";
import { ensureGSAP, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/gsap";
import ServicePackageCard from "@/components/ServicePackageCard";
import { ServiceHeroDecoration } from "@/components/ServiceHeroDecoration";
import { usePinnedHeroScroll } from "@/lib/usePinnedHeroScroll";

const HERO_TEXTURE =
  "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1800&q=80";

function conversionLandingForSlug(slug: ServiceCategory["slug"]): ConversionLandingData | null {
  switch (slug) {
    case "website":
    case "ecommerce":
      return webConversionLandingData;
    case "marketing-growth":
      return marketingConversionLandingData;
    case "branding-content":
      return brandingConversionLandingData;
    case "smm":
      return null;
    default:
      return null;
  }
}

export default function ServiceCategoryDetailPage({
  category,
}: {
  category: ServiceCategory;
}) {
  const mainRef = useRef<HTMLElement>(null);
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
    refreshKey: category.slug,
  });

  useIsomorphicLayoutEffect(() => {
    if (reduced || !mainRef.current) return;
    const { gsap } = ensureGSAP();

    const ctx = gsap.context(() => {
      const headerBlocks = gsap.utils.toArray<HTMLElement>(
        mainRef.current!.querySelectorAll(".svc-reveal-heading")
      );
      headerBlocks.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 26, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      const priceCards = gsap.utils.toArray<HTMLElement>(
        mainRef.current!.querySelectorAll(".svc-price-card")
      );
      if (priceCards.length) {
        gsap.fromTo(
          priceCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.78,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: priceCards[0],
              start: "top 84%",
              once: true,
            },
          }
        );
      }

      const closing = mainRef.current!.querySelector<HTMLElement>(".svc-closing-panel");
      if (closing) {
        gsap.fromTo(
          closing,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: { trigger: closing, start: "top 86%", once: true },
          }
        );
      }
    }, mainRef);

    return () => ctx.revert();
  }, [reduced, category.slug]);

  const eyebrow = category.title.toUpperCase();
  const conversionLanding = conversionLandingForSlug(category.slug);
  const isConversionLanding = conversionLanding !== null;
  const isWebPackages = category.slug === "website" || category.slug === "ecommerce";

  return (
    <>
      <Navbar />
      <main
        ref={mainRef}
        className={`relative overflow-hidden bg-bg pt-14 text-text md:pt-16 ${isConversionLanding ? "pb-24 md:pb-28" : "pb-4"}`}
      >
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_8%_10%,rgba(171,131,57,0.09),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_92%_72%,rgba(171,131,57,0.06),transparent_38%)]" />

        {/* ── HERO ── */}
        <section ref={heroSectionRef} className="relative z-[1] border-b border-white/10">
          <div
            ref={heroTextureRef}
            className="pointer-events-none absolute inset-0 z-0 bg-[length:180%] bg-[position:20%_50%] opacity-0"
            style={{ backgroundImage: `url(${HERO_TEXTURE})` }}
          />
          <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.14]">
            <div className="noir-grid h-full w-full" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-60" />

          <ServiceHeroDecoration slug={category.slug} />

          <div className="section-wrap relative z-[2] py-20 md:py-28">
            <div className="sv-label mb-5 h-px w-[180px] bg-gradient-to-r from-accent/80 to-transparent" />
            <p className="sv-label text-[10px] uppercase tracking-[0.3em] text-accent/80">{eyebrow}</p>
            <h1
              ref={heroTitleRef}
              data-cursor="headline"
              className="hero-headline-trigger cadence-title mt-4 max-w-4xl bg-[url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1800&q=80')] bg-[length:170%] bg-[position:22%_48%] bg-clip-text font-display text-[clamp(2.55rem,7.8vw,6.9rem)] leading-[0.95] tracking-[0.01em] pb-[0.12em] text-transparent"
            >
              {category.headline}
            </h1>
            {category.subheadline && (
              <p className="mt-6 max-w-[52ch] font-display text-[clamp(1.05rem,2.2vw,1.35rem)] leading-[1.35] tracking-[-0.01em] text-white/80">
                {category.subheadline}
              </p>
            )}
            <p
              ref={heroStatsRef}
              className={`${category.subheadline ? "mt-4" : "mt-8"} max-w-[52ch] font-display text-[clamp(1.05rem,2.2vw,1.35rem)] leading-[1.35] tracking-[-0.01em] text-white/80`}
            >
              {category.description}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className={`interactive-button ip-cta-primary inline-flex h-11 items-center gap-2 !px-7 !text-[12px] !tracking-[0.04em] !text-[#0e0d0c] ${
                  isWebPackages ||
                  category.slug === "marketing-growth" ||
                  category.slug === "branding-content"
                    ? "svc-web-hero-cta-pulse"
                    : ""
                }`}
              >
                {isConversionLanding
                  ? isWebPackages
                    ? (category.ctaPrimary ?? "Fillo Tani — Pa Kosto")
                    : category.slug === "marketing-growth"
                      ? "Ndalo humbjen — fol tani"
                      : category.slug === "branding-content"
                        ? (category.ctaPrimary ?? "Transformo përshtypjen")
                        : "Merr ofertë falas"
                  : "Rezervo Tani"}
              </Link>
              <a
                href={
                  isWebPackages
                    ? "#strategji"
                    : category.slug === "marketing-growth"
                      ? "#situata"
                      : category.slug === "branding-content"
                        ? "#realiteti"
                        : "#cmimet"
                }
                className="luxury-link"
              >
                {isWebPackages ? (
                  <>
                    {category.ctaSecondary ?? "Shiko Si Fitojmë"} <span aria-hidden>→</span>
                  </>
                ) : category.slug === "marketing-growth" ? (
                  <>
                    Shiko çfarë po ju vjedh sot <span aria-hidden>→</span>
                  </>
                ) : category.slug === "branding-content" ? (
                  <>
                    {category.ctaSecondary ?? "Shiko realitetin"} <span aria-hidden>→</span>
                  </>
                ) : (
                  <>
                    Shiko çmimet <span aria-hidden>→</span>
                  </>
                )}
              </a>
            </div>
            {isConversionLanding && (
              <p className="mt-4 text-[12px] tracking-[0.06em] text-white/38 md:text-[13px]">
                {isWebPackages
                  ? (category.trustLine ?? "0 kosto · 0 obligim · Strategji reale brenda 24 orësh")
                  : category.slug === "marketing-growth"
                    ? "Vendet për konsultë javore janë të kufizuara · përgjigje brenda 24 orëve · pa obligim"
                    : category.slug === "branding-content"
                      ? (category.trustLine ??
                        "Konsultë strategjike pa obligim · përgjigje brenda 24 orëve")
                      : "Pa obligim · përgjigje brenda 24h"}
              </p>
            )}

            <div className="mt-9 flex flex-wrap gap-2">
              {category.subServices.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-body text-[11px] font-light tracking-[0.05em] text-white/78 transition-colors duration-300 hover:border-accent/25 hover:text-white/90"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {conversionLanding && <ConversionLandingSections {...conversionLanding} />}

        {/* ── PRICING ── */}
        <section id="cmimet" className="relative z-[1] border-b border-white/[0.07]">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-32 bg-gradient-to-b from-accent/[0.03] to-transparent" />
          <div className="section-wrap relative z-[1] py-16 md:py-24">
            <div className="svc-reveal-heading">
              <SectionMark label="Paketat" eyebrowClassName="tracking-[0.22em]" />
              <h2 className="mt-1 max-w-2xl font-display text-[clamp(1.9rem,4vw,3.15rem)] leading-[1.04] tracking-[-0.02em] text-white">
                Zgjidhni nivelin{" "}
                <span className="text-white/55">që ju përshtatet.</span>
              </h2>
              <p className="mt-5 max-w-[52ch] text-[14px] leading-relaxed text-white/48">
                Çdo paketë personalizohet sipas nevojës. Na kontaktoni për zgjidhje speciale.
                {isWebPackages && (
                  <>
                    {" "}
                    Ofrojmë e-commerce dhe website në Tiranë/Shqipëri me standarde të larta, për biznese që duan rritje në Google.
                  </>
                )}
                {category.slug === "marketing-growth" && (
                  <>
                    {" "}
                    Zgjidhni sipas ashpërsisë së objektivit — nga ndalimi i gjakrrjedhjes në ads te dominimi në
                    kërkim dhe reklamë. Pa ‘bonus’ që nuk maten: vetëm çfarë ndikon në thirrje dhe xhiro.
                  </>
                )}
                {category.slug === "branding-content" && (
                  <>
                    {" "}
                    Tre nivele — nga prania e denjë te trashëgimia e markës. Çdo paketë lidhet me status, besim dhe
                    klientë më të përzgjedhur — jo me lista ‘çfarë dorëzojmë’ pa shpirt.
                  </>
                )}
              </p>
            </div>

            <div className="mt-14 grid items-stretch gap-5 md:grid-cols-3">
              {category.packages.map((pkg) => (
                <ServicePackageCard key={pkg.name} pkg={pkg} conversionCta={isConversionLanding} />
              ))}
            </div>

            <p className="mt-10 text-center text-[11px] text-white/28">
              Të gjitha çmimet janë pa TVSH · Konsultimi fillestar është gjithmonë falas
            </p>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="relative z-[1]">
          <div className="section-wrap py-20 md:py-28">
            <div className="svc-closing-panel relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-[linear-gradient(155deg,rgba(24,23,22,0.96),rgba(14,13,12,0.99))] px-6 py-14 text-center shadow-[0_28px_80px_rgba(0,0,0,0.45)] md:px-14 md:py-16">
              <div className="pointer-events-none absolute inset-0 opacity-[0.11]">
                <div className="noir-grid h-full w-full" />
              </div>
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent md:inset-x-16" />
              <div className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent/[0.07] blur-3xl" />
              <div className="pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-accent/[0.05] blur-3xl" />

              <div className="relative z-[1]">
                <SectionMark
                  label="Hapi i radhës"
                  eyebrowClassName="tracking-[0.22em] !text-accent/80"
                />
                <h2 className="mx-auto mt-3 max-w-[18ch] font-display text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[0.96] tracking-[-0.02em] text-white md:max-w-none">
                  {category.slug === "marketing-growth" ? (
                    <>
                      Nesër do të jetë{" "}
                      <span className="bg-gradient-to-r from-accent via-[#eace71] to-accent bg-clip-text text-transparent">
                        më shtrenjtë
                      </span>
                      {" "}se sot.
                    </>
                  ) : category.slug === "branding-content" ? (
                    <>
                      Prania juaj meriton{" "}
                      <span className="bg-gradient-to-r from-accent via-[#eace71] to-accent bg-clip-text text-transparent">
                        të njëjtin nivel si puna juaj
                      </span>
                      .
                    </>
                  ) : (
                    <>
                      Fillojmë gjithçka me një{" "}
                      <span className="bg-gradient-to-r from-accent via-[#eace71] to-accent bg-clip-text text-transparent">
                        bisedë pa pagesë
                      </span>
                      .
                    </>
                  )}
                </h2>
                <p className="mx-auto mt-6 max-w-[44ch] text-[14px] leading-relaxed text-white/50">
                  {isConversionLanding ? (
                    <>
                      {category.slug === "marketing-growth" ? (
                        <>
                          Çdo ditë pa sistem është ditë ku dikush tjetër mbyll me klientin që duhet të ishte
                          juaji. Merrni 30 minuta — pa obligim. Nëse nuk jemi për ju, e themi menjëherë; nëse
                          jemi, dilni me plan veprimi, jo me ‘po e shohim’.
                        </>
                      ) : category.slug === "branding-content" ? (
                        <>
                          Kur prania nuk përputhet me nivelin e punës, klienti më i mirë heshton — sepse kërkon
                          siguri, jo surprizë. Tridhjetë minuta me ne: pa obligim, me diskrecion, dhe një rrugë të
                          qartë drejt një marke që duket aq e denjë sa jeni ju.
                        </>
                      ) : (
                        <>
                          30 minuta · pa detyrim · përgjigje brenda 24 orëve. Diskutojmë për biznesin tuaj, qëllimet dhe mënyrën si e kthejmë vizitorët e faqes në klientë të vërtetë.
                          {isWebPackages && ""}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      30 minuta. Pa obligim. Flasim për biznesin tuaj, objektivat dhe si mund të punojmë bashkë.
                    </>
                  )}
                </p>

                <div className="mt-9 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/contact"
                    className="interactive-button ip-cta-primary ip-cta-primary--lg inline-flex h-12 items-center gap-2 !px-8 !text-[12px] !tracking-[0.04em] !text-[#0e0d0c]"
                  >
                    {isConversionLanding
                      ? category.slug === "marketing-growth"
                        ? "Zër vendin — rezervo tani →"
                        : category.slug === "branding-content"
                          ? "Rezervo orën tuaj të parë →"
                          : "Rezervo konsultë →"
                      : "Rezervo Tani →"}
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex h-12 items-center rounded-full border border-white/15 px-7 text-[11px] font-medium uppercase tracking-[0.14em] text-white/75 transition-colors duration-300 hover:border-accent/35 hover:text-white"
                  >
                    Na shkruani
                  </Link>
                </div>

                <div className="mt-12">
                  <Link
                    href="/sherbimet"
                    className="text-[11px] uppercase tracking-[0.2em] text-white/30 transition-colors duration-300 hover:text-white/60"
                  >
                    ← Kthehu te shërbimet
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {isConversionLanding && <StickyConsultCTA />}
      <Footer />
    </>
  );
}
