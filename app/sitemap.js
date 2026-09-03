import { seoPageSlugs } from "@/app/seo-pages/seoPages";
import { posts } from "@/app/blog/posts";

export default function sitemap() {
  const baseUrl = "https://munrostudio.co.uk";

  const staticRoutes = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/reviews`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/onboarding`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/thank-you`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];

  // Every slug in seoPages has a real rendered page via app/[slug]/page.js
  const seoRoutes = seoPageSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: slug.startsWith("web-design-") || slug === "glasgow-web-design" ? 0.95 : 0.85,
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...seoRoutes, ...blogRoutes];
}
