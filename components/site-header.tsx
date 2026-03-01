"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown, Clock3 } from "lucide-react";

const TRANSLATE_LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "th", label: "ไทย", flag: "🇹🇭" },
  { code: "zh-CN", label: "中文", flag: "🇨🇳" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
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

function formatThailandTime(timestamp: number) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Bangkok",
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date(timestamp));

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${get("weekday")} ${get("day")} ${get("month")}, ${get("hour")}:${get("minute")} ICT`;
}

export default function SiteHeader() {
  const [selectedLanguage, setSelectedLanguage] = useState(() => getCurrentGoogleTranslateCookie());
  const [thailandNow, setThailandNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setThailandNow(Date.now());
    }, 30000);

    return () => window.clearInterval(timer);
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
          <div className="relative grid gap-2">
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

            <div className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center sm:flex">
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleTranslateChange(e.target.value)}
                  className="notranslate h-8 appearance-none rounded-md border border-slate-200 bg-white pl-2 pr-8 text-xs font-medium text-slate-700"
                  aria-label="Select website language"
                  translate="no"
                >
                  {TRANSLATE_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
              </div>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center sm:gap-6">
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

            <div
              className="absolute left-2 top-1/2 hidden -translate-y-1/2 flex-col items-start text-xs text-slate-500 sm:flex"
              aria-live="polite"
            >
              <span className="flex items-center gap-1.5 font-semibold">
                <Clock3 className="h-3.5 w-3.5" />
                Thailand Time
              </span>
              <span className="font-medium">{formatThailandTime(thailandNow)}</span>
            </div>

            <div className="flex items-center justify-center pt-1 text-xs text-slate-500 sm:hidden">
              <div className="mr-3 text-center">
                <div className="flex items-center justify-center gap-1.5 font-semibold">
                  <Clock3 className="h-3.5 w-3.5" />
                  Thailand Time
                </div>
                <div className="font-medium">{formatThailandTime(thailandNow)}</div>
              </div>
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleTranslateChange(e.target.value)}
                  className="notranslate h-8 appearance-none rounded-md border border-slate-200 bg-white pl-2 pr-8 text-xs font-medium text-slate-700"
                  aria-label="Select website language"
                  translate="no"
                >
                  {TRANSLATE_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
              </div>

              <div id="google_translate_element" className="hidden" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
