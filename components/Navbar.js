"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { label: "What's included", href: "#includes" },
  { label: "Pricing", href: "#pricing" },
  { label: "Ad Design", href: "#ads" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled || open ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.9)",
          backdropFilter: "blur(8px)",
          borderBottom: scrolled || open ? "1px solid var(--tw-border-opacity, #e5e7eb)" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-lg font-black text-ink tracking-tight">
            Munro<em className="italic text-highlight">Studio</em>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-sm text-ink-soft hover:text-ink transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Phone number — visible on desktop */}
            <a
              href="tel:07485218091"
              className="hidden md:inline-flex items-center gap-2 text-sm text-ink hover:text-highlight transition-colors duration-200 font-medium"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
              </svg>
              <span className="hidden xl:inline">07485 218 091</span>
              <span className="inline xl:hidden">Call</span>
            </a>

            <a
              href="#contact"
              className="hidden md:inline-flex bg-ink text-white text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-highlight transition-colors duration-200"
            >
              Free Month
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
              aria-label="Toggle menu"
            >
              <span
                className="block h-0.5 bg-ink rounded-full transition-all duration-300"
                style={{ width: "22px", transform: open ? "translateY(8px) rotate(45deg)" : "none" }}
              />
              <span
                className="block h-0.5 bg-ink rounded-full transition-all duration-300"
                style={{ width: "22px", opacity: open ? 0 : 1 }}
              />
              <span
                className="block h-0.5 bg-ink rounded-full transition-all duration-300"
                style={{ width: "22px", transform: open ? "translateY(-8px) rotate(-45deg)" : "none" }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-40 bg-white flex flex-col px-6 pt-24 pb-10 md:hidden transition-all duration-300"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transform: open ? "translateY(0)" : "translateY(-8px)",
        }}
      >
        <div className="flex flex-col gap-1 flex-1">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={close}
              className="font-display text-3xl font-black text-ink py-3 border-b border-border hover:text-highlight transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="tel:07485218091"
          onClick={close}
          className="w-full border border-border text-ink text-sm font-semibold px-5 py-4 rounded-full hover:border-ink transition-colors duration-200 text-center mb-3 flex items-center justify-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
          </svg>
          Call 07485 218 091
        </a>

        <a
          href="#contact"
          onClick={close}
          className="w-full bg-ink text-white text-sm font-semibold uppercase tracking-widest px-5 py-4 rounded-full hover:bg-highlight transition-colors duration-200 text-center"
        >
          Claim Your Free Month
        </a>
      </div>
    </>
  );
}