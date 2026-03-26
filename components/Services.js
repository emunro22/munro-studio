export default function Services() {
  return (
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
            <p>Most tradespeople don't have a proper website. That's your advantage.</p>
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
  );
}