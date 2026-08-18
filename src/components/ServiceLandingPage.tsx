import Image from "next/image";
import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { RouteStartingRate } from "@/components/RouteStartingRate";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "@/components/Icons";
import { services, type ServicePage } from "@/lib/services";
import { site, whatsappUrl } from "@/lib/site";

export function ServiceLandingPage({ service }: { service: ServicePage }) {
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
    serviceType: service.serviceType,
    areaServed: { "@type": "City", name: "Lahore" },
    provider: { "@id": `${site.url}/#business` },
    url: `${site.url}/${service.slug}/`,
  };

  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="service-hero">
        <div className="shell service-hero-grid">
          <div className="service-hero-copy">
            <p className="eyebrow eyebrow-light"><span /> {service.eyebrow}</p>
            <h1>{service.heading}</h1>
            <p>{service.introduction}</p>
            <div className="hero-actions">
              <a className="button button-whatsapp" href={whatsappUrl(service.whatsAppMessage)} target="_blank" rel="noreferrer"><WhatsAppIcon /> Request a WhatsApp quote</a>
              <Link className="button button-ghost service-hero-secondary" href="/fleet/">Compare cars & rates <ArrowIcon /></Link>
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
            <h2>What Rajana confirms</h2>
            <ul>{service.highlights.map((highlight) => <li key={highlight}><CheckIcon /> {highlight}</li>)}</ul>
            <a href={`tel:${site.phoneHref}`}>Prefer to call? {site.phoneDisplay}</a>
          </aside>
        </div>
      </section>

      <section className="section service-booking-section">
        <div className="shell route-grid">
          <div>
            <p className="eyebrow eyebrow-light"><span /> Send these details</p>
            <h2>Get a useful quote, not a vague estimate.</h2>
            <p>Rajana can confirm the right vehicle and the full journey details faster when the booking request includes:</p>
            <ul className="plain-checks service-booking-points">{service.bookingPoints.map((point) => <li key={point}><CheckIcon /> {point}</li>)}</ul>
            <a className="button button-whatsapp" href={whatsappUrl(service.whatsAppMessage)} target="_blank" rel="noreferrer"><WhatsAppIcon /> Start the booking on WhatsApp</a>
          </div>
          <BookingForm compact />
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
          <div className="section-heading"><p className="eyebrow"><span /> Explore Rajana services</p><h2>Planning a different kind of trip?</h2></div>
          <div className="service-related-grid">{relatedServices.map((item) => <Link key={item.slug} href={`/${item.slug}/`}><small>{item.eyebrow}</small><strong>{item.title}</strong><span>Explore service <ArrowIcon /></span></Link>)}</div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
    </>
  );
}
