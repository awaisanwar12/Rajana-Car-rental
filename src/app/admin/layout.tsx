import Link from "next/link";
import "./admin.css";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main className="admin-shell"><header className="admin-header"><Link href="/admin/" aria-label="Rajana business tools"><span className="wordmark-wheel" aria-hidden="true">R</span><span><strong>RAJANA</strong><small>BUSINESS TOOLS</small></span></Link><span>Private access only</span></header>{children}</main>;
}
