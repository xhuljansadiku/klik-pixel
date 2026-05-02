import type { Metadata } from "next";
import BlogSeoClient from "@/components/BlogSeoClient";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Pse SEO është kritik për biznese serioze (dhe jo një opsion)";
const DESCRIPTION =
  "Të kesh një website të bukur që nuk shfaqet në Google është si të hapësh një dyqan luksoz në mes të shkretëtirës. Askush nuk e gjen, askush nuk blen.";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(TITLE, DESCRIPTION, "/blog/pse-seo-eshte-kritik");
}

export default function PseSeoEshteKritikPage() {
  return <BlogSeoClient />;
}
