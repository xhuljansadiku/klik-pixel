export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string[];
  date: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "si-te-rrisesh-klientet-online",
    title: "Ke trafikun. Por ku janë klientët?",
    category: "Rritje",
    excerpt:
      "Shumica e bizneseve shpenzojnë para për të sjellë njerëz në faqe dhe i humbin menjëherë.\nJo sepse oferta është e keqe, por sepse faqja nuk po bën punën e saj.",
    date: "Prill 2026",
    content: [
      "Shumica e bizneseve shpenzojnë para për të sjellë njerëz në faqe dhe i humbin menjëherë. Jo sepse oferta është e keqe, por sepse faqja nuk po bën punën e saj.",
      "Oferta e parë, dëshmia dhe autoriteti, një CTA e vetme për seksion, pastaj mat klikimet në CTA, fillimin e formularit dhe dërgimin.",
      "Rritja fillon me një faqe që di punën e saj; pastaj çdo euro reklamë kthehet mbrapsht."
    ]
  },
  {
    slug: "gabimet-kryesore-ne-website",
    title: "Gabimet që bëjnë bizneset në website (dhe si i rregullojmë)",
    category: "UX",
    excerpt: "Një listë e shkurtër e gabimeve që ulin besimin dhe shtyjnë klientin të largohet.",
    date: "Prill 2026",
    content: [
      "Gabimi #1: Hierarki e paqartë. Vizitori nuk kupton çfarë ofroni brenda 5 sekondave.",
      "Gabimi #2: CTA të shumta pa prioritet. Kur çdo gjë është e rëndësishme, asgjë nuk është.",
      "Gabimi #3: Faqe e ngadaltë në mobile. Shpejtësia është pjesë e perceptimit premium."
    ]
  },
  {
    slug: "pse-seo-eshte-kritik",
    title: "Pse SEO është kritik për biznese serioze (dhe jo një opsion)",
    category: "Strategji",
    excerpt:
      "Të kesh një website të bukur që nuk shfaqet në Google është si të hapësh një dyqan luksoz në mes të shkretëtirës.\nAskush nuk e gjen, askush nuk blen.",
    date: "Prill 2026",
    content: [
      "Google është kanali ku kërkohet zgjidhja; pa faqen e parë, biznesi është i padukshëm për shumicën e tregut.",
      "SEO ul CAC në afatgjatë dhe ndërton autoritet; PPC zhduket kur ndalon pagesa.",
      "UX dhe cilësia e faqes janë pjesë e renditjes. SEO është maratonë, shumica dështojnë sepse presin rezultate për dy javë."
    ]
  },
  {
    slug: "google-ads-vs-seo",
    title: "Google Ads apo SEO: Ku të investosh para?",
    category: "Marketing",
    excerpt:
      "Dy kanale të ndryshme, dy logjika të ndryshme.\nNjëra jep rezultate nesër, tjetra ndërton diçka që zgjat vite.\nJa si të zgjedhësh sipas situatës suaj.",
    date: "Maj 2026",
    content: []
  },
  {
    slug: "pse-ecommerce-eshte-i-rendesishem",
    title: "Dyqani juaj fizik mbyllet në orën 18:00. Dyqani online kurrë.",
    category: "E-Commerce",
    excerpt:
      "Pse bizneset shqiptare kanë nevojë për dyqan online në 2026.\nGabimet më të shpeshta, kostot reale dhe çfarë humbisni çdo muaj pa e-commerce.",
    date: "Maj 2026",
    content: []
  },
  {
    slug: "cfare-eshte-branding",
    title: "Branding nuk është logo. Është çfarë ndiejnë të tjerët.",
    category: "Branding",
    excerpt:
      "Çfarë është branding në të vërtetë, pse bizneset shqiptare e nënvlerësojnë dhe çfarë humbasin duke e trajtuar si thjesht logo dhe ngjyrë.",
    date: "Maj 2026",
    content: []
  }
];

export const getBlogPostBySlug = (slug: string) => blogPosts.find((post) => post.slug === slug);
