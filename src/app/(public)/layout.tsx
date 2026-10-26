import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { services } from "@/lib/services";
import { fleet, site, socialLinks } from "@/lib/site";
import "../public-redesign.css";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutoRental"],
    "@id": `${site.url}/#business`,
    name: site.name,
    alternateName: ["GetCar", "Get Car Lahore", "GetCar Rent A Car Lahore"],
    description: "24/7 chauffeur-driven car rental in Lahore from Rs 5,000/day for city travel, airport transfers, weddings, corporate journeys, Northern Areas tours and intercity drops.",
    url: site.url,
    hasMap: site.mapsUrl,
    sameAs: [site.mapsUrl, ...socialLinks.map((profile) => profile.url)],
    telephone: site.phoneHref,
    image: [
      `${site.url}/images/honda-civic-rs.jpg`,
      `${site.url}/images/toyota-fortuner.jpg`,
      `${site.url}/images/land-cruiser.jpeg`,
      `${site.url}/images/toyota-altis.webp`,
      `${site.url}/images/grand-cabin.jpg`,
      `${site.url}/images/get-car-driver.jpg`,
    ],
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
      { "@type": "City", name: "Islamabad" },
      { "@type": "Country", name: "Pakistan" },
      ...site.serviceAreas.map((name) => ({ "@type": "Place", name: `${name}, Lahore` })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Lahore Chauffeur Car Rental Fleet & Services",
      itemListElement: [
        ...fleet.map((vehicle) => ({
          "@type": "Offer",
          priceCurrency: "PKR",
          price: vehicle.price,
          url: `${site.url}/fleet/`,
          itemOffered: {
            "@type": "Car",
            name: vehicle.name,
            description: `${vehicle.category} (${vehicle.seats}) with driver in Lahore`,
            image: `${site.url}${vehicle.image}`,
          },
        })),
        ...services.map((service) => ({
          "@type": "Offer",
          url: `${site.url}/${service.slug}/`,
          itemOffered: {
            "@type": "Service",
            name: service.title,
            serviceType: service.serviceType,
            url: `${site.url}/${service.slug}/`,
          },
        })),
      ],
    },
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
