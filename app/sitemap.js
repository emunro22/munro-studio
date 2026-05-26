import { seoPageSlugs } from "@/app/seo-pages/seoPages";

export default function sitemap() {
  const baseUrl = "https://munrostudio.co.uk";

  const staticRoutes = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/onboarding`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/thank-you`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes = [
    "web-design-glasgow",
    "seo-services-glasgow",
    "google-reviews-integration",
    "admin-portals-glasgow",
    "ecommerce-websites-glasgow",
    "website-design-for-tradesmen",
    "website-design-for-small-businesses",
    "google-business-profile-setup",
    "local-seo-glasgow",
    "website-maintenance-glasgow",
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const seoRoutes = seoPageSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...serviceRoutes, ...seoRoutes];
}
