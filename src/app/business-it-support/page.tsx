import type { Metadata } from "next";
import ITServicePageTemplate from "@/components/it-services/ITServicePageTemplate";

export const metadata: Metadata = {
  title: "Business IT Support Services UK | Inventive Byte LLC",
  description:
    "Business IT support in the UK: office setup, network setup, system deployment, software deployment, and remote support. £60/hour or monthly packages.",
};

const servicesList = [
  "Office setup",
  "Network setup",
  "System deployment",
  "Software deployment",
  "Remote support",
];

export default function BusinessITSupportPage() {
  return (
    <ITServicePageTemplate
      title="Business IT Support Services UK"
      description="Reliable business IT support across the UK: office and network setup, system and software deployment, and ongoing remote support. Flexible hourly or monthly packages."
      metaTitle="Business IT Support Services UK | Inventive Byte LLC"
      metaDescription="Business IT support in the UK: office setup, network setup, system deployment, software deployment, and remote support."
      breadcrumbLabel="Business IT Support"
      breadcrumbHref="/business-it-support"
      servicesList={servicesList}
      pricingText="£60/hour or monthly packages — we'll tailor a plan to your business."
      heroCtaText="Book IT Service"
      heroCtaHref="/contact"
      defaultService="business-it-support"
      serviceSchemaName="Business IT Support"
      serviceSchemaDescription="Office and network setup, system and software deployment, remote support for businesses across the UK."
    />
  );
}
