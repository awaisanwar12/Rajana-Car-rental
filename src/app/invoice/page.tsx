import type { Metadata } from "next";
import { InvoiceBuilder } from "@/components/InvoiceBuilder";

export const metadata: Metadata = {
  title: "Invoice Maker",
  description: "Create and download Rajana Car Rental PDF invoices from your browser.",
  robots: { index: false, follow: true },
};

export default function InvoicePage() {
  return <section className="invoice-page"><div className="shell invoice-page-title no-print"><p className="eyebrow"><span /> Business utility</p><h1>Create a professional PDF invoice</h1><p>Enter the trip details, check the preview and download the PDF. Data remains in this browser.</p></div><div className="shell invoice-shell"><InvoiceBuilder /></div></section>;
}
