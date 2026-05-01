import { buildMetadata } from "@/lib/seo";
import SherbimetPageClient from "@/components/SherbimetPageClient";

export const metadata = buildMetadata(
  "Shërbimet",
  "Tre shërbime, çdo gjë që ju duhet, Web & E-Commerce, Marketing & Growth, Branding & Content."
);

export default function SherbimetPage() {
  return <SherbimetPageClient />;
}
