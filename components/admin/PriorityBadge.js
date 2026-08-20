const CLASS_BY_PRIORITY = {
  critical: "badge-critical",
  high: "badge-high",
  medium: "badge-medium",
  low: "badge-low",
};

const LABEL_BY_PRIORITY = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export default function PriorityBadge({ priority }) {
  const cls = CLASS_BY_PRIORITY[priority] || "badge-neutral";
  const label = LABEL_BY_PRIORITY[priority] || priority;
  return <span className={`badge ${cls}`}>{label}</span>;
}
