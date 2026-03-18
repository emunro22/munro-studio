"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll("[data-reveal]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      setTimeout(() => {
        el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 100 + i * 120);
    });
  }, []);

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 pb-16 max-w-7xl mx-auto"
    >
      {/* Available badge */}
      <div data-reveal className="mb-10 flex items-center gap-3">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-ink-soft border border-border rounded-full px-4 py-1.5">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          Available for new projects
        </span>
        <span className="hidden sm:block text-xs text-ink-faint">— Est. 2022</span>
      </div>

      {/* Headline */}
      <h1
        data-reveal
        className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] leading-[0.93] tracking-tight text-ink max-w-5xl"
      >
        Design that
        <br />
        <em className="italic text-highlight">works.</em>
      </h1>

      {/* Sub-row */}
      <div
        data-reveal
        className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end gap-8 md:gap-16"
      >
        <p className="text-base md:text-lg text-ink-soft leading-relaxed max-w-md font-light">
          Web design & development studio. Started at 20 during university —
          now trusted by{" "}
          <span className="text-ink font-medium">20+ clients</span> worldwide.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:ml-auto">
          <a
            href="#work"
            className="bg-ink text-white font-medium px-7 py-3.5 rounded-full text-sm hover:bg-highlight transition-colors duration-250 text-center"
          >
            View work
          </a>
          <a
            href="#contact"
            className="border border-border text-ink font-medium px-7 py-3.5 rounded-full text-sm hover:border-ink transition-colors duration-250 text-center"
          >
            Start a project
          </a>
        </div>
      </div>

      {/* Stats */}
      <div data-reveal className="mt-20 md:mt-28 grid grid-cols-3 gap-4 sm:gap-8 border-t border-border pt-10 max-w-xl">
        {[
          { n: "20+", l: "Clients" },
          { n: "4+", l: "Years" },
          { n: "100%", l: "Satisfaction" },
        ].map(({ n, l }) => (
          <div key={l}>
            <div className="font-display text-3xl sm:text-4xl font-black text-ink">{n}</div>
            <div className="text-xs text-ink-faint mt-1 font-medium">{l}</div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div data-reveal className="mt-16 flex items-center gap-3 text-ink-faint text-xs">
        <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-[10px]">↓</div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
