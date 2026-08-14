import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/rent-a-car-lahore/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/fleet/`, changeFrequency: "weekly", priority: 0.8 },
  ];
}
