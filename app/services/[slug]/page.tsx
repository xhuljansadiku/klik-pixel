import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { serviceCategoryBySlug } from "@/lib/serviceCategories";
import ServiceCategoryDetailPage from "@/components/ServiceCategoryDetailPage";

const SERVICE_SLUGS = ["web-ecommerce", "marketing-growth", "branding-content"] as const;

type RouteParams = { slug: string };

type Props = { params: RouteParams | Promise<RouteParams> };

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

const WEB_EC_SEO_DESC =
  "Platforma web dhe e-commerce për dominim në treg: dizajn premium, konvertim dhe SEO. Tirana dhe diasporë. Konsultim pa kosto, strategji brenda 24h. Illyrian Pixel.";

const MARKETING_SEO_DESC =
  "Shndërrojmë trafikun në shitje me strategji të dhënash: SEO, Google Ads dhe Meta Ads për ROI më të lartë. Konsultë pa obligim, përgjigje brenda 24h — Illyrian Pixel, Shqipëri & diasporë.";

const BRANDING_SEO_DESC =
  "Autoritet që zgjat: identitet vizual dhe përmbajtje premium për marka në Shqipëri dhe diasporë. Logo, Brand Kit, foto/video — ofertë falas, konsultë pa obligim.";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const category = serviceCategoryBySlug(slug);
  if (!category) {
    return buildMetadata("Services", "Premium digital services for growth-focused businesses.");
  }
  if (slug === "web-ecommerce") {
    return buildMetadata("Website & E-commerce Tirana", WEB_EC_SEO_DESC, `/services/${slug}`);
  }
  if (slug === "marketing-growth") {
    return buildMetadata("Marketing digjital & SEO Tirana", MARKETING_SEO_DESC, `/services/${slug}`);
  }
  if (slug === "branding-content") {
    return buildMetadata("Branding & identitet vizual Tirana", BRANDING_SEO_DESC, `/services/${slug}`);
  }
  return buildMetadata(`${category.title} | Illyrian Pixel`, category.short, `/services/${slug}`);
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await Promise.resolve(params);
  if (!SERVICE_SLUGS.includes(slug as (typeof SERVICE_SLUGS)[number])) {
    notFound();
  }
  const category = serviceCategoryBySlug(slug);
  if (!category) notFound();
  return <ServiceCategoryDetailPage category={category} />;
}
