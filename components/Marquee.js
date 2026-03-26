const trades = [
  "Plumbers", "Electricians", "Builders", "Decorators",
  "Roofers", "Landscapers", "Plasterers", "Carpenters",
  "Gas Engineers", "HVAC Engineers", "Tilers", "Joiners",
];

export default function Marquee() {
  return (
    <div className="bg-ink py-4 overflow-hidden">
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ animation: "marquee 18s linear infinite", width: "max-content" }}
      >
        {[...trades, ...trades].map((t, i) => (
          <span
            key={i}
            className="text-xs font-semibold uppercase tracking-widest text-white/50 flex items-center gap-3"
          >
            <span className="text-highlight text-[8px]">◆</span>
            {t}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}