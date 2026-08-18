import Image from "next/image";
import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { FleetCard } from "@/components/FleetCard";
import { ArrowIcon, CheckIcon, ClockIcon, MapPinIcon, PlaneIcon, ShieldIcon, UsersIcon, WhatsAppIcon } from "@/components/Icons";
import { fleet, whatsappUrl } from "@/lib/site";

const faqs = [
  ["Do your rental cars come with a driver?", "Yes. Rajana provides chauffeur-driven car rental so you can travel without worrying about routes, parking or driving fatigue."],
  ["Can I book a Lahore Airport pickup?", "Yes. Share your flight time, pickup date and passenger count on WhatsApp. We will confirm the car, driver and final price before the trip."],
  ["Do you offer one-way Lahore to Islamabad trips?", "Yes. One-way intercity drops are available. The current advertised Lahore to Islamabad starting rate is Rs 25,000; confirm the final all-inclusive quote before booking."],
  ["How do I reserve a vehicle?", "Send your route, date, passenger count and preferred vehicle on WhatsApp or call us. We will confirm availability and any advance required."],
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
              <a className="button button-whatsapp" href={whatsappUrl("Hello Rajana Car Rental, I need a car in Lahore. Please share availability and price.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> Get a WhatsApp quote</a>
              <Link className="button button-ghost" href="/fleet/">View fleet & rates <ArrowIcon /></Link>
            </div>
            <div className="hero-assurances">
              <span><CheckIcon /> 24/7 booking</span>
              <span><CheckIcon /> Professional drivers</span>
              <span><CheckIcon /> Clear quote first</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap">
              <Image src="/images/honda-civic-rs.jpg" alt="Black Honda Civic RS from Rajana Car Rental on the road" fill preload sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
            <div className="route-card">
              <span className="route-icon"><MapPinIcon /></span>
              <div><small>Popular one-way route</small><strong>Lahore → Islamabad</strong><span>From Rs 25,000*</span></div>
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
          <div className="fleet-grid">
            {fleet.slice(0, 6).map((car, index) => <FleetCard key={car.name} car={car} featured={index === 0} />)}
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
            <Image src="/images/rajana-driver.jpg" alt="Clean Toyota interior prepared for a Rajana Car Rental journey" fill sizes="(max-width: 850px) 100vw, 50vw" />
            <div><strong>DHA Lahore</strong><span>Local team. Pakistan-wide travel.</span></div>
          </div>
          <div className="about-copy">
            <p className="eyebrow"><span /> Why Rajana</p>
            <h2>Local knowledge makes every journey easier.</h2>
            <p>Rajana is a Lahore-based car rental service focused on practical, comfortable travel. Our drivers know the city routes and major intercity roads, helping families, visitors and business travellers reach their destination without the usual transport stress.</p>
            <div className="feature-list">
              <div><ShieldIcon /><span><strong>Reliable vehicles</strong><small>Options for city, family, group and executive travel.</small></span></div>
              <div><UsersIcon /><span><strong>Driver-led service</strong><small>No route planning, parking or unfamiliar-road worries.</small></span></div>
              <div><ClockIcon /><span><strong>Responsive booking</strong><small>Direct contact by phone and business WhatsApp.</small></span></div>
            </div>
            <Link className="button button-dark" href="/rent-a-car-lahore/">Explore Lahore services <ArrowIcon /></Link>
          </div>
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
          <a className="button button-whatsapp" href={whatsappUrl("Hello Rajana Car Rental, I need a car today. My pickup location is: ")} target="_blank" rel="noreferrer"><WhatsAppIcon /> Message on WhatsApp</a>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
    </>
  );
}
