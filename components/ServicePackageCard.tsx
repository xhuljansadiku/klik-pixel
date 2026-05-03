"use client";

import type { ServicePackage } from "@/lib/serviceCategories";

function CheckIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-[3px] shrink-0"
    >
      <path
        d="M1.5 6.5L5 10L11.5 3"
        stroke="#D4AF37"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function openModal() {
  window.dispatchEvent(new CustomEvent("open-inquiry-modal"));
}

type Props = {
  pkg: ServicePackage;
  /** Use «Merr ofertë» / outline style matching conversion service pages. */
  conversionCta?: boolean;
};

export default function ServicePackageCard({ pkg, conversionCta = true }: Props) {
  const ctaLabel = conversionCta ? "Merr ofertë" : "Rezervo Tani";

  return (
    <div
      className={`svc-price-card group relative flex flex-col overflow-hidden rounded-[24px] border bg-[linear-gradient(145deg,rgba(20,20,20,1)_0%,rgba(5,5,5,1)_100%)] backdrop-blur-[2px] transition-[border-color,box-shadow,transform,opacity] duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:absolute before:inset-y-0 before:left-[-34%] before:z-[2] before:w-[42%] before:-skew-x-12 before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.12),transparent)] before:opacity-0 before:translate-x-[-120%] before:transition-all before:duration-[800ms] before:[transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:before:opacity-20 group-hover:before:translate-x-[120%] animate-[servicesIdleGlow_3.6s_ease-in-out_infinite] hover:[animation-play-state:paused] md:hover:-translate-y-0.5 ${
        pkg.featured
          ? "min-h-[520px] pt-10 pb-8 px-8 border-[rgba(212,175,55,0.38)] shadow-[inset_0_0_20px_rgba(212,175,55,0.05),0_0_0_1px_rgba(212,175,55,0.18),0_28px_72px_rgba(212,175,55,0.24),0_12px_40px_rgba(0,0,0,0.5)] hover:border-[rgba(212,175,55,0.58)] hover:shadow-[inset_0_0_28px_rgba(212,175,55,0.08),0_0_0_1px_rgba(212,175,55,0.28),0_32px_80px_rgba(212,175,55,0.3),0_16px_48px_rgba(0,0,0,0.55)]"
          : "min-h-[480px] pt-8 pb-6 px-6 border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.5)] hover:shadow-[0_20px_56px_rgba(0,0,0,0.45),0_0_28px_rgba(212,175,55,0.1)]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_8%,rgba(171, 131, 57,0.065),transparent_62%)] opacity-70 transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[radial-gradient(circle_at_72%_20%,rgba(171, 131, 57,0.14),transparent_64%)] group-hover:opacity-100" />
      <div className="relative z-[3] flex flex-1 flex-col">
        {/* Package label — serif 18px, muted silver #A0A0A0 */}
        <p className="mb-3 text-center font-display text-[18px] leading-none tracking-[-0.01em] text-[#A0A0A0]">
          {pkg.name}
        </p>

        {/* Gold hook title — sans-serif 26px bold, uniform */}
        {pkg.tagline && (
          <p className="text-[26px] font-bold leading-[1.15] text-[#D4AF37]">{pkg.tagline}</p>
        )}

        {/* Price — serif, "Nga" baseline-aligned and smaller */}
        <div className="mt-5 flex items-baseline gap-1.5">
          {pkg.price.startsWith("Nga ") && (
            <span className="text-[0.9rem] text-white/50">Nga</span>
          )}
          <span className="font-display text-[clamp(1.6rem,2.8vw,2rem)] leading-none tracking-[-0.02em] text-white">
            {pkg.price.replace("Nga ", "")}
          </span>
          {pkg.priceNote && (
            <span className="text-[13px] text-white/40">{pkg.priceNote}</span>
          )}
        </div>

        <p className="mt-2 text-[13px] leading-relaxed text-[#E0E0E0]/70">{pkg.ideal}</p>

        <div className="my-5 h-px bg-white/[0.07]" />

        <ul className="flex flex-col gap-3">
          {(pkg.featureBullets ?? []).length > 0
            ? pkg.featureBullets!.map((row) => (
                <li
                  key={row.emphasis + row.detail}
                  className="flex items-start gap-2.5 text-[13px] leading-[1.6] text-[#E0E0E0]/80"
                >
                  <CheckIcon />
                  <span>
                    <span className="font-semibold text-[#E0E0E0]">{row.emphasis}</span> {row.detail}
                  </span>
                </li>
              ))
            : pkg.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-[13px] leading-[1.6] text-[#E0E0E0]/80"
                >
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              ))}
        </ul>

        <div className="mt-auto pt-6">
          {pkg.featured ? (
            <button
              type="button"
              onClick={openModal}
              className="interactive-button ip-cta-primary inline-flex h-11 w-full items-center justify-center !py-0 !text-[11px] !tracking-[0.06em] !text-[#0e0d0c] !bg-[#D4AF37] !border-[#D4AF37]"
            >
              {ctaLabel} <span aria-hidden>→</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={openModal}
              className="inline-flex h-11 w-full items-center justify-center rounded-full border border-[#D4AF37] bg-transparent px-4 text-[11px] font-medium tracking-[0.06em] text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37]/[0.08] hover:text-[#D4AF37]"
            >
              {ctaLabel} <span aria-hidden>→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
