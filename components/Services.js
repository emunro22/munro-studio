export default function Services() {
  return (
    <section className="py-16 md:py-28 px-5 md:px-10 bg-surface">
      <div className="max-w-7xl mx-auto">
        <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-10 md:mb-12">
          Why MunroStudio
        </p>
        <div className="reveal grid md:grid-cols-2 gap-8 md:gap-24 mb-12 md:mb-16">
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-ink leading-tight">
            More than just
            <br />
            <em className="italic">a website.</em>
          </h2>
          <div className="flex flex-col justify-center gap-3 md:gap-4 text-ink-soft text-sm md:text-base leading-relaxed font-light">
            <p>
              Most web designers hand you a site and disappear. I build{" "}
              <span className="text-ink font-medium">the full picture</span> — your site, your SEO, your booking system, your Google reviews, your admin access, and your online ordering if you need it.
            </p>
            <p>
              Every site gets a sitemap submitted to Google, a Google Business Profile set up, and booking systems like{" "}
              <span className="text-ink font-medium">Google Calendar or Calendly</span> integrated so customers can book directly from your page.
            </p>
            <p>
              Need to update your own photos or services without calling me?{" "}
              <span className="text-ink font-medium">Admin portal included.</span> Need customers to order or book online?{" "}
              <span className="text-ink font-medium">That&apos;s included too.</span>
            </p>
          </div>
        </div>

        <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
          {[
            { before: "Generic template, looks like everyone else", after: "Fully custom design built around your brand" },
            { before: "No Google visibility when you launch", after: "Sitemap submitted, SEO-ready from day one" },
            { before: "Customers have to call to book", after: "Booking system live on your site from day one" },
            { before: "Can't update your own site", after: "Admin portal — you're in control" },
          ].map(({ before, after }, i) => (
            <div key={i} className="bg-white p-5 md:p-8 group hover:bg-surface transition-colors duration-200">
              <p className="text-xs text-ink-faint line-through mb-2 md:mb-3 font-light leading-snug">{before}</p>
              <p className="text-xs md:text-sm font-medium text-ink leading-snug">{after}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
