export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
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
    year: "2026",
    intro:
      "Rifreskim i prezencës digjitale për një kompani që operon në Itali dhe Europë, me fokus te qartësia e shërbimeve dhe kërkesat serioze B2B.",
    problem:
      "Oferta dhe eksperienca e kompanisë nuk pasqyroheshin qartë online, duke krijuar paqartësi në llojin e projekteve dhe ritmin e kontakteve hyrëse.",
    solution:
      "Ndërtuam strukturë të pastër me seksione service-first, proof konkret dhe flow navigimi që e çon përdoruesin drejt kërkesës pa friction.",
    result:
      "Mesazhi i kompanisë u bë më i qartë për klientët industrialë, me kërkesa më të sakta dhe prezencë më autoritare në tregjet ku operon.",
    metrics: ["Mesazh më i qartë B2B", "Navigim më i strukturuar", "Kërkesa më të kualifikuara"],
    tags: ["Industrial", "Corporate", "B2B"],
    heroImage: "/images/projects/esm-group.png",
    liveUrl: "https://esm-group.eu/"
  },
  {
    slug: "bardhi-wellness",
    title: "Bardhi Wellness",
    category: "Brand Personal & Oferta Online",
    year: "2026",
    intro:
      "Ristrukturim i prezantimit të paketave, ofertës dhe tonit të markës për të rritur besueshmërinë dhe vendimmarrjen e shpejtë të klientit.",
    problem:
      "Informacioni ekzistonte, por hierarkia e përmbajtjes dhe narrativa e ofertës nuk e mbështesnin plotësisht perceptimin profesional të brandit.",
    solution:
      "Organizuam përmbajtjen sipas intentit të përdoruesit, qartësuam paketat dhe forcuam seksionet që ndërtojnë besim para kontaktit.",
    result:
      "Faqja komunikon më qartë vlerën e shërbimit dhe ndihmon vizitorët të kuptojnë më shpejt cilën paketë duhet të zgjedhin.",
    metrics: ["Oferta më e kuptueshme", "Brand më i besueshëm", "Vendime më të shpejta nga vizitorët"],
    tags: ["Fitness", "Branding", "Conversion UX"],
    heroImage: "/images/projects/bardhi-wellness.png",
    liveUrl: "https://www.bardhiwellness.com/"
  },
  {
    slug: "hauswerk-niederbayern",
    title: "Hauswerk Niederbayern",
    category: "Local Services Website",
    year: "2026",
    intro:
      "Pozicionim i qartë i shërbimeve për tregun lokal gjerman, me fokus te thjeshtësia, shpejtësia e gjetjes së ofertës dhe kërkesat e sakta.",
    problem:
      "Vizitorët nuk arrinin gjithmonë të kuptonin menjëherë shërbimin përkatës dhe hapin e duhur për të dërguar kërkesë.",
    solution:
      "Krijuam hierarchy të fortë në homepage, ndarje të qarta të shërbimeve dhe CTA të drejtpërdrejta për kontakt të menjëhershëm.",
    result:
      "Eksperienca u bë më intuitive dhe më orientuese, duke rritur cilësinë e kërkesave dhe qartësinë e pritshmërive.",
    metrics: ["Shërbime më të lexueshme", "Flow më i drejtpërdrejtë", "Kërkesa më të sakta"],
    tags: ["Local Service", "Lead Flow", "Clarity"],
    heroImage: "/images/projects/hauswerk-niederbayern.png",
    liveUrl: "https://hauswerk-niederbayern.de/"
  },
  {
    slug: "palushi-brothers",
    title: "Palushi Brothers",
    category: "Construction Lead Generation",
    year: "2026",
    intro:
      "Përmirësim i prezencës për një kompani ndërtimi në Londër, me fokus te besimi i menjëhershëm, proof social dhe qartësia e shërbimeve.",
    problem:
      "Vizitorët vinin me pritshmëri të ndryshme dhe pa një kuadër të qartë të shërbimeve, gjë që e bënte më të vështirë filtrimin e kërkesave.",
    solution:
      "Riorganizuam seksionet e ofertës, proof-it dhe kontaktit për të vendosur një rrjedhë më bindëse nga interesi te kërkesa.",
    result:
      "Kontakti i parë me klientët bëhet më i qartë dhe me më shumë besim, duke përmirësuar cilësinë e bisedave hyrëse.",
    metrics: ["Pritshmëri më të qarta", "Më shumë besim në kontaktin e parë", "Lead-e më relevante"],
    tags: ["Construction", "Trust Signals", "Lead Gen"],
    heroImage: "/images/projects/palushi-brothers.png",
    liveUrl: "https://www.palushibrothers.co.uk/"
  },
  {
    slug: "ilirjana-shehu-photography",
    title: "Ilirjana Shehu Photography",
    category: "Portfolio Website",
    year: "2026",
    intro:
      "Prezencë vizuale e pastër për portofol fotografie, me fokus te impakti i imazhit dhe rrjedha e qartë e prezantimit.",
    problem:
      "Punët fotografike nuk kishin një kornizë editoriale të qartë online, duke humbur ritmin dhe efektin në prezantim.",
    solution:
      "Ndërtuam strukturë minimaliste, hierarchy të pastër dhe fokus të fortë te punimet për të rritur cilësinë e perceptimit.",
    result:
      "Portofoli komunikon më qartë stilin dhe cilësinë e punës, me eksperiencë më të qetë dhe premium për vizitorin.",
    metrics: ["Prezantim më editorial", "Ritëm më i qartë i përmbajtjes", "Perceptim premium i brandit"],
    tags: ["Photography", "Portfolio", "Editorial"],
    heroImage: "/images/projects/ilirjana-shehu-photography.png",
    liveUrl: "#"
  },
  {
    slug: "suli-group-trockenbau",
    title: "Suli Group Trockenbau",
    category: "Corporate Services Website",
    year: "2026",
    intro:
      "Website korporativ për shërbime ndërtimi me fokus te qartësia e ofertës dhe autoriteti vizual në treg.",
    problem:
      "Mesazhi i shërbimeve ishte i shpërndarë dhe nuk theksonte mjaftueshëm pikat kyçe të diferencimit të kompanisë.",
    solution:
      "Riorganizuam përmbajtjen me seksione të qarta, CTA të fokusuara dhe estetikë të kontrolluar dark-luxury.",
    result:
      "Faqja komunikon më bindshëm ofertën e kompanisë dhe orienton më mirë vizitorin drejt kontaktit.",
    metrics: ["Mesazh më i strukturuar", "Lexueshmëri më e lartë", "Rrugë më e qartë drejt kontaktit"],
    tags: ["Construction", "Corporate", "Lead Gen"],
    heroImage: "/images/projects/suli-group-trockenbau.png",
    liveUrl: "#"
  }
];

export const caseStudyBySlug = (slug: string) => caseStudies.find((item) => item.slug === slug);
