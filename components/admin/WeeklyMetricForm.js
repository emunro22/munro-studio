"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mostRecentMonday, weekBefore } from "@/lib/dates";

async function saveWeek(clientId, weekStart, pageViews, visitors, topPage, notes) {
  return fetch("/api/admin/metrics", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      clientId,
      weekStart,
      pageViews: pageViews ? Number(pageViews) : null,
      visitors: visitors ? Number(visitors) : null,
      topPage: topPage || null,
      notes: notes || null,
    }),
  });
}

export default function WeeklyMetricForm({ clientId, hasPriorData = true }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [showBackfill, setShowBackfill] = useState(!hasPriorData);
  const [form, setForm] = useState({
    weekStart: mostRecentMonday(),
    pageViews: "",
    visitors: "",
    topPage: "",
    notes: "",
    lastWeekPageViews: "",
    lastWeekVisitors: "",
  });

  return (
    <form
      className="admin-card"
      style={{ padding: 16, display: "grid", gap: 10 }}
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        if (showBackfill && (form.lastWeekPageViews || form.lastWeekVisitors)) {
          await saveWeek(clientId, weekBefore(form.weekStart), form.lastWeekPageViews, form.lastWeekVisitors, "", "");
        }
        await saveWeek(clientId, form.weekStart, form.pageViews, form.visitors, form.topPage, form.notes);
        setBusy(false);
        setForm((f) => ({ ...f, pageViews: "", visitors: "", topPage: "", notes: "", lastWeekPageViews: "", lastWeekVisitors: "" }));
        setShowBackfill(false);
        router.refresh();
      }}
    >
      <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
        Copy this week's numbers from your Vercel Analytics dashboard for this project.
      </div>
      <div className="grid-3">
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
      <div className="grid-2">
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

      {!showBackfill && (
        <button type="button" className="btn" style={{ justifySelf: "start" }} onClick={() => setShowBackfill(true)}>
          + Also log last week (to see a comparison immediately)
        </button>
      )}

      {showBackfill && (
        <div style={{ borderTop: "1px solid var(--gridline)", paddingTop: 10 }}>
          <div className="label">Last week's numbers (optional, for an immediate comparison)</div>
          <div className="grid-2">
            <div>
              <label className="label">Page views</label>
              <input
                type="number"
                min="0"
                className="input"
                value={form.lastWeekPageViews}
                onChange={(e) => setForm({ ...form, lastWeekPageViews: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Visitors</label>
              <input
                type="number"
                min="0"
                className="input"
                value={form.lastWeekVisitors}
                onChange={(e) => setForm({ ...form, lastWeekVisitors: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}

      <div>
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "Saving…" : "Save week"}
        </button>
      </div>
    </form>
  );
}
