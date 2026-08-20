"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function AddPaymentForm({ clients }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ clientId: "", amount: "", paidAt: today(), notes: "" });

  return (
    <form
      className="admin-card"
      style={{ padding: 16, display: "grid", gap: 10 }}
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        await fetch("/api/admin/payments", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            clientId: form.clientId ? Number(form.clientId) : null,
            amount: Number(form.amount),
            paidAt: form.paidAt,
            notes: form.notes || null,
          }),
        });
        setBusy(false);
        setForm({ clientId: "", amount: "", paidAt: today(), notes: "" });
        router.refresh();
      }}
    >
      <div className="label">Log a one-off payment</div>
      <div className="grid-3">
        <div>
          <label className="label">Client</label>
          <select className="select" value={form.clientId} onChange={(e) => setForm({ ...form, clientId: e.target.value })}>
            <option value="">— Not tied to a client —</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Amount (£, gross)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="input"
            required
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            placeholder="499"
          />
        </div>
        <div>
          <label className="label">Date</label>
          <input
            type="date"
            className="input"
            required
            value={form.paidAt}
            onChange={(e) => setForm({ ...form, paidAt: e.target.value })}
          />
        </div>
      </div>
      <div>
        <label className="label">Notes (optional)</label>
        <input
          className="input"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="New build, extra page, etc."
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "Saving…" : "Add payment"}
        </button>
      </div>
    </form>
  );
}
