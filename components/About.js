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
    desc: "£55/month covers updates, changes, and any issues. Or choose the £499 one-off and own it outright.",
  },
];

export default function About() {
  return (
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
  );
}