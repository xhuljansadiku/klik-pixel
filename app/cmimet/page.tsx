import type { Metadata } from "next";
import AllPackagesPageClient from "@/components/AllPackagesPageClient";
import { buildMetadata } from "@/lib/seo";

const DESC =
  "Çmimet dhe paketat për website, e-commerce, marketing digjital (SEO, Google Ads, Meta) dhe branding në Tiranë dhe Shqipëri. Krahaso të gjitha nivelët në një faqe — Illyrian Pixel.";

export const metadata: Metadata = buildMetadata(
  "Çmimet & paketat — Web, Marketing, Branding",
  DESC,
  "/cmimet"
);

export default function CmimetPage() {
  return <AllPackagesPageClient />;
}
