import type { Metadata } from "next";
import { getPortfolioProjectBySlug, convertSanityPortfolioToApp } from "@/lib/sanity";
import { portfolioProjects } from "@/data/portfolio";
import { stripMarkdown } from "@/lib/utils";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://inventivebytellc.com";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Try Sanity first, then static fallback
  let title: string;
  let description: string;
  let images: string[] = [];
  let videoUrl: string | undefined;

  const sanityProject = await getPortfolioProjectBySlug(slug);
  if (sanityProject) {
    const project = convertSanityPortfolioToApp(sanityProject);
    title = project.title;
    description = project.description || project.longDescription || "";
    images = project.images || [];
    videoUrl = project.videoFileUrl || project.video;
  } else {
    const staticProject = portfolioProjects.find((p) => p.id === slug);
    if (!staticProject) {
      return { alternates: { canonical: `/portfolio/${slug}` } };
    }
    title = staticProject.title;
    description = staticProject.description || staticProject.longDescription || "";
    images = (staticProject.images || []).map((path) =>
      path.startsWith("http") ? path : `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`
    );
    videoUrl = staticProject.videoFileUrl || staticProject.video;
  }

  const pageTitle = `${title} | Portfolio | InventiveByte LLC`;
  const plainDesc = stripMarkdown(description) || description;
  const shortDescription =
    plainDesc.length > 160 ? plainDesc.slice(0, 157) + "..." : plainDesc;

  // First image as absolute URL for OG (Sanity CDN URLs are already absolute)
  const ogImageUrl =
    images.length > 0
      ? images[0].startsWith("http")
        ? images[0]
        : `${baseUrl}${images[0].startsWith("/") ? "" : "/"}${images[0]}`
      : `${baseUrl}/inventivebyte-logo2.png`;

  const metadata: Metadata = {
    title: pageTitle,
    description: shortDescription,
    alternates: { canonical: `/portfolio/${slug}` },
    openGraph: {
      title: pageTitle,
      description: shortDescription,
      url: `${baseUrl}/portfolio/${slug}`,
      siteName: "InventiveByte LLC",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - InventiveByte LLC Portfolio`,
        },
      ],
      ...(videoUrl && {
        videos: [
          {
            url: videoUrl.startsWith("http") ? videoUrl : `${baseUrl}${videoUrl.startsWith("/") ? "" : "/"}${videoUrl}`,
            type: "video/mp4",
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: shortDescription,
      images: [ogImageUrl],
    },
  };

  return metadata;
}

export default function PortfolioSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
