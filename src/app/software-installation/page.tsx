import type { Metadata } from "next";
import ITServicePageTemplate from "@/components/it-services/ITServicePageTemplate";

export const metadata: Metadata = {
  title: "Windows & Linux Installation Service UK | Inventive Byte LLC",
  description:
    "Windows 10/11 and Linux installation in the UK: Ubuntu, Debian, Kali, driver installation, software setup, and developer environment configuration. From £40.",
};

const servicesList = [
  "Windows 10 / 11 installation",
  "Linux (Ubuntu, Debian, Kali)",
  "Driver installation",
  "Software installation",
  "Developer environment setup",
];

export default function SoftwareInstallationPage() {
  return (
    <ITServicePageTemplate
      title="Windows & Linux Installation Service UK"
      description="We install and configure Windows 10/11, Linux distros, drivers, and software across the UK. From clean OS installs to full developer environments — done right."
      metaTitle="Windows & Linux Installation Service UK | Inventive Byte LLC"
      metaDescription="Windows 10/11 and Linux installation in the UK: Ubuntu, Debian, Kali, driver installation, software setup, and developer environment configuration."
      breadcrumbLabel="Software Installation"
      breadcrumbHref="/software-installation"
      servicesList={servicesList}
      pricingText="£40 – £120 depending on scope (OS only, drivers, or full software stack)."
      heroCtaText="Book IT Service"
      heroCtaHref="/contact"
      defaultService="software-installation"
      serviceSchemaName="Software Installation"
      serviceSchemaDescription="Windows and Linux installation, driver and software setup, developer environment configuration across the UK."
    />
  );
}
