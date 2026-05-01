export type ServicePackage = {
  name: string;
  price: string;
  priceNote?: string;
  ideal: string;
  features: string[];
  featured?: boolean;
};

export type ServiceProblem = {
  title: string;
  body: string;
};

export type ServiceCategory = {
  slug: "web-ecommerce" | "marketing-growth" | "branding-content";
  title: string;
  headline: string;
  short: string;
  description: string;
  icon: string;
  subServices: string[];
  problems: ServiceProblem[];
  packages: ServicePackage[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "web-ecommerce",
    title: "Web & E-Commerce",
    headline: "Ndërtojmë prani digjitale që shet, jo vetëm që duket bukur.",
    short: "Website dhe dyqane online premium për konvertim real.",
    description:
      "Ndërtojmë website dhe dyqane online që duken premium, ngarkohen shpejt dhe kthejnë vizitorët në klientë, me fokus tek rezultati, jo vetëm estetika.",
    icon: "◈",
    subServices: ["Website", "E-commerce", "Maintenance", "UX/UI", "Performance optimization"],
    problems: [
      {
        title: "Faqja juaj nuk konverton",
        body: "Vizitorët vijnë dhe ikin pa kontaktuar apo blerë. Struktura nuk i udhëzon drejt veprimit, dhe çdo vizitor i humbur është klient i konkurrentit tuaj.",
      },
      {
        title: "Dyqani humbet blerës para pagesës",
        body: "Rrugëtimi i blerjes ka fërkime të padukshme. Klientët braktisin karrocën, jo sepse nuk duan të blejnë, por sepse procesi nuk është ndërtuar me psikologjinë e blerësit.",
      },
      {
        title: "Performanca e dobët dëmton SEO",
        body: "Faqja ngarkohet ngadalë dhe humb pozicione në Google. Çdo sekondë e shtuar ul konversionin dhe zvogëlon dukshmërinë organike, pa e vënë re.",
      },
    ],
    packages: [
      {
        name: "Basic",
        price: "€650",
        ideal: "Landing page e shpejtë dhe e sigurt: një ofertë e fortë, një veprim i qartë.",
        features: [
          "Deri 5 seksione të strukturuara për konvertim",
          "UX/UI i pastër, mobile-first",
          "Performance dhe Core Web Vitals në fokus",
          "HTTPS, bazë sigurie dhe praktika të mira",
          "SEO on-page bazë + meta dhe strukturë",
          "Formular / thirrje veprimi e matshme",
          "1 rishikim falas pas lançimit",
        ],
      },
      {
        name: "Pro",
        price: "€1,500",
        ideal: "Website biznesi me CMS: përmbajtje, besueshmëri dhe rritje organike.",
        features: [
          "Deri 12 faqe të personalizuara",
          "CMS: përditësoni vetë pa varësi nga zhvilluesi",
          "Blog, portfolio ose galeri sipas nevojës",
          "SEO i avancuar + Google Analytics / Search Console",
          "Mikro-kopje dhe hierarki vizuale për shitje",
          "Integrime bazë (CRM, email, social)",
          "3 rishikime falas gjatë projektit",
        ],
        featured: true,
      },
      {
        name: "Enterprise",
        price: "Nga €3,200",
        ideal: "E-commerce i plotë me arkitekturë për shkallëzim, pagesa dhe raportim.",
        features: [
          "Dyqan me katalog dhe variantet e produktit",
          "Integrim pagesash (Stripe, PayPal ose PSP lokale)",
          "Checkout i thjeshtuar, trust signals dhe rikuperim karroce",
          "HTTPS, hardening bazë dhe backup strategy",
          "Analitikë e porosive dhe funnel konvertimi",
          "Panel admin dhe procese për ekipin tuaj",
          "Support prioritar 3 muaj pas lançimit",
        ],
      },
    ],
  },
  {
    slug: "marketing-growth",
    title: "Marketing & Growth",
    headline: "Rritje e matshme me trafik cilësor dhe kërkesa reale.",
    short: "SEO, ads dhe strategji që sjellin klientë të duhur.",
    description:
      "Ndërtojmë sisteme marketingu që sjellin klientë, jo vetëm klikime dhe impresione. Çdo euro e buxhetit ka destinacion dhe matje të qartë.",
    icon: "◉",
    subServices: ["SEO", "Google Ads", "Meta Ads", "Social Media Marketing", "Strategy", "Conversion optimization"],
    problems: [
      {
        title: "Buxheti reklamash humb pa kthim",
        body: "Pa strategji dhe testim të vazhdueshëm, reklamat shpenzojnë para pa sjellë klientë të vlefshëm. Çdo euro e shpenzuar pa sistem është euro e humbur.",
      },
      {
        title: "Klientët nuk ju gjejnë në Google",
        body: "Faqja nuk shfaqet kur dikush kërkon shërbimet tuaja. Vizitorët organikë shkojnë direkt tek konkurrenti, dhe ju paguani për çdo klikim.",
      },
      {
        title: "Nuk keni sistem të qëndrueshëm",
        body: "Rritja varet nga reklamat momentale. Kur ndalet buxheti, ndalen edhe klientët. Ky nuk është model biznesi, është varësi nga shpenzimi.",
      },
    ],
    packages: [
      {
        name: "Starter",
        price: "€350",
        priceNote: "/ muaj",
        ideal: "Fondacion organik: dukshmëri në Google pa humbur kohë me taktika të përkohshme.",
        features: [
          "Audit teknik dhe prioritete me impakt",
          "Deri 5 fjalë kyçe me fokus komercial",
          "On-page: tituj, strukturë, schema ku ka nevojë",
          "Raport mujor: rendiment, jo vetëm aktivitet",
          "Udhëzime për përmbajtje që mbyll kërkesa",
        ],
      },
      {
        name: "Scale",
        price: "€750",
        priceNote: "/ muaj",
        ideal: "SEO + një kanal reklamash: kërkesa të matshme dhe optimizim i shpeshtë i shpenzimit.",
        features: [
          "Strategji SEO me roadmap 90 ditësh",
          "Meta ose Google Ads: strukturë kampanjash profesionale",
          "Kreative dhe copy për teste të shpejta",
          "Optimizim javor i CPA / ROAS dhe segmenteve",
          "A/B në landing dhe mesazhe kryesore",
          "Raport dy-javësh me vendime të qarta",
        ],
        featured: true,
      },
      {
        name: "Dominance",
        price: "€1,500",
        priceNote: "/ muaj",
        ideal: "Shkallëzim: shumë kanale, buxhet i përditësuar vazhdimisht, fokus te ROI.",
        features: [
          "SEO i avancuar + plan për autoritet domeni",
          "Meta Ads + Google Ads në paralel",
          "Menaxhim dhe ri-shpërndarje buxheti sipas performancës",
          "Strategji ofertash, audienca dhe funnel",
          "Skedar kreativ dhe përsëritje mujore",
          "Raportim javor + call strategjik mujor",
        ],
      },
    ],
  },
  {
    slug: "branding-content",
    title: "Branding & Content",
    headline: "Identitet që lihet mend. Përmbajtje që bind dhe shet.",
    short: "Branding, fotografi dhe krijim përmbajtjeje me standard premium.",
    description:
      "Nuk ndërtojmë vetëm logo, ndërtojmë sistem vizual dhe narrativë që e bëjnë markën tuaj të dallohet, të besohet dhe të mbetet mend.",
    icon: "◆",
    subServices: ["Branding", "Photography", "Content creation", "Visual identity", "Social media visuals"],
    problems: [
      {
        title: "Marka nuk dallohet nga konkurrenca",
        body: "Pa identitet të qartë, biznesi duket si i gjithë të tjerët. Klientët zgjedhin ata që njohin dhe besojnë, jo ata që nuk i mbajnë mend.",
      },
      {
        title: "Fotografia e dobët dëmton shitjet",
        body: "Imazhe të dobëta rrisin dyshimin dhe ulin besimin. Para se dikush të lexojë çmimin, shikon foton, dhe aty vendos nëse ju beson apo jo.",
      },
      {
        title: "Nuk keni material të gatshëm",
        body: "Çdo fushatë nis nga zero sepse nuk keni sistem të konsoliduar. Koha dhe buxheti humben duke riprodhuar gjëra që duhet të jenë gati.",
      },
    ],
    packages: [
      {
        name: "Identity",
        price: "€800",
        ideal: "Identitet i lexueshëm dhe i përdorshëm: logo, ngjyra dhe rregulla bazë.",
        features: [
          "Logo: 3 koncepte, 1 final i polish-uar",
          "Paleta ngjyrash dhe tipografi e kuruar",
          "Versione logo (web, print, dark/light)",
          "Brand guidelines PDF bazë (si të përdoret marka)",
          "Eksporte gati për rrjete dhe print",
        ],
      },
      {
        name: "Full Brand",
        price: "€1,800",
        ideal: "Brand book + fotografi profesionale: besueshmëri që shet.",
        features: [
          "Gjithçka nga paketa Identity",
          "Brand book i zgjeruar (zëri, vizuali, aplikime)",
          "Sesion fotografik (3 orë, një lokacion)",
          "30 foto finale të edituara për web dhe social",
          "Templates: kartëvizitë, email signature, 6 formate social",
        ],
        featured: true,
      },
      {
        name: "Creative Partner",
        price: "Nga €3,500",
        ideal: "Pozicionim, produksion dhe përmbajtje: historia juaj, e njëtrajtshme kudo.",
        features: [
          "Strategji marke dhe pozicionim (pyetje thelbësore + narrative)",
          "Identitet vizual i plotë dhe zgjerime (ikona, pattern, UI tokens)",
          "Ditë fotografike + klip-e të shkurtra për social",
          "Bankë materialesh e organizuar (dosje për ekipin)",
          "Kalendar editorial 3 muaj + linja temash mujore",
          "Trajnim i shkurtër për ekipin (si të përdorë sistemin)",
        ],
      },
    ],
  },
];

export const serviceCategoryBySlug = (slug: string) =>
  serviceCategories.find((item) => item.slug === slug);
