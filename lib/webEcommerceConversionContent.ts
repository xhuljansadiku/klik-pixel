import {
  conversionTrustStatsDefault,
  conversionWhyUsHeroDefault,
  type ConversionLandingData,
} from "@/lib/conversionLandingShared";

export const webConversionLandingData: ConversionLandingData = {
  trustStats: { ...conversionTrustStatsDefault },
  whyUs: {
    ...conversionWhyUsHeroDefault,
    items: [
      {
        icon: "convert",
        title: "Ekspertizë e provuar",
        body: "Vite eksperiencë në faqe dhe e-commerce që konvertojnë: strukturë, kopje dhe CTA të testuara në projekte reale për shqiptarë kudo në botë.",
      },
      {
        icon: "seo",
        title: "Arkitekturë që zgjat",
        body: "SEO, shpejtësi dhe meta të ndërtuara për të përballuar rritjen — jo për një ‘lançim të bukur’ që plaket pas pak muajsh.",
      },
      {
        icon: "speed",
        title: "Performancë e matur profesionalisht",
        body: "Core Web Vitals dhe ngarkesa në mobile të optimizuara si për klientët vendorë ashtu edhe për ata që ju gjejnë nga jashtë vendit.",
      },
      {
        icon: "support",
        title: "Partneritet pas lançimit",
        body: "Mbështetje e vazhdueshme, rishikime dhe optimizim — sepse besimi ndërtohet kur ekipi mbetet i pranishëm edhe pas go-live.",
      },
    ],
  },
  process: [
    {
      step: "01",
      title: "Auditim & Strategji",
      desc: "Analizojmë tregun dhe objektivat tuaja për të ndërtuar një rrugëtim unik që garanton kthim investimi (ROI).",
    },
    {
      step: "02",
      title: "Arkitekturë & UX",
      desc: "Përdorim psikologjinë e konvertimit për të krijuar struktura dhe dizajne që jo vetëm duken luksoze, por detyrojnë veprimin e vizitorit.",
    },
    {
      step: "03",
      title: "Zhvillim & SEO",
      desc: "Kodim i shpejtë, i pastër dhe i optimizuar për Google. Sigurojmë që faqja juaj të jetë teknikisht e pamposhtur nga konkurrenca.",
    },
    {
      step: "04",
      title: "Launch & Shkallëzim",
      desc: "Monitorim i vazhdueshëm pas lançimit. Optimizojmë performancën bazuar në të dhëna reale për të rritur shitjet tuaja çdo muaj.",
    },
  ],
  processHeadline: "Metodologji e provuar, rezultate të parashikueshme.",
  portfolioBlurbs: {
    "esm-group": "Arritëm tek klientët e duhur me mesazhin e duhur. Website që detyron bisedën për biznese industriale.",
    "bardhi-wellness": "Transformuam vizitorët e parë në klientë besnikë. Psikologjia e Brandit Personal që funksionon.",
    "hauswerk-niederbayern": "Biznesi lokal zëvendësoi Google Ads me SEO organike. Kontaktet nisin direkt nga faqja.",
  },
  portfolioSlugs: ["esm-group", "bardhi-wellness", "hauswerk-niederbayern"],
  feedbackLabel: "ZËRI I KLIENTËVE",
  feedbackHeadline: "Fjalët e tyre.",
  testimonials: [
    {
      quote:
        "Na ndihmoi shumë mënyra si u organizua përmbajtja e faqes. Klientët e kuptojnë më shpejt çfarë bëjmë dhe bisedat që vijnë janë më konkrete.",
      name: "Mariglent S.",
      role: "ESM Group",
      location: "Costa Volpino, Itali",
    },
    {
      quote:
        "Procesi ishte i qartë nga fillimi në fund. Prezantimi i paketave dhe mesazhi i brandit personal tani duken më profesionalë dhe më të besueshëm.",
      name: "Bardhi U.",
      role: "Bardhi Wellness",
      location: "Prishtinë, Kosovë · Koln, Gjermani",
    },
    {
      quote:
        "Na pëlqeu që faqja u bë e thjeshtë për t'u kuptuar. Vizitorët gjejnë shpejt shërbimin që u duhet dhe kërkesat vijnë më të sakta.",
      name: "Amir S.",
      role: "Hauswerk Niederbayern",
      location: "Straubing, Gjermani",
    },
    {
      quote:
        "Që nga përditësimi i faqes, klientët na kontaktojnë me pritshmëri më të qarta. Projektet dhe vlerësimet e klientëve japin besim që në kontaktin e parë.",
      name: "Vehbi P.",
      role: "Palushi Brothers",
      location: "Londër, Mbretëri e Bashkuar",
    },
  ],
};
