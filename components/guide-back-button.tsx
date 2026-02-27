"use client";

import { useMemo } from "react";
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

  const returnTo = searchParams.get("returnTo");
  const returnLabel = searchParams.get("returnLabel");

  const referrerHref = useMemo(() => {
    if (typeof document === "undefined") return null;
    try {
      if (!document.referrer) return null;
      const refUrl = new URL(document.referrer);
      if (refUrl.origin !== window.location.origin) return null;
      if (!refUrl.pathname.startsWith(referrerPathPrefix)) return null;
      if (refUrl.pathname === pathname) return null;
      return `${refUrl.pathname}${refUrl.search}`;
    } catch {
      return null;
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
