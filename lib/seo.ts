import type { Metadata } from "next";

const DEFAULT_SOCIAL_IMAGE = "/thai-visa-checklist-logo-social.png";
const DEFAULT_SOCIAL_IMAGE_ALT = "Thai Visa Checklist - Free document checklists and visa tools for Thailand";

type RouteMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  imageAlt?: string;
  noIndex?: boolean;
};

type SectionMetadataInput = {
  title: string;
  description: string;
};

export function createRouteMetadata({
  title,
  description,
  path,
  type = "website",
  imageAlt = DEFAULT_SOCIAL_IMAGE_ALT,
  noIndex = false,
}: RouteMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Thai Visa Checklist",
      type,
      images: [
        {
          url: DEFAULT_SOCIAL_IMAGE,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_SOCIAL_IMAGE],
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : undefined,
  };
}

export function createSectionMetadata({ title, description }: SectionMetadataInput): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "Thai Visa Checklist",
      type: "website",
      images: [
        {
          url: DEFAULT_SOCIAL_IMAGE,
          width: 1200,
          height: 630,
          alt: DEFAULT_SOCIAL_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_SOCIAL_IMAGE],
    },
  };
}
