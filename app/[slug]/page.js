import { notFound } from "next/navigation";
import SeoLandingPage from "@/components/SeoLandingPage";
import { seoPages, seoPageSlugs } from "@/app/seo-pages/seoPages";

// Static generation — Next.js builds each SEO page at build time for speed + SEO
export async function generateStaticParams() {
  return seoPageSlugs.map((slug) => ({ slug }));
}

// Per-page SEO metadata (title, meta description, canonical, Open Graph)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = seoPages[slug];
  if (!page) return {};

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: `https://munrostudio.co.uk/${slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: `https://munrostudio.co.uk/${slug}`,
      siteName: "MunroStudio",
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDescription,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const page = seoPages[slug];
  if (!page) notFound();

  // LocalBusiness + FAQ structured data — helps with rich results in Google
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `https://munrostudio.co.uk/${slug}#business`,
        name: "MunroStudio",
        description: page.metaDescription,
        url: `https://munrostudio.co.uk/${slug}`,
        telephone: "+447485218091",
        email: "euanmunroo@gmail.com",
        priceRange: "££",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Glasgow",
          addressRegion: "Scotland",
          addressCountry: "GB",
        },
        areaServed: {
          "@type": "City",
          name: "Glasgow",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SeoLandingPage page={page} />
    </>
  );
}