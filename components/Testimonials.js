"use client";

import { useEffect, useState } from "react";

const GOOGLE_PROFILE_URL = "https://www.google.com/search?q=Munro+Studio+Glasgow";

function timeAgo(iso) {
  if (!iso) return "";
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days < 1) return "today";
  if (days < 14) return `${days} day${days === 1 ? "" : "s"} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 8) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months === 1 ? "" : "s"} ago`;
}

const fallbackReviews = [
  {
    name: "Nathan McInulty",
    timeAgo: "2 weeks ago",
    text: "Great service from Munro Studio, they have built my business an amazing website. From start to finish the process has been simple and any request has been catered to with ease. I would definitely be recommending this service.",
  },
  {
    name: "Rhys Duncan",
    timeAgo: "4 weeks ago",
    text: "Euan created my business website and got it exactly how I want it and been helpful with any updates I've had.",
  },
  {
    name: "Envirocycle Glasgow",
    timeAgo: "6 weeks ago",
    text: "Ewan was great from start to finish - efforts were next to none, I'll be staying with him for the foreseeable and passing anyone else I know in business onto him! Thanks again",
  },
  {
    name: "Lewis Weir",
    timeAgo: "9 weeks ago",
    text: "Euan created a professional logo and brand assets for my business, and played a key role in driving new client acquisition.",
  },
  {
    name: "Gav",
    timeAgo: "9 weeks ago",
    text: "Euan contacted me about not having a website for my business and was very selling about why it's important. Charged me a fair price too! Would recommended to anyone who's in need of one.",
  },
  {
    name: "Michael McCourt",
    timeAgo: "9 weeks ago",
    text: "Had my website hosted and revamped by Euan and he was great to deal with and swift to react to any changes, very reasonable pricing highly recommend esp for small businesses.",
  },
  {
    name: "Samantha Hamilton",
    timeAgo: "9 weeks ago",
    text: "Euan helped us create our website and we couldn't be happier with the process. He was understanding of our time constraints, didn't need much information from us to create a mockup and made the process quick and easy. Highly recommend.",
  },
  {
    name: "William Cassidy",
    timeAgo: "9 weeks ago",
    text: "Excellent service and great communication highly recommend! Very happy with my business website.",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function ReviewCard({ name, timeAgo, text }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="bg-white rounded-2xl p-5 border border-border flex flex-col gap-3 flex-shrink-0 w-72 sm:w-auto snap-start">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 bg-ink">
            {initials}
          </div>
          <div>
            <p className="text-sm font-bold text-ink leading-tight">{name}</p>
            <p className="text-[11px] text-ink-faint mt-0.5">{timeAgo}</p>
          </div>
        </div>
        <GoogleIcon />
      </div>
      <Stars />
      <p className="text-xs md:text-sm text-ink-soft leading-relaxed font-light">{text}</p>
    </div>
  );
}

export default function Testimonials() {
  const [reviews, setReviews] = useState(fallbackReviews);
  const [rating, setRating] = useState(5.0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || !data.connected || !data.reviews?.length) return;
        setReviews(
          data.reviews.map((r) => ({ name: r.name, timeAgo: timeAgo(r.time), text: r.text, rating: r.rating || 5 }))
        );
        if (data.rating) setRating(data.rating);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="reviews" className="py-16 md:py-28 px-5 md:px-10 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8 md:mb-12">
          <div>
            <p className="text-xs font-medium text-ink-faint tracking-widest uppercase mb-3">
              Google Reviews
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-ink leading-tight">
              What clients
              <br />
              <em className="italic">are saying.</em>
            </h2>
          </div>
          <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
            <div className="flex items-center gap-2">
              <Stars />
              <span className="text-sm font-bold text-ink">{Number(rating).toFixed(1)}</span>
              <span className="text-xs text-ink-faint">({reviews.length} reviews)</span>
            </div>
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink border border-border px-3 py-2 rounded-full hover:bg-ink hover:text-white hover:border-ink active:scale-95 transition-all duration-200 whitespace-nowrap"
            >
              <GoogleIcon />
              See on Google
            </a>
          </div>
        </div>

        {/* Mobile: horizontal scroll — Desktop: grid */}
        <div className="reveal -mx-5 md:mx-0">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible px-5 md:px-0 pb-4 md:pb-0 snap-x snap-mandatory scroll-smooth" style={{ scrollbarWidth: "none" }}>
            {reviews.map((r) => (
              <ReviewCard key={r.name} {...r} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="reveal mt-8 md:mt-10 text-center">
          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-ink text-white font-semibold px-6 py-3.5 rounded-full text-sm hover:bg-highlight active:scale-95 transition-all duration-200"
          >
            View Munro Studio on Google →
          </a>
        </div>

      </div>
    </section>
  );
}
