import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, FileIcon } from "@/components/Icons";

export const metadata: Metadata = { title: "Business Tools", robots: { index: false, follow: false } };

export default function AdminPage() {
  return <section className="admin-page"><div className="admin-intro"><p>Rajana Car Rental</p><h1>Business tools</h1><span>Choose what you need to do today.</span></div><div className="admin-actions"><Link href="/invoice/" className="admin-action-card"><FileIcon size={28} /><div><strong>Create invoice</strong><p>Build, download or share a customer invoice.</p></div><ArrowIcon /></Link><Link href="/admin/rates/" className="admin-action-card"><span className="admin-rate-mark">Rs</span><div><strong>Update vehicle rates</strong><p>Change the public starting rate for each car.</p></div><ArrowIcon /></Link></div></section>;
}
