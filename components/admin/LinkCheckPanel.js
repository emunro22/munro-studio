"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LinkCheckPanel({ clientId, latestLinkCheck }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const broken = latestLinkCheck?.broken_links || [];

  return (
    <div className="admin-card" style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <div className="label">Broken links (full site)</div>
        <button
          className="btn"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            setError(null);
            try {
              const res = await fetch("/api/admin/link-check", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ clientId }),
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data.error || "Check failed");
              router.refresh();
            } catch (err) {
              setError(String(err.message || err));
            } finally {
              setBusy(false);
            }
          }}
        >
          {busy ? "Checking… (can take up to a minute)" : "Check broken links"}
        </button>
      </div>

      {error && (
        <div style={{ fontSize: 13, color: "var(--critical)", marginTop: 8 }}>{error}</div>
      )}

      {latestLinkCheck && (
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
            {new Date(latestLinkCheck.checked_at).toLocaleString("en-GB")}: checked {latestLinkCheck.pages_checked} of{" "}
            {latestLinkCheck.pages_total} pages, {latestLinkCheck.links_checked} of {latestLinkCheck.links_total} unique
            links{latestLinkCheck.partial ? " (stopped early, re-run to cover more)" : ""}
          </div>
          {broken.length === 0 ? (
            <div style={{ fontSize: 13, color: "var(--good)", marginTop: 6 }}>No broken links found.</div>
          ) : (
            <details style={{ marginTop: 8 }}>
              <summary style={{ cursor: "pointer", fontSize: 13, fontWeight: 600, color: "var(--critical)" }}>
                {broken.length} broken link(s) found
              </summary>
              <div style={{ display: "grid", gap: 6, marginTop: 8 }}>
                {broken.map((b, idx) => (
                  <div key={idx} style={{ fontSize: 12, borderTop: "1px solid var(--gridline)", paddingTop: 6 }}>
                    <div style={{ fontWeight: 600, wordBreak: "break-all" }}>
                      {b.url} <span style={{ color: "var(--critical)", fontWeight: 400 }}>({b.status || b.error})</span>
                    </div>
                    {b.foundOn?.length > 0 && (
                      <div style={{ color: "var(--text-muted)", wordBreak: "break-all" }}>
                        found on: {b.foundOn.join(", ")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
