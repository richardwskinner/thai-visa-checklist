"use client";

import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";

function isSafeInternalPath(path: string) {
  return path.startsWith("/") && !path.startsWith("//");
}

function BackButtonLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      data-guide-back-button="true"
      className="inline-flex items-center gap-2 rounded-2xl bg-slate-600 px-5 py-3 text-base font-medium text-white transition hover:bg-slate-700"
    >
      <ArrowLeft className="h-5 w-5" /> {label}
    </Link>
  );
}

function GuideBackButtonInner({
  fallbackHref = "/guides",
  fallbackLabel = "Back to Guides",
}: {
  fallbackHref?: string;
  fallbackLabel?: string;
}) {
  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo");
  const returnLabel = searchParams.get("returnLabel");

  const href =
    returnTo && isSafeInternalPath(returnTo)
      ? returnTo
      : fallbackHref;
  const label =
    returnTo && isSafeInternalPath(returnTo)
      ? returnLabel || "Back to Guide"
      : fallbackLabel;

  return <BackButtonLink href={href} label={label} />;
}

export default function GuideBackButton(props: {
  fallbackHref?: string;
  fallbackLabel?: string;
}) {
  return (
    <Suspense fallback={<BackButtonLink href={props.fallbackHref ?? "/guides"} label={props.fallbackLabel ?? "Back to Guides"} />}>
      <GuideBackButtonInner {...props} />
    </Suspense>
  );
}
