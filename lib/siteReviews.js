// The review set shown on the marketing site.
//
// Places hands back at most five reviews per call and rotates which five, so
// storing "the last response" throws away most of what Google knows about us.
// Instead every refresh unions its results into site_reviews: the set only
// ever grows, and over a few refreshes it converges on the full history.
//
// Rows are keyed on the normalised author name so the same review arriving
// from two sources (hand-captured vs live Places) collapses into one row.
// Live always wins, since it carries a real publish timestamp.

import { sql } from "./db";

export function reviewKey(author) {
  return String(author || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

// Merges a batch of reviews into the stored set. Returns how many were new.
export async function mergeReviews(reviews, source = "places") {
  const rows = (reviews || []).filter((r) => reviewKey(r.name || r.author));
  if (!rows.length) return { merged: 0, added: 0 };

  const before = await sql`SELECT count(*)::int AS n FROM site_reviews`;

  for (const r of rows) {
    const author = r.name || r.author;
    await sql`
      INSERT INTO site_reviews (review_key, author, rating, text, published_at, source)
      VALUES (
        ${reviewKey(author)}, ${author}, ${r.rating ?? null}, ${r.text ?? ""},
        ${r.time ?? r.published_at ?? null}, ${source}
      )
      ON CONFLICT (review_key) DO UPDATE SET
        author = EXCLUDED.author,
        rating = COALESCE(EXCLUDED.rating, site_reviews.rating),
        text = CASE WHEN EXCLUDED.text <> '' THEN EXCLUDED.text ELSE site_reviews.text END,
        published_at = COALESCE(EXCLUDED.published_at, site_reviews.published_at),
        source = EXCLUDED.source,
        last_seen_at = now()
    `;
  }

  const after = await sql`SELECT count(*)::int AS n FROM site_reviews`;
  return { merged: rows.length, added: after[0].n - before[0].n, total: after[0].n };
}

export async function getSiteReviews() {
  return sql`
    SELECT author, rating, text, published_at, source
    FROM site_reviews
    ORDER BY published_at DESC NULLS LAST, first_seen_at DESC
  `;
}
