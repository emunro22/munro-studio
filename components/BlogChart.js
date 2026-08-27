"use client";
import { useEffect, useRef, useState } from "react";

// Simple animated horizontal bar chart for real, verified numbers only — no
// fabricated time-series data. Bars for aggregate/before-after comparisons
// where that's genuinely all the underlying data supports.
export default function BlogChart({ title, note, bars }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const max = Math.max(...bars.map((b) => b.value));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="my-8 bg-surface border border-border rounded-2xl p-6 md:p-8">
      {title && <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint mb-6">{title}</p>}
      <div className="space-y-5">
        {bars.map((bar, i) => (
          <div key={i}>
            <div className="flex items-baseline justify-between mb-1.5 gap-3">
              <span className="text-sm text-ink-soft font-light">{bar.label}</span>
              <span className="font-display font-black text-ink tabular-nums whitespace-nowrap">
                {bar.prefix || ""}
                {bar.value.toLocaleString("en-GB")}
                {bar.suffix || ""}
              </span>
            </div>
            <div className="h-2.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-highlight rounded-full transition-all ease-out"
                style={{
                  width: visible ? `${Math.max((bar.value / max) * 100, 3)}%` : "0%",
                  transitionDuration: "1000ms",
                  transitionDelay: `${i * 120}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {note && <p className="text-[11px] text-ink-faint font-light mt-6 leading-relaxed">{note}</p>}
    </div>
  );
}
