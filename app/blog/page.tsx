import { buildMetadata } from "@/lib/seo";
import BlogPageClient from "@/components/BlogPageClient";

export const metadata = buildMetadata("Blog", "Artikuj për UX, SEO dhe rritje të qëndrueshme për biznese serioze.");

export default function BlogPage() {
  return <BlogPageClient />;
}
