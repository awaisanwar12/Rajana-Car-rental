import type { Metadata } from "next";
import Image from "next/image";
import { BookingForm } from "@/components/BookingForm";
import { CheckIcon, ClockIcon, MapPinIcon, PlaneIcon, ShieldIcon, WhatsAppIcon } from "@/components/Icons";
import { whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rent a Car Lahore with Driver — 24/7 Booking",
  description: "Book a chauffeur-driven car in Lahore for airport transfers, DHA travel, weddings, business trips and one-way intercity drops. WhatsApp Rajana 24/7.",
  alternates: { canonical: "/rent-a-car-lahore/" },
};

export default function LahoreServicePage() {
  return (
    <>
      <section className="location-hero">
        <div className="shell location-hero-grid">
          <div className="location-copy"><p className="eyebrow eyebrow-light"><span /> Lahore chauffeur service</p><h1>Rent a car in Lahore without the driving stress.</h1><p>From early airport pickups to late-night family events, Rajana provides a car and experienced driver when you need one.</p><div className="hero-actions"><a className="button button-primary" href={whatsappUrl("Hello Rajana, I need a chauffeur-driven car in Lahore.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> Get a Lahore quote</a></div></div>
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
      <section className="section route-section">
        <div className="shell route-grid">
          <div><p className="eyebrow"><span /> Popular intercity route</p><h2>Lahore to Islamabad with a professional driver</h2><p>A direct one-way drop lets you travel on your schedule without switching vehicles. Share your pickup point and travel date for final availability.</p><ul className="plain-checks"><li><CheckIcon /> Door-to-door pickup and drop</li><li><CheckIcon /> Starting from Rs 25,000*</li><li><CheckIcon /> Vehicle options for families and business travel</li></ul><a className="button button-dark" href={whatsappUrl("Hello Rajana, please quote a Lahore to Islamabad one-way drop.")} target="_blank" rel="noreferrer">Quote this route <WhatsAppIcon /></a><small>*Confirm fuel, tolls, taxes and waiting-time terms in your final quote.</small></div>
          <BookingForm compact />
        </div>
      </section>
      <section className="section seo-copy-section"><div className="shell narrow-copy"><h2>How to book a reliable rental car in Lahore</h2><p>Start with the route, pickup date, passenger count and luggage. These details determine whether an economy sedan, seven-seater, SUV or van is the best fit. Rajana confirms the available car, driver and complete trip price directly before the booking.</p><p>For airport travel, include your flight time and terminal timing. For intercity or wedding travel, mention waiting time and return plans so the quote covers the full requirement. Direct WhatsApp booking keeps the process simple and gives both sides a written trip summary.</p></div></section>
    </>
  );
}
