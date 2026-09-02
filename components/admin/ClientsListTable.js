"use client";

import Link from "next/link";
import DataTable from "./DataTable";

const PLAN_LABEL = { monthly_seo: "Monthly SEO", fully_paid: "Fully paid" };
const STATUS_LABEL = { active: "Active", not_live: "Not live", paused: "Paused" };

export default function ClientsListTable({ clients }) {
  const columns = [
    {
      key: "name",
      label: "Name",
      accessor: (c) => c.name.toLowerCase(),
      defaultDir: "asc",
      render: (c) => (
        <Link href={`/admin/clients/${c.slug}`} style={{ fontWeight: 600, color: "var(--text-primary)" }}>
          {c.name}
        </Link>
      ),
    },
    {
      key: "domain",
      label: "Domain",
      accessor: (c) => c.domain || "",
      defaultDir: "asc",
      render: (c) => <span style={{ color: "var(--text-secondary)" }}>{c.domain || "-"}</span>,
    },
    {
      key: "plan",
      label: "Plan",
      accessor: (c) => c.plan_type,
      defaultDir: "asc",
      render: (c) => PLAN_LABEL[c.plan_type] || c.plan_type,
    },
    {
      key: "status",
      label: "Status",
      accessor: (c) => c.status,
      defaultDir: "asc",
      render: (c) => STATUS_LABEL[c.status] || c.status,
    },
    {
      key: "fee",
      label: "Monthly fee",
      accessor: (c) => Number(c.monthly_fee) || 0,
      render: (c) => (c.monthly_fee ? `£${c.monthly_fee}` : "-"),
    },
    {
      key: "ideas",
      label: "Open ideas",
      accessor: (c) => Object.values(c.openInsightCounts).reduce((a, b) => a + b, 0),
      render: (c) => {
        const openCount = Object.values(c.openInsightCounts).reduce((a, b) => a + b, 0);
        return openCount > 0 ? openCount : <span style={{ color: "var(--text-muted)" }}>0</span>;
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={clients}
      rowKey={(c) => c.id}
      initialSortKey="name"
      initialSortDir="asc"
      storageKey="clients-list"
    />
  );
}
