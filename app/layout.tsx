import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Script from "next/script";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: {
    default: "Thai Visa Checklist - Free Document Checklists for Thailand Visas",
    template: "%s | Thai Visa Checklist",
  },
  description:
    "Free, comprehensive document checklists for Thai visa applications. Marriage visa, retirement visa, business visa and more. Never miss a document again, and hopefully no second trips to immigration.",
};

function Footer() {
  return (
    <footer className="bg-[#eef3fb] pt-4">
      <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-5xl px-4 py-5 sm:px-5">
          <div className="flex flex-col gap-4">
            <div className="grid w-full max-w-[680px] grid-cols-2 gap-x-4 gap-y-2 self-center text-center sm:gap-x-5 md:grid-cols-3">
              <Link
                href="/thailand-public-holidays-2026"
                className="whitespace-nowrap text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                Public Holidays
              </Link>
              <Link
                href="/forms"
                className="whitespace-nowrap text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                Immigration Forms
              </Link>
              <Link
                href="/tools"
                className="whitespace-nowrap text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                Thailand Visa Calculators
              </Link>
              <Link
                href="/disclaimer"
                className="whitespace-nowrap text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                Disclaimer
              </Link>
              <Link
                href="/privacy-policy"
                className="whitespace-nowrap text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-use"
                className="whitespace-nowrap text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                Terms of Use
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
              <p className="text-sm font-semibold text-slate-600">
                © {new Date().getFullYear()} Thai Visa Checklist
              </p>
              <div className="flex items-center gap-5">
                <a
                  href="mailto:hello@thaivisachecklist.com"
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900"
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
