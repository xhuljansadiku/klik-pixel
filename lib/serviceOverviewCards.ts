import type { ServiceCardVisualVariant } from "@/components/ServiceCardHeroVisual";

export type ServiceOverviewCard = {
  ordinal: string;
  title: string;
  /** Dy rreshta fiks (pas "&") për kartat ku duhet thyerje e kontrolluar */
  titleLines?: readonly [string, string];
  desc: string;
  href: string;
  cta: string;
  visualVariant: ServiceCardVisualVariant;
};

/** Tre kartat e seksionit kryesor të shërbimeve — të njëjta në homepage dhe /sherbimet */
export const SERVICE_OVERVIEW_CARDS: ServiceOverviewCard[] = [
  {
    ordinal: "01",
    title: "Web & E-Commerce",
    titleLines: ["Web &", "E-Commerce"],
    desc: "Krijojmë website dhe dyqane online të shpejta, të optimizuara për Google (SEO) dhe të ndërtuara për të kthyer vizitorët në klientë.",
    href: "/services/website",
    visualVariant: "web",
    cta: "Shiko sh\u00ebrbimin \u2192"
  },
  {
    ordinal: "02",
    title: "SEO & Reklama",
    titleLines: ["SEO &", "Reklama"],
    desc: "Rrisim klientët tuaj përmes SEO dhe reklamave online (Google Ads & Social Media), duke sjellë trafik cilësor dhe kërkesa reale.",
    href: "/services/marketing-growth",
    visualVariant: "marketing",
    cta: "Shiko sh\u00ebrbimin \u2192"
  },
  {
    ordinal: "03",
    title: "Branding & Content",
    desc: "Ndërtojmë identitet vizual dhe përmbajtje (foto & video) që rrit besimin dhe e bën brandin tuaj të duket profesional.",
    href: "/services/branding-content",
    visualVariant: "branding",
    cta: "Shiko sh\u00ebrbimin \u2192"
  }
];
