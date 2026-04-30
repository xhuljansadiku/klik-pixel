export type ServiceCategory = {
  slug: "web-ecommerce" | "marketing-growth" | "branding-content";
  title: string;
  headline: string;
  short: string;
  description: string;
  icon: string;
  subServices: string[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "web-ecommerce",
    title: "Web & E-Commerce",
    headline: "Ndërtojmë prani digjitale që shet, jo vetëm që duket bukur.",
    short: "Website dhe dyqane online premium për konvertim real.",
    description:
      "Ndërtojmë website dhe dyqane online që duken premium, ngarkohen shpejt dhe kthejnë vizitorët në klientë.",
    icon: "◈",
    subServices: ["Website Development", "E-commerce", "Maintenance", "UX/UI", "Performance optimization"]
  },
  {
    slug: "marketing-growth",
    title: "Marketing & Growth",
    headline: "Rritje e matshme me trafik cilësor dhe kërkesa reale.",
    short: "SEO, ads dhe strategji që sjellin klientë të duhur.",
    description:
      "Rrisim biznesin tuaj me SEO, reklama dhe strategji digjitale që sjellin trafik cilësor dhe kërkesa reale.",
    icon: "◉",
    subServices: ["SEO", "Google Ads", "Meta Ads", "Social Media Marketing", "Strategy", "Conversion optimization"]
  },
  {
    slug: "branding-content",
    title: "Branding & Content",
    headline: "Identitet dhe përmbajtje që e bëjnë markën të paharrueshme.",
    short: "Branding, fotografi dhe krijim përmbajtjeje me standard premium.",
    description:
      "Krijojmë identitet vizual, fotografi dhe përmbajtje që e bëjnë brandin tuaj të duket profesional dhe i besueshëm.",
    icon: "◆",
    subServices: ["Branding", "Photography", "Content creation", "Visual identity", "Social media visuals"]
  }
];

export const serviceCategoryBySlug = (slug: string) => serviceCategories.find((item) => item.slug === slug);
