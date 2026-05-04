import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { serviceCategoryBySlug } from "@/lib/serviceCategories";
import ServiceCategoryDetailPage from "@/components/ServiceCategoryDetailPage";

const SERVICE_SLUGS = [
  "website",
  "ecommerce",
  "marketing-growth",
  "branding-content",
  "smm",
] as const;

type RouteParams = { slug: string };
type Props = { params: RouteParams | Promise<RouteParams> };

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

const SEO: Record<(typeof SERVICE_SLUGS)[number], { title: string; desc: string }> = {
  website: {
    title: "Website profesionale — Tiranë & diasporë",
    desc: "Website premium me dizajn luksoz, SEO dhe konvertim — ndërtuar për bizneset shqiptare. Konsultim falas, plan brenda 24h. Illyrian Pixel.",
  },
  ecommerce: {
    title: "E-Commerce & dyqane online — Shqipëri & diasporë",
    desc: "Dyqane online me checkout të optimizuar, pagesa Stripe/PayPal dhe analitikë shitjesh. 0 kosto konsultimi — Illyrian Pixel.",
  },
  "marketing-growth": {
    title: "Marketing & rritje për biznese — Tiranë & diasporë",
    desc: "Ndaloni humbjen: më shumë thirrje dhe shitje për biznese në Tiranë dhe diasporë. Strategji, faqe që konvertojnë, ads të matura. Illyrian Pixel.",
  },
  "branding-content": {
    title: "Branding & identitet luksoz — Tiranë & diasporë",
    desc: "Privilegj i heshtur, prani luksoze: pozicionim dhe identitet për status, besim dhe klientë më të përzgjedhur. Illyrian Pixel.",
  },
  smm: {
    title: "Social Media Marketing — Instagram, Facebook, TikTok",
    desc: "Menaxhim i plotë i social media: content, dizajn, posting dhe angazhim — për bizneset shqiptare. Plan konkret brenda 24h. Illyrian Pixel.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const seo = SEO[slug as (typeof SERVICE_SLUGS)[number]];
  if (!seo) return buildMetadata("Services", "Premium digital services for growth-focused businesses.");
  return buildMetadata(seo.title, seo.desc, `/services/${slug}`);
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await Promise.resolve(params);
  if (!SERVICE_SLUGS.includes(slug as (typeof SERVICE_SLUGS)[number])) notFound();
  const category = serviceCategoryBySlug(slug);
  if (!category) notFound();
  return <ServiceCategoryDetailPage category={category} />;
}
