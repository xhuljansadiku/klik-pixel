import { buildMetadata } from "@/lib/seo";
import { caseStudies } from "@/lib/caseStudies";
import WorkPageClient from "@/components/WorkPageClient";

export const metadata = buildMetadata(
  "Work",
  "Selected work: projekte reale me rezultate të matshme."
);

export default function WorkPage() {
  return <WorkPageClient projects={caseStudies} />;
}
