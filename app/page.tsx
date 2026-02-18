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
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50">
      <div className="mx-auto w-full max-w-5xl px-3 pt-6 sm:pt-8">
        <Card className="rounded-3xl border border-slate-200/80 bg-white/95 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
          <CardContent className="p-8 sm:p-10">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Which visa are you applying for?
              </h2>
              <p className="mt-2 text-base text-slate-600">
                100% Free checklists for Thai Immigration.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {VISAS.map((v) =>
                v.disabled ? (
                  <div
                    key={v.slug}
                    className={`group relative w-full rounded-2xl ${v.bg} px-7 py-7 text-left text-white shadow-sm opacity-90 ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:shadow-md`}
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
                    className={`group relative w-full rounded-2xl ${v.bg} px-7 py-7 text-left text-white shadow-sm ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:shadow-md`}
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
                className="group relative rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-7 py-10 text-center text-white shadow-sm ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:shadow-md sm:col-span-2"
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
              Requirements can vary by immigration office - always confirm locally.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
