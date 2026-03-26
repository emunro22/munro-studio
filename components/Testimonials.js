"use client";
import { useEffect, useRef, useState } from "react";

const testimonials = [
{
    name: "David Munro",
    role: "Founder, SRL Recovery",
    quote: "Working with Euan was effortless from start to finish. He quickly understood our goals and delivered a fast, scalable solution that exceeded our expectations.",
    initials: "DM",
    color: "#111111",
    logo: "/srl-recovery-logo.png",
  },
  {
    name: "Cameron",
    role: "Founder, CG Groundcare",
    quote: "Euan transformed our outdated site into a modern, accessible platform. Our team and customers love the new interface and ease of use.",
    initials: "C",
    color: "#F59E0B",
    logo: "/cg-groundcare-logo.png",
  },
  {
    name: "Samantha Hamilton",
    role: "Founder, Root & Fuel",
    quote: "Euan captured our brand's essence perfectly. The new site isn't just beautiful; it's a powerful tool that has streamlined our customer bookings and fueled our growth.",
    initials: "SH",
    color: "#0057FF",
    logo: "/root-fuel-logo.png",
  },
  {
    name: "Rhys Duncan",
    role: "Owner, Renovate Design",
    quote: "As a design-led business, we have incredibly high standards. Euan delivered a sleek, high-performance site that perfectly reflects our own attention to detail.",
    initials: "RD",
    color: "#0057FF",
    logo: "/renovate-design-logo.png",
  },
  {
    name: "DXC Technology",
    role: "Technology Company",
    quote: "Euan provided exceptional technical expertise. He handled complex integrations with ease, resulting in a robust, enterprise-ready platform that performs flawlessly.",
    initials: "DXC",
    color: "#0057FF",
    logo: "/dxc-logo.png",
  },
    {
    name: "Colin Neil",
    role: "Founder, Clyde Valley Group",
    quote: "Euan’s technical knowledge is second to none. He built a fast, secure platform that not only works flawlessly but is also easy to maintain and expand.",
    initials: "CN",
    color: "#0057FF",
    logo: "/clyde-valley-group-logo.png",
  },

];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#111111">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = (index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(index);
      setAnimating(false);
    }, 300);
  };

  const next = () => goTo((active + 1) % testimonials.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 4000);
    return () => clearInterval(timerRef.current);
  }, [active]);

  const { name, role, quote, initials, color, logo } = testimonials[active];

  return (
    <section id="testimonials" className="py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-4">
          Social proof
        </p>
        <h2 className="reveal font-display text-4xl md:text-6xl font-black text-ink leading-tight mb-16">
          What clients say
        </h2>

        <div className="reveal max-w-2xl">
              <div
                className="border border-border rounded-2xl p-8 md:p-10 bg-white"
                style={{
                  minHeight: "280px",   // ← add this
                  opacity: animating ? 0 : 1,
                  transform: animating ? "translateX(12px)" : "translateX(0)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden border border-border">
                {logo ? (
                  <img src={logo} alt={name} className="w-full h-full object-contain p-1" />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-white text-xs font-bold font-display"
                    style={{ backgroundColor: color }}
                  >
                    {initials}
                  </div>
                )}
              </div>
              <div>
                <div className="text-sm font-semibold text-ink leading-tight">{name}</div>
                <div className="text-xs text-ink-faint mt-0.5">{role}</div>
              </div>
            </div>
            <Stars />
            <blockquote className="text-base text-ink-soft leading-relaxed font-light">
              "{quote}"
            </blockquote>
          </div>

          <div className="flex items-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? "28px" : "8px",
                  height: "8px",
                  backgroundColor: i === active ? "#111111" : "#d1d5db",
                }}
              />
            ))}
            <button
              onClick={next}
              className="ml-auto flex items-center gap-2 text-xs font-medium text-ink-faint hover:text-ink transition-colors duration-200"
            >
              Next
              <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-[10px]">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}