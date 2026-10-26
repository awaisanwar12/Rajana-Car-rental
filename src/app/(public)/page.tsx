import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { FleetPreview } from "@/components/FleetPreview";
import { FleetRateTable } from "@/components/FleetRateTable";
import { RouteStartingRate } from "@/components/RouteStartingRate";
import { ArrowIcon, CheckIcon, ClockIcon, MapPinIcon, PhoneIcon, PlaneIcon, ShieldIcon, UsersIcon, WhatsAppIcon } from "@/components/Icons";
import { services } from "@/lib/services";
import { serviceAreas, site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: site.name,
    url: "/",
    title: "Rent a Car in Lahore with Driver | 24/7 Rates | Get Car",
    description: "24/7 chauffeur-driven cars, SUVs and Grand Cabins in Lahore from Rs 5,000/day. Request an exact quote on WhatsApp.",
    images: [{ url: "/images/honda-civic-rs.jpg", width: 1024, height: 576, alt: "Get Car Lahore chauffeur car rental" }],
  },
};

const faqs = [
  ["Do your rental cars come with a driver?", "Yes. Get Car provides chauffeur-driven car rental so you can travel without worrying about routes, parking or driving fatigue."],
  ["What is the lowest daily car rental rate in Lahore?", "Chauffeur-driven Suzuki Wagon R and Cultus rentals start from Rs 5,000/day within Lahore and Rs 6,000/day out of city, while Toyota Yaris and Corolla GLi start from Rs 6,000/day."],
  ["Can I book a Lahore Airport pickup or drop-off?", "Yes. Share your flight time, pickup date and passenger count on WhatsApp. We confirm the car, driver and final price before your flight."],
  ["Do you offer one-way Lahore to Islamabad trips?", "Yes. One-way and return intercity trips are available 24/7. The starting rate is displayed on the site; confirm your all-inclusive quote before booking."],
  ["Do you have Grand Cabins, Coasters and SUVs for families or tours?", "Yes. Our fleet includes Honda BR-V (6 passengers), Toyota Fortuner, Prado, Land Cruiser V8, and 13 to 29 passenger Toyota Grand Cabins and Coasters for weddings, corporate teams and Northern Area tours."],
  ["Which areas of Lahore do you serve?", `Pickup can be requested across Lahore, including ${serviceAreas.join(", ")}. Availability and the final pickup time are confirmed for each booking.`],
  ["What is included in the displayed rental rate?", "The vehicle and professional driver are included. Fuel, motorway tolls, parking, taxes, waiting time and outstation driver food or accommodation are quoted according to your route."],
  ["How do I reserve a vehicle?", "Send your route, date, passenger count and preferred vehicle on WhatsApp or call +92 303 6565672. We confirm availability and any advance required in writing."],
];

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Lahore · Airport · All Pakistan</p>
            <h1>Rent a car in Lahore.<br /><em>Driver included.</em></h1>
            <p className="hero-lead">Clean cars, experienced drivers and clear trip pricing, available 24/7 from Rs 5,000/day for city travel, airport transfers, weddings, Northern Areas tours and one-way intercity drops.</p>
            <div className="hero-actions">
              <a className="button button-whatsapp" href={whatsappUrl("Hello Get Car, I need a car in Lahore. Please share availability and price.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> Get a WhatsApp quote</a>
              <Link className="button button-ghost" href="/fleet/">View fleet &amp; rates <ArrowIcon /></Link>
            </div>
            <div className="route-card">
              <span className="route-icon"><MapPinIcon /></span>
              <div><small>Popular one-way route</small><strong>Lahore → Islamabad</strong><span><RouteStartingRate /></span></div>
            </div>
            <div className="hero-assurances">
              <span><CheckIcon /> 24/7 booking</span>
              <span><CheckIcon /> Professional drivers</span>
              <span><CheckIcon /> Clear quote first</span>
              <a className="google-review-link" href={site.mapsUrl} target="_blank" rel="noreferrer">Google rating {site.googleRating} from {site.googleReviewCount} reviews</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap">
              <Image src="/images/honda-civic-rs.jpg" alt="Black Honda Civic RS from Get Car on the road in Lahore" fill preload sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
            <span className="hero-index" aria-hidden="true">24/7</span>
          </div>
        </div>
      </section>

      <section className="service-strip" aria-label="Rental services">
        <div className="shell service-strip-grid">
          <div><ClockIcon /><span><strong>Available 24/7</strong><small>Call whenever you travel</small></span></div>
          <div><PlaneIcon /><span><strong>Airport transfers</strong><small>Pickup and drop-off</small></span></div>
          <div><ShieldIcon /><span><strong>Driver included</strong><small>Comfortable, stress-free trips</small></span></div>
          <div><MapPinIcon /><span><strong>All Pakistan</strong><small>One-way and intercity travel</small></span></div>
        </div>
      </section>

      <section className="section fleet-section" id="fleet">
        <div className="shell">
          <div className="section-heading heading-split">
            <div><p className="eyebrow"><span /> Choose your ride</p><h2>Cars &amp; daily rates in Lahore</h2></div>
            <div><p>Economy hatchbacks, sedans, family 7-seaters, luxury 4x4 SUVs and 13 to 29 passenger group vans, all with a professional driver.</p><Link className="text-link" href="/fleet/">Filter the full fleet <ArrowIcon /></Link></div>
          </div>
          <FleetPreview />
          <div className="rate-summary-block" id="rates">
            <div className="rate-summary-header">
              <div>
                <p className="eyebrow"><span /> Transparent rate card</p>
                <h3>Compare Lahore daily &amp; intercity starting prices</h3>
              </div>
              <p>Rates include the vehicle and driver. Confirm fuel, motorway tolls, parking and route specifics on WhatsApp before booking.</p>
            </div>
            <FleetRateTable />
          </div>
          <p className="price-note">*Displayed rates are starting prices from the current rate card. Fuel, tolls, taxes, route and seasonal availability may affect the final quote.</p>
        </div>
      </section>

      <section className="section booking-section" id="book">
        <div className="shell booking-grid">
          <div className="booking-copy">
            <p className="eyebrow eyebrow-light"><span /> Simple booking</p>
            <h2>A confirmed ride is only one message away.</h2>
            <p>Tell us where and when you are travelling. Your details open in WhatsApp, where our team confirms availability and the final price.</p>
            <ol className="steps">
              <li><span>01</span><div><strong>Share your trip</strong><p>Route, date, passengers and car preference.</p></div></li>
              <li><span>02</span><div><strong>Receive your quote</strong><p>We confirm the vehicle, driver and total price.</p></div></li>
              <li><span>03</span><div><strong>Travel comfortably</strong><p>Your driver arrives at the confirmed pickup point.</p></div></li>
            </ol>
          </div>
          <BookingForm />
        </div>
      </section>

      <section className="section about-section">
        <div className="shell about-grid">
          <div className="about-image">
            <Image src="/images/get-car-driver.jpg" alt="Clean Toyota interior prepared for a Get Car journey" fill sizes="(max-width: 850px) 100vw, 50vw" />
            <div><strong>DHA Lahore</strong><span>Local team. Pakistan-wide travel.</span></div>
          </div>
          <div className="about-copy">
            <p className="eyebrow"><span /> Why Get Car</p>
            <h2>Local knowledge makes every journey easier.</h2>
            <p>Get Car is a Lahore-based car rental service focused on practical, comfortable travel. Our drivers know the city routes and major intercity roads, helping families, visitors and business travellers reach their destination without the usual transport stress.</p>
            <p>The service operates online as Get Car at getcarlahore.com from DHA Phase 1, Lahore. The official website and Google Business Profile share the same 24/7 booking number.</p>
            <div className="feature-list">
              <div><ShieldIcon /><span><strong>Reliable vehicles</strong><small>Economy cars, Corolla, Civic RS, BR-V, Fortuner, V8 and Grand Cabin.</small></span></div>
              <div><UsersIcon /><span><strong>Driver-led service</strong><small>No route planning, parking or unfamiliar-road worries.</small></span></div>
              <div><ClockIcon /><span><strong>Responsive booking</strong><small>Direct contact by phone and business WhatsApp 24 hours a day.</small></span></div>
            </div>
            <Link className="button button-dark" href="/car-rental-with-driver-lahore/">Explore Lahore services <ArrowIcon /></Link>
          </div>
        </div>
      </section>

      <section className="section local-proof-section" id="location">
        <div className="shell local-proof-grid">
          <div>
            <p className="eyebrow"><span /> Lahore pickup areas &amp; office</p>
            <h2>Request a rental car from your part of Lahore.</h2>
            <p>Get Car arranges chauffeur-driven pickups for homes, hotels, offices, wedding venues and Allama Iqbal International Airport. Send the exact pickup point so the team can confirm the available car, arrival time and complete quote.</p>
            <div className="area-list" aria-label="Lahore car rental service areas">
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
            <p className="eyebrow"><span /> Clear rental terms</p>
            <h2>Know what your quote covers.</h2>
            <ul>
              <li><CheckIcon /> The listed starting rate includes the vehicle and driver.</li>
              <li><CheckIcon /> The final price depends on the route, date, duration and selected vehicle.</li>
              <li><CheckIcon /> Fuel, tolls, parking, taxes and waiting time are confirmed before booking.</li>
              <li><CheckIcon /> Intercity and group trips may include driver food or accommodation.</li>
            </ul>
            <a className="google-profile-card" href={site.mapsUrl} target="_blank" rel="noreferrer"><strong>{site.googleRating} Google rating</strong><span>Based on {site.googleReviewCount} customer reviews. View the profile.</span></a>
          </aside>
        </div>
      </section>

      <section className="section home-services-section" id="services">
        <div className="shell">
          <div className="section-heading heading-split">
            <div><p className="eyebrow"><span /> Travel services</p><h2>Choose the service that fits your trip.</h2></div>
            <div><p>Dedicated Lahore car rental guides and starting rates for airport transfers, economy cars, SUVs, group vans, weddings, corporate travel and outstation trips.</p></div>
          </div>
          <div className="home-service-links">
            {services.map((service) => (
              <Link key={service.slug} href={`/${service.slug}/`}>
                <strong>{service.shortLabel}</strong>
                <span>{service.cardSummary} <ArrowIcon /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="shell faq-grid">
          <div className="section-heading sticky-heading"><p className="eyebrow"><span /> Good to know</p><h2>Frequently asked questions</h2><p>For an exact trip price, send your route and travel date on WhatsApp.</p></div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="shell cta-band-inner">
          <div><small>Need a car today?</small><h2>Tell us your route. We’ll handle the ride.</h2></div>
          <a className="button button-whatsapp" href={whatsappUrl("Hello Get Car, I need a car today. My pickup location is: ")} target="_blank" rel="noreferrer"><WhatsAppIcon /> Message on WhatsApp</a>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
    </>
  );
}
