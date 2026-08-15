import { site } from "@/lib/site";
import "./invoice-shell.css";

export default function InvoiceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="invoice-tool-header no-print">
        {/* A plain link keeps the private tool free of the public navigation bundle. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" aria-label={`${site.name} home`}>
          <span className="wordmark-wheel" aria-hidden="true">R</span>
          <span><strong>RAJANA</strong><small>SECURE INVOICE MAKER</small></span>
        </a>
      </header>
      <main id="main-content">{children}</main>
    </>
  );
}
