import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLandingPage } from "@/components/ServiceLandingPage";
import { serviceBySlug, services } from "@/lib/services";

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

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/${service.slug}/` },
    openGraph: { title: service.title, description: service.description, images: [{ url: service.image, alt: service.imageAlt }] },
  };
}

export default async function ServicePage({ params }: ServiceRouteProps) {
  const { service: slug } = await params;
  const service = serviceBySlug.get(slug);

  if (!service) notFound();

  return <ServiceLandingPage service={service} />;
}
