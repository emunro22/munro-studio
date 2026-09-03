// One-off seed: loads the 13 real Google reviews that were captured by hand on
// 2026-08-31 into site_reviews, so the marketing site starts from the full set
// instead of the five Places returns on any given call.
//
// Safe to re-run. Rows are keyed on the normalised author name, and anything
// already pulled live from Places wins — this only fills gaps.
//
//   npm run reviews:seed

const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

// The relative times below were accurate as of this date, so they convert back
// to real timestamps. Live pulls overwrite these with Google's exact ones.
const CAPTURED_AT = new Date("2026-08-31T17:25:00Z");

function daysBefore(days) {
  return new Date(CAPTURED_AT.getTime() - days * 86400000).toISOString();
}
const weeksBefore = (w) => daysBefore(w * 7);

const REVIEWS = [
  ["Claire Drain", daysBefore(3), "Euan was great from start to finish. Took a plain web site and turned it into something so much more than we could have asked."],
  ["Gary", weeksBefore(6), "Euan done a great job on our custom built butchers website, highly recommend very skilled developer!"],
  ["Clyde Drift Wol", weeksBefore(7), "5 Stars from me this boy helped me massive build my competition page, very very patient guy and that helped massive he was never more that 10-15 mins away on a text and straight back to me sortng things out\u{1FAE1}"],
  ["Darren Gallacher", weeksBefore(7), "GREAT DEALING WITH MUNRO STUDIO, MADE EVERY STEP OF GETTING ME SET UP REALLY EASY AND THE END PRODUCT WAS FANTASTIC \u{1F44D}"],
  ["Ryan Campbell", weeksBefore(8), "Recently reached out to munro studio to help set up my business page and logo for my new company. it's been nothing short of first class going over and beyond to help me achieve what I've set out todo highly recommend from a buisness and personal point of view as I couldn't be happier with results"],
  ["Michael McCourt", weeksBefore(13), "Had my website hosted and revamped by Euan and he was great to deal with and swift to react to any changes, very reasonable pricing highly recommend esp for small businesses."],
  ["Nathan McInulty", weeksBefore(15), "Great service from Munro Studio, they have built my business an amazing website. From start to finish the process has been simple and any request has been catered to with ease. I would definitely be recommending this service."],
  ["Rhys Duncan", weeksBefore(18), "Euan created my business website and got it exactly how I want it and been helpful with any updates I've had."],
  ["Envirocycle Glasgow", weeksBefore(20), "Ewan was great from start to finish - efforts were next to none, I'll be staying with him for the foreseeable and passing anyone else I know in business onto him! Thanks again"],
  ["Lewis Weir", weeksBefore(23), "Euan created a professional logo and brand assets for my business, and played a key role in driving new client acquisition."],
  ["Gav", weeksBefore(23), "Euan contacted me about not having a website for my business and was very selling about why it's important. Charged me a fair price too! Would recommended to anyone who's in need of one."],
  ["Samantha Hamilton", weeksBefore(23), "Euan helped us create our website and we couldn't be happier with the process. He was understanding of our time constraints, didn't need much information from us to create a mockup and made the process quick and easy. Highly recommend."],
  ["William Cassidy", weeksBefore(23), "Excellent service and great communication highly recommend! Very happy with my business website."],
];

const reviewKey = (author) => String(author).toLowerCase().replace(/\s+/g, " ").trim();

async function main() {
  let added = 0;
  for (const [author, publishedAt, text] of REVIEWS) {
    const rows = await sql`
      INSERT INTO site_reviews (review_key, author, rating, text, published_at, source)
      VALUES (${reviewKey(author)}, ${author}, 5, ${text}, ${publishedAt}, 'captured')
      ON CONFLICT (review_key) DO NOTHING
      RETURNING review_key
    `;
    if (rows.length) added++;
  }

  const total = await sql`SELECT count(*)::int AS n FROM site_reviews`;
  console.log(`Seeded ${added} new review(s). site_reviews now holds ${total[0].n}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
