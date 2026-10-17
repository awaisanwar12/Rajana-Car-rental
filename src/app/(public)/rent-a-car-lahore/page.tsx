import type { Metadata } from "next";
import Image from "next/image";
import { BookingForm } from "@/components/BookingForm";
import { RouteStartingRate } from "@/components/RouteStartingRate";
import { CheckIcon, ClockIcon, MapPinIcon, PlaneIcon, ShieldIcon, WhatsAppIcon } from "@/components/Icons";
import { serviceAreas, site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rent a Car Lahore with Driver, 24/7 Booking",
  description: "Book a chauffeur-driven car in Lahore for airport transfers, DHA travel, weddings, business trips and one-way intercity drops. WhatsApp Get Car 24/7.",
  alternates: { canonical: "/rent-a-car-lahore/" },
};

export default function LahoreServicePage() {
  return (
    <>
      <section className="location-hero">
        <div className="shell location-hero-grid">
          <div className="location-copy"><p className="eyebrow eyebrow-light"><span /> Lahore chauffeur service</p><h1>Rent a car in Lahore without the driving stress.</h1><p>From early airport pickups to late-night family events, Get Car provides a car and experienced driver when you need one.</p><div className="hero-actions"><a className="button button-whatsapp" href={whatsappUrl("Hello Get Car, I need a chauffeur-driven car in Lahore.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> Get a Lahore quote</a></div></div>
          <div className="location-image"><Image src="/images/toyota-fortuner.jpg" alt="Toyota Fortuner chauffeur rental in Lahore" fill preload sizes="(max-width: 850px) 100vw, 45vw" /></div>
        </div>
      </section>
      <section className="section location-services">
        <div className="shell">
          <div className="section-heading"><p className="eyebrow"><span /> Services in Lahore</p><h2>One local number for every kind of trip</h2></div>
          <div className="service-cards">
            <article><PlaneIcon /><span>01</span><h3>Airport pickup & drop</h3><p>Pre-booked travel to and from Allama Iqbal International Airport with space planned for your passengers and luggage.</p></article>
            <article><MapPinIcon /><span>02</span><h3>Local city travel</h3><p>Point-to-point travel across DHA, Gulberg, Johar Town, Bahria Town, the city centre and surrounding Lahore areas.</p></article>
            <article><ClockIcon /><span>03</span><h3>One-way intercity drops</h3><p>Driver-led travel from Lahore to Islamabad, Faisalabad and other major cities without arranging a return vehicle.</p></article>
            <article><ShieldIcon /><span>04</span><h3>Business & wedding cars</h3><p>Executive sedans and premium SUVs for guests, corporate movement, events and wedding transport.</p></article>
          </div>
        </div>
      </section>
      <section className="section lahore-area-section">
        <div className="shell">
          <div className="section-heading heading-split">
            <div><p className="eyebrow"><span /> Lahore coverage</p><h2>Driver-led pickup across the city.</h2></div>
            <div><p>Share the exact address, pickup time, destination, passengers and luggage. Availability is confirmed for each area before the booking.</p></div>
          </div>
          <div className="area-list" aria-label="Areas served in Lahore">{serviceAreas.map((area) => <span key={area}>{area}</span>)}</div>
          <div className="service-details-grid lahore-booking-details">
            <article><h3>What the rate includes</h3><p>The public starting price includes the vehicle and professional driver. The written quote confirms the complete trip price.</p></article>
            <article><h3>Costs that depend on the trip</h3><p>Fuel, motorway tolls, parking, taxes, waiting time and outstation driver expenses may be added according to the route.</p></article>
            <article><h3>Choosing the vehicle</h3><p>Passenger count, luggage and journey type determine whether an economy car, sedan, seven-seater, SUV or group vehicle is suitable.</p></article>
            <article><h3>Local business details</h3><p>Get Car is based at {site.shortAddress} and is available for booking 24 hours a day.</p></article>
          </div>
          <a className="google-profile-card inline-google-profile" href={site.mapsUrl} target="_blank" rel="noreferrer"><strong>{site.googleRating} Google rating</strong><span>Read {site.googleReviewCount} customer reviews and view the Lahore location.</span></a>
        </div>
      </section>
      <section className="section route-section">
        <div className="shell route-grid">
          <div><p className="eyebrow"><span /> Popular intercity route</p><h2>Lahore to Islamabad with a professional driver</h2><p>A direct one-way drop lets you travel on your schedule without switching vehicles. Share your pickup point and travel date for final availability.</p><ul className="plain-checks"><li><CheckIcon /> Door-to-door pickup and drop</li><li><CheckIcon /> <RouteStartingRate /></li><li><CheckIcon /> Vehicle options for families and business travel</li></ul><a className="button button-whatsapp" href={whatsappUrl("Hello Get Car, please quote a Lahore to Islamabad one-way drop.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> Quote this route</a><small>*Confirm fuel, tolls, taxes and waiting-time terms in your final quote.</small></div>
          <BookingForm compact />
        </div>
      </section>
      <section className="section seo-copy-section"><div className="shell narrow-copy"><h2>How to book a reliable rental car in Lahore</h2><p>Start with the route, pickup date, passenger count and luggage. These details determine whether an economy sedan, seven-seater, SUV or van is the best fit. Get Car confirms the available car, driver and complete trip price directly before the booking.</p><p>For airport travel, include your flight time and terminal timing. For intercity or wedding travel, mention waiting time and return plans so the quote covers the full requirement. Direct WhatsApp booking keeps the process simple and gives both sides a written trip summary.</p></div></section>
    </>
  );
}
