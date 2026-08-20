"use client";

import Link from "next/link";
import DataTable from "./DataTable";
import TrendBadge from "./TrendBadge";
import InlinePageViewsCell from "./InlinePageViewsCell";
import { mostRecentMonday, weekBefore } from "@/lib/dates";

function insightSummary(counts) {
  const critical = counts.critical || 0;
  const high = counts.high || 0;
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (total === 0) return null;
  const other = total - critical - high;
  return (
    <span style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {critical > 0 && <span className="badge badge-critical">{critical} critical</span>}
      {high > 0 && <span className="badge badge-high">{high} high</span>}
      {other > 0 && <span className="badge badge-neutral">{other} more</span>}
    </span>
  );
}

export default function ClientOverviewTable({ clients }) {
  const thisWeek = mostRecentMonday();
  const lastWeek = weekBefore(thisWeek);

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
      key: "last_week",
      label: "Page views last week",
      accessor: (c) => c.lastWeekViews ?? -1,
      render: (c) => (
        <InlinePageViewsCell clientId={c.id} weekStart={lastWeek} value={c.lastWeekViews} label="last week's" />
      ),
    },
    {
      key: "this_week",
      label: "Page views this week",
      accessor: (c) => c.thisWeekViews ?? -1,
      render: (c) => (
        <InlinePageViewsCell clientId={c.id} weekStart={thisWeek} value={c.thisWeekViews} label="this week's" />
      ),
    },
    {
      key: "trend",
      label: "vs last week",
      accessor: (c) => {
        if (c.thisWeekViews == null || !c.lastWeekViews) return -Infinity;
        return (c.thisWeekViews - c.lastWeekViews) / c.lastWeekViews;
      },
      render: (c) => <TrendBadge current={c.thisWeekViews} previous={c.lastWeekViews} />,
    },
    {
      key: "insights",
      label: "Open ideas",
      accessor: (c) => {
        const counts = c.openInsightCounts;
        const total = Object.values(counts).reduce((a, b) => a + b, 0);
        return (counts.critical || 0) * 100000 + (counts.high || 0) * 1000 + total;
      },
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

  return <DataTable columns={columns} rows={clients} rowKey={(c) => c.id} initialSortKey="this_week" />;
}
