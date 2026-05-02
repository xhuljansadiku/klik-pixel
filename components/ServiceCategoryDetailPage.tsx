"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { ServiceCategory } from "@/lib/serviceCategories";

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
        stroke="#C89B2E"
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

export default function ServiceCategoryDetailPage({
  category,
}: {
  category: ServiceCategory;
}) {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden bg-bg text-text pt-14 md:pt-16">

        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_0%,rgba(200,155,46,0.09),transparent_48%)]" />
          <div className="absolute right-[-10%] top-[30%] h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-accent/[0.035] blur-[200px]" />
        </div>

        {/* ── HERO ── */}
        <section className="relative z-[1] border-b border-white/[0.07]">
          <div className="section-wrap py-20 md:py-28 lg:py-32">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-[100px] bg-gradient-to-r from-accent/80 to-transparent" />
              <p className="text-[10px] uppercase tracking-[0.32em] text-accent/80">
                {category.title}
              </p>
            </div>

            <h1 className="max-w-4xl font-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.93] tracking-[-0.02em]">
              {category.headline}
            </h1>

            <p className="mt-6 max-w-[56ch] text-[15px] leading-relaxed text-white/58">
              {category.description}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={openModal}
                className="interactive-button ip-cta-primary inline-flex h-11 items-center gap-2 !px-7 !text-[12px] !tracking-[0.04em] !text-[#0e0d0c]"
              >
                Book a Discovery Call
              </button>
              <a href="#cmimet" className="luxury-link">
                Shiko çmimet <span aria-hidden>→</span>
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-2">
              {category.subServices.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1 font-body text-[11px] tracking-[0.02em] text-white/76"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROBLEMS ── */}
        <section className="relative z-[1] border-b border-white/[0.07]">
          <div className="section-wrap py-16 md:py-20">
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent/72">
              What we solve
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.04] tracking-[-0.02em]">
              Problemet e vërteta pas<br className="hidden sm:block" /> çdo projekti.
            </h2>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {category.problems.map((problem, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl border border-white/[0.07] bg-[linear-gradient(160deg,rgba(22,22,22,0.88),rgba(14,13,12,0.96))] p-6 transition-all duration-500 hover:border-accent/18 hover:bg-[linear-gradient(160deg,rgba(200,155,46,0.05),rgba(14,13,12,0.96))]"
                >
                  <p className="font-display text-[2.4rem] leading-none text-white/[0.06] transition-colors duration-500 group-hover:text-accent/22">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-[1.05rem] leading-snug tracking-[-0.01em] text-white/90">
                    {problem.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-white/50">
                    {problem.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="cmimet" className="relative z-[1] border-b border-white/[0.07]">
          <div className="section-wrap py-16 md:py-24">
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent/72">
              Paketët tona
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.04] tracking-[-0.02em]">
              Zgjidhni nivelin e duhur<br className="hidden sm:block" /> për objektivin tuaj.
            </h2>
            <p className="mt-4 max-w-[52ch] text-[13px] leading-relaxed text-white/48">
              Çdo paketë mund të personalizohet. Nëse nuk gjeni atë që kërkoni, na shkruani: ndërtojmë edhe zgjidhje tërësisht të personalizuara.
            </p>

            <div className="mt-12 grid items-stretch gap-4 md:grid-cols-3">
              {category.packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`service-bento-card group relative flex min-h-[480px] flex-col overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.03)] bg-[linear-gradient(160deg,rgba(255,255,255,0.02),rgba(255,255,255,0.005)_52%,rgba(200,155,46,0.04))] p-6 backdrop-blur-[2px] transition-[border-color,box-shadow,opacity] duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:absolute before:inset-y-0 before:left-[-34%] before:z-[2] before:w-[42%] before:-skew-x-12 before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.15),transparent)] before:opacity-0 before:translate-x-[-120%] before:transition-all before:duration-[800ms] before:[transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:before:opacity-25 group-hover:before:translate-x-[120%] animate-[servicesIdleGlow_3.6s_ease-in-out_infinite] hover:[animation-play-state:paused] ${
                    pkg.featured
                      ? "border-accent/35 shadow-[0_25px_80px_rgba(200,155,46,0.25)] hover:shadow-[0_28px_88px_rgba(200,155,46,0.28)]"
                      : "opacity-95 hover:border-accent/35 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(200,155,46,0.15)]"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_8%,rgba(200,155,46,0.065),transparent_62%)] opacity-70 transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[radial-gradient(circle_at_72%_20%,rgba(200,155,46,0.14),transparent_64%)] group-hover:opacity-100" />
                  <div className="relative z-[3] flex flex-1 flex-col">
                    {pkg.featured && (
                      <span className="mb-3 inline-flex w-fit rounded-full bg-accent/14 px-3 py-0.5 text-[9px] uppercase tracking-[0.22em] text-accent/90">
                        Rekomanduar
                      </span>
                    )}

                    <p
                      className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                        pkg.featured ? "text-accent/88" : "text-white/40"
                      }`}
                    >
                      {pkg.name}
                    </p>

                    <div className="mt-3 flex items-end gap-1.5">
                      <p className="font-display text-[clamp(2rem,3.5vw,2.5rem)] leading-none tracking-[-0.02em] text-white">
                        {pkg.price}
                      </p>
                      {pkg.priceNote && (
                        <p className="mb-[3px] text-[13px] text-white/40">
                          {pkg.priceNote}
                        </p>
                      )}
                    </div>

                    <p className="mt-2 text-[12px] leading-relaxed text-white/70">
                      {pkg.ideal}
                    </p>

                    <div className="my-5 h-px bg-white/[0.07]" />

                    <ul className="flex flex-col gap-3">
                      {pkg.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2.5 text-[13px] leading-relaxed text-white/70"
                        >
                          <CheckIcon />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={openModal}
                      className={`mt-auto inline-flex w-full items-center justify-center pt-8 text-[11px] font-medium tracking-[0.06em] ${
                        pkg.featured
                          ? "interactive-button ip-cta-primary !h-10 !py-0 !text-[11px] !tracking-[0.06em] !text-[#0e0d0c]"
                          : "luxury-link"
                      }`}
                    >
                      Book a Discovery Call <span aria-hidden>→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-[11px] text-white/28">
              Të gjitha çmimet janë pa TVSH · Konsultimi fillestar është gjithmonë falas
            </p>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="relative z-[1]">
          <div className="section-wrap py-20 md:py-28 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent/72">
              Hapin tjetër
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[0.95] tracking-[-0.02em]">
              Nisemi me një<br />
              <span className="text-accent">bisedë falas.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[44ch] text-[14px] leading-relaxed text-white/50">
              30 minuta. Pa obligim. Flasim për biznesin tuaj, objektivat dhe si mund të punojmë bashkë.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={openModal}
                className="interactive-button ip-cta-primary ip-cta-primary--lg inline-flex h-12 items-center gap-2 !px-8 !text-[12px] !tracking-[0.04em] !text-[#0e0d0c]"
              >
                Book a Discovery Call →
              </button>
            </div>

            <div className="mt-10">
              <Link
                href="/sherbimet"
                className="text-[11px] uppercase tracking-[0.2em] text-white/30 transition-colors duration-300 hover:text-white/60"
              >
                ← Kthehu te shërbimet
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
