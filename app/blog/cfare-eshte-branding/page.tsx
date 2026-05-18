import type { Metadata } from "next";
import BlogBrandingClient from "@/components/BlogBrandingClient";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Branding nuk është logo. Është çfarë ndiejnë të tjerët.";
const DESCRIPTION =
  "Çfarë është branding në të vërtetë, pse bizneset shqiptare e nënvlerësojnë dhe çfarë humbasin duke e trajtuar si thjesht logo dhe ngjyrë.";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(TITLE, DESCRIPTION, "/blog/cfare-eshte-branding");
}

export default function CfareEshteBrandingPage() {
  return <BlogBrandingClient />;
}
