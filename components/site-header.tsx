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
          <div className="grid gap-2">
            <div className="flex items-center justify-center">
              <Link href="/" className="flex flex-col items-center">
                <Image
                  src="/logo-full.svg"
                  alt="Thai Visa Checklist"
                  width={295}
                  height={40}
                  priority
                />
              </Link>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center sm:gap-6">
              {showChecklists && (
                <Link
                  href="/"
                  className="whitespace-nowrap text-sm font-semibold leading-tight text-slate-600 hover:text-slate-900"
                >
                  Checklists
                </Link>
              )}
              <Link
                href="/visa-news"
                className="whitespace-nowrap text-sm font-semibold leading-tight text-slate-600 hover:text-slate-900"
              >
                Visa News
              </Link>
              <Link
                href="/guides"
                className="whitespace-nowrap text-sm font-semibold leading-tight text-slate-600 hover:text-slate-900"
              >
                Guides
              </Link>
              <Link
                href="/about"
                className="whitespace-nowrap text-sm font-semibold leading-tight text-slate-600 hover:text-slate-900"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="whitespace-nowrap text-sm font-semibold leading-tight text-slate-600 hover:text-slate-900"
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
