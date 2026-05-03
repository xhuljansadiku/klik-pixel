import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/caseStudies";
import { blogPosts } from "@/lib/blogPosts";
import { seo } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/sherbimet",
    "/cmimet",
    "/services/web-ecommerce",
    "/services/marketing-growth",
    "/services/branding-content",
    "/projektet",
    "/about",
    "/blog",
    "/contact"
  ].map((path) => ({
    url: `${seo.siteUrl}${path}`,
    lastModified: new Date()
  }));

  const caseStudyRoutes = caseStudies.map((item) => ({
    url: `${seo.siteUrl}/projektet/${item.slug}`,
    lastModified: new Date()
  }));

  const blogRoutes = blogPosts.map((item) => ({
    url: `${seo.siteUrl}/blog/${item.slug}`,
    lastModified: new Date()
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...blogRoutes];
}


