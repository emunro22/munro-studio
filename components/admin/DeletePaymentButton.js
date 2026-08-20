"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeletePaymentButton({ id }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <button
      className="btn"
      style={{ padding: "4px 10px", minHeight: "unset", fontSize: 12 }}
      disabled={busy}
      onClick={async () => {
        if (!confirm("Delete this payment?")) return;
        setBusy(true);
        await fetch(`/api/admin/payments/${id}`, { method: "DELETE" });
        router.refresh();
      }}
    >
      Delete
    </button>
  );
}
