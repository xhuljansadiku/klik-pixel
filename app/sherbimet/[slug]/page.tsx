import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { serviceCategories, serviceCategoryBySlug } from "@/lib/serviceCategories";
import ServiceCategoryDetailPage from "@/components/ServiceCategoryDetailPage";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return serviceCategories.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: Props) {
  const category = serviceCategoryBySlug(params.slug);
  if (!category) {
    return buildMetadata("Shërbimet", "Kategori shërbimesh premium.");
  }
  return buildMetadata(category.title, category.short);
}

export default function SherbimetCategoryPage({ params }: Props) {
  const category = serviceCategoryBySlug(params.slug);
  if (!category) notFound();
  return <ServiceCategoryDetailPage category={category} />;
}
