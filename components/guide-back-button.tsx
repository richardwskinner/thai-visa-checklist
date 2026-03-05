"use client";

import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

function isSafeInternalPath(path: string) {
  return path.startsWith("/") && !path.startsWith("//");
}

function BackButtonLink({ href, label }: { href: string; label: string }) {
  return (
    <Button
      asChild
      className="h-12 rounded-2xl bg-slate-600 px-5 text-base font-medium text-white hover:bg-slate-700"
    >
      <Link href={href} data-guide-back-button="true">
        <ArrowLeft className="h-5 w-5" /> {label}
      </Link>
    </Button>
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
