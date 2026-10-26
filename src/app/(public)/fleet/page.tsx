import type { Metadata } from "next";
import Link from "next/link";
import { FleetExplorer } from "@/components/FleetExplorer";
import { FleetRateTable } from "@/components/FleetRateTable";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "@/components/Icons";
import { fleet, site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Car Rental Fleet & Daily Rates in Lahore",
  description: "Compare 2026 Lahore car rental rates with driver: Wagon R Rs 5,000, Yaris & Corolla Rs 6,000, Civic Rs 10,000, Fortuner Rs 16,000, V8 & Grand Cabin.",
  alternates: { canonical: "/fleet/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: site.name,
    url: "/fleet/",
    title: "Car Rental Fleet & Daily Rates in Lahore | Get Car",
    description: "Compare Get Car Lahore chauffeur-driven daily rates for Wagon R, Yaris, Corolla, Civic, BR-V, Fortuner, Land Cruiser V8 and Grand Cabin.",
    images: [{ url: "/images/honda-civic-rs.jpg", width: 1024, height: 576, alt: "Get Car Lahore rental fleet" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Rental Fleet & Daily Rates in Lahore | Get Car",
    description: "Compare Get Car Lahore chauffeur-driven daily rates from Rs 5,000/day.",
    images: ["/images/honda-civic-rs.jpg"],
  },
};

export default function FleetPage() {
  const fleetListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Get Car Lahore Rental Fleet & Starting Daily Rates",
    url: `${site.url}/fleet/`,
    numberOfItems: fleet.length,
    itemListElement: fleet.map((vehicle, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Car",
        name: vehicle.name,
        description: `${vehicle.category} (${vehicle.seats}) with professional driver in Lahore`,
        image: `${site.url}${vehicle.image}`,
        url: `${site.url}/${vehicle.slug}/`,
        offers: {
          "@type": "Offer",
          priceCurrency: "PKR",
          price: vehicle.price,
          availability: "https://schema.org/InStock",
          url: `${site.url}/${vehicle.slug}/`,
        },
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "Fleet & Daily Rates", item: `${site.url}/fleet/` },
    ],
  };

  return (
    <>
      <section className="inner-hero">
        <div className="shell inner-hero-grid">
          <div>
            <nav className="service-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Fleet &amp; daily rates</span>
            </nav>
            <p className="eyebrow eyebrow-light"><span /> Fleet &amp; starting rates</p>
            <h1>Car rental fleet and daily rates in Lahore.</h1>
            <p>Choose an economy hatchback, comfort sedan, family 7-seater, premium 4x4 SUV or 13 to 29 passenger group van. Every booking includes a professional driver and a clear trip quote.</p>
          </div>
          <div className="inner-hero-note">
            <strong>Not sure what fits?</strong>
            <p>Share your passenger count, luggage and route. We will recommend the right vehicle.</p>
            <a href={whatsappUrl("Hello Get Car, please recommend a vehicle for my trip.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> Ask on WhatsApp</a>
          </div>
        </div>
      </section>
      <section className="section fleet-page-section">
        <div className="shell">
          <div className="fleet-page-intro"><p>Filter by vehicle type, then open WhatsApp from any car to check its availability for your route and date.</p></div>
          <FleetExplorer />
          <div className="rate-summary-block">
            <div className="section-heading">
              <p className="eyebrow"><span /> Quick rate comparison</p>
              <h2>Lahore daily &amp; intercity starting rate card</h2>
            </div>
            <FleetRateTable />
          </div>
          <div className="rate-box">
            <div><p className="eyebrow"><span /> Before you book</p><h2>What affects the final price?</h2><p>Every displayed rate includes the vehicle and professional driver. The final written quote confirms every route-specific cost before travel.</p></div>
            <ul><li><CheckIcon /> Pickup and destination</li><li><CheckIcon /> Trip duration and dates</li><li><CheckIcon /> Fuel, tolls, parking and taxes</li><li><CheckIcon /> Vehicle availability and waiting time</li><li><CheckIcon /> Passenger and luggage capacity</li><li><CheckIcon /> Driver food or accommodation for eligible trips</li></ul>
          </div>
          <div className="service-details-grid fleet-choice-guide">
            <article>
              <h3>Economy cars</h3>
              <p>Wagon R, Cultus and Yaris options from Rs 5,000 to Rs 6,000/day suit local travel, airport transfers and smaller passenger groups.</p>
              <Link className="text-link" href="/economy-car-rental-lahore/">Economy car rental guide <ArrowIcon /></Link>
            </article>
            <article>
              <h3>Comfort and executive sedans</h3>
              <p>Corolla Altis X and Honda Civic RS options suit business travel, family journeys, weddings and intercity motorway trips.</p>
              <Link className="text-link" href="/corporate-car-rental-lahore/">Corporate &amp; executive travel <ArrowIcon /></Link>
            </article>
            <article>
              <h3>Seven-seaters and SUVs</h3>
              <p>BR-V, Jaecoo J5 2026, Fortuner, Prado and Land Cruiser V8 options provide extra passenger room and highway presence.</p>
              <Link className="text-link" href="/suv-luxury-car-rental-lahore/">SUV &amp; luxury rental guide <ArrowIcon /></Link>
            </article>
            <article>
              <h3>Group vehicles</h3>
              <p>Toyota Grand Cabin and Coaster bookings seat 13 to 29 passengers for weddings, office teams and Northern Area tours.</p>
              <Link className="text-link" href="/grand-cabin-coaster-rental-lahore/">Grand Cabin &amp; Coaster rates <ArrowIcon /></Link>
            </article>
          </div>
          <div className="center-action"><Link className="button button-primary" href="/#book">Get your exact trip quote <ArrowIcon /></Link></div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(fleetListSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
    </>
  );
}
