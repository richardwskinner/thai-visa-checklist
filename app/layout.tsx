import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import SiteHeader from "@/components/site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <footer className="border-t border-slate-200">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-5 py-5">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
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
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
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
      </body>
    </html>
  );
}
