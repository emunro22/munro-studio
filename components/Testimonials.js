"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    name: "CG Groundcare",
    category: "Garden & Landscaping",
    quote: "Euan transformed our online presence completely. We started getting enquiries within the first week of going live.",
    person: "Cameron",
    role: "Founder",
    desktop: "/cg-groundcare-desktop.png",
    phone: "/cg-groundcare-iphone-removebg-preview.png",
    website: "https://cg-groundcare.co.uk",
    color: "#15803d",
  },
  // ... rest of your projects array
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#111111">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const timerRef = useRef(null);

  const goTo = (index) => {
    if (index === active) return;
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  const next = () => {
    setDirection(1);
    setActive((prev) => (prev + 1) % projects.length);
  };

  useEffect(() => {
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, [active]);

  const p = projects[active];

  return (
    <section id="testimonials" className="py-24 md:py-36 px-6 md:px-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 md:mb-20">
          <p className="text-xs font-semibold text-gray-400 tracking-[0.2em] uppercase mb-4">
            Recent work
          </p>
          <h2 className="font-display text-5xl md:text-7xl font-black text-black leading-[1.1] tracking-tight">
            Work that <br />
            <span className="italic font-serif font-light text-gray-800">speaks for itself.</span>
          </h2>
        </header>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Animated Mockup Display */}
          <div className="relative aspect-[4/3] lg:aspect-auto">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full"
              >
                {/* Desktop Mockup with "Glass" Frame */}
                <div className="relative rounded-2xl overflow-hidden border-[6px] border-gray-900 shadow-2xl">
                   <div className="absolute top-0 w-full h-6 bg-gray-900 flex items-center px-3 gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                   </div>
                  <img
                    src={p.desktop}
                    alt={p.name}
                    className="w-full h-auto pt-6 object-cover"
                  />
                </div>

                {/* Phone Mockup — Floating & Shadowed */}
                <motion.div
                  initial={{ y: 40, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                  className="absolute -bottom-8 -right-4 md:-right-12 w-[35%] md:w-[32%] z-10"
                >
                  <div className="relative rounded-[2.5rem] p-1.5 bg-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-[1px] border-white/10">
                    <img
                      src={p.phone}
                      alt="mobile view"
                      className="w-full h-auto rounded-[2rem]"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — Testimonial Content */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
                  style={{ backgroundColor: `${p.color}15`, color: p.color }}
                >
                  {p.category}
                </span>

                <h3 className="text-4xl font-black text-black mb-4">{p.name}</h3>
                <Stars />

                <blockquote className="text-xl md:text-2xl text-gray-600 leading-snug font-medium italic mb-8 border-l-4 border-gray-100 pl-6">
                  "{p.quote}"
                </blockquote>

                <div className="flex items-center gap-4 mb-10">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.person.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-bold text-black">{p.person}</p>
                    <p className="text-sm text-gray-400">{p.role}, {p.name}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination UI */}
            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="group relative h-8 flex items-center"
                >
                  <div className={`h-1 rounded-full transition-all duration-500 ${i === active ? 'w-12 bg-black' : 'w-4 bg-gray-200 group-hover:bg-gray-300'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}