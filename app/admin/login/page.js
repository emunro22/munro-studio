"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "../admin.css";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  return (
    <form
      className="admin-card"
      style={{ padding: 28, width: "100%", maxWidth: 360, display: "grid", gap: 14 }}
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError(null);
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ password }),
        });
        setBusy(false);
        if (!res.ok) {
          setError("Incorrect password");
          return;
        }
        router.push(searchParams.get("next") || "/admin");
        router.refresh();
      }}
    >
      <div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>MunroStudio Admin</div>
        <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 2 }}>
          Client analytics &amp; SEO dashboard
        </div>
      </div>
      <div>
        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div style={{ color: "var(--critical)", fontSize: 13 }}>{error}</div>}
      <button type="submit" className="btn btn-primary" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div
      className="admin-root"
      style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
    >
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
