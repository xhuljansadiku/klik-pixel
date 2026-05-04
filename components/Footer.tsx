"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { ensureGSAP, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/gsap";

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
      } catch { /* last resort */ }
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
          scrollTrigger: { trigger: footerRef.current, start: "top 86%" }
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
      {/* Ambient layers */}
      <div className="footer-ambient pointer-events-none absolute inset-0" />
      <div
        ref={auraRef}
        className="pointer-events-none absolute inset-0 opacity-65"
        style={{
          background: "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(234,206,113,0.16), transparent 38%)"
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(171,131,57,0.08),transparent_52%)]" />

      {/* Noise texture — premium matte feel */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          opacity: 0.02,
          mixBlendMode: "overlay"
        }}
        aria-hidden
      />

      {/* Ghost eagle — 4–5% opacity, centered */}
      <div className="pointer-events-none absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 opacity-[0.045]">
        <Image
          src="/images/illyrianpixel_logo.png"
          alt=""
          width={800}
          height={800}
          className="h-auto w-[260px] md:w-[420px]"
        />
      </div>

      <div className="section-wrap relative py-20 md:py-[120px]">
        <div className="grid items-start gap-14 md:grid-cols-[1.5fr_1fr_1.2fr] md:gap-8 lg:gap-16">

          {/* ── Col 1: Brand ── */}
          <div>
            {/* Logo + wordmark stacked */}
            <div className="footer-reveal inline-flex flex-col items-center gap-3">
              <Image
                src="/images/illyrianpixel_logo.png"
                alt=""
                width={200}
                height={72}
                className="h-16 w-auto object-contain"
              />
              <Image
                src="/images/illyrianpixel_text.png"
                alt="Illyrian Pixel"
                width={360}
                height={72}
                className="h-7 w-auto object-contain opacity-70"
              />
            </div>

            {/* Headline */}
            <h3 className="footer-reveal font-display mt-8 max-w-[13ch] text-[clamp(1.3rem,3vw,2.4rem)] font-bold leading-[1.06] tracking-[-0.025em] text-white">
              Ktheje biznesin në{" "}
              <span className="font-bold text-accent uppercase">brand.</span>
            </h3>

            {/* Tagline */}
            <div className="footer-reveal mt-5 flex items-center gap-3.5">
              <span className="block h-px w-7 shrink-0 bg-accent/50 self-center" aria-hidden />
              <p className="font-body text-[0.75rem] font-light leading-none text-[#A0A0A0]" style={{ letterSpacing: "1.5px" }}>
                vetëm një klikim larg jush.
              </p>
            </div>
          </div>

          {/* ── Col 2: Navigation — centered ── */}
          <div className="flex flex-col items-start md:items-center md:pt-1">
            <p className="footer-reveal mb-6 text-[10px] uppercase tracking-[0.22em] text-white/25">
              Navigim
            </p>
            <nav className="flex flex-col items-start gap-[14px] md:items-center" aria-label="Footer navigation">
              {[
                { label: "Shërbimet", href: "/sherbimet" },
                { label: "Projektet", href: "/projektet" },
                { label: "Çmimet", href: "/cmimet" },
                { label: "Rreth Nesh", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Kontakt", href: "/contact" },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="footer-reveal footer-link group inline-flex items-center gap-2.5 font-body text-[0.875rem] font-light tracking-[0.05em] text-white/45 transition-colors duration-300 hover:text-white"
                >
                  <span className="block h-px w-0 shrink-0 bg-accent/65 transition-all duration-300 group-hover:w-3.5" aria-hidden />
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* ── Col 3: Kontakt ── */}
          <div className="flex w-full flex-col items-end md:pt-1">

            <p className="footer-reveal mb-6 text-[10px] uppercase tracking-[0.22em] text-white/25">
              Kontakt
            </p>

            {/* Action group — kontakto + whatsapp */}
            <div className="footer-reveal flex flex-col items-end gap-3">
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 font-body text-[0.875rem] font-light tracking-[0.05em] text-accent transition-colors duration-300 hover:text-accentLight"
              >
                Kontakto Tani
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="https://wa.me/355694726827"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-body text-[0.875rem] font-light tracking-[0.05em] text-accent/75 transition-colors duration-300 hover:text-accent"
              >
                WhatsApp
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>

            {/* Email + location */}
            <div className="footer-reveal mt-6 flex flex-col items-end gap-2.5">
              <a
                href="mailto:info@illyrianpixel.com"
                className="footer-link font-body text-[0.875rem] font-light tracking-[0.05em] text-[#A0A0A0] underline-offset-[3px] transition-colors duration-300 hover:text-white hover:[text-decoration:underline]"
              >
                info@illyrianpixel.com
              </a>
              <span className="font-body text-[0.875rem] font-light tracking-[0.05em] text-[#A0A0A0]/60">
                Shqipëri · Gjermani · Online
              </span>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-reveal footer-bottom mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-5 pb-[40px] md:mt-20">
          <p className="font-body text-[12px] font-light tracking-[0.1em] text-white/25">
            © 2026 Illyrian Pixel
          </p>
          <div className="flex items-center gap-6">
            <p
              className="font-mono text-[12px] tabular-nums tracking-[0.08em] text-white/25"
              suppressHydrationWarning
            >
              Tiranë, AL{tiranaTime ? ` · ${tiranaTime}` : ""}
            </p>
            <span className="text-white/10" aria-hidden>·</span>
            <a
              href="/privacy"
              className="footer-link font-body text-[12px] font-light tracking-[0.05em] text-white/[0.38] transition-colors duration-300 hover:text-white"
            >
              Privatësia
            </a>
            <a
              href="/terms"
              className="footer-link font-body text-[12px] font-light tracking-[0.05em] text-white/[0.38] transition-colors duration-300 hover:text-white"
            >
              Kushtet
            </a>
          </div>
          <a
            href="/"
            className="footer-link group inline-flex items-center gap-2 font-body text-[12px] font-light tracking-[0.1em] text-white/25 transition-colors duration-300 hover:text-white"
          >
            Kthehu sipër{" "}
            <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-[2px]">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
