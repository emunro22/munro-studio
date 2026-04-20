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
          Start with a website. Add logo, socials, and review automation whenever you're ready. Cheaper than Checkatrade — and you own the result.
        </p>

        <div className="reveal grid md:grid-cols-2 gap-6 max-w-3xl">
          {/* Monthly */}
          <div className="border border-highlight/30 rounded-2xl p-8 md:p-10 bg-highlight/5 flex flex-col relative">
            <span className="absolute -top-3 left-8 bg-highlight text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Most Popular
            </span>
            <p className="text-xs font-semibold uppercase tracking-widest text-highlight/60 mb-6">Monthly Subscription</p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-display text-6xl font-black text-white leading-none">£55</span>
              <span className="text-white/40 text-lg">/month</span>
            </div>
            <p className="text-sm text-white/40 mb-8 font-light">Cancel any time. No tie-ins.</p>
            <ul className="space-y-2.5 flex-1">
              {[
                "Everything hosted & managed",
                "Unlimited content updates",
                "Priority support included",
                "Performance monitoring",
                "Security & software updates",
                "Google Business Profile setup",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                  <span className="text-highlight flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-8 block w-full bg-highlight text-white text-center font-semibold py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity duration-200"
            >
              Get started
            </a>
          </div>

          {/* One-off */}
          <div className="border border-white/10 rounded-2xl p-8 md:p-10 bg-white/5 flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-6">One-Off Payment</p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-display text-6xl font-black text-white leading-none">£499</span>
            </div>
            <p className="text-sm text-white/40 mb-8 font-light">Yours to keep. One payment, forever.</p>
            <ul className="space-y-2.5 flex-1">
              {[
                "Full custom design & build",
                "Handed over to you",
                "Host it wherever you like",
                "Local SEO optimised",
                "Google Business Profile setup",
                "3 months free support",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                  <span className="text-white/40 flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-8 block w-full border border-white/20 text-white text-center font-semibold py-3.5 rounded-full text-sm hover:border-white/40 transition-colors duration-200"
            >
              Get started
            </a>
          </div>
        </div>

        {/* Pro Bundle */}
        <div className="reveal mt-6 max-w-3xl">
          <div className="border border-white/20 rounded-2xl p-6 md:p-8 bg-gradient-to-br from-highlight/10 to-white/5 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-highlight mb-2">
                Pro Bundle · Everything in one
              </p>
              <p className="font-display text-2xl font-black text-white leading-tight mb-2">
                Website + Logo + Socials + Review Automation
              </p>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                The full setup for trades who want to go all-in. Replaces Checkatrade, sorts your brand, and keeps Google reviews flowing.
              </p>
            </div>
            <div className="flex-shrink-0 text-right sm:text-right">
              <div className="font-display text-4xl font-black text-white leading-none">£99</div>
              <div className="text-xs text-white/40 mt-1 mb-4">/month all-in</div>
              <a
                href="#contact"
                className="inline-block bg-highlight text-white font-semibold px-5 py-2.5 rounded-full text-xs hover:opacity-90 transition-opacity duration-200"
              >
                Go Pro
              </a>
            </div>
          </div>
        </div>

        {/* Checkatrade comparison */}
        <div className="reveal mt-12 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">
            Compared to Checkatrade
          </p>
          <div className="border border-white/10 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-white/10">
              <div className="p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Checkatrade</p>
                <p className="font-display text-3xl font-black text-white/60 leading-none mb-3 line-through decoration-white/30">£1,200+</p>
                <p className="text-xs text-white/50 font-light leading-relaxed">
                  Per year. Forever. Shared leads. Disappears when you stop paying.
                </p>
              </div>
              <div className="p-6 md:p-8 bg-highlight/5">
                <p className="text-xs font-semibold uppercase tracking-widest text-highlight mb-3">MunroStudio</p>
                <p className="font-display text-3xl font-black text-white leading-none mb-3">£499</p>
                <p className="text-xs text-white/60 font-light leading-relaxed">
                  Once. Yours forever. Exclusive leads. Pays for itself in under 5 months.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="reveal mt-6 text-xs text-white/30 font-light">
          Not sure which is right for you? Drop me a message and I'll help you decide.
        </p>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────
// bg-white instead of bg-surface so it doesn't visually merge with the
// bg-surface Testimonials section and create an invisible seam/gap.
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
            { n: "01", title: "Free Chat", desc: "We'll have a quick call to understand your trade, your area, and what you want from the site." },
            { n: "02", title: "Design", desc: "I'll design a custom website tailored to your trade and brand. You review and give feedback." },
            { n: "03", title: "Build & Review", desc: "I build the full site, set up SEO, and you get a final review before we go live." },
            { n: "04", title: "Go Live", desc: "Your site launches. You start appearing in Google. New enquiries start coming in." },
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
// bg-white keeps it visually separate from bg-surface Testimonials below it.
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
              Know another
              <br />
              <em className="italic text-highlight">tradesperson?</em>
            </h2>
            <p className="text-base text-ink-soft leading-relaxed font-light mb-8 max-w-md">
              Recommend MunroStudio to a fellow tradesperson and earn{" "}
              <span className="text-ink font-semibold">£100 cash</span> for every completed sale. No limit — refer as many as you like.
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
              Make a referral on WhatsApp
            </a>
          </div>

          <div className="space-y-px bg-border rounded-xl overflow-hidden">
            {[
              { n: "01", title: "Refer a tradesperson", desc: "Send me their name and contact details via WhatsApp or email." },
              { n: "02", title: "They get a website", desc: "I'll reach out, build their site, and handle everything end to end." },
              { n: "03", title: "You get £100", desc: "Once the sale completes, I'll send you £100. Simple as that." },
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
const faqs = [
  { q: "How long does it take to build my website?", a: "Most tradesman sites are live within 2–3 weeks from the day we kick off. I'll keep you updated throughout." },
  { q: "What do I need to provide?", a: "Just your logo (if you have one — if not, I can design one), a few photos of your work, and your contact details. I handle everything else." },
  { q: "What's the difference between monthly and one-off?", a: "The monthly plan (£55/month) covers everything — design, build, hosting, domain, updates, and support, with no upfront cost. The one-off (£499) gives you a fully built site handed over to you to host wherever you like, plus 3 months of free support." },
  { q: "Is this really cheaper than Checkatrade?", a: "Yes. Checkatrade membership typically runs £100+/month — that's £1,200+ a year, forever. My one-off £499 pays for itself in under 5 months, and on the monthly plan you're saving £45+/month. Plus the leads are exclusively yours — not shared with 3 other trades." },
  { q: "Will my site show up on Google?", a: "Yes. Every site I build is optimised for local SEO from day one — that means your business will appear in local searches relevant to your trade and location. I'll also set up your Google Business Profile so you show up on Maps." },
  { q: "Do I need any technical knowledge?", a: "None at all. I take care of everything from design to going live. You just review and approve." },
  { q: "Can I see examples of your work?", a: "Absolutely — scroll up to see recent client sites, or visit munrostudio.co.uk for the full portfolio." },
  { q: "Is there a contract or minimum term?", a: "No tie-ins, no minimum term on the monthly plan. You can cancel any time — though most clients stay because the leads keep coming in." },
  { q: "What's the Pro Bundle?", a: "£99/month gets you everything: your website, a custom logo, branded social media setup (Facebook + Instagram), and automated Google review requests sent to your customers after each job. It's the full package for trades who want to go all-in on their online presence." },
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
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? "240px" : "0" }}>
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