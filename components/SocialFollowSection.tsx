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
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(171, 131, 57,0.06),transparent_45%)]" />
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
