"use client";

import Link from "next/link";
import SectionMark from "@/components/SectionMark";

type GlobalCTAProps = {
  label?: string;
  title?: string;
  body?: string;
  primaryActionText?: string;
  primaryActionHref?: string;
};

export default function GlobalCTA({
  label = "NEXT STEP",
  title = "Gati për hapin tjetër?",
  body = "Rezervo një call dhe kthejmë drejtimin në plan konkret me prioritete të qarta.",
  primaryActionText = "Fillo Bisedën",
  primaryActionHref = "/contact"
}: GlobalCTAProps) {
  return (
    <section className="cinematic-section border-t border-white/[0.08] !min-h-0 py-0 md:!min-h-0">
      <div className="section-wrap py-20 md:py-24">
        <SectionMark label={label} />
        <h2 className="section-title mt-3 max-w-4xl" suppressHydrationWarning>{title}</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/64">{body}</p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link href={primaryActionHref} data-magnetic="true" className="interactive-button ip-cta-primary">
            {primaryActionText}
          </Link>
          <Link href="/contact" className="luxury-link">
            Kontakto Tani <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
