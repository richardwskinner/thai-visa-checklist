"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

function isSafeInternalPath(path: string) {
  return path.startsWith("/") && !path.startsWith("//");
}

export default function GuideBackButton({
  fallbackHref = "/guides",
  fallbackLabel = "Back to Guides",
  referrerPathPrefix = "/guides/",
}: {
  fallbackHref?: string;
  fallbackLabel?: string;
  referrerPathPrefix?: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [referrerHref, setReferrerHref] = useState<string | null>(null);

  const returnTo = searchParams.get("returnTo");
  const returnLabel = searchParams.get("returnLabel");

  useEffect(() => {
    if (typeof document === "undefined") return;

    try {
      if (!document.referrer) return;
      const refUrl = new URL(document.referrer);
      if (refUrl.origin !== window.location.origin) return;
      if (!refUrl.pathname.startsWith(referrerPathPrefix)) return;
      if (refUrl.pathname === pathname) return;

      setReferrerHref(`${refUrl.pathname}${refUrl.search}`);
    } catch {
      // ignore invalid referrer URL
    }
  }, [pathname, referrerPathPrefix]);

  const href =
    returnTo && isSafeInternalPath(returnTo)
      ? returnTo
      : referrerHref || fallbackHref;
  const label =
    returnTo && isSafeInternalPath(returnTo)
      ? returnLabel || "Back to Guide"
      : referrerHref
        ? "Back to Previous Guide"
        : fallbackLabel;

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-2xl bg-slate-600 px-5 py-3 text-base font-medium text-white transition hover:bg-slate-700"
    >
      <ArrowLeft className="h-5 w-5" /> {label}
    </Link>
  );
}
