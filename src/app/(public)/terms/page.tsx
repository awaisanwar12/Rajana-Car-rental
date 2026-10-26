import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, CheckIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Car Rental Terms & Booking Policy in Lahore",
  description: "Read Get Car Lahore booking terms: chauffeur-included rates, local vs outstation pricing, fuel and toll rules, Northern Area terms and payment confirmation.",
  alternates: { canonical: "/terms/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: site.name,
    url: "/terms/",
    title: "Car Rental Terms & Booking Policy in Lahore | Get Car",
    description: "Transparent booking, rate, fuel, toll and outstation terms for chauffeur-driven car rentals with Get Car Lahore.",
    images: [{ url: "/images/honda-civic-rs.jpg", alt: "Get Car Lahore rental terms and policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Rental Terms & Booking Policy | Get Car",
    description: "Transparent chauffeur car rental terms and booking rules in Lahore.",
    images: ["/images/honda-civic-rs.jpg"],
  },
};

export default function TermsPage() {
  const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Get Car Lahore Rental Terms & Booking Policy",
    url: `${site.url}/terms/`,
    description: "Published rental terms covering chauffeur service, base daily rates, route expenses, outstation travel and booking confirmation.",
    about: { "@id": `${site.url}/#business` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "Rental terms & policy", item: `${site.url}/terms/` },
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
              <span>Rental terms &amp; policy</span>
            </nav>
            <p className="eyebrow eyebrow-light"><span /> Clear written terms</p>
            <h1>Car rental terms and booking policy in Lahore.</h1>
            <p>Every Get Car booking is confirmed in writing before departure so you know exactly what the daily vehicle rate covers and how route-specific expenses apply.</p>
          </div>
          <div className="inner-hero-note">
            <strong>Questions before booking?</strong>
            <p>Request a written breakdown for your exact route, dates and passenger count on WhatsApp.</p>
            <a href={whatsappUrl("Hello Get Car, please share the complete booking terms and quote for my route.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> Confirm on WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="section service-overview">
        <div className="shell service-overview-grid">
          <div>
            <p className="eyebrow"><span /> Rate transparency</p>
            <h2>What displayed starting rates cover</h2>
            <p>All starting prices published on {site.url.replace("https://", "")} include the selected vehicle and a professional Get Car chauffeur. Public fleet rentals are provided with a driver rather than self-drive.</p>
            <p>Final trip pricing depends on the confirmed route, travel dates, duration, waiting time and vehicle availability. Fuel, motorway or highway tolls, parking fees and applicable taxes are settled according to your actual itinerary and confirmed before booking.</p>
          </div>
          <aside className="service-highlights" aria-label="Key booking terms">
            <h2>Summary at a glance</h2>
            <ul>
              <li><CheckIcon /> Vehicle and chauffeur included in base rate</li>
              <li><CheckIcon /> Fuel, tolls, parking &amp; taxes quoted by route</li>
              <li><CheckIcon /> Written WhatsApp confirmation before dispatch</li>
              <li><CheckIcon /> Cash, Bank Transfer &amp; JazzCash accepted</li>
            </ul>
            <a href={`tel:${site.phoneHref}`}><PhoneIcon size={16} /> Call {site.phoneDisplay}</a>
          </aside>
        </div>
      </section>

      <section className="section service-details-section">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow"><span /> Route &amp; vehicle rules</p>
            <h2>Specific terms by trip and vehicle class</h2>
          </div>
          <div className="service-details-grid">
            <article>
              <h3>Local vs out-of-city economy rates</h3>
              <p>Suzuki Wagon R and Cultus rentals start at Rs 5,000/day for local Lahore travel and Rs 6,000/day for out-of-city trips, without fuel, tolls, parking, driver food and accommodation.</p>
            </article>
            <article>
              <h3>Grand Cabin, Coaster &amp; Northern Areas</h3>
              <p>Grand Cabin rentals start from Rs 15,000/day and out-of-city Coaster bookings start at Rs 25,000/day, without fuel, tolls, parking, driver food and accommodation. Traffic challans are the customer&apos;s responsibility if the vehicle travels to Northern Areas.</p>
            </article>
            <article>
              <h3>Intercity drops &amp; multi-day trips</h3>
              <p>One-way intercity drops (such as Lahore to Islamabad starting from Rs 25,000) and multi-day tours have vehicle class, motorway tolls, fuel and any overnight driver food or accommodation confirmed in writing beforehand.</p>
            </article>
            <article>
              <h3>Reservation, schedule changes &amp; payment</h3>
              <p>Share accurate pickup locations, flight numbers, stops and waiting requirements when requesting a quote. Bookings are confirmed through {site.phoneDisplay} with payment accepted via Cash, Bank Transfer or JazzCash.</p>
            </article>
          </div>
          <div className="center-action">
            <Link className="button button-primary" href="/fleet/">Compare fleet &amp; daily rates <ArrowIcon /></Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(termsSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
    </>
  );
}
