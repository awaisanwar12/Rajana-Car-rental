import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { site } from "@/lib/site";
import "../public-redesign.css";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutoRental"],
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    telephone: site.phoneHref,
    email: site.email,
    image: `${site.url}/images/honda-civic-rs.jpg`,
    priceRange: "PKR 6,000–25,000",
    address: { "@type": "PostalAddress", streetAddress: "123 H Block Market, DHA Phase 1", addressLocality: "Lahore", addressRegion: "Punjab", addressCountry: "PK" },
    areaServed: ["Lahore", "Islamabad", "Faisalabad", "Karachi", "Pakistan"],
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" }],
    contactPoint: { "@type": "ContactPoint", telephone: site.phoneHref, contactType: "reservations", availableLanguage: ["English", "Urdu"] },
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </>
  );
}
