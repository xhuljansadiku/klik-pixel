"use client";

import Link from "next/link";
import SectionMark from "@/components/SectionMark";

export default function CalendlyBooking() {
  return (
    <section id="booking" className="cinematic-section border-t border-white/[0.08] !min-h-0 py-0 md:!min-h-0">
      <div className="section-wrap py-20 md:py-24">
        <SectionMark label="BOOKING" />
        <h2 className="section-title mt-3 max-w-4xl">Rezervo një call strategjik.</h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/62">
          20 minuta për të vlerësuar nevojën, ritmin dhe hapat e parë pa humbur kohë.
        </p>
        <Link href="/contact" data-magnetic="true" className="interactive-button ip-cta-primary mt-7">
          Fillo Bisedën
        </Link>
      </div>
    </section>
  );
}
