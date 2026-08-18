import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/rent-a-car-lahore/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/fleet/`, changeFrequency: "weekly", priority: 0.8 },
    ...services.map((service) => ({ url: `${site.url}/${service.slug}/`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
