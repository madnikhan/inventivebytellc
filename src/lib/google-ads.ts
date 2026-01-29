// Google Ads conversion tracking utilities

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: {
        send_to?: string;
        value?: number;
        currency?: string;
        transaction_id?: string;
      }
    ) => void;
    dataLayer?: unknown[];
  }
}

export type ConversionAction =
  | "schedule_appointment"
  | "information_form"
  | "request_quote"
  | "sign_up"
  | "request_contact";

export function trackConversion(action: ConversionAction, value?: number) {
  if (typeof window === "undefined") return;

  const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  if (!conversionId) {
    console.warn("Google Ads ID not configured");
    return;
  }

  const conversionLabels: Record<ConversionAction, string> = {
    schedule_appointment:
      process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_SCHEDULE || "",
    information_form:
      process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_INFO || "",
    request_quote:
      process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_QUOTE || "",
    sign_up: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_SIGNUP || "",
    request_contact: "",
  };

  const label = conversionLabels[action];
  if (!label) {
    console.warn(`No conversion label configured for action: ${action}`);
    return;
  }

  // Use gtag if available
  if (window.gtag) {
    window.gtag("event", "conversion", {
      send_to: `${conversionId}/${label}`,
      value: value || 0,
      currency: "USD",
    });
  }

  // Fallback to dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "conversion",
      send_to: `${conversionId}/${label}`,
      value: value || 0,
      currency: "USD",
    });
  }
}
