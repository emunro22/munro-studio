"use client";
import { useEffect, useRef } from "react";

// Same scroll-reveal behavior as app/page.js's inline version, packaged for
// reuse on standalone pages (pricing, FAQ) outside the homepage tree.
export default function RevealWrapper({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.06 }
    );
    els?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}
