import Link from "next/link";
import { getClientsWithStats } from "@/lib/queries";
import TrendBadge from "@/components/admin/TrendBadge";
import ScanButton from "@/components/admin/ScanButton";

export const dynamic = "force-dynamic";

function StatTile({ label, value, sub }) {
  return (
    <div className="admin-card" style={{ padding: "16px 18px" }}>
      <div className="label">{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function insightSummary(counts) {
  const critical = counts.critical || 0;
  const high = counts.high || 0;
  if (critical === 0 && high === 0) return null;
  return (
    <span style={{ display: "flex", gap: 6 }}>
      {critical > 0 && <span className="badge badge-critical">{critical} critical</span>}
      {high > 0 && <span className="badge badge-high">{high} high</span>}
    </span>
  );
}

function ClientRow({ c }) {
  const pv = c.latestMetric?.page_views ?? null;
  const prevPv = c.latestMetric?.prev_page_views ?? null;
  return (
    <tr>
      <td>
        <Link href={`/admin/clients/${c.slug}`} style={{ fontWeight: 600, color: "var(--text-primary)" }}>
          {c.name}
        </Link>
        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{c.domain}</div>
      </td>
      <td>{pv != null ? pv.toLocaleString() : <span style={{ color: "var(--text-muted)" }}>—</span>}</td>
      <td>
        <TrendBadge current={pv} previous={prevPv} />
      </td>
      <td>
        {c.latestReview?.rating ? (
          <span>
            ★ {Number(c.latestReview.rating).toFixed(1)}{" "}
            <span style={{ color: "var(--text-muted)" }}>({c.latestReview.review_count})</span>
          </span>
        ) : (
          <span style={{ color: "var(--text-muted)" }}>—</span>
        )}
      </td>
      <td>{insightSummary(c.openInsightCounts) || <span style={{ color: "var(--text-muted)" }}>clear</span>}</td>
      <td>
        {c.latestScan ? (
          c.latestScan.error || (c.latestScan.status_code && c.latestScan.status_code >= 400) ? (
            <span className="badge badge-critical">issue</span>
          ) : (
            <span className="badge badge-good">ok</span>
          )
        ) : (
          <span style={{ color: "var(--text-muted)" }}>never scanned</span>
        )}
      </td>
    </tr>
  );
}

function ClientGroup({ title, clients }) {
  if (clients.length === 0) return null;
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>{title}</h2>
      <div className="admin-card" style={{ overflowX: "auto" }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Page views (last week)</th>
              <th>vs prior week</th>
              <th>Google reviews</th>
              <th>Open ideas</th>
              <th>Scan</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <ClientRow key={c.id} c={c} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default async function AdminOverviewPage() {
  const clients = await getClientsWithStats();

  const monthlySeo = clients.filter((c) => c.plan_type === "monthly_seo" && c.status === "active");
  const fullyPaid = clients.filter((c) => c.plan_type === "fully_paid" && c.status === "active");
  const notLive = clients.filter((c) => c.status === "not_live");

  const totalCritical = clients.reduce((sum, c) => sum + (c.openInsightCounts.critical || 0), 0);
  const totalHigh = clients.reduce((sum, c) => sum + (c.openInsightCounts.high || 0), 0);

  const movers = clients
    .filter((c) => c.latestMetric?.page_views != null && c.latestMetric?.prev_page_views)
    .map((c) => ({
      c,
      pct: Math.round(
        ((c.latestMetric.page_views - c.latestMetric.prev_page_views) / c.latestMetric.prev_page_views) * 100
      ),
    }))
    .sort((a, b) => b.pct - a.pct);

  const topUp = movers.filter((m) => m.pct > 0).slice(0, 3);
  const topDown = movers.filter((m) => m.pct < 0).slice(-3).reverse();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700 }}>Overview</h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 4 }}>
            SEO/GEO recommendations refresh automatically every Monday. Traffic numbers are entered by hand from
            Vercel Analytics.
          </p>
        </div>
        <ScanButton label="Scan all sites now" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 12,
          marginBottom: 28,
        }}
      >
        <StatTile label="Monthly SEO clients" value={monthlySeo.length} />
        <StatTile label="Fully paid clients" value={fullyPaid.length} sub="Upsell targets" />
        <StatTile label="Not live yet" value={notLive.length} />
        <StatTile
          label="Open critical/high ideas"
          value={totalCritical + totalHigh}
          sub={`${totalCritical} critical, ${totalHigh} high`}
        />
      </div>

      {(topUp.length > 0 || topDown.length > 0) && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
          <div className="admin-card" style={{ padding: 16 }}>
            <div className="label" style={{ marginBottom: 8 }}>
              Biggest gains this week
            </div>
            {topUp.length === 0 && <div style={{ fontSize: 13, color: "var(--text-muted)" }}>None yet</div>}
            {topUp.map(({ c, pct }) => (
              <div key={c.id} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                <Link href={`/admin/clients/${c.slug}`}>{c.name}</Link>
                <span className="badge badge-good">↑ {pct}%</span>
              </div>
            ))}
          </div>
          <div className="admin-card" style={{ padding: 16 }}>
            <div className="label" style={{ marginBottom: 8 }}>
              Biggest drops this week
            </div>
            {topDown.length === 0 && <div style={{ fontSize: 13, color: "var(--text-muted)" }}>None yet</div>}
            {topDown.map(({ c, pct }) => (
              <div key={c.id} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                <Link href={`/admin/clients/${c.slug}`}>{c.name}</Link>
                <span className="badge badge-critical">↓ {Math.abs(pct)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <ClientGroup title="Monthly SEO clients — primary focus" clients={monthlySeo} />
      <ClientGroup title="Fully paid clients — upsell review" clients={fullyPaid} />
      <ClientGroup title="Not live yet" clients={notLive} />
    </div>
  );
}
