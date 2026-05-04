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
        title: "01. Përvojë",
        body: "Me vite eksperiencë në zhvillimin e uebsajteve dhe E-Commerce, ekipi ynë përcakton në mënyrë të saktë nevojat dhe kërkesat e klientit që në takimin e parë.",
      },
      {
        icon: "seo",
        title: "02. Arkitekturë",
        body: "Implementimi i SEO, optimizimi i shpejtësisë, si dhe përdorimi i metave funksionale sigurojnë që faqet tona mbështesin rritjen afatgjatë, duke shmangur zgjidhjet të cilat humbasin vlerën brenda një kohe të shkurtër.",
      },
      {
        icon: "speed",
        title: "03. Performancë",
        body: "Optimizimi i Core Web Vitals dhe ngarkesa efikase në pajisje mobile ofrohen si për klientët vendas ashtu edhe për ata ndërkombëtarë.",
      },
      {
        icon: "support",
        title: "04. Partneritet",
        body: "Ofrojmë mbështetje të vazhdueshme, rishikime sistematike dhe optimizime të dedikuara, duke ndërtuar besim përmes pranisë së ekipit edhe pas publikimit të projektit.",
      },
    ],
  },
  process: [
    {
      step: "1",
      title: "Analizë & Hartim Strategjie",
      desc: "Realizojmë një vlerësim të plotë të tregut dhe synimeve për të ndërtuar një strategji të veçantë, e cila maksimizon përfitimin nga investimi.",
    },
    {
      step: "2",
      title: "Struktura & UX",
      desc: "Përdorim teknika të psikologjisë së konvertimit për të dizajnuar modele që ofrojnë eksperienca të veçanta për vizitorët dhe nxisin angazhimin e tyre.",
    },
    {
      step: "3",
      title: "Zhvillim & Optimizim SEO",
      desc: "Krijojmë faqe me kod të pastër, efikas dhe të përshtatur për motorët e kërkimit, duke siguruar avantazh teknik ndaj rivalëve.",
    },
    {
      step: "4",
      title: "Publikim & Rritje Graduale",
      desc: "Pas publikimit, bëjmë monitorim të vazhdueshëm dhe optimizojmë performancën bazuar në analiza të hollësishme, me synimin që të rritet shitja në mënyrë të qëndrueshme.",
    },
  ],
  processHeadline: "Metoda të provuara për rezultate që zgjasin.",
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
