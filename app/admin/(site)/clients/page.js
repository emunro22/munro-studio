import { getClientsWithStats } from "@/lib/queries";
import AddClientForm from "@/components/admin/AddClientForm";
import ClientsListTable from "@/components/admin/ClientsListTable";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const clients = await getClientsWithStats();

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--font-display), serif" }}>Clients</h1>
        <AddClientForm />
      </div>

      <div className="admin-card" style={{ overflowX: "auto" }}>
        <ClientsListTable clients={clients} />
      </div>
    </div>
  );
}
