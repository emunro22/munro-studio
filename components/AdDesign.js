"use client";

const packages = [
  {
    name: "Single Ad",
    price: "£49",
    unit: "per ad",
    desc: "One ad, 2 rounds of revisions, all sizes you need.",
    cta: "Order ad",
  },
  {
    name: "Ad Pack",
    price: "£149",
    unit: "4 ads",
    desc: "Full campaign set across Facebook, Insta, and Google.",
    cta: "Order pack",
    highlight: true,
  },
  {
    name: "Monthly",
    price: "£79",
    unit: "/mo · 2 ads",
    desc: "Fresh branded ads every month. Any format.",
    cta: "Subscribe",
  },
  {
    name: "Pro Bundle",
    price: "£99",
    unit: "/mo · all-in",
    desc: "Website + logo + socials + 2 ads/month. Save £80+/mo.",
    cta: "Go Pro",
    bundle: true,
  },
];

export default function AdDesign() {
  return (
    <section id="ads" className="py-24 md:py-36 px-6 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Intro — trimmed */}
        <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-4">
          New service
        </p>
        <div className="reveal grid md:grid-cols-2 gap-12 md:gap-24 mb-20 items-start">
          <h2 className="font-display text-4xl md:text-6xl font-black text-ink leading-tight">
            Ads that don't
            <br />
            <em className="italic text-highlight">look like ads.</em>
          </h2>
          <div className="flex flex-col gap-4 text-ink-soft text-base leading-relaxed font-light">
            <p>
              Running Facebook ads with <span className="text-ink font-medium">DIY graphics</span>, or paying Fiverr for AI slop?
            </p>
            <p>
              I design scroll-stopping ads that look like they came from a proper brand — static ads, stories, display banners, flyers, van graphics. No ad management, no retainer — just <span className="text-ink font-medium">clean design, delivered fast</span>.
            </p>
          </div>
        </div>

        {/* What I design — condensed inline strip instead of big card grid */}
        <div className="reveal mb-20 border-y border-border py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "◈", title: "Facebook & Instagram", sub: "Static + stories" },
              { icon: "◎", title: "Google Display", sub: "Every ad size" },
              { icon: "◇", title: "Flyers & Leaflets", sub: "Print-ready PDFs" },
              { icon: "◉", title: "Van & Signage", sub: "Sign-writer ready" },
            ].map(({ icon, title, sub }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="text-xl text-highlight flex-shrink-0">{icon}</span>
                <div>
                  <p className="font-display text-sm font-black text-ink leading-tight">{title}</p>
                  <p className="text-xs text-ink-soft font-light mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing — 4-up compact grid with Pro Bundle as 4th option */}
        <div className="reveal">
          <p className="text-xs font-medium text-ink-faint tracking-widest uppercase mb-6">
            Pricing
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {packages.map(({ name, price, unit, desc, cta, highlight, bundle }) => (
              <div
                key={name}
                className={`rounded-2xl p-6 flex flex-col relative transition-all duration-200 ${
                  bundle
                    ? "border-2 border-highlight bg-gradient-to-br from-highlight/10 to-highlight/5"
                    : highlight
                    ? "border-2 border-ink bg-surface"
                    : "border border-border bg-white hover:border-ink/40"
                }`}
              >
                {bundle && (
                  <span className="absolute -top-3 left-5 bg-highlight text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    ★ Best Value
                  </span>
                )}
                {highlight && !bundle && (
                  <span className="absolute -top-3 left-5 bg-ink text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    Popular
                  </span>
                )}
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint mb-4">
                  {name}
                </p>
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="font-display text-4xl font-black text-ink leading-none">
                    {price}
                  </span>
                </div>
                <p className="text-xs text-ink-faint mb-4 font-light">{unit}</p>
                <p className="text-sm text-ink-soft mb-6 font-light leading-relaxed flex-1">
                  {desc}
                </p>
                <a
                  href={bundle ? "#pricing" : "#contact"}
                  className={`block w-full text-center font-semibold py-2.5 rounded-full text-xs uppercase tracking-wider transition-colors duration-200 ${
                    bundle
                      ? "bg-highlight text-white hover:opacity-90"
                      : "bg-ink text-white hover:bg-highlight"
                  }`}
                >
                  {cta}
                </a>
              </div>
            ))}
          </div>

          {/* Tiny note for existing clients — no big callout needed */}
          <p className="mt-6 text-xs text-ink-faint font-light">
            Already a MunroStudio website client? <span className="text-ink font-medium">20% off</span> any standalone ad design — just mention it when you message.
          </p>
        </div>
      </div>
    </section>
  );
}