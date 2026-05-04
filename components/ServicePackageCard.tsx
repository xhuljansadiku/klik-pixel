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
        stroke="#ab8339"
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
      className={`svc-price-card service-bento-card group relative flex min-h-[480px] flex-col overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.03)] bg-[linear-gradient(160deg,rgba(255,255,255,0.02),rgba(255,255,255,0.005)_52%,rgba(171, 131, 57,0.04))] p-6 backdrop-blur-[2px] transition-[border-color,box-shadow,transform,opacity] duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:absolute before:inset-y-0 before:left-[-34%] before:z-[2] before:w-[42%] before:-skew-x-12 before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.15),transparent)] before:opacity-0 before:translate-x-[-120%] before:transition-all before:duration-[800ms] before:[transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:before:opacity-25 group-hover:before:translate-x-[120%] animate-[servicesIdleGlow_3.6s_ease-in-out_infinite] hover:[animation-play-state:paused] md:hover:-translate-y-0.5 ${
        pkg.featured
          ? "border-accent/35 shadow-[0_25px_80px_rgba(171, 131, 57,0.25)] hover:shadow-[0_28px_88px_rgba(171, 131, 57,0.28)]"
          : "opacity-95 hover:border-accent/35 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(171, 131, 57,0.15)]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_8%,rgba(171, 131, 57,0.065),transparent_62%)] opacity-70 transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[radial-gradient(circle_at_72%_20%,rgba(171, 131, 57,0.14),transparent_64%)] group-hover:opacity-100" />
      <div className="relative z-[3] flex flex-1 flex-col">
        {pkg.featured && (
          <span className="mb-3 inline-flex w-fit rounded-full bg-accent/14 px-3 py-0.5 text-[9px] uppercase tracking-[0.22em] text-accent/90">
            Rekomanduar
          </span>
        )}

        <p
          className={`font-display text-[1.15rem] font-medium tracking-[0.02em] ${
            pkg.featured ? "text-accent/90" : "text-white/60"
          }`}
        >
          {pkg.name}
        </p>
        {pkg.tagline && (
          <p className="font-ui mt-1.5 text-[11px] font-bold lowercase leading-snug tracking-[1px] text-accent">
            {pkg.tagline}
          </p>
        )}

        <div className="mt-3 flex items-end gap-1.5">
          <p className="font-display text-[clamp(2rem,3.5vw,2.5rem)] font-medium leading-none tracking-[0.02em] text-text">
            {pkg.price}
          </p>
          {pkg.priceNote && (
            <p className="mb-[3px] font-ui text-[13px] text-muted">{pkg.priceNote}</p>
          )}
        </div>

        <p className="font-ui mt-2 text-[12px] font-normal leading-[1.6] text-text">{pkg.ideal}</p>

        <div className="my-5 h-px bg-white/[0.07]" />

        <ul className="flex flex-col gap-3">
          {(pkg.featureBullets ?? []).length > 0
            ? pkg.featureBullets!.map((row) => (
                <li
                  key={row.emphasis + row.detail}
                  className="font-ui flex items-start gap-2.5 text-[13px] font-normal leading-[1.6] text-text"
                >
                  <CheckIcon />
                  <span>
                    <span className="font-semibold text-white/88">{row.emphasis}</span>{" "}
                    <span className="font-light">{row.detail}</span>
                  </span>
                </li>
              ))
            : pkg.features.map((f) => (
                <li
                  key={f}
                  className="font-ui flex items-start gap-2.5 text-[13px] font-normal leading-[1.6] text-text"
                >
                  <CheckIcon />
                  <span className="font-ui font-light">{f}</span>
                </li>
              ))}
        </ul>

        {pkg.featured ? (
          <button
            type="button"
            onClick={openModal}
            className="interactive-button ip-cta-primary mt-auto inline-flex w-full items-center justify-center !h-10 !py-0 !text-[11px] !tracking-[1px] !text-[#0e0d0c]"
          >
            {ctaLabel} <span aria-hidden>→</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={openModal}
            className="mt-auto inline-flex w-full items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.02] px-4 py-2.5 font-ui text-[11px] font-semibold lowercase tracking-[1px] text-text transition-all duration-300 hover:border-accent/35 hover:bg-accent/[0.06] hover:text-white"
          >
            {ctaLabel} <span aria-hidden>→</span>
          </button>
        )}
      </div>
    </div>
  );
}
