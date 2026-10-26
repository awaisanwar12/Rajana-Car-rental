import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { fleet, site } from "@/lib/site";
import { vehiclePages } from "@/lib/vehicle-pages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const fleetImages = Array.from(new Set(fleet.map((vehicle) => `${site.url}${vehicle.image}`)));

  return [
    {
      url: `${site.url}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${site.url}/images/honda-civic-rs.jpg`, `${site.url}/images/get-car-driver.jpg`],
    },
    {
      url: `${site.url}/fleet/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      images: fleetImages,
    },
    ...services.map((service) => ({
      url: `${site.url}/${service.slug}/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      images: [`${site.url}${service.image}`],
    })),
    ...vehiclePages.map((vehicle) => ({
      url: `${site.url}/${vehicle.slug}/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: [`${site.url}${vehicle.image}`],
    })),
    {
      url: `${site.url}/about/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [`${site.url}/images/get-car-driver.jpg`],
    },
    {
      url: `${site.url}/terms/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.65,
    },
  ];
}
