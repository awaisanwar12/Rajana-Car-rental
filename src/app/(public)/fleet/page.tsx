import type { Metadata } from "next";
import Link from "next/link";
import { FleetExplorer } from "@/components/FleetExplorer";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "@/components/Icons";
import { whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Car Rental Fleet & Rates in Lahore",
  description: "Compare Get Car Lahore rates for Honda Civic, Toyota Corolla, Yaris, BR-V, Fortuner, Land Cruiser and group vans with driver.",
  alternates: { canonical: "/fleet/" },
};

export default function FleetPage() {
  return (
    <>
      <section className="inner-hero">
        <div className="shell inner-hero-grid">
          <div><p className="eyebrow eyebrow-light"><span /> Fleet & starting rates</p><h1>A comfortable car for every journey.</h1><p>Choose an economy sedan, family 7-seater, premium SUV or group van. Every booking is confirmed with a driver and a final trip quote.</p></div>
          <div className="inner-hero-note"><strong>Not sure what fits?</strong><p>Share your passenger count, luggage and route. We will recommend the right vehicle.</p><a href={whatsappUrl("Hello Get Car, please recommend a vehicle for my trip.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> Ask on WhatsApp</a></div>
        </div>
      </section>
      <section className="section fleet-page-section">
        <div className="shell">
          <div className="fleet-page-intro"><p>Filter by vehicle type, then open WhatsApp from any car to check its availability for your route and date.</p></div>
          <FleetExplorer />
          <div className="rate-box">
            <div><p className="eyebrow"><span /> Before you book</p><h2>What affects the final price?</h2><p>Every displayed rate includes the vehicle and professional driver. The final written quote confirms every route-specific cost before travel.</p></div>
            <ul><li><CheckIcon /> Pickup and destination</li><li><CheckIcon /> Trip duration and dates</li><li><CheckIcon /> Fuel, tolls, parking and taxes</li><li><CheckIcon /> Vehicle availability and waiting time</li><li><CheckIcon /> Passenger and luggage capacity</li><li><CheckIcon /> Driver food or accommodation for eligible trips</li></ul>
          </div>
          <div className="service-details-grid fleet-choice-guide">
            <article><h3>Economy cars</h3><p>Wagon R, Cultus and Yaris options suit local travel, airport transfers and smaller passenger groups.</p></article>
            <article><h3>Comfort and executive sedans</h3><p>Corolla Altis and Honda Civic options suit business travel, family journeys and formal events.</p></article>
            <article><h3>Seven-seaters and SUVs</h3><p>BR-V, Fortuner, Prado, Jaecoo and Land Cruiser options provide more passenger room and road presence.</p></article>
            <article><h3>Group vehicles</h3><p>Grand Cabin and Coaster bookings suit wedding guests, business teams and larger intercity groups.</p></article>
          </div>
          <div className="center-action"><Link className="button button-primary" href="/#book">Get your exact trip quote <ArrowIcon /></Link></div>
        </div>
      </section>
    </>
  );
}
