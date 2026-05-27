import { seoPageSlugs } from "@/app/seo-pages/seoPages";

export default function sitemap() {
  const baseUrl = "https://munrostudio.co.uk";

  const staticRoutes = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
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

  return [...staticRoutes, ...seoRoutes];
}
