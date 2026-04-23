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
      className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 md:pt-28 pb-16 max-w-7xl mx-auto"
    >
      {/* Badge — on mobile: short + tight. On desktop: full detail. */}
      <div data-reveal className="mb-8 md:mb-10 flex items-center gap-3 flex-wrap">
        <span className="inline-flex items-center gap-2 text-[11px] md:text-xs font-medium text-ink-soft border border-border rounded-full px-3 md:px-4 py-1.5">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
          <span className="font-bold text-ink">First month FREE</span>
          <span className="hidden sm:inline">· then £55/mo · Cancel any time</span>
          <span className="inline sm:hidden">· £55/mo after</span>
        </span>
        <span className="hidden md:inline-block text-xs text-ink-faint">
          Trusted by 20+ UK businesses
        </span>
      </div>

      <h1
        data-reveal
        className="font-display font-black text-[2.75rem] leading-[0.95] sm:text-7xl md:text-8xl lg:text-[6.5rem] md:leading-[0.93] tracking-tight text-ink max-w-5xl"
      >
        Get found on Google.
        <br />
        <em className="italic text-highlight">Win more jobs.</em>
      </h1>

      <div data-reveal className="mt-5 md:mt-8">
        <p className="text-base md:text-xl font-medium text-ink max-w-2xl leading-snug">
          Glasgow websites for tradespeople &amp; local businesses.{" "}
          <span className="text-highlight">First month on me.</span>
        </p>
        <p className="mt-2 md:mt-3 text-sm md:text-base text-ink-soft leading-relaxed max-w-lg font-light">
          Plumbers, electricians, builders, salons, cafes — if you're a Glasgow business that needs to be found locally on Google, I build you a fully custom, mobile-first site that converts.
        </p>
      </div>

      {/* Free month hook */}
      <div data-reveal className="mt-6 md:mt-8 max-w-xl">
        <div className="border border-highlight/30 bg-highlight/5 rounded-xl p-4 md:p-5">
          <p className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-highlight mb-1.5 md:mb-2">
            ★ New: First month free
          </p>
          <p className="text-sm text-ink font-medium leading-snug mb-1">
            I'll build and launch your site for <span className="font-bold">£0</span>. Use it for a full month free.
          </p>
          <p className="text-xs md:text-sm text-ink-soft leading-snug font-light">
            Not working for you? Cancel — no fee. Otherwise £55/mo or £499 one-off.
          </p>
        </div>
      </div>

      {/* Checkatrade comparison — tighter on mobile */}
      <div data-reveal className="mt-5 md:mt-6 max-w-lg">
        <div className="border-l-2 border-ink pl-4 py-1">
          <p className="text-sm text-ink font-medium leading-snug">
            Paying <span className="font-bold">£100+/month</span> to Checkatrade?
          </p>
          <p className="text-xs md:text-sm text-ink-soft leading-snug mt-1 font-light">
            Your own site pays for itself in under 5 months — and the leads are <em className="italic">yours</em>.
          </p>
        </div>
      </div>

      {/* CTAs */}
      <div data-reveal className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3">
        <a
          href="#contact"
          className="bg-ink text-white font-medium px-7 py-3.5 rounded-full text-sm hover:bg-highlight transition-colors duration-250 text-center"
        >
          Claim your free month
        </a>
        <a
          href="tel:07485218091"
          className="border border-border text-ink font-medium px-7 py-3.5 rounded-full text-sm hover:border-ink transition-colors duration-250 text-center inline-flex items-center justify-center gap-2 sm:hidden"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
          </svg>
          Call 07485 218 091
        </a>
        <a
          href="#pricing"
          className="hidden sm:inline-block border border-border text-ink font-medium px-7 py-3.5 rounded-full text-sm hover:border-ink transition-colors duration-250 text-center"
        >
          See pricing
        </a>
      </div>

      {/* Stats — hidden below sm breakpoint */}
      <div data-reveal className="hidden sm:grid mt-16 md:mt-24 grid-cols-3 gap-4 sm:gap-8 border-t border-border pt-10 max-w-xl">
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
    </section>
  );
}