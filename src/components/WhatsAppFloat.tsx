import { WhatsAppIcon } from "./Icons";
import { whatsappUrl } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a className="whatsapp-float" href={whatsappUrl("Hello Rajana Car Rental, I would like a quote.")} target="_blank" rel="noreferrer" aria-label="Ask Rajana Car Rental for a quote on WhatsApp">
      <WhatsAppIcon size={25} />
      <span>Get a quote</span>
    </a>
  );
}
