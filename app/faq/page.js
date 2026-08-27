import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";
import RevealWrapper from "@/components/RevealWrapper";
import FAQAccordion from "@/components/FAQAccordion";
import Link from "next/link";

export const metadata = {
  title: "FAQ | Munro Studio — Websites From £55/mo, Glasgow",
  description:
    "Answers to the questions Glasgow trades and small businesses ask most about pricing, what's included, SEO/GEO/AEO, timelines and the admin portal.",
};

const groups = [
  {
    title: "Pricing & the plan",
    faqs: [
      {
        q: "What's actually included in the £55/month?",
        a: "Everything. Custom website design and build, hosting, unlimited content changes, local SEO/GEO/AEO with weekly reports on how your site's doing plus ongoing upgrades, Google Business Profile setup, real Google reviews shown on your site, booking system integration, an admin portal, and priority support. No upsells, no hidden extras.",
      },
      {
        q: "How does the first month free work?",
        a: "I build your full site, launch it, and you use it for a month at no cost — no card details needed upfront. If you're happy, continue at £55/month. If not, just say so — no fee, no fuss.",
      },
      {
        q: "Can I cancel any time?",
        a: "Yes. No contract, no cancellation fee. If you cancel, you keep access until the end of the period you've already paid for.",
      },
      {
        q: "What's the difference between the monthly plan and the £499 one-off?",
        a: "The one-off gets you a fully built, hosted site with up to 25 area pages and 3 months of support — a good option if you just need a site live and don't need ongoing SEO work. The monthly plan adds weekly performance reporting, ongoing local SEO/GEO/AEO upgrades, an admin portal to edit content yourself, and unlimited changes — better if you want the site actively working to bring in more business over time.",
      },
      {
        q: "Are there any hidden costs?",
        a: "No. Domain registration (if you don't already have one) is the only thing typically billed separately, at cost — I'll always tell you upfront before anything is charged.",
      },
    ],
  },
  {
    title: "SEO, GEO & AEO",
    faqs: [
      {
        q: "What's the difference between SEO, GEO and AEO?",
        a: "SEO (search engine optimisation) is the classic discipline — helping Google understand and rank your pages. GEO (generative engine optimisation) and local optimisation focus on ranking in Google's local map pack and location-based searches. AEO (answer engine optimisation) is newer — structuring your content so AI tools like ChatGPT, Perplexity and Google's AI Overviews can read, trust and cite your business directly. Every site gets all three from day one.",
      },
      {
        q: "Will my site actually show up on Google?",
        a: "Every site is optimised for local SEO from day one — sitemap submitted to Google Search Console, Google Business Profile set up, structured data added so Google understands what you do and where. Ranking for competitive terms takes months industry-wide (anyone promising overnight #1 rankings is not being straight with you), but you're set up correctly from the start rather than needing it fixed later.",
      },
      {
        q: "How do I know if it's working?",
        a: "Monthly plan clients get weekly updates on how their site's actually performing, plus ongoing upgrades aimed at improving SEO/GEO/AEO based on what's actually found — not a generic monthly report template.",
      },
      {
        q: "Do you look at competitors?",
        a: "Yes — as part of the ongoing monthly work, competitor sites and Google Business Profiles in your area get checked so recommendations are based on what's actually working nearby, not guesswork.",
      },
    ],
  },
  {
    title: "The build & the process",
    faqs: [
      {
        q: "How long does it take to go live?",
        a: "Most sites are live within 2-3 weeks from kickoff. You'll be kept updated throughout and review everything before launch.",
      },
      {
        q: "Do I need to provide photos, copy, and branding?",
        a: "Whatever you have helps, but nothing is required upfront — a quick call or message about your business is usually enough to get a first draft moving.",
      },
      {
        q: "Do you integrate booking systems?",
        a: "Yes — Google Calendar, Calendly and similar tools can be integrated directly so customers can book without calling. Common for trades, salons, personal trainers, and any appointment-based business.",
      },
      {
        q: "What is the admin portal, exactly?",
        a: "A private dashboard so you can update photos, services, prices and content yourself — no code, no calling me for small changes. You're in control of your own site day to day.",
      },
      {
        q: "Can I make changes myself, or do I need to ask you?",
        a: "Both work. The admin portal covers most day-to-day updates yourself; for anything bigger, monthly plan clients get unlimited changes made for them too.",
      },
    ],
  },
  {
    title: "Working together",
    faqs: [
      {
        q: "What kind of businesses do you work with?",
        a: "Mostly Glasgow-area trades and small local businesses — garages, detailers, recovery services, groundcare, renovation, food & retail, and similar service-led businesses that rely on being found locally.",
      },
      {
        q: "Do you only work with businesses in Glasgow?",
        a: "Glasgow and the surrounding area is the main focus, since local SEO work benefits from genuinely understanding the area — but get in touch regardless and it can be discussed.",
      },
      {
        q: "How do I get in touch?",
        a: "WhatsApp is usually fastest, or use the contact form below. A quick chat about your business is the normal first step, no obligation.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div>
      <Navbar />
      <RevealWrapper>
        <section className="pt-32 pb-14 md:pt-40 md:pb-20 px-5 md:px-10 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-4">FAQs</p>
            <h1 className="reveal font-display text-4xl sm:text-5xl md:text-6xl font-black text-ink leading-tight mb-5">
              Questions?
              <br />
              <em className="italic">Answered.</em>
            </h1>
            <p className="reveal text-sm md:text-base text-ink-soft font-light max-w-lg mx-auto leading-relaxed">
              Everything Glasgow trades and small businesses usually ask before getting started. Not seeing your
              question?{" "}
              <a
                href="https://wa.me/447485218091?text=Hi%20Euan%2C%20I%20have%20a%20question"
                target="_blank"
                rel="noopener noreferrer"
                className="text-highlight underline"
              >
                Message me on WhatsApp
              </a>
              .
            </p>
          </div>
        </section>

        <section className="pb-16 md:pb-24 px-5 md:px-10 bg-white">
          <div className="max-w-3xl mx-auto reveal">
            {groups.map((group) => (
              <div key={group.title} className="mb-10 md:mb-14">
                <h2 className="font-display text-lg md:text-xl font-black text-ink mb-2">{group.title}</h2>
                <FAQAccordion faqs={group.faqs} />
              </div>
            ))}
          </div>
        </section>

        <section className="py-14 md:py-20 px-5 md:px-10 bg-surface text-center">
          <p className="reveal text-sm text-ink-soft font-light mb-4">Ready to see what your site could look like?</p>
          <Link
            href="/pricing"
            className="reveal inline-flex items-center gap-2 bg-ink text-white font-semibold px-6 py-3.5 rounded-full text-sm hover:bg-highlight active:scale-95 transition-all duration-200"
          >
            See pricing →
          </Link>
        </section>

        <Contact />
        <WhatsAppButton />
      </RevealWrapper>
    </div>
  );
}
