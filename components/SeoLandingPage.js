"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// Reusable FAQ item component
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span className="text-sm font-medium text-ink group-hover:text-highlight transition-colors duration-200">
          {q}
        </span>
        <span
          className="text-ink-faint flex-shrink-0 text-lg transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "400px" : "0" }}
      >
        <p className="text-sm text-ink-soft leading-relaxed pb-6 font-light">{a}</p>
      </div>
    </div>
  );
}

export default function SeoLandingPage({ page }) {
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
      }, 80 + i * 90);
    });
  }, []);

  const [formState, setFormState] = useState("idle");

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
      source: page.slug, // track which SEO page the lead came from
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
    <div ref={ref} className="bg-white">
      {/* Slim nav bar — just logo + phone + CTA */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-lg font-black text-ink tracking-tight">
            Munro<em className="italic text-highlight">Studio</em>
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="tel:07485218091"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-ink hover:text-highlight transition-colors duration-200 font-medium"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
              </svg>
              07485 218 091
            </a>
            <a
              href="#contact"
              className="bg-ink text-white text-xs font-semibold uppercase tracking-widest px-4 py-2.5 rounded-full hover:bg-highlight transition-colors duration-200"
            >
              Free Month
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-[85vh] flex flex-col justify-center px-6 md:px-10 pt-28 pb-16 max-w-7xl mx-auto">
        <div data-reveal className="mb-8 flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-ink-soft border border-border rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            First month <span className="font-bold text-ink">FREE</span> · then £55/mo or £499 one-off
          </span>
        </div>

        <h1
          data-reveal
          className="font-display font-black text-5xl sm:text-7xl md:text-8xl leading-[0.93] tracking-tight text-ink max-w-5xl"
        >
          {page.h1}
          <br />
          <em className="italic text-highlight">{page.h1Accent}</em>
        </h1>

        <p data-reveal className="mt-6 md:mt-8 text-lg md:text-xl text-ink-soft max-w-2xl leading-snug font-light">
          {page.intro}
        </p>

        <div data-reveal className="mt-10 flex flex-col sm:flex-row gap-3">
          <a
            href="#contact"
            className="bg-ink text-white font-medium px-7 py-3.5 rounded-full text-sm hover:bg-highlight transition-colors duration-250 text-center"
          >
            Claim your free month
          </a>
          <a
            href="tel:07485218091"
            className="border border-border text-ink font-medium px-7 py-3.5 rounded-full text-sm hover:border-ink transition-colors duration-250 text-center inline-flex items-center justify-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
            </svg>
            Call 07485 218 091
          </a>
        </div>

        <div data-reveal className="mt-20 md:mt-24 grid grid-cols-3 gap-4 sm:gap-8 border-t border-border pt-10 max-w-xl">
          {page.heroStats.map(({ n, l }) => (
            <div key={l}>
              <div className="font-display text-3xl sm:text-4xl font-black text-ink">{n}</div>
              <div className="text-xs text-ink-faint mt-1 font-medium">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 md:py-36 px-6 md:px-10 bg-surface">
        <div className="max-w-7xl mx-auto">
          <p data-reveal className="text-xs font-medium text-ink-faint tracking-widest uppercase mb-4">
            Why MunroStudio
          </p>
          <h2 data-reveal className="font-display text-4xl md:text-6xl font-black text-ink leading-tight mb-16 max-w-3xl">
            Made for {page.audienceLabel}.
            <br />
            <em className="italic text-highlight">Built to convert.</em>
          </h2>

          <div data-reveal className="grid sm:grid-cols-2 gap-px bg-border rounded-xl overflow-hidden">
            {page.benefits.map(({ title, desc }, i) => (
              <div key={i} className="bg-white p-8 md:p-10 hover:bg-surface transition-colors duration-200">
                <span className="font-display text-3xl font-black text-ink/10 block mb-5">
                  0{i + 1}
                </span>
                <h3 className="font-display text-lg font-black text-ink mb-3">{title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed font-light">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 md:py-36 px-6 md:px-10 bg-ink">
        <div className="max-w-7xl mx-auto">
          <p data-reveal className="text-xs font-medium text-white/40 tracking-widest uppercase mb-4">
            Compared
          </p>
          <h2 data-reveal className="font-display text-3xl md:text-5xl font-black text-white leading-tight mb-16 max-w-3xl">
            {page.comparisonTitle}
          </h2>

          <div data-reveal className="border border-white/10 rounded-2xl overflow-hidden max-w-4xl">
            {page.comparisonRows.map(({ them, us }, i) => (
              <div
                key={i}
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  i < page.comparisonRows.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <div className="p-5 md:p-7 sm:border-r border-white/10">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">Them</p>
                  <p className="text-sm text-white/60 font-light leading-relaxed line-through decoration-white/20">
                    {them}
                  </p>
                </div>
                <div className="p-5 md:p-7 bg-highlight/5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-highlight mb-2">MunroStudio</p>
                  <p className="text-sm text-white font-light leading-relaxed">{us}</p>
                </div>
              </div>
            ))}
          </div>

          <div data-reveal className="mt-12 flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              className="bg-highlight text-white font-medium px-7 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity duration-200 text-center"
            >
              Claim your free month
            </a>
            <a
              href="tel:07485218091"
              className="border border-white/20 text-white font-medium px-7 py-3.5 rounded-full text-sm hover:border-white/40 transition-colors duration-200 text-center"
            >
              Call 07485 218 091
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-36 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p data-reveal className="text-xs font-medium text-ink-faint tracking-widest uppercase mb-4">
            FAQs
          </p>
          <div data-reveal className="grid md:grid-cols-2 gap-16 items-start">
            <h2 className="font-display text-4xl md:text-5xl font-black text-ink leading-tight sticky top-24">
              Common
              <br />
              <em className="italic">questions.</em>
            </h2>
            <div>
              {page.faqs.map((faq) => (
                <FAQItem key={faq.q} {...faq} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 md:py-36 px-6 md:px-10 bg-ink">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            <div>
              <p className="text-xs font-medium text-white/40 tracking-widest uppercase mb-6">
                Get in touch
              </p>
              <h2 className="font-display text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                Claim your
                <br />
                <em className="italic text-white/50">free first month.</em>
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-10 font-light max-w-sm">
                Fill in the form and I'll get back to you within 24 hours. Or call/WhatsApp for a quick chat.
              </p>

              <div className="space-y-5">
                <a href="tel:07485218091" className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-white/30 group-hover:text-white/60 transition-all duration-200 flex-shrink-0">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/30 mb-0.5">Call us</p>
                    <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-200">07485 218 091</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/447485218091?text=Hi%20Euan%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20business"
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
                    <p className="text-xs text-white/30 mb-0.5">WhatsApp</p>
                    <p className="text-sm font-medium text-white/70 group-hover:text-green-400 transition-colors duration-200">Message me on WhatsApp</p>
                  </div>
                </a>

                <a href="mailto:euanmunroo@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-white/30 group-hover:text-white/60 transition-all duration-200 flex-shrink-0">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/30 mb-0.5">Email</p>
                    <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-200">euanmunroo@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>

            <div>
              {formState === "success" ? (
                <div className="border border-white/10 rounded-2xl p-10 text-center">
                  <div className="text-5xl mb-5">✅</div>
                  <h3 className="font-display text-2xl font-black text-white mb-3">Message sent!</h3>
                  <p className="text-sm text-white/50 font-light leading-relaxed">
                    Thanks — I'll be in touch within 24 hours.
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
                    placeholder="Your business or trade"
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
                      How serious are you about getting a website?
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
                      <option value="exploring" className="bg-ink text-white">Just exploring options for now</option>
                    </select>
                  </div>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell me a bit about your business..."
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors duration-200 w-full font-light resize-none"
                  />
                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="w-full bg-white text-ink font-semibold py-4 rounded-full text-sm hover:bg-surface transition-colors duration-200 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState === "loading" ? "Sending..." : "Claim My Free Month"}
                  </button>
                  <p className="text-[11px] text-white/30 text-center font-light pt-1">
                    Or call me direct on{" "}
                    <a href="tel:07485218091" className="underline decoration-white/20 hover:text-white/50">
                      07485 218 091
                    </a>
                  </p>
                  {formState === "error" && (
                    <p className="text-xs text-red-400 text-center pt-1">
                      Something went wrong. Please WhatsApp or email me directly.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>

          <div className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-white/30">
            <span>© {new Date().getFullYear()} MunroStudio · Glasgow, Scotland · 07485 218 091</span>
            <Link href="/" className="hover:text-white/50 transition-colors duration-200">
              ← Back to main site
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}