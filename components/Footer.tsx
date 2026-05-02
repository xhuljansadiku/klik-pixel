"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { ensureGSAP, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/gsap";

/** IANA zones for Albania civil time (CET/CEST). Some runtimes omit `Europe/Tirana`; Rome matches wall clock. */
const ALBANIA_WALL_CLOCK_ZONES = ["Europe/Tirana", "Europe/Rome", "Europe/Berlin"] as const;

function resolveAlbaniaWallClockTimeZone(): string | undefined {
  for (const timeZone of ALBANIA_WALL_CLOCK_ZONES) {
    try {
      new Intl.DateTimeFormat("en-US", { timeZone }).format(new Date());
      return timeZone;
    } catch {
      /* invalid in this ICU build */
    }
  }
  return undefined;
}

function formatAlbaniaWallClock(now: Date): string {
  const timeZone = resolveAlbaniaWallClockTimeZone();
  const base = { hour: "numeric" as const, minute: "2-digit" as const, hour12: true };
  if (timeZone) {
    try {
      return new Intl.DateTimeFormat("en-US", { ...base, timeZone }).format(now);
    } catch {
      try {
        return now.toLocaleTimeString("en-US", { ...base, timeZone });
      } catch {
        /* last resort below */
      }
    }
  }
  try {
    return now.toLocaleTimeString("en-US", base);
  } catch {
    return "";
  }
}

const useIsomorphicLayoutEffectClock =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [tiranaTime, setTiranaTime] = useState("");

  useIsomorphicLayoutEffectClock(() => {
    const update = () => setTiranaTime(formatAlbaniaWallClock(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!footerRef.current) return;
    const { gsap } = ensureGSAP();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current?.querySelectorAll(".footer-reveal") ?? [],
        { opacity: 0, y: 24, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 86%"
          }
        }
      );

      if (!reducedMotion) {
        gsap.to(".footer-ambient", {
          backgroundPosition: "100% 50%",
          duration: 16,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        gsap.to(auraRef.current, {
          yPercent: -8,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }, footerRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  const onFooterMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!auraRef.current || reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    auraRef.current.style.setProperty("--mx", `${x}%`);
    auraRef.current.style.setProperty("--my", `${y}%`);
  };

  return (
    <footer
      ref={footerRef}
      onPointerMove={onFooterMove}
      className="footer-signature relative overflow-hidden border-t border-white/10 bg-[#090909]"
    >
      <div className="footer-ambient pointer-events-none absolute inset-0" />
      <div
        ref={auraRef}
        className="pointer-events-none absolute inset-0 opacity-65"
        style={{
          background: "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(234, 206, 113,0.16), transparent 38%)"
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(171, 131, 57,0.08),transparent_52%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 opacity-[0.045]">
        <Image
          src="/images/illyrianpixel_logo.png"
          alt=""
          width={800}
          height={800}
          className="h-auto w-[240px] md:w-[360px]"
        />
      </div>

      <div className="section-wrap relative py-20 md:py-[120px]">
        <div className="grid items-start gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-[60px]">
          <div>
            <p className="footer-reveal footer-label text-[11px] uppercase tracking-[0.18em] text-accent">
              ILLYRIAN PIXEL
            </p>
            <h3 className="footer-reveal hero-headline-trigger cadence-title font-display relative mt-4 max-w-[12ch] text-[clamp(2.55rem,7.8vw,6.9rem)] leading-[0.99] tracking-[0.01em] text-white">
              Ktheje biznesin në <span className="text-accent uppercase font-bold">brand.</span>
            </h3>
            <p className="footer-reveal cadence-body mt-5 max-w-2xl text-[1.2rem] font-medium leading-[1.5] tracking-[0.01em] text-white/78 md:text-[1.34rem] md:leading-[1.45]">
              Nga klikimi te klienti 🚀
            </p>
          </div>

          <div className="flex w-full flex-col items-end text-right md:pt-1">
            <div className="footer-reveal flex flex-col items-end">
              <a
                href="/contact"
                className="interactive-button ip-cta-primary ip-cta-primary--lg group gap-2 !px-7 !py-3.5 !text-[13px] !tracking-[0.11em]"
              >
                Kontakto Tani <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>

              <div className="mt-8 flex items-center justify-end gap-2.5 md:mt-9">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50"
                    aria-hidden
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_rgba(171,131,57,0.65)]" />
                </span>
                <span className="text-[13px] font-medium tracking-[0.04em] text-white/58 md:text-sm">
                  Të disponueshëm për projekte të reja
                </span>
              </div>
            </div>

            <p
              className="mt-6 font-mono text-[12px] tabular-nums tracking-[0.06em] text-white/50 md:mt-7 md:text-[13px]"
              suppressHydrationWarning
            >
              Tiranë, AL{tiranaTime ? ` ${tiranaTime}` : ""}
            </p>

            <div className="mt-10 flex max-w-full flex-wrap items-center justify-end gap-x-2.5 gap-y-1 text-[10px] leading-snug tracking-[0.08em] text-white/45 md:mt-12">
              <a href="mailto:info@illyrianpixel.com" className="footer-link hover:text-white/70">
                info@illyrianpixel.com
              </a>
              <span className="text-white/25" aria-hidden>
                ·
              </span>
              <span>Shqipëri • Gjermani • Online</span>
            </div>
          </div>
        </div>

        <div className="footer-reveal footer-bottom mt-16 flex items-center justify-between border-t border-white/10 pt-5 text-[11px] uppercase tracking-[0.12em] text-white/50 md:mt-20">
          <p>© 2026 Illyrian Pixel</p>
          <a href="/" className="footer-link group inline-flex items-center gap-2">
            Kthehu sipër <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-[2px]">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
