"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "./DataTable";

function fmtDate(d) {
  if (!d) return "never";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function AddCompetitorForm({ clientId, onDone }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", domain: "" });

  if (!open) {
    return (
      <button className="btn" onClick={() => setOpen(true)}>
        + Add manually
      </button>
    );
  }

  return (
    <form
      style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        await fetch("/api/admin/competitors", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ clientId, ...form }),
        });
        setBusy(false);
        setOpen(false);
        setForm({ name: "", domain: "" });
        onDone();
      }}
    >
      <input
        className="input"
        required
        placeholder="Competitor name"
        style={{ width: 180 }}
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="input"
        placeholder="domain.co.uk (optional)"
        style={{ width: 180 }}
        value={form.domain}
        onChange={(e) => setForm({ ...form, domain: e.target.value })}
      />
      <button type="submit" className="btn btn-primary" disabled={busy}>
        {busy ? "Adding…" : "Add"}
      </button>
      <button type="button" className="btn" onClick={() => setOpen(false)}>
        Cancel
      </button>
    </form>
  );
}

export default function CompetitorsPanel({ clientId, trade, location, competitors }) {
  const router = useRouter();
  const [busyAction, setBusyAction] = useState(null);
  const [message, setMessage] = useState(null);

  async function runAction(action, url) {
    setBusyAction(action);
    setMessage(null);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ clientId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      if (action === "discover") {
        setMessage(`Found ${data.competitors.length} competitor(s).`);
      } else if (action === "scan") {
        setMessage(`Scanned ${data.scanned} competitor(s), ${data.insightsInserted} new idea(s) added.`);
      }
      router.refresh();
    } catch (err) {
      setMessage(String(err.message || err));
    } finally {
      setBusyAction(null);
    }
  }

  async function removeCompetitor(id) {
    await fetch(`/api/admin/competitors/${id}`, { method: "DELETE" });
    router.refresh();
  }

  const columns = [
    {
      key: "name",
      label: "Competitor",
      accessor: (r) => r.name,
      render: (r) => (
        <div>
          <div style={{ fontWeight: 600 }}>{r.name}</div>
          {r.domain && (
            <a href={`https://${r.domain}`} target="_blank" rel="noreferrer" style={{ fontSize: 12 }}>
              {r.domain}
            </a>
          )}
          {!r.domain && <span style={{ fontSize: 12, color: "var(--text-muted)" }}>no domain on file</span>}
        </div>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      accessor: (r) => r.rating,
      render: (r) => (r.rating ? `★ ${Number(r.rating).toFixed(1)}` : "—"),
    },
    {
      key: "review_count",
      label: "Reviews",
      accessor: (r) => r.review_count,
      render: (r) => r.review_count ?? "—",
    },
    {
      key: "faq",
      label: "AEO (FAQ schema)",
      accessor: (r) => (r.latestScan?.has_faq_schema ? 1 : 0),
      render: (r) =>
        r.latestScan ? (
          <span className={`badge ${r.latestScan.has_faq_schema ? "badge-good" : "badge-neutral"}`}>
            {r.latestScan.has_faq_schema ? "yes" : "no"}
          </span>
        ) : (
          "—"
        ),
    },
    {
      key: "sitemap",
      label: "Sitemap pages",
      accessor: (r) => r.latestScan?.sitemap_url_count,
      render: (r) => r.latestScan?.sitemap_url_count ?? "—",
    },
    {
      key: "scanned_at",
      label: "Last scanned",
      accessor: (r) => (r.latestScan?.scanned_at ? new Date(r.latestScan.scanned_at).getTime() : 0),
      render: (r) => fmtDate(r.latestScan?.scanned_at),
    },
    {
      key: "actions",
      label: "",
      render: (r) => (
        <button className="btn" style={{ fontSize: 12, padding: "4px 8px" }} onClick={() => removeCompetitor(r.id)}>
          Remove
        </button>
      ),
    },
  ];

  return (
    <div className="admin-card" style={{ padding: 20 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <div style={{ fontWeight: 700 }}>Competitors</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
            {trade && location
              ? `Searching "${trade} in ${location}"`
              : "Set a trade + location in client settings to enable auto-discovery"}
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <button className="btn" disabled={busyAction === "discover"} onClick={() => runAction("discover", "/api/admin/competitors/discover")}>
            {busyAction === "discover" ? "Finding…" : "Find competitors"}
          </button>
          <button
            className="btn"
            disabled={busyAction === "scan" || competitors.length === 0}
            onClick={() => runAction("scan", "/api/admin/competitors/scan")}
          >
            {busyAction === "scan" ? "Scanning…" : "Scan competitors"}
          </button>
          <AddCompetitorForm clientId={clientId} onDone={() => router.refresh()} />
        </div>
      </div>

      {message && <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 10 }}>{message}</div>}

      {competitors.length === 0 ? (
        <div style={{ fontSize: 14, color: "var(--text-muted)" }}>
          No competitors tracked yet — click "Find competitors" or add one manually.
        </div>
      ) : (
        <DataTable columns={columns} rows={competitors} rowKey={(r) => r.id} initialSortKey="review_count" />
      )}
    </div>
  );
}
