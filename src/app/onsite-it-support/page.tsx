import type { Metadata } from "next";
import ITServicePageTemplate from "@/components/it-services/ITServicePageTemplate";

export const metadata: Metadata = {
  title: "Onsite IT Support UK | Inventive Byte LLC",
  description:
    "Onsite IT support across the UK: on-site visits, setup, and troubleshooting. £60/hour or packages. We come to you.",
};

const servicesList = [
  "On-site visits",
  "Setup and configuration",
  "Troubleshooting at your location",
];

export default function OnsiteITSupportPage() {
  return (
    <ITServicePageTemplate
      title="Onsite IT Support UK"
      description="We come to you. Onsite IT support across the UK for setup, troubleshooting, and general IT — £60/hour or flexible packages."
      metaTitle="Onsite IT Support UK | Inventive Byte LLC"
      metaDescription="Onsite IT support across the UK: on-site visits, setup, and troubleshooting. £60/hour or packages."
      breadcrumbLabel="Onsite IT Support"
      breadcrumbHref="/onsite-it-support"
      servicesList={servicesList}
      pricingText="£60/hour or packages — we'll agree scope and cost before the visit."
      heroCtaText="Book IT Service"
      heroCtaHref="/contact"
      defaultService="onsite-it-support"
      serviceSchemaName="Onsite IT Support"
      serviceSchemaDescription="On-site IT visits, setup, and troubleshooting across the UK."
    />
  );
}
