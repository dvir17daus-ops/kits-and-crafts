import type { MetadataRoute } from "next";
import { siteMetadata } from "@/lib/metadata";

const routes = [
  "",
  "/summer-kits",
  "/wood-kits",
  "/string-art",
  "/holiday-crafts",
  "/deals",
  "/contact",
  "/accessibility",
  "/terms",
  "/privacy",
  "/returns",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteMetadata.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
