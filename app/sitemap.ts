import type { MetadataRoute } from "next";
import resume from "@/content/resume.json";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, lastModified: resume.updated, changeFrequency: "weekly", priority: 1 }];
}
