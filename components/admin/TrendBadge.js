export default function TrendBadge({ current, previous }) {
  if (current == null || previous == null || previous === 0) {
    return <span className="badge badge-neutral">no prior week</span>;
  }
  const pct = Math.round(((current - previous) / previous) * 100);
  if (pct === 0) return <span className="badge badge-neutral">flat</span>;
  const up = pct > 0;
  return (
    <span className={`badge ${up ? "badge-good" : "badge-critical"}`}>
      {up ? "↑" : "↓"} {Math.abs(pct)}%
    </span>
  );
}
