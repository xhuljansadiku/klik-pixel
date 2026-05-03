export type ServiceFeatureBullet = {
  emphasis: string;
  detail: string;
};

export type ServicePackage = {
  name: string;
  price: string;
  priceNote?: string;
  ideal: string;
  /** Short positioning line under tier name (e.g. conversion landing). */
  tagline?: string;
  features: string[];
  /** Optional richer bullets with bold lead (web conversion layout). */
  featureBullets?: ServiceFeatureBullet[];
  featured?: boolean;
};

export type ServiceCategory = {
  slug: "web-ecommerce" | "marketing-growth" | "branding-content";
  title: string;
  headline: string;
  short: string;
  description: string;
  icon: string;
  subServices: string[];
  packages: ServicePackage[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "web-ecommerce",
    title: "Web & E-Commerce",
    headline: "Përkthejmë vizionin tuaj në shitje, jo thjesht në një faqe të bukur.",
    short:
      "Platforma web dhe e-commerce premium për dominim në treg — Tirana, Shqipëri dhe diasporë. Dizajn luksoz + inxhinieri konvertimi.",
    description:
      "Ndërtojmë platforma web dhe dyqane online për biznese që kërkojnë dominim në treg. Nga Tirana në diasporë, ne kombinojmë dizajnin premium me inxhinierinë e konvertimit për të garantuar më shumë klientë dhe rritje të xhiros.",
    icon: "◈",
    subServices: [
      "SEO që sjell klientë",
      "E-Commerce Elite",
      "Shpejtësi Ultra-Fast",
      "Mobile-First Design",
      "Custom Dev",
    ],
    packages: [
      {
        name: "Basic",
        price: "€650",
        tagline: "Landing page",
        ideal: "Fokus te konvertimi (deri 5 seksione), SEO bazë meta, Core Web Vitals dhe siguri HTTPS.",
        features: [
          "Deri 5 seksione të strukturuara për konvertim",
          "UX/UI i pastër, mobile-first",
          "Performance dhe Core Web Vitals në fokus",
          "HTTPS, bazë sigurie dhe praktika të mira",
          "SEO on-page bazë + meta dhe strukturë",
          "Formular / thirrje veprimi e matshme",
          "1 rishikim falas pas lançimit",
        ],
        featureBullets: [
          { emphasis: "Konvertim", detail: "deri 5 seksione, hierarki dhe CTA për kërkesa të matshme." },
          { emphasis: "SEO bazë", detail: "meta, strukturë dhe përgatitje për të shfaqur në kërkime lokale." },
          { emphasis: "Core Web Vitals", detail: "faqe e shpejtë në mobile: më pak heqje, më shumë besim." },
          { emphasis: "Siguri", detail: "HTTPS dhe praktika të mira për një prezencë profesionale." },
        ],
      },
      {
        name: "Pro",
        price: "€1,500",
        tagline: "Business website",
        ideal: "Përfshin CMS për shkallëzim (deri 12 faqe), SEO i avancuar (Search Console/Analitikë), dhe integrime CRM/Email Marketing.",
        features: [
          "Deri 12 faqe të personalizuara",
          "CMS: përditësoni vetë pa varësi nga zhvilluesi",
          "Blog, portfolio ose galeri sipas nevojës",
          "SEO i avancuar + Google Analytics / Search Console",
          "Mikro-kopje dhe hierarki vizuale për shitje",
          "Integrime bazë (CRM, email, social)",
          "3 rishikime falas gjatë projektit",
        ],
        featureBullets: [
          { emphasis: "CMS & shkallëzim", detail: "deri 12 faqe; përditësoni vetë përmbajtjen pa zhvillues çdo herë." },
          { emphasis: "SEO i avancuar", detail: "Search Console, analitikë dhe strukturë për të rritur dukshmërinë." },
          { emphasis: "Shitje me fjalë", detail: "mikro-kopje dhe hierarki vizuale që udhëheqin drejt kontaktit." },
          { emphasis: "Integrime", detail: "CRM, email dhe social. Rrjedhë e qartë nga vizitor në klient." },
        ],
        featured: true,
      },
      {
        name: "Enterprise",
        price: "Nga €3,200",
        tagline: "E-commerce",
        ideal: "Dyqan i plotë me katalog/variantet e produkteve, pagesa Stripe/PayPal, strategji për rikuperim karroce dhe support prioritar 3 muaj pas lançimit.",
        features: [
          "Dyqan me katalog dhe variantet e produktit",
          "Integrim pagesash (Stripe, PayPal ose PSP lokale)",
          "Checkout i thjeshtuar, trust signals dhe rikuperim karroce",
          "HTTPS, hardening bazë dhe backup strategy",
          "Analitikë e porosive dhe funnel konvertimi",
          "Panel admin dhe procese për ekipin tuaj",
          "Support prioritar 3 muaj pas lançimit",
        ],
        featureBullets: [
          { emphasis: "Katalog & variantet", detail: "produkte, çmime dhe stok. Gati për shitje reale." },
          { emphasis: "Pagesa", detail: "Stripe, PayPal ose PSP lokale; checkout i thjeshtuar për më pak braktisje." },
          { emphasis: "Konvertim checkout", detail: "trust signals dhe strategji rikuperimi karroce." },
          { emphasis: "Pas lançimit", detail: "support prioritar 3 muaj + analitikë porosish dhe funnel." },
        ],
      },
    ],
  },
  {
    slug: "marketing-growth",
    title: "Marketing & Growth",
    headline: "Shndërrojmë trafikun në shitje — jo vetëm klikime.",
    short:
      "Strategji digjitale të udhëhequra nga të dhëna: SEO, Google Ads dhe Meta Ads me ROI të matshëm për biznese në Shqipëri dhe diasporë.",
    description:
      "Strategji digjitale të bazuara në të dhëna (Data-driven) që rrisin ROI-n tuaj përmes SEO, Google Ads dhe Meta Ads.",
    icon: "◉",
    subServices: ["SEO", "Google Ads", "Meta Ads", "Data & ROI", "Konvertim", "Shkallëzim"],
    packages: [
      {
        name: "Starter",
        price: "€350",
        priceNote: "/ muaj",
        tagline: "SEO bazë + ads për biznese lokale",
        ideal: "Fokus te SEO bazë dhe reklama të strukturuara për biznese lokale — dukshmëri në Google dhe kërkesa të para të matshme.",
        features: [
          "Audit SEO + plan veprimi për faqen ekzistuese",
          "On-page bazë dhe optimizim Google Business Profile ku aplikohet",
          "Një kanal reklamash (Google ose Meta) me fokus lokal",
          "Konfigurim konvertimesh dhe raport mujor i thjeshtë",
          "Udhëzime për ofertë dhe faqe destinacion",
        ],
        featureBullets: [
          { emphasis: "SEO bazë", detail: "audit, on-page dhe GBP — për kërkime lokale që sjellin telefonata." },
          { emphasis: "Ads lokale", detail: "një kanal i fokusuar: mesazh, audiencë dhe buxhet i qartë." },
          { emphasis: "Konvertime", detail: "ngjarje dhe raportim që tregon çfarë funksionon." },
          { emphasis: "Raport mujor", detail: "numra të lexueshëm dhe hapa për muajin tjetër." },
        ],
      },
      {
        name: "Accelerate",
        price: "€750",
        priceNote: "/ muaj",
        tagline: "Menaxhim kanale + optimizim konvertimi",
        ideal: "Menaxhim i plotë i kanaleve dhe optimizim konvertimi: SEO në rritje plus reklama të testuara dhe landing që mbyll më shumë kërkesa.",
        features: [
          "Roadmap SEO 90 ditë + ekzekutim mujor",
          "Meta dhe/ose Google Ads me strukturë profesionale",
          "Teste kreative, ofertash dhe segmentesh",
          "Optimizim javor CPA / ROAS dhe shënjestrimi",
          "A/B në faqe kyçe dhe formularë",
          "Raport dy-javësh + një call strategjik mujor",
        ],
        featureBullets: [
          { emphasis: "Kanalet", detail: "SEO + një ose dy kanale reklamash me një narrativë të vetme." },
          { emphasis: "CRO", detail: "landing, formularë dhe teste që rrisin përqindjen e kërkesave." },
          { emphasis: "Optimizim javor", detail: "buxheti dhe ofertat përshtaten sipas të dhënave." },
          { emphasis: "Transparencë", detail: "raporte të shkurtra dhe vendime të qarta çdo dy javë." },
        ],
        featured: true,
      },
      {
        name: "Dominate",
        price: "€1,500",
        priceNote: "/ muaj",
        tagline: "Strategji omnikanale + autoritet në treg",
        ideal: "Strategji omnikanale dhe autoritet maksimal në treg: shumë kanale, përmbajtje dhe SEO i thellë për dominim afatgjatë në kërkim dhe reklamë.",
        features: [
          "SEO i avancuar + linjë për autoritet domeni dhe përmbajtje",
          "Google Ads + Meta Ads në paralel me ri-shpërndarje buxheti",
          "Strategji funnel, oferta dhe audienca B2B/B2C",
          "Kalendar kreativ dhe përsëritje mujore",
          "Raportim javor dhe call strategjik dy-herë në muaj",
          "Mbështetje për faqe / CRO me ekipin tuaj",
        ],
        featureBullets: [
          { emphasis: "Omnichannel", detail: "SEO + Google + Meta me një narrativë dhe objektiva të njëjta shitjeje." },
          { emphasis: "Autoritet", detail: "përmbajtje dhe lidhje që forcojnë pozicionin në treg." },
          { emphasis: "Shkallëzim", detail: "buxheti lëviz te kanalet dhe ofertat më fitimprurëse." },
          { emphasis: "Partneritet", detail: "dy takime strategjike në muaj — jo vetëm ekzekutim." },
        ],
      },
    ],
  },
  {
    slug: "branding-content",
    title: "Branding & Content",
    headline: "Ndërtojmë autoritet që zgjat — jo vetëm një logo.",
    short:
      "Identitet vizual dhe përmbajtje premium për marka në Shqipëri dhe diasporë — pozicionim, storytelling dhe konsistencë në çdo kanal.",
    description:
      "Krijojmë identitete vizuale dhe përmbajtje premium që e pozicionojnë brandin tuaj si lider në industri.",
    icon: "◆",
    subServices: ["Branding", "Logo", "Fotografi", "Video", "Social", "Guidelines"],
    packages: [
      {
        name: "Identity",
        price: "€800",
        tagline: "Logo & elementet bazë vizuale",
        ideal: "Logo dhe elementet bazë vizuale: një sistem i lexueshëm që ekipi juaj zbaton menjëherë në web, print dhe social.",
        features: [
          "Logo: koncepte + final i polish-uar",
          "Paleta, tipografi dhe rregulla hapësire",
          "Versione për web, print dhe dark/light",
          "Guidelines PDF bazë (përdorimi i markës)",
          "Eksporte gati për rrjete dhe materiale fillestare",
        ],
        featureBullets: [
          { emphasis: "Logo", detail: "koncepte të qarta dhe një final që funksionon në çdo madhësi." },
          { emphasis: "Elemente bazë", detail: "ngjyra, tipografi dhe rregulla për pamje të njëtrajtshme." },
          { emphasis: "Versione", detail: "web, print, dark/light — gati për përdorim ditor." },
          { emphasis: "Guidelines", detail: "udhëzues i shkurtër që mban markën të pastër." },
        ],
      },
      {
        name: "Evolution",
        price: "€1,800",
        tagline: "Brand Kit + komunikim + social",
        ideal: "Full Brand Kit, strategji komunikimi dhe dizajn social media — historia dhe pamja juaj të njëtrajtshme kudo.",
        features: [
          "Gjithçka nga paketa Identity",
          "Brand Kit i zgjeruar (zëri, vizuali, shembuj aplikimesh)",
          "Strategji komunikimi dhe mesazhe kyçe",
          "Sesion fotografik (3 orë) + 30 foto të edituara",
          "Templates social, kartëvizita, email signature",
        ],
        featureBullets: [
          { emphasis: "Brand Kit", detail: "më shumë se logo — sistemi vizual dhe zëri i markës." },
          { emphasis: "Komunikimi", detail: "mesazhe dhe narrativë që përputhen me pozicionimin." },
          { emphasis: "Social", detail: "formate dhe stil vizual për postime të qëndrueshme." },
          { emphasis: "Fotografi", detail: "imazhe profesionale që përforcojnë besimin dhe çmimin." },
        ],
        featured: true,
      },
      {
        name: "Authority",
        price: "Nga €3,500",
        tagline: "Branding i plotë + video & foto premium",
        ideal: "Branding i plotë plus prodhim përmbajtjeje video dhe foto premium — autoritet vizual që mbetet mend.",
        features: [
          "Strategji marke, pozicionim dhe narrativë e plotë",
          "Identitet vizual i zgjeruar (ikona, pattern, UI tokens ku nevojitet)",
          "Produksion foto + video (klip-e dhe materiale kampanjash)",
          "Bankë materialesh e organizuar për ekipin",
          "Kalendar editorial 3 muaj + mbështetje mujore",
          "Trajnim për ekipin mbi përdorimin e sistemit",
        ],
        featureBullets: [
          { emphasis: "Branding i plotë", detail: "nga pozicionimi te çdo detaj vizual që përfaqëson markën." },
          { emphasis: "Video & foto premium", detail: "përmbajtje që mbështet kampanja dhe web-in." },
          { emphasis: "Autoritet", detail: "materiale që ju vendosin si referencë në industri." },
          { emphasis: "Partneritet", detail: "editorial dhe mbështetje — jo vetëm dorëzim një herë." },
        ],
      },
    ],
  },
];

export const serviceCategoryBySlug = (slug: string) =>
  serviceCategories.find((item) => item.slug === slug);
