"use client";

import SectionMark from "@/components/SectionMark";
import { SOCIAL_LINKS, type SocialIconId } from "@/lib/socialLinks";

const iconBoxClass = "h-14 w-14 shrink-0 sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem]";

function BrandSocialGlyph({ icon, className }: { icon: SocialIconId; className?: string }) {
  const cn = `${iconBoxClass} ${className ?? ""}`.trim();
  if (icon === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className={`${cn} fill-none stroke-current stroke-[1.65]`}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (icon === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" className={`${cn} fill-current`}>
        <path d="M15 3h2.2c.5 2 1.8 3.4 3.8 3.8V9a7.2 7.2 0 0 1-4-1.2v6.9a5.7 5.7 0 1 1-5.7-5.7h.2v2.3h-.2a3.4 3.4 0 1 0 3.4 3.4V3z" />
      </svg>
    );
  }
  if (icon === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className={`${cn} fill-current`}>
        <path d="M13.5 21v-8h2.8l.4-3.1h-3.2V7.8c0-.9.3-1.6 1.6-1.6h1.7V3.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.3v2.3H8V13h2.7v8h2.8z" />
      </svg>
    );
  }
  if (icon === "threads") {
    return (
      <svg viewBox="0 0 24 24" className={`${cn} fill-current`}>
        <path d="M12 2.2C6.6 2.2 3 5.8 3 11.2c0 5.8 3.7 10.6 9 10.6 4.7 0 8.2-2.6 8.2-6.6 0-3.2-2.4-5.1-5.8-5.1h-.6c-.1-.7-.5-1.3-1.8-1.3-1.1 0-1.8.5-2.4 1.3l-2-1.3c1-1.7 2.6-2.8 4.6-2.8 2.8 0 4.5 1.5 4.9 4.2 1.9.3 3.9 1.8 3.9 4.8 0 4.9-4.2 8.6-10 8.6-5.8 0-10-4.2-10-11.4C1 5 5.7 1 12 1c3.1 0 5.5.9 7.2 2.8l-1.8 1.7C16 3.9 14.2 3.2 12 3.2z" />
      </svg>
    );
  }
  if (icon === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className={`${cn} fill-current`}>
        <path d="M6 8.5A1.5 1.5 0 1 1 6 5.5a1.5 1.5 0 0 1 0 3zm-1.3 13V10.2h2.6v11.3H4.7zM10 10.2h2.5v1.5h.1c.5-.9 1.7-1.8 3.5-1.8 3 0 4 2 4 4.7v6.9h-2.6v-6.1c0-1.5 0-3.4-2-3.4s-2.4 1.6-2.4 3.3v6.2H10V10.2z" />
      </svg>
    );
  }
  return null;
}

function brandTile(icon: SocialIconId): { wrap: string; glyph: string } {
  switch (icon) {
    case "instagram":
      return {
        wrap: "bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-[0_12px_40px_rgba(225,48,108,0.35)]",
        glyph: "text-white"
      };
    case "tiktok":
      return {
        wrap: "bg-black shadow-[0_12px_40px_rgba(255,255,255,0.08)] ring-1 ring-inset ring-white/15",
        glyph: "text-white"
      };
    case "facebook":
      return {
        wrap: "bg-[#1877F2] text-white shadow-[0_12px_40px_rgba(24,119,242,0.35)]",
        glyph: "text-white"
      };
    case "threads":
      return {
        wrap: "bg-white text-[#0A0A0A] shadow-[0_12px_40px_rgba(255,255,255,0.12)]",
        glyph: "text-[#0A0A0A]"
      };
    case "linkedin":
      return {
        wrap: "bg-[#0A66C2] text-white shadow-[0_12px_40px_rgba(10,102,194,0.35)]",
        glyph: "text-white"
      };
  }
}

export default function SocialFollowSection() {
  return (
    <section
      id="social-follow"
      className="cinematic-section section-tone-about relative overflow-hidden border-t border-white/[0.08] !min-h-0 py-0 md:!min-h-0"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(200,155,46,0.06),transparent_45%)]" />
      <div className="section-wrap relative py-16 md:py-24">
        <SectionMark label="RRJETET SOCIALE" />
        <h2 className="section-title mt-3 max-w-3xl text-white">Na ndiqni në rrjetet tona sociale.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/62 md:text-base">
          Përmbajtje, punë në proces dhe lajme, aty ku jemi më aktivë.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:mt-12 md:grid-cols-5 md:gap-6">
          {SOCIAL_LINKS.map((item) => {
            const { wrap, glyph } = brandTile(item.icon);
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="group flex flex-col items-center gap-4 rounded-[1.25rem] border border-white/[0.07] bg-white/[0.03] p-5 transition-[transform,border-color,background-color,box-shadow] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/[0.06] hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] md:p-7"
              >
                <div
                  className={`flex items-center justify-center rounded-2xl p-4 transition-transform duration-300 group-hover:scale-[1.04] md:p-5 ${wrap}`}
                >
                  <BrandSocialGlyph icon={item.icon} className={glyph} />
                </div>
                <span className="font-display text-[0.95rem] tracking-[0.06em] text-white/88 md:text-[1.05rem]">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
