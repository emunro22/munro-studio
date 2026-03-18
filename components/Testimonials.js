"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
//  EDIT YOUR TESTIMONIALS HERE
//  logoSrc: put your client logo files in /public/logos/ and reference like:
//           logoSrc: "/logos/acme.png"
//  Leave logoSrc as null to use the auto-generated initial avatar instead.
// ─────────────────────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Shawaiz Khan",
    role: "CEO",
    company: "GTown Kettles",
    quote: "“We saw a noticeable increase in customer engagement after launching the new site. Euan’s attention to detail and user experience really set him apart.”",
    logoSrc: null,
    initials: "SK",
    color: "#0057FF",
    websiteUrl: "https://gtownkettles.com", // ← replace with real URL, or set null to hide
  },
  {
    name: "David Munro",
    role: "Founder",
    company: "SRL Recovery",
    quote: "Working with Euan was effortless from start to finish. He quickly understood our goals and delivered a fast, scalable solution that exceeded our expectations.",
    logoSrc: null,
    initials: "HL",
    color: "#111111",
    websiteUrl: "https://srlrecovery.com",
  },
  {
    name: "Michael McCourt",
    role: "CEO",
    company: "Training Advantage Group",
    quote: "“Working with Euan felt effortless. He took care of everything from planning to deployment and exceeded every expectation.",
    logoSrc: null,
    initials: "BW",
    color: "#D4476A",
    websiteUrl: "https://trainingadvantagegroup.co.uk",
  },
  {
    name: "Colin Neil",
    role: "Founder",
    company: "Clyde Valley Group",
    quote: "Euan transformed our outdated site into a modern, accessible platform. Our team and customers love it.",
    logoSrc: null,
    initials: "FS",
    color: "#F59E0B",
    websiteUrl: "https://clydevalleygroup.com/",
  },
  {
    name: "Rhys Duncan",
    role: "Founder",
    company: "Renovate Design",
    quote: "The attention to detail is extraordinary. Every animation, every hover state — it all just feels right. Our users love it.",
    logoSrc: null,
    initials: "SK",
    color: "#7C3AED",
    websiteUrl: "https://renovatedesign.co.uk/",
  },
  {
    name: "Samantha Hamilton",
    role: "Founder/Chef",
    company: "Root & Fuel",
    quote: "Our portfolio site is now our best salesperson. The work sells itself. Thank you for bringing our vision to life.",
    logoSrc: null,
    initials: "CA",
    color: "#059669",
    websiteUrl: "https://rootandfuelltd.com/",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#111111">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function LogoAvatar({ t }) {
  if (t.logoSrc) {
    return (
      <img
        src={t.logoSrc}
        alt={t.company}
        className="w-10 h-10 object-contain rounded-lg"
      />
    );
  }
  return (
    <div
      className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold font-display flex-shrink-0"
      style={{ backgroundColor: t.color }}
    >
      {t.initials}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const intervalRef = useRef(null);

  // Scroll only within the card track — never touches page scroll position
  const scrollTrackTo = useCallback((idx) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[idx];
    if (!card) return;
    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const offset = cardRect.left - trackRect.left - (trackRect.width - cardRect.width) / 2;
    track.scrollBy({ left: offset, behavior: "smooth" });
  }, []);

  const scrollTo = useCallback((idx) => {
    setActive(idx);
    scrollTrackTo(idx);
  }, [scrollTrackTo]);

  const next = useCallback(() => {
    const idx = (active + 1) % testimonials.length;
    scrollTo(idx);
  }, [active, scrollTo]);

  const prev = useCallback(() => {
    const idx = (active - 1 + testimonials.length) % testimonials.length;
    scrollTo(idx);
  }, [active, scrollTo]);

  const startAuto = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((a) => {
        const idx = (a + 1) % testimonials.length;
        // Use scrollTrackTo via ref to avoid stale closure issues
        const track = trackRef.current;
        if (track) {
          const card = track.children[idx];
          if (card) {
            const trackRect = track.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            const offset = cardRect.left - trackRect.left - (trackRect.width - cardRect.width) / 2;
            track.scrollBy({ left: offset, behavior: "smooth" });
          }
        }
        return idx;
      });
    }, 4500);
  }, []);

  useEffect(() => {
    startAuto();
    return () => clearInterval(intervalRef.current);
  }, [startAuto]);

  const handleUserNav = (fn) => {
    clearInterval(intervalRef.current);
    fn();
    startAuto();
  };

  return (
    <section id="testimonials" className="py-24 md:py-36 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-12">
        <p className="text-xs font-medium text-ink-faint tracking-widest uppercase mb-3">
          Social proof
        </p>
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl md:text-6xl font-black text-ink leading-tight">
            What clients say
          </h2>
          {/* Desktop nav */}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => handleUserNav(prev)}
              aria-label="Previous"
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-ink-faint hover:border-ink hover:text-ink transition-all duration-200"
            >
              ←
            </button>
            <button
              onClick={() => handleUserNav(next)}
              aria-label="Next"
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-ink-faint hover:border-ink hover:text-ink transition-all duration-200"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Cards track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 md:px-[max(40px,calc((100vw-1280px)/2))]"
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="snap-center flex-shrink-0 w-[300px] sm:w-[360px]"
            onClick={() => handleUserNav(() => scrollTo(i))}
          >
            <div
              className={`h-full border rounded-2xl p-7 sm:p-8 cursor-pointer transition-all duration-500 bg-white ${
                i === active
                  ? "border-ink shadow-lg scale-100 opacity-100"
                  : "border-border opacity-50 scale-[0.98] hover:opacity-70"
              }`}
            >
              {/* Company logo area */}
              <div className="flex items-center gap-3 mb-6">
                <LogoAvatar t={t} />
                <div>
                  <div className="text-sm font-semibold text-ink leading-tight">{t.company}</div>
                  <div className="text-xs text-ink-faint mt-0.5">{t.role}</div>
                </div>
              </div>

              <Stars />

              <blockquote className="text-sm sm:text-base text-ink-soft leading-relaxed font-light mb-6">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center justify-between pt-5 border-t border-border">
                <div className="text-xs text-ink-faint">— {t.name}</div>
                {t.websiteUrl && (
                  <a
                    href={t.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-ink hover:text-highlight transition-colors duration-200 group/link"
                  >
                    Visit site
                    <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8 px-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => handleUserNav(() => scrollTo(i))}
            aria-label={`Testimonial ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === active ? "bg-ink w-6 h-2" : "bg-border w-2 h-2 hover:bg-ink-faint"
            }`}
          />
        ))}
      </div>

      {/* Mobile nav */}
      <div className="sm:hidden flex justify-center gap-3 mt-6">
        <button
          onClick={() => handleUserNav(prev)}
          aria-label="Previous"
          className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-ink-faint"
        >
          ←
        </button>
        <button
          onClick={() => handleUserNav(next)}
          aria-label="Next"
          className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-ink-faint"
        >
          →
        </button>
      </div>
    </section>
  );
}