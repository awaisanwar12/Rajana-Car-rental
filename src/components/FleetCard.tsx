import Image from "next/image";
import { UsersIcon, WhatsAppIcon } from "./Icons";
import { whatsappUrl } from "@/lib/site";

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
        <div>
          <h3>{car.name}</h3>
          <p><UsersIcon size={17} /> {car.seats}</p>
        </div>
        <strong>{car.priceLabel}</strong>
        <a className="text-link" href={whatsappUrl(`Hello Rajana Car Rental, please share availability and a final quote for ${car.name}.`)} target="_blank" rel="noreferrer">
          <WhatsAppIcon size={18} /> Check availability
        </a>
      </div>
    </article>
  );
}
