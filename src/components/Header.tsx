"use client";

import Link from "next/link";
import { useState } from "react";
import { CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "./Icons";
import { site, whatsappUrl } from "@/lib/site";

const nav = [
  ["Home", "/"],
  ["Fleet & rates", "/fleet/"],
  ["Rent a car Lahore", "/rent-a-car-lahore/"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="topline">
        <div className="shell topline-inner">
          <span>Chauffeur-driven car rental in Lahore</span>
          <div>
            <a href={`tel:${site.phoneHref}`}><PhoneIcon size={15} /> {site.phoneDisplay}</a>
            <span className="topline-dot" aria-hidden="true">•</span>
            <span>Available 24/7</span>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="shell header-inner">
          <Link className="wordmark" href="/" aria-label="Rajana Car Rental home">
            <span className="wordmark-wheel" aria-hidden="true">R</span>
            <span><strong>RAJANA</strong><small>CAR RENTAL</small></span>
          </Link>
          <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
            ))}
            <a className="button button-whatsapp nav-whatsapp" href={whatsappUrl("Hello Rajana Car Rental, I would like to book a car.")} target="_blank" rel="noreferrer">
              <WhatsAppIcon /> Book on WhatsApp
            </a>
          </nav>
          <button className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>
    </>
  );
}
