import type { Metadata } from "next";
import { site } from "@/lib/site";

export interface BuildMetadataInput {
  title: string;
  description: string;
  /** Route path, e.g. "/pricing". Used for canonical + og:url. */
  path: string;
  /** Optional image URL; defaults to the generated /opengraph-image. */
  image?: string;
}

/** Page metadata with canonical, Open Graph and Twitter card defaults. */
export function buildMetadata({ title, description, path, image }: BuildMetadataInput): Metadata {
  const url = new URL(path, site.url).toString();
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url,
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

/** Organization structured data (schema.org). */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: new URL("/brand/logo.svg", site.url).toString(),
    description: site.description,
  };
}
