import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

  const staticPages = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${siteUrl}/ai-center`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${siteUrl}/ai-drawing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${siteUrl}/music`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${siteUrl}/games`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${siteUrl}/knowledge-base`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${siteUrl}/leaderboard`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.5 },
    { url: `${siteUrl}/daily`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.5 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${siteUrl}/categories`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.4 },
    { url: `${siteUrl}/tags`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.4 },
  ];

  return staticPages;
}
