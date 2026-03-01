import type { Metadata } from "next";
import ITServicePageTemplate from "@/components/it-services/ITServicePageTemplate";

export const metadata: Metadata = {
  title: "SSD Upgrade Service UK | Inventive Byte LLC",
  description:
    "SSD upgrade service in the UK: SSD fitting, data migration, and OS clone. From £60. Fast, reliable upgrades for desktops and laptops.",
};

const servicesList = [
  "SSD fitting and installation",
  "Data migration to new drive",
  "OS clone to SSD",
];

export default function SSDUpgradePage() {
  return (
    <ITServicePageTemplate
      title="SSD Upgrade Service UK"
      description="Upgrade to an SSD across the UK. We fit the drive, migrate your data, or clone your OS so you keep your files and settings — from £60."
      metaTitle="SSD Upgrade Service UK | Inventive Byte LLC"
      metaDescription="SSD upgrade service in the UK: SSD fitting, data migration, and OS clone. From £60."
      breadcrumbLabel="SSD Upgrade"
      breadcrumbHref="/ssd-upgrade"
      servicesList={servicesList}
      pricingText="From £60 depending on migration scope (data copy vs full OS clone)."
      heroCtaText="Book IT Service"
      heroCtaHref="/contact"
      defaultService="ssd-upgrade"
      serviceSchemaName="SSD Upgrade"
      serviceSchemaDescription="SSD fitting, data migration, and OS clone for desktops and laptops across the UK."
    />
  );
}
