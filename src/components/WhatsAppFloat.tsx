import { whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

export function WhatsAppFloat() {
  return (
    <nav className="mobile-booking-bar" aria-label="Quick booking">
      <a href={whatsappUrl("Hello Rajana Car Rental, I would like to book a car. Please share availability and price.")} target="_blank" rel="noreferrer" aria-label="Book a car with Rajana Car Rental on WhatsApp">
        <WhatsAppIcon /> Book Now on WhatsApp
      </a>
    </nav>
  );
}
