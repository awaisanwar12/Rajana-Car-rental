import { PhoneIcon, WhatsAppIcon } from "./Icons";
import { site, whatsappUrl } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <nav className="contact-float" aria-label="Quick contact">
      <a className="call-float" href={`tel:${site.phoneHref}`} aria-label={`Call Rajana Car Rental at ${site.phoneDisplay}`}>
        <PhoneIcon size={22} />
        <span>Call now</span>
      </a>
      <a className="whatsapp-float" href={whatsappUrl("Hello Rajana Car Rental, I would like a quote.")} target="_blank" rel="noreferrer" aria-label="Ask Rajana Car Rental for a quote on WhatsApp">
        <WhatsAppIcon size={23} />
        <span>WhatsApp</span>
      </a>
    </nav>
  );
}
