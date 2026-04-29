export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  location: string;
  flagCodes: string[];
  year: string;
  intro: string;
  problem: string;
  solution: string;
  result: string;
  metrics: string[];
  tags: string[];
  heroImage: string;
  liveUrl: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "esm-group",
    title: "ESM Group",
    category: "Website Korporativ Industrial",
    location: "Milano, Itali",
    flagCodes: ["it"],
    year: "2026",
    intro:
      "Rifreshuam prezencën e një kompanie industriale — mesazh B2B më i qartë, strukturë më autoritare, kërkesa më konkrete nga klientët.",
    problem:
      "Oferta dhe eksperienca e kompanisë nuk pasqyroheshin qartë online, duke krijuar paqartësi në llojin e projekteve dhe ritmin e kontakteve hyrëse.",
    solution:
      "Ndërtuam strukturë të pastër me seksione service-first, proof konkret dhe flow navigimi që e çon përdoruesin drejt kërkesës pa friction.",
    result: "Kërkesa më të sakta industriale",
    metrics: ["Mesazh B2B", "Navigim i strukturuar", "Kërkesa më të sakta industriale"],
    tags: ["Industrial", "Corporate", "B2B"],
    heroImage: "/images/projects/esm-group.png",
    liveUrl: "https://esm-group.eu/"
  },
  {
    slug: "bardhi-wellness",
    title: "Bardhi Wellness",
    category: "Brand Personal & Oferta Online",
    location: "Prishtinë, Kosovë & Köln, Gjermani",
    flagCodes: ["xk", "de"],
    year: "2026",
    intro:
      "Ristrukturuam paketat dhe tonin e brandit — vizitorët kuptojnë shpejt cilën paketë u përshtatet dhe vendosin më lehtë.",
    problem:
      "Informacioni ekzistonte, por hierarkia e përmbajtjes dhe narrativa e ofertës nuk e mbështesnin plotësisht perceptimin profesional të brandit.",
    solution:
      "Organizuam përmbajtjen sipas intentit të përdoruesit, qartësuam paketat dhe forcuam seksionet që ndërtojnë besim para kontaktit.",
    result: "Vendimmarrje më e shpejtë",
    metrics: ["Ofertë e kuptueshme", "Brand i besueshëm", "Vendimmarrje më e shpejtë"],
    tags: ["Fitness", "Branding", "Conversion UX"],
    heroImage: "/images/projects/bardhi-wellness.png",
    liveUrl: "https://www.bardhiwellness.com/"
  },
  {
    slug: "hauswerk-niederbayern",
    title: "Hauswerk Niederbayern",
    category: "Local Services Website",
    location: "Straubing, Gjermani",
    flagCodes: ["de"],
    year: "2026",
    intro:
      "Pozicionuam shërbimet qartë për tregun lokal gjerman — klientët gjejnë ofertën shpejt dhe nisin kontaktin me pritshmëri të sakta.",
    problem:
      "Vizitorët nuk arrinin gjithmonë të kuptonin menjëherë shërbimin përkatës dhe hapin e duhur për të dërguar kërkesë.",
    solution:
      "Krijuam hierarchy të fortë në homepage, ndarje të qarta të shërbimeve dhe CTA të drejtpërdrejta për kontakt të menjëhershëm.",
    result: "Kërkesa më cilësore",
    metrics: ["Shërbime të lexueshme", "Flow i drejtpërdrejtë", "Kërkesa më cilësore"],
    tags: ["Local Service", "Lead Flow", "Clarity"],
    heroImage: "/images/projects/hauswerk-niederbayern.png",
    liveUrl: "https://hauswerk-niederbayern.de/"
  },
  {
    slug: "palushi-brothers",
    title: "Palushi Brothers",
    category: "Construction Lead Generation",
    location: "Londër, Mbretëria e Bashkuar",
    flagCodes: ["gb"],
    year: "2026",
    intro:
      "Përmirësuam besueshmërinë e parë — proof social, shërbime të qarta dhe kontakt që nxit bisedë serioze, jo hezitim.",
    problem:
      "Vizitorët vinin me pritshmëri të ndryshme dhe pa një kuadër të qartë të shërbimeve, gjë që e bënte më të vështirë filtrimin e kërkesave.",
    solution:
      "Riorganizuam seksionet e ofertës, proof-it dhe kontaktit për të vendosur një rrjedhë më bindëse nga interesi te kërkesa.",
    result: "Biseda hyrëse më cilësore",
    metrics: ["Pritshmëri të qarta", "Besim i menjëhershëm", "Biseda hyrëse më cilësore"],
    tags: ["Construction", "Trust Signals", "Lead Gen"],
    heroImage: "/images/projects/palushi-brothers.png",
    liveUrl: "https://www.palushibrothers.co.uk/"
  },
  {
    slug: "ilirjana-shehu-photography",
    title: "Ilirjana Shehu Photography",
    category: "Portfolio Website",
    location: "Tiranë, Shqipëri",
    flagCodes: ["al"],
    year: "2026",
    intro:
      "Portofoli tregon stilin dhe cilësinë e punës pa zhurmë — imazhi flet, rrjedha është e qetë, impakti është i menjëhershëm.",
    problem:
      "Punët fotografike nuk kishin një kornizë editoriale të qartë online, duke humbur ritmin dhe efektin në prezantim.",
    solution:
      "Ndërtuam strukturë minimaliste, hierarchy të pastër dhe fokus të fortë te punimet për të rritur cilësinë e perceptimit.",
    result: "Eksperiencë premium",
    metrics: ["Prezantim editorial", "Ritëm i qartë", "Eksperiencë premium"],
    tags: ["Photography", "Portfolio", "Editorial"],
    heroImage: "/images/projects/ilirjana-shehu-photography.png",
    liveUrl: ""
  },
  {
    slug: "suli-group-trockenbau",
    title: "Suli Group Trockenbau",
    category: "Corporate Services Website",
    location: "Nyrëmberg, Gjermani",
    flagCodes: ["de"],
    year: "2026",
    intro:
      "Website korporativ që komunikon ofertën e kompanisë me autoritet — vizitori orientohet drejt kontaktit pa hezitim.",
    problem:
      "Mesazhi i shërbimeve ishte i shpërndarë dhe nuk theksonte mjaftueshëm pikat kyçe të diferencimit të kompanisë.",
    solution:
      "Riorganizuam përmbajtjen me seksione të qarta, CTA të fokusuara dhe estetikë të kontrolluar dark-luxury.",
    result: "Kontakt më i drejtpërdrejtë",
    metrics: ["Mesazh i strukturuar", "Lexueshmëri e lartë", "Kontakt më i drejtpërdrejtë"],
    tags: ["Construction", "Corporate", "Lead Gen"],
    heroImage: "/images/projects/suli-group-trockenbau.png",
    liveUrl: ""
  }
];

export const caseStudyBySlug = (slug: string) => caseStudies.find((item) => item.slug === slug);
