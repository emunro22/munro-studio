"use client";
import { useState } from "react";
import Link from "next/link";

export default function OnboardingPage() {
  const [formState, setFormState] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setFormState("loading");

    const form = e.target;
    const data = {
      businessName: form.businessName.value,
      contactName: form.contactName.value,
      phone: form.phone.value,
      email: form.email.value,
      industry: form.industry.value,
      currentWebsite: form.currentWebsite.value,
      goals: Array.from(form.querySelectorAll('input[name="goals"]:checked')).map((el) => el.value),
      domainName: form.domainName.value,
      hasLogo: form.hasLogo.value,
      hasPhotos: form.hasPhotos.value,
      colorPreferences: form.colorPreferences.value,
      services: form.services.value,
      targetArea: form.targetArea.value,
      deadline: form.deadline.value,
      notes: form.notes.value,
    };

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setFormState("success");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  const inputClass =
    "bg-surface border border-border rounded-xl px-4 py-3.5 text-sm text-ink placeholder-ink-faint focus:outline-none focus:border-ink transition-colors duration-200 w-full font-light";

  const labelClass = "block text-xs font-semibold text-ink uppercase tracking-widest mb-2";

  const selectClass =
    "bg-surface border border-border rounded-xl px-4 py-3.5 text-sm text-ink focus:outline-none focus:border-ink transition-colors duration-200 w-full font-light appearance-none";

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-ink py-16 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-block mb-8 text-xs font-semibold uppercase tracking-widest text-white/40 hover:text-white/60 transition-colors duration-200">
            ← Back to MunroStudio
          </Link>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Client Onboarding</p>
          <h1 className="font-display text-4xl md:text-6xl font-black text-white leading-tight mb-4">
            Let&apos;s get your
            <br />
            <em className="italic text-white/50">project started.</em>
          </h1>
          <p className="text-white/50 text-base font-light leading-relaxed max-w-lg">
            Fill in as much detail as you can — the more I know, the faster we can get your site live. I&apos;ll be in touch within 24 hours.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="py-16 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">

          {formState === "success" ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">✅</div>
              <h2 className="font-display text-3xl font-black text-ink mb-4">Form received!</h2>
              <p className="text-ink-soft text-base font-light leading-relaxed mb-8 max-w-md mx-auto">
                Thanks — I&apos;ll review your details and be in touch within 24 hours to discuss your project.
              </p>
              <Link
                href="/"
                className="inline-block bg-ink text-white font-semibold px-8 py-4 rounded-full text-sm hover:bg-highlight transition-colors duration-200"
              >
                Back to MunroStudio
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">

              {/* Section: About Your Business */}
              <div>
                <h2 className="font-display text-2xl font-black text-ink mb-6 pb-4 border-b border-border">
                  About Your Business
                </h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Business Name *</label>
                    <input name="businessName" type="text" required placeholder="e.g. Smith Plumbing" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Your Name *</label>
                    <input name="contactName" type="text" required placeholder="e.g. John Smith" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone *</label>
                    <input name="phone" type="tel" required placeholder="07xxx xxxxxx" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input name="email" type="email" required placeholder="you@example.com" className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Industry / Trade</label>
                    <input name="industry" type="text" placeholder="e.g. Plumber, Hair Salon, Restaurant, Builder" className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Section: Website Goals */}
              <div>
                <h2 className="font-display text-2xl font-black text-ink mb-6 pb-4 border-b border-border">
                  What Do You Need?
                </h2>
                <div className="mb-5">
                  <label className={labelClass}>Project Goals (tick all that apply)</label>
                  <div className="grid sm:grid-cols-2 gap-3 mt-2">
                    {[
                      "Brand new website",
                      "Redesign existing site",
                      "SEO & Google rankings",
                      "E-commerce / online ordering",
                      "Admin portal to manage content",
                      "Booking / quote form",
                      "Google reviews integration",
                      "Google Business Profile setup",
                    ].map((goal) => (
                      <label key={goal} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          name="goals"
                          value={goal}
                          className="w-4 h-4 rounded border-border accent-ink"
                        />
                        <span className="text-sm text-ink-soft group-hover:text-ink transition-colors duration-200 font-light">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Current Website URL</label>
                    <input name="currentWebsite" type="text" placeholder="https://... (or leave blank)" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Domain Name Preference</label>
                    <input name="domainName" type="text" placeholder="e.g. smithplumbing.co.uk" className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Section: Assets */}
              <div>
                <h2 className="font-display text-2xl font-black text-ink mb-6 pb-4 border-b border-border">
                  Your Assets
                </h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Do you have a logo?</label>
                    <select name="hasLogo" className={selectClass}>
                      <option value="">Select...</option>
                      <option value="Yes — I'll send it over">Yes — I&apos;ll send it over</option>
                      <option value="Yes but needs updating">Yes but needs updating</option>
                      <option value="No — I need one designed">No — I need one designed</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Do you have photos?</label>
                    <select name="hasPhotos" className={selectClass}>
                      <option value="">Select...</option>
                      <option value="Yes — plenty of photos">Yes — plenty of photos</option>
                      <option value="A few but need more">A few but need more</option>
                      <option value="No — need stock photos">No — need stock photos</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Colour Preferences</label>
                    <input name="colorPreferences" type="text" placeholder="e.g. Dark and professional, bright and bold, match my logo (blue + white)..." className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Section: Your Services */}
              <div>
                <h2 className="font-display text-2xl font-black text-ink mb-6 pb-4 border-b border-border">
                  Your Services &amp; Location
                </h2>
                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>Services you offer</label>
                    <textarea
                      name="services"
                      rows={3}
                      placeholder="e.g. Boiler installation, emergency callouts, central heating, landlord certificates..."
                      className={inputClass + " resize-none"}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Target area / location</label>
                    <input name="targetArea" type="text" placeholder="e.g. Glasgow, West End, Paisley, Scotland-wide..." className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Section: Timeline */}
              <div>
                <h2 className="font-display text-2xl font-black text-ink mb-6 pb-4 border-b border-border">
                  Timeline
                </h2>
                <div>
                  <label className={labelClass}>Ideal go-live date</label>
                  <input name="deadline" type="text" placeholder="e.g. ASAP, within 4 weeks, end of month..." className={inputClass} />
                </div>
              </div>

              {/* Section: Anything Else */}
              <div>
                <h2 className="font-display text-2xl font-black text-ink mb-6 pb-4 border-b border-border">
                  Anything Else?
                </h2>
                <textarea
                  name="notes"
                  rows={4}
                  placeholder="Any other details, inspiration sites, specific features you want, or things I should know..."
                  className={inputClass + " resize-none"}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="w-full bg-ink text-white font-semibold py-4 rounded-full text-sm hover:bg-highlight transition-colors duration-200 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formState === "loading" ? "Sending..." : "Submit Onboarding Form"}
                </button>
                {formState === "error" && (
                  <p className="text-xs text-red-500 text-center pt-3">
                    Something went wrong. Please email{" "}
                    <a href="mailto:euanmunroo@gmail.com" className="underline">euanmunroo@gmail.com</a>{" "}
                    or WhatsApp{" "}
                    <a href="https://wa.me/447485218091" className="underline">07485 218 091</a>.
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
