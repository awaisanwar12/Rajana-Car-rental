"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { whatsappUrl } from "@/lib/site";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./Icons";

const nav = [
  ["Home", "/"],
  ["Fleet & rates", "/fleet/"],
  ["Rent a car Lahore", "/rent-a-car-lahore/"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const trigger = menuButton.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.classList.add("menu-open");
    window.addEventListener("keydown", handleKeyDown);
    firstLink.current?.focus();

    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="shell header-inner">
          <Link className="wordmark" href="/" aria-label="Rajana Car Rental home">
            <span className="wordmark-wheel" aria-hidden="true">R</span>
            <span><strong>RAJANA</strong><small>CAR RENTAL</small></span>
          </Link>
          <nav id={menuId} className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
            {nav.map(([label, href], index) => (
              <Link
                key={href}
                href={href}
                ref={index === 0 ? firstLink : undefined}
                aria-current={pathname === href || (href !== "/" && pathname.startsWith(href)) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <a className="button button-whatsapp nav-whatsapp" href={whatsappUrl("Hello Rajana Car Rental, I would like to book a car.")} target="_blank" rel="noreferrer">
              <WhatsAppIcon /> Book Now on WhatsApp
            </a>
          </nav>
          <button ref={menuButton} className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((value) => !value)}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>
      {open && <button className="menu-backdrop" type="button" aria-label="Close menu" onClick={() => setOpen(false)} />}
    </>
  );
}
