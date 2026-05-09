import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePackageCard from "@/components/ServicePackageCard";
import type { ServicePackage } from "@/lib/serviceCategories";

export const metadata: Metadata = {
  title: "Google Ads për Biznese Shqiptare — Reklama me ROI Real",
  description: "Reklama Google Ads që sjellin klientë, jo vetëm klikime. Setup, optimizim dhe raportim transparent për bizneset shqiptare.",
};

const packages: ServicePackage[] = [
  {
    name: "Starter",
    price: "€120",
    priceNote: "/ muaj",
    tagline: "Reklamat e para me rezultat real",
    ideal: "Setup i plotë dhe fushatë aktive. Klientët ju gjejnë kur kërkojnë shërbimin tuaj.",
    features: [
      "Setup Google Ads (Search)",
      "1 fushatë aktive",
      "Targetim lokal i saktë",
      "Tracking konvertimesh",
      "Raport mujor i qartë",
    ],
    notIncluded: [
      "Remarketing",
      "Display & YouTube Ads",
    ],
    cta: "Fillo projektin",
  },
  {
    name: "Growth",
    price: "€250",
    priceNote: "/ muaj",
    tagline: "Më shumë klientë, buxhet nën kontroll",
    ideal: "2–3 fushata të optimizuara çdo javë. Remarketing që rikthejnë vizitorët si klientë.",
    features: [
      "2–3 fushata aktive (Search + Display)",
      "Remarketing i konfiguruar",
      "Optimizim javor CPA / ROAS",
      "Audienca & targetim i avancuar",
      "Raport 2-javësh + call mujor",
    ],
    notIncluded: [
      "YouTube Ads",
      "Shopping Ads",
    ],
    featured: true,
    cta: "Fillo projektin",
  },
  {
    name: "Pro",
    price: "€400",
    priceNote: "/ muaj",
    tagline: "Sistem i plotë Google Ads",
    ideal: "Të gjitha formatet, A/B testing dhe strategji funnel. Dominoni Google para konkurrencës.",
    features: [
      "Search + Display + YouTube Ads",
      "Shopping Ads (për e-commerce)",
      "A/B testing i reklamave",
      "Optimizim i vazhdueshëm funnel",
      "Raport javor + 2 call mujore",
    ],
    cta: "Fillo projektin",
  },
];

export default function GoogleAdsPage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden bg-bg pb-24 pt-14 text-text md:pb-28 md:pt-16">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_8%_10%,rgba(171,131,57,0.09),transparent_30%)]" />

        {/* Hero */}
        <section className="relative z-[1] overflow-hidden border-b border-white/[0.06] bg-[#070707]">
          <div aria-hidden className="pointer-events-none absolute -left-24 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[#ab8339]/[0.07] blur-[130px]" />
          <div className="section-wrap relative z-[2] py-28 md:py-36">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent/55">GOOGLE ADS · MARKETING</p>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,5vw,3.8rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white">
              Reklama që sjellin klientë,{" "}
              <span className="text-accent">jo vetëm klikime</span>
            </h1>
            <p className="mt-5 max-w-[48ch] text-[1.05rem] leading-[1.6] text-white/60">
              Google Ads me ROI real. Setup, optimizim javor dhe raportim transparent.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="interactive-button ip-cta-primary inline-flex h-11 items-center gap-2 !px-7 !text-[15px] !font-medium !text-[#0e0d0c]">
                Konsultim falas →
              </Link>
              <Link href="/cmimet" className="luxury-link !text-[15px]">
                Të gjitha paketat <span aria-hidden>→</span>
              </Link>
            </div>
            <p className="mt-4 text-[13px] text-white/40">Konsultim falas · Pa detyrim · Rezultate të matshme</p>
          </div>
        </section>

        {/* Packages */}
        <section className="relative z-[1]">
          <div className="section-wrap py-20 md:py-28">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent/55">PAKETAT</p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.06] tracking-[-0.02em] text-white">
              Zgjidhni nivelin e duhur
            </h2>
            <div className="mt-12 grid items-stretch gap-5 md:grid-cols-3">
              {packages.map((pkg) => (
                <ServicePackageCard key={pkg.name} pkg={pkg} />
              ))}
            </div>
            <p className="mt-8 text-center text-[11px] text-white/28">
              Të gjitha çmimet janë pa TVSH · Konsultimi fillestar është gjithmonë falas
            </p>
          </div>
        </section>

        {/* Back link */}
        <div className="section-wrap !pt-0">
          <Link href="/cmimet" className="luxury-link text-[12px]">
            ← Kthehu te të gjitha paketat
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
