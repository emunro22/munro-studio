"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddClientForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: "", domain: "", plan_type: "fully_paid", status: "active" });

  if (!open) {
    return (
      <button className="btn btn-primary" onClick={() => setOpen(true)}>
        + Add client
      </button>
    );
  }

  return (
    <form
      className="admin-card"
      style={{ padding: 16, display: "grid", gap: 10, maxWidth: 480 }}
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError(null);
        const res = await fetch("/api/admin/clients", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        setBusy(false);
        if (!res.ok) {
          setError(data.error || "Failed to add client");
          return;
        }
        setOpen(false);
        setForm({ name: "", domain: "", plan_type: "fully_paid", status: "active" });
        router.refresh();
      }}
    >
      <div>
        <label className="label">Business name</label>
        <input
          className="input"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div>
        <label className="label">Domain</label>
        <input
          className="input"
          value={form.domain}
          onChange={(e) => setForm({ ...form, domain: e.target.value })}
          placeholder="example.co.uk"
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
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
          </select>
        </div>
      </div>
      {error && <div style={{ color: "var(--critical)", fontSize: 13 }}>{error}</div>}
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "Adding…" : "Add client"}
        </button>
        <button type="button" className="btn" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}
