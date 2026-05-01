import { buildMetadata } from "@/lib/seo";
import ContactPageClient from "@/components/ContactPageClient";

export const metadata = buildMetadata(
  "Contact",
  "Jemi gati të të dëgjojmë. Një bisedë e shkurtër është hapi i parë drejt suksesit."
);

export default function ContactPage() {
  return <ContactPageClient />;
}
