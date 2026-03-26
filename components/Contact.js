"use client";
import { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [formState, setFormState] = useState("idle"); // "idle" | "loading" | "success" | "error"

  async function handleSubmit(e) {
    e.preventDefault();
    setFormState("loading");
    const data = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      trade: e.target.trade.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };
    try {
      const res = await fetch("/api/tradesmen-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setFormState(json.success ? "success" : "error");
    } catch {
      setFormState("error");
    }
  }

  return (
    <section id="contact" className="py-24 md:py-36 px-6 md:px-10 bg-ink">
      <div className="max-w-7xl mx-auto">
        <div className="reveal grid md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left — info */}
          <div>
            <p className="text-xs font-medium text-white/40 tracking-widest uppercase mb-6">
              Get in touch
            </p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              Ready to get
              <br />
              <em className="italic text-white/50">found online?</em>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-10 font-light max-w-sm">
              Fill in the form and I'll get back to you within 24 hours. No
              obligation, no hard sell — just a free chat about what you need.
            </p>

            <div className="space-y-5">
              <a href="tel:07485218091" className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-white/30 group-hover:text-white/60 transition-all duration-200 flex-shrink-0">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/30 mb-0.5">Call us</p>
                  <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-200">07485 218 091</p>
                </div>
              </a>

              <a
                href="https://wa.me/447485218091?text=Hi%20Euan%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20trade%20business"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-green-500/50 group-hover:text-green-400 transition-all duration-200 flex-shrink-0">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/30 mb-0.5">WhatsApp</p>
                  <p className="text-sm font-medium text-white/70 group-hover:text-green-400 transition-colors duration-200">Message me on WhatsApp</p>
                </div>
              </a>

              <a href="mailto:euanmunroo@gmail.com" className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-white/30 group-hover:text-white/60 transition-all duration-200 flex-shrink-0">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/30 mb-0.5">Email</p>
                  <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-200">euanmunroo@gmail.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {formState === "success" ? (
              <div className="border border-white/10 rounded-2xl p-10 text-center">
                <div className="text-5xl mb-5">✅</div>
                <h3 className="font-display text-2xl font-black text-white mb-3">Message sent!</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed">
                  Thanks — I'll be in touch within 24 hours.
                  <br />
                  Or call/WhatsApp on{" "}
                  <a href="tel:07485218091" className="text-white/70 hover:text-white transition-colors">
                    07485 218 091
                  </a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors duration-200 w-full font-light"
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone number"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors duration-200 w-full font-light"
                  />
                </div>
                <input
                  name="trade"
                  type="text"
                  placeholder="Your trade (e.g. Plumber, Electrician)"
                  required
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors duration-200 w-full font-light"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors duration-200 w-full font-light"
                />
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell me a bit about your business and what you're looking for..."
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors duration-200 w-full font-light resize-none"
                />
                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="w-full bg-white text-ink font-semibold py-4 rounded-full text-sm hover:bg-surface transition-colors duration-200 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formState === "loading" ? "Sending..." : "Send Message — It's Free"}
                </button>
                {formState === "error" && (
                  <p className="text-xs text-red-400 text-center pt-1">
                    Something went wrong. Please WhatsApp or email me directly.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Footer bar */}
        <div className="reveal mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-white/30">
          <span>© {new Date().getFullYear()} MunroStudio. All rights reserved.</span>
          <Link href="/" className="hover:text-white/50 transition-colors duration-200">
            ← Back to main site
          </Link>
        </div>
      </div>
    </section>
  );
}