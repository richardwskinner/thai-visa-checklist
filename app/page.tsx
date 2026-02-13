import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { VISAS } from "@/lib/data/visas";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thai Visa Checklist Helper — Free Document Checklists for Thailand Visas",
  description:
    "Free, comprehensive document checklists for Thai visa applications. Marriage visa, retirement visa, business visa and more. Never miss a document again.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-5">
        {/* Hero */}
        <div className="pt-12 pb-2 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900">
            Thai Visa Checklist
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Get organized for your visa application with comprehensive checklists
          </p>
        </div>

        <Card className="mt-2 rounded-3xl border-0 bg-white shadow-sm">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-slate-900">
                Which visa are you applying for?
              </h2>
            </div>

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {VISAS.map((v) =>
                v.disabled ? (
                  <div
                    key={v.slug}
                    className={`group relative w-full rounded-2xl ${v.bg} px-7 py-7 text-left text-white shadow-md opacity-90 transition hover:-translate-y-1 hover:shadow-lg`}
                  >
                    <span className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                      Coming soon
                    </span>
                    <div className="text-3xl font-extrabold tracking-tight">
                      <span className="mr-3">{v.emoji}</span>
                      {v.title}
                    </div>
                    <div className="mt-2 text-lg font-semibold text-white/85">
                      {v.subtitle}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={v.slug}
                    href={v.href}
                    className={`group relative w-full rounded-2xl ${v.bg} px-7 py-7 text-left text-white shadow-md transition hover:shadow-lg hover:-translate-y-2`}
                  >
                    <div className="text-3xl font-extrabold tracking-tight">
                      <span className="mr-3">{v.emoji}</span>
                      {v.title}
                    </div>
                    <div className="mt-2 text-lg font-semibold text-white/85">
                      {v.subtitle}
                    </div>
                  </Link>
                )
              )}

              <Link
                href="/tdac"
                className="group relative sm:col-span-2 rounded-2xl bg-sky-600 px-7 py-10 text-center text-white shadow-md transition hover:shadow-lg hover:-translate-y-2"
              >
                <div className="text-3xl font-extrabold tracking-tight">
                  <span className="mr-3">✈️</span>
                  TDAC
                </div>
                <div className="mt-2 text-lg font-semibold text-white/85">
                  Thailand Digital Arrival Card
                </div>
              </Link>
            </div>

            <div className="mt-7 text-center text-sm text-slate-500">
              Free to use • Requirements can vary by immigration office — always confirm locally.
            </div>

            <div className="mt-5 text-center">
              <Link
                href="/about"
                className="text-sm font-medium text-slate-600 underline underline-offset-4 hover:text-slate-900"
              >
                About
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
