import { site, whatsappUrl } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

export function WhatsAppFloat() {
  return (
    <>
      <nav className="mobile-booking-bar" aria-label="Quick contact and booking">
        <a className="mobile-bar-call" href={`tel:${site.phoneHref}`} aria-label="Call Get Car directly">
          <PhoneIcon size={18} /> Call
        </a>
        <a className="mobile-bar-whatsapp" href={whatsappUrl("Hello Get Car, I would like to book a car. Please share availability and price.")} target="_blank" rel="noreferrer" aria-label="Book a car with Get Car on WhatsApp">
          <WhatsAppIcon size={18} /> Book now on WhatsApp
        </a>
      </nav>
      <div className="desktop-contact-float" aria-label="Quick contact">
        <a className="desktop-float-call" href={`tel:${site.phoneHref}`} aria-label={`Call Get Car at ${site.phoneDisplay}`}>
          <PhoneIcon size={18} />
          <span>Call</span>
        </a>
        <a className="desktop-float-whatsapp" href={whatsappUrl("Hello Get Car, I would like to book a car. Please share availability and price.")} target="_blank" rel="noreferrer" aria-label="Chat with Get Car on WhatsApp">
          <WhatsAppIcon size={20} />
          <span>Book now on WhatsApp</span>
        </a>
      </div>
    </>
  );
}
