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
import { buildWhatsAppChatHref, DEFAULT_WHATSAPP_E164 } from "@/lib/whatsappPrefill";

const HERO_TEXTURE =
  "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1800&q=80";

function openModal() {
  window.dispatchEvent(new CustomEvent("open-inquiry-modal"));
}

function conversionLandingForSlug(slug: ServiceCategory["slug"]): ConversionLandingData | null {
  switch (slug) {
    case "web-ecommerce":
      return webConversionLandingData;
    case "marketing-growth":
      return marketingConversionLandingData;
    case "branding-content":
      return brandingConversionLandingData;
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
              {category.slug === "web-ecommerce" ? (
                <>
                  {category.headline.split(", ")[0]},{" "}
                  <br />
                  {category.headline.split(/, (.+)/)[1]}
                </>
              ) : (
                category.headline
              )}
            </h1>
            <p
              ref={heroStatsRef}
              className="mt-8 max-w-[56ch] font-body text-base leading-relaxed text-white/62 md:text-[17px]"
            >
              {category.description}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={openModal}
                className={`interactive-button ip-cta-primary inline-flex h-11 items-center gap-2 !px-7 !text-[12px] !tracking-[0.04em] !text-[#0e0d0c] ${
                  category.slug === "web-ecommerce" ? "svc-web-hero-cta-pulse" : ""
                }`}
              >
                {isConversionLanding
                  ? category.slug === "web-ecommerce"
                    ? "Nis projektin tënd"
                    : "Merr ofertë falas"
                  : "Rezervo Tani"}
              </button>
              <a
                href={category.slug === "web-ecommerce" ? "#strategji" : "#cmimet"}
                className="luxury-link"
              >
                {category.slug === "web-ecommerce" ? (
                  <>
                    Shiko Strategjinë <span aria-hidden>→</span>
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
                {category.slug === "web-ecommerce"
                  ? "Pa kosto konsultimi · Strategji e personalizuar brenda 24h"
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
                Zgjidhni nivelin e duhur
                <br />
                <span className="text-white/55">për objektivin tuaj.</span>
              </h2>
              <p className="mt-5 max-w-[52ch] text-[14px] leading-relaxed text-white/48">
                {category.slug === "web-ecommerce" ? (
                  <>
                    Çdo paketë mund të personalizohet.
                    <br />
                    Ndërtojmë zgjidhje me të njëjtin standard për biznese që duan të rriten në Google dhe jo vetëm të duken mirë.
                  </>
                ) : category.slug === "marketing-growth" ? (
                  <>
                    Çdo paketë mund të personalizohet. SEO Tirana, Google Ads Shqipëri dhe Meta Ads me të
                    njëjtin standard raportimi për biznese që duan kërkesa të matshme.
                  </>
                ) : (
                  <>
                    Çdo paketë mund të personalizohet. Branding dhe identitet vizual për prezencë në Shqipëri
                    dhe diasporë — një gjuhë e njëtrajtshme nga vizitkarta te faqja dhe social.
                  </>
                )}
              </p>
            </div>

            <div className="mt-14 grid gap-x-5 gap-y-10 md:grid-cols-3 md:items-end">
              {category.packages.map((pkg) => (
                <div key={pkg.name} className="flex flex-col">
                  {pkg.featured && (
                    <div className="mb-3 flex justify-center">
                      <span className="inline-flex items-center rounded-full bg-[#D4AF37] px-4 py-[0.32rem] text-[9px] font-bold uppercase tracking-[0.24em] text-black shadow-[0_0_18px_rgba(212,175,55,0.48),0_0_36px_rgba(212,175,55,0.18)]">
                        Më e Populluara
                      </span>
                    </div>
                  )}
                  <ServicePackageCard pkg={pkg} conversionCta={isConversionLanding} />
                </div>
              ))}
            </div>

            <p className="mt-10 text-center text-[11px] text-white/28">
              Konsultimi fillestar është gjithmonë falas
            </p>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="relative z-[1]">
          <div className="section-wrap py-20 md:py-28">
            <div className="svc-closing-panel relative overflow-hidden rounded-[28px] border border-[rgba(212,175,55,0.14)] bg-[linear-gradient(145deg,rgba(20,20,20,0.98),rgba(8,8,8,0.99))] px-6 py-16 text-center shadow-[inset_0_1px_0_rgba(212,175,55,0.1),0_32px_80px_rgba(0,0,0,0.55),0_0_0_1px_rgba(212,175,55,0.05)] backdrop-blur-sm md:px-14 md:py-20">
              {/* Grid noise */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.09]">
                <div className="noir-grid h-full w-full" />
              </div>
              {/* Top gold separator */}
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent md:inset-x-16" />
              {/* Centred radial ambient — mirrors Pro card glow */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_72%_48%_at_50%_0%,rgba(212,175,55,0.07),transparent_72%)]" />
              {/* Side orbs */}
              <div className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[rgba(212,175,55,0.06)] blur-3xl" />
              <div className="pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-[rgba(212,175,55,0.04)] blur-3xl" />

              <div className="relative z-[1]">
                <SectionMark
                  label="Hapi tjetër"
                  eyebrowClassName="tracking-[0.22em] !text-[#D4AF37]/80"
                />
                <h2 className="mx-auto mt-3 max-w-[22ch] font-display text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[0.96] tracking-[-0.02em] text-white md:max-w-none">
                  Le të ndërtojmë
                  <br />
                  <span className="text-[#D4AF37]">strategjinë tuaj</span>{" "}
                  të rritjes.
                </h2>
                <p className="mx-auto mt-6 max-w-[50ch] text-[14px] leading-[1.72] text-white/52">
                  {category.slug === "web-ecommerce" ? (
                    <>
                      Një bisedë 30-minutëshe pa asnjë obligim.
                      <br />
                      Do të analizojmë biznesin tuaj aktual dhe do t&apos;ju japim një plan konkret se si t&apos;i ktheni vizitorët në klientë besnikë.
                    </>
                  ) : category.slug === "marketing-growth" ? (
                    <>
                      Një bisedë 30-minutëshe pa asnjë obligim. Analizojmë kanalin tuaj aktual
                      dhe ndërtojmë një plan konkret për rritje organike dhe ROI të matshëm.
                    </>
                  ) : (
                    <>
                      Një bisedë 30-minutëshe pa asnjë obligim. Flasim për markën tuaj dhe si
                      ta forcojmë prezencën vizuale në çdo pikë kontakti.
                    </>
                  )}
                </p>

                <div className="mt-9 flex flex-wrap justify-center gap-4">
                  <button
                    type="button"
                    onClick={openModal}
                    className="interactive-button ip-cta-primary ip-cta-primary--lg svc-web-hero-cta-pulse inline-flex h-12 items-center gap-2 !px-8 !text-[12px] !tracking-[0.04em] !text-[#0e0d0c]"
                  >
                    Nisni Konsultën Falas →
                  </button>
                  <a
                    href={buildWhatsAppChatHref(DEFAULT_WHATSAPP_E164)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(22,21,20,0.92)] px-7 text-[11px] font-medium uppercase tracking-[0.14em] text-white/78 transition-all duration-300 hover:border-[rgba(212,175,55,0.55)] hover:bg-[rgba(30,29,28,0.96)] hover:text-white"
                  >
                    Na Shkruani
                  </a>
                </div>

                {/* Trust indicator */}
                <p className="mt-5 text-[11px] tracking-[0.08em] text-white/30">
                  Përgjigje brenda 24h &middot; Pa kosto &middot; Pa obligim
                </p>

                <div className="mt-10">
                  <Link
                    href="/sherbimet"
                    className="text-[11px] uppercase tracking-[0.2em] text-white/28 transition-colors duration-300 hover:text-white/55"
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
