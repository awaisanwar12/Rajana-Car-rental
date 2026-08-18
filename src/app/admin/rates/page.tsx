import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";
import { RateManager } from "@/components/RateManager";
import { fleet } from "@/lib/site";

export const metadata: Metadata = { title: "Update Prices and Rates", robots: { index: false, follow: false } };

export default function RatesPage() {
  return <section className="admin-page"><Link className="admin-back" href="/admin/"><ArrowIcon /> Back to business tools</Link><div className="admin-intro"><p>Rajana Car Rental</p><h1>Prices and rates</h1><span>Update the public Lahore → Islamabad route price and each vehicle’s daily starting rate.</span></div><RateManager vehicles={fleet} /></section>;
}
