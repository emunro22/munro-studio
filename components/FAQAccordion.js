"use client";
import { useState } from "react";

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="text-sm font-medium text-ink group-hover:text-highlight transition-colors duration-200 leading-snug">
          {q}
        </span>
        <span
          className="text-ink-faint flex-shrink-0 text-xl transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }}
        >
          +
        </span>
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? "400px" : "0" }}>
        <p className="text-sm text-ink-soft leading-relaxed pb-5 font-light">{a}</p>
      </div>
    </div>
  );
}

export default function FAQAccordion({ faqs }) {
  return (
    <div>
      {faqs.map((faq) => (
        <FAQItem key={faq.q} {...faq} />
      ))}
    </div>
  );
}
