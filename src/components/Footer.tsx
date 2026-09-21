import Image from "next/image";
import Link from "next/link";
import { ClockIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "./Icons";
import { site, whatsappUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="wordmark brand-wordmark brand-wordmark-light" href="/" aria-label={`${site.name} home`}>
            <Image className="brand-symbol" src="/icon.svg" alt="" width={60} height={60} />
            <span className="brand-name"><strong>{site.name.toUpperCase()}</strong><small>RENT A CAR LAHORE</small></span>
          </Link>
          <p>Reliable chauffeur-driven car rental for Lahore, airport transfers, intercity drops, weddings and business travel.</p>
        </div>
        <div>
          <h2>Explore</h2>
          <Link href="/fleet/">Fleet & rates</Link>
          <Link href="/rent-a-car-lahore/">Rent a car Lahore</Link>
          <Link href="/lahore-airport-car-rental/">Lahore airport transfer</Link>
          <Link href="/car-rental-with-driver-lahore/">Car with driver</Link>
          <Link href="/lahore-to-islamabad-car-rental/">Lahore to Islamabad</Link>
        </div>
        <div>
          <h2>Contact</h2>
          <a href={`tel:${site.phoneHref}`}><PhoneIcon /> {site.phoneDisplay}</a>
          <a href={whatsappUrl("Hello Get Car, I need information about a booking.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp us</a>
          <p className="footer-icon-line"><MapPinIcon /> {site.shortAddress}</p>
          <p className="footer-icon-line"><ClockIcon /> Open 24 hours, 7 days</p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>Serving Lahore and major cities across Pakistan</span>
      </div>
    </footer>
  );
}
