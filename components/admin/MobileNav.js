"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        className="admin-menu-btn"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 4H16M2 9H16M2 14H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>
      <nav className={`admin-mobile-nav ${open ? "open" : ""}`}>
        <Link
          href="/admin"
          className="admin-nav-link"
          style={pathname === "/admin" ? { background: "var(--page)" } : undefined}
          onClick={() => setOpen(false)}
        >
          Overview
        </Link>
        <Link
          href="/admin/clients"
          className="admin-nav-link"
          style={pathname.startsWith("/admin/clients") ? { background: "var(--page)" } : undefined}
          onClick={() => setOpen(false)}
        >
          Clients
        </Link>
        <Link
          href="/admin/revenue"
          className="admin-nav-link"
          style={pathname.startsWith("/admin/revenue") ? { background: "var(--page)" } : undefined}
          onClick={() => setOpen(false)}
        >
          Revenue
        </Link>
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--gridline)" }}>
          <LogoutButton />
        </div>
      </nav>
    </>
  );
}
