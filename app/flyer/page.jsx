"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function FlyerLandingPage() {
  const [formState, setFormState] = useState("idle");
  const ref = useRef(null);

  // Scroll reveal for all .reveal elements
  useEffect(() => {
    const els = ref.current?.querySelectorAll("[data-reveal]");
    els?.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      setTimeout(() => {
        el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 80 + i * 90);
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormState("loading");
    const data = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      trade: e.target.trade.value,
      email: e.target.email.value,
      timeline: e.target.timeline.value,
      message: e.target.message.value,
      source: "flyer", // attribution tag — see flyer leads in your email
    };
    try {
      const res = await fetch("/api/tradesmen-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        window.location.href = "/thank-you";
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  return (
    <div ref={ref} className="bg-white min-h-screen">

      {/* Minimal header — just brand, no nav */}
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
          <Link href="/" className="font-display text-lg font-black text-ink tracking-tight">
            Munro<em className="italic text-highlight">Studio</em>
          </Link>
          <a
            href="tel:07485218091"
            className="inline-flex items-center gap-2 text-sm text-ink hover:text-highlight transition-colors duration-200 font-medium"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
            </svg>
            <span className="hidden sm:inline">07485 218 091</span>
            <span className="inline sm:hidden">Call</span>
          </a>
        </div>
      </header>

      {/* Hero — confirmation of the flyer offer */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-12 md:pb-20">
        <div data-reveal className="mb-6 flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-ink-soft border border-border rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Scanned from a flyer? You're in the right place.
          </span>
        </div>

        <h1
          data-reveal
          className="font-display font-black text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight text-ink max-w-4xl mb-8"
        >
          Right then —
          <br />
          let's get you
          <br />
          <em className="italic text-highlight">on Google.</em>
        </h1>

        <p data-reveal className="text-lg md:text-xl text-ink-soft leading-relaxed font-light max-w-2xl mb-10">
          Scan verified. Your <span className="text-ink font-medium">first month is on me</span> — I'll design and build you a fully custom site for your trade, live in 2–3 weeks. No card up front, no contract, cancel any time.
        </p>

        <div data-reveal className="flex flex-col sm:flex-row gap-3 max-w-lg">
          <a
            href="tel:07485218091"
            className="bg-ink text-white font-medium px-7 py-3.5 rounded-full text-sm hover:bg-highlight transition-colors duration-250 text-center inline-flex items-center justify-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
            </svg>
            Call Euan — 07485 218 091
          </a>
          <a
            href="#form"
            className="border border-border text-ink font-medium px-7 py-3.5 rounded-full text-sm hover:border-ink transition-colors duration-250 text-center"
          >
            Or fill the form below
          </a>
        </div>
      </section>

      {/* Price reminder — dark band */}
      <section className="bg-ink text-white px-6 md:px-10 py-16 md:py-20">
        <div data-reveal className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 md:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-highlight mb-3">★ First month free</p>
            <p className="font-display text-5xl font-black leading-none mb-2">
              £0<span className="text-2xl text-white/50 ml-2">first month</span>
            </p>
            <p className="text-sm text-white/60 font-light">
              No card required. Cancel any time.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Monthly after</p>
            <p className="font-display text-5xl font-black leading-none mb-2">
              £55<span className="text-2xl text-white/50 ml-2">/mo</span>
            </p>
            <p className="text-sm text-white/60 font-light">
              Everything hosted, managed &amp; updated.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Or one-off</p>
            <p className="font-display text-5xl font-black leading-none mb-2">£499</p>
            <p className="text-sm text-white/60 font-light">
              Pay once, yours forever.
            </p>
          </div>
        </div>
      </section>

      {/* What you get — condensed */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <p data-reveal className="text-xs font-medium text-ink-faint tracking-widest uppercase mb-4">
          What's included
        </p>
        <h2 data-reveal className="font-display text-3xl md:text-5xl font-black text-ink leading-tight mb-12 max-w-3xl">
          Everything you need to
          <br />
          <em className="italic text-highlight">get found &amp; win jobs.</em>
        </h2>

        <div data-reveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
          {[
            { icon: "◈", title: "Custom Design", desc: "Mobile-first, built around your trade — no templates." },
            { icon: "◎", title: "Local SEO", desc: "Ranks for 'plumber Glasgow' and other local terms." },
            { icon: "◫", title: "Google Business", desc: "Full profile setup so you show up on Google Maps." },
            { icon: "⬢", title: "Review Capture", desc: "Simple system to collect Google reviews after jobs." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white p-7">
              <span className="text-2xl text-highlight mb-4 block">{icon}</span>
              <h3 className="font-display text-base font-black text-ink mb-2">{title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed font-light">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The form — dark band, matches contact section on main site */}
      <section id="form" className="bg-ink text-white px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-24 items-start">

          <div data-reveal>
            <p className="text-xs font-medium text-white/40 tracking-widest uppercase mb-6">
              Claim your free month
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              Fill this in —
              <br />
              <em className="italic text-white/50">I'll do the rest.</em>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-10 font-light max-w-sm">
              I'll reply within 24 hours, usually much faster. No obligation, no pushy sales — just a quick chat about your trade and what you need.
            </p>

            <div className="space-y-5">
              <a href="tel:07485218091" className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-white/30 group-hover:text-white/60 transition-all duration-200 flex-shrink-0">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/30 mb-0.5">Prefer to call?</p>
                  <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-200">07485 218 091</p>
                </div>
              </a>

              <a
                href="https://wa.me/447485218091?text=Hi%20Euan%2C%20I%20scanned%20the%20flyer%20%E2%80%94%20interested%20in%20a%20website"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-green-500/50 group-hover:text-green-400 transition-all duration-200 flex-shrink-0">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/30 mb-0.5">Or WhatsApp</p>
                  <p className="text-sm font-medium text-white/70 group-hover:text-green-400 transition-colors duration-200">Message me on WhatsApp</p>
                </div>
              </a>
            </div>
          </div>

          <div data-reveal>
            {formState === "success" ? (
              <div className="border border-white/10 rounded-2xl p-10 text-center">
                <div className="text-5xl mb-5">✅</div>
                <h3 className="font-display text-2xl font-black text-white mb-3">Got it — I'll be in touch.</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed">
                  Thanks for scanning. I'll reply within 24 hours, usually faster.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors duration-200 w-full font-light"
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone number"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors duration-200 w-full font-light"
                  />
                </div>
                <input
                  name="trade"
                  type="text"
                  placeholder="Your trade (Plumber, Sparky, Builder…)"
                  required
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors duration-200 w-full font-light"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors duration-200 w-full font-light"
                />
                <div>
                  <label className="block text-xs text-white/40 font-medium tracking-wide mb-2 ml-1">
                    When are you looking to start?
                  </label>
                  <select
                    name="timeline"
                    required
                    defaultValue=""
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors duration-200 w-full font-light appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ffffff40' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      paddingRight: "2.5rem",
                    }}
                  >
                    <option value="" disabled className="bg-ink text-white/40">Choose a timeline…</option>
                    <option value="asap" className="bg-ink text-white">Ready to start in the next 2 weeks</option>
                    <option value="1-3-months" className="bg-ink text-white">Looking to launch in 1–3 months</option>
                    <option value="exploring" className="bg-ink text-white">Just exploring for now</option>
                  </select>
                </div>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Quick note about your business (optional)…"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors duration-200 w-full font-light resize-none"
                />
                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="w-full bg-white text-ink font-semibold py-4 rounded-full text-sm hover:bg-surface transition-colors duration-200 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formState === "loading" ? "Sending…" : "Claim My Free Month"}
                </button>
                <p className="text-[11px] text-white/30 text-center font-light pt-1">
                  Or call direct —{" "}
                  <a href="tel:07485218091" className="underline decoration-white/20 hover:text-white/50">
                    07485 218 091
                  </a>
                </p>
                {formState === "error" && (
                  <p className="text-xs text-red-400 text-center pt-1">
                    Something went wrong. Please call or WhatsApp me directly.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-5xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-white/30">
          <span>© {new Date().getFullYear()} MunroStudio · Glasgow, Scotland · 07485 218 091</span>
          <Link href="/" className="hover:text-white/50 transition-colors duration-200">
            ← Back to main site
          </Link>
        </div>
      </section>
    </div>
  );
}