"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();
  const showChecklists = pathname !== "/";

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-5">
        <div className="py-3 sm:py-2">
          <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-0">
            <div className="hidden sm:block">
              {showChecklists && (
                <Link
                  href="/"
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900"
                >
                  Checklists
                </Link>
              )}
            </div>

            <Link href="/" className="flex flex-col items-center">
              <Image
                src="/logo-full.svg"
                alt="Thai Visa Checklist"
                width={295}
                height={40}
                priority
              />
            </Link>

            <nav className="flex items-center justify-center gap-4 sm:justify-end sm:gap-6">
              {showChecklists && (
                <Link
                  href="/"
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900 sm:hidden"
                >
                  Checklists
                </Link>
              )}
              <Link
                href="/visa-news"
                className="text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                Visa News
              </Link>
              <Link
                href="/guides"
                className="text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                Guides
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
