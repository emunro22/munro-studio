"use client";
import { useState } from "react";

// ── Pricing ───────────────────────────────────────────────────────────────────
export function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-28 px-5 md:px-10 bg-ink">
      <div className="max-w-5xl mx-auto">
        <p className="reveal text-xs font-medium text-white/40 tracking-widest uppercase mb-4">
          Pricing
        </p>
        <h2 className="reveal font-display text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4">
          One price.
          <br />
          <em className="italic text-white/50">Everything included.</em>
        </h2>
        <p className="reveal text-sm md:text-base text-white/50 font-light leading-relaxed mb-10 md:mb-14 max-w-lg">
          £55/month covers the whole lot — website, hosting, weekly updates on how your site's doing, and ongoing SEO/GEO/AEO upgrades to keep it climbing. First month completely free.
        </p>

        <div className="reveal grid md:grid-cols-2 gap-5">

          {/* Monthly — featured */}
          <div className="border-2 border-highlight rounded-2xl p-6 md:p-8 bg-gradient-to-br from-highlight/15 to-highlight/5 flex flex-col relative">
            <span className="absolute -top-3 left-5 bg-highlight text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              ★ Most Popular
            </span>
            <p className="text-xs font-semibold uppercase tracking-widest text-highlight mb-4">Monthly Plan</p>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-display text-5xl sm:text-6xl font-black text-white leading-none">£0</span>
              <span className="text-white/50 text-sm">first month</span>
            </div>
            <p className="text-sm text-white/60 mb-1 font-light">
              Then <span className="font-semibold text-white">£55/mo</span>. Cancel any time.
            </p>
            <p className="text-xs text-highlight mb-6 font-medium">No card needed to get started.</p>

            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Everything included:</p>
            <ul className="space-y-2 flex-1 mb-7">
              {[
                "Fully custom website design & build",
                "Hosting, managed & always updated",
                "Local SEO, GEO & AEO — weekly updates on how your site's doing, plus ongoing upgrades",
                "Google Business Profile setup + real reviews on your site",
                "Booking system integration & an admin portal to update it yourself",
                "Contact, quote & order forms",
                "Unlimited changes & priority support",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white">
                  <span className="text-highlight flex-shrink-0 mt-0.5">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="block w-full bg-highlight text-white text-center font-semibold py-3.5 rounded-full text-sm hover:opacity-90 active:scale-95 transition-all duration-200"
            >
              Start free — no card needed
            </a>
          </div>

          {/* One-Off */}
          <div className="border border-white/10 rounded-2xl p-6 md:p-8 bg-white/5 flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">One-Off Payment</p>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-display text-5xl sm:text-6xl font-black text-white leading-none">£499</span>
            </div>
            <p className="text-sm text-white/50 mb-1 font-light">Pay once, hosted by us.</p>
            <p className="text-xs text-white/30 mb-6 font-light">No SEO or sitemap submission included.</p>

            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">What's included:</p>
            <ul className="space-y-2 flex-1 mb-7">
              {[
                "Full custom design & build",
                "Hosted by us",
                "No SEO optimisation",
                "No sitemap submitted",
                "Up to 25 area pages on your site",
                "Google reviews integrated",
                "3 months support included",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                  <span className="text-white/40 flex-shrink-0 mt-0.5">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="block w-full border border-white/20 text-white text-center font-semibold py-3.5 rounded-full text-sm hover:border-white/40 active:scale-95 transition-all duration-200"
            >
              Get a quote
            </a>
          </div>
        </div>

        {/* Value note */}
        <p className="reveal mt-8 text-center text-xs text-white/30 font-light">
          Not sure which is right for you?{" "}
          <a href="https://wa.me/447485218091?text=Hi%20Euan%2C%20I%27m%20not%20sure%20which%20option%20suits%20me" target="_blank" rel="noopener noreferrer" className="text-white/50 underline hover:text-white transition-colors duration-200">
            Message me on WhatsApp
          </a>{" "}
          and I&apos;ll point you in the right direction.
        </p>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────
export function HowItWorks() {
  return (
    <section className="py-16 md:py-28 px-5 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-4">
          The process
        </p>
        <h2 className="reveal font-display text-3xl sm:text-5xl md:text-6xl font-black text-ink leading-tight mb-12 md:mb-16">
          Live in weeks,
          <br />
          <em className="italic">not months.</em>
        </h2>

        <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
          {[
            { n: "01", title: "Free Chat", desc: "Quick call or message to understand your business and what you need." },
            { n: "02", title: "Design & Build", desc: "I design and build the full site — you review everything before launch." },
            { n: "03", title: "Launch Free", desc: "Site goes live. Your first month is on me — completely risk-free." },
            { n: "04", title: "Keep or Cancel", desc: "Stay on £55/mo if it's working. Cancel any time — no fee, no fuss." },
          ].map(({ n, title, desc }) => (
            <div key={n} className="bg-white p-6 md:p-10">
              <span className="font-display text-3xl md:text-4xl font-black text-ink/10 block mb-4 md:mb-6">{n}</span>
              <h3 className="font-display text-sm md:text-lg font-black text-ink mb-1.5 md:mb-2">{title}</h3>
              <p className="text-xs md:text-sm text-ink-soft leading-relaxed font-light">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "What's included in the £55/month?",
    a: "Everything. Custom website design and build, hosting, unlimited content changes, local SEO, sitemap XML submitted to Google, Google Business Profile setup, Google reviews on your site, booking system integration (Google Calendar etc.), an admin portal so you can update content yourself, and priority support. No upsells, no hidden extras.",
  },
  {
    q: "Do you integrate booking systems?",
    a: "Yes — I integrate Google Calendar, Calendly, and other booking tools directly into your site so customers can book appointments or slots without calling. Great for trades, salons, personal trainers, and any appointment-based business.",
  },
  {
    q: "How does the first month free work?",
    a: "I build your full site, launch it, and you use it for a month at no cost. No card details needed upfront. If you love it, continue at £55/month. If not, just say so — no fee, no fuss.",
  },
  {
    q: "What is an admin portal?",
    a: "A private dashboard so you can update photos, services, prices, and content without touching any code or calling me. You're in full control of your own site day-to-day.",
  },
  {
    q: "How long does it take?",
    a: "Most sites are live within 2–3 weeks from kickoff. I'll keep you updated throughout and you review everything before launch.",
  },
  {
    q: "Will my site show up on Google?",
    a: "Yes. Every site is optimised for local SEO from day one. I submit your sitemap.xml to Google Search Console and set up your Google Business Profile so you appear on Maps. Ranking takes a few months for competitive terms but you're set up correctly from day one.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="text-sm font-medium text-ink group-hover:text-highlight transition-colors duration-200 leading-snug">{q}</span>
        <span className="text-ink-faint flex-shrink-0 text-xl transition-transform duration-300" style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }}>+</span>
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? "400px" : "0" }}>
        <p className="text-sm text-ink-soft leading-relaxed pb-5 font-light">{a}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-28 px-5 md:px-10">
      <div className="max-w-7xl mx-auto">
        <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-4">FAQs</p>
        <div className="reveal grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-ink leading-tight md:sticky md:top-24">
            Questions?
            <br />
            <em className="italic">Answered.</em>
          </h2>
          <div>
            {faqs.map((faq) => <FAQItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
