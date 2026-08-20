import { getRevenueData, getClientOptions } from "@/lib/queries";
import { estimateStripeFee } from "@/lib/revenue";
import AddPaymentForm from "@/components/admin/AddPaymentForm";
import StripeFeeSettingsForm from "@/components/admin/StripeFeeSettingsForm";
import DeletePaymentButton from "@/components/admin/DeletePaymentButton";

export const dynamic = "force-dynamic";

function StatTile({ label, value, sub }) {
  return (
    <div className="admin-card" style={{ padding: "16px 18px" }}>
      <div className="label">{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function gbp(n) {
  return `£${Number(n).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default async function RevenuePage() {
  const [{ settings, payments, monthlyClients }, clientOptions] = await Promise.all([
    getRevenueData(),
    getClientOptions(),
  ]);

  const feePercent = Number(settings.stripe_fee_percent);
  const feeFixed = Number(settings.stripe_fee_fixed);

  const mrrGross = monthlyClients.reduce((s, c) => s + Number(c.monthly_fee), 0);
  const mrrFee = monthlyClients.reduce((s, c) => s + estimateStripeFee(c.monthly_fee, feePercent, feeFixed), 0);
  const mrrNet = mrrGross - mrrFee;

  const now = new Date();
  const thisMonthPayments = payments.filter((p) => {
    const d = new Date(p.paid_at);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });
  const oneOffGrossAllTime = payments.reduce((s, p) => s + Number(p.amount), 0);
  const oneOffFeeAllTime = payments.reduce((s, p) => s + estimateStripeFee(p.amount, feePercent, feeFixed), 0);
  const oneOffGrossThisMonth = thisMonthPayments.reduce((s, p) => s + Number(p.amount), 0);
  const oneOffFeeThisMonth = thisMonthPayments.reduce((s, p) => s + estimateStripeFee(p.amount, feePercent, feeFixed), 0);

  const thisMonthTotalGross = mrrGross + oneOffGrossThisMonth;
  const thisMonthTotalNet = mrrNet + (oneOffGrossThisMonth - oneOffFeeThisMonth);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--font-display), serif" }}>Revenue</h1>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 4 }}>
          Stripe fee is an estimate based on the rate below — your actual per-charge fee depends on the card type and
          your Stripe plan, so treat net figures as approximate.
        </p>
      </div>

      <div className="grid-3" style={{ marginBottom: 20 }}>
        <StatTile
          label="Total revenue this month"
          value={gbp(thisMonthTotalGross)}
          sub={`${gbp(thisMonthTotalNet)} est. net — retainers + one-offs`}
        />
        <StatTile
          label="Total one-off revenue (all time)"
          value={gbp(oneOffGrossAllTime)}
          sub={`${gbp(oneOffGrossAllTime - oneOffFeeAllTime)} est. net, ${payments.length} payment${payments.length === 1 ? "" : "s"}`}
        />
        <StatTile label="Monthly recurring revenue (gross)" value={gbp(mrrGross)} sub={`${monthlyClients.length} active retainers`} />
        <StatTile label="MRR after Stripe fees (est.)" value={gbp(mrrNet)} sub={`-${gbp(mrrFee)} est. fees`} />
      </div>

      <div className="admin-card" style={{ padding: 16, marginBottom: 24 }}>
        <div className="label" style={{ marginBottom: 10 }}>
          Stripe fee rate
        </div>
        <StripeFeeSettingsForm settings={settings} />
      </div>

      <div className="detail-grid" style={{ marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>One-off payments</h2>
          <div className="admin-card" style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Client</th>
                  <th>Gross</th>
                  <th>Est. Stripe fee</th>
                  <th>Est. net</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {payments.length === 0 && (
                  <tr>
                    <td className="cell-title" colSpan={6} style={{ color: "var(--text-muted)" }}>
                      No one-off payments logged yet.
                    </td>
                  </tr>
                )}
                {payments.map((p) => {
                  const fee = estimateStripeFee(p.amount, feePercent, feeFixed);
                  return (
                    <tr key={p.id}>
                      <td className="cell-title">{new Date(p.paid_at).toLocaleDateString("en-GB")}</td>
                      <td data-label="Client">{p.client_name || <span style={{ color: "var(--text-muted)" }}>—</span>}</td>
                      <td data-label="Gross">{gbp(p.amount)}</td>
                      <td data-label="Stripe fee">-{gbp(fee)}</td>
                      <td data-label="Net">{gbp(Number(p.amount) - fee)}</td>
                      <td data-label="">
                        <DeletePaymentButton id={p.id} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: "grid", gap: 20 }}>
          <AddPaymentForm clients={clientOptions} />
        </div>
      </div>
    </div>
  );
}
