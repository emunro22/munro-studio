import { notFound } from "next/navigation";
import { getClientDetail } from "@/lib/queries";
import MetricsChart from "@/components/admin/MetricsChart";
import WeeklyMetricForm from "@/components/admin/WeeklyMetricForm";
import AddInsightForm from "@/components/admin/AddInsightForm";
import InsightActions from "@/components/admin/InsightActions";
import PriorityBadge from "@/components/admin/PriorityBadge";
import ScanButton from "@/components/admin/ScanButton";
import ClientSettingsForm from "@/components/admin/ClientSettingsForm";
import CompetitorsPanel from "@/components/admin/CompetitorsPanel";
import LinkCheckPanel from "@/components/admin/LinkCheckPanel";
import { buildGrowthIdeas } from "@/lib/growth";

export const dynamic = "force-dynamic";

const PLAN_LABEL = { monthly_seo: "Monthly SEO", fully_paid: "Fully paid (one-off)" };

function ScanSignal({ ok, label }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13 }}>
      <span style={{ color: "var(--text-secondary)" }}>{label}</span>
      <span className={`badge ${ok ? "badge-good" : "badge-high"}`}>{ok ? "yes" : "no"}</span>
    </div>
  );
}

export default async function ClientDetailPage({ params }) {
  const detail = await getClientDetail(params.slug);
  if (!detail) notFound();
  const { client, metricsHistory, insights, scanHistory, reviewHistory, competitors, latestLinkCheck } = detail;

  const chartPoints = [...metricsHistory]
    .reverse()
    .filter((m) => m.page_views != null)
    .map((m) => ({
      label: new Date(m.week_start).toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      value: m.page_views,
    }));

  const openInsights = insights.filter((i) => i.status === "open" || i.status === "in_progress");
  const closedInsights = insights.filter((i) => i.status === "done" || i.status === "dismissed");

  const latestScan = scanHistory[0] || null;
  const latestReview = reviewHistory[0] || null;
  const growthIdeas = buildGrowthIdeas(metricsHistory);

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--font-display), serif" }}>{client.name}</h1>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 4, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            {client.domain && (
              <a href={`https://${client.domain}`} target="_blank" rel="noreferrer">
                {client.domain}
              </a>
            )}
            <span className="badge badge-neutral">{PLAN_LABEL[client.plan_type] || client.plan_type}</span>
            {client.status !== "active" && <span className="badge badge-high">{client.status}</span>}
          </div>
        </div>
        <ScanButton clientId={client.id} label="Scan this site now" />
      </div>

      <div style={{ marginBottom: 20 }}>
        <CompetitorsPanel clientId={client.id} trade={client.trade} location={client.location} competitors={competitors} />
      </div>

      <div className="detail-grid">
        <div style={{ display: "grid", gap: 20 }}>
          <div className="admin-card" style={{ padding: 20 }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>Weekly page views</div>
            <MetricsChart points={chartPoints} />
          </div>

          <WeeklyMetricForm clientId={client.id} hasPriorData={metricsHistory.length > 0} />

          <div className="admin-card" style={{ padding: 20 }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>Ideas to get more views</div>
            <div style={{ display: "grid", gap: 12 }}>
              {growthIdeas.map((idea, idx) => (
                <div key={idx} style={{ paddingBottom: 12, borderBottom: idx < growthIdeas.length - 1 ? "1px solid var(--gridline)" : "none" }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{idea.title}</div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 3 }}>{idea.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontWeight: 700 }}>SEO / GEO / AEO ideas</div>
              <AddInsightForm clientId={client.id} />
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {openInsights.length === 0 && (
                <div className="admin-card" style={{ padding: 16, fontSize: 14, color: "var(--text-muted)" }}>
                  No open ideas right now.
                </div>
              )}
              {openInsights.map((i) => (
                <div key={i.id} className="admin-card" style={{ padding: 16 }}>
                  <div className="insight-row">
                    <div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                        <PriorityBadge priority={i.priority} />
                        <span className="badge badge-neutral">{i.category}</span>
                        {i.source === "auto_scan" && <span style={{ fontSize: 11, color: "var(--text-muted)" }}>auto-scan</span>}
                        {i.source === "ai" && <span style={{ fontSize: 11, color: "var(--text-muted)" }}>AI</span>}
                      </div>
                      <div style={{ fontWeight: 600 }}>{i.title}</div>
                      {i.description && (
                        <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4, whiteSpace: "pre-wrap" }}>
                          {i.description}
                        </div>
                      )}
                    </div>
                    <InsightActions id={i.id} status={i.status} />
                  </div>
                </div>
              ))}
            </div>

            {closedInsights.length > 0 && (
              <details style={{ marginTop: 12 }}>
                <summary style={{ cursor: "pointer", fontSize: 13, color: "var(--text-muted)" }}>
                  {closedInsights.length} closed idea(s)
                </summary>
                <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
                  {closedInsights.map((i) => (
                    <div key={i.id} className="admin-card" style={{ padding: 12, opacity: 0.6 }}>
                      <div className="insight-row">
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, textDecoration: "line-through" }}>{i.title}</div>
                        </div>
                        <InsightActions id={i.id} status={i.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>
        </div>

        <div style={{ display: "grid", gap: 20 }}>
          {latestReview && (
            <div className="admin-card" style={{ padding: 16 }}>
              <div className="label" style={{ marginBottom: 6 }}>
                Google reviews
              </div>
              {latestReview.rating ? (
                <>
                  <div style={{ fontSize: 22, fontWeight: 700 }}>
                    ★ {Number(latestReview.rating).toFixed(1)}{" "}
                    <span style={{ fontSize: 13, fontWeight: 400, color: "var(--text-muted)" }}>
                      ({latestReview.review_count} reviews)
                    </span>
                  </div>
                  <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
                    {(latestReview.reviews || []).slice(0, 3).map((r, idx) => (
                      <div key={idx} style={{ fontSize: 12, borderTop: "1px solid var(--gridline)", paddingTop: 8 }}>
                        <div style={{ fontWeight: 600 }}>
                          {r.author} · {"★".repeat(r.rating)}
                        </div>
                        <div style={{ color: "var(--text-secondary)", marginTop: 2 }}>
                          {r.text?.slice(0, 140)}
                          {r.text?.length > 140 ? "…" : ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  {latestReview.error || "Could not match a Google Business Profile automatically."}
                </div>
              )}
            </div>
          )}

          {latestScan && (
            <div className="admin-card" style={{ padding: 16 }}>
              <div className="label" style={{ marginBottom: 6 }}>
                Latest technical scan
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
                {new Date(latestScan.scanned_at).toLocaleString("en-GB")}
              </div>
              {latestScan.error ? (
                <div style={{ fontSize: 13, color: "var(--critical)" }}>{latestScan.error}</div>
              ) : (
                <>
                  <ScanSignal ok={!!latestScan.title} label="Title tag present" />
                  <ScanSignal ok={!!latestScan.meta_description} label="Meta description present" />
                  <ScanSignal ok={latestScan.has_viewport_meta} label="Mobile viewport tag" />
                  <ScanSignal ok={latestScan.has_schema_ld} label="Schema.org structured data" />
                  <ScanSignal ok={latestScan.has_sitemap} label="sitemap.xml found" />
                  <ScanSignal ok={latestScan.images_missing_alt === 0} label="All images have alt text" />
                  <ScanSignal ok={latestScan.has_clear_cta} label="Clear call-to-action" />
                  <ScanSignal ok={latestScan.has_analytics} label="Analytics installed" />
                  <ScanSignal ok={latestScan.has_privacy_policy} label="Privacy policy linked" />
                  <ScanSignal ok={latestScan.has_terms_page} label="Terms page linked" />
                  <ScanSignal ok={latestScan.has_cookie_consent} label="Cookie consent banner" />
                  <ScanSignal ok={latestScan.has_favicon} label="Favicon present" />
                  <ScanSignal ok={latestScan.has_custom_not_found} label="Custom 404 page" />
                  <ScanSignal ok={latestScan.has_html_lang} label="<html lang> attribute" />
                  <ScanSignal ok={latestScan.has_contact_form} label="Contact form (structural)" />
                  <ScanSignal ok={latestScan.has_about_page} label="About page linked" />
                  <ScanSignal ok={latestScan.has_organization_schema} label="Organization/LocalBusiness schema" />
                  <ScanSignal ok={latestScan.has_modern_image_format} label="Modern image formats (WebP/AVIF)" />
                  <ScanSignal ok={latestScan.has_descriptive_image_names} label="Descriptive image filenames" />
                  <ScanSignal ok={!latestScan.has_large_uncompressed_images} label="No oversized images" />
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13 }}>
                    <span style={{ color: "var(--text-secondary)" }}>Word count</span>
                    <span>{latestScan.word_count}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13 }}>
                    <span style={{ color: "var(--text-secondary)" }}>Response time</span>
                    <span>{latestScan.response_ms}ms</span>
                  </div>
                </>
              )}
            </div>
          )}

          <LinkCheckPanel clientId={client.id} latestLinkCheck={latestLinkCheck} />

          <details className="admin-card" style={{ padding: 16 }}>
            <summary style={{ cursor: "pointer", fontWeight: 700 }}>Client settings</summary>
            <div style={{ marginTop: 12 }}>
              <ClientSettingsForm client={client} />
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
