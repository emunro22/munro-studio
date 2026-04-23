"use client";
import { useEffect, useRef } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import About from "@/components/About";
import AdDesign from "@/components/AdDesign";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { Pricing, HowItWorks, Referral, FAQ } from "@/components/sections";

export default function HomePage() {
  const ref = useRef(null);

  // Scroll reveal for all .reveal elements
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.06 }
    );
    els?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <About />
      <Pricing />
      <HowItWorks />
      <Testimonials />
      <AdDesign />
      <Referral />
      <FAQ />
      <Contact />
    </div>
  );
}