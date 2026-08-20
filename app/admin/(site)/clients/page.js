import Link from "next/link";
import { getClientsWithStats } from "@/lib/queries";
import AddClientForm from "@/components/admin/AddClientForm";

export const dynamic = "force-dynamic";

const PLAN_LABEL = { monthly_seo: "Monthly SEO", fully_paid: "Fully paid" };
const STATUS_LABEL = { active: "Active", not_live: "Not live", paused: "Paused" };

export default async function ClientsPage() {
  const clients = await getClientsWithStats();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Clients</h1>
        <AddClientForm />
      </div>

      <div className="admin-card" style={{ overflowX: "auto" }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Domain</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Monthly fee</th>
              <th>Open ideas</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => {
              const openCount = Object.values(c.openInsightCounts).reduce((a, b) => a + b, 0);
              return (
                <tr key={c.id}>
                  <td>
                    <Link href={`/admin/clients/${c.slug}`} style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                      {c.name}
                    </Link>
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>{c.domain || "—"}</td>
                  <td>{PLAN_LABEL[c.plan_type] || c.plan_type}</td>
                  <td>{STATUS_LABEL[c.status] || c.status}</td>
                  <td>{c.monthly_fee ? `£${c.monthly_fee}` : "—"}</td>
                  <td>{openCount > 0 ? openCount : <span style={{ color: "var(--text-muted)" }}>0</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
