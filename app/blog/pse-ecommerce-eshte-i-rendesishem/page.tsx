import type { Metadata } from "next";
import BlogEcommerceClient from "@/components/BlogEcommerceClient";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Dyqani juaj fizik mbyllet në orën 18:00. Dyqani online kurrë.";
const DESCRIPTION =
  "Pse bizneset shqiptare kanë nevojë për dyqan online në 2026. Gabimet më të shpeshta, kostot reale dhe çfarë humbisni çdo muaj pa e-commerce.";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(TITLE, DESCRIPTION, "/blog/pse-ecommerce-eshte-i-rendesishem");
}

export default function PseEcommerceEshteIRendesishemPage() {
  return <BlogEcommerceClient />;
}
