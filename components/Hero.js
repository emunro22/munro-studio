"use client";
import { useEffect, useRef } from "react";

const services = [
  "Custom Website Design",
  "SEO & Sitemap XML",
  "Google Reviews Integration",
  "Booking Systems (Google Calendar etc.)",
  "Admin Portals",
  "Online Ordering",
];

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll("[data-reveal]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      setTimeout(() => {
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 60 + i * 100);
    });
  }, []);

  return (
    <section
      ref={ref}
      className="flex flex-col justify-center px-5 md:px-10 pt-20 pb-12 md:pt-28 md:pb-16 max-w-7xl mx-auto"
      style={{ minHeight: "100svh" }}
    >
      {/* Badge */}
      <div data-reveal className="mb-6 md:mb-8">
        <span className="inline-flex items-center gap-2 text-[11px] font-medium text-ink-soft border border-border rounded-full px-3 py-1.5">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
          <span className="font-bold text-ink">Glasgow Web Design</span>
          <span className="hidden sm:inline text-ink-faint">· Trusted by 20+ local businesses</span>
        </span>
      </div>

      {/* Headline */}
      <h1
        data-reveal
        className="font-display font-black text-[2.5rem] leading-[0.93] sm:text-6xl md:text-8xl lg:text-[6rem] tracking-tight text-ink max-w-4xl"
      >
        Websites that work
        <br />
        <em className="italic text-highlight">for your business.</em>
      </h1>

      {/* Subtext */}
      <div data-reveal className="mt-5 md:mt-7 max-w-lg">
        <p className="text-base md:text-xl font-medium text-ink leading-snug">
          Everything your Glasgow business needs online — custom site, SEO, booking systems, admin portal, Google reviews. All for{" "}
          <span className="text-highlight font-bold">£55/month</span>.
        </p>
      </div>

      {/* Services list */}
      <div data-reveal className="mt-5 md:mt-6 grid grid-cols-2 gap-x-4 gap-y-2 max-w-sm">
        {services.map((s) => (
          <div key={s} className="flex items-center gap-2 text-xs md:text-sm text-ink-soft font-light">
            <span className="w-1 h-1 rounded-full bg-highlight flex-shrink-0" />
            {s}
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div data-reveal className="mt-8 flex flex-col sm:flex-row gap-3 max-w-sm sm:max-w-none">
        <a
          href="#contact"
          className="bg-ink text-white font-semibold px-6 py-4 rounded-full text-sm hover:bg-highlight active:scale-95 transition-all duration-200 text-center"
        >
          Get a free quote
        </a>
        <a
          href="https://wa.me/447485218091?text=Hi%20Euan%2C%20I%27m%20interested%20in%20a%20website"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border border-border text-ink font-semibold px-6 py-4 rounded-full text-sm hover:border-green-500 hover:text-green-600 active:scale-95 transition-all duration-200 text-center"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp me
        </a>
      </div>

      {/* Stats — only desktop */}
      <div data-reveal className="hidden md:grid mt-20 grid-cols-3 gap-8 border-t border-border pt-10 max-w-xl">
        {[
          { n: "£0", l: "First month free" },
          { n: "£55", l: "Per month after" },
          { n: "£499", l: "One-off option" },
        ].map(({ n, l }) => (
          <div key={l}>
            <div className="font-display text-4xl font-black text-ink">{n}</div>
            <div className="text-xs text-ink-faint mt-1 font-medium">{l}</div>
          </div>
        ))}
      </div>

      {/* Mobile stat strip */}
      <div data-reveal className="md:hidden mt-8 flex gap-6 pt-6 border-t border-border">
        {[
          { n: "£0", l: "First month" },
          { n: "£55", l: "Per month" },
          { n: "20+", l: "Clients" },
        ].map(({ n, l }) => (
          <div key={l}>
            <div className="font-display text-2xl font-black text-ink">{n}</div>
            <div className="text-[11px] text-ink-faint mt-0.5 font-medium">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
