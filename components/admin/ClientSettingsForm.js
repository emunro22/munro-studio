"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ClientSettingsForm({ client }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    domain: client.domain || "",
    plan_type: client.plan_type,
    status: client.status,
    monthly_fee: client.monthly_fee || "",
    google_place_id: client.google_place_id || "",
    notes: client.notes || "",
  });

  return (
    <form
      className="admin-card"
      style={{ padding: 16, display: "grid", gap: 10 }}
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setSaved(false);
        await fetch(`/api/admin/clients/${client.id}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            domain: form.domain || null,
            plan_type: form.plan_type,
            status: form.status,
            monthly_fee: form.monthly_fee ? Number(form.monthly_fee) : null,
            google_place_id: form.google_place_id || null,
            notes: form.notes || null,
          }),
        });
        setBusy(false);
        setSaved(true);
        router.refresh();
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          <label className="label">Domain</label>
          <input
            className="input"
            value={form.domain}
            onChange={(e) => setForm({ ...form, domain: e.target.value })}
            placeholder="example.co.uk"
          />
        </div>
        <div>
          <label className="label">Monthly fee (£)</label>
          <input
            type="number"
            min="0"
            className="input"
            value={form.monthly_fee}
            onChange={(e) => setForm({ ...form, monthly_fee: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Plan</label>
          <select
            className="select"
            value={form.plan_type}
            onChange={(e) => setForm({ ...form, plan_type: e.target.value })}
          >
            <option value="monthly_seo">Monthly SEO</option>
            <option value="fully_paid">Fully paid (one-off)</option>
          </select>
        </div>
        <div>
          <label className="label">Status</label>
          <select
            className="select"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="not_live">Not live yet</option>
            <option value="paused">Paused</option>
          </select>
        </div>
      </div>
      <div>
        <label className="label">Google Place ID (optional — auto-detected on first scan if left blank)</label>
        <input
          className="input"
          value={form.google_place_id}
          onChange={(e) => setForm({ ...form, google_place_id: e.target.value })}
          placeholder="ChIJ..."
        />
      </div>
      <div>
        <label className="label">Notes</label>
        <textarea
          className="textarea"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "Saving…" : "Save settings"}
        </button>
        {saved && <span style={{ fontSize: 13, color: "var(--good)" }}>Saved</span>}
      </div>
    </form>
  );
}
