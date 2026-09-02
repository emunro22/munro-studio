const services = [
  {
    icon: "◈",
    title: "Custom Website Design",
    desc: "Mobile-first, fully custom: built around your business, not a template.",
  },
  {
    icon: "◎",
    title: "SEO & Sitemap XML",
    desc: "Built to rank on Google. Sitemap submitted so your pages get indexed fast.",
  },
  {
    icon: "◉",
    title: "Booking Systems",
    desc: "Google Calendar, Calendly & more, so customers book directly from your site.",
  },
  {
    icon: "⬢",
    title: "Google Reviews",
    desc: "Your live Google reviews displayed on your site to build instant trust.",
  },
  {
    icon: "◫",
    title: "Google Business Setup",
    desc: "I set up and optimise your Google Business Profile so you appear on Maps.",
  },
  {
    icon: "▣",
    title: "Admin Portal",
    desc: "Update your own photos, services & content, no developer needed.",
  },
  {
    icon: "◇",
    title: "Online Ordering",
    desc: "Full ordering & booking so customers can buy or request quotes directly.",
  },
  {
    icon: "◭",
    title: "Ongoing Support",
    desc: "Hosting, updates, and support all handled. You focus on your business.",
  },
];

export default function About() {
  return (
    <section id="includes" className="py-16 md:py-28 px-5 md:px-10">
      <div className="max-w-7xl mx-auto">
        <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-4">
          What's included
        </p>
        <h2 className="reveal font-display text-3xl sm:text-5xl md:text-6xl font-black text-ink leading-tight mb-4">
          Everything your business
          <br />
          <em className="italic text-highlight">needs online.</em>
        </h2>
        <p className="reveal text-sm md:text-base text-ink-soft font-light leading-relaxed mb-10 md:mb-14 max-w-xl">
          From a simple brochure site to a full ordering system with booking and admin portal, all for £55/month.
        </p>

        <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
          {services.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white p-5 md:p-8 hover:bg-surface transition-colors duration-200 group"
            >
              <span className="text-xl md:text-2xl text-ink-faint mb-3 md:mb-4 block group-hover:text-highlight transition-colors duration-200">
                {icon}
              </span>
              <h3 className="font-display text-sm md:text-base font-black text-ink mb-1.5">{title}</h3>
              <p className="text-xs md:text-sm text-ink-soft leading-relaxed font-light">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
