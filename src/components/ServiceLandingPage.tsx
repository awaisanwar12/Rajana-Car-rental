import Image from "next/image";
import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { FleetPreview } from "@/components/FleetPreview";
import { RouteStartingRate } from "@/components/RouteStartingRate";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "@/components/Icons";
import { services, type ServicePage } from "@/lib/services";
import { fleet, site, whatsappUrl } from "@/lib/site";
import { vehiclePageBySlug, vehiclePages } from "@/lib/vehicle-pages";

const vehicleById = new Map(fleet.map((vehicle) => [vehicle.id, vehicle]));

export function ServiceLandingPage({ service }: { service: ServicePage }) {
  const isVehicleModelPage = vehiclePageBySlug.has(service.slug);
  const primaryVehicle = service.primaryVehicleId ? vehicleById.get(service.primaryVehicleId) : undefined;
  const serviceVehicles = service.vehicleIds
    .map((id) => vehicleById.get(id))
    .filter((vehicle): vehicle is (typeof fleet)[number] => Boolean(vehicle));
  const prices = serviceVehicles.map((vehicle) => vehicle.price);
  const pageUrl = `${site.url}/${service.slug}/`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.serviceType,
    image: `${site.url}${service.image}`,
    areaServed: [
      { "@type": "City", name: "Lahore" },
      ...site.serviceAreas.map((name) => ({ "@type": "Place", name: `${name}, Lahore` })),
    ],
    provider: { "@id": `${site.url}/#business` },
    url: pageUrl,
    ...(prices.length > 0
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "PKR",
            lowPrice: Math.min(...prices),
            highPrice: Math.max(...prices),
            offerCount: prices.length,
          },
        }
      : {}),
  };

  const carSchema = primaryVehicle
    ? {
        "@context": "https://schema.org",
        "@type": "Car",
        name: primaryVehicle.name,
        description: service.description,
        image: `${site.url}${primaryVehicle.image}`,
        url: pageUrl,
        seatingCapacity: primaryVehicle.seats,
        offers: {
          "@type": "Offer",
          priceCurrency: "PKR",
          price: primaryVehicle.price,
          availability: "https://schema.org/InStock",
          url: pageUrl,
          seller: { "@id": `${site.url}/#business` },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            priceCurrency: "PKR",
            price: primaryVehicle.price,
            unitCode: "DAY",
          },
        },
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: isVehicleModelPage
      ? [
          { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
          { "@type": "ListItem", position: 2, name: "Fleet & daily rates", item: `${site.url}/fleet/` },
          { "@type": "ListItem", position: 3, name: service.shortLabel, item: pageUrl },
        ]
      : [
          { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
          { "@type": "ListItem", position: 2, name: service.shortLabel, item: pageUrl },
        ],
  };

  const currentIndex = services.findIndex((item) => item.slug === service.slug);
  const vehicleIndex = vehiclePages.findIndex((item) => item.slug === service.slug);
  const relatedServices =
    vehicleIndex >= 0
      ? [
          ...Array.from({ length: 3 }, (_, offset) => vehiclePages[(vehicleIndex + offset + 1) % vehiclePages.length]),
          ...Array.from({ length: 3 }, (_, offset) => services[(vehicleIndex + offset) % services.length]),
        ]
      : Array.from({ length: Math.min(6, services.length - 1) }, (_, offset) => {
          const nextIndex = (currentIndex + offset + 1) % services.length;
          return services[nextIndex];
        });

  return (
    <>
      <section className="service-hero">
        <div className="shell service-hero-grid">
          <div className="service-hero-copy">
            <nav className="service-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              {isVehicleModelPage && (
                <>
                  <Link href="/fleet/">Fleet &amp; daily rates</Link>
                  <span>/</span>
                </>
              )}
              <span>{service.shortLabel}</span>
            </nav>
            <p className="eyebrow eyebrow-light"><span /> {service.eyebrow}</p>
            <h1>{service.heading}</h1>
            <p>{service.introduction}</p>
            <div className="hero-actions">
              <a className="button button-whatsapp" href={whatsappUrl(service.whatsAppMessage)} target="_blank" rel="noreferrer"><WhatsAppIcon /> Request a WhatsApp quote</a>
              <Link className="button button-ghost service-hero-secondary" href="/fleet/">Compare cars &amp; rates <ArrowIcon /></Link>
            </div>
          </div>
          <div className="service-hero-image">
            <Image src={service.image} alt={service.imageAlt} fill preload sizes="(max-width: 850px) 100vw, 42vw" />
            <span>{service.slug === "lahore-to-islamabad-car-rental" ? <RouteStartingRate /> : service.imageNote}</span>
          </div>
        </div>
      </section>

      <section className="section service-overview">
        <div className="shell service-overview-grid">
          <div>
            <p className="eyebrow"><span /> Booking made clear</p>
            <h2>{service.planningTitle}</h2>
            {service.planningCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <aside className="service-highlights" aria-label="Service highlights">
            <h2>What Get Car confirms</h2>
            <ul>{service.highlights.map((highlight) => <li key={highlight}><CheckIcon /> {highlight}</li>)}</ul>
            <a href={`tel:${site.phoneHref}`}>Prefer to call? {site.phoneDisplay}</a>
          </aside>
        </div>
      </section>

      {serviceVehicles.length > 0 && (
        <section className="section service-fleet-section">
          <div className="shell">
            <div className="section-heading heading-split">
              <div>
                <p className="eyebrow"><span /> Fleet &amp; starting rates</p>
                <h2>Cars &amp; rates: {service.shortLabel}</h2>
              </div>
              <div>
                <p>Every vehicle includes a professional driver. Share your exact route and timing on WhatsApp for a confirmed trip quote.</p>
                <Link className="text-link" href="/fleet/">View all 9 fleet options <ArrowIcon /></Link>
              </div>
            </div>
            <FleetPreview vehicles={serviceVehicles} />
          </div>
        </section>
      )}

      <section className="section service-details-section">
        <div className="shell">
          <div className="section-heading"><p className="eyebrow"><span /> Local booking guidance</p><h2>{service.detailsTitle}</h2></div>
          <div className="service-details-grid">
            {service.details.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section service-booking-section">
        <div className="shell route-grid">
          <div>
            <p className="eyebrow eyebrow-light"><span /> Send these details</p>
            <h2>Get a useful quote, not a vague estimate.</h2>
            <p>Get Car can confirm the right vehicle and the full journey details faster when the booking request includes:</p>
            <ul className="plain-checks service-booking-points">{service.bookingPoints.map((point) => <li key={point}><CheckIcon /> {point}</li>)}</ul>
            <a className="button button-whatsapp" href={whatsappUrl(service.whatsAppMessage)} target="_blank" rel="noreferrer"><WhatsAppIcon /> Start the booking on WhatsApp</a>
          </div>
          <BookingForm compact defaultCar={primaryVehicle?.name} />
        </div>
      </section>

      <section className="section service-faq-section">
        <div className="shell faq-grid">
          <div className="section-heading sticky-heading"><p className="eyebrow"><span /> Before you book</p><h2>Common questions</h2><p>Every booking is confirmed directly before travel.</p></div>
          <div className="faq-list">{service.faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="service-related">
        <div className="shell">
          <div className="section-heading"><p className="eyebrow"><span /> Explore Get Car services</p><h2>Planning a different kind of trip?</h2></div>
          <div className="service-related-grid">{relatedServices.map((item) => <Link key={item.slug} href={`/${item.slug}/`}><small>{item.eyebrow}</small><strong>{item.shortLabel}</strong><span>{item.cardSummary} <ArrowIcon /></span></Link>)}</div>
        </div>
      </section>

      {carSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(carSchema).replace(/</g, "\\u003c") }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
    </>
  );
}
