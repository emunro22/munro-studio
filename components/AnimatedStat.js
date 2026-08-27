"use client";
import { useEffect, useRef, useState } from "react";

// Counts up from 0 to `value` once the element scrolls into view — used for
// verified, single-number results (not a fabricated trend line: see the
// pricing page for why this shape was chosen over a fake weekly graph).
export default function AnimatedStat({ value, prefix = "", suffix = "", duration = 1400, label, sub }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-ink leading-none tabular-nums">
        {prefix}
        {display.toLocaleString("en-GB")}
        {suffix}
      </div>
      {label && <div className="mt-3 text-sm font-semibold text-ink">{label}</div>}
      {sub && <div className="mt-1 text-xs text-ink-faint font-light max-w-[220px] mx-auto leading-relaxed">{sub}</div>}
    </div>
  );
}
