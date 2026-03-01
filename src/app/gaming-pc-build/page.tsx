import type { Metadata } from "next";
import ITServicePageTemplate from "@/components/it-services/ITServicePageTemplate";

export const metadata: Metadata = {
  title: "Custom Gaming PC Builder UK | Inventive Byte LLC",
  description:
    "Custom gaming PC and workstation builds in the UK: assembly, cooling, GPU installation, and hardware configuration. Build service from £100 – £300.",
};

const servicesList = [
  "Gaming PC assembly",
  "Workstation builds",
  "Custom hardware configuration",
  "Cooling installation",
  "GPU installation",
];

export default function GamingPCBuildPage() {
  return (
    <ITServicePageTemplate
      title="Custom Gaming PC Builder UK"
      description="We build custom gaming PCs and workstations across the UK. From parts selection to assembly, cooling, and GPU installation — get a rig built to your spec."
      metaTitle="Custom Gaming PC Builder UK | Inventive Byte LLC"
      metaDescription="Custom gaming PC and workstation builds in the UK: assembly, cooling, GPU installation, and hardware configuration."
      breadcrumbLabel="Custom Gaming PCs"
      breadcrumbHref="/gaming-pc-build"
      servicesList={servicesList}
      pricingText="£100 – £300 build service depending on complexity. Parts quoted separately."
      heroCtaText="Book IT Service"
      heroCtaHref="/contact"
      defaultService="gaming-pc-build"
      serviceSchemaName="Custom Gaming PC Build"
      serviceSchemaDescription="Gaming PC and workstation assembly, custom hardware configuration, cooling and GPU installation across the UK."
    />
  );
}
