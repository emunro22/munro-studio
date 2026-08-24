"use client";

import { useEffect, useMemo, useState } from "react";

// Generic sortable table. `columns`: [{ key, label, accessor(row)->comparable, render(row)->node, mobileLabel? }]
// `storageKey` (optional): when set, the chosen sort column/direction persists in
// localStorage under that key so it survives navigating away and back, instead of
// resetting to initialSortKey every time the table remounts. The saved value is
// applied in an effect (not the initial render) to keep server/client markup in sync.
export default function DataTable({ columns, rows, initialSortKey, initialSortDir = "desc", rowKey, storageKey }) {
  const [sortKey, setSortKey] = useState(initialSortKey || columns[0]?.key);
  const [sortDir, setSortDir] = useState(initialSortDir);

  useEffect(() => {
    if (!storageKey) return;
    try {
      const saved = JSON.parse(localStorage.getItem(`datatable-sort:${storageKey}`) || "null");
      if (saved?.sortKey) {
        setSortKey(saved.sortKey);
        setSortDir(saved.sortDir || "desc");
      }
    } catch {
      // best-effort only
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey) return;
    try {
      localStorage.setItem(`datatable-sort:${storageKey}`, JSON.stringify({ sortKey, sortDir }));
    } catch {
      // best-effort only
    }
  }, [storageKey, sortKey, sortDir]);

  const sorted = useMemo(() => {
    const col = columns.find((c) => c.key === sortKey);
    if (!col || !col.accessor) return rows;
    const withVals = rows.map((r) => ({ r, v: col.accessor(r) }));
    withVals.sort((a, b) => {
      const av = a.v;
      const bv = b.v;
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === "string") return av.localeCompare(bv);
      return av - bv;
    });
    if (sortDir === "desc") withVals.reverse();
    return withVals.map((x) => x.r);
  }, [rows, sortKey, sortDir, columns]);

  function toggleSort(col) {
    if (!col.accessor) return;
    if (sortKey === col.key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(col.key);
      setSortDir(col.defaultDir || "desc");
    }
  }

  return (
    <table className="admin-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              onClick={() => toggleSort(col)}
              style={col.accessor ? { cursor: "pointer", userSelect: "none" } : undefined}
            >
              {col.label}
              {col.accessor && (
                <span style={{ marginLeft: 4, opacity: sortKey === col.key ? 1 : 0.25 }}>
                  {sortKey === col.key ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map((row) => (
          <tr key={rowKey(row)}>
            {columns.map((col, i) => (
              <td key={col.key} className={i === 0 ? "cell-title" : undefined} data-label={i === 0 ? undefined : col.label}>
                {col.render(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
