"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RunAllCompetitorsButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <button
        className="btn"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setResult(null);
          try {
            const res = await fetch("/api/admin/competitors/run-all", { method: "POST" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed");
            const ok = data.results.filter((r) => !r.error);
            const failed = data.results.filter((r) => r.error);
            const totalInsights = ok.reduce((sum, r) => sum + (r.insightsInserted || 0), 0);
            setResult(
              `Ran for ${ok.length} client(s), ${totalInsights} new idea(s)${failed.length ? `, ${failed.length} failed` : ""}.`
            );
            router.refresh();
          } catch (err) {
            setResult(String(err.message || err));
          } finally {
            setBusy(false);
          }
        }}
      >
        {busy ? "Finding & scanning competitors…" : "Find & scan competitors (all clients)"}
      </button>
      {result && <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{result}</span>}
    </div>
  );
}
