import type { Metadata } from "next";
import ITServicePageTemplate from "@/components/it-services/ITServicePageTemplate";

export const metadata: Metadata = {
  title: "Laptop Repair Services UK | Inventive Byte LLC",
  description:
    "Laptop repair across the UK: screen, keyboard, battery repair, diagnostics, and general laptop servicing. From £40.",
};

const servicesList = [
  "Screen repair and replacement",
  "Keyboard repair",
  "Battery replacement",
  "Hardware diagnostics",
  "General laptop servicing",
];

export default function LaptopRepairPage() {
  return (
    <ITServicePageTemplate
      title="Laptop Repair Services UK"
      description="Expert laptop repair across the UK. We fix screens, keyboards, batteries, and run full diagnostics — with transparent pricing and a quick turnaround."
      metaTitle="Laptop Repair Services UK | Inventive Byte LLC"
      metaDescription="Laptop repair across the UK: screen, keyboard, battery repair, diagnostics, and general laptop servicing."
      breadcrumbLabel="Laptop Repair"
      breadcrumbHref="/laptop-repair"
      servicesList={servicesList}
      pricingText="From £40 – £120 depending on the repair. We'll quote before starting."
      heroCtaText="Book IT Service"
      heroCtaHref="/contact"
      defaultService="laptop-repair"
      serviceSchemaName="Laptop Repair"
      serviceSchemaDescription="Laptop screen, keyboard, battery repair and diagnostics across the UK."
    />
  );
}
