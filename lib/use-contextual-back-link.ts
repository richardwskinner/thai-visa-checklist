"use client";

import { useMemo } from "react";

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
  const queryBack = useMemo(() => {
    if (typeof window === "undefined") {
      return { returnTo: null as string | null, returnLabel: null as string | null };
    }
    const params = new URLSearchParams(window.location.search);
    return {
      returnTo: params.get("returnTo"),
      returnLabel: params.get("returnLabel"),
    };
  }, []);

  const { returnTo, returnLabel } = queryBack;

  const referrerBack = useMemo(() => {
    if (typeof document === "undefined") return null;
    try {
      if (!document.referrer) return null;
      const refUrl = new URL(document.referrer);
      if (refUrl.origin !== window.location.origin) return null;
      if (!refUrl.pathname.startsWith("/guides/")) return null;
      return {
        href: `${refUrl.pathname}${refUrl.search}`,
        label: GUIDE_LABELS[refUrl.pathname] ?? "Back to Guide",
      };
    } catch {
      return null;
    }
  }, []);

  if (returnTo && isSafeInternalPath(returnTo)) {
    return { href: returnTo, label: returnLabel || "Back to Guide" };
  }

  if (referrerBack) return referrerBack;
  return { href: defaultHref, label: defaultLabel };
}
