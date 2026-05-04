export type WebHeroVariant = {
  headline: string;
  subheadline: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trustLine: string;
  subServices: string[];
};

// ─── VARIANT 1: PREMIUM / LUXURY ───────────────────────────────────────────
// Tone: Exclusive, confident, elegant. Speaks to discerning business owners
// who see digital presence as a strategic asset, not a commodity.
export const heroVariantPremium: WebHeroVariant = {
  headline: "Prezencë dixhitale e klasit të parë, ndërtuar për bizneset që nuk bëjnë kompromise.",
  subheadline:
    "Çdo projekt është një investim strategjik — dizajn i papërsëritshëm, arkitekturë konvertimi dhe autoritet dixhital i ndërtuar për t'u qëndruar.",
  description:
    "Punojmë me biznese selektive që kuptojnë vlerën e prezencës dixhitale të nivelit të lartë. Nëse keni standarde të larta dhe doni një partner që i respekton — jemi gati.",
  ctaPrimary: "Rezervo Konsultimin Privat",
  ctaSecondary: "Zbulo Procesin",
  trustLine: "Konfidencialitet i plotë · Ekzekutim pa kompromis · Angazhim me rezultat",
  subServices: [
    "Dizajn Nivel Botëror",
    "Autoritet i Qëndrueshëm",
    "Arkitekturë Premium",
    "Prezencë Globale",
    "Zgjidhje Ekskluzive",
  ],
};

// ─── VARIANT 2: DIRECT / AGGRESSIVE SALES ──────────────────────────────────
// Tone: Blunt, urgent, loss-aversion-driven. Every second costs them clients.
// Competitor framing, real-time FOMO, hard close.
export const heroVariantAggressive: WebHeroVariant = {
  headline: "Biznesi nuk pret. Por ti po.",
  subheadline:
    "Ne ndërtojmë sistemin dixhital që punon 24/7.",
  description:
    'Çdo muaj pa sistemin e duhur dixhital, humbet para reale, jo "mundësi". Dhjetëra biznese shqiptare nga Tirana, Prishtina si edhe nga diaspora e kthyen faqen e tyre në burim të vazhdueshëm klientësh. Tani radhë jote.',
  ctaPrimary: "Fillo Tani, Pa Kosto",
  ctaSecondary: "Pse Ne?",
  trustLine: "0 kosto · 0 obligim · Strategji reale brenda 24 orësh",
  subServices: [
    "Klientë organikë çdo javë",
    "Dyqan që shet 24/7",
    "3× më shpejt se konkurrenti",
    "Dominon në çdo ekran",
    "Ndërtim 100% Custom",
  ],
};

// ─── VARIANT 3: MINIMAL / APPLE-STYLE ──────────────────────────────────────
// Tone: Spare, precise, confident silence. Every word earns its place.
// No urgency tactics — just quiet authority and clarity of purpose.
export const heroVariantMinimal: WebHeroVariant = {
  headline: "Faqja e përsosur nuk ekziston, deri sa e ndërtojmë ne.",
  subheadline: "Precizion. Performancë. Rezultate të matshme.",
  description:
    "Ndërtojmë sisteme dixhitale të pastra, të shpejta dhe efektive — pa zhurmë, pa tepri. Vetëm ato që punojnë.",
  ctaPrimary: "Fillo Projektin",
  ctaSecondary: "Shiko Punën",
  trustLine: "Konsultim falas · Transparencë totale · Pa obligim",
  subServices: [
    "Web i qartë & i shpejtë",
    "E-Commerce i pastër",
    "SEO i fokusuar",
    "Mobile e natyrshme",
    "Custom & Minimal",
  ],
};

// ─── ACTIVE VARIANT ─────────────────────────────────────────────────────────
// Change this one line to switch the hero between all three variants.
export const activeWebHeroVariant: WebHeroVariant = heroVariantAggressive;
