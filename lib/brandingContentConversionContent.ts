import {
  conversionTrustStatsDefault,
  conversionWhyUsHeroDefault,
  type ConversionLandingData,
} from "@/lib/conversionLandingShared";

export const brandingConversionLandingData: ConversionLandingData = {
  trustStats: { ...conversionTrustStatsDefault },
  whyUs: {
    ...conversionWhyUsHeroDefault,
    items: [
      {
        icon: "bPsyche",
        title: "Ekspertizë e provuar në identitet",
        body: "Pozicionim dhe personalitet brandi të kalibruara nga projekte reale për shqiptarë në vend dhe jashtë — jo formula të kopjuara.",
      },
      {
        icon: "bStory",
        title: "Narrativë që zgjat",
        body: "Storytelling vizual dhe ton që mbajnë markën të lexueshme edhe pas viteve, jo vetëm për një fushatë sezonale.",
      },
      {
        icon: "bTouch",
        title: "Konsistencë profesionale",
        body: "Guidelines dhe aplikime që ekipi juaj përdor njësoj në çdo kanal — standard që ruan besimin e klientit.",
      },
      {
        icon: "bEdge",
        title: "Diferencim i testuar",
        body: "Zgjedhje vizuale dhe mesazhe të provuara në treg — markë që dallohet pa u varur nga trende të shpejta që plaken.",
      },
    ],
  },
  process: [
    {
      step: "01",
      title: "Zbulim (Discovery)",
      desc: "Intervista, audiencë, konkurrencë dhe personaliteti i markës — baza për çdo vendim vizual.",
    },
    {
      step: "02",
      title: "Konceptim",
      desc: "Drejtime kreative, narrativë dhe platformë vizuale para se të futemi në detajet e dizajnit.",
    },
    {
      step: "03",
      title: "Dizajn",
      desc: "Logo, paleta, tipografi, aplikime dhe mockups — zgjedhja juaj e drejtimit final.",
    },
    {
      step: "04",
      title: "Udhëzuesi i brandit (Brand Guidelines)",
      desc: "Dosje e qartë për ekipin: si përdoret marka, versionet, hapësirat dhe shembuj praktikë.",
    },
  ],
  portfolioSlugs: ["bardhi-wellness", "ilirjana-shehu-photography", "palushi-brothers"],
  testimonials: [
    {
      quote:
        "Më në fund kemi një pamje që përputhet me cilësinë e punës tonë. Klientët e vënë menjëherë.",
      name: "Arta N.",
      role: "Wellness & shërbime personale",
    },
    {
      quote:
        "Guidelines na kursyen kohë çdo herë që duam postim apo print — gjithçka është gati.",
      name: "Besnik T.",
      role: "Ndërtim & kontraktor",
    },
    {
      quote:
        "Sesioni fotografik dhe përdorimi në web e bënë portofolin të duket premium pa ‘zbukurime’ të panevojshme.",
      name: "Jonida L.",
      role: "Fotografi & kreative",
    },
  ],
};
