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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const category = serviceCategoryBySlug(slug);
  if (!category) {
    return buildMetadata("Services", "Premium digital services for growth-focused businesses.");
  }
  return buildMetadata(`${category.title} | Illyrian Pixel`, category.short);
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
