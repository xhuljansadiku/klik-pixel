import type { Metadata } from "next";
import BlogUxMistakesClient from "@/components/BlogUxMistakesClient";
import { buildMetadata } from "@/lib/seo";

const METADATA_TITLE = "Gabimet që bëjnë bizneset në website | Blog";
const METADATA_DESCRIPTION =
  "Gabimet më të zakonshme që ulin besimin e vizitorit dhe si t'i rregullosh pa ndërtuar gjithçka nga e para.";

export async function generateMetadata(): Promise<Metadata> {
  const base = buildMetadata(METADATA_TITLE, METADATA_DESCRIPTION, "/blog/gabimet-kryesore-ne-website");
  return {
    ...base,
    title: METADATA_TITLE,
    openGraph: {
      ...base.openGraph,
      title: METADATA_TITLE
    },
    twitter: {
      ...base.twitter,
      title: METADATA_TITLE
    }
  };
}

export default function GabimetKryesoreNeWebsitePage() {
  return <BlogUxMistakesClient />;
}
