import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

{/* Top Navigation */}
<div className="pt-6">
  <div className="flex items-center justify-end">
    <Link
      href="/about"
      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900"
    >
      About
    </Link>
  </div>
</div>

        {/* Hero */}
        <div className="pt-10 pb-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900">
            Thai Visa Checklist
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Get organized for your visa application with comprehensive checklists
          </p>
        </div>

        <Card className="rounded-3xl border-0 shadow-sm">
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
                className="group relative w-full rounded-2xl bg-sky-600 px-7 py-7 text-left text-white shadow-md transition hover:shadow-lg hover:-translate-y-2"
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
              Free to use &bull; More checklists coming soon
            </div>
          </CardContent>
        </Card>
        <div className="py-10 text-xs text-slate-500">
          <Separator className="mb-4" />
          Note: Requirements can vary by immigration office. Always confirm locally.
        </div>
      </div>
    </div>
  );
}