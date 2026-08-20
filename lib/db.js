import { neon } from "@neondatabase/serverless";

// `cache: "no-store"` stops Next.js's fetch-patching from memoizing/caching
// the driver's internal HTTP calls to Neon — without it, concurrent queries
// issued via Promise.all can get deduped against each other and silently
// return the wrong query's result.
export const sql = neon(process.env.DATABASE_URL, {
  fetchOptions: { cache: "no-store" },
});
