const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

async function main() {
  await sql`
    CREATE TABLE IF NOT EXISTS clients (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      domain TEXT,
      plan_type TEXT NOT NULL DEFAULT 'fully_paid',
      status TEXT NOT NULL DEFAULT 'active',
      monthly_fee NUMERIC,
      google_place_id TEXT,
      notes TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  console.log("OK: clients");

  await sql`
    CREATE TABLE IF NOT EXISTS weekly_metrics (
      id SERIAL PRIMARY KEY,
      client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
      week_start DATE NOT NULL,
      page_views INTEGER,
      visitors INTEGER,
      top_page TEXT,
      bounce_rate NUMERIC,
      notes TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE(client_id, week_start)
    )
  `;
  console.log("OK: weekly_metrics");

  await sql`
    CREATE TABLE IF NOT EXISTS insights (
      id SERIAL PRIMARY KEY,
      client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
      category TEXT NOT NULL DEFAULT 'seo',
      title TEXT NOT NULL,
      description TEXT,
      priority TEXT NOT NULL DEFAULT 'medium',
      status TEXT NOT NULL DEFAULT 'open',
      source TEXT NOT NULL DEFAULT 'manual',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  console.log("OK: insights");

  await sql`
    CREATE TABLE IF NOT EXISTS site_scans (
      id SERIAL PRIMARY KEY,
      client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
      scanned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      status_code INTEGER,
      response_ms INTEGER,
      title TEXT,
      meta_description TEXT,
      h1 TEXT,
      word_count INTEGER,
      has_viewport_meta BOOLEAN,
      has_schema_ld BOOLEAN,
      image_count INTEGER,
      images_missing_alt INTEGER,
      internal_link_count INTEGER,
      has_robots_txt BOOLEAN,
      has_sitemap BOOLEAN,
      error TEXT
    )
  `;
  console.log("OK: site_scans");

  await sql`
    CREATE TABLE IF NOT EXISTS review_snapshots (
      id SERIAL PRIMARY KEY,
      client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
      fetched_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      rating NUMERIC,
      review_count INTEGER,
      reviews JSONB
    )
  `;
  console.log("OK: review_snapshots");

  await sql`
    CREATE TABLE IF NOT EXISTS payments (
      id SERIAL PRIMARY KEY,
      client_id INTEGER REFERENCES clients(id) ON DELETE SET NULL,
      amount NUMERIC NOT NULL,
      paid_at DATE NOT NULL,
      notes TEXT,
      type TEXT NOT NULL DEFAULT 'one_off',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`ALTER TABLE payments ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'one_off'`;
  console.log("OK: payments");

  await sql`
    CREATE TABLE IF NOT EXISTS app_settings (
      id SMALLINT PRIMARY KEY DEFAULT 1,
      stripe_fee_percent NUMERIC NOT NULL DEFAULT 1.5,
      stripe_fee_fixed NUMERIC NOT NULL DEFAULT 0.20,
      CONSTRAINT single_row CHECK (id = 1)
    )
  `;
  await sql`INSERT INTO app_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING`;
  console.log("OK: app_settings");

  await sql`CREATE INDEX IF NOT EXISTS idx_payments_client ON payments(client_id, paid_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_weekly_metrics_client ON weekly_metrics(client_id, week_start DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_insights_client ON insights(client_id, created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_site_scans_client ON site_scans(client_id, scanned_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_review_snapshots_client ON review_snapshots(client_id, fetched_at DESC)`;
  console.log("OK: indexes");

  console.log("Migration complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
