export default function Services() {
  return (
    <section className="py-24 md:py-36 px-6 md:px-10 bg-surface">
      <div className="max-w-7xl mx-auto">
        <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-12">
          The problem
        </p>
        <div className="reveal grid md:grid-cols-2 gap-12 md:gap-24 mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-black text-ink leading-tight">
            Stop renting
            <br />
            <em className="italic">your leads.</em>
          </h2>
          <div className="flex flex-col justify-center gap-4 text-ink-soft text-base leading-relaxed font-light">
            <p>
              Checkatrade, MyBuilder and Rated People charge{" "}
              <span className="text-ink font-medium">£100+ every month</span> — and the moment you stop paying, you vanish. Every lead is shared with 3–5 other trades, so you're racing to the bottom on price.
            </p>
            <p>
              Your own website is different. It works <span className="text-ink font-medium">24/7</span>, the leads are exclusively yours, and you own it forever. A professional site builds instant trust and shows off your work — even while you're on a job.
            </p>
            <p>Most tradespeople still don't have a proper website. That's your advantage.</p>
          </div>
        </div>

        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden mt-10">
          {[
            { before: "Paying £100+/mo to Checkatrade, forever", after: "Own your site for £499 — yours for life" },
            { before: "Leads shared with 3–5 competitors", after: "Exclusive leads, direct to your phone" },
            { before: "Relying on word of mouth only", after: "Get found by new customers on Google" },
            { before: "No way to show off your work", after: "Gallery of past jobs builds instant trust" },
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