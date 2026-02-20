import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marriage Visa Stages — Non-Immigrant O (Marriage)",
  description:
    "Choose your stage in the Thai marriage visa process. Apply abroad, convert in Thailand, or extend your 1-year stay.",
};

const stages = [
  {
    stage: 1,
    title: "Stage 1 - Apply Abroad",
    description:
      "Apply for a Non-Immigrant O visa at a Thai embassy or consulate in your home country, or a neighboring country, such as Laos or Vietnam.",
    available: true,
    href: "/visa/marriage/stages/stage-1",
  },
  {
    stage: 2,
    title: "Stage 2 - Change Visa in Thailand",
    description:
      "Convert to a Non-Immigrant O based on marriage at your local immigration office.",
    available: true,
    href: "/visa/marriage/stages/stage-2",
  },
  {
    stage: 3,
    title: "Stage 3 - 1 Year Extension",
    description:
      "Extend your Non-Immigrant O visa for one year based on marriage to a Thai national. Full Checklist included.",
    available: true,
    href: "/visa/marriage",
  },
];

const postExtensionStages = [
  {
    stage: 4,
    title: "Stage 4 - 90-Day Reporting",
    description: "Report your address to immigration every 90 days while on a long-stay visa.",
    href: "/guides/90-day-reporting",
  },
  {
    stage: 5,
    title: "Stage 5 - Re-Entry Permit",
    description: "Get a re-entry permit before leaving Thailand to keep your visa valid.",
    href: "/guides/re-entry-permit",
  },
];

export default function MarriageStagesPage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-4 pt-6 sm:px-5 sm:pt-8">
        <Card className="rounded-3xl border-0 bg-white shadow-sm">
          <CardContent className="p-6 sm:p-10">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-600 px-5 py-3 text-base font-medium text-white transition hover:bg-slate-700"
              >
                <ArrowLeft className="h-5 w-5" /> Back to Visa Selection
              </Link>
            </div>

            <div className="text-center">
              <div className="text-4xl">💑</div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
                Marriage Visa
              </h1>
              <p className="mt-2 text-lg text-slate-600">
                Non-Immigrant Type &quot;O&quot; based on Marriage to Thai National
              </p>
            </div>

            <div className="mt-6 grid gap-4">
              {stages.map((s) =>
                s.available ? (
                  <Link
                    key={s.stage}
                    href={s.href!}
                    className="group flex items-center gap-5 rounded-2xl border-2 border-pink-200 bg-pink-50 p-5 sm:p-6 transition hover:-translate-y-1 hover:shadow-md hover:border-pink-300"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-600 text-lg font-extrabold text-white">
                      {s.stage}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-lg font-extrabold text-slate-900">
                        {s.title}
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{s.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 text-pink-600 transition group-hover:translate-x-1" />
                  </Link>
                ) : (
                  <div
                    key={s.stage}
                    className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 opacity-60"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-300 text-lg font-extrabold text-white">
                      {s.stage}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-extrabold text-slate-900">
                          {s.title}
                        </span>
                        <span className="rounded-full bg-slate-200 px-3 py-0.5 text-xs font-semibold text-slate-500">
                          Coming soon
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{s.description}</p>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Post-extension stages */}
            <div className="mt-4 grid gap-4">
              {postExtensionStages.map((s) => (
                <Link
                  key={s.stage}
                  href={s.href}
                  className="group flex items-center gap-5 rounded-2xl border-2 border-pink-200 bg-pink-50 p-5 sm:p-6 transition hover:-translate-y-1 hover:shadow-md hover:border-pink-300"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-600 text-lg font-extrabold text-white">
                    {s.stage}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-lg font-extrabold text-slate-900">
                      {s.title}
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{s.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-pink-600 transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="py-6 text-center text-sm text-slate-500">
          Requirements can vary by immigration office — always confirm locally.
        </div>
      </div>
    </div>
  );
}
