"use client";
import { useEffect, useRef, useState } from "react";

// Animated numbered step sequence for walking through how a system/process
// works (e.g. what happens automatically after a booking is made). Each
// step fades and slides in with a stagger once scrolled into view, matching
// the reveal timing used by BlogChart.
export default function BlogFlow({ title, steps }) {
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

  return (
    <div ref={ref} className="my-8 bg-surface border border-border rounded-2xl p-6 md:p-8">
      {title && <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint mb-6">{title}</p>}
      <div className="space-y-0">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex gap-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 500ms ease-out, transform 500ms ease-out",
              transitionDelay: `${i * 150}ms`,
            }}
          >
            <div className="flex flex-col items-center">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-ink text-white text-xs font-display font-black flex items-center justify-center">
                {i + 1}
              </div>
              {i < steps.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
            </div>
            <div className={i < steps.length - 1 ? "pb-6" : ""}>
              <p className="text-sm md:text-base font-semibold text-ink leading-snug">{step.title}</p>
              {step.description && (
                <p className="text-xs md:text-sm text-ink-soft font-light leading-relaxed mt-1">{step.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
