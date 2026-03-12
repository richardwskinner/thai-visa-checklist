"use client";

import { useEffect, useRef } from "react";

const SAFETYWING_SCRIPT_ID = "safetywing-price-widget-script";

type SafetyWingWidgetProps = {
  affiliateId: string;
  scale?: string;
  mobileScale?: string;
  minHeightClassName?: string;
};

export default function SafetyWingWidget({
  affiliateId,
  scale = "1.0",
  mobileScale,
  minHeightClassName = "min-h-[260px]",
}: SafetyWingWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const effectiveScale =
      typeof window !== "undefined" && window.innerWidth < 640 ? mobileScale ?? scale : scale;

    const widget = document.createElement("div");
    widget.className = `safetywing-price-widget ${minHeightClassName}`;
    widget.dataset.safetywingaffiliateid = affiliateId;
    widget.dataset.scale = effectiveScale;
    container.appendChild(widget);

    scriptTimeoutRef.current = window.setTimeout(() => {
      document.getElementById(SAFETYWING_SCRIPT_ID)?.remove();

      const script = document.createElement("script");
      script.id = SAFETYWING_SCRIPT_ID;
      script.src = "https://storage.googleapis.com/safetywing-static/widget/safetywing-price-widget.js";
      script.async = true;
      document.body.appendChild(script);
    }, 0);

    return () => {
      if (scriptTimeoutRef.current !== null) {
        window.clearTimeout(scriptTimeoutRef.current);
      }
      container.innerHTML = "";
      document.getElementById(SAFETYWING_SCRIPT_ID)?.remove();
    };
  }, [affiliateId, minHeightClassName, mobileScale, scale]);

  return <div ref={containerRef} className="flex w-full justify-center overflow-hidden" />;
}
