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
      <div data-reveal className="mb-10 flex items-center gap-3 flex-wrap">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-ink-soft border border-border rounded-full px-4 py-1.5">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          First month <span className="font-bold text-ink">FREE</span> · then £55/mo or £499 one-off · Cancel any time
        </span>
        <span className="hidden sm:block text-xs text-ink-faint">— Glasgow-based · Trusted by 20+ UK businesses</span>
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
          Custom websites for Glasgow tradespeople & local businesses — built free, live in 2 weeks.{" "}
          <span className="text-highlight">First month on us.</span>
        </p>
        <p className="mt-3 text-base text-ink-soft leading-relaxed max-w-lg font-light">
          Plumbers, electricians, builders, salons, cafes, cleaners — if you're a Glasgow business that needs to be found locally on Google, I build you a fully custom, mobile-first site that actually converts. No templates. No tie-ins.
        </p>
      </div>

      {/* First month free — risk-reversal block */}
      <div data-reveal className="mt-8 max-w-xl">
        <div className="border border-highlight/30 bg-highlight/5 rounded-xl p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-highlight mb-2">
            ★ New: First month free
          </p>
          <p className="text-sm text-ink font-medium leading-snug mb-1">
            I'll build and launch your site for <span className="font-bold">£0</span>. Use it for a full month free.
          </p>
          <p className="text-sm text-ink-soft leading-snug font-light">
            If it's not getting you found, cancel — no questions, no fee. Otherwise £55/month (or pay £499 once and own it outright).
          </p>
        </div>
      </div>

      {/* Checkatrade comparison hook */}
      <div data-reveal className="mt-6 max-w-lg">
        <div className="border-l-2 border-ink pl-4 py-1">
          <p className="text-sm text-ink font-medium leading-snug">
            Paying <span className="font-bold">£100+/month</span> to Checkatrade or MyBuilder?
          </p>
          <p className="text-sm text-ink-soft leading-snug mt-1 font-light">
            Your own site pays for itself in under 5 months — and the leads are <em className="italic">yours</em>, not shared with 3 other trades.
          </p>
        </div>
      </div>

      <div data-reveal className="mt-10 flex flex-col sm:flex-row gap-3">
        <a
          href="#contact"
          className="bg-ink text-white font-medium px-7 py-3.5 rounded-full text-sm hover:bg-highlight transition-colors duration-250 text-center"
        >
          Claim your free month
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
          { n: "£0", l: "First month" },
          { n: "£55", l: "Per month after" },
          { n: "£499", l: "Or one-off, yours" },
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