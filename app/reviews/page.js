import Link from "next/link";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";
import RevealWrapper from "@/components/RevealWrapper";
import { getReviewsForDisplay } from "@/lib/ownReviews";

// Rendered per-request rather than at build time, so the page reflects the most
// recent pull rather than whatever was true at deploy. Reviews are in the served
// HTML, so crawlers and AI answer engines read them without running JavaScript.
export const dynamic = "force-dynamic";

const PLACE_ID = "ChIJTW3tHO5PiEgRZKBxGHvSHuY";
const GOOGLE_PROFILE_URL = `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`;
const WRITE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`;

export const metadata = {
  title: "Reviews | MunroStudio: 5★ on Google, Glasgow Web Design",
  description:
    "Every Google review left for MunroStudio, pulled live from Google. Real feedback from Glasgow trades and small businesses on web design, SEO and support.",
  alternates: { canonical: "https://munrostudio.co.uk/reviews" },
};

function timeAgo(date) {
  if (!date) return "";
  const days = Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
  if (days < 1) return "today";
  if (days < 14) return `${days} day${days === 1 ? "" : "s"} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 8) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  if (months < 18) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

function Stars({ count = 5, size = 15 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {[...Array(count)].map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function ReviewCard({ author, rating, text, publishedAt }) {
  const initials = author.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <article className="bg-white rounded-2xl p-5 md:p-6 border border-border flex flex-col gap-3 break-inside-avoid mb-4 md:mb-5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 bg-ink">
            {initials}
          </div>
          <div>
            <p className="text-sm font-bold text-ink leading-tight">{author}</p>
            <p className="text-[11px] text-ink-faint mt-0.5">{timeAgo(publishedAt)}</p>
          </div>
        </div>
        <GoogleIcon />
      </div>
      <Stars count={rating || 5} size={14} />
      <p className="text-sm text-ink-soft leading-relaxed font-light">{text}</p>
    </article>
  );
}

export default async function ReviewsPage() {
  let meta = null;
  try {
    meta = await getReviewsForDisplay();
  } catch {
    // Reviews are social proof, not the point of the page — if the database is
    // unreachable the page still renders with the link out to Google.
  }

  // Exactly what Google returned on the last pull, refreshed by the daily cron.
  const reviews = (meta?.reviews || []).map((r) => ({
    author: r.name,
    rating: r.rating,
    text: r.text,
    published_at: r.time,
  }));

  const rating = meta?.rating ? Number(meta.rating) : 5;
  const reviewCount = reviews.length;

  // Real Review + AggregateRating markup, attached to the LocalBusiness node
  // declared in app/layout.js so Google and AI answer engines tie the two
  // together rather than treating this as a second, unrelated business.
  const schema = reviews.length
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://munrostudio.co.uk/#business",
        name: "MunroStudio",
        url: "https://munrostudio.co.uk",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: rating.toFixed(1),
          reviewCount: String(reviewCount),
          bestRating: "5",
          worstRating: "1",
        },
        review: reviews.map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.author },
          datePublished: r.published_at ? new Date(r.published_at).toISOString().slice(0, 10) : undefined,
          reviewRating: {
            "@type": "Rating",
            ratingValue: String(r.rating || 5),
            bestRating: "5",
            worstRating: "1",
          },
          reviewBody: r.text,
        })),
      }
    : null;

  return (
    <div className="bg-white">
      <Navbar />
      <RevealWrapper>
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}

        <section className="pt-28 md:pt-36 pb-10 md:pb-14 px-5 md:px-10 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-3">
              Google Reviews
            </p>
            <h1 className="reveal font-display text-4xl md:text-6xl font-black text-ink leading-tight mb-5">
              What clients
              <br />
              <em className="italic">are saying.</em>
            </h1>

            <div className="reveal flex items-center justify-center gap-3 mb-5">
              <Stars />
              <span className="text-base font-bold text-ink">{rating.toFixed(1)}</span>
              <span className="text-sm text-ink-faint">
                from {reviewCount} Google review{reviewCount === 1 ? "" : "s"}
              </span>
            </div>

            <p className="reveal text-sm md:text-base text-ink-soft font-light max-w-lg mx-auto leading-relaxed">
              Pulled straight from my Google Business Profile, automatically. Google publishes five reviews through
              its API, so these are the five it is serving right now — nothing here is written by me.
            </p>
          </div>
        </section>

        <section className="pb-14 md:pb-20 px-5 md:px-10 bg-white">
          <div className="max-w-5xl mx-auto">
            {reviews.length ? (
              <div className="reveal columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-5">
                {reviews.map((r) => (
                  <ReviewCard
                    key={`${r.author}-${r.published_at}`}
                    author={r.author}
                    rating={r.rating}
                    text={r.text}
                    publishedAt={r.published_at}
                  />
                ))}
              </div>
            ) : (
              <p className="reveal text-center text-sm text-ink-soft font-light">
                Reviews are taking a moment to load.{" "}
                <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-highlight underline">
                  Read them on Google instead
                </a>
                .
              </p>
            )}
          </div>
        </section>

        <section className="py-14 md:py-20 px-5 md:px-10 bg-surface text-center">
          <h2 className="reveal font-display text-2xl md:text-3xl font-black text-ink mb-3">
            Worked with me before?
          </h2>
          <p className="reveal text-sm text-ink-soft font-light mb-6 max-w-md mx-auto leading-relaxed">
            Reviews are how most of my work comes in. If I built you something you are happy with, a couple of lines
            on Google genuinely helps.
          </p>
          <div className="reveal flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href={WRITE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-white font-semibold px-6 py-3.5 rounded-full text-sm hover:bg-highlight active:scale-95 transition-all duration-200"
            >
              <GoogleIcon size={16} />
              Leave a review
            </a>
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink border border-border px-6 py-3.5 rounded-full hover:bg-ink hover:text-white hover:border-ink active:scale-95 transition-all duration-200"
            >
              See the profile on Google
            </a>
          </div>
        </section>

        <section className="py-14 md:py-20 px-5 md:px-10 bg-white text-center">
          <p className="reveal text-sm text-ink-soft font-light mb-4">Ready to see what your site could look like?</p>
          <Link
            href="/pricing"
            className="reveal inline-flex items-center gap-2 bg-ink text-white font-semibold px-6 py-3.5 rounded-full text-sm hover:bg-highlight active:scale-95 transition-all duration-200"
          >
            See pricing →
          </Link>
        </section>

        <Contact />
        <WhatsAppButton />
      </RevealWrapper>
    </div>
  );
}
