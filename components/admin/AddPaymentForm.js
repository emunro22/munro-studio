"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function today() {
  return new Date().toISOString().slice(0, 10);
}

function firstOfThisMonth() {
  const d = new Date();
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), 1)).toISOString().slice(0, 10);
}

export default function AddPaymentForm({ clients }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ type: "one_off", clientId: "", amount: "", paidAt: today(), notes: "" });

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
            type: form.type,
            clientId: form.clientId ? Number(form.clientId) : null,
            amount: Number(form.amount),
            paidAt: form.paidAt,
            notes: form.notes || null,
          }),
        });
        setBusy(false);
        setForm({ type: form.type, clientId: "", amount: "", paidAt: form.type === "monthly" ? firstOfThisMonth() : today(), notes: "" });
        router.refresh();
      }}
    >
      <div className="label">Log revenue</div>
      <div className="grid-2">
        <label
          className="admin-card"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            cursor: "pointer",
            borderColor: form.type === "one_off" ? "var(--series-1)" : "var(--border)",
          }}
        >
          <input
            type="radio"
            checked={form.type === "one_off"}
            onChange={() => setForm({ ...form, type: "one_off", paidAt: today() })}
          />
          One-off payment
        </label>
        <label
          className="admin-card"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            cursor: "pointer",
            borderColor: form.type === "monthly" ? "var(--series-1)" : "var(--border)",
          }}
        >
          <input
            type="radio"
            checked={form.type === "monthly"}
            onChange={() => setForm({ ...form, type: "monthly", clientId: "", paidAt: firstOfThisMonth() })}
          />
          Monthly revenue total
        </label>
      </div>

      <div className="grid-3">
        {form.type === "one_off" && (
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
        )}
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
            placeholder={form.type === "monthly" ? "440" : "499"}
          />
        </div>
        <div>
          <label className="label">{form.type === "monthly" ? "Month" : "Date"}</label>
          {form.type === "monthly" ? (
            <input
              type="month"
              className="input"
              required
              value={form.paidAt.slice(0, 7)}
              onChange={(e) => setForm({ ...form, paidAt: `${e.target.value}-01` })}
            />
          ) : (
            <input
              type="date"
              className="input"
              required
              value={form.paidAt}
              onChange={(e) => setForm({ ...form, paidAt: e.target.value })}
            />
          )}
        </div>
      </div>
      <div>
        <label className="label">Notes (optional)</label>
        <input
          className="input"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder={form.type === "monthly" ? "Total business revenue for the month" : "New build, extra page, etc."}
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "Saving…" : form.type === "monthly" ? "Log monthly total" : "Add payment"}
        </button>
      </div>
    </form>
  );
}
