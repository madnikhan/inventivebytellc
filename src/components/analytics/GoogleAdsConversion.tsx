"use client";

import { useEffect } from "react";
import Script from "next/script";
import { trackConversion, ConversionAction } from "@/lib/google-ads";

interface GoogleAdsConversionProps {
  action?: ConversionAction;
  value?: number;
}

export default function GoogleAdsConversion({
  action,
  value,
}: GoogleAdsConversionProps) {
  const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  useEffect(() => {
    if (action && conversionId) {
      trackConversion(action, value);
    }
  }, [action, value, conversionId]);

  if (!conversionId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${conversionId}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${conversionId}');
        `}
      </Script>
    </>
  );
}
