"use client";

import type { MouseEventHandler } from "react";
import { useEffect, useMemo, useState } from "react";
import { Eye, ExternalLink, X } from "lucide-react";

export default function ExampleLink({
  href,
  label = "Example",
  className = "",
  onClick,
}: {
  href: string;
  label?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  const [open, setOpen] = useState(false);

  const isPdf = useMemo(() => href.toLowerCase().endsWith(".pdf"), [href]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          onClick?.(e);
          if (e.defaultPrevented) return;
          setOpen(true);
        }}
        className={`inline-flex items-center gap-1.5 rounded-full border border-slate-300/80 bg-gradient-to-b from-white to-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition hover:border-slate-400 hover:from-slate-50 hover:to-slate-100 hover:text-slate-900 print:hidden ${className}`}
      >
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-100 text-slate-600">
          <Eye className="h-3 w-3" />
        </span>
        {label}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${label} preview`}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
              <div className="min-w-0 text-sm font-semibold text-slate-800">{label}</div>
              <div className="flex items-center gap-2">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  Open full size <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  aria-label="Close example"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="max-h-[75vh] overflow-auto bg-slate-50 p-2 sm:p-3">
              {isPdf ? (
                <iframe
                  src={href}
                  title={`${label} preview`}
                  className="h-[70vh] w-full rounded-lg border border-slate-200 bg-white"
                />
              ) : (
                <img
                  src={href}
                  alt={label}
                  className="mx-auto h-auto max-h-[70vh] w-auto max-w-full rounded-lg border border-slate-200 bg-white object-contain"
                  loading="eager"
                  decoding="sync"
                />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
