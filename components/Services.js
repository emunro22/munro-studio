"use client";
import { useEffect, useRef } from "react";

const services = [
  {
    no: "01",
    title: "Web Design",
    desc: "Pixel-perfect, purpose-built interfaces. Every layout, colour, and interaction considered for your users.",
    tags: ["Figma", "UI Design", "Prototyping", "Wireframing"],
  },
  {
    no: "02",
    title: "Development",
    desc: "Clean, performant code in modern frameworks. Fast-loading, accessible, and built to scale.",
    tags: ["Next.js", "React", "Tailwind CSS", "CMS"],
  },
  {
    no: "03",
    title: "Brand Identity",
    desc: "Logo, colour system, typography — a cohesive visual identity that makes you instantly recognisable.",
    tags: ["Logo Design", "Colour Systems", "Typography", "Guidelines"],
  },
  {
    no: "04",
    title: "Conversion Optimisation",
    desc: "Design backed by strategy. Pages engineered to turn visitors into customers.",
    tags: ["CRO", "Landing Pages", "A/B Testing", "Analytics"],
  },
];

export default function Services() {
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    els?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" ref={ref} className="py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
          <div>
            <p className="text-xs font-medium text-ink-faint tracking-widest uppercase mb-3">
              What I offer
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-black text-ink leading-tight">
              Services
            </h2>
          </div>
          <p className="text-sm text-ink-soft max-w-xs leading-relaxed">
            Everything you need to establish a world-class web presence — under one roof.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {services.map((s, i) => (
            <div
              key={s.no}
              className="reveal bg-white p-8 group hover:bg-surface transition-colors duration-300"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start justify-between mb-8">
                <span className="font-display text-4xl font-black text-border group-hover:text-surface-2 transition-colors duration-300">
                  {s.no}
                </span>
                <span className="text-lg text-ink-faint group-hover:text-highlight group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 inline-block">
                  ↗
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-ink mb-3">{s.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed mb-6">{s.desc}</p>

              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-medium bg-surface text-ink-faint px-2.5 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
