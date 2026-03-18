"use client";
import { useEffect, useRef } from "react";

const timeline = [
  { year: "2020", label: "The beginning", desc: "Started the web design studio at 20 while studying at university. First clients came through word of mouth alone." },
  { year: "2021", label: "Finding momentum", desc: "Completed 5 paid projects. Learned that great design means understanding business goals, not just aesthetics." },
  { year: "2022", label: "Full-stack expansion", desc: "Added development and brand identity to the offering. Clients started coming back for repeat work." },
  { year: "2023", label: "Growing the roster", desc: "Crossed 15 clients across retail, SaaS, professional services and hospitality." },
  { year: "2024", label: "Studio today", desc: "20+ clients served across the UK, EU and North America. Still the same obsession with craft." },
];

const values = [
  { icon: "◇", label: "Craft-first" },
  { icon: "◈", label: "Client-led" },
  { icon: "◉", label: "Results-driven" },
  { icon: "◻", label: "Always evolving" },
];

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    els?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="py-24 md:py-36 px-6 md:px-10 bg-surface">
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-12">
          The story
        </p>

        {/* Top block */}
        <div className="reveal grid md:grid-cols-2 gap-12 md:gap-24 mb-20 md:mb-28">
          <div>
            <h2 className="font-display text-4xl md:text-6xl font-black text-ink leading-tight">
              Built from
              <br />
              <em className="italic">scratch.</em>
            </h2>
          </div>
          <div className="flex flex-col justify-center gap-4 text-ink-soft text-base leading-relaxed font-light">
            <p>
              It started simply — a laptop, a problem to solve, and a belief that
              small businesses deserve beautiful websites. At 20, still balancing
              lectures and deadlines, I took on my first client.
            </p>
            <p>
              What began as freelance projects grew into a proper design studio.
              Today I work with founders and marketing teams who understand that{" "}
              <span className="text-ink font-medium">great design is a competitive advantage</span>,
              not just a nice-to-have.
            </p>
            <p>
              Every project gets the same attention — whether it's a one-page landing
              site or a full brand identity and custom build.
            </p>
          </div>
        </div>

        {/* Values pills */}
        <div className="reveal flex flex-wrap gap-3 mb-20 md:mb-28">
          {values.map((v) => (
            <div
              key={v.label}
              className="flex items-center gap-2 border border-border bg-white rounded-full px-5 py-2.5 text-sm font-medium text-ink"
            >
              <span className="text-ink-faint text-xs">{v.icon}</span>
              {v.label}
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="reveal">
          <p className="text-xs font-medium text-ink-faint tracking-widest uppercase mb-8">
            Timeline
          </p>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className="group grid sm:grid-cols-[100px_1fr] gap-4 sm:gap-10 py-6 border-b border-border last:border-b-0 hover:bg-white hover:-mx-6 hover:px-6 transition-all duration-300 rounded-sm"
              >
                <div className="flex items-start gap-3 sm:block">
                  <span className="font-display text-sm font-bold text-ink">{item.year}</span>
                  <span className="text-xs text-ink-faint sm:block sm:mt-1">{item.label}</span>
                </div>
                <p className="text-sm text-ink-soft leading-relaxed group-hover:text-ink transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
