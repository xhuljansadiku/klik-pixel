export type ServicePackage = {
  name: string;
  price: string;
  for: string;
  features: string[];
};

export type ServiceItem = {
  slug: "websites" | "ecommerce" | "marketing" | "seo" | "branding" | "photography" | "mirembajtje" | "social-media";
  title: string;
  heroTitle: string;
  hookQuestion: string;
  short: string;
  problem: string;
  delay: string;
  context: string;
  solution: string;
  deliverables: string[];
  packages: ServicePackage[];
  faq: { q: string; a: string }[];
  image:
    | "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    | "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
    | "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    | "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07"
    | "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
    | "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4";
};

export const servicesData: ServiceItem[] = [
  {
    slug: "websites",
    title: "Websites",
    heroTitle: "Faqe Interneti që Sjell Klientë të Rinj çdo Muaj.",
    hookQuestion: "Pse shumica e faqeve nuk sjell klientë?",
    short: "Ndërtojmë faqe të shpejta dhe të qarta — ku vizitorët kuptojnë menjëherë çfarë bëni dhe si mund t'ju kontaktojnë.",
    problem: "Vizitori nuk e kupton çfarë ofroni dhe largohet pa kontaktuar.",
    delay: "Çdo muaj me faqe të paqartë humbni klientë që shkojnë tek konkurrenti juaj.",
    context: "Kur faqja nuk dallohet, biznesi juaj duket i njëjtë me të gjithë të tjerët.",
    solution: "Çdo seksion ndërtohet me qëllim — klienti e kupton ofertën dhe di saktësisht çfarë të bëjë.",
    deliverables: [
      "Strukturë dhe strategji e faqes",
      "Dizajn profesional dhe i lexueshëm",
      "Zhvillim i shpejtë dhe i sigurt",
      "SEO bazë i instaluar nga dita e parë",
      "Testim i plotë — telefon, tablet dhe kompjuter"
    ],
    packages: [
      {
        name: "Starter",
        price: "€650",
        for: "Biznese që duan prezencë serioze online",
        features: [
          "Deri 5 faqe",
          "Dizajn profesional, mobile-friendly",
          "SEO bazë i instaluar",
          "Formular kontakti",
          "1 rishikim falas"
        ]
      },
      {
        name: "Growth",
        price: "€1,400",
        for: "Biznese që duan të rriten online",
        features: [
          "Deri 10 faqe",
          "Blog / portofol / galeri",
          "SEO i avancuar + Google Analytics",
          "Integrim me rrjetet sociale",
          "2 rishikime falas"
        ]
      },
      {
        name: "Premium",
        price: "Nga €2,800",
        for: "Marka që kërkojnë sistem të plotë",
        features: [
          "Faqe e personalizuar plotësisht",
          "CMS për menaxhim të lehtë",
          "Integrime API dhe platforma",
          "SEO + strategji contentu",
          "Support prioritar 3 muaj"
        ]
      }
    ],
    faq: [
      { q: "Sa kohë zgjat ndërtimi?", a: "Zakonisht 3–6 javë, varësisht numrit të faqeve dhe shpejtësisë së feedback-ut tuaj." },
      { q: "A funksionon mirë në telefon?", a: "Po — ndërtojmë mobile-first dhe testojmë në pajisje reale para çdo publikimi." }
    ],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    heroTitle: "Dyqan Online që Funksionon dhe Shet Mirë.",
    hookQuestion: "Pse vizitorët largohen pa blerë?",
    short: "Dyqan online i ndërtuar me kujdes — nga shfletimi tek blerja, pa pengesa dhe pa humbje klientësh.",
    problem: "Vizitorët hyjnë por largohen para se të blejnë, shpesh pa asnjë arsye të dukshme.",
    delay: "Çdo blerës i humbur është klient që nuk kthehet — dhe nuk ju rekomandon askujt.",
    context: "Sot njerëzit blejnë online çdo ditë — por vetëm nga dyqanet ku ndihen të sigurt.",
    solution: "Riorganizojmë rrugëtimin e blerjes — nga produkti tek pagesa — dhe heqim çdo element që ndalon blerësin.",
    deliverables: [
      "Faqe produkti që bind dhe shet",
      "Rrugëtim i thjeshtë deri tek pagesa",
      "Ndjekje e porosive dhe analizë",
      "Testim i plotë para lansimit"
    ],
    packages: [
      {
        name: "Starter",
        price: "€1,200",
        for: "Dyqane me katalog deri 50 produkte",
        features: [
          "Deri 50 produkte",
          "Faqe produkti të optimizuara",
          "Integrim pagese (Stripe / PayPal)",
          "Checkout i thjeshtë dhe i shpejtë",
          "Mobile-friendly"
        ]
      },
      {
        name: "Growth",
        price: "€2,600",
        for: "Dyqane me volum të lartë",
        features: [
          "Katalog pa limit produktesh",
          "Filtrime dhe kërkim i avancuar",
          "Ndjekje porosish + analitikë",
          "Integrim me platforma shitjesh",
          "2 rishikime falas"
        ]
      },
      {
        name: "Premium",
        price: "Nga €5,000",
        for: "Zgjidhje e plotë e personalizuar",
        features: [
          "Arkitekturë e personalizuar",
          "Automatizim dhe integrime",
          "Panel administrimi i avancuar",
          "Strategji konversioni",
          "Support 6 muaj"
        ]
      }
    ],
    faq: [
      { q: "A punoni me katalog të madh?", a: "Po, me strukturë që ruan qartësinë edhe me shumë produkte." },
      { q: "A mund të shtojmë oferta sezonale?", a: "Po, ndërtojmë me module të ripërdorshme për çdo rast." }
    ],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
  },
  {
    slug: "marketing",
    title: "Marketing",
    heroTitle: "Reklama dhe Kreativa me Rezultate të Matshme.",
    hookQuestion: "Pse reklamat nuk japin rezultatin e pritur?",
    short: "Reklama të koordinuara dhe kreativa të forta — që sjellin rezultate reale, jo vetëm klikime.",
    problem: "Shpenzohen para për reklama pa e ditur çfarë funksionon dhe çfarë jo.",
    delay: "Çdo ditë pa sistem reklamash janë para të shpenzuara pa kthim.",
    context: "Reklamat pa strategji rrojnë shkurt dhe nuk ndërtojnë asgjë afatgjatë.",
    solution: "Testojmë, optimizojmë dhe raportojmë — me mesazh të qartë dhe buxhet të shpenzuar me kuptim.",
    deliverables: [
      "Drejtim i reklamave dhe kreativave",
      "Strategji dhe planifikim buxheti",
      "Optimizim dhe ndjekje javore",
      "Raporte të qarta me numra realë"
    ],
    packages: [
      {
        name: "Starter",
        price: "€350/muaj",
        for: "Biznese që hyjnë për herë të parë në reklamim",
        features: [
          "1 platformë (Meta ose Google)",
          "Deri 2 kampanja aktive",
          "Menaxhim buxheti reklamash",
          "Raport mujor"
        ]
      },
      {
        name: "Growth",
        price: "€700/muaj",
        for: "Biznese që duan rritje të qëndrueshme",
        features: [
          "2 platforma njëkohësisht",
          "Optimizim javor",
          "Kreativa + tekste reklamash",
          "Raport i detajuar dy-javësh"
        ]
      },
      {
        name: "Premium",
        price: "€1,400/muaj",
        for: "Marka me buxhet serioz",
        features: [
          "Të gjitha platformat",
          "Strategji kreative e plotë",
          "A/B testing i vazhdueshëm",
          "Raportim javor + takime mujore"
        ]
      }
    ],
    faq: [
      { q: "Sa shpesh raportohet performanca?", a: "Raport periodik me metrika konkrete dhe hapat e ardhshëm." },
      { q: "Punoni edhe me lansim produktesh?", a: "Po, nga narativa para-lansimit deri tek optimizimi post-lansimit." }
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
  },
  {
    slug: "seo",
    title: "SEO",
    heroTitle: "Faqja Juaj Gjendet Kur Klientët Ju Kërkojnë.",
    hookQuestion: "Pse klientët nuk ju gjejnë në Google?",
    short: "Faqja juaj shfaqet kur klientët e ardhshëm po ju kërkojnë — pa paguar për çdo klikim.",
    problem: "Website pa trafik organik — klientët nuk ju gjejnë dot në Google.",
    delay: "Çdo muaj pa SEO janë klientë potencialë që gjejnë dikë tjetër.",
    context: "Nëse nuk shfaqeni kur dikush ju kërkon, praktikisht nuk ekzistoni për ta.",
    solution: "Analizojmë çfarë kërkojnë klientët tuaj dhe ndërtojmë strukturën e duhur që Google t'ju gjejë.",
    deliverables: [
      "Analizë fjalësh kyçe dhe kërkesash",
      "Optimizim teknik i faqes",
      "Strukturë editoriale dhe plan contentu",
      "Raport mujor progresi"
    ],
    packages: [
      {
        name: "Starter",
        price: "€250/muaj",
        for: "Biznese që fillojnë me SEO",
        features: [
          "Audit fillestar i faqes",
          "Optimizim deri 5 fjalë kyçe",
          "Rregullim teknik bazë",
          "Raport mujor"
        ]
      },
      {
        name: "Growth",
        price: "€500/muaj",
        for: "Biznese që duan rritje organike të qëndrueshme",
        features: [
          "Strategji fjalësh kyçe e plotë",
          "Optimizim on-page i gjithanshëm",
          "Plan editorial mujor",
          "Raport i detajuar me progres"
        ]
      },
      {
        name: "Premium",
        price: "€900/muaj",
        for: "Autoritet domeni dhe dominim tregu",
        features: [
          "Link building i qëndrueshëm",
          "Produkim contentu SEO",
          "Optimizim teknik i avancuar",
          "Raportim javor + konsultime"
        ]
      }
    ],
    faq: [
      { q: "Kur shihen rezultatet?", a: "Zakonisht 2–4 muaj për lëvizje të qëndrueshme, sipas konkurrencës." },
      { q: "A përfshihet edhe plani editorial?", a: "Po, me tema që mbështesin faqet me kërkesë të lartë." }
    ],
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07"
  },
  {
    slug: "mirembajtje",
    title: "Mirëmbajtje",
    heroTitle: "Website i Sigurt, i Shpejtë dhe Gjithmonë Online.",
    hookQuestion: "Pse website-i degradohet me kohën?",
    short: "Website-i juaj punon, është i sigurt dhe i shpejtë — çdo ditë, pa surpriza.",
    problem: "Website-i ngadalësohet me kohën, krijon probleme sigurie dhe humbet besimin e vizitorëve.",
    delay: "Një rënie e papritur e faqes mund të kushtojë më shumë se mirëmbajtja e gjithë vitit.",
    context: "Website-i juaj punon 24/7 — dhe duhet dikush të kujdeset kur nuk jeni ju.",
    solution: "Monitorim periodik, përditësime dhe optimizim i vazhdueshëm — kaq duhet për një website të qëndrueshëm.",
    deliverables: [
      "Kontrolle sigurie periodike",
      "Përditësime dhe mirëmbajtje sistemi",
      "Optimizim shpejtësie",
      "Plan backup dhe rikuperim"
    ],
    packages: [
      {
        name: "Starter",
        price: "€60/muaj",
        for: "Website i thjeshtë me nevojat minimale",
        features: [
          "Backup javor",
          "Përditësime sistemi",
          "Monitorim bazë",
          "Raport mujor"
        ]
      },
      {
        name: "Growth",
        price: "€120/muaj",
        for: "Biznese aktive me website të rëndësishëm",
        features: [
          "Backup ditor",
          "Monitorim uptime 24/7",
          "Ndërhyrje deri 2 orë/muaj",
          "Optimizim shpejtësie",
          "Raport i detajuar"
        ]
      },
      {
        name: "Premium",
        price: "€220/muaj",
        for: "Biznese që nuk tolerojnë ndërprerje",
        features: [
          "Backup ditor i enkriptuar",
          "Monitorim + reagim i menjëhershëm",
          "Ndërhyrje prioritare pa limit",
          "Optimizim mujor",
          "Support i drejtpërdrejtë"
        ]
      }
    ],
    faq: [
      { q: "A përfshihet monitorimi i uptime?", a: "Po, me kontroll periodik dhe reagim të shpejtë në rast incidenti." },
      { q: "A mund të planifikohen ndërhyrje mujore?", a: "Po, ndërtojmë kalendar mirëmbajtjeje sipas nevojës suaj." }
    ],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  },
  {
    slug: "social-media",
    title: "Social Media",
    heroTitle: "Rrjete Sociale me Plan dhe Rezultat Real.",
    hookQuestion: "Pse postimet nuk sjellin rezultate?",
    short: "Përmbajtje konstante dhe e planifikuar — jo postime të rastit, por sistem i qartë që ndërton audiencë.",
    problem: "Postimet bëhen rrëmujë pa sistem — pa drejtim të qartë dhe pa rezultat.",
    delay: "Postime pa plan krijojnë audiencë të paqëndrueshme dhe mungesë besimi ndaj markës.",
    context: "Rrjetet sociale janë sot dritaret e para të biznesit tuaj — dhe si dukeni aty ka rëndësi.",
    solution: "Planifikim editorial, kreativa të qarta dhe ritëm publikimi që i bën njerëzit të kthehen.",
    deliverables: [
      "Plan mujor i postimeve dhe temave",
      "Kreativa dhe tekste për çdo postim",
      "Kalendar dhe ritëm publikimi",
      "Vlerësim periodik i performancës"
    ],
    packages: [
      {
        name: "Starter",
        price: "€250/muaj",
        for: "Biznese që duan prezencë të rregullt",
        features: [
          "2 postime në javë",
          "1 platformë (Instagram ose Facebook)",
          "Kreativa + kaptione",
          "Plan mujor postimesh"
        ]
      },
      {
        name: "Growth",
        price: "€480/muaj",
        for: "Biznese që duan të rrisin audiencën",
        features: [
          "5 postime në javë",
          "2 platforma",
          "Kreativa + kaptione + hashtag strategji",
          "Stories dhe Reels",
          "Raport periodik"
        ]
      },
      {
        name: "Premium",
        price: "€850/muaj",
        for: "Marka serioze me audiencë aktive",
        features: [
          "Postim çdo ditë",
          "3 platforma + Stories",
          "Strategji editoriale e plotë",
          "Lidhje me kampanjat reklamuese",
          "Menaxhim komuniteti"
        ]
      }
    ],
    faq: [
      { q: "A përfshihet plani mujor?", a: "Po, me tematika dhe formate të dizajnuara për çdo platformë." },
      { q: "A lidhet me reklamat?", a: "Po, kreativet ndërtohen që të funksionojnë edhe organikisht edhe si reklama." }
    ],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
  },
  {
    slug: "branding",
    title: "Branding",
    heroTitle: "Identitet Marke që Lihet Mend dhe Besohet.",
    hookQuestion: "Pse marka juaj nuk dallohet?",
    short: "Identitet i qartë dhe konsistent — logoja, ngjyrat dhe toni — që klientët ta njohin dhe besojnë.",
    problem: "Marka nuk ka identitet të qartë dhe humbet mes konkurentëve.",
    delay: "Pa identitet të qartë, biznesi juaj detyrohet të konkurroj me çmim, jo me vlerë.",
    context: "Njerëzit zgjedhin markën që njohin dhe besojnë — jo atë që nuk e mbajnë mend.",
    solution: "Pozicionim, sistem vizual dhe ton komunikimi — gjithçka e koordinuar për të lënë përshtypje të qëndrueshme.",
    deliverables: [
      "Strategji dhe pozicionim i markës",
      "Identitet vizual: logo, ngjyra, tipografi",
      "Ton i markës dhe udhëzues komunikimi",
      "Materiale gati për çdo platformë"
    ],
    packages: [
      {
        name: "Starter",
        price: "€600",
        for: "Biznese që kanë nevojë për identitet bazë",
        features: [
          "Logo (3 koncepte → 1 final)",
          "Paleta ngjyrash + tipografi",
          "3 versione logo",
          "Formate gati për çdo platformë"
        ]
      },
      {
        name: "Growth",
        price: "€1,200",
        for: "Marka që duan identitet të plotë",
        features: [
          "Gjithçka nga Starter",
          "Brand guidelines të plota",
          "Template materialesh (kartë vizite, emaili)",
          "Ton i markës + mesazhi kryesor"
        ]
      },
      {
        name: "Premium",
        price: "Nga €2,200",
        for: "Marka me pozicionim premium",
        features: [
          "Strategji marke e plotë",
          "Identitet vizual i gjithanshëm",
          "Sistem i plotë materialesh",
          "Sesion prezantimi + trajnim ekipi"
        ]
      }
    ],
    faq: [
      { q: "A përfshihet ridizajnimi i logos?", a: "Po, kur është pjesë e nevojshme e strategjisë së re." },
      { q: "A mund të fillojmë vetëm me strategji?", a: "Po, mund të nisim me sprint strategjik dhe pastaj zbatim." }
    ],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
  },
  {
    slug: "photography",
    title: "Fotografi",
    heroTitle: "Imazhe Profesionale që i Bëjnë Produktet Tuaja të Duken si Duhet.",
    hookQuestion: "Pse fotografitë e dobëta dëmtojnë shitjet?",
    short: "Fotografi profesionale për faqen dhe rrjetet sociale — imazhe të qarta që tregojnë vlerën e vërtetë të produktit.",
    problem: "Produkte dhe shërbime të mira humbin vlerë kur fotografitë janë të dobëta.",
    delay: "Imazhe të dobëta janë arsyeja kryesore që klientët nuk besojnë produktin tuaj.",
    context: "Para se dikush të lexojë çmimin, shikon foton — dhe aty vendos nëse beson apo jo.",
    solution: "Drejtojmë setin fotografik dhe ofrojmë imazhe finale të përpunuara — gati për çdo platformë.",
    deliverables: [
      "Drejtim artistik dhe planifikim i setit",
      "Fotografi produktesh dhe hapësirave",
      "Redaktim dhe përpunim final",
      "Imazhe të optimizuara për çdo platformë"
    ],
    packages: [
      {
        name: "Starter",
        price: "€280",
        for: "Biznese me nevojë për foto bazë",
        features: [
          "2 orë shooting",
          "1 lokacion",
          "25 foto finale të edituara",
          "Formate gati (web + print)"
        ]
      },
      {
        name: "Growth",
        price: "€550",
        for: "Biznese që duan shumëllojshmëri materialesh",
        features: [
          "4 orë (gjysëm dite)",
          "Deri 2 lokacione",
          "50 foto finale",
          "Drejtim artistik profesional"
        ]
      },
      {
        name: "Premium",
        price: "€950",
        for: "Marka me nevojë për material të plotë",
        features: [
          "Ditë e plotë shooting",
          "Lokacione të shumëfishta",
          "100 foto + video clips shkurtër",
          "Drejtim artistik + styling"
        ]
      }
    ],
    faq: [
      { q: "A bëni edhe fotografi për social media?", a: "Po, planifikojmë sete që funksionojnë për website, reklama dhe social." },
      { q: "A përfshihet editimi?", a: "Po, retouching dhe rregullim ngjyrash për output final." }
    ],
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4"
  }
];

export const testimonialsCompact = [
  {
    quote: "Nga estetikë në sistem që konverton. Kjo ishte diferenca.",
    author: "Atelier Prime",
    result: "+42% lead-e të kualifikuara"
  },
  {
    quote: "Mesazh më i qartë, kërkesa më cilësore, vendime më të shpejta.",
    author: "Maison Verre",
    result: "2.3x kohë në faqe"
  }
];
