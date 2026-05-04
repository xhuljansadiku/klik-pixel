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
    desc: "Zhvillim website dhe dyqane online (E-commerce) të optimizuara për SEO, shpejtësi maksimale dhe konvertim klientësh.",
    href: "/services/website",
    visualVariant: "web",
    cta: "LEXO M\u00cb SHUM\u00cb"
  },
  {
    ordinal: "02",
    title: "Marketing & Growth",
    titleLines: ["Marketing &", "Growth"],
    desc: "Rrisim biznesin tuaj me SEO, reklama dhe strategji digjitale të fokusuara që sjellin trafik cilësor dhe kërkesa reale.",
    href: "/services/marketing-growth",
    visualVariant: "marketing",
    cta: "LEXO M\u00cb SHUM\u00cb"
  },
  {
    ordinal: "03",
    title: "Branding & Content",
    desc: "Krijojmë identitet vizual, fotografi dhe përmbajtje që e bëjnë brandin tuaj profesional dhe të besueshëm.",
    href: "/services/branding-content",
    visualVariant: "branding",
    cta: "LEXO M\u00cb SHUM\u00cb"
  }
];
