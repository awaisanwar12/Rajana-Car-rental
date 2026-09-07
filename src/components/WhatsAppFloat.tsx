import { site, whatsappUrl } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

export function WhatsAppFloat() {
  return (
    <>
      <nav className="mobile-booking-bar" aria-label="Quick contact and booking">
        <a className="mobile-bar-call" href={`tel:${site.phoneHref}`} aria-label="Call Rajana Car Rental directly">
          <PhoneIcon size={18} /> Call
        </a>
        <a className="mobile-bar-whatsapp" href={whatsappUrl("Hello Rajana Car Rental, I would like to book a car. Please share availability and price.")} target="_blank" rel="noreferrer" aria-label="Book a car with Rajana Car Rental on WhatsApp">
          <WhatsAppIcon size={18} /> Book now on WhatsApp
        </a>
      </nav>
      <div className="desktop-contact-float" aria-label="Quick contact">
        <a className="desktop-float-call" href={`tel:${site.phoneHref}`} aria-label={`Call Rajana Car Rental at ${site.phoneDisplay}`}>
          <PhoneIcon size={18} />
          <span>Call</span>
        </a>
        <a className="desktop-float-whatsapp" href={whatsappUrl("Hello Rajana Car Rental, I would like to book a car. Please share availability and price.")} target="_blank" rel="noreferrer" aria-label="Chat with Rajana Car Rental on WhatsApp">
          <WhatsAppIcon size={20} />
          <span>Book now on WhatsApp</span>
        </a>
      </div>
    </>
  );
}
