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

export default function InlinePageViewsCell({ clientId, value }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value ?? "");
  const [busy, setBusy] = useState(false);

  async function save() {
    setEditing(false);
    if (val === "" || Number(val) === value) return;
    setBusy(true);
    await fetch("/api/admin/metrics", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ clientId, weekStart: mostRecentMonday(), pageViews: Number(val) }),
    });
    setBusy(false);
    router.refresh();
  }

  if (editing) {
    return (
      <input
        autoFocus
        type="number"
        min="0"
        className="input"
        style={{ width: 92, padding: "4px 6px", minHeight: "unset" }}
        value={val}
        disabled={busy}
        onChange={(e) => setVal(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
          if (e.key === "Escape") setEditing(false);
        }}
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setEditing(true);
      }}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        font: "inherit",
        fontVariantNumeric: "tabular-nums",
        color: value != null ? "var(--text-primary)" : "var(--series-1)",
        cursor: "pointer",
        textDecoration: "underline dotted",
        textUnderlineOffset: 3,
      }}
      title="Click to log this week's page views"
    >
      {busy ? "Saving…" : value != null ? value.toLocaleString() : "+ add"}
    </button>
  );
}
