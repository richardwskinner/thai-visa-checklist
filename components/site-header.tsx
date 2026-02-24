"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const TRANSLATE_LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "th", label: "Thai", flag: "🇹🇭" },
  { code: "zh-CN", label: "Chinese", flag: "🇨🇳" },
  { code: "ru", label: "Russian", flag: "🇷🇺" },
  { code: "hi", label: "Hindi", flag: "🇮🇳" },
  { code: "ar", label: "Arabic", flag: "🇸🇦" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "ja", label: "Japanese", flag: "🇯🇵" },
  { code: "ko", label: "Korean", flag: "🇰🇷" },
] as const;

function setGoogleTranslateCookie(languageCode: string) {
  if (typeof document === "undefined") return;
  if (languageCode === "en") {
    clearGoogleTranslateCookies();
    return;
  }
  document.cookie = `googtrans=/auto/${languageCode}; path=/`;
}

function clearGoogleTranslateCookies() {
  if (typeof document === "undefined") return;

  const hostname = window.location.hostname;
  const hostParts = hostname.split(".");
  const candidateDomains = new Set<string>([hostname, `.${hostname}`]);

  if (hostParts.length >= 2) {
    const rootDomain = hostParts.slice(-2).join(".");
    candidateDomains.add(rootDomain);
    candidateDomains.add(`.${rootDomain}`);
  }

  document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

  candidateDomains.forEach((domain) => {
    document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  });
}

function getCurrentGoogleTranslateCookie() {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/);
  return match?.[1] || "en";
}

export default function SiteHeader() {
  const pathname = usePathname();
  const showChecklists = pathname !== "/";
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    setSelectedLanguage(getCurrentGoogleTranslateCookie());
  }, []);

  function handleTranslateChange(nextLanguage: string) {
    setSelectedLanguage(nextLanguage);
    setGoogleTranslateCookie(nextLanguage);

    if (nextLanguage === "en") {
      // Google Translate often persists the translated state in cookies on mobile.
      // Clearing cookies and reloading is the most reliable way to return to English.
      window.location.reload();
      return;
    }

    const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (combo) {
      combo.value = nextLanguage;
      combo.dispatchEvent(new Event("change"));
      return;
    }

    window.location.reload();
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-5">
        <div className="py-3 sm:py-2">
          <div className="grid gap-2">
            <div className="relative flex items-center justify-center">
              <Link href="/" className="flex flex-col items-center">
                <Image
                  src="/logo-full.svg"
                  alt="Thai Visa Checklist"
                  width={295}
                  height={40}
                  priority
                />
              </Link>

              <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center sm:flex">
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleTranslateChange(e.target.value)}
                  className="h-8 rounded-md border border-slate-200 bg-white px-2 text-xs font-medium text-slate-700"
                  aria-label="Select website language"
                >
                  {TRANSLATE_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.label}
                    </option>
                  ))}
                </select>
              </div>
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

            <div className="flex items-center justify-center pt-1 text-xs text-slate-500 sm:hidden">
              <select
                value={selectedLanguage}
                onChange={(e) => handleTranslateChange(e.target.value)}
                className="h-8 rounded-md border border-slate-200 bg-white px-2 text-xs font-medium text-slate-700"
                aria-label="Select website language"
              >
                {TRANSLATE_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.label}
                  </option>
                ))}
              </select>

              <div id="google_translate_element" className="hidden" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
