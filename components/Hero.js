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
      }, 80 + i * 110);
    });
  }, []);

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-28 pb-16 max-w-7xl mx-auto"
    >
      <div data-reveal className="mb-10 flex items-center gap-3">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-ink-soft border border-border rounded-full px-4 py-1.5">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          From £55/month or £499 one-off · No Setup Fee · Cancel Any Time
        </span>
        <span className="hidden sm:block text-xs text-ink-faint">— Trusted by 20+ UK businesses</span>
      </div>

      <h1
        data-reveal
        className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] leading-[0.93] tracking-tight text-ink max-w-5xl"
      >
        Get found on Google.
        <br />
        <em className="italic text-highlight">Win more jobs.</em>
      </h1>

      <div data-reveal className="mt-6 md:mt-8">
        <p className="text-lg md:text-xl font-medium text-ink max-w-2xl leading-snug">
          Professional websites for UK tradespeople —{" "}
          <span className="text-highlight">£55/month or £499 one-off.</span>
        </p>
        <p className="mt-3 text-base text-ink-soft leading-relaxed max-w-lg font-light">
          Built for plumbers, electricians, builders, and local trades. Fully custom, mobile-first, and optimised for local Google search — so customers in your area can find you fast.
        </p>
      </div>

      <div data-reveal className="mt-10 flex flex-col sm:flex-row gap-3">
        <a
          href="#contact"
          className="bg-ink text-white font-medium px-7 py-3.5 rounded-full text-sm hover:bg-highlight transition-colors duration-250 text-center"
        >
          Get a Free Quote
        </a>
        <a
          href="#pricing"
          className="border border-border text-ink font-medium px-7 py-3.5 rounded-full text-sm hover:border-ink transition-colors duration-250 text-center"
        >
          See pricing
        </a>
      </div>

      <div data-reveal className="mt-20 md:mt-28 grid grid-cols-3 gap-4 sm:gap-8 border-t border-border pt-10 max-w-xl">
        {[
          { n: "£55", l: "Per month, all in" },
          { n: "£499", l: "One-off option" },
          { n: "2–3wk", l: "Turnaround" },
        ].map(({ n, l }) => (
          <div key={l}>
            <div className="font-display text-3xl sm:text-4xl font-black text-ink">{n}</div>
            <div className="text-xs text-ink-faint mt-1 font-medium">{l}</div>
          </div>
        ))}
      </div>

      <div data-reveal className="mt-12 flex items-center gap-3 text-ink-faint text-xs">
        <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-[10px]">↓</div>
        <span>Scroll to learn more</span>
      </div>
    </section>
  );
}