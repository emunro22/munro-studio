"use client";
import { useEffect, useRef } from "react";

export default function Contact() {
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    els?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" ref={ref} className="py-24 md:py-36 px-6 md:px-10 bg-ink">
      <div className="max-w-7xl mx-auto">
        <div className="reveal max-w-2xl">
          <p className="text-xs font-medium text-white/40 tracking-widest uppercase mb-6">
            Get in touch
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8">
            Let's build
            <br />
            <em className="italic text-white/60">something great.</em>
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-10 font-light max-w-md">
            Got a project in mind? Whether you're starting from scratch or need
            a redesign, I'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:euanmunroo@gmail.com"
              className="inline-flex items-center justify-center gap-2 bg-white text-ink font-medium px-8 py-4 rounded-full text-sm hover:bg-surface transition-colors duration-200"
            >
              euanmunroo@gmail.com
              <span className="opacity-40">↗</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="reveal mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-white/30">
          <span>© {new Date().getFullYear()} MunroStudio. All rights reserved.</span>
          <div className="flex gap-6">
            {["Instagram", "LinkedIn", "Twitter"].map((s) => (
              <a
                key={s}
                href="#"
                className="hover:text-white/60 transition-colors duration-200"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
