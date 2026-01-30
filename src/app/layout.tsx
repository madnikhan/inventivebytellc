import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GoogleAdsConversion from "../components/analytics/GoogleAdsConversion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.inventivebytellc.com";

export const metadata: Metadata = {
  title: "InventiveByte LLC | SaaS & Digital Brands from Montana",
  description:
    "InventiveByte LLC builds, launches, and scales SaaS platforms and digital brands from Montana, USA.",
  icons: {
    icon: "/inventivebyte-logo.png",
    shortcut: "/inventivebyte-logo.png",
    apple: "/inventivebyte-logo.png",
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
        url: `${siteUrl}/inventivebyte-logo.png`,
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
    images: [`${siteUrl}/inventivebyte-logo.png`],
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
        <GoogleAdsConversion />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
