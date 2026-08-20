"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StripeFeeSettingsForm({ settings }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    percent: settings.stripe_fee_percent,
    fixed: settings.stripe_fee_fixed,
  });

  return (
    <form
      className="grid-2"
      style={{ alignItems: "end" }}
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        await fetch("/api/admin/settings", {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ stripeFeePercent: Number(form.percent), stripeFeeFixed: Number(form.fixed) }),
        });
        setBusy(false);
        router.refresh();
      }}
    >
      <div>
        <label className="label">Stripe fee %</label>
        <input
          type="number"
          min="0"
          step="0.01"
          className="input"
          value={form.percent}
          onChange={(e) => setForm({ ...form, percent: e.target.value })}
        />
      </div>
      <div>
        <label className="label">Stripe fee fixed (£ per charge)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          className="input"
          value={form.fixed}
          onChange={(e) => setForm({ ...form, fixed: e.target.value })}
        />
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <button type="submit" className="btn" disabled={busy}>
          {busy ? "Saving…" : "Update fee rate"}
        </button>
      </div>
    </form>
  );
}
