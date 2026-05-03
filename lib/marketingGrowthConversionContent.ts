import {
  conversionTrustStatsDefault,
  conversionWhyUsHeroDefault,
  type ConversionLandingData,
} from "@/lib/conversionLandingShared";

export const marketingConversionLandingData: ConversionLandingData = {
  trustStats: { ...conversionTrustStatsDefault },
  whyUs: {
    ...conversionWhyUsHeroDefault,
    items: [
      {
        icon: "mFocus",
        title: "Ekspertizë e provuar në kanale",
        body: "Fushata dhe struktura të ndërtuara nga vite punë me biznese shqiptare: fokus te kërkesat dhe shitjet, jo te raportet ‘dekoruese’.",
      },
      {
        icon: "mAudience",
        title: "Tregu shqiptar & diaspora",
        body: "Njohje praktike e sjelljes së blerësit vendor dhe atij në diasporë — segmentim dhe mesazhe që respektojnë kontekstin kulturor.",
      },
      {
        icon: "mRoi",
        title: "Transparencë në matje",
        body: "ROI dhe raporte të lexueshme: e dini çfarë financohet, çfarë kthehet dhe cilat vendime janë të mbështetura në të dhëna.",
      },
      {
        icon: "mScale",
        title: "Rritje e qëndrueshme",
        body: "Shkallëzim kur kanalet janë të pjekura — për të ruajtur cilësinë e lead-eve dhe besimin e klientit afatgjatë.",
      },
    ],
  },
  process: [
    {
      step: "01",
      title: "Konsultë & audit",
      desc: "Objektivat, audienca, konkurrenca dhe ku humbet sot trafiku / buxheti.",
    },
    {
      step: "02",
      title: "Strategji kanale",
      desc: "Plan për SEO, Google Ads dhe/ose Meta — përputhur me ofertën dhe kapacitetin tuaj.",
    },
    {
      step: "03",
      title: "Ekzekutim",
      desc: "Vendosim kampanja, përmbajtje dhe landing që mbështesin të njëjtin mesazh.",
    },
    {
      step: "04",
      title: "Optimizim",
      desc: "Lexojmë të dhënat, testojmë variante dhe rrisim ROI me cikle të shkurtra.",
    },
  ],
  portfolioSlugs: ["hauswerk-niederbayern", "esm-group", "suli-group-trockenbau"],
  testimonials: [
    {
      quote:
        "Për herë të parë pamë qartë nga vijnë kërkesat. SEO dhe ads nuk ishin më ‘sqetullë në erë’.",
      name: "Genti R.",
      role: "Shërbime lokale, Tiranë",
    },
    {
      quote:
        "Raportet janë të thjeshta — dimë çfarë po paguajmë dhe çfarë na kthen. Kjo na dha besim të vazhdojmë.",
      name: "Blerta H.",
      role: "E-commerce",
    },
    {
      quote:
        "Na ndihmuan të hyjmë në Google për fjalët që na sjellin klientë, jo vetëm vizitorë.",
      name: "Erion P.",
      role: "B2B & diasporë",
    },
  ],
};
