"use client";

import { useEffect, useState } from "react";

export default function ThankYou() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background-color: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .page {
          min-height: 100vh;
          background-color: #0a0a0a;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        /* Background texture */
        .page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,99,235,0.12) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        /* Noise overlay */
        .page::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          opacity: 0.4;
          pointer-events: none;
          z-index: 0;
        }

        /* Nav */
        .nav {
          position: relative;
          z-index: 10;
          padding: 28px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .nav.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .logo {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          text-decoration: none;
        }

        .logo em {
          color: #2563eb;
          font-style: italic;
        }

        .nav-tag {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }

        /* Main content */
        .main {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 24px;
          text-align: center;
        }

        /* Check icon */
        .check-wrap {
          margin-bottom: 40px;
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.5s ease 0.2s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.2s;
        }

        .check-wrap.visible {
          opacity: 1;
          transform: scale(1);
        }

        .check-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(37,99,235,0.15);
          border: 1.5px solid rgba(37,99,235,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          position: relative;
        }

        .check-circle::before {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px solid rgba(37,99,235,0.15);
        }

        .check-circle svg {
          width: 28px;
          height: 28px;
          stroke: #2563eb;
          stroke-width: 2.5;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* Eyebrow */
        .eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #2563eb;
          margin-bottom: 20px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.5s ease 0.35s, transform 0.5s ease 0.35s;
        }

        .eyebrow.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Heading */
        .heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(42px, 7vw, 72px);
          font-weight: 900;
          color: #ffffff;
          line-height: 1.0;
          letter-spacing: -2px;
          margin-bottom: 24px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s;
        }

        .heading.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .heading em {
          color: #2563eb;
          font-style: italic;
        }

        /* Subtext */
        .subtext {
          font-size: 16px;
          font-weight: 400;
          color: rgba(255,255,255,0.45);
          line-height: 1.7;
          max-width: 460px;
          margin-bottom: 48px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.6s ease 0.55s, transform 0.6s ease 0.55s;
        }

        .subtext.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* What happens next card */
        .next-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 32px 36px;
          max-width: 480px;
          width: 100%;
          margin-bottom: 48px;
          text-align: left;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease 0.65s, transform 0.6s ease 0.65s;
        }

        .next-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .next-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 20px;
        }

        .step {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 20px;
        }

        .step:last-child { margin-bottom: 0; }

        .step-num {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(37,99,235,0.15);
          border: 1px solid rgba(37,99,235,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: #2563eb;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .step-text {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
        }

        .step-text strong {
          color: rgba(255,255,255,0.9);
          font-weight: 600;
          display: block;
          margin-bottom: 2px;
        }

        /* CTA */
        .cta-wrap {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.6s ease 0.75s, transform 0.6s ease 0.75s;
        }

        .cta-wrap.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .btn-primary {
          display: inline-block;
          background: #2563eb;
          color: #ffffff;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          text-decoration: none;
          padding: 14px 28px;
          border-radius: 100px;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .btn-primary:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
        }

        .btn-secondary {
          display: inline-block;
          border: 1.5px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.6);
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          text-decoration: none;
          padding: 13px 28px;
          border-radius: 100px;
          transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }

        .btn-secondary:hover {
          border-color: rgba(255,255,255,0.3);
          color: rgba(255,255,255,0.9);
          transform: translateY(-1px);
        }

        /* Footer */
        .footer {
          position: relative;
          z-index: 10;
          padding: 24px 40px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          opacity: 0;
          transition: opacity 0.6s ease 0.9s;
        }

        .footer.visible { opacity: 1; }

        .footer-text {
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          line-height: 1.6;
        }

        .footer-logo {
          font-family: 'Playfair Display', serif;
          font-size: 14px;
          font-weight: 700;
          color: rgba(255,255,255,0.2);
        }

        .footer-logo em {
          color: rgba(37,99,235,0.5);
          font-style: italic;
        }

        @media (max-width: 600px) {
          .nav { padding: 20px 24px; }
          .next-card { padding: 24px; }
          .footer { flex-direction: column; gap: 12px; text-align: center; }
        }
      `}</style>

      <div className="page">
        <nav className={`nav ${visible ? "visible" : ""}`}>
          <a href="/" className="logo">Munro<em>Studio</em></a>
          <span className="nav-tag">Enquiry Received</span>
        </nav>

        <main className="main">
          <div className={`check-wrap ${visible ? "visible" : ""}`}>
            <div className="check-circle">
              <svg viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          <p className={`eyebrow ${visible ? "visible" : ""}`}>Message Sent</p>

          <h1 className={`heading ${visible ? "visible" : ""}`}>
            We'll be in<br /><em>touch soon.</em>
          </h1>

          <p className={`subtext ${visible ? "visible" : ""}`}>
            Thanks for reaching out. Your enquiry has landed with us and we'll get back to you within 24 hours.
          </p>

          <div className={`next-card ${visible ? "visible" : ""}`}>
            <p className="next-label">What happens next</p>

            <div className="step">
              <div className="step-num">1</div>
              <div className="step-text">
                <strong>We review your enquiry</strong>
                Usually within a few hours during business hours.
              </div>
            </div>

            <div className="step">
              <div className="step-num">2</div>
              <div className="step-text">
                <strong>We give you a call</strong>
                Quick 10-minute chat to understand your trade and what you need.
              </div>
            </div>

            <div className="step">
              <div className="step-num">3</div>
              <div className="step-text">
                <strong>Your site goes live in 2–3 weeks</strong>
                SEO-ready, mobile-first, fixed at £55/month. That's it.
              </div>
            </div>
          </div>

          <div className={`cta-wrap ${visible ? "visible" : ""}`}>
            <a href="tel:07485218091" className="btn-primary">Call Us Now</a>
            <a href="/" className="btn-secondary">Back to Home</a>
          </div>
        </main>

        <footer className={`footer ${visible ? "visible" : ""}`}>
          <p className="footer-text">
            © 2026 MunroStudio · Professional websites for UK tradespeople<br />
            £55/month · No setup fee · Cancel any time
          </p>
          <span className="footer-logo">Munro<em>Studio</em></span>
        </footer>
      </div>
    </>
  );
}