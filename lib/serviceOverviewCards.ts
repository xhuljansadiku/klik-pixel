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

/** 3 karta — homepage */
export const SERVICE_OVERVIEW_CARDS: ServiceOverviewCard[] = [
  {
    ordinal: "01",
    title: "Web & E-Commerce",
    desc: "Krijojmë website dhe dyqane online të shpejta, të optimizuara për Google (SEO) dhe të ndërtuara për të kthyer vizitorët në klientë.",
    href: "/services/website",
    visualVariant: "web",
    cta: "Shiko shërbimin →"
  },
  {
    ordinal: "02",
    title: "SEO & Reklama",
    desc: "Rrisim klientët tuaj përmes SEO dhe reklamave online (Google Ads & Social Media), duke sjellë trafik cilësor dhe kërkesa reale.",
    href: "/services/marketing-growth",
    visualVariant: "marketing",
    cta: "Shiko shërbimin →"
  },
  {
    ordinal: "03",
    title: "Branding & Content",
    desc: "Ndërtojmë identitet vizual dhe përmbajtje (foto & video) që rrit besimin dhe e bën brandin tuaj të duket profesional.",
    href: "/services/branding-content",
    visualVariant: "branding",
    cta: "Shiko shërbimin →"
  }
];

/** 6 karta — faqja /sherbimet */
export const SHERBIMET_PAGE_CARDS: ServiceOverviewCard[] = [
  {
    ordinal: "01",
    title: "Website Premium",
    desc: "Website profesionale, të shpejta dhe të optimizuara për Google — të ndërtuara për të kthyer vizitorët në klientë realë.",
    href: "/services/website",
    visualVariant: "web",
    cta: "Shiko shërbimin →"
  },
  {
    ordinal: "02",
    title: "E-Commerce",
    desc: "Dyqane online që shesin 24/7 — me checkout të optimizuar, integrime pagese dhe analitikë të shitjeve.",
    href: "/services/ecommerce",
    visualVariant: "ecommerce",
    cta: "Shiko shërbimin →"
  },
  {
    ordinal: "03",
    title: "SEO & Reklama",
    desc: "Rrisim klientët tuaj përmes SEO dhe reklamave online (Google Ads & Meta), duke sjellë trafik cilësor dhe kërkesa reale.",
    href: "/services/marketing-growth",
    visualVariant: "marketing",
    cta: "Shiko shërbimin →"
  },
  {
    ordinal: "04",
    title: "Social Media",
    desc: "Menaxhojmë prezencën tuaj në Instagram, Facebook dhe TikTok me përmbajtje që angazhon dhe konverton.",
    href: "/services/smm",
    visualVariant: "smm",
    cta: "Shiko shërbimin →"
  },
  {
    ordinal: "05",
    title: "Branding & Content",
    desc: "Ndërtojmë identitet vizual dhe përmbajtje (foto & video) që rrit besimin dhe e bën brandin tuaj të duket profesional.",
    href: "/services/branding-content",
    visualVariant: "branding",
    cta: "Shiko shërbimin →"
  },
  {
    ordinal: "06",
    title: "Mirëmbajtja",
    desc: "Mbajmë website-in tuaj të shpejtë, të sigurt dhe të azhurnuar — me monitorim 24/7 dhe support prioritar.",
    href: "/contact",
    visualVariant: "maintenance",
    cta: "Shiko shërbimin →"
  }
];
