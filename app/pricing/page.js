import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";
import RevealWrapper from "@/components/RevealWrapper";
import AnimatedStat from "@/components/AnimatedStat";
import Link from "next/link";

export const metadata = {
  title: "Pricing | Munro Studio — Websites From £55/mo, Glasgow",
  description:
    "One plan, everything included: custom website, hosting, local SEO, Google Business Profile, admin portal and more from £55/month, first month free. See exactly what's included and real client results.",
};

const monthlyFeatures = [
  "Fully custom website design & build",
  "Hosting, managed & always updated",
  "Local SEO, GEO & AEO — weekly reports on how your site's doing plus ongoing upgrades",
  "Google Business Profile setup + reviews shown on your site",
  "Booking system integration (Google Calendar etc.)",
  "Admin portal — update your own content",
  "Contact, quote & order forms",
  "Unlimited content changes + priority support",
];

const oneOffFeatures = [
  "Full custom design & build",
  "Hosted by us",
  "Up to 25 area pages on your site",
  "Google reviews integrated",
  "3 months support included",
  "No ongoing SEO/GEO/AEO monitoring or weekly reports",
];

function Check({ ok }) {
  return (
    <span className={ok ? "text-highlight" : "text-ink-faint/40"} style={{ flexShrink: 0, marginTop: 2 }}>
      {ok ? "✓" : "—"}
    </span>
  );
}

export default function PricingPage() {
  return (
    <div>
      <Navbar />
      <RevealWrapper>
        {/* Header */}
        <section className="pt-32 pb-14 md:pt-40 md:pb-20 px-5 md:px-10 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-4">Pricing</p>
            <h1 className="reveal font-display text-4xl sm:text-5xl md:text-6xl font-black text-ink leading-tight mb-5">
              One price.
              <br />
              <em className="italic">Everything included.</em>
            </h1>
            <p className="reveal text-sm md:text-base text-ink-soft font-light max-w-xl mx-auto leading-relaxed">
              No upsells, no hidden extras, no surprise invoices. Website, hosting, local SEO/GEO/AEO, an admin
              portal and weekly updates on how your site's actually performing — all in one plan.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="py-10 md:py-16 px-5 md:px-10 bg-ink">
          <div className="max-w-5xl mx-auto reveal grid md:grid-cols-2 gap-5">
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
              <ul className="space-y-2.5 flex-1 mb-7">
                {monthlyFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white">
                    <span className="text-highlight flex-shrink-0 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/#contact"
                className="block w-full bg-highlight text-white text-center font-semibold py-3.5 rounded-full text-sm hover:opacity-90 active:scale-95 transition-all duration-200"
              >
                Start free — no card needed
              </Link>
            </div>

            <div className="border border-white/10 rounded-2xl p-6 md:p-8 bg-white/5 flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">One-Off Payment</p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-display text-5xl sm:text-6xl font-black text-white leading-none">£499</span>
              </div>
              <p className="text-sm text-white/50 mb-1 font-light">Pay once, hosted by us.</p>
              <p className="text-xs text-white/30 mb-6 font-light">No ongoing SEO or weekly reporting included.</p>

              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">What's included:</p>
              <ul className="space-y-2.5 flex-1 mb-7">
                {oneOffFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                    <span className="text-white/40 flex-shrink-0 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/#contact"
                className="block w-full border border-white/20 text-white text-center font-semibold py-3.5 rounded-full text-sm hover:border-white/40 active:scale-95 transition-all duration-200"
              >
                Get a quote
              </Link>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-14 md:py-20 px-5 md:px-10 bg-white">
          <div className="max-w-4xl mx-auto reveal">
            <h2 className="font-display text-2xl md:text-3xl font-black text-ink text-center mb-8 md:mb-10">
              Side by side
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface">
                    <th className="text-left font-semibold text-ink-soft px-5 py-4">What you get</th>
                    <th className="text-center font-semibold text-highlight px-5 py-4">£55/mo</th>
                    <th className="text-center font-semibold text-ink-soft px-5 py-4">£499 one-off</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Custom design & build", true, true],
                    ["Hosting", true, true],
                    ["Google reviews on site", true, true],
                    ["Admin portal", true, false],
                    ["Weekly performance reports", true, false],
                    ["Ongoing local SEO / GEO / AEO upgrades", true, false],
                    ["Unlimited content changes", true, false],
                    ["Priority support", true, false],
                    ["Ongoing support window", "Always on", "3 months"],
                  ].map(([label, monthly, oneOff]) => (
                    <tr key={label} className="border-t border-border">
                      <td className="px-5 py-3.5 text-ink-soft">{label}</td>
                      <td className="px-5 py-3.5 text-center">
                        {typeof monthly === "boolean" ? <Check ok={monthly} /> : <span className="text-ink font-medium">{monthly}</span>}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        {typeof oneOff === "boolean" ? <Check ok={oneOff} /> : <span className="text-ink-soft">{oneOff}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Real results */}
        <section className="py-16 md:py-24 px-5 md:px-10 bg-surface">
          <div className="max-w-5xl mx-auto">
            <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-3 text-center">
              Real results
            </p>
            <h2 className="reveal font-display text-2xl sm:text-3xl md:text-4xl font-black text-ink text-center mb-3 max-w-2xl mx-auto leading-tight">
              Not projections — actual client outcomes.
            </h2>
            <p className="reveal text-sm text-ink-faint text-center font-light mb-12 md:mb-16 max-w-xl mx-auto">
              Two real, specific results from Munro Studio clients — not industry averages or invented case studies.
            </p>
            <div className="reveal grid sm:grid-cols-2 gap-8 md:gap-12 bg-white rounded-2xl border border-border p-8 md:p-14">
              <AnimatedStat
                value={7298}
                prefix="£"
                label="Made online in the first month"
                sub="143 paid orders through a store we built for a local butcher who had zero online presence before — in under 4 weeks."
              />
              <AnimatedStat
                value={40}
                prefix="23 → "
                label="Google reviews in 12 hours"
                sub="Now the #1 ranked business in their area on Google, using the same automated review-request process every client gets."
              />
            </div>
          </div>
        </section>

        <Testimonials />

        {/* FAQ teaser */}
        <section className="py-14 md:py-20 px-5 md:px-10 bg-white text-center">
          <p className="reveal text-sm text-ink-soft font-light mb-4">Got more questions?</p>
          <Link
            href="/faq"
            className="reveal inline-flex items-center gap-2 border border-border text-ink font-semibold px-6 py-3.5 rounded-full text-sm hover:bg-ink hover:text-white hover:border-ink active:scale-95 transition-all duration-200"
          >
            Read the full FAQ →
          </Link>
        </section>

        <Contact />
        <WhatsAppButton />
      </RevealWrapper>
    </div>
  );
}
