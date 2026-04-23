const core = [
  {
    icon: "◈",
    title: "Custom Design",
    desc: "Mobile-first, built around your trade — not a template.",
  },
  {
    icon: "◎",
    title: "SEO-Ready Build",
    desc: "Built to rank for 'plumber near me' so customers find you first.",
  },
  {
    icon: "◇",
    title: "Fast & Secure Hosting",
    desc: "Goes live on fast hosting. No tech headaches.",
  },
  {
    icon: "◉",
    title: "Contact & Quote Form",
    desc: "Customers can request quotes directly from your site.",
  },
  {
    icon: "▣",
    title: "Google Maps",
    desc: "Your location pinned so locals know where you operate.",
  },
  {
    icon: "◫",
    title: "Google Business Setup",
    desc: "Show up on Google Maps when locals search your trade.",
  },
  {
    icon: "⬢",
    title: "Review Collection",
    desc: "Capture Google reviews — the #1 driver of local rankings.",
  },
  {
    icon: "◭",
    title: "Ongoing Support",
    desc: "£55/mo for updates, or £499 one-off to own it.",
  },
];

export default function About() {
  return (
    <section id="includes" className="py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-4">
          What you get
        </p>
        <h2 className="reveal font-display text-4xl md:text-6xl font-black text-ink leading-tight mb-6">
          Everything included,
          <br />
          <em className="italic text-highlight">zero extras.</em>
        </h2>
        <p className="reveal text-base text-ink-soft font-light leading-relaxed mb-16 max-w-xl">
          Design, hosting, SEO, Google setup, reviews. No upsells for the basics.
        </p>

        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
          {core.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white p-8 hover:bg-surface transition-colors duration-200 group"
            >
              <span className="text-2xl text-ink-faint mb-4 block group-hover:text-highlight transition-colors duration-200">
                {icon}
              </span>
              <h3 className="font-display text-base font-black text-ink mb-2">{title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed font-light">{desc}</p>
            </div>
          ))}
        </div>

        {/* Want more? Pro Bundle teaser — small, elegant, points to pricing */}
        <div className="reveal mt-8 rounded-2xl border-2 border-highlight bg-gradient-to-br from-highlight/10 to-surface p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest text-highlight mb-2">
              ★ Want the full package?
            </p>
            <p className="font-display text-xl md:text-2xl font-black text-ink leading-tight mb-1">
              Pro Bundle — website, logo, socials & monthly ads
            </p>
            <p className="text-sm text-ink-soft font-light">
              £99/month all-in. <span className="text-ink font-medium">Save £80+/month</span> vs buying separately.
            </p>
          </div>
          <a
            href="#pricing"
            className="flex-shrink-0 bg-highlight text-white font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity duration-200 text-center whitespace-nowrap"
          >
            See Pro Bundle
          </a>
        </div>
      </div>
    </section>
  );
}