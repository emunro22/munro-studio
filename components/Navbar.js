"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { label: "Services", href: "/#includes" },
  { label: "Pricing", href: "/pricing" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/#contact" },
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
          borderBottom: scrolled || open ? "1px solid #e5e7eb" : "1px solid transparent",
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

          <div className="flex items-center gap-2">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/mnrostudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center w-8 h-8 text-ink-soft hover:text-ink transition-colors duration-200"
              aria-label="Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/447485218091?text=Hi%20Euan%2C%20I%27m%20interested%20in%20a%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center w-8 h-8 text-ink-soft hover:text-green-600 transition-colors duration-200"
              aria-label="WhatsApp"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>

            <a
              href="tel:07485218091"
              className="hidden md:inline-flex items-center gap-2 text-sm text-ink hover:text-highlight transition-colors duration-200 font-medium ml-1"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
              </svg>
              <span className="hidden xl:inline">07485 218 091</span>
              <span className="inline xl:hidden">Call</span>
            </a>

            <a
              href="#contact"
              className="hidden md:inline-flex bg-ink text-white text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-highlight transition-colors duration-200 ml-1"
            >
              Get a Quote
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

        {/* Mobile social icons row */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <a
            href="https://www.instagram.com/mnrostudio/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
            Instagram
          </a>
          <a
            href="https://wa.me/447485218091?text=Hi%20Euan%2C%20I%27m%20interested%20in%20a%20website"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
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
          Get a Quote
        </a>
      </div>
    </>
  );
}
