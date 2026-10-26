import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, CheckIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { fleet, serviceAreas, site, socialLinks, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Get Car Lahore | Chauffeur Car Rental",
  description: "Learn about Get Car in DHA Phase 1, Lahore. 24/7 chauffeur-driven car, SUV and group van rentals across Lahore, Allama Iqbal Airport and intercity routes.",
  alternates: { canonical: "/about/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: site.name,
    url: "/about/",
    title: "About Get Car Lahore | Chauffeur Car Rental | Get Car",
    description: "24/7 chauffeur-driven car rental service in DHA Phase 1, Lahore with economy cars, sedans, SUVs and group vans.",
    images: [{ url: "/images/get-car-driver.jpg", alt: "Get Car chauffeur service in Lahore" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Get Car Lahore | Get Car",
    description: "24/7 chauffeur-driven car rental service operating from DHA Phase 1, Lahore.",
    images: ["/images/get-car-driver.jpg"],
  },
};

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Get Car Lahore",
    url: `${site.url}/about/`,
    description: "Company profile, DHA Phase 1 office location, fleet standards and service coverage for Get Car in Lahore, Pakistan.",
    mainEntity: { "@id": `${site.url}/#business` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "About Get Car", item: `${site.url}/about/` },
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
              <span>About Get Car</span>
            </nav>
            <p className="eyebrow eyebrow-light"><span /> DHA Phase 1, Lahore</p>
            <h1>Practical chauffeur-driven car rental built in Lahore.</h1>
            <p>Get Car operates 24 hours a day from DHA Phase 1, Lahore, supplying clean air-conditioned cars, 4x4 SUVs and 13 to 29 passenger group vans with experienced drivers across Lahore and intercity routes throughout Pakistan.</p>
          </div>
          <div className="inner-hero-note">
            <strong>{site.googleRating} Google rating</strong>
            <p>Rated {site.googleRating} out of 5 across {site.googleReviewCount} customer reviews on Google Maps.</p>
            <a href={site.mapsUrl} target="_blank" rel="noreferrer"><MapPinIcon size={17} /> View Google Business Profile</a>
          </div>
        </div>
      </section>

      <section className="section service-overview">
        <div className="shell service-overview-grid">
          <div>
            <p className="eyebrow"><span /> How Get Car operates</p>
            <h2>Clear written quotes and driver-led travel</h2>
            <p>Finding dependable transport in Lahore for an early airport flight, visiting family, corporate delegation, wedding event or Northern Pakistan tour should not involve last-minute vehicle swaps or unclear charges.</p>
            <p>Get Car publishes transparent starting daily rates from Rs 5,000/day up to Rs 25,000/day across {fleet.length} vehicle categories, confirms exact route costs in writing on WhatsApp before every trip, and assigns a local chauffeur familiar with Lahore neighbourhoods and national motorways.</p>
          </div>
          <aside className="service-highlights" aria-label="Company highlights">
            <h2>Verified company facts</h2>
            <ul>
              <li><CheckIcon /> Office at {site.shortAddress}</li>
              <li><CheckIcon /> Open 24 hours, 7 days a week</li>
              <li><CheckIcon /> Direct booking line: {site.phoneDisplay}</li>
              <li><CheckIcon /> {fleet.length} vehicle classes (4 to 29 seats)</li>
            </ul>
            <Link href="/terms/">Read full rental terms &amp; policy</Link>
          </aside>
        </div>
      </section>

      <section className="section service-details-section">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow"><span /> Service standards</p>
            <h2>What every Get Car booking prioritises</h2>
          </div>
          <div className="service-details-grid">
            <article>
              <h3>Driver included as standard</h3>
              <p>Every public fleet booking includes a professional driver so passengers avoid Lahore traffic stress, parking searches and heavy self-drive security deposits.</p>
            </article>
            <article>
              <h3>Fleet from economy to V8 &amp; Coaster</h3>
              <p>Book Suzuki Wagon R, Cultus, Toyota Yaris, Corolla GLi, Corolla Altis X, Honda BR-V, Honda Civic RS, Jaecoo J5 2026, Toyota Fortuner, Prado, Land Cruiser V8, Grand Cabin or Coaster.</p>
            </article>
            <article>
              <h3>City, airport &amp; all-Pakistan coverage</h3>
              <p>Doorstep pickups cover homes, hotels, offices, marquees and Allama Iqbal International Airport for local Lahore schedules, Islamabad drops and Northern Area tours.</p>
            </article>
            <article>
              <h3>Single verified WhatsApp desk</h3>
              <p>All quotes, vehicle confirmations and booking updates run through {site.phoneDisplay} on Get Car&apos;s official website and verified Google Business Profile.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section local-proof-section">
        <div className="shell local-proof-grid">
          <div>
            <p className="eyebrow"><span /> Office &amp; pickup areas</p>
            <h2>Where to find and reach Get Car in Lahore</h2>
            <p>Visit or contact our DHA Phase 1 dispatch team 24/7 for immediate availability across major Lahore residential and commercial zones:</p>
            <div className="area-list" aria-label="Lahore pickup areas">
              {serviceAreas.map((area) => <span key={area}>{area}</span>)}
            </div>
            <div className="local-nap-details">
              <a className="local-address-link" href={site.mapsUrl} target="_blank" rel="noreferrer"><MapPinIcon /> {site.address}</a>
              <a className="local-address-link" href={`tel:${site.phoneHref}`}><PhoneIcon size={17} /> {site.phoneDisplay} (Open 24/7)</a>
            </div>
            <div className="local-map-frame">
              <iframe
                src={site.mapEmbedUrl}
                title="Get Car office location in DHA Phase 1, Lahore"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <aside className="booking-terms-card">
            <p className="eyebrow"><span /> Official profiles</p>
            <h2>Connect with Get Car online</h2>
            <ul>
              {socialLinks.map((profile) => (
                <li key={profile.name}>
                  <CheckIcon />
                  <a href={profile.url} target="_blank" rel="me noreferrer">{profile.name}: {profile.url.replace("https://www.", "")}</a>
                </li>
              ))}
            </ul>
            <Link className="google-profile-card" href="/fleet/">
              <strong>Explore all {fleet.length} fleet options &amp; rates</strong>
              <span>Compare daily PKR starting prices and book directly on WhatsApp.</span>
            </Link>
          </aside>
        </div>
      </section>

      <section className="cta-band">
        <div className="shell cta-band-inner">
          <div><small>Ready to plan your journey?</small><h2>Speak directly with the Get Car Lahore team.</h2></div>
          <a className="button button-whatsapp" href={whatsappUrl("Hello Get Car, I would like to check car availability in Lahore.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> Message on WhatsApp <ArrowIcon /></a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
    </>
  );
}
