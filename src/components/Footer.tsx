import Image from "next/image";
import Link from "next/link";
import { ClockIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "./Icons";
import { site, socialLinks, whatsappUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="wordmark brand-logo-link" href="/" aria-label={`${site.name} home`}>
            <Image className="brand-logo brand-logo-footer" src="/images/get-car-logo.webp" alt="Get Car: Rent a Car Lahore" width={84} height={105} />
          </Link>
          <p>24/7 chauffeur-driven car rental in Lahore from Rs 5,000/day for city travel, airport transfers, intercity drops, weddings, corporate trips and Northern Area tours.</p>
          <div className="footer-socials" aria-label="Get Car social media profiles">
            {socialLinks.map((profile) => (
              <a key={profile.name} href={profile.url} target="_blank" rel="me noreferrer">
                {profile.name}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h2>Services</h2>
          <Link href="/car-rental-with-driver-lahore/">Car rental with driver</Link>
          <Link href="/lahore-airport-car-rental/">Lahore airport transfer</Link>
          <Link href="/lahore-to-islamabad-car-rental/">Lahore to Islamabad</Link>
          <Link href="/wedding-car-rental-lahore/">Wedding car rental</Link>
          <Link href="/corporate-car-rental-lahore/">Corporate car rental</Link>
        </div>
        <div>
          <h2>Fleet &amp; tours</h2>
          <Link href="/fleet/">All fleet &amp; daily rates</Link>
          <Link href="/economy-car-rental-lahore/">Economy cars (from Rs 5,000)</Link>
          <Link href="/suv-luxury-car-rental-lahore/">SUV &amp; luxury rental</Link>
          <Link href="/grand-cabin-coaster-rental-lahore/">Grand Cabin &amp; Coaster</Link>
          <Link href="/outstation-northern-areas-car-rental-lahore/">Outstation &amp; Northern tours</Link>
        </div>
        <div>
          <h2>Contact &amp; info</h2>
          <a href={`tel:${site.phoneHref}`}><PhoneIcon /> {site.phoneDisplay}</a>
          <a href={whatsappUrl("Hello Get Car, I need information about a booking.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp us</a>
          <a className="footer-icon-line" href={site.mapsUrl} target="_blank" rel="noreferrer"><MapPinIcon /> {site.shortAddress}</a>
          <p className="footer-icon-line"><ClockIcon /> Open 24 hours, 7 days</p>
          <Link href="/about/">About Get Car</Link>
          <Link href="/terms/">Rental terms &amp; policy</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>Serving Lahore and major cities across Pakistan.</span>
      </div>
    </footer>
  );
}
