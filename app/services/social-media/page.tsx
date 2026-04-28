import { servicesData } from "@/lib/siteContent";
import ServiceDetailPage from "@/components/ServiceDetailPage";

const service = servicesData.find((item) => item.slug === "social-media")!;

export const metadata = {
  title: "Social Media | Illyrian Pixel",
  description: service.short
};

export default function SocialMediaServicePage() {
  return <ServiceDetailPage service={service} />;
}
