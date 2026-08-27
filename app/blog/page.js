import Link from "next/link";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";
import RevealWrapper from "@/components/RevealWrapper";
import { posts } from "@/app/blog/posts";

export const metadata = {
  title: "Blog | Munro Studio — Websites, SEO, GEO & AEO for Glasgow Businesses",
  description:
    "Practical advice on websites, local SEO, GEO and AEO for Glasgow trades and small businesses — from picking a web designer to getting found on Google and AI search.",
};

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function BlogIndexPage() {
  const sorted = [...posts].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  return (
    <div>
      <Navbar />
      <RevealWrapper>
        <section className="pt-32 pb-14 md:pt-40 md:pb-20 px-5 md:px-10 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <p className="reveal text-xs font-medium text-ink-faint tracking-widest uppercase mb-4">Blog</p>
            <h1 className="reveal font-display text-4xl sm:text-5xl md:text-6xl font-black text-ink leading-tight mb-5">
              Websites, SEO
              <br />
              <em className="italic">& what actually works.</em>
            </h1>
            <p className="reveal text-sm md:text-base text-ink-soft font-light max-w-lg mx-auto leading-relaxed">
              Practical, no-fluff advice for Glasgow trades and small businesses — from picking a web designer to
              ranking on Google and getting cited by AI search.
            </p>
          </div>
        </section>

        <section className="pb-20 md:pb-28 px-5 md:px-10 bg-white">
          <div className="max-w-5xl mx-auto reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sorted.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex flex-col bg-surface border border-border rounded-2xl p-6 hover:border-ink hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center gap-2 text-[11px] text-ink-faint mb-3">
                  <span className="uppercase tracking-widest font-semibold text-highlight">{post.category}</span>
                  <span>·</span>
                  <span>{post.readTime} min read</span>
                </div>
                <h2 className="font-display text-base font-black text-ink leading-snug mb-2.5 flex-1">{post.title}</h2>
                <p className="text-xs text-ink-soft font-light leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                <p className="text-[11px] text-ink-faint">{fmtDate(post.publishDate)}</p>
              </Link>
            ))}
          </div>
        </section>

        <Contact />
        <WhatsAppButton />
      </RevealWrapper>
    </div>
  );
}
