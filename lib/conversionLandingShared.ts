import { caseStudies } from "@/lib/caseStudies";

export type WhyUsIcon =
  | "convert"
  | "seo"
  | "speed"
  | "support"
  /** Marketing — minimal feature icons */
  | "mFocus"
  | "mAudience"
  | "mRoi"
  | "mScale"
  /** Branding — minimal feature icons */
  | "bPsyche"
  | "bStory"
  | "bTouch"
  | "bEdge";

export type WhyUsItem = {
  title: string;
  body: string;
  icon: WhyUsIcon;
};

/** Shared trust bar — service conversion pages (counts animate on scroll) */
export type ConversionTrustStats = {
  primaryCount: number;
  primaryLabel: string;
  secondaryCount: number;
  secondaryLabel: string;
  tertiaryCount: number;
  tertiaryLabel: string;
  /** Optional subline under the stats row */
  reachLabel?: string;
};

export const conversionTrustStatsDefault: ConversionTrustStats = {
  primaryCount: 6,
  primaryLabel: "vite përvojë",
  secondaryCount: 100,
  secondaryLabel: "projekte të suksesshme",
  tertiaryCount: 80,
  tertiaryLabel: "klientë besnikë",
};

/** Shared "Pse ne" headline + intro — all service conversion landings */
export const conversionWhyUsHeroDefault = {
  headingBefore: "6 vite përvojë në ndërtimin e sistemeve",
  headingAccent: "që gjenerojnë fitim",
  intro:
    "Prej vitesh punojmë me biznese shqiptare në Shqipëri, në rajon dhe në diasporë — me procese të qarta, komunikim profesional dhe rezultate që mund të verifikohen. Ekspertiza jonë vjen nga përsëritja: projekte të përfunduara, klientë që kthehen dhe sisteme që mbajnë ngarkesën kur biznesi rritet. Zgjedhja për ne është zgjedhje për partneritet të besueshëm, jo për premtime të pamatuara.",
} as const;

export type ConversionLandingData = {
  trustStats: ConversionTrustStats;
  whyUs: {
    headingBefore: string;
    headingAccent: string;
    intro: string;
    items: WhyUsItem[];
  };
  process: readonly { step: string; title: string; desc: string }[];
  /** Optional custom headline for the process section (falls back to generic) */
  processHeadline?: string;
  portfolioSlugs: readonly string[];
  /** Optional per-slug blurb overrides for portfolio cards */
  portfolioBlurbs?: Record<string, string>;
  testimonials: readonly { quote: string; name: string; role: string; location?: string }[];
  /** Optional overrides for the feedback section header (falls back to generic) */
  feedbackLabel?: string;
  feedbackHeadline?: string;
};

export function getPortfolioCardsFromSlugs(slugs: readonly string[]) {
  return slugs
    .map((slug) => {
      const study = caseStudies.find((c) => c.slug === slug);
      if (!study) return null;
      return {
        slug: study.slug,
        title: study.title,
        image: study.heroImage,
        blurb: study.result,
        category: study.category,
      };
    })
    .filter(Boolean) as Array<{
    slug: string;
    title: string;
    image: string;
    blurb: string;
    category: string;
  }>;
}
