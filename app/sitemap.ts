import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://thaivisachecklist.com";
const APP_DIR = path.join(process.cwd(), "app");

const ROUTE_OVERRIDES: Record<
  string,
  {
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }
> = {
  "/": { changeFrequency: "weekly", priority: 1.0 },
  "/guides": { changeFrequency: "weekly", priority: 0.9 },
  "/forms": { changeFrequency: "weekly", priority: 0.8 },
  "/visa-news": { changeFrequency: "daily", priority: 0.9 },
  "/about": { changeFrequency: "monthly", priority: 0.5 },
  "/contact": { changeFrequency: "monthly", priority: 0.5 },
  "/disclaimer": { changeFrequency: "monthly", priority: 0.4 },
  "/privacy-policy": { changeFrequency: "monthly", priority: 0.4 },
  "/terms-of-use": { changeFrequency: "monthly", priority: 0.4 },
  "/tdac": { changeFrequency: "weekly", priority: 0.8 },
  "/tools": { changeFrequency: "weekly", priority: 0.8 },
  "/games/immigration-dash": { changeFrequency: "weekly", priority: 0.7 },
  "/thailand-time": { changeFrequency: "daily", priority: 0.9 },
  "/offical-goverment-links": { changeFrequency: "monthly", priority: 0.7 },
  "/thailand-public-holidays-2026": { changeFrequency: "monthly", priority: 0.7 },

  "/visa/marriage/stages": { changeFrequency: "weekly", priority: 0.9 },
  "/visa/marriage/stages/apply-outside-thailand": { changeFrequency: "weekly", priority: 0.8 },
  "/visa/marriage/stages/convert-in-thailand": { changeFrequency: "weekly", priority: 0.8 },
  "/visa/marriage/extension-of-stay": { changeFrequency: "weekly", priority: 0.9 },

  "/visa/retirement/stages": { changeFrequency: "weekly", priority: 0.9 },
  "/visa/retirement/stages/apply-outside-thailand": { changeFrequency: "weekly", priority: 0.7 },
  "/visa/retirement/stages/convert-in-thailand": { changeFrequency: "weekly", priority: 0.7 },
  "/visa/retirement/extension-of-stay": { changeFrequency: "weekly", priority: 0.9 },

  "/guides/90-day-reporting": { changeFrequency: "weekly", priority: 0.8 },
  "/guides/re-entry-permit": { changeFrequency: "weekly", priority: 0.8 },
  "/guides/tm30": { changeFrequency: "weekly", priority: 0.8 },
  "/guides/voa-visa-exemption": { changeFrequency: "weekly", priority: 0.8 },
  "/guides/tourist-extension": { changeFrequency: "weekly", priority: 0.8 },
  "/guides/yellow-book": { changeFrequency: "monthly", priority: 0.7 },
  "/guides/pink-id-card": { changeFrequency: "monthly", priority: 0.7 },
  "/guides/passport-renewal-stamp-transfer": { changeFrequency: "monthly", priority: 0.7 },
  "/guides/overstay-thailand": { changeFrequency: "monthly", priority: 0.8 },
  "/guides/thai-driving-licence": { changeFrequency: "monthly", priority: 0.8 },
  "/guides/opening-bank-account-thailand": { changeFrequency: "monthly", priority: 0.8 },
  "/guides/do-i-need-a-visa-thailand": { changeFrequency: "weekly", priority: 0.9 },
  "/guides/marriage-visa-thailand": { changeFrequency: "weekly", priority: 0.9 },
  "/guides/retirement-visa-thailand": { changeFrequency: "weekly", priority: 0.9 },
  "/guides/foreigners-paying-tax-thailand": { changeFrequency: "monthly", priority: 0.7 },
};

function toRouteFromFile(filePath: string) {
  const rel = filePath.replace(`${APP_DIR}${path.sep}`, "");
  if (rel === "page.tsx") return "/";
  return `/${rel.replace(/\\/g, "/").replace(/\/page\.tsx$/, "")}`;
}

function getPageFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getPageFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name === "page.tsx") {
      files.push(fullPath);
    }
  }

  return files;
}

function getSitemapRoutes() {
  const pageFiles = getPageFiles(APP_DIR);
  return pageFiles
    .map(toRouteFromFile)
    .filter((route) => !route.startsWith("/api/"))
    .filter((route) => !route.includes("[") && !route.includes("]"))
    .sort((a, b) => a.localeCompare(b));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = getSitemapRoutes();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: ROUTE_OVERRIDES[route]?.changeFrequency ?? "monthly",
    priority: ROUTE_OVERRIDES[route]?.priority ?? 0.6,
  }));
}
