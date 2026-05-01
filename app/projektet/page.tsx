import { buildMetadata } from "@/lib/seo";
import { caseStudies } from "@/lib/caseStudies";
import WorkPageClient from "@/components/WorkPageClient";

export const metadata = buildMetadata(
  "Projektet",
  "Projektet e përzgjedhura: raste reale me rezultate të matshme."
);

export default function ProjektePage() {
  return <WorkPageClient projects={caseStudies} />;
}

