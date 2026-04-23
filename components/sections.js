"use client";
import { useState } from "react";

// ── Pricing ───────────────────────────────────────────────────────────────────
export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-36 px-6 md:px-10 bg-ink">
      <div className="max-w-7xl mx-auto">
        <p className="reveal text-xs font-medium text-white/40 tracking-widest uppercase mb-4">
          Pricing
        </p>
        <h2 className="reveal font-display text-4xl md:text-6xl font-black text-white leading-tight mb-6">
          Simple pricing.
          <br />
          <em className="italic text-white/50">No hidden costs.</em>
        </h2>
        <p className="reveal text-base text-white/50 font-light leading-relaxed mb-16 max-w-xl">
          Start with a website — your first month is on me. Upgrade to Pro for logo, socials, and monthly ad design.
        </p>

        {/* Three-column pricing — fills the empty space */}
        <div className="reveal grid md:grid-cols-3 gap-5 md:gap-6">

          {/* Monthly — first month free */}
          <div className="border border-white/10 rounded-2xl p-7 md:p-8 bg-white/5 flex flex-col relative">
            <span className="absolute -top-3 left-6 bg-white text-ink text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              First Month Free
            </span>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Monthly</p>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-display text-5xl font-black text-white leading-none">£0</span>
              <span className="text-white/40 text-sm">first month</span>
            </div>
            <p className="text-sm text-white/50 mb-6 font-light">
              Then <span className="font-semibold text-white">£55/mo</span>. Cancel any time.
            </p>
            <ul className="space-y-2 flex-1 mb-7">
              {[
                "Full site built before you pay",
                "Hosted, managed, updated",
                "Unlimited content changes",
                "Google Business Profile setup",
                "Priority support",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                  <span className="text-white/40 flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="block w-full border border-white/20 text-white text-center font-semibold py-3 rounded-full text-sm hover:border-white/40 transition-colors duration-200"
            >
              Claim free month
            </a>
          </div>

          {/* Pro Bundle — middle, featured */}
          <div className="border-2 border-highlight rounded-2xl p-7 md:p-8 bg-gradient-to-br from-highlight/15 to-highlight/5 flex flex-col relative md:-mt-4 md:mb-0">
            <span className="absolute -top-3 left-6 bg-highlight text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              ★ Most Popular
            </span>
            <p className="text-xs font-semibold uppercase tracking-widest text-highlight mb-5">Pro Bundle</p>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-display text-5xl font-black text-white leading-none">£99</span>
              <span className="text-white/50 text-sm">/month</span>
            </div>
            <p className="text-sm text-white/60 mb-6 font-light">
              Everything in one. <span className="font-semibold text-white">Save £80+/mo</span>.
            </p>
            <ul className="space-y-2 flex-1 mb-7">
              {[
                "Custom website",
                "Custom logo design",
                "Facebook + Instagram setup",
                "2 ad designs every month",
                "Everything managed for you",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-white">
                  <span className="text-highlight flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="block w-full bg-highlight text-white text-center font-semibold py-3 rounded-full text-sm hover:opacity-90 transition-opacity duration-200"
            >
              Go Pro
            </a>
          </div>

          {/* One-off */}
          <div className="border border-white/10 rounded-2xl p-7 md:p-8 bg-white/5 flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">One-Off</p>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-display text-5xl font-black text-white leading-none">£499</span>
            </div>
            <p className="text-sm text-white/50 mb-6 font-light">
              Yours forever. One payment.
            </p>
            <ul className="space-y-2 flex-1 mb-7">
              {[
                "Full custom design & build",
                "Handed over to you",
                "Host wherever you like",
                "Local SEO optimised",
                "3 months free support",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                  <span className="text-white/40 flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="block w-full border border-white/20 text-white text-center font-semibold py-3 rounded-full text-sm hover:border-white/40 transition-colors duration-200"
            >
              Get started
            </a>
          </div>
        </div>

        {/* Compact Checkatrade comparison */}
        <div className="reveal mt-14 grid md:grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden max-w-3xl">
          <div className="p-6 bg-ink">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">Checkatrade</p>
            <p className="font-display text-2xl font-black text-white/60 line-through decoration-white/30 mb-1">£1,200+/yr</p>
            <p className="text-xs text-white/50 font-light">Shared leads. Disappears when you stop paying.</p>
          </div>
          <div className="p-6 bg-highlight/5">
            <p className="text-xs font-semibold uppercase tracking-widest text-highlight mb-2">MunroStudio</p>
            <p className="font-display text-2xl font-black text-white mb-1">£499 once</p>
            <p className="text-xs text-white/60 font-light">Yours forever. Exclusive leads.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────
export function HowItWorks() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-4">
          The process
        </p>
        <h2 className="reveal font-display text-4xl md:text-6xl font-black text-ink leading-tight mb-16">
          Live in weeks,
          <br />
          <em className="italic">not months.</em>
        </h2>

        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
          {[
            { n: "01", title: "Free Chat", desc: "Quick call to understand your business and what you want from the site." },
            { n: "02", title: "Design & Build", desc: "I design and build the full site — you review, nothing is charged yet." },
            { n: "03", title: "Launch Free", desc: "Site goes live. Your first month is on me — use it risk-free." },
            { n: "04", title: "Keep or Cancel", desc: "If it's working, stay on £55/mo. If not, cancel — no fee." },
          ].map(({ n, title, desc }) => (
            <div key={n} className="bg-white p-8 md:p-10">
              <span className="font-display text-4xl font-black text-ink/10 block mb-6">{n}</span>
              <h3 className="font-display text-lg font-black text-ink mb-2">{title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed font-light">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Referral ──────────────────────────────────────────────────────────────────
export function Referral() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-4">
          Refer a friend
        </p>
        <div className="reveal grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-6xl font-black text-ink leading-tight mb-6">
              Know another Glasgow
              <br />
              <em className="italic text-highlight">business owner?</em>
            </h2>
            <p className="text-base text-ink-soft leading-relaxed font-light mb-8 max-w-md">
              Recommend MunroStudio and earn{" "}
              <span className="text-ink font-semibold">£100 cash</span> for every completed sale. No limit.
            </p>
            <a
              href="https://wa.me/447485218091?text=Hi%20Euan%2C%20I%27d%20like%20to%20refer%20someone%20for%20a%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-ink text-white font-medium px-7 py-3.5 rounded-full text-sm hover:bg-highlight transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Refer on WhatsApp
            </a>
          </div>

          <div className="space-y-px bg-border rounded-xl overflow-hidden">
            {[
              { n: "01", title: "Refer someone", desc: "Send me their name and contact details." },
              { n: "02", title: "They get a website", desc: "I'll reach out and handle everything end to end." },
              { n: "03", title: "You get £100", desc: "Once the sale completes, I send you £100." },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white p-7 flex gap-6 items-start">
                <span className="font-display text-3xl font-black text-ink/10 flex-shrink-0 leading-none mt-1">{n}</span>
                <div>
                  <h3 className="font-display text-base font-black text-ink mb-1">{title}</h3>
                  <p className="text-sm text-ink-soft font-light leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
// Cut from 12 to 6 — keeping only the ones that aren't already answered elsewhere on the page.
const faqs = [
  {
    q: "How does the 'first month free' work?",
    a: "I build your full site for free, launch it, and you use it for a full month at no cost. No card details needed to start. If you love it, you carry on at £55/month. If it's not working for you, just let me know and we part ways — no fee, no fuss.",
  },
  {
    q: "How long does it take to build my website?",
    a: "Most sites are live within 2–3 weeks from kickoff. I'll keep you updated throughout, and you'll get a chance to review before launch.",
  },
  {
    q: "What do I need to provide?",
    a: "Just your logo (if you have one — if not, I can design one), a few photos of your work, and your contact details. I handle design, copy, hosting, and everything technical.",
  },
  {
    q: "Why go with you over cheaper Glasgow options?",
    a: "Most cheaper options are templates or drag-and-drop builders, which look generic and rank poorly on Google. I build fully custom Next.js sites with real local SEO, branded design, and the same tech big agencies use — just without the big agency price tag.",
  },
  {
    q: "Is there a contract or minimum term?",
    a: "No tie-ins, no minimum term on the monthly plan. Cancel any time. Most clients stay because the leads keep coming in — but you're never locked in.",
  },
  {
    q: "Will my site show up on Google?",
    a: "Yes. Every site I build is optimised for local SEO from day one, and I set up your Google Business Profile so you show up on Maps too. Ranking takes time (usually 2–6 months for competitive local terms) but you're set up correctly from launch.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span className="text-sm font-medium text-ink group-hover:text-highlight transition-colors duration-200">{q}</span>
        <span className="text-ink-faint flex-shrink-0 text-lg transition-transform duration-300" style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }}>+</span>
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? "320px" : "0" }}>
        <p className="text-sm text-ink-soft leading-relaxed pb-6 font-light">{a}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-4">FAQs</p>
        <div className="reveal grid md:grid-cols-2 gap-16 items-start">
          <h2 className="font-display text-4xl md:text-5xl font-black text-ink leading-tight sticky top-24">
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