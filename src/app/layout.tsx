import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { site } from "@/lib/site";
import "./globals.css";
import "./contact-float.css";

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
  robots: { index: true, follow: true },
  category: "travel",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0b2235" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutoRental"],
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    telephone: site.phoneHref,
    email: site.email,
    image: `${site.url}/images/honda-civic-rs.jpg`,
    priceRange: "PKR 6,000–25,000",
    address: { "@type": "PostalAddress", streetAddress: "123 H Block Market, DHA Phase 1", addressLocality: "Lahore", addressRegion: "Punjab", addressCountry: "PK" },
    areaServed: ["Lahore", "Islamabad", "Faisalabad", "Karachi", "Pakistan"],
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" }],
    contactPoint: { "@type": "ContactPoint", telephone: site.phoneHref, contactType: "reservations", availableLanguage: ["English", "Urdu"] },
  };

  return (
    <html lang="en-PK">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
