import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thaivisachecklist.com";

const routes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/guides", changeFrequency: "weekly", priority: 0.9 },
  { path: "/visa-news", changeFrequency: "daily", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
  { path: "/tdac", changeFrequency: "weekly", priority: 0.8 },

  { path: "/visa/marriage/stages", changeFrequency: "weekly", priority: 0.9 },
  { path: "/visa/marriage/stages/stage-1", changeFrequency: "weekly", priority: 0.8 },
  { path: "/visa/marriage/stages/stage-2", changeFrequency: "weekly", priority: 0.8 },
  { path: "/visa/marriage", changeFrequency: "weekly", priority: 0.9 },

  { path: "/visa/retirement/stages", changeFrequency: "weekly", priority: 0.9 },
  { path: "/visa/retirement/stages/stage-1", changeFrequency: "weekly", priority: 0.7 },
  { path: "/visa/retirement/stages/stage-2", changeFrequency: "weekly", priority: 0.7 },
  { path: "/visa/retirement", changeFrequency: "weekly", priority: 0.9 },

  { path: "/guides/90-day-reporting", changeFrequency: "weekly", priority: 0.8 },
  { path: "/guides/re-entry-permit", changeFrequency: "weekly", priority: 0.8 },
  { path: "/guides/tm30", changeFrequency: "weekly", priority: 0.8 },
  { path: "/guides/voa-visa-exemption", changeFrequency: "weekly", priority: 0.8 },
  { path: "/guides/tourist-extension", changeFrequency: "weekly", priority: 0.8 },
  { path: "/guides/yellow-book", changeFrequency: "monthly", priority: 0.7 },
  { path: "/guides/pink-id-card", changeFrequency: "monthly", priority: 0.7 },
  { path: "/guides/passport-renewal-stamp-transfer", changeFrequency: "monthly", priority: 0.7 },
  { path: "/guides/overstay-thailand", changeFrequency: "monthly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
