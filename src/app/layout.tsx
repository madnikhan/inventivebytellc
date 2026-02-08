import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "../components/LayoutWrapper";
import GoogleAdsConversion from "../components/analytics/GoogleAdsConversion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://inventivebytellc.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "InventiveByte LLC",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/inventivebyte-logo.png` },
      description: "InventiveByte LLC builds, launches, and scales SaaS platforms and digital brands from Montana, USA. Services include SaaS development, web and mobile apps, analytics and dashboards, e-commerce and marketplaces, recruitment and HR tools, and consulting. Based in Kalispell, Montana; works with startups and enterprises worldwide.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1001 S. Main St. STE 600",
        addressLocality: "Kalispell",
        addressRegion: "MT",
        postalCode: "59901",
        addressCountry: "US",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "info@inventivebytellc.com",
        contactType: "customer service",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "InventiveByte LLC",
      description: "SaaS & Digital Brands from Montana, USA.",
      publisher: { "@id": `${siteUrl}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/contact?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Service",
      "name": "SaaS Development",
      "description": "End-to-end SaaS platforms: authentication, billing, dashboards, and scalable infrastructure.",
      "provider": { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Service",
      "name": "Web & Mobile Apps",
      "description": "Responsive web apps and native or cross-platform mobile apps built with modern stacks.",
      "provider": { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Service",
      "name": "Analytics & Dashboards",
      "description": "Real-time data visualization, custom reports, and business intelligence tools.",
      "provider": { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Service",
      "name": "E-Commerce & Marketplaces",
      "description": "Online stores and marketplaces with payments, inventory, and buyer/seller experience.",
      "provider": { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Service",
      "name": "Recruitment & HR Tools",
      "description": "Applicant tracking, candidate pipelines, and HR platforms for hiring and people operations.",
      "provider": { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Service",
      "name": "Consulting & Strategy",
      "description": "Technical audits, product strategy, and roadmap planning to align build with business goals.",
      "provider": { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: "InventiveByte LLC | SaaS & Digital Brands from Montana",
  description:
    "InventiveByte LLC builds, launches, and scales SaaS platforms and digital brands from Montana, USA.",
  icons: {
    icon: "/fav.png",
    shortcut: "/fav.png",
    apple: "/fav.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "InventiveByte LLC",
    title: "InventiveByte LLC | SaaS & Digital Brands from Montana",
    description:
      "InventiveByte LLC builds, launches, and scales SaaS platforms and digital brands from Montana, USA.",
    images: [
      {
        url: `${siteUrl}/inventivebyte-logo2.png`,
        width: 1200,
        height: 630,
        alt: "Inventive Byte - Innovation Meets Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InventiveByte LLC | SaaS & Digital Brands from Montana",
    description:
      "InventiveByte LLC builds, launches, and scales SaaS platforms and digital brands from Montana, USA.",
    images: [`${siteUrl}/inventivebyte-logo2.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="skip-to-content"
        >
          Skip to main content
        </a>
        <GoogleAdsConversion />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
