import Image from "next/image";
import { site, whatsappUrl } from "@/lib/site";
import { PhoneIcon, UsersIcon, WhatsAppIcon } from "./Icons";

type FleetCardProps = {
  car: {
    name: string;
    category: string;
    seats: string;
    priceLabel: string;
    image: string;
    alt: string;
    rateNote?: string;
    terms?: string;
  };
  featured?: boolean;
};

export function FleetCard({ car, featured = false }: FleetCardProps) {
  return (
    <article className={`fleet-card ${featured ? "fleet-card-featured" : ""}`}>
      <div className="fleet-image">
        <Image src={car.image} alt={car.alt} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" />
        <span>{car.category}</span>
      </div>
      <div className="fleet-content">
        <div className="fleet-card-heading"><h3>{car.name}</h3></div>
        <p className="fleet-meta"><UsersIcon size={17} /> {car.seats} <span aria-hidden="true">·</span> Driver included</p>
        <strong className="fleet-price"><small>Starting at</small>{car.priceLabel.replace("From ", "")}</strong>
        {car.rateNote && <p className="fleet-rate-note">{car.rateNote}</p>}
        {car.terms && <p className="fleet-card-terms">{car.terms}</p>}
        <div className="fleet-card-actions">
          <a className="button fleet-card-action fleet-card-whatsapp" href={whatsappUrl(`Hello Rajana Car Rental, please share availability and a final quote for ${car.name}.`)} target="_blank" rel="noreferrer" aria-label={`Book ${car.name} on WhatsApp`}>
            <WhatsAppIcon size={17} /> Book now on WhatsApp
          </a>
          <a className="button fleet-card-action fleet-card-call" href={`tel:${site.phoneHref}`} aria-label={`Call Rajana Car Rental for ${car.name}`}>
            <PhoneIcon size={16} /> Call
          </a>
        </div>
      </div>
    </article>
  );
}
