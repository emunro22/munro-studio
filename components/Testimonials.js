"use client";
import { useState, useEffect, useRef } from "react";

const projects = [
  {
    name: "CG Groundcare",
    category: "Garden & Landscaping",
    quote: "We started getting enquiries within the first week of going live.",
    person: "Cameron",
    role: "Founder, CG Groundcare",
    desktop: "/cg-groundcare-desktop.png",
    phone: "/cg-groundcare-iphone-removebg-preview.png",
    website: "https://cg-groundcare.co.uk",
    color: "#15803d",
  },
  {
    name: "Envirocycle Glasgow",
    category: "Waste Management",
    quote: "The site looks incredible on mobile and we rank well locally now.",
    person: "Envirocycle Team",
    role: "Client",
    desktop: "/enviro-cycle-desktop.png",
    phone: "/enviro-cycle-iphone-removebg-preview.png",
    website: "https://www.envirocycleglasgow.com/",
    color: "#854d0e",
  },
  {
    name: "Root + Fuel",
    category: "Food & Catering",
    quote: "The new site isn't just beautiful — it's driven real growth in our bookings.",
    person: "Samantha Hamilton",
    role: "Founder, Root + Fuel",
    desktop: "/root-fuel-desktop.png",
    phone: "/root-fuel-iphone-removebg-preview.png",
    website: "https://rootandfuelltd.com",
    color: "#166534",
  },
  {
    name: "SRL Recovery",
    category: "Vehicle Recovery",
    quote: "Fast, professional, and exactly what we needed. Exceeded expectations.",
    person: "William Cassidy",
    role: "Founder, SRL Recovery",
    desktop: "/srl-recovery-desktop.png",
    phone: "/srl-recovery-iphone-removebg-preview.png",
    website: "https://srlrecovery.com",
    color: "#6d28d9",
  },
  {
    name: "Clyde Media Walls",
    category: "Media Walls",
    quote: "Euan helped setup our Logo, Website and Brand Identity! Second to none!",
    person: "Chris Presavage",
    role: "Founder, Clyde Media Walls",
    desktop: "/clyde-media-walls-desktop.png",
    phone: "/clyde-media-walls-phone.png",
    website: "https://clydemediawalls.co.uk",
    color: "#82C8E5",
  },
  {
    name: "The Garage Clydebank",
    category: "Garages / MOT Centres",
    quote: "Working with Euan was straight forward, we gave him my logo and a few photos and he designed everything.",
    person: "The Garage Clydebank",
    role: "Founder, The Garage Clydebank",
    desktop: "/the-garage-clydebank-desktop.png",
    phone: "/the-garage-clydebank-phone.png",
    website: "https://thegarageclydebank.co.uk",
    color: "#8B0000",
  },


];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = (index) => {
    if (animating || index === active) return;
    setAnimating(true);
    setTimeout(() => { setActive(index); setAnimating(false); }, 220);
  };

  const next = () => goTo((active + 1) % projects.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [active]);

  const p = projects[active];

  return (
    <section id="testimonials" className="pt-24 md:pt-32 pb-16 md:pb-20 px-6 md:px-10 bg-surface">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="reveal text-center mb-12">
          <p className="text-xs font-medium text-ink-faint tracking-widest uppercase mb-3">
            Recent work
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-ink leading-tight">
            Work that <em className="italic">speaks for itself.</em>
          </h2>
        </div>

        {/* Category tags */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {projects.map((proj, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all duration-200"
              style={{
                backgroundColor: i === active ? `${proj.color}18` : "transparent",
                color: i === active ? proj.color : "#9ca3af",
                borderColor: i === active ? `${proj.color}40` : "#e5e7eb",
              }}
            >
              {proj.category}
            </button>
          ))}
        </div>

        {/* Mockup images - Removed negative margin to prevent overlap */}
        <div
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(10px)" : "translateY(0)",
            transition: "opacity 0.22s ease, transform 0.22s ease",
            overflow: "visible",
            marginBottom: "3rem", 
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <img
            src={p.desktop}
            alt={`${p.name} desktop`}
            style={{ display: "block", width: "75%", height: "auto", flexShrink: 0 }}
          />
          <img
            src={p.phone}
            alt={`${p.name} mobile`}
            style={{
              display: "block",
              width: "22%",
              height: "auto",
              flexShrink: 0,
              marginLeft: "-4%",
              marginBottom: "2%",
              filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.15))",
            }}
          />
        </div>

        {/* Quote block - Added mt-12 for more vertical spacing */}
        <div
          className="text-center max-w-lg mx-auto mb-8 mt-12"
          style={{
            opacity: animating ? 0 : 1,
            transition: "opacity 0.22s ease",
          }}
        >
          <div className="flex justify-center gap-0.5 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#111111">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          
          <p className="text-lg md:text-xl text-ink font-medium leading-relaxed mb-6 italic">
            "{p.quote}"
          </p>

          <div className="mb-6">
             <h3 className="text-sm font-bold text-ink uppercase tracking-wider mb-1">{p.name}</h3>
             <p className="text-xs text-ink-faint">
               <span className="font-semibold text-ink-soft">{p.person}</span> · {p.role}
             </p>
          </div>

          {p.website !== "#" && (
            <a
              href={p.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-ink border border-border px-6 py-2.5 rounded-full hover:bg-ink hover:text-white hover:border-ink transition-all duration-300"
            >
              Visit site →
            </a>
          )}
        </div>

      </div>
    </section>
  );
}