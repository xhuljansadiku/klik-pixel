"use client";

import { useId } from "react";

export type ServiceCardVisualVariant = "web" | "marketing" | "branding";

const GOLD = "#D4AF37";
const FROST = "rgba(255,255,255,0.42)";
const FROST_SOFT = "rgba(255,255,255,0.18)";

type Props = {
  variant: ServiceCardVisualVariant;
};

export default function ServiceCardHeroVisual({ variant }: Props) {
  const raw = useId().replace(/:/g, "");
  const i = (s: string) => `${raw}-${s}`;

  const wrap =
    "pointer-events-none relative mx-auto flex h-[168px] w-full max-w-[260px] shrink-0 select-none items-center justify-center motion-safe:animate-[serviceCardFloat_4.8s_ease-in-out_infinite] transition-[filter] duration-500 ease-out group-hover:[filter:drop-shadow(0_0_22px_rgba(212,175,55,0.5))_drop-shadow(0_0_48px_rgba(212,175,55,0.22))] motion-reduce:animate-none motion-reduce:group-hover:filter-none md:h-[184px] md:max-w-[280px]";

  if (variant === "web") {
    return (
      <div className={wrap} aria-hidden>
        <svg viewBox="0 0 240 200" className="h-full w-full overflow-visible" fill="none">
          <defs>
            <linearGradient id={i("web-gold")} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={GOLD} stopOpacity="0.95" />
              <stop offset="100%" stopColor={GOLD} stopOpacity="0.35" />
            </linearGradient>
            <pattern id={i("web-grid")} width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" stroke={FROST_SOFT} strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect
            x="24"
            y="36"
            width="192"
            height="128"
            fill={`url(#${i("web-grid")})`}
            className="motion-safe:animate-[serviceWebGridBreathe_5s_ease-in-out_infinite] motion-reduce:animate-none"
            opacity="0.85"
          />
          <g
            className="motion-safe:origin-[120px_100px] motion-safe:animate-[serviceWebWireTilt_18s_ease-in-out_infinite] motion-reduce:animate-none"
            style={{ transformBox: "fill-box" as const }}
          >
            <path
              d="M120 48 L188 88 L188 136 L120 176 L52 136 L52 88 Z"
              stroke={`url(#${i("web-gold")})`}
              strokeWidth="1.15"
              strokeLinejoin="round"
              opacity="0.9"
            />
            <path d="M120 48 L120 96 M52 88 L120 96 M188 88 L120 96" stroke={FROST} strokeWidth="0.9" opacity="0.75" />
            <path d="M120 96 L120 176" stroke={FROST} strokeWidth="0.75" strokeDasharray="4 5" opacity="0.55" />
            <path d="M120 96 L72 118 M120 96 L168 118" stroke={GOLD} strokeWidth="0.65" strokeOpacity="0.45" />
            <path
              d="M72 118 L120 140 L168 118"
              stroke={GOLD}
              strokeWidth="0.55"
              strokeOpacity="0.35"
              strokeDasharray="3 4"
            />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === "marketing") {
    return (
      <div className={wrap} aria-hidden>
        <svg viewBox="0 0 240 200" className="h-full w-full overflow-visible" fill="none">
          <defs>
            <radialGradient id={i("mkt-a")} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={GOLD} stopOpacity="0.35" />
              <stop offset="70%" stopColor={GOLD} stopOpacity="0" />
            </radialGradient>
            <radialGradient id={i("mkt-b")} cx="50%" cy="50%" r="45%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            <filter id={i("mkt-glow")} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g transform="translate(120,112)">
            <ellipse
              rx="72"
              ry="52"
              fill={`url(#${i("mkt-a")})`}
              className="motion-safe:animate-[serviceMarketingPulse_2.8s_ease-in-out_infinite] motion-reduce:animate-none [transform-box:fill-box] [transform-origin:center]"
            />
            <ellipse
              rx="48"
              ry="34"
              fill={`url(#${i("mkt-b")})`}
              className="motion-safe:animate-[serviceMarketingPulse_3.4s_ease-in-out_infinite] motion-reduce:animate-none [transform-box:fill-box] [transform-origin:center] opacity-80 motion-safe:[animation-direction:reverse]"
            />
          </g>
          <g filter={`url(#${i("mkt-glow")})`}>
            <path
              d="M88 138 L120 58 L152 138 M104 112 L136 112"
              stroke={GOLD}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-[stroke-opacity] duration-300 group-hover:stroke-opacity-100"
              strokeOpacity="0.92"
            />
            <path d="M120 58 L148 78" stroke={FROST} strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
          </g>
          <path
            d="M156 72 L188 56 L172 88 Z"
            fill={GOLD}
            fillOpacity="0.2"
            stroke={GOLD}
            strokeWidth="0.8"
            strokeOpacity="0.5"
            className="motion-safe:animate-[serviceCardFloat_3.2s_ease-in-out_infinite] motion-reduce:animate-none [animation-delay:-0.6s]"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={wrap} aria-hidden>
      <svg viewBox="0 0 240 200" className="h-full w-full overflow-visible" fill="none">
        <defs>
          <radialGradient id={i("brand-flare")} cx="42%" cy="38%" r="55%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="35%" stopColor={GOLD} stopOpacity="0.22" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <linearGradient id={i("brand-ring")} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.75" />
            <stop offset="100%" stopColor={FROST} stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <circle cx="118" cy="100" r="62" fill={`url(#${i("brand-flare")})`} opacity="0.9" />
        <g
          className="motion-safe:origin-[118px_100px] motion-safe:animate-[serviceBrandingRotate_22s_linear_infinite] motion-reduce:animate-none"
          style={{ transformBox: "fill-box" as const }}
        >
          <ellipse
            cx="118"
            cy="100"
            rx="56"
            ry="36"
            stroke={`url(#${i("brand-ring")})`}
            strokeWidth="1"
            strokeDasharray="10 14"
            fill="none"
            opacity="0.85"
          />
          <ellipse cx="118" cy="100" rx="38" ry="24" stroke={FROST} strokeWidth="0.6" fill="none" opacity="0.5" />
        </g>
        <g
          stroke={GOLD}
          strokeLinecap="round"
          strokeWidth="0.9"
          opacity="0.35"
          className="motion-safe:origin-[118px_100px] motion-safe:animate-[serviceBrandingRotate_28s_linear_infinite_reverse] motion-reduce:animate-none"
          style={{ transformBox: "fill-box" as const }}
        >
          <line x1="118" y1="100" x2="188" y2="62" />
          <line x1="118" y1="100" x2="196" y2="108" />
          <line x1="118" y1="100" x2="172" y2="146" />
        </g>
        <circle cx="118" cy="100" r="5" fill={GOLD} fillOpacity="0.55" />
        <circle cx="132" cy="86" r="14" fill="rgba(255,255,255,0.12)" />
      </svg>
    </div>
  );
}
