import type { Metadata } from "next";
import { Cormorant_Garamond, Press_Start_2P, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { localBusinessSchema, organizationSchema, seo } from "@/lib/seo";
import InquiryModal from "@/components/InquiryModal";
import SmoothScroll from "@/components/SmoothScroll";
import MagneticButtons from "@/components/MagneticButtons";
import GlobalReveals from "@/components/GlobalReveals";
import InteractiveGlow from "@/components/InteractiveGlow";

/** Primary sans: body, UI, nav, buttons — luxury boutique rhythm */
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: "Illyrian Pixel",
    template: "%s | Illyrian Pixel"
  },
  description: seo.defaultDescription,
  openGraph: {
    title: "Illyrian Pixel",
    description: seo.defaultDescription,
    url: seo.siteUrl,
    siteName: "Illyrian Pixel",
    locale: "sq_AL",
    type: "website",
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: "Illyrian Pixel" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Illyrian Pixel",
    description: seo.defaultDescription,
    images: [seo.ogImage]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sq" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${plusJakarta.variable} ${display.variable} ${pixel.variable} bg-bg font-body text-text antialiased`}
      >
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <SmoothScroll>
          <InteractiveGlow />
          <MagneticButtons />
          <GlobalReveals />
          {children}
        </SmoothScroll>
        <InquiryModal />
      </body>
    </html>
  );
}
