const core = [
  {
    icon: "◈",
    title: "Custom Design",
    desc: "A professional, mobile-first website built around your trade — not a template.",
  },
  {
    icon: "◎",
    title: "SEO-Ready Build",
    desc: "Built to rank in Google searches like 'plumber near me' so customers find you first.",
  },
  {
    icon: "◇",
    title: "Fast & Secure Hosting",
    desc: "Your site goes live on fast, reliable hosting. No tech headaches. (Monthly plan.)",
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
    title: "Google Business Setup",
    desc: "I set up your Google Business Profile so you show up on Google Maps when locals search.",
  },
  {
    icon: "⬢",
    title: "Review Collection",
    desc: "Simple system to capture Google reviews after jobs — the #1 driver of local rankings.",
  },
  {
    icon: "◭",
    title: "Ongoing Support",
    desc: "£55/month covers updates, changes, and any issues. Or £499 one-off to own it outright.",
  },
];

const extras = [
  {
    icon: "◬",
    title: "Logo Design",
    desc: "A clean, professional logo that works across your site, van, and socials.",
    price: "from £99",
  },
  {
    icon: "◭",
    title: "Social Media Setup",
    desc: "Branded Facebook and Instagram business pages, ready to post from day one.",
    price: "from £79",
  },
  {
    icon: "◊",
    title: "Pro Bundle",
    desc: "Website + logo + social setup + monthly Google review automation. Everything, bundled.",
    price: "£99/mo all-in",
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
          Every website comes fully loaded — design, hosting, SEO, Google setup and review collection. No upsells for the basics.
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

        {/* Optional extras */}
        <div className="reveal mt-20">
          <p className="text-xs font-medium text-ink-faint tracking-widest uppercase mb-4">
            Optional extras
          </p>
          <h3 className="font-display text-3xl md:text-4xl font-black text-ink leading-tight mb-10 max-w-xl">
            Want the full package? <em className="italic text-highlight">Go Pro.</em>
          </h3>

          <div className="grid sm:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden">
            {extras.map(({ icon, title, desc, price }) => (
              <div
                key={title}
                className="bg-white p-8 hover:bg-surface transition-colors duration-200 group flex flex-col"
              >
                <span className="text-2xl text-ink-faint mb-4 block group-hover:text-highlight transition-colors duration-200">
                  {icon}
                </span>
                <h4 className="font-display text-base font-black text-ink mb-2">{title}</h4>
                <p className="text-sm text-ink-soft leading-relaxed font-light flex-1">{desc}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-highlight">
                  {price}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pro bundle callout */}
        <div className="reveal mt-6 rounded-xl border border-border bg-surface p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
          <div>
            <p className="text-sm font-semibold text-ink mb-1">Not sure what you need?</p>
            <p className="text-sm text-ink-soft font-light">
              Drop me a message and I'll help you pick the right setup for your trade and budget. No pushy sales.
            </p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 bg-ink text-white font-medium px-6 py-3 rounded-full text-sm hover:bg-highlight transition-colors duration-200 text-center"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}