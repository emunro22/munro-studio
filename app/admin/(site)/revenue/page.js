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

  const now = new Date();
  const thisYear = now.getUTCFullYear();
  const thisMonth = now.getUTCMonth() + 1;
  const isThisMonth = (p) => p.paid_year === thisYear && p.paid_month === thisMonth;

  const monthlyLogged = payments.filter((p) => p.type === "monthly");
  const oneOff = payments.filter((p) => p.type !== "monthly");

  const monthlyLoggedAllTime = monthlyLogged.reduce((s, p) => s + Number(p.amount), 0);
  const oneOffAllTime = oneOff.reduce((s, p) => s + Number(p.amount), 0);
  const feeAllTime = payments.reduce((s, p) => s + estimateStripeFee(p.amount, feePercent, feeFixed), 0);
  const totalAllTimeGross = monthlyLoggedAllTime + oneOffAllTime;
  const totalAllTimeNet = totalAllTimeGross - feeAllTime;

  // Current MRR is a forward-looking projection from active retainer fees —
  // used as a fallback for "this month" only until an actual monthly total
  // has been logged for the month, at which point the logged figure wins.
  const mrrGross = monthlyClients.reduce((s, c) => s + Number(c.monthly_fee), 0);

  const monthlyLoggedThisMonth = monthlyLogged.find(isThisMonth);
  const oneOffThisMonth = oneOff.filter(isThisMonth).reduce((s, p) => s + Number(p.amount), 0);
  const oneOffFeeThisMonth = oneOff.filter(isThisMonth).reduce((s, p) => s + estimateStripeFee(p.amount, feePercent, feeFixed), 0);

  const monthlyPortionThisMonth = monthlyLoggedThisMonth ? Number(monthlyLoggedThisMonth.amount) : mrrGross;
  const monthlyPortionIsProjected = !monthlyLoggedThisMonth;
  const monthlyPortionFee = monthlyLoggedThisMonth
    ? estimateStripeFee(monthlyLoggedThisMonth.amount, feePercent, feeFixed)
    : monthlyClients.reduce((s, c) => s + estimateStripeFee(c.monthly_fee, feePercent, feeFixed), 0);

  const thisMonthTotalGross = monthlyPortionThisMonth + oneOffThisMonth;
  const thisMonthTotalNet = thisMonthTotalGross - monthlyPortionFee - oneOffFeeThisMonth;

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
          label="Total revenue (all time)"
          value={gbp(totalAllTimeGross)}
          sub={`${gbp(totalAllTimeNet)} est. net — ${monthlyLogged.length} month${monthlyLogged.length === 1 ? "" : "s"} logged + ${oneOff.length} one-off${oneOff.length === 1 ? "" : "s"}`}
        />
        <StatTile
          label="Total revenue this month"
          value={gbp(thisMonthTotalGross)}
          sub={`${gbp(thisMonthTotalNet)} est. net${monthlyPortionIsProjected ? " — retainers projected, not yet logged" : ""}`}
        />
        <StatTile
          label="Monthly recurring revenue (gross)"
          value={gbp(mrrGross)}
          sub={`${monthlyClients.length} active retainer${monthlyClients.length === 1 ? "" : "s"} at current rates`}
        />
      </div>

      <div className="admin-card" style={{ padding: 16, marginBottom: 24 }}>
        <div className="label" style={{ marginBottom: 10 }}>
          Stripe fee rate
        </div>
        <StripeFeeSettingsForm settings={settings} />
      </div>

      <div className="detail-grid" style={{ marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Revenue log</h2>
          <div className="admin-card" style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
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
                    <td className="cell-title" colSpan={7} style={{ color: "var(--text-muted)" }}>
                      No revenue logged yet.
                    </td>
                  </tr>
                )}
                {payments.map((p) => {
                  const fee = estimateStripeFee(p.amount, feePercent, feeFixed);
                  return (
                    <tr key={p.id}>
                      <td className="cell-title">
                        {p.type === "monthly"
                          ? new Date(`${p.paid_year}-${String(p.paid_month).padStart(2, "0")}-01T00:00:00Z`).toLocaleDateString(
                              "en-GB",
                              { month: "long", year: "numeric" }
                            )
                          : p.paid_at_display}
                      </td>
                      <td data-label="Type">
                        <span className={`badge ${p.type === "monthly" ? "badge-good" : "badge-neutral"}`}>
                          {p.type === "monthly" ? "Monthly total" : "One-off"}
                        </span>
                      </td>
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
