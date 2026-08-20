import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";
import MobileNav from "@/components/admin/MobileNav";
import "../admin.css";

export default function AdminSiteLayout({ children }) {
  return (
    <div className="admin-root">
      <div className="admin-topbar">
        <Link
          href="/admin"
          style={{
            fontWeight: 700,
            fontSize: 15,
            fontFamily: "var(--font-display), serif",
            color: "var(--text-primary)",
            textDecoration: "none",
          }}
        >
          Munro<em style={{ color: "var(--series-1)", fontStyle: "italic" }}>Studio</em>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <MobileNav />
        </div>
      </div>

      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, fontFamily: "var(--font-display), serif" }}>
              Munro<em style={{ color: "var(--series-1)", fontStyle: "italic" }}>Studio</em>
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Client dashboard</div>
          </div>
          <nav style={{ display: "grid", gap: 4 }}>
            <Link href="/admin" className="admin-nav-link">
              Overview
            </Link>
            <Link href="/admin/clients" className="admin-nav-link">
              Clients
            </Link>
            <Link href="/admin/revenue" className="admin-nav-link">
              Revenue
            </Link>
          </nav>
          <div style={{ marginTop: "auto" }}>
            <LogoutButton />
          </div>
        </aside>
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}
