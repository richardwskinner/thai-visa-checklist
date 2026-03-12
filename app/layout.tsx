import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import Script from "next/script";
import SiteHeader from "@/components/site-header";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://thaivisachecklist.com";
const SAFETYWING_URL =
  "https://explore.safetywing.com/Nomad-insurance-complete/?referenceID=26491026&utm_source=26491026&utm_medium=Ambassador";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Thai Visa Checklist - Free Document Checklists for Thailand Visas",
    template: "%s | Thai Visa Checklist",
  },
  description:
    "Free, comprehensive document checklists for Thai visa applications, along with practical guides and tools for Thailand. Marriage visa, retirement visa, and more.",
  keywords: [
    "Thailand visa checklist",
    "Thailand visa requirements",
    "Thailand immigration guides",
    "current Thailand time",
    "Thailand time now",
    "time in Thailand",
    "Thailand ICT time",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Thai Visa Checklist",
    title: "Thai Visa Checklist - Free Document Checklists for Thailand Visas",
    description:
      "Free Thailand visa checklists and practical tools, including current Thailand time (ICT).",
    images: [
      {
        url: "/thai-visa-checklist-logo-social.png",
        width: 1200,
        height: 630,
        alt: "Thai Visa Checklist - Free document checklists and visa tools for Thailand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thai Visa Checklist - Free Document Checklists for Thailand Visas",
    description:
      "Free Thailand visa checklists and practical guides.",
    images: ["/thai-visa-checklist-logo-social.png"],
  },
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Thai Visa Checklist",
  },
  other: {
    "msapplication-TileColor": "#2563eb",
    "msapplication-config": "/browserconfig.xml",
  },
};

function Footer() {
  return (
    <footer className="bg-[#eef3fb] pt-4">
      <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-5 sm:py-7">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="grid gap-8 md:grid-cols-[1.25fr_1fr_1fr_0.9fr]">
              <div className="text-center md:text-left md:pr-6 md:border-r md:border-slate-200">
                <Link href="/" className="inline-flex md:mx-0">
                  <Image
                    src="/logo-full.svg"
                    alt="Thai Visa Checklist"
                    width={260}
                    height={36}
                    className="h-auto w-[220px]"
                  />
                </Link>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate-600 md:mx-0">
                  Visa information and practical guides for Thailand.
                </p>
                <div className="mt-5 hidden flex-wrap items-center justify-center gap-4 md:flex md:justify-start">
                  <a
                    href="mailto:hello@thaivisachecklist.com"
                    className="text-sm font-semibold text-slate-700 hover:text-slate-900"
                  >
                    hello@thaivisachecklist.com
                  </a>
                  <a
                    href="https://instagram.com/thaivisachecklist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-slate-600"
                    aria-label="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">Tools</h3>
                <div className="mt-3 space-y-2">
                  <Link href="/tools" className="block text-sm font-medium text-slate-700 hover:text-slate-900">
                    Thailand Visa Calculators
                  </Link>
                  <Link
                    href="/guides/90-day-reporting"
                    className="block text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    90-Day Reporting Thailand
                  </Link>
                  <Link
                    href="/guides/do-i-need-a-visa-thailand"
                    className="block text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    Thailand Visa Eligibility
                  </Link>
                  <Link
                    href="/guides/overstay-thailand"
                    className="block text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    Overstay Checker Thailand
                  </Link>
                  <Link
                    href="/thailand-time"
                    className="block text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    Thailand Time ICT
                  </Link>
                </div>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">Resources</h3>
                <div className="mt-3 space-y-2">
                  <Link href="/forms" className="block text-sm font-medium text-slate-700 hover:text-slate-900">
                    Immigration Forms
                  </Link>
                  <Link href="/visa-news" className="block text-sm font-medium text-slate-700 hover:text-slate-900">
                    Thai Visa News
                  </Link>
                  <Link
                    href="/thailand-public-holidays-2026"
                    className="block text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    Thai Public Holidays
                  </Link>
                  <Link
                    href="/offical-goverment-links"
                    className="block text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    Government Links
                  </Link>
                  <a
                    href={SAFETYWING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    Health insurance
                  </a>
                </div>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">Legal</h3>
                <div className="mt-3 space-y-2">
                  <Link href="/disclaimer" className="block text-sm font-medium text-slate-700 hover:text-slate-900">
                    Disclaimer
                  </Link>
                  <Link
                    href="/privacy-policy"
                    className="block text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms-of-use"
                    className="block text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    Terms of Use
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:hidden">
              <a
                href="mailto:hello@thaivisachecklist.com"
                className="text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                hello@thaivisachecklist.com
              </a>
              <a
                href="https://instagram.com/thaivisachecklist"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-600"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-4 text-center">
              <p className="text-sm font-semibold text-slate-700">
                © {new Date().getFullYear()} Thai Visa Checklist. All rights reserved.
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Not affiliated with Thai Immigration or any government agency.
              </p>
              <div className="mt-3 flex justify-end">
                <Link
                  href="/games/immigration-dash"
                  aria-label="Secret link to Immigration Dash"
                  className="inline-flex opacity-45 transition-opacity hover:opacity-100 focus:opacity-100"
                >
                  <Image
                    src="/golden-stamp.png"
                    alt=""
                    width={56}
                    height={56}
                    className="h-9 w-9 rounded-full object-cover object-center sm:h-10 sm:w-10"
                  />
                  <span className="sr-only">Play Immigration Dash</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans" suppressHydrationWarning>
        <SiteHeader />

        {/* This controls the gap between top bar and page content */}
        <main className="pt-2">{children}</main>

        <Footer />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1ZS42RQ843"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1ZS42RQ843');
          `}
        </Script>

        {/* Google Translate website widget */}
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            window.googleTranslateElementInit = function () {
              if (!window.google || !window.google.translate) return;
              var el = document.getElementById('google_translate_element');
              if (!el || el.childElementCount > 0) return;
              new window.google.translate.TranslateElement(
                {
                  pageLanguage: 'en',
                  autoDisplay: false,
                  layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
                },
                'google_translate_element'
              );
            };
          `}
        </Script>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
