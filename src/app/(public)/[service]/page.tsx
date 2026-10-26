import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLandingPage } from "@/components/ServiceLandingPage";
import { serviceBySlug, services } from "@/lib/services";
import { site } from "@/lib/site";

export const dynamicParams = false;

type ServiceRouteProps = {
  params: Promise<{ service: string }>;
};

export function generateStaticParams() {
  return services.map(({ slug }) => ({ service: slug }));
}

export async function generateMetadata({ params }: ServiceRouteProps): Promise<Metadata> {
  const { service: slug } = await params;
  const service = serviceBySlug.get(slug);

  if (!service) return {};

  const pageUrl = `/${service.slug}/`;

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "website",
      locale: "en_PK",
      siteName: site.name,
      url: pageUrl,
      title: `${service.title} | ${site.name}`,
      description: service.description,
      images: [{ url: service.image, alt: service.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | ${site.name}`,
      description: service.description,
      images: [service.image],
    },
  };
}

export default async function ServicePage({ params }: ServiceRouteProps) {
  const { service: slug } = await params;
  const service = serviceBySlug.get(slug);

  if (!service) notFound();

  return <ServiceLandingPage service={service} />;
}
