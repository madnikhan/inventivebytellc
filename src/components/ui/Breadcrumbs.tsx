import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  /** Full URL of current page for BreadcrumbList schema (last item) */
  currentPageUrl?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.inventivebytellc.com";

export default function Breadcrumbs({ items, className = "", currentPageUrl }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : currentPageUrl && index === items.length - 1 ? { item: currentPageUrl } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center gap-1 text-sm ${className}`}>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="w-4 h-4 text-gray-500 shrink-0" aria-hidden />}
            {item.href ? (
              <Link
                href={item.href}
                className="text-gray-400 hover:text-[#00D9FF] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-300 font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
