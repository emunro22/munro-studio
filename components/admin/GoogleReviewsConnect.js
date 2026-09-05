"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const STATUS_MESSAGES = {
  success: { text: "Connected to Google Business Profile.", ok: true },
  denied: { text: "Google sign-in was cancelled or denied.", ok: false },
  invalid: { text: "That connection attempt looked invalid, try again.", ok: false },
  error: { text: "Something went wrong connecting to Google. Try again.", ok: false },
};

export default function GoogleReviewsConnect({
  placesReady,
  placeId,
  oauthConnected,
  connectedAt,
  reviewCount,
  rating,
  fetchedAt,
  locationName,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  const connectResult = searchParams.get("google_connect");
  const statusBanner = connectResult ? STATUS_MESSAGES[connectResult] : null;
  const canRefresh = placesReady || oauthConnected;

  return (
    <div className="admin-card" style={{ padding: 16 }}>
      <div className="label" style={{ marginBottom: 10 }}>
        Google reviews (live on the marketing site)
      </div>

      {statusBanner && (
        <div style={{ fontSize: 13, color: statusBanner.ok ? "var(--good)" : "var(--critical)", marginBottom: 10 }}>
          {statusBanner.text}
        </div>
      )}

      <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 10 }}>
        {placesReady ? (
          <>
            Source: Places API (New){locationName ? ` - ${locationName}` : ""}. Place ID{" "}
            <code style={{ fontSize: 12 }}>{placeId}</code>. Google publishes up to five reviews through its API; the site shows those five, refreshed daily.
          </>
        ) : oauthConnected ? (
          <>
            Source: Business Profile API, connected{" "}
            {connectedAt ? new Date(connectedAt).toLocaleDateString("en-GB") : ""}.
          </>
        ) : (
          <>
            No source configured. Set <code style={{ fontSize: 12 }}>GOOGLE_PLACES_API_KEY</code> (Places API New)
            and <code style={{ fontSize: 12 }}>GOOGLE_PLACE_ID</code> to pull reviews without any Google approval
            process. The site shows the curated review list until then.
          </>
        )}
      </div>

      <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 10 }}>
        {reviewCount != null
          ? `Last pull: ${rating ? Number(rating).toFixed(1) : "?"}★ from ${reviewCount} reviews${
              fetchedAt ? ` (${new Date(fetchedAt).toLocaleString("en-GB")})` : ""
            }.`
          : "No reviews pulled yet."}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          className="btn"
          disabled={busy || !canRefresh}
          onClick={async () => {
            setBusy(true);
            setMessage(null);
            try {
              const res = await fetch("/api/admin/google-reviews/refresh", { method: "POST" });
              const data = await res.json();
              if (!res.ok) throw new Error(data.error || "Failed");
              setMessage(`Pulled ${data.result.reviews.length} review(s) via ${data.result.source}.`);
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
          {oauthConnected ? "Reconnect Business Profile" : "Connect Business Profile"}
        </a>
      </div>

      {message && <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 8 }}>{message}</div>}
    </div>
  );
}
