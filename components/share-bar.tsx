"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Link2, Share2 } from "lucide-react";
import { createRoot } from "react-dom/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SITE_URL = "https://thaivisachecklist.com";
const SHARE_BUTTON_CLASS =
  "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50";

function toAbsoluteUrl(pathname: string) {
  return `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

function useShareData() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);

  const queryString = searchParams?.toString();
  const pageUrl = useMemo(() => {
    const base = toAbsoluteUrl(pathname || "/");
    return queryString ? `${base}?${queryString}` : base;
  }, [pathname, queryString]);

  const pageTitle = "Thai Visa Checklist";
  const encodedUrl = useMemo(() => encodeURIComponent(pageUrl), [pageUrl]);
  const encodedText = encodeURIComponent(pageTitle);

  const links = [
    {
      label: "WhatsApp",
      shortLabel: "WA",
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      className: "bg-emerald-600 hover:bg-emerald-700",
    },
    {
      label: "Facebook",
      shortLabel: "FB",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      className: "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50",
    },
    {
      label: "X",
      shortLabel: "X",
      href: `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      className: "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50",
    },
  ] as const;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  async function nativeShare() {
    if (typeof navigator === "undefined" || !navigator.share) return;
    try {
      await navigator.share({ title: pageTitle, url: pageUrl });
    } catch {
      // user canceled
    }
  }

  return { copied, links, copyLink, nativeShare };
}

function ShareNetworkDesktopIcon({ label }: { label: string }) {
  if (label === "Facebook") {
    return (
      <Image
        src="/resource-logos/facebook-logo.svg"
        alt="Facebook"
        width={14}
        height={14}
        className="h-3.5 w-3.5"
      />
    );
  }
  if (label === "X") {
    return (
      <Image src="/resource-logos/X-logo.svg" alt="X" width={14} height={14} className="h-3.5 w-3.5" />
    );
  }
  return <>{label}</>;
}

function FallbackShareMenu({
  links,
  copied,
  copyLink,
}: {
  links: ReadonlyArray<{
    label: string;
    shortLabel: string;
    href: string;
    className: string;
  }>;
  copied: boolean;
  copyLink: () => Promise<void>;
}) {
  return (
    <DropdownMenuContent align="end" className="w-48">
      {links.map((item) => (
        <DropdownMenuItem
          key={item.label}
          onSelect={(event) => {
            event.preventDefault();
            window.open(item.href, "_blank", "noopener,noreferrer");
          }}
        >
          {item.label}
        </DropdownMenuItem>
      ))}
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onSelect={(event) => {
          event.preventDefault();
          void copyLink();
        }}
      >
        {copied ? "Copied" : "Copy Link"}
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

export default function ShareBar() {
  const { copied, links, copyLink, nativeShare } = useShareData();
  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  return (
    <div className="print:hidden">
      <div className="mx-auto mt-8 w-full max-w-5xl px-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-slate-700">Share</p>

            <div className="flex flex-wrap items-center gap-2">
              {canNativeShare ? (
                <Button
                  type="button"
                  onClick={() => void nativeShare()}
                  className={`h-8 rounded-full px-3 text-xs font-semibold ${SHARE_BUTTON_CLASS}`}
                >
                  <Share2 className="h-3.5 w-3.5" /> Share
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      className={`h-8 rounded-full px-3 text-xs font-semibold ${SHARE_BUTTON_CLASS}`}
                    >
                      <Share2 className="h-3.5 w-3.5" /> Share
                    </Button>
                  </DropdownMenuTrigger>
                  <FallbackShareMenu
                    links={links}
                    copied={copied}
                    copyLink={copyLink}
                  />
                </DropdownMenu>
              )}
              {links.map((item) => (
                <Button
                  key={item.label}
                  asChild
                  className={`h-8 rounded-full px-3 text-xs font-semibold text-white transition ${item.className}`}
                >
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    <span className="sm:hidden">{item.label}</span>
                    <span className="hidden sm:inline-flex sm:items-center sm:justify-center">
                      <ShareNetworkDesktopIcon label={item.label} />
                    </span>
                  </a>
                </Button>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => void copyLink()}
                className="h-8 rounded-full border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Link2 className="h-3.5 w-3.5" /> {copied ? "Copied" : "Copy link"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShareInline() {
  const { copied, links, copyLink, nativeShare } = useShareData();
  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  return (
    <div className="print:hidden">
      <div className="hidden flex-wrap items-center justify-end gap-2 sm:flex">
        {canNativeShare ? (
          <Button
            type="button"
            onClick={() => void nativeShare()}
            className={`h-8 rounded-full px-3 text-xs font-semibold ${SHARE_BUTTON_CLASS}`}
          >
            <Share2 className="h-3.5 w-3.5" /> Share
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                className={`h-8 rounded-full px-3 text-xs font-semibold ${SHARE_BUTTON_CLASS}`}
              >
                <Share2 className="h-3.5 w-3.5" /> Share
              </Button>
            </DropdownMenuTrigger>
            <FallbackShareMenu links={links} copied={copied} copyLink={copyLink} />
          </DropdownMenu>
        )}
        {links.filter((item) => item.shortLabel !== "WA").map((item) => (
          <Button
            key={item.label}
            asChild
            className={`h-8 rounded-full px-3 text-xs font-semibold text-white transition ${item.className}`}
          >
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              <span className="inline-flex items-center justify-center">
                <ShareNetworkDesktopIcon label={item.label} />
              </span>
            </a>
          </Button>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => void copyLink()}
          className="h-8 rounded-full border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          <Link2 className="h-3.5 w-3.5" /> {copied ? "Copied" : "Copy"}
        </Button>
      </div>

      {canNativeShare ? (
        <Button
          type="button"
          onClick={() => void nativeShare()}
          className={`h-12 rounded-2xl px-4 text-base font-medium ${SHARE_BUTTON_CLASS} sm:hidden`}
        >
          <Share2 className="h-5 w-5" /> Share
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              className={`h-12 rounded-2xl px-4 text-base font-medium ${SHARE_BUTTON_CLASS} sm:hidden`}
            >
              <Share2 className="h-5 w-5" /> Share
            </Button>
          </DropdownMenuTrigger>
          <FallbackShareMenu links={links} copied={copied} copyLink={copyLink} />
        </DropdownMenu>
      )}
    </div>
  );
}

export function ShareInFrame({ scopeId }: { scopeId: string }) {
  const pathname = usePathname();
  const isGuidesIndex = pathname === "/guides" || pathname === "/guides/";
  const isGuidesScope = scopeId === "guides-share-scope";

  useEffect(() => {
    if (isGuidesIndex) return;
    if (typeof document === "undefined") return;
    const scope = document.getElementById(scopeId);
    if (!scope) return;

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const mount = document.createElement("div");

    if (isGuidesScope) {
      const backButton = scope.querySelector(
        '[data-guide-back-button="true"]'
      ) as HTMLElement | null;
      const topActions = backButton?.parentElement as HTMLElement | null;
      if (!backButton || !topActions) return;

      topActions.classList.remove("flex-col", "items-start", "justify-between");
      if (isDesktop) {
        topActions.classList.add("flex", "items-center", "justify-between", "gap-3");
        mount.className = "print:hidden";
      } else {
        topActions.classList.add("flex", "items-center", "gap-2");
        backButton.classList.add("flex-1", "justify-center");
        mount.className = "shrink-0 print:hidden";
      }

      topActions.appendChild(mount);
    } else {
      const card = scope.querySelector(".rounded-3xl") as HTMLElement | null;
      if (!card) return;

      if (isDesktop && window.getComputedStyle(card).position === "static") {
        card.style.position = "relative";
      }

      if (isDesktop) {
        mount.className = "absolute right-4 top-4 z-20 print:hidden";
        card.appendChild(mount);
      } else {
        mount.className = "mb-3 print:hidden";
        card.prepend(mount);
      }
    }

    const root = createRoot(mount);
    root.render(<ShareInline />);

    return () => {
      // Avoid unmounting synchronously during an active React render cycle.
      queueMicrotask(() => {
        root.unmount();
        mount.remove();
      });
    };
  }, [scopeId, pathname, isGuidesIndex, isGuidesScope]);

  return null;
}
