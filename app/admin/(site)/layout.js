import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";
import "../admin.css";

export default function AdminSiteLayout({ children }) {
  return (
    <div className="admin-root">
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <aside
          style={{
            width: 220,
            flexShrink: 0,
            borderRight: "1px solid var(--border)",
            padding: "20px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>MunroStudio</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Client dashboard</div>
          </div>
          <nav style={{ display: "grid", gap: 4 }}>
            <Link href="/admin" style={navLinkStyle}>
              Overview
            </Link>
            <Link href="/admin/clients" style={navLinkStyle}>
              Clients
            </Link>
          </nav>
          <div style={{ marginTop: "auto" }}>
            <LogoutButton />
          </div>
        </aside>
        <main style={{ flex: 1, padding: "28px 32px", maxWidth: 1200 }}>{children}</main>
      </div>
    </div>
  );
}

const navLinkStyle = {
  padding: "8px 10px",
  borderRadius: 8,
  fontSize: 14,
  fontWeight: 500,
  color: "var(--text-primary)",
  textDecoration: "none",
};
