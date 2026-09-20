import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import "./admin.css";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main className="admin-shell"><header className="admin-header"><Link href="/admin/" aria-label={`${site.name} business tools`}><Image className="brand-symbol" src="/icon.svg" alt="" width={36} height={36} /><span><strong>{site.name.toUpperCase()}</strong><small>BUSINESS TOOLS</small></span></Link><span>Private access only</span></header>{children}</main>;
}
