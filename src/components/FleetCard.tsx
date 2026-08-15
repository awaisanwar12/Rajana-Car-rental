import Image from "next/image";
import { whatsappUrl } from "@/lib/site";
import { UsersIcon, WhatsAppIcon } from "./Icons";

type FleetCardProps = {
  car: {
    name: string;
    category: string;
    seats: string;
    priceLabel: string;
    image: string;
    alt: string;
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
        <a className="button fleet-card-action" href={whatsappUrl(`Hello Rajana Car Rental, please share availability and a final quote for ${car.name}.`)} target="_blank" rel="noreferrer" aria-label={`Check ${car.name} availability on WhatsApp`}>
          <WhatsAppIcon size={18} /> Check availability
        </a>
      </div>
    </article>
  );
}
