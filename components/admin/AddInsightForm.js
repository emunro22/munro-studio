"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddInsightForm({ clientId }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ category: "seo", priority: "medium", title: "", description: "" });

  if (!open) {
    return (
      <button className="btn" onClick={() => setOpen(true)}>
        + Add idea
      </button>
    );
  }

  return (
    <form
      className="admin-card"
      style={{ padding: 16, display: "grid", gap: 10 }}
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        await fetch("/api/admin/insights", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ clientId, ...form }),
        });
        setBusy(false);
        setOpen(false);
        setForm({ category: "seo", priority: "medium", title: "", description: "" });
        router.refresh();
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          <label className="label">Category</label>
          <select
            className="select"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="seo">SEO</option>
            <option value="geo">Local / GEO</option>
            <option value="content">Content</option>
            <option value="technical">Technical</option>
            <option value="conversion">Conversion</option>
            <option value="upsell">Upsell</option>
          </select>
        </div>
        <div>
          <label className="label">Priority</label>
          <select
            className="select"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
      <div>
        <label className="label">Title</label>
        <input
          className="input"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="e.g. Add location pages for Paisley + Renfrew"
        />
      </div>
      <div>
        <label className="label">Details</label>
        <textarea
          className="textarea"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Why this matters / what to do"
        />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "Saving…" : "Save idea"}
        </button>
        <button type="button" className="btn" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}
