import Image from "next/image";
import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { FleetPreview } from "@/components/FleetPreview";
import { RouteStartingRate } from "@/components/RouteStartingRate";
import { ArrowIcon, CheckIcon, ClockIcon, MapPinIcon, PlaneIcon, ShieldIcon, UsersIcon, WhatsAppIcon } from "@/components/Icons";
import { serviceAreas, site, whatsappUrl } from "@/lib/site";

const faqs = [
  ["Do your rental cars come with a driver?", "Yes. Get Car provides chauffeur-driven car rental so you can travel without worrying about routes, parking or driving fatigue."],
  ["Can I book a Lahore Airport pickup?", "Yes. Share your flight time, pickup date and passenger count on WhatsApp. We will confirm the car, driver and final price before the trip."],
  ["Do you offer one-way Lahore to Islamabad trips?", "Yes. One-way intercity drops are available. The public starting price is updated regularly; confirm the final all-inclusive quote before booking."],
  ["How do I reserve a vehicle?", "Send your route, date, passenger count and preferred vehicle on WhatsApp or call us. We will confirm availability and any advance required."],
  ["Which areas of Lahore do you serve?", `Pickup can be requested across Lahore, including ${serviceAreas.join(", ")}. Availability and the final pickup time are confirmed for each booking.`],
  ["What is included in the displayed rental rate?", "The vehicle and professional driver are included. Fuel, motorway tolls, parking, taxes, waiting time and driver accommodation may be quoted separately depending on the route."],
  ["Was Get Car previously Rajana Car Rental?", "Yes. Get Car is the current name and website for the Lahore car rental service previously known as Rajana Car Rental."],
];

export default function Home() {
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };

  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Lahore · Airport · All Pakistan</p>
            <h1>Rent a car in Lahore.<br /><em>Driver included.</em></h1>
            <p className="hero-lead">Clean cars, experienced drivers and honest trip pricing—available 24/7 for airport pickups, family travel, business trips and one-way drops.</p>
            <div className="hero-actions">
              <a className="button button-whatsapp" href={whatsappUrl("Hello Get Car, I need a car in Lahore. Please share availability and price.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> Get a WhatsApp quote</a>
              <Link className="button button-ghost" href="/fleet/">View fleet & rates <ArrowIcon /></Link>
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
              <Image src="/images/honda-civic-rs.jpg" alt="Black Honda Civic RS from Get Car on the road" fill preload sizes="(max-width: 900px) 100vw, 50vw" />
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
            <div><p className="eyebrow"><span /> Choose your ride</p><h2>Cars for every kind of trip</h2></div>
            <div><p>Economy sedans, family 7-seaters, premium SUVs and group vans—all available with a professional driver.</p><Link className="text-link" href="/fleet/">View the full fleet <ArrowIcon /></Link></div>
          </div>
          <FleetPreview />
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
            <Image src="/images/rajana-driver.jpg" alt="Clean Toyota interior prepared for a Get Car journey" fill sizes="(max-width: 850px) 100vw, 50vw" />
            <div><strong>DHA Lahore</strong><span>Local team. Pakistan-wide travel.</span></div>
          </div>
          <div className="about-copy">
            <p className="eyebrow"><span /> Why Get Car</p>
            <h2>Local knowledge makes every journey easier.</h2>
            <p>Get Car is a Lahore-based car rental service focused on practical, comfortable travel. Our drivers know the city routes and major intercity roads, helping families, visitors and business travellers reach their destination without the usual transport stress.</p>
            <p>Previously known as {site.formerName}, the service now operates online as Get Car at getcarlahore.com. The official website and Google Business Profile use the same booking number.</p>
            <div className="feature-list">
              <div><ShieldIcon /><span><strong>Reliable vehicles</strong><small>Options for city, family, group and executive travel.</small></span></div>
              <div><UsersIcon /><span><strong>Driver-led service</strong><small>No route planning, parking or unfamiliar-road worries.</small></span></div>
              <div><ClockIcon /><span><strong>Responsive booking</strong><small>Direct contact by phone and business WhatsApp.</small></span></div>
            </div>
            <Link className="button button-dark" href="/rent-a-car-lahore/">Explore Lahore services <ArrowIcon /></Link>
          </div>
        </div>
      </section>

      <section className="section local-proof-section">
        <div className="shell local-proof-grid">
          <div>
            <p className="eyebrow"><span /> Lahore pickup areas</p>
            <h2>Request a rental car from your part of Lahore.</h2>
            <p>Get Car arranges chauffeur-driven pickups for homes, hotels, offices, wedding venues and Allama Iqbal International Airport. Send the exact pickup point so the team can confirm the available car, arrival time and complete quote.</p>
            <div className="area-list" aria-label="Lahore car rental service areas">
              {serviceAreas.map((area) => <span key={area}>{area}</span>)}
            </div>
            <a className="local-address-link" href={site.mapsUrl} target="_blank" rel="noreferrer"><MapPinIcon /> {site.address}</a>
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

      <section className="section home-services-section">
        <div className="shell">
          <div className="section-heading heading-split">
            <div><p className="eyebrow"><span /> Travel services</p><h2>Choose the page that fits your trip.</h2></div>
            <div><p>Useful booking guidance for airport travel, driver-led rentals, weddings, corporate travel and Lahore to Islamabad journeys.</p></div>
          </div>
          <div className="home-service-links">
            <Link href="/car-rental-with-driver-lahore/"><strong>Car rental with driver</strong><span>City and intercity travel <ArrowIcon /></span></Link>
            <Link href="/lahore-airport-car-rental/"><strong>Lahore airport transfer</strong><span>Pickup and drop-off planning <ArrowIcon /></span></Link>
            <Link href="/lahore-to-islamabad-car-rental/"><strong>Lahore to Islamabad</strong><span>One-way and return travel <ArrowIcon /></span></Link>
            <Link href="/wedding-car-rental-lahore/"><strong>Wedding car rental</strong><span>Transport for events and guests <ArrowIcon /></span></Link>
            <Link href="/corporate-car-rental-lahore/"><strong>Corporate car rental</strong><span>Client, office and business travel <ArrowIcon /></span></Link>
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
