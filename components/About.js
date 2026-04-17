const includes = [
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
    title: "Ongoing Support",
    desc: "£55/month covers updates, changes, and any issues. Or choose the £499 one-off and own it outright.",
  },
  {
    icon: "◬",
    title: "Logo Design",
    desc: "Need a logo? I'll design a clean, professional logo that works across your site, van, and socials.",
  },
  {
    icon: "◭",
    title: "Social Media Setup",
    desc: "I'll set up and brand your Facebook, Instagram, and Google Business Profile — ready to start posting.",
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
          Website, logo, social media — everything your trade business needs to look professional and get found online.
        </p>

        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
          {includes.map(({ icon, title, desc }) => (
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

        {/* Logo + social callout strip */}
        <div className="reveal mt-6 rounded-xl border border-border bg-surface p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
          <div>
            <p className="text-sm font-semibold text-ink mb-1">Need a logo or social media setup?</p>
            <p className="text-sm text-ink-soft font-light">
              I offer logo design and full social media setup as standalone services or bundled with your website. Ask me about pricing when you get in touch.
            </p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 bg-ink text-white font-medium px-6 py-3 rounded-full text-sm hover:bg-highlight transition-colors duration-200 text-center"
          >
            Ask about extras
          </a>
        </div>
      </div>
    </section>
  );
}