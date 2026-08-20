"use client";

import { useMemo, useState } from "react";

// Generic sortable table. `columns`: [{ key, label, accessor(row)->comparable, render(row)->node, mobileLabel? }]
export default function DataTable({ columns, rows, initialSortKey, initialSortDir = "desc", rowKey }) {
  const [sortKey, setSortKey] = useState(initialSortKey || columns[0]?.key);
  const [sortDir, setSortDir] = useState(initialSortDir);

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
