"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ServiceItem } from "@/lib/siteContent";
import GlobalCTA from "@/components/GlobalCTA";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ensureGSAP, useIsomorphicLayoutEffect } from "@/lib/gsap";

export default function ServiceDetailPage({ service }: { service: ServiceItem }) {
  const isWebsites = service.slug === "websites";
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement | null>(null);
  const heroTextureRef = useRef<HTMLDivElement | null>(null);
  const transformationRef = useRef<HTMLElement | null>(null);
  const transformationCardsRef = useRef<Array<HTMLElement | null>>([]);
  const bentoRef = useRef<HTMLElement | null>(null);
  const gaugeValueRef = useRef<HTMLSpanElement | null>(null);
  const gaugeRingRef = useRef<HTMLDivElement | null>(null);
  const processSectionRef = useRef<HTMLElement | null>(null);
  const processTrackRef = useRef<HTMLDivElement | null>(null);
  const processLineRef = useRef<HTMLSpanElement | null>(null);
  const faqSectionRef = useRef<HTMLElement | null>(null);
  const tailVisualRef = useRef<HTMLDivElement | null>(null);

  const processSteps = [
    { label: "STEP 01", title: "Discovery", description: "Audit i plotë i ofertës, audiencës dhe pozicionimit tuaj në treg." },
    { label: "STEP 02", title: "Architecture", description: "Strukturë e faqes që orienton vizitorin drejt veprimit, jo konfuzionit." },
    { label: "STEP 03", title: "Design System", description: "UI premium me ritëm vizual, kontrast dhe hierarki që udhëheq syrin." },
    { label: "STEP 04", title: "Development", description: "Zbatim performant në Next.js me fokus te shpejtësia dhe stabiliteti." },
    { label: "STEP 05", title: "Launch + Growth", description: "Publikim, QA final dhe optimizim i vazhdueshëm për konvertime." }
  ];
  const transformationCards = [
    {
      title: "Core Problem",
      body: service.problem
    },
    {
      title: "Cost of Delay",
      body: "Çdo ditë me strukturë të paqartë ul besimin, ul kërkesat dhe rrit koston e marketingut."
    },
    {
      title: "Market Noise",
      body: "Kur prezantimi duket i zakonshëm, brand-i juaj humbet diferencimin dhe çmimin premium."
    },
    {
      title: "Golden Reveal",
      body: service.solution
    }
  ];

  useIsomorphicLayoutEffect(() => {
    if (!rootRef.current) return;
    const { gsap } = ensureGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroTitleRef.current,
        { opacity: 0, y: 26, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.95,
          ease: "power3.out",
          delay: 0.08
        }
      );

      gsap.fromTo(
        heroSubtitleRef.current,
        { opacity: 0, y: 20, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          delay: 0.4
        }
      );

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

      gsap.fromTo(
        heroTitleRef.current,
        { scale: 1 },
        {
          scale: 0.78,
          transformOrigin: "left top",
          ease: "none",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            pin: true,
            pinSpacing: true
          }
        }
      );

      gsap.fromTo(
        transformationCardsRef.current,
        { y: 90, opacity: 0.2, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: transformationRef.current, start: "top 74%" }
        }
      );

      gsap.fromTo(
        ".elite-bento-card",
        { opacity: 0, y: 32, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.72,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: bentoRef.current, start: "top 76%" }
        }
      );

      const gaugeCounter = { value: 0 };
      gsap.to(gaugeCounter, {
        value: 100,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: bentoRef.current, start: "top 72%" },
        onUpdate: () => {
          const val = Math.round(gaugeCounter.value);
          if (gaugeValueRef.current) gaugeValueRef.current.textContent = `${val}/100`;
          if (gaugeRingRef.current) gaugeRingRef.current.style.setProperty("--gauge", `${val}%`);
        }
      });

      if (processSectionRef.current && processTrackRef.current && window.matchMedia("(min-width: 900px)").matches) {
        const cards = gsap.utils.toArray<HTMLElement>(".elite-process-card");
        const maxShift = Math.max(processTrackRef.current.scrollWidth - window.innerWidth, 0);
        const processTl = gsap.timeline({
          scrollTrigger: {
            trigger: processSectionRef.current,
            start: "top top",
            end: () => `+=${Math.max(maxShift + window.innerHeight * 0.55, window.innerHeight * 1.2)}`,
            scrub: 1,
            pin: true
          }
        });
        processTl.to(processTrackRef.current, {
          x: () => -maxShift,
          ease: "none"
        });
        processTl.to(
          processLineRef.current,
          {
            scaleX: 1,
            transformOrigin: "left center",
            ease: "none"
          },
          0
        );

        gsap.to(cards, {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: processSectionRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 0.9
          }
        });
      }

      gsap.fromTo(
        ".elite-faq-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: faqSectionRef.current,
            start: "top 80%"
          }
        }
      );

      gsap.fromTo(
        tailVisualRef.current,
        { opacity: 0, y: 30, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tailVisualRef.current,
            start: "top 84%"
          }
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const heroTitle = isWebsites ? "Arkitekturë Digjitale që Konverton Vizitorët në Pasuri." : `${service.title} që ndërton autoritet dhe rezultat.`;
  const heroLabel = isWebsites ? "WEBSITES" : `SHËRBIMI • ${service.title.toUpperCase()}`;

  return (
    <>
      <Navbar />
      <main ref={rootRef} className="relative overflow-hidden bg-bg text-text pt-14 md:pt-16">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_10%_14%,rgba(200,155,46,0.1),transparent_35%),radial-gradient(circle_at_88%_82%,rgba(200,155,46,0.07),transparent_42%)]" />

        <section ref={heroSectionRef} className="relative z-[1] border-b border-white/10">
          <div className="section-wrap py-20 md:py-28">
            <div className="mb-5 h-px w-full max-w-[220px] bg-gradient-to-r from-accent/80 to-transparent" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent/92">{heroLabel}</p>
            <h1
              ref={heroTitleRef}
              className="mt-4 max-w-5xl bg-[url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1800&q=80')] bg-[length:170%] bg-[position:22%_48%] bg-clip-text font-display text-[clamp(2.25rem,6.4vw,5.65rem)] leading-[0.92] text-transparent [will-change:transform]"
            >
              {heroTitle}
            </h1>
            <div
              ref={heroTextureRef}
              className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[url('https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1800&q=80')] bg-[length:180%] bg-[position:20%_50%] opacity-0"
            />
            <p ref={heroSubtitleRef} className="mt-6 max-w-[66ch] text-base leading-relaxed text-white/72 [will-change:transform]">
              {service.short}
            </p>
          </div>
        </section>

        <section ref={transformationRef} className="cinematic-section !min-h-0 border-t border-white/10 py-0 md:!min-h-0">
          <div className="section-wrap grid gap-10 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-24">
            <div className="md:sticky md:top-28 md:self-start">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent/92">THE HOOK</p>
              <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.92] text-white">
                Pse shumica e faqeve dështojnë?
              </h2>
            </div>
            <div className="space-y-4">
              {transformationCards.map((item, idx) => (
                <article
                  key={item.title}
                  ref={(el) => {
                    transformationCardsRef.current[idx] = el;
                  }}
                  className={`relative rounded-[1rem] border p-6 backdrop-blur-md [will-change:transform] ${
                    idx === 3
                      ? "border-accent/60 bg-[linear-gradient(135deg,rgba(200,155,46,0.2),rgba(12,12,12,0.94))]"
                      : "border-white/12 bg-white/[0.02]"
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.26em] text-accent/88">{item.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section ref={bentoRef} className="cinematic-section !min-h-0 border-t border-white/10 py-0 md:!min-h-0">
          <div className="section-wrap py-16 md:py-24">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent/92">VALUE GRID</p>
                <h2 className="mt-2 font-display text-[clamp(2rem,4.6vw,3.3rem)] leading-[0.95]">Bento Experience</h2>
              </div>
              <p className="max-w-[52ch] text-sm leading-relaxed text-white/62">
                Arkitekturë vizuale që komunikon vlerën para se përdoruesi të lexojë çdo rresht.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-12">
              <article className="elite-bento-card relative overflow-hidden rounded-[1rem] border border-accent/45 bg-white/[0.03] p-6 backdrop-blur-md md:col-span-7">
                <p className="text-[10px] uppercase tracking-[0.28em] text-accent/92">Performance Mastery</p>
                <div className="mt-5 flex items-center gap-6">
                  <div
                    ref={gaugeRingRef}
                    className="relative grid h-[112px] w-[112px] place-items-center rounded-full border border-accent/40 bg-[conic-gradient(rgba(200,155,46,0.95)_var(--gauge),rgba(255,255,255,0.08)_0%)] p-[7px] [--gauge:0%]"
                  >
                    <div className="grid h-full w-full place-items-center rounded-full bg-[#0b0b0b]">
                      <span ref={gaugeValueRef} className="font-display text-xl text-white">0/100</span>
                    </div>
                  </div>
                  <p className="max-w-[38ch] text-sm leading-relaxed text-white/70">
                    Core Web Vitals të optimizuara për shpejtësi të lartë dhe stabilitet në çdo ekran.
                  </p>
                </div>
              </article>

              <article
                onPointerMove={(event) => {
                  const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
                  const x = event.clientX - rect.left;
                  const y = event.clientY - rect.top;
                  event.currentTarget.style.setProperty("--mx", `${x}px`);
                  event.currentTarget.style.setProperty("--my", `${y}px`);
                }}
                className="elite-bento-card relative overflow-hidden rounded-[1rem] border border-white/14 bg-white/[0.03] p-6 backdrop-blur-[20px] [--mx:50%] [--my:50%] md:col-span-5"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(180px_circle_at_var(--mx)_var(--my),rgba(200,155,46,0.28),transparent_60%)] opacity-70" />
                <p className="relative text-[10px] uppercase tracking-[0.28em] text-accent/92">UX Psychology</p>
                <p className="relative mt-4 text-sm leading-relaxed text-white/72">
                  Hierarki e qartë dhe flow vendimmarrjeje që e drejton vizitorin nga interesi te kontakti.
                </p>
              </article>

              <article className="elite-bento-card relative overflow-hidden rounded-[1rem] border border-white/14 bg-white/[0.03] p-6 backdrop-blur-sm md:col-span-12">
                <p className="text-[10px] uppercase tracking-[0.28em] text-accent/92">Next.js Architecture</p>
                <pre className="mt-4 overflow-x-auto rounded-[0.8rem] border border-white/10 bg-black/35 p-4 text-xs leading-relaxed text-white/78">
{`export const runtime = "edge";
export async function GET() {
  return Response.json({ status: "fast", cache: "stable" });
}`}
                </pre>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.deliverables.map((item) => (
                    <span key={item} className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-white/70">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section ref={processSectionRef} className="cinematic-section !min-h-0 border-t border-white/10 py-0 md:!min-h-0">
          <div className="section-wrap py-16 md:py-24">
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent/92">PROCESI YNË</p>
              <h2 className="mt-2 font-display text-[clamp(2rem,4.6vw,3.3rem)] leading-[0.95]">Signature Process</h2>
            </div>
            <div className="relative">
              <span className="absolute left-0 top-[14px] h-px w-full bg-white/12" />
              <span ref={processLineRef} className="absolute left-0 top-[14px] h-px w-full scale-x-0 bg-accent/95 shadow-[0_0_14px_rgba(200,155,46,0.45)]" />
              <div ref={processTrackRef} className="flex gap-4 pt-9 md:gap-6">
              {processSteps.map((step) => (
                <article
                  key={step.title}
                  className="elite-process-card group relative min-h-[290px] w-[min(86vw,500px)] shrink-0 overflow-hidden rounded-[1rem] border border-white/12 bg-[#111111] p-6 transition-all duration-300 hover:border-accent/45 [will-change:transform]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(200,155,46,0.16),transparent_55%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                  <p className="relative text-[10px] uppercase tracking-[0.24em] text-accent/90">{step.label}</p>
                  <h3 className="relative mt-3 font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-[0.98] text-white">{step.title}</h3>
                  <p className="relative mt-4 max-w-[44ch] text-sm leading-relaxed text-white/66">{step.description}</p>
                </article>
              ))}
              </div>
            </div>
          </div>
        </section>

        <section ref={faqSectionRef} className="cinematic-section !min-h-0 border-t border-white/10 py-0 md:!min-h-0">
          <div className="section-wrap py-16 md:py-20">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-[clamp(2rem,4.6vw,3.3rem)] leading-[0.95]">PYETJE TË SHPESHTA</h2>
              <p className="max-w-[42ch] text-sm leading-relaxed text-white/60">
                Përgjigje të shkurtra për pyetjet kryesore para se të fillojmë bashkëpunimin.
              </p>
            </div>
            <div className="space-y-3">
              {service.faq.map((item) => (
                <article
                  key={item.q}
                  className="elite-faq-card rounded-[0.9rem] border border-white/10 bg-[#151515] p-5 transition-all duration-300 hover:-translate-y-[1px] hover:border-accent/35 [will-change:transform]"
                >
                  <h3 className="text-sm tracking-[0.11em] text-white/86">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{item.a}</p>
                </article>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/services" className="luxury-link">
                Kthehu te të gjitha shërbimet <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>

        <GlobalCTA
          label="HAPI TJETËR"
          title="Gati të fillojmë?"
          body="Rezervoni një bisedë falas — ju tregojmë saktësisht çfarë duhet dhe si do duket rezultati."
          primaryActionText="Rezervo një call →"
          primaryActionHref="/contact"
        />

        <section className="section-wrap !pt-0 pb-20 md:pb-24">
          <div ref={tailVisualRef} className="elite-footer-visual group relative h-[240px] overflow-hidden rounded-[1rem] border border-white/12">
            <Image
              src={`${service.image}?auto=format&fit=crop&w=1600&q=80`}
              alt=""
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-[1.06]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-[#0b0b0b]/35" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(200,155,46,0.22),transparent_42%)] opacity-70" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(112deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.1)_46%,rgba(255,255,255,0)_68%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
