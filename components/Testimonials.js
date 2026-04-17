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
  {
    name: "Envirocycle Glasgow",
    category: "Waste Management",
    quote: "Professional, fast, and exactly what we needed. The site looks incredible on mobile and we rank well locally now.",
    person: "Envirocycle Team",
    role: "Client",
    desktop: "/enviro-cycle-desktop.png",
    phone: "/enviro-cycle-iphone-removebg-preview.png",
    website: "#",
    color: "#854d0e",
  },
  {
    name: "Root + Fuel",
    category: "Food & Catering",
    quote: "Euan captured our brand's essence perfectly. The new site isn't just beautiful — it's driven real growth in our customer bookings.",
    person: "Samantha Hamilton",
    role: "Founder",
    desktop: "/root-fuel-desktop.png",
    phone: "/root-fuel-iphone-removebg-preview.png",
    website: "https://rootandfuelltd.com",
    color: "#166534",
  },
  {
    name: "SRL Recovery",
    category: "Vehicle Recovery",
    quote: "Working with Euan was effortless from start to finish. He delivered a fast, scalable solution that exceeded our expectations.",
    person: "William Cassidy",
    role: "Founder",
    desktop: "/srl-recovery-desktop.png",
    phone: "/srl-recovery-iphone-removebg-preview.png",
    website: "https://srlrecovery.com",
    color: "#6d28d9",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 mb-4">
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
    <section id="testimonials" className="py-24 md:py-36 px-6 md:px-10 bg-[#FCFCFC] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-16 md:mb-24">
          <p className="text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase mb-4">
            Recent work
          </p>
          <h2 className="font-display text-5xl md:text-7xl font-black text-[#111] leading-[1.1] tracking-tighter">
            Work that <br />
            <span className="italic font-serif font-light text-gray-800">speaks for itself.</span>
          </h2>
        </header>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left — Image Display with Framer Motion */}
          <div className="relative aspect-[4/3] lg:aspect-auto">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full"
              >
                {/* Desktop Mockup */}
                <div className="relative rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                  <img
                    src={p.desktop}
                    alt={`${p.name} desktop`}
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Phone Mockup — Using drop-shadow for transparent PNGs */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="absolute -bottom-8 -right-4 md:-right-10 w-[35%] md:w-[32%] z-10"
                  style={{ filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.2))" }}
                >
                  <img
                    src={p.phone}
                    alt={`${p.name} mobile`}
                    className="w-full h-auto"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — Content */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6">
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full"
                    style={{ backgroundColor: `${p.color}15`, color: p.color }}
                  >
                    {p.category}
                  </span>
                </div>

                <h3 className="text-4xl md:text-5xl font-black text-[#111] mb-4 tracking-tight">
                  {p.name}
                </h3>
                
                <Stars />

                <blockquote className="text-xl md:text-2xl text-gray-600 leading-snug font-medium italic mb-8 border-l-4 border-gray-100 pl-6">
                  "{p.quote}"
                </blockquote>

                <div className="flex items-center gap-4 mb-10">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.person.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#111] leading-tight">{p.person}</p>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">{p.role}, {p.name}</p>
                  </div>
                </div>

                {p.website !== "#" && (
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[11px] font-bold text-[#111] border-b-2 border-[#111] pb-1 hover:text-gray-500 hover:border-gray-300 transition-all duration-300"
                  >
                    VISIT LIVE SITE <span>→</span>
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-4 mt-24 border-t border-gray-100 pt-10">
          {projects.map((proj, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="group relative flex-1 max-w-[140px] text-left transition-all"
              aria-label={`View ${proj.name}`}
            >
              <div className="h-[2px] w-full bg-gray-100 mb-4 overflow-hidden">
                {i === active && (
                  <motion.div 
                    layoutId="activeTab"
                    className="h-full bg-[#111]" 
                  />
                )}
              </div>
              <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${i === active ? 'text-[#111]' : 'text-gray-300 group-hover:text-gray-400'}`}>
                {proj.name.split(' ')[0]}
              </span>
            </button>
          ))}
          
          <button
            onClick={next}
            className="ml-auto group flex items-center gap-3 text-[10px] font-bold tracking-widest uppercase text-[#111]"
          >
            Next 
            <span className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#111] group-hover:text-white transition-all duration-300">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}