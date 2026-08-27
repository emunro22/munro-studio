import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";
import RevealWrapper from "@/components/RevealWrapper";
import BlogPostBody from "@/components/BlogPostBody";
import { posts, postSlugs } from "@/app/blog/posts";

export async function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | MunroStudio Blog`,
    description: post.metaDescription,
    alternates: { canonical: `https://munrostudio.co.uk/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `https://munrostudio.co.uk/blog/${slug}`,
      siteName: "MunroStudio",
      locale: "en_GB",
      type: "article",
      publishedTime: post.publishDate,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
    },
  };
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: { "@type": "Organization", name: "MunroStudio" },
    publisher: { "@type": "Organization", name: "MunroStudio", url: "https://munrostudio.co.uk" },
    mainEntityOfPage: `https://munrostudio.co.uk/blog/${slug}`,
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />
      <RevealWrapper>
        <article className="pt-32 pb-16 md:pt-40 md:pb-24 px-5 md:px-10 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="reveal flex items-center gap-3 text-xs text-ink-faint mb-5">
              <span className="uppercase tracking-widest font-semibold text-highlight">{post.category}</span>
              <span>·</span>
              <time dateTime={post.publishDate}>{fmtDate(post.publishDate)}</time>
              <span>·</span>
              <span>{post.readTime} min read</span>
            </div>
            <h1 className="reveal font-display text-3xl sm:text-4xl md:text-5xl font-black text-ink leading-tight mb-8">
              {post.title}
            </h1>
            <div className="reveal">
              <BlogPostBody body={post.body} />
            </div>

            <div className="reveal mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <p className="text-sm text-ink-soft font-light max-w-sm">
                Thinking about your own website or getting more from the one you've got?
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 bg-ink text-white font-semibold px-6 py-3.5 rounded-full text-sm hover:bg-highlight active:scale-95 transition-all duration-200 whitespace-nowrap"
              >
                See pricing →
              </Link>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="py-14 md:py-20 px-5 md:px-10 bg-surface">
            <div className="max-w-4xl mx-auto reveal">
              <p className="text-xs font-medium text-ink-faint tracking-widest uppercase mb-6">More on {post.category}</p>
              <div className="grid sm:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="block bg-white border border-border rounded-2xl p-5 hover:border-ink transition-colors duration-200"
                  >
                    <p className="text-xs text-ink-faint mb-2">{fmtDate(r.publishDate)}</p>
                    <p className="font-display text-sm font-black text-ink leading-snug">{r.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <Contact />
        <WhatsAppButton />
      </RevealWrapper>
    </div>
  );
}
