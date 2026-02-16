import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
    default: "Thai Visa Checklist — Free Document Checklists for Thailand Visas",
    template: "%s | Thai Visa Checklist",
  },
  description:
    "Free, comprehensive document checklists for Thai visa applications. Marriage visa, retirement visa, business visa and more. Never miss a document again, and hopefully no second trips to immigration.",
};

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur">
      <div className="mx-auto w-full max-w-5xl px-5">
        {/* 3-col grid keeps title truly centered while nav sits right */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center py-2">
          <div />

          <Link href="/" className="text-center">
            <div className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Thai Visa Checklist
            </div>
            <div className="mt-1 text-sm font-medium text-slate-500">
              Free checklists for Thai visa applications
            </div>
          </Link>

          <nav className="flex items-center justify-end gap-3 sm:gap-6">
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
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />

        {/* This controls the gap between top bar and page content */}
        <main className="pt-2">{children}</main>

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
