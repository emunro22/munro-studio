"use client";
import { useState, useEffect, useRef } from "react";

const projects = [
  {
    name: "CG Groundcare",
    category: "Garden & Landscaping",
    quote: "Euan transformed our online presence completely. We started getting enquiries within the first week of going live.",
    person: "Cameron",
    role: "Founder",
    desktop: "/cg-groundcare-desktop.png",
    phone: "/cg-groundcare-iphone-removebg-preview.png",
    website: "https://cg-groundcare.co.uk",
    color: "#15803d",
  },
  {
    name: "Envirocycle Glasgow",
    category: "Waste Management",
    quote: "Professional, fast, and exactly what we needed. The site looks incredible on mobile and we rank well locally now.",
    person: "Envirocycle Team",
    role: "Client",
    desktop: "/enviro-cycle-desktop.png",
    phone: "/enviro-cycle-iphone-removebg-preview.png",
    website: "#",
    color: "#854d0e",
  },
  {
    name: "Root + Fuel",
    category: "Food & Catering",
    quote: "Euan captured our brand's essence perfectly. The new site isn't just beautiful — it's driven real growth in our customer bookings.",
    person: "Samantha Hamilton",
    role: "Founder",
    desktop: "/root-fuel-desktop.png",
    phone: "/root-fuel-iphone-removebg-preview.png",
    website: "https://rootandfuelltd.com",
    color: "#166534",
  },
  {
    name: "SRL Recovery",
    category: "Vehicle Recovery",
    quote: "Working with Euan was effortless from start to finish. He delivered a fast, scalable solution that exceeded our expectations.",
    person: "William Cassidy",
    role: "Founder",
    desktop: "/srl-recovery-desktop.png",
    phone: "/srl-recovery-iphone-removebg-preview.png",
    website: "https://srlrecovery.com",
    color: "#6d28d9",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#111111">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = (index) => {
    if (animating || index === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(index);
      setAnimating(false);
    }, 250);
  };

  const next = () => goTo((active + 1) % projects.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [active]);

  const p = projects[active];

  return (
    <section id="testimonials" className="py-24 md:py-36 px-6 md:px-10 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-4">
          Recent work
        </p>
        <h2 className="reveal font-display text-4xl md:text-6xl font-black text-ink leading-tight mb-16">
          Work that
          <br />
          <em className="italic">speaks for itself.</em>
        </h2>

        <div
          className="reveal grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(8px)" : "translateY(0)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
        >
          {/* Left — mockup display */}
          <div className="relative">
            {/* Desktop mockup */}
            <div className="rounded-xl overflow-hidden">
              <img
                src={p.desktop}
                alt={`${p.name} website desktop view`}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Phone mockup — overlaid bottom right */}
            <div
              className="absolute -bottom-6 -right-4 md:-right-8 w-[28%] md:w-[26%] drop-shadow-xl"
              style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.2))" }}
            >
              <img
                src={p.phone}
                alt={`${p.name} website mobile view`}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right — testimonial & info */}
          <div className="pt-8 lg:pt-0">
            <div className="mb-5 flex items-center gap-2">
              <span
                className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{
                  backgroundColor: `${p.color}18`,
                  color: p.color,
                }}
              >
                {p.category}
              </span>
            </div>

            <h3 className="font-display text-3xl md:text-4xl font-black text-ink mb-2">
              {p.name}
            </h3>

            <Stars />

            <blockquote className="text-base md:text-lg text-ink-soft leading-relaxed font-light mb-6 mt-3 border-l-2 border-border pl-4">
              "{p.quote}"
            </blockquote>

            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: p.color }}
              >
                {p.person.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-semibold text-ink leading-tight">{p.person}</p>
                <p className="text-xs text-ink-faint">{p.role}, {p.name}</p>
              </div>
            </div>

            {p.website !== "#" && (
              <a
                href={p.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink border border-border px-5 py-2.5 rounded-full hover:bg-ink hover:text-white hover:border-ink transition-all duration-200"
              >
                Visit site →
              </a>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="reveal flex items-center gap-3 mt-16">
          {projects.map((proj, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="text-left flex-1 max-w-[160px] group"
              aria-label={`View ${proj.name}`}
            >
              <div
                className="h-0.5 rounded-full mb-2 transition-all duration-300"
                style={{ backgroundColor: i === active ? "#111111" : "#d1d5db" }}
              />
              <span
                className="text-xs font-medium transition-colors duration-200"
                style={{ color: i === active ? "#111111" : "#9ca3af" }}
              >
                {proj.name}
              </span>
            </button>
          ))}

          <button
            onClick={next}
            className="ml-auto flex items-center gap-2 text-xs font-medium text-ink-faint hover:text-ink transition-colors duration-200 flex-shrink-0"
          >
            Next
            <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-[10px]">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}