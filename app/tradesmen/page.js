"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ─── DATA ────────────────────────────────────────────────────────────────────

const trades = [
  "Plumbers", "Electricians", "Builders", "Decorators",
  "Roofers", "Landscapers", "Plasterers", "Carpenters",
  "Gas Engineers", "HVAC Engineers", "Tilers", "Joiners",
];

const includes = [
  {
    icon: "◈",
    title: "Custom Design",
    desc: "A professional, mobile-first website built around your trade — not a template.",
  },
  {
    icon: "◎",
    title: "SEO-Ready Build",
    desc: "Built to rank in Google searches like plumber near me so customers find you first.",
  },
  {
    icon: "◇",
    title: "Fast & Secure Hosting",
    desc: "Your site goes live on fast, reliable hosting. No tech headaches.",
  },
  {
    icon: "◉",
    title: "Contact & Quote Form",
    desc: "A simple form so customers can request quotes directly from your site.",
  },
  {
    icon: "▣",
    title: "Google Maps Integration",
    desc: "Your location pinned and visible so local customers know exactly where you operate.",
  },
  {
    icon: "◫",
    title: "Ongoing Support",
    desc: "£150/year retainer covers updates, changes, and any issues — we handle it all.",
  },
];

const faqs = [
  {
    q: "How long does it take to build my website?",
    a: "Most tradesman sites are live within 2–3 weeks from the day we kick off. I'll keep you updated throughout.",
  },
  {
    q: "What do I need to provide?",
    a: "Just your logo (if you have one), a few photos of your work, and your contact details. I handle everything else.",
  },
  {
    q: "What does the £150/year retainer cover?",
    a: "Hosting, domain renewal, security updates, and up to 2 hours of content changes per year — like updating prices, adding new photos, or changing contact info.",
  },
  {
    q: "Will my site show up on Google?",
    a: "Yes. Every site I build is optimised for local SEO from day one — that means your business will appear in local searches relevant to your trade and location.",
  },
  {
    q: "Do I need any technical knowledge?",
    a: "None at all. I take care of everything from design to going live. You just review and approve.",
  },
  {
    q: "Can I see examples of your work?",
    a: "Absolutely. You can view the full portfolio at munro-studio.vercel.app — 20+ real client sites across the UK.",
  },
];

const testimonials = [
  {
    name: "David Munro",
    role: "Founder, SRL Recovery",
    quote: "Working with Euan was effortless from start to finish. He quickly understood our goals and delivered a fast, scalable solution that exceeded our expectations.",
    initials: "DM",
    color: "#111111",
  },
  {
    name: "Colin Neil",
    role: "Founder, Clyde Valley Group",
    quote: "Euan transformed our outdated site into a modern, accessible platform. Our team and customers love it.",
    initials: "CN",
    color: "#F59E0B",
  },
  {
    name: "Shawaiz Khan",
    role: "CEO, GTown Kettles",
    quote: "We saw a noticeable increase in customer engagement after launching the new site. Euan's attention to detail really set him apart.",
    initials: "SK",
    color: "#0057FF",
  },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#111111">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

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
        style={{ maxHeight: open ? "200px" : "0" }}
      >
        <p className="text-sm text-ink-soft leading-relaxed pb-6 font-light">{a}</p>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function TradesmenPage() {
  const ref = useRef(null);
  const [formState, setFormState] = useState("idle"); // "idle" | "loading" | "success" | "error"

  // Scroll reveal
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.06 }
    );
    els?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Hero entrance
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

  async function handleSubmit(e) {
    e.preventDefault();
    setFormState("loading");
    const data = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      trade: e.target.trade.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };
    try {
      const res = await fetch("/api/tradesmen-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setFormState(json.success ? "success" : "error");
    } catch {
      setFormState("error");
    }
  }

  return (
    <div ref={ref}>

      {/* ── MINIMAL NAV ────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-lg font-black text-ink tracking-tight">
            Munro<em className="italic text-highlight">Studio</em>
          </Link>
          <a
            href="#contact"
            className="bg-ink text-white text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-highlight transition-colors duration-200"
          >
            Get a Free Quote
          </a>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-28 pb-16 max-w-7xl mx-auto">

        <div data-reveal className="mb-10 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-ink-soft border border-border rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Fixed Price · No Hidden Fees
          </span>
          <span className="hidden sm:block text-xs text-ink-faint">— Trusted by 20+ UK businesses</span>
        </div>

        <h1
          data-reveal
          className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] leading-[0.93] tracking-tight text-ink max-w-5xl"
        >
          Win more jobs
          <br />
          <em className="italic text-highlight">with a website.</em>
        </h1>

        <div data-reveal className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
          <p className="text-base md:text-lg text-ink-soft leading-relaxed max-w-md font-light">
            Professional websites for plumbers, electricians, builders and local
            tradespeople. Fixed price.{" "}
            <span className="text-ink font-medium">No surprises.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:ml-auto">
            <a
              href="#contact"
              className="bg-ink text-white font-medium px-7 py-3.5 rounded-full text-sm hover:bg-highlight transition-colors duration-250 text-center"
            >
              Get a Free Quote
            </a>
            <a
              href="#includes"
              className="border border-border text-ink font-medium px-7 py-3.5 rounded-full text-sm hover:border-ink transition-colors duration-250 text-center"
            >
              See what's included
            </a>
          </div>
        </div>

        <div data-reveal className="mt-20 md:mt-28 grid grid-cols-3 gap-4 sm:gap-8 border-t border-border pt-10 max-w-xl">
          {[
            { n: "£500", l: "One-off setup" },
            { n: "£150", l: "Per year after" },
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

      {/* ── TRADES MARQUEE ─────────────────────────────────────────────────── */}
      <div className="bg-ink py-4 overflow-hidden">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{
            animation: "marquee 18s linear infinite",
            width: "max-content",
          }}
        >
          {[...trades, ...trades].map((t, i) => (
            <span
              key={i}
              className="text-xs font-semibold uppercase tracking-widest text-white/50 flex items-center gap-3"
            >
              <span className="text-highlight text-[8px]">◆</span>
              {t}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ── WHY YOU NEED A WEBSITE ─────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-6 md:px-10 bg-surface">
        <div className="max-w-7xl mx-auto">
          <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-12">
            The problem
          </p>
          <div className="reveal grid md:grid-cols-2 gap-12 md:gap-24 mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-black text-ink leading-tight">
              Your competitors
              <br />
              <em className="italic">are already online.</em>
            </h2>
            <div className="flex flex-col justify-center gap-4 text-ink-soft text-base leading-relaxed font-light">
              <p>
                When a homeowner needs a plumber or electrician, their first move is
                Google. If you're not there,{" "}
                <span className="text-ink font-medium">you don't exist to them.</span>
              </p>
              <p>
                A professional website builds instant trust, shows off your work, and
                lets customers contact you directly — 24/7, even while you're on a job.
              </p>
              <p>
                Most tradespeople don't have a proper website. That's your advantage.
              </p>
            </div>
          </div>

          <div className="reveal grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden mt-10">
            {[
              { before: "Relying on word of mouth only", after: "Get found by new customers on Google" },
              { before: "Losing jobs to competitors with websites", after: "Stand out as the professional choice" },
              { before: "No way to show off your work", after: "Gallery of past jobs builds instant trust" },
              { before: "Customers can't reach you easily", after: "Quote requests in your inbox 24/7" },
            ].map(({ before, after }, i) => (
              <div key={i} className="bg-white p-8 group hover:bg-surface transition-colors duration-200">
                <p className="text-xs text-ink-faint line-through mb-3 font-light">{before}</p>
                <p className="text-sm font-medium text-ink leading-snug">{after}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ────────────────────────────────────────────────── */}
      <section id="includes" className="py-24 md:py-36 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-4">
            What you get
          </p>
          <h2 className="reveal font-display text-4xl md:text-6xl font-black text-ink leading-tight mb-16">
            Everything included,
            <br />
            <em className="italic text-highlight">zero extras.</em>
          </h2>

          <div className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden">
            {includes.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white p-8 md:p-10 hover:bg-surface transition-colors duration-200 group"
              >
                <span className="text-2xl text-ink-faint mb-4 block group-hover:text-highlight transition-colors duration-200">
                  {icon}
                </span>
                <h3 className="font-display text-lg font-black text-ink mb-2">{title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed font-light">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-6 md:px-10 bg-ink">
        <div className="max-w-7xl mx-auto">
          <p className="reveal text-xs font-medium text-white/40 tracking-widest uppercase mb-4">
            Pricing
          </p>
          <h2 className="reveal font-display text-4xl md:text-6xl font-black text-white leading-tight mb-16">
            Simple, honest
            <br />
            <em className="italic text-white/50">pricing.</em>
          </h2>

          <div className="reveal grid md:grid-cols-2 gap-6 max-w-3xl">
            <div className="border border-white/10 rounded-2xl p-8 md:p-10 bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-6">
                One-off Setup
              </p>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="font-display text-6xl font-black text-white leading-none">£500</span>
              </div>
              <p className="text-sm text-white/50 mb-8 font-light leading-relaxed">
                Paid once. Your site is designed, built and live. Everything included — no
                hidden costs, no nasty surprises.
              </p>
              <ul className="space-y-3">
                {[
                  "Custom design for your trade",
                  "Mobile-first & fast loading",
                  "SEO setup from day one",
                  "Contact & quote request form",
                  "Google Maps integration",
                  "1 round of revisions",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="text-green-400 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-highlight/30 rounded-2xl p-8 md:p-10 bg-highlight/5">
              <p className="text-xs font-semibold uppercase tracking-widest text-highlight/60 mb-6">
                Annual Retainer
              </p>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="font-display text-6xl font-black text-white leading-none">£150</span>
                <span className="text-white/40 text-sm">/year</span>
              </div>
              <p className="text-sm text-white/50 mb-8 font-light leading-relaxed">
                After your first year, keep everything running smoothly. We handle all the
                maintenance so you can focus on the job.
              </p>
              <ul className="space-y-3">
                {[
                  "Hosting & domain renewal",
                  "Security & software updates",
                  "Up to 2hrs content changes/year",
                  "Priority email support",
                  "Performance monitoring",
                  "Cancel any time",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="text-highlight flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="reveal mt-8 text-xs text-white/30 font-light">
            That's it. No monthly fees during year one. No upsells. No surprises.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-6 md:px-10 bg-surface">
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
              {
                n: "01",
                title: "Free Chat",
                desc: "We'll have a quick call to understand your trade, your area, and what you want from the site.",
              },
              {
                n: "02",
                title: "Design",
                desc: "I'll design a custom website tailored to your trade and brand. You review and give feedback.",
              },
              {
                n: "03",
                title: "Build & Review",
                desc: "I build the full site, set up SEO, and you get a final review before we go live.",
              },
              {
                n: "04",
                title: "Go Live",
                desc: "Your site launches. You start appearing in Google. New enquiries start coming in.",
              },
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

      {/* ── TESTIMONIALS ───────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-4">
            Social proof
          </p>
          <h2 className="reveal font-display text-4xl md:text-6xl font-black text-ink leading-tight mb-16">
            What clients say
          </h2>

          <div className="reveal grid md:grid-cols-3 gap-5">
            {testimonials.map(({ name, role, quote, initials, color }) => (
              <div key={name} className="border border-border rounded-2xl p-7 bg-white hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold font-display flex-shrink-0"
                    style={{ backgroundColor: color }}
                  >
                    {initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink leading-tight">{name}</div>
                    <div className="text-xs text-ink-faint mt-0.5">{role}</div>
                  </div>
                </div>
                <Stars />
                <blockquote className="text-sm text-ink-soft leading-relaxed font-light">
                  "{quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REFERRAL SCHEME ────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-6 md:px-10 bg-surface">
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
                <span className="text-ink font-semibold">£100 cash</span> for every
                completed sale. No limit — refer as many as you like.
              </p>
              <a
                href={`https://wa.me/447485218091?text=Hi%20Euan%2C%20I%27d%20like%20to%20refer%20someone%20for%20a%20website`}
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

            {/* Steps */}
            <div className="space-y-px bg-border rounded-xl overflow-hidden">
              {[
                {
                  n: "01",
                  title: "Refer a tradesperson",
                  desc: "Send me their name and contact details via WhatsApp or email.",
                },
                {
                  n: "02",
                  title: "They get a website",
                  desc: "I'll reach out, build their site, and handle everything end to end.",
                },
                {
                  n: "03",
                  title: "You get £100",
                  desc: "Once the sale completes, I'll send you £100. Simple as that.",
                },
              ].map(({ n, title, desc }) => (
                <div key={n} className="bg-white p-7 flex gap-6 items-start">
                  <span className="font-display text-3xl font-black text-ink/10 flex-shrink-0 leading-none mt-1">
                    {n}
                  </span>
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

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-4">
            FAQs
          </p>
          <div className="reveal grid md:grid-cols-2 gap-16 items-start">
            <h2 className="font-display text-4xl md:text-5xl font-black text-ink leading-tight sticky top-24">
              Questions?
              <br />
              <em className="italic">Answered.</em>
            </h2>
            <div>
              {faqs.map((faq) => (
                <FAQItem key={faq.q} {...faq} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 md:py-36 px-6 md:px-10 bg-ink">
        <div className="max-w-7xl mx-auto">
          <div className="reveal grid md:grid-cols-2 gap-16 md:gap-24 items-start">

            {/* Left — info */}
            <div>
              <p className="text-xs font-medium text-white/40 tracking-widest uppercase mb-6">
                Get in touch
              </p>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
                Ready to get
                <br />
                <em className="italic text-white/50">found online?</em>
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-10 font-light max-w-sm">
                Fill in the form and I'll get back to you within 24 hours. No
                obligation, no hard sell — just a free chat about what you need.
              </p>

              <div className="space-y-5">
                {/* Phone */}
                <a
                  href="tel:07485218091"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-white/30 group-hover:text-white/60 transition-all duration-200 flex-shrink-0">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/30 mb-0.5">Call us</p>
                    <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-200">
                      07485 218 091
                    </p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/447485218091?text=Hi%20Euan%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20trade%20business"
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
                    <p className="text-sm font-medium text-white/70 group-hover:text-green-400 transition-colors duration-200">
                      Message me on WhatsApp
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:euanmunroo@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-white/30 group-hover:text-white/60 transition-all duration-200 flex-shrink-0">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/30 mb-0.5">Email</p>
                    <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-200">
                      euanmunroo@gmail.com
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div>
              {formState === "success" ? (
                <div className="border border-white/10 rounded-2xl p-10 text-center">
                  <div className="text-5xl mb-5">✅</div>
                  <h3 className="font-display text-2xl font-black text-white mb-3">Message sent!</h3>
                  <p className="text-sm text-white/50 font-light leading-relaxed">
                    Thanks — I'll be in touch within 24 hours.
                    <br />
                    Or call/WhatsApp on{" "}
                    <a href="tel:07485218091" className="text-white/70 hover:text-white transition-colors">
                      07485 218 091
                    </a>
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
                    placeholder="Your trade (e.g. Plumber, Electrician)"
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
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell me a bit about your business and what you're looking for..."
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors duration-200 w-full font-light resize-none"
                  />
                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="w-full bg-white text-ink font-semibold py-4 rounded-full text-sm hover:bg-surface transition-colors duration-200 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState === "loading" ? "Sending..." : "Send Message — It's Free"}
                  </button>
                  {formState === "error" && (
                    <p className="text-xs text-red-400 text-center pt-1">
                      Something went wrong. Please WhatsApp or email me directly.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="reveal mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-white/30">
            <span>© {new Date().getFullYear()} MunroStudio. All rights reserved.</span>
            <Link href="/" className="hover:text-white/50 transition-colors duration-200">
              ← Back to main site
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}