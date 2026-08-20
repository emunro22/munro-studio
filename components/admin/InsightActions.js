"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

async function setStatus(id, status) {
  await fetch(`/api/admin/insights/${id}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ status }),
  });
}

export default function InsightActions({ id, status }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function act(next) {
    setBusy(true);
    await setStatus(id, next);
    router.refresh();
    setBusy(false);
  }

  if (status === "done" || status === "dismissed") {
    return (
      <button className="btn" disabled={busy} onClick={() => act("open")}>
        Reopen
      </button>
    );
  }

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button className="btn" disabled={busy} onClick={() => act("done")}>
        Mark done
      </button>
      <button className="btn" disabled={busy} onClick={() => act("dismissed")}>
        Dismiss
      </button>
    </div>
  );
}
