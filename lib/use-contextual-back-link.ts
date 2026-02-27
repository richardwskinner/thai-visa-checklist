"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const GUIDE_LABELS: Record<string, string> = {
  "/guides/marriage-visa-thailand": "Back to Marriage Visa Guide",
  "/guides/re-entry-permit": "Back to Re-Entry Permit Guide",
  "/guides/tourist-extension": "Back to Tourist Extension Guide",
  "/guides/90-day-reporting": "Back to 90-Day Reporting Guide",
  "/guides/tm30": "Back to TM.30 Guide",
  "/guides/do-i-need-a-visa-thailand": "Back to Visa Checker Guide",
};

function isSafeInternalPath(path: string) {
  return path.startsWith("/") && !path.startsWith("//");
}

export function useContextualBackLink(defaultHref: string, defaultLabel: string) {
  const searchParams = useSearchParams();
  const [referrerBack, setReferrerBack] = useState<{ href: string; label: string } | null>(null);

  const returnTo = searchParams.get("returnTo");
  const returnLabel = searchParams.get("returnLabel");

  useEffect(() => {
    if (typeof document === "undefined") return;

    try {
      if (!document.referrer) return;
      const refUrl = new URL(document.referrer);
      if (refUrl.origin !== window.location.origin) return;
      if (!refUrl.pathname.startsWith("/guides/")) return;

      setReferrerBack({
        href: `${refUrl.pathname}${refUrl.search}`,
        label: GUIDE_LABELS[refUrl.pathname] ?? "Back to Guide",
      });
    } catch {
      // ignore invalid referrer URL
    }
  }, []);

  if (returnTo && isSafeInternalPath(returnTo)) {
    return { href: returnTo, label: returnLabel || "Back to Guide" };
  }

  if (referrerBack) return referrerBack;
  return { href: defaultHref, label: defaultLabel };
}

