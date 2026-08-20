"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const HEIGHT = 220;
const PAD_LEFT = 44;
const PAD_RIGHT = 16;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;
const FALLBACK_WIDTH = 720;

export default function MetricsChart({ points, label = "Page views" }) {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(FALLBACK_WIDTH);
  const [hoverIdx, setHoverIdx] = useState(null);

  // Measure the real rendered width instead of relying on viewBox scaling,
  // so axis/label text stays a legible physical size on narrow phone screens
  // rather than shrinking along with a fixed-width viewBox.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width;
      if (w) setWidth(Math.round(w));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { path, xFor, yFor, yTicks } = useMemo(() => {
    const innerW = width - PAD_LEFT - PAD_RIGHT;
    const innerH = HEIGHT - PAD_TOP - PAD_BOTTOM;
    const values = points.map((p) => p.value);
    const max = Math.max(1, ...values);

    const xFor = (i) =>
      points.length <= 1 ? PAD_LEFT + innerW / 2 : PAD_LEFT + (innerW * i) / (points.length - 1);
    const yFor = (v) => PAD_TOP + innerH - (innerH * v) / max;

    const path = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(i).toFixed(1)} ${yFor(p.value).toFixed(1)}`)
      .join(" ");

    const yTicks = [0, 0.5, 1].map((f) => Math.round(max * f));

    return { path, xFor, yFor, yTicks };
  }, [points, width]);

  if (!points || points.length === 0) {
    return (
      <div ref={containerRef} style={{ color: "var(--text-muted)", fontSize: 14, padding: "32px 0", textAlign: "center" }}>
        No weekly numbers logged yet — add this week's figures below to start the chart.
      </div>
    );
  }

  const maxLabels = Math.max(2, Math.floor(width / 65));
  const labelEvery = Math.max(1, Math.ceil(points.length / maxLabels));
  const hovered = hoverIdx != null ? points[hoverIdx] : null;

  function pickNearest(clientX) {
    const svg = containerRef.current?.querySelector("svg");
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const relX = ((clientX - rect.left) / rect.width) * width;
    let nearest = 0;
    let best = Infinity;
    points.forEach((_, i) => {
      const d = Math.abs(xFor(i) - relX);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setHoverIdx(nearest);
  }

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <svg
        viewBox={`0 0 ${width} ${HEIGHT}`}
        style={{ width: "100%", height: "auto", display: "block", touchAction: "pan-y" }}
        onMouseLeave={() => setHoverIdx(null)}
        onMouseMove={(e) => pickNearest(e.clientX)}
        onTouchStart={(e) => pickNearest(e.touches[0].clientX)}
        onTouchMove={(e) => pickNearest(e.touches[0].clientX)}
      >
        {yTicks.map((t, i) => (
          <g key={i}>
            <line
              x1={PAD_LEFT}
              x2={width - PAD_RIGHT}
              y1={yFor(t)}
              y2={yFor(t)}
              stroke="var(--gridline)"
              strokeWidth="1"
            />
            <text x={PAD_LEFT - 8} y={yFor(t) + 4} textAnchor="end" fontSize="12" fill="var(--text-muted)">
              {t.toLocaleString()}
            </text>
          </g>
        ))}

        <line
          x1={PAD_LEFT}
          x2={width - PAD_RIGHT}
          y1={HEIGHT - PAD_BOTTOM}
          y2={HEIGHT - PAD_BOTTOM}
          stroke="var(--baseline)"
          strokeWidth="1"
        />

        {points.map((p, i) =>
          i % labelEvery === 0 ? (
            <text key={i} x={xFor(i)} y={HEIGHT - 8} textAnchor="middle" fontSize="12" fill="var(--text-muted)">
              {p.label}
            </text>
          ) : null
        )}

        <path d={path} fill="none" stroke="var(--series-1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {points.map((p, i) => (
          <circle
            key={i}
            cx={xFor(i)}
            cy={yFor(p.value)}
            r={hoverIdx === i ? 6 : 3}
            fill="var(--series-1)"
            stroke="var(--surface)"
            strokeWidth={hoverIdx === i ? 2 : 0}
          />
        ))}

        {hoverIdx != null && (
          <line
            x1={xFor(hoverIdx)}
            x2={xFor(hoverIdx)}
            y1={PAD_TOP}
            y2={HEIGHT - PAD_BOTTOM}
            stroke="var(--baseline)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        )}
      </svg>

      {hovered && (
        <div
          style={{
            position: "absolute",
            left: `${Math.min(80, Math.max(0, (xFor(hoverIdx) / width) * 100))}%`,
            top: 0,
            transform: xFor(hoverIdx) / width > 0.5 ? "translateX(-105%)" : "translateX(6%)",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: "6px 10px",
            fontSize: 12,
            color: "var(--text-primary)",
            pointerEvents: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            whiteSpace: "nowrap",
          }}
        >
          <div style={{ color: "var(--text-muted)" }}>{hovered.label}</div>
          <div style={{ fontWeight: 600 }}>
            {label}: {hovered.value.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}
