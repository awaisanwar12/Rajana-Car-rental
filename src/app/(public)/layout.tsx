import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { site } from "@/lib/site";
import "../public-redesign.css";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutoRental"],
    "@id": `${site.url}/#business`,
    name: site.name,
    alternateName: ["GetCar", site.formerName],
    description: "Chauffeur-driven car rental in Lahore for local travel, airport transfers, weddings, corporate journeys and intercity trips.",
    url: site.url,
    hasMap: site.mapsUrl,
    sameAs: [site.mapsUrl],
    telephone: site.phoneHref,
    image: `${site.url}/images/honda-civic-rs.jpg`,
    logo: `${site.url}/images/get-car-logo.webp`,
    priceRange: "PKR 5,000 to 25,000",
    currenciesAccepted: "PKR",
    paymentAccepted: "Cash, Bank Transfer, JazzCash",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Street 145, H Block, Sector H, DHA Phase 1",
      addressLocality: "Lahore",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.latitude,
      longitude: site.longitude,
    },
    areaServed: [
      { "@type": "City", name: "Lahore" },
      ...site.serviceAreas.map((name) => ({ "@type": "Place", name: `${name}, Lahore` })),
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phoneHref,
      contactType: "reservations",
      availableLanguage: ["English", "Urdu"],
    },
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: {
      "@id": `${site.url}/#business`,
    },
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData).replace(/</g, "\\u003c") }} />
    </>
  );
}
