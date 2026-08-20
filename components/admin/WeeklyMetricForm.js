"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function mostRecentMonday() {
  const d = new Date();
  const day = d.getDay();
  const diff = day === 0 ? 6 : day - 1;
  d.setDate(d.getDate() - diff);
  return d.toISOString().slice(0, 10);
}

export default function WeeklyMetricForm({ clientId }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    weekStart: mostRecentMonday(),
    pageViews: "",
    visitors: "",
    topPage: "",
    notes: "",
  });

  return (
    <form
      className="admin-card"
      style={{ padding: 16, display: "grid", gap: 10 }}
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        await fetch("/api/admin/metrics", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            clientId,
            weekStart: form.weekStart,
            pageViews: form.pageViews ? Number(form.pageViews) : null,
            visitors: form.visitors ? Number(form.visitors) : null,
            topPage: form.topPage || null,
            notes: form.notes || null,
          }),
        });
        setBusy(false);
        setForm((f) => ({ ...f, pageViews: "", visitors: "", topPage: "", notes: "" }));
        router.refresh();
      }}
    >
      <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
        Copy this week's numbers from your Vercel Analytics dashboard for this project.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        <div>
          <label className="label">Week starting</label>
          <input
            type="date"
            className="input"
            required
            value={form.weekStart}
            onChange={(e) => setForm({ ...form, weekStart: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Page views</label>
          <input
            type="number"
            min="0"
            className="input"
            required
            value={form.pageViews}
            onChange={(e) => setForm({ ...form, pageViews: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Visitors</label>
          <input
            type="number"
            min="0"
            className="input"
            value={form.visitors}
            onChange={(e) => setForm({ ...form, visitors: e.target.value })}
          />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          <label className="label">Top page (optional)</label>
          <input
            className="input"
            value={form.topPage}
            onChange={(e) => setForm({ ...form, topPage: e.target.value })}
            placeholder="/"
          />
        </div>
        <div>
          <label className="label">Notes (optional)</label>
          <input
            className="input"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Ran a promo this week, etc."
          />
        </div>
      </div>
      <div>
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "Saving…" : "Save week"}
        </button>
      </div>
    </form>
  );
}
