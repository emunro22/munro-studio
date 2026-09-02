"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const STATUS_MESSAGES = {
  success: { text: "Connected to Google Business Profile.", ok: true },
  denied: { text: "Google sign-in was cancelled or denied.", ok: false },
  invalid: { text: "That connection attempt looked invalid, try again.", ok: false },
  error: { text: "Something went wrong connecting to Google. Try again.", ok: false },
};

export default function GoogleReviewsConnect({ connected, connectedAt, reviewCount, rating, fetchedAt }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  const connectResult = searchParams.get("google_connect");
  const statusBanner = connectResult ? STATUS_MESSAGES[connectResult] : null;

  return (
    <div className="admin-card" style={{ padding: 16 }}>
      <div className="label" style={{ marginBottom: 10 }}>
        Google Business Profile (live reviews on the marketing site)
      </div>

      {statusBanner && (
        <div style={{ fontSize: 13, color: statusBanner.ok ? "var(--good)" : "var(--critical)", marginBottom: 10 }}>
          {statusBanner.text}
        </div>
      )}

      {connected ? (
        <>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 10 }}>
            Connected {connectedAt ? new Date(connectedAt).toLocaleDateString("en-GB") : ""}.{" "}
            {reviewCount != null ? (
              <>
                Last pulled {rating ? Number(rating).toFixed(1) : "?"}★ from {reviewCount} reviews
                {fetchedAt ? ` (${new Date(fetchedAt).toLocaleString("en-GB")})` : ""}.
              </>
            ) : (
              "No reviews pulled yet, click refresh below."
            )}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className="btn"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                setMessage(null);
                try {
                  const res = await fetch("/api/admin/google-reviews/refresh", { method: "POST" });
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.error || "Failed");
                  setMessage(`Pulled ${data.result.reviews.length} review(s).`);
                  router.refresh();
                } catch (err) {
                  setMessage(String(err.message || err));
                } finally {
                  setBusy(false);
                }
              }}
            >
              {busy ? "Refreshing…" : "Refresh reviews now"}
            </button>
            <a className="btn" href="/api/auth/google/start">
              Reconnect
            </a>
          </div>
        </>
      ) : (
        <>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 10 }}>
            Not connected yet. Requires Google approval for review access (see the API prerequisites form) before
            reviews will actually come through, but the connection itself can be made anytime.
          </div>
          <a className="btn btn-primary" href="/api/auth/google/start">
            Connect Google Business Profile
          </a>
        </>
      )}

      {message && <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 8 }}>{message}</div>}
    </div>
  );
}
