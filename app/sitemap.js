import { seoPageSlugs } from "@/app/seo-pages/seoPages";

export default function sitemap() {
  const baseUrl = "https://munrostudio.co.uk";

  const staticRoutes = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/our-work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  const seoRoutes = seoPageSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...seoRoutes];
}