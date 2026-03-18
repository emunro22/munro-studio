const items = [
  "Web Design",
  "Development",
  "Branding",
  "UI & UX",
  "Landing Pages",
  "E-Commerce",
  "SEO-Ready Builds",
];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div className="border-y border-border bg-surface overflow-hidden py-4 ticker-wrap">
      <div className="flex whitespace-nowrap ticker-inner animate-ticker">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 mx-8 text-sm font-medium text-ink-soft">
            <span className="w-1 h-1 rounded-full bg-ink-faint flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
