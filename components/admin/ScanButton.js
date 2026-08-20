"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ScanButton({ clientId, label = "Scan now" }) {
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
            const res = await fetch("/api/admin/scan", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(clientId ? { clientId } : {}),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Scan failed");
            setResult("done");
            router.refresh();
          } catch (err) {
            setResult(String(err.message || err));
          } finally {
            setBusy(false);
          }
        }}
      >
        {busy ? "Scanning…" : label}
      </button>
      {result === "done" && <span style={{ fontSize: 13, color: "var(--good)" }}>Scan complete</span>}
      {result && result !== "done" && <span style={{ fontSize: 13, color: "var(--critical)" }}>{result}</span>}
    </div>
  );
}
