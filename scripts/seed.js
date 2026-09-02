// One-time seed: the 16 client sites + a first pass of real recon findings
// (pulled from actually reviewing each live site's homepage on 2026-08-20).
// Safe to re-run — clients are upserted by slug, insights are only inserted
// if a client has none yet (won't duplicate on re-run).

const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

const clients = [
  // Monthly SEO clients — these are the primary focus of the weekly comparison dashboard.
  { slug: "garage-clydebank", name: "The Garage Clydebank", domain: "thegarageclydebank.co.uk", plan_type: "monthly_seo", status: "active", monthly_fee: 55 },
  { slug: "enviro-cycle-glasgow", name: "Envirocycle Glasgow", domain: "envirocycleglasgow.com", plan_type: "monthly_seo", status: "active", monthly_fee: 55 },
  { slug: "spotless-detailing", name: "SL Detailing", domain: "sl-detailing.co.uk", plan_type: "monthly_seo", status: "active", monthly_fee: 55 },
  { slug: "gallachers-car-garage", name: "Gallachers Car Garage", domain: "gallacherscargarage.co.uk", plan_type: "monthly_seo", status: "active", monthly_fee: 55 },
  { slug: "horsepower-competitions", name: "Horse Power Competitions", domain: "horsepowercomps.co.uk", plan_type: "monthly_seo", status: "active", monthly_fee: 55 },
  { slug: "garys-butchers", name: "Gary's Butchers & Fishmongers", domain: "garysbutchersandfishmongers.co.uk", plan_type: "monthly_seo", status: "active", monthly_fee: 55 },
  { slug: "elite-autocare", name: "Elite Autocare", domain: "eliteauto-care.co.uk", plan_type: "monthly_seo", status: "active", monthly_fee: 55 },

  // Fully paid (one-off build, no SEO retainer yet) — upsell targets.
  { slug: "cg-groundcare", name: "CG Groundcare", domain: "cg-groundcare.co.uk", plan_type: "fully_paid", status: "active" },
  { slug: "renovate-design", name: "Renovate Design", domain: "renovatedesign.co.uk", plan_type: "fully_paid", status: "active" },
  { slug: "clyde-valley-group", name: "Clyde Valley Group", domain: "clydevalleygroup.com", plan_type: "fully_paid", status: "active" },
  { slug: "training-advantage-group", name: "Training Advantage Group", domain: "trainingadvantagegroup.co.uk", plan_type: "fully_paid", status: "active" },
  { slug: "srl-recovery", name: "SRL Recovery", domain: "srlrecovery.com", plan_type: "fully_paid", status: "active" },
  { slug: "root-fuel", name: "Root & Fuel", domain: "rootandfuelltd.com", plan_type: "fully_paid", status: "active" },
  { slug: "rc-renovations", name: "RC Renovations", domain: "rc-renovations.vercel.app", plan_type: "fully_paid", status: "not_live" },

  // Not yet live
  { slug: "crash-assist", name: "Crash Assist", domain: "crash-assist.vercel.app", plan_type: "monthly_seo", status: "not_live" },
  { slug: "kj-management", name: "KJ Management", domain: "kj-management.vercel.app", plan_type: "monthly_seo", status: "not_live" },
];

const insightsBySlug = {
  "garage-clydebank": [
    ["seo", "medium", "Add location+service landing pages", "You have 3 locations (Clydebank x2, Alexandria) but one generic services page. Create pages like 'MOT Alexandria' / 'Car Servicing Clydebank' combining location + service to capture long-tail local search."],
    ["technical", "medium", "No schema markup detected", "Add LocalBusiness + AggregateRating + Review JSON-LD for each location so your 4.8★/48 reviews can show as rich snippets in Google search results."],
    ["content", "low", "No blog or FAQ content", "Short guides ('How often does my car need an MOT', 'Signs your brakes need attention') would capture informational searches and build topical authority."],
  ],
  "enviro-cycle-glasgow": [
    ["geo", "medium", "Build out /areas into real location pages", "Nav references 'Areas We Cover' but no dedicated town-level pages exist yet. Create one per served area (East Kilbride, Paisley, etc.) targeting 'waste uplift [town]'."],
    ["content", "medium", "Expand thin service page copy", "Service descriptions are brief bullet points. Expand to 300-500 words per service with FAQs to rank for queries like 'commercial waste removal Glasgow'."],
    ["technical", "low", "No schema markup for reviews/business", "50+ Google reviews (5.0★) and a SEPA licence aren't marked up as LocalBusiness/Review schema yet, an easy win for rich snippets."],
  ],
  "spotless-detailing": [
    ["geo", "high", "30+ service areas listed but no dedicated pages", "You list 30+ towns generically on one page. Build individual location pages (e.g. /car-detailing-hamilton): likely the single biggest untapped opportunity across the monthly clients."],
    ["technical", "medium", "No review schema", "5 Google reviews shown but not marked up. Add AggregateRating schema so stars can show directly in search results."],
    ["content", "low", "No blog", "A handful of posts (ceramic coating vs wax, how often to detail a car) would capture research-stage searches before booking."],
  ],
  "gallachers-car-garage": [
    ["geo", "medium", "Location+service combo pages", "Serves Blantyre, Hamilton, Bothwell, Uddingston, Cambuslang, East Kilbride but only has one general page. Build pages like 'Brake Repairs Hamilton'."],
    ["content", "medium", "Add service guide content", "'When to replace a timing belt', 'Signs your clutch is failing': informational content that funnels straight into bookings."],
    ["technical", "low", "No schema for 4.8★/40 reviews", "Add LocalBusiness + AggregateRating JSON-LD to get review stars showing in search results."],
  ],
  "horsepower-competitions": [
    ["technical", "high", "No trust content on a money-handling site", "Prize competition sites live or die on trust and there are no testimonials or winner stories visible. Add a 'Recent Winners' page with photos/names (with permission): this is a conversion issue as much as SEO."],
    ["seo", "medium", "Zero content beyond the homepage", "No blog/guides at all. Pages like 'How the draws work' or 'Past winners' would build organic reach beyond paid traffic."],
    ["technical", "low", "No phone number or schema markup", "No phone number anywhere on-site and no Organization schema with full NAP, both hurt trust and local relevance."],
  ],
  "garys-butchers": [
    ["geo", "medium", "Name nearby villages explicitly", "Copy says 'Erskine and surrounding villages' vaguely. Name them (Renfrew, Inchinnan, Bridge of Weir) with short local sections to pick up 'butcher near [town]' searches."],
    ["content", "medium", "Recipe/content hub", "Real credibility here (since 2015, 5★, hand-cut): a few recipe/sourcing posts would build topical authority and internal links back to the shop."],
    ["technical", "low", "Add review + LocalBusiness schema", "5★ Google rating and testimonials are on-page but not marked up as schema yet."],
  ],
  "elite-autocare": [
    ["geo", "high", "82 areas claimed, only 9 have visible pages", "Biggest opportunity here: either build out the remaining area pages with unique copy, or trim the claimed coverage to what you can actually rank for. Claiming 82 areas with 9 real pages reads as thin to Google."],
    ["technical", "medium", "No AggregateRating schema", "Google Business reviews are quoted on-page but not marked up as schema."],
    ["content", "low", "No FAQ/blog content", "'Wax vs sealant', 'does mobile valeting work in winter': informational content for the research stage."],
  ],
  "cg-groundcare": [
    ["upsell", "high", "No street address published anywhere", "This weakens local trust and Google Maps ranking. Combined with zero blog/location pages across 3 service areas (Newton Mearns, Glasgow East, Edinburgh), this is a strong case for a monthly SEO retainer."],
    ["upsell", "medium", "No schema markup at all", "No LocalBusiness or Service schema, a quick technical win worth bundling into any retainer pitch."],
  ],
  "renovate-design": [
    ["technical", "critical", "Site renders almost no content server-side", "Homepage HTML is a ~650 byte empty shell (a create-react-app default): the title tag is just 'Renovate Design' and the meta description is literally the CRA placeholder text, never customized. Search engines see almost nothing here. Recommend rebuilding on the same Next.js/SSR stack as the other client sites, or at minimum fixing title/meta and adding prerendering, since right now this site is close to invisible to Google."],
  ],
  "clyde-valley-group": [
    ["upsell", "high", "No address, testimonials, or accreditation badges shown", "For a fuel-systems/motorsport business this is a credibility gap as much as an SEO one (no Gas Safe/OFTEC badges visible), a good upsell conversation around trust content plus local pages."],
    ["upsell", "medium", "No blog, schema, or defined service area", "Unclear if this business serves Scotland or the whole UK. Defining and targeting a service area would sharpen both messaging and SEO."],
  ],
  "training-advantage-group": [
    ["upsell", "medium", "3 locations, zero location-specific pages", "Bothwell, Motherwell and Glasgow all share one page. Strongest upsell candidate of the fully-paid group: 15+ years experience, DVSA/JAUPT accredited, 5.0★/18 reviews, 10k+ learners are all real authority signals not yet supporting location or course-specific SEO pages."],
    ["upsell", "low", "No schema for courses, reviews, or local business", "Course schema plus review schema would be a quick, high-signal addition given the accreditation strength."],
  ],
  "srl-recovery": [
    ["upsell", "high", "12+ service areas in nav, no location pages", "Title tag is already well-optimized and the site clearly has investment (FAQ section, pricing table), but 111+ reviews and 12+ areas aren't backed by dedicated location pages or schema. Strong candidate to pitch a content/local-SEO retainer."],
  ],
  "root-fuel": [
    ["upsell", "medium", "No phone number, social links, or CTA tracking evident", "The founder's health-journey story is a strong content asset currently unused for SEO. A blog tying nutrition topics to Glasgow would differentiate from other meal-prep competitors in the area."],
  ],
  "crash-assist": [
    ["technical", "low", "Not live yet", "Revisit SEO/GEO setup once this site is public."],
  ],
  "kj-management": [
    ["technical", "low", "Not live yet", "Revisit SEO/GEO setup once this site is public."],
  ],
  "rc-renovations": [
    ["technical", "low", "Going live shortly", "Once live, run an initial scan and set up location/service pages from day one rather than retrofitting later."],
  ],
};

async function main() {
  const clientIdBySlug = {};

  for (const c of clients) {
    const rows = await sql`
      INSERT INTO clients (name, slug, domain, plan_type, status, monthly_fee)
      VALUES (${c.name}, ${c.slug}, ${c.domain}, ${c.plan_type}, ${c.status}, ${c.monthly_fee ?? null})
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        domain = EXCLUDED.domain,
        plan_type = EXCLUDED.plan_type,
        status = EXCLUDED.status,
        monthly_fee = COALESCE(clients.monthly_fee, EXCLUDED.monthly_fee)
      RETURNING id, slug
    `;
    clientIdBySlug[rows[0].slug] = rows[0].id;
    console.log(`Upserted client: ${c.name} (${c.slug})`);
  }

  for (const [slug, items] of Object.entries(insightsBySlug)) {
    const clientId = clientIdBySlug[slug];
    if (!clientId) continue;

    const existing = await sql`SELECT id FROM insights WHERE client_id = ${clientId} LIMIT 1`;
    if (existing.length > 0) {
      console.log(`Skipping insights for ${slug} — already has some.`);
      continue;
    }

    for (const [category, priority, title, description] of items) {
      await sql`
        INSERT INTO insights (client_id, category, title, description, priority, status, source)
        VALUES (${clientId}, ${category}, ${title}, ${description}, ${priority}, 'open', 'recon')
      `;
    }
    console.log(`Seeded ${items.length} insight(s) for ${slug}`);
  }

  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
