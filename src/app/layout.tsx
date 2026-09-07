import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Rent a Car Lahore with Driver | Rajana Car Rental", template: "%s | Rajana Car Rental" },
  description: "Reliable 24/7 car rental in Lahore with professional drivers. Airport transfers, one-way drops, family cars, SUVs and vans. Get a fast WhatsApp quote.",
  keywords: ["rent a car Lahore", "car rental Lahore with driver", "Lahore airport transfer", "Lahore to Islamabad car rental", "chauffeur service Lahore"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: site.url,
    siteName: site.name,
    title: "Rent a Car Lahore with Driver | Rajana Car Rental",
    description: "24/7 chauffeur-driven cars, SUVs and vans in Lahore. Request a quick quote on WhatsApp.",
    images: [{ url: "/images/honda-civic-rs.jpg", width: 1024, height: 576, alt: "Rajana Car Rental Lahore" }],
  },
  twitter: { card: "summary_large_image", title: "Rajana Car Rental Lahore", description: "Reliable car rental with professional drivers in Lahore.", images: ["/images/honda-civic-rs.jpg"] },
  icons: {
    icon: "/icon.svg",
    apple: "/images/rajana-logo.jpg",
  },
  robots: { index: true, follow: true },
  category: "travel",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0b2235" };

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-37CKB9WDK1";
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-6880083258";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-PK">
      <head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`} />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${googleAdsId}');gtag('config','${gaMeasurementId}');`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
