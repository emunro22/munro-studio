"use client";

import Link from "next/link";
import DataTable from "./DataTable";
import TrendBadge from "./TrendBadge";
import InlinePageViewsCell from "./InlinePageViewsCell";

function insightSummary(counts) {
  const critical = counts.critical || 0;
  const high = counts.high || 0;
  if (critical === 0 && high === 0) return null;
  return (
    <span style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {critical > 0 && <span className="badge badge-critical">{critical} critical</span>}
      {high > 0 && <span className="badge badge-high">{high} high</span>}
    </span>
  );
}

export default function ClientOverviewTable({ clients }) {
  const columns = [
    {
      key: "name",
      label: "Client",
      accessor: (c) => c.name.toLowerCase(),
      defaultDir: "asc",
      render: (c) => (
        <>
          <Link href={`/admin/clients/${c.slug}`} style={{ fontWeight: 600, color: "var(--text-primary)" }}>
            {c.name}
          </Link>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{c.domain}</div>
        </>
      ),
    },
    {
      key: "page_views",
      label: "Page views (last week)",
      accessor: (c) => c.latestMetric?.page_views ?? -1,
      render: (c) => <InlinePageViewsCell clientId={c.id} value={c.latestMetric?.page_views ?? null} />,
    },
    {
      key: "trend",
      label: "vs prior week",
      accessor: (c) => {
        const pv = c.latestMetric?.page_views;
        const prev = c.latestMetric?.prev_page_views;
        if (pv == null || !prev) return -Infinity;
        return (pv - prev) / prev;
      },
      render: (c) => <TrendBadge current={c.latestMetric?.page_views} previous={c.latestMetric?.prev_page_views} />,
    },
    {
      key: "reviews",
      label: "Google reviews",
      accessor: (c) => c.latestReview?.rating ?? -1,
      render: (c) =>
        c.latestReview?.rating ? (
          <span>
            ★ {Number(c.latestReview.rating).toFixed(1)}{" "}
            <span style={{ color: "var(--text-muted)" }}>({c.latestReview.review_count})</span>
          </span>
        ) : (
          <span style={{ color: "var(--text-muted)" }}>—</span>
        ),
    },
    {
      key: "insights",
      label: "Open ideas",
      accessor: (c) => (c.openInsightCounts.critical || 0) * 100 + (c.openInsightCounts.high || 0),
      render: (c) => insightSummary(c.openInsightCounts) || <span style={{ color: "var(--text-muted)" }}>clear</span>,
    },
    {
      key: "scan",
      label: "Scan",
      accessor: (c) => (c.latestScan ? (c.latestScan.error || c.latestScan.status_code >= 400 ? 0 : 1) : -1),
      render: (c) =>
        c.latestScan ? (
          c.latestScan.error || (c.latestScan.status_code && c.latestScan.status_code >= 400) ? (
            <span className="badge badge-critical">issue</span>
          ) : (
            <span className="badge badge-good">ok</span>
          )
        ) : (
          <span style={{ color: "var(--text-muted)" }}>never scanned</span>
        ),
    },
  ];

  return <DataTable columns={columns} rows={clients} rowKey={(c) => c.id} initialSortKey="page_views" />;
}
