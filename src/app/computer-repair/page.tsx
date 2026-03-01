import type { Metadata } from "next";
import ITServicePageTemplate from "@/components/it-services/ITServicePageTemplate";

export const metadata: Metadata = {
  title: "Computer Repair Services UK | Inventive Byte LLC",
  description:
    "Professional computer repair in the UK: PC repair, hardware diagnostics, slow PC optimization, blue screen repair, hardware replacement, and system troubleshooting. Transparent pricing from £40.",
};

const servicesList = [
  "PC repair and general diagnostics",
  "Hardware diagnostics",
  "Slow PC optimization",
  "Blue screen repair",
  "Hardware replacement",
  "System troubleshooting",
];

export default function ComputerRepairPage() {
  return (
    <ITServicePageTemplate
      title="Computer Repair Services UK"
      description="Expert desktop and PC repair across the UK. We diagnose and fix hardware issues, optimize performance, resolve blue screens, and replace components — with clear pricing and quick turnaround."
      metaTitle="Computer Repair Services UK | Inventive Byte LLC"
      metaDescription="Professional computer repair in the UK: PC repair, hardware diagnostics, slow PC optimization, blue screen repair, hardware replacement, and system troubleshooting."
      breadcrumbLabel="Computer Repair"
      breadcrumbHref="/computer-repair"
      servicesList={servicesList}
      pricingText="From £40 – £120 depending on the job. We'll give you a clear quote before starting."
      heroCtaText="Book IT Service"
      heroCtaHref="/contact"
      defaultService="computer-repair"
      serviceSchemaName="Computer Repair"
      serviceSchemaDescription="PC repair, hardware diagnostics, slow PC optimization, blue screen repair, hardware replacement, and system troubleshooting across the UK."
    />
  );
}
