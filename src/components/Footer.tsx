import Link from "next/link";
import { ClockIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "./Icons";
import { site, whatsappUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="wordmark wordmark-light" href="/">
            <span className="wordmark-wheel" aria-hidden="true">R</span>
            <span><strong>RAJANA</strong><small>CAR RENTAL</small></span>
          </Link>
          <p>Reliable chauffeur-driven car rental for Lahore, airport transfers, intercity drops, weddings and business travel.</p>
        </div>
        <div>
          <h2>Explore</h2>
          <Link href="/fleet/">Fleet & rates</Link>
          <Link href="/rent-a-car-lahore/">Rent a car Lahore</Link>
        </div>
        <div>
          <h2>Contact</h2>
          <a href={`tel:${site.phoneHref}`}><PhoneIcon /> {site.phoneDisplay}</a>
          <a href={whatsappUrl("Hello Rajana Car Rental, I need information about a booking.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp us</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <p className="footer-icon-line"><MapPinIcon /> {site.shortAddress}</p>
          <p className="footer-icon-line"><ClockIcon /> Open 24 hours, 7 days</p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Rajana Car Rental</span>
        <span>Serving Lahore and major cities across Pakistan</span>
      </div>
    </footer>
  );
}
