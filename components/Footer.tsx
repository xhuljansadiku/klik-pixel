 "use client";

import { useRef } from "react";
import Image from "next/image";
import { ensureGSAP, useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/gsap";

const socials = [
  { href: "https://www.instagram.com/illyrianpixel/", label: "Instagram", icon: "instagram" },
  { href: "https://www.tiktok.com/@illyrianpixel", label: "TikTok", icon: "tiktok" },
  { href: "https://www.facebook.com/illyrianpixel", label: "Facebook", icon: "facebook" },
  { href: "https://www.threads.net/@illyrianpixel", label: "Threads", icon: "threads" },
  { href: "https://www.linkedin.com/company/illyrian-pixel/", label: "LinkedIn", icon: "linkedin" },
  {
    href: "https://wa.me/355694726827?text=P%C3%ABrsh%C3%ABndetje%2C%20dua%20t%C3%AB%20flas%20p%C3%ABr%20nj%C3%AB%20projekt%20me%20Illyrian%20Pixel.",
    label: "WhatsApp",
    icon: "whatsapp"
  },
  { href: "https://www.youtube.com/@illyrianpixel", label: "YouTube", icon: "youtube" },
  { href: "https://x.com/illyrianpixel", label: "X", icon: "x" }
] as const;

function SocialIcon({ icon }: { icon: (typeof socials)[number]["icon"] }) {
  if (icon === "instagram") {
    return <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.8]"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
  }
  if (icon === "tiktok") {
    return <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M15 3h2.2c.5 2 1.8 3.4 3.8 3.8V9a7.2 7.2 0 0 1-4-1.2v6.9a5.7 5.7 0 1 1-5.7-5.7h.2v2.3h-.2a3.4 3.4 0 1 0 3.4 3.4V3z" /></svg>;
  }
  if (icon === "facebook") {
    return <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M13.5 21v-8h2.8l.4-3.1h-3.2V7.8c0-.9.3-1.6 1.6-1.6h1.7V3.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.3v2.3H8V13h2.7v8h2.8z" /></svg>;
  }
  if (icon === "threads") {
    return <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12 2.2C6.6 2.2 3 5.8 3 11.2c0 5.8 3.7 10.6 9 10.6 4.7 0 8.2-2.6 8.2-6.6 0-3.2-2.4-5.1-5.8-5.1h-.6c-.1-.7-.5-1.3-1.8-1.3-1.1 0-1.8.5-2.4 1.3l-2-1.3c1-1.7 2.6-2.8 4.6-2.8 2.8 0 4.5 1.5 4.9 4.2 1.9.3 3.9 1.8 3.9 4.8 0 4.9-4.2 8.6-10 8.6-5.8 0-10-4.2-10-11.4C1 5 5.7 1 12 1c3.1 0 5.5.9 7.2 2.8l-1.8 1.7C16 3.9 14.2 3.2 12 3.2z" /></svg>;
  }
  if (icon === "linkedin") {
    return <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M6 8.5A1.5 1.5 0 1 1 6 5.5a1.5 1.5 0 0 1 0 3zm-1.3 13V10.2h2.6v11.3H4.7zM10 10.2h2.5v1.5h.1c.5-.9 1.7-1.8 3.5-1.8 3 0 4 2 4 4.7v6.9h-2.6v-6.1c0-1.5 0-3.4-2-3.4s-2.4 1.6-2.4 3.3v6.2H10V10.2z" /></svg>;
  }
  if (icon === "whatsapp") {
    return <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3zm4.7 12.6c-.2.5-1.2 1-1.7 1-.5.1-1.1.1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.7-1.2-4.5-4-4.7-4.3-.2-.3-1.1-1.4-1.1-2.6s.6-1.8.8-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .5.4l.8 1.9c.1.2.1.4 0 .6l-.3.5c-.1.1-.2.3 0 .5.2.3.7 1.1 1.6 1.7 1 .9 1.8 1.2 2.1 1.4.2.1.4.1.5-.1l.8-.9c.1-.2.3-.2.5-.1l1.9.9c.2.1.4.2.4.3 0 .2 0 .9-.2 1.4z" /></svg>;
  }
  if (icon === "youtube") {
    return <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M21.6 8.3a2.8 2.8 0 0 0-2-2c-1.8-.5-7.6-.5-7.6-.5s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2C2 10.2 2 12 2 12s0 1.8.4 3.7a2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2c.4-1.9.4-3.7.4-3.7s0-1.8-.4-3.7zM10 15.2V8.8L15.5 12 10 15.2z" /></svg>;
  }
  return <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M4 4h3.3L12 10l4.6-6H20l-6.3 8.2L20.5 20h-3.4L12 13.3 6.9 20H3.5l6.9-8.8L4 4z" /></svg>;
}

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const socialRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const reducedMotion = useReducedMotion();

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

      if (!reducedMotion && typeof window !== "undefined" && window.matchMedia("(min-width: 769px)").matches) {
        const cleanups: Array<() => void> = [];
        socialRefs.current.forEach((icon) => {
          if (!icon) return;
          let rafId = 0;
          let hovering = false;
          let tx = 0;
          let ty = 0;
          let ts = 1;
          let cx = 0;
          let cy = 0;
          let cs = 1;

          const tick = () => {
            cx += (tx - cx) * 0.16;
            cy += (ty - cy) * 0.16;
            cs += (ts - cs) * 0.16;
            icon.style.transform = `translate3d(${cx}px, ${cy}px, 0) scale(${cs})`;
            if (!hovering && Math.abs(cx) < 0.2 && Math.abs(cy) < 0.2 && Math.abs(cs - 1) < 0.01) {
              icon.style.transform = "translate3d(0px, 0px, 0) scale(1)";
              rafId = 0;
              return;
            }
            rafId = window.requestAnimationFrame(tick);
          };

          const onEnter = () => {
            hovering = true;
            ts = 1.08;
            if (!rafId) rafId = window.requestAnimationFrame(tick);
          };

          const onMove = (event: PointerEvent) => {
            const rect = icon.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width - 0.5;
            const py = (event.clientY - rect.top) / rect.height - 0.5;
            tx = Math.max(-8, Math.min(8, px * 14));
            ty = Math.max(-8, Math.min(8, py * 14 - 3));
            ts = 1.08;
            if (!rafId) rafId = window.requestAnimationFrame(tick);
          };

          const onLeave = () => {
            hovering = false;
            tx = 0;
            ty = 0;
            ts = 1;
            if (!rafId) rafId = window.requestAnimationFrame(tick);
          };

          icon.addEventListener("pointerenter", onEnter);
          icon.addEventListener("pointermove", onMove);
          icon.addEventListener("pointerleave", onLeave);
          cleanups.push(() => {
            icon.removeEventListener("pointerenter", onEnter);
            icon.removeEventListener("pointermove", onMove);
            icon.removeEventListener("pointerleave", onLeave);
            if (rafId) window.cancelAnimationFrame(rafId);
          });
        });

        return () => cleanups.forEach((dispose) => dispose());
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
          background: "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(212,175,55,0.16), transparent 38%)"
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(200,155,46,0.08),transparent_52%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]">
        <Image src="/images/illyrian-pixel-logo.png" alt="" width={460} height={460} className="h-auto w-[240px] md:w-[360px]" />
      </div>

      <div className="section-wrap relative py-20 md:py-[120px]">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-[60px]">
          <div>
            <p className="footer-reveal footer-label text-[11px] uppercase tracking-[0.18em] text-accent/60">
              ILLYRIAN PIXEL
            </p>
            <h3 className="footer-reveal hero-headline-trigger cadence-title font-display relative mt-4 max-w-[12ch] text-[clamp(2.55rem,7.8vw,6.9rem)] leading-[0.95] tracking-[0.01em] text-white">
              Ktheje biznesin në <span className="text-accent">brand</span>
            </h3>
            <p className="footer-reveal cadence-body mt-5 max-w-2xl text-[1.2rem] font-medium leading-[1.5] tracking-[0.01em] text-white/78 md:text-[1.34rem] md:leading-[1.45]">
              Nga klikimi te klienti 🚀
            </p>
          </div>

          <div className="footer-reveal md:justify-self-end">
            <a
              href="/contact"
              data-magnetic="true"
              className="footer-main-cta group inline-flex items-center gap-2 rounded-full border border-accent/70 bg-[linear-gradient(90deg,#d4af37,#f5d97a)] px-7 py-3.5 text-[13px] tracking-[0.08em] text-black transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_10px_30px_rgba(212,175,55,0.25)]"
            >
              Rezervo thirrjen <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <div className="mt-8 space-y-2 text-sm text-white/68">
              <a href="mailto:info@illyrianpixel.com" className="footer-link block">info@illyrianpixel.com</a>
              <p>Shqipëri • Gjermani • Online</p>
            </div>
            <div className="mt-5 grid grid-cols-4 gap-2" aria-label="Rrjetet sociale">
              {socials.map((item, idx) => (
                <a
                  key={item.label}
                  href={item.href}
                  ref={(node) => {
                    socialRefs.current[idx] = node;
                  }}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={item.label}
                  className={`group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-transparent text-white/80 opacity-90 will-change-transform transition-[color,border-color,box-shadow,opacity,background-color] duration-300 ${
                    item.icon === "instagram"
                      ? "hover:opacity-100 hover:border-[#E1306C] hover:text-[#E1306C] hover:bg-[rgba(225,48,108,0.08)] hover:shadow-[0_0_16px_rgba(225,48,108,0.32)]"
                      : item.icon === "facebook"
                        ? "hover:opacity-100 hover:border-[#1877F2] hover:text-[#1877F2] hover:bg-[rgba(24,119,242,0.08)] hover:shadow-[0_0_16px_rgba(24,119,242,0.32)]"
                        : item.icon === "tiktok"
                          ? "hover:opacity-100 hover:border-white/90 hover:text-white hover:bg-white/[0.08] hover:shadow-[0_0_16px_rgba(255,255,255,0.22)]"
                          : item.icon === "linkedin"
                            ? "hover:opacity-100 hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-[rgba(10,102,194,0.08)] hover:shadow-[0_0_16px_rgba(10,102,194,0.32)]"
                            : item.icon === "youtube"
                              ? "hover:opacity-100 hover:border-[#FF0000] hover:text-[#FF0000] hover:bg-[rgba(255,0,0,0.08)] hover:shadow-[0_0_16px_rgba(255,0,0,0.3)]"
                              : item.icon === "whatsapp"
                                ? "hover:opacity-100 hover:border-[#25D366] hover:text-[#25D366] hover:bg-[rgba(37,211,102,0.08)] hover:shadow-[0_0_16px_rgba(37,211,102,0.32)]"
                                : "hover:opacity-100 hover:border-white/90 hover:text-white hover:bg-white/[0.08] hover:shadow-[0_0_16px_rgba(255,255,255,0.22)]"
                  }`}
                >
                  <SocialIcon icon={item.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-reveal footer-bottom mt-16 flex items-center justify-between border-t border-white/10 pt-5 text-[12px] text-white/50 md:mt-20">
          <p>© 2026 Illyrian Pixel</p>
          <a href="/" className="footer-link group inline-flex items-center gap-2">
            Kthehu sipër <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-[2px]">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
