"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Link2, Share2 } from "lucide-react";
import { createRoot } from "react-dom/client";

const SITE_URL = "https://thaivisachecklist.com";

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
      className: "bg-blue-700 hover:bg-blue-800",
    },
    {
      label: "X",
      shortLabel: "X",
      href: `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      className: "bg-slate-800 hover:bg-slate-900",
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

export default function ShareBar() {
  const { copied, links, copyLink, nativeShare } = useShareData();

  return (
    <div className="print:hidden">
      <div className="mx-auto mt-8 w-full max-w-5xl px-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-slate-700">Share</p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={nativeShare}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700"
              >
                <Share2 className="h-3.5 w-3.5" /> Share
              </button>
              {links.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-white transition ${item.className}`}
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Link2 className="h-3.5 w-3.5" /> {copied ? "Copied" : "Copy link"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShareInline() {
  const { copied, links, copyLink, nativeShare } = useShareData();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handlePrimaryShare = async () => {
    if (canNativeShare) {
      await nativeShare();
      return;
    }
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="print:hidden">
      <div className="hidden flex-wrap items-center justify-end gap-2 sm:flex">
        <button
          type="button"
          onClick={handlePrimaryShare}
          className="inline-flex items-center gap-1.5 rounded-full bg-slate-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700"
        >
          <Share2 className="h-3.5 w-3.5" /> Share
        </button>
        {links.filter((item) => item.shortLabel !== "WA").map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-white transition ${item.className}`}
          >
            {item.shortLabel}
          </a>
        ))}
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <Link2 className="h-3.5 w-3.5" /> {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div ref={menuRef} className="relative sm:hidden">
        <button
          type="button"
          onClick={handlePrimaryShare}
          className="inline-flex h-12 items-center gap-2 rounded-2xl bg-slate-600 px-4 text-base font-medium text-white transition hover:bg-slate-700"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
        >
          <Share2 className="h-5 w-5" /> Share
        </button>

        {!canNativeShare && menuOpen && (
          <div
            className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg"
            role="menu"
          >
            <a
              href={links[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              role="menuitem"
            >
              WhatsApp
            </a>
            <a
              href={links[1].href}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              role="menuitem"
            >
              Facebook
            </a>
            <a
              href={links[2].href}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              role="menuitem"
            >
              X
            </a>
            <button
              type="button"
              onClick={async () => {
                await copyLink();
                setMenuOpen(false);
              }}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100"
              role="menuitem"
            >
              Copy Link
            </button>
          </div>
        )}
      </div>
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
