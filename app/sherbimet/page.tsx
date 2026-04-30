import { buildMetadata } from "@/lib/seo";
import SherbimetPageClient from "@/components/SherbimetPageClient";

export const metadata = buildMetadata(
  "Shërbimet",
  "3 kategori premium shërbimesh: Web & E-Commerce, Marketing & Growth, Branding & Content."
);

export default function SherbimetPage() {
  return <SherbimetPageClient />;
}
