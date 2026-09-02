"use client";
import { useEffect, useRef, useState } from "react";

// Two-column "before vs after" comparison card, for process/system changes
// that don't have a numeric result to chart (see BlogChart for that case).
// The right-hand column is treated as the improved state and gets the
// highlight accent.
export default function BlogCompare({ title, before, after }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const columns = [before, after];

  return (
    <div ref={ref} className="my-8">
      {title && <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint mb-4">{title}</p>}
      <div className="grid sm:grid-cols-2 gap-4">
        {columns.map((col, i) => {
          const isAfter = i === 1;
          return (
            <div
              key={i}
              className={`rounded-2xl border p-5 md:p-6 ${isAfter ? "bg-ink border-ink" : "bg-surface border-border"}`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 500ms ease-out, transform 500ms ease-out",
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <p className={`text-[11px] font-semibold uppercase tracking-widest mb-3 ${isAfter ? "text-highlight" : "text-ink-faint"}`}>
                {col.label}
              </p>
              <ul className="space-y-2">
                {col.points.map((point, j) => (
                  <li
                    key={j}
                    className={`flex items-start gap-2 text-sm font-light leading-relaxed ${isAfter ? "text-white" : "text-ink-soft"}`}
                  >
                    <span className={`flex-shrink-0 mt-1.5 w-1 h-1 rounded-full ${isAfter ? "bg-highlight" : "bg-ink-faint"}`} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
