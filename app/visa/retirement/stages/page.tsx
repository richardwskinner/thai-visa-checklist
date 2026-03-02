import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retirement Visa Stages - Non-Immigrant O (Retirement)",
  description:
    "Choose your stage in the Thai retirement visa process. Start with Stage 1 or Stage 2 (not both), then continue to extension and ongoing requirements.",
};

const stages = [
  {
    stage: 1,
    title: "Apply outside Thailand (Recommended)",
    description:
      "Apply for a 90-day Non-Immigrant O visa at a Thai embassy or consulate in your home country, or neighboring country, such as Laos or Vietnam.",
    available: true,
    href: "/visa/retirement/stages/apply-outside-thailand",
  },
  {
    stage: 2,
    title: "Convert Visa in Thailand to Non-O",
    description:
      "If you entered on a tourist visa or visa exemption, convert to a Non-Immigrant O (retirement) at immigration.",
    available: true,
    href: "/visa/retirement/stages/convert-in-thailand",
  },
  {
    stage: 3,
    title: "1 Year Extension",
    description:
      "Extend your Non-Immigrant O visa for one year based on retirement (age 50+). Full checklist included.",
    available: true,
    href: {
      pathname: "/visa/retirement/extension-of-stay",
      query: {
        returnTo: "/visa/retirement/stages",
        returnLabel: "Back to Retirement Stages",
      },
    },
  },
];

const postExtensionStages = [
  {
    stage: 4,
    title: "90-Day Reporting",
    description: "Report your address to immigration every 90 days while on a long-stay visa.",
    href: {
      pathname: "/guides/90-day-reporting",
      query: {
        returnTo: "/visa/retirement/stages",
        returnLabel: "Back to Retirement Stages",
      },
    },
  },
  {
    stage: 5,
    title: "Re-Entry Permit",
    description: "Get a re-entry permit before leaving Thailand to keep your visa valid.",
    href: {
      pathname: "/guides/re-entry-permit",
      query: {
        returnTo: "/visa/retirement/stages",
        returnLabel: "Back to Retirement Stages",
      },
    },
  },
];

export default function RetirementStagesPage() {
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

            <div className="mt-5 text-center sm:mt-6">
              <div className="text-4xl">🏖️</div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
                Retirement Visa Checklists
              </h1>
              <p className="mt-2 text-lg text-slate-600">
                Non-Immigrant &quot;O&quot; based on Retirement (50+)
              </p>
            </div>

            <div className="mt-6">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Choose Your Starting Point
              </div>
              <div className="mt-3 grid gap-4">
                {stages.slice(0, 2).map((s) =>
                s.available ? (
                  <Link
                    key={s.stage}
                    href={s.href!}
                    className="group flex items-center gap-5 rounded-2xl border-2 border-blue-200 bg-blue-50 p-5 sm:p-6 transition hover:-translate-y-1 hover:shadow-md hover:border-blue-300"
                  >
                    <div className="flex h-12 w-3 shrink-0 rounded-full bg-blue-800" />
                    <div className="flex-1 min-w-0">
                      <div className="text-lg font-extrabold text-slate-900">
                        {s.title}
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{s.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 text-blue-700 transition group-hover:translate-x-1" />
                  </Link>
                ) : (
                  <div
                    key={s.stage}
                    className="flex items-center gap-4 sm:gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 opacity-60"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-300 text-lg font-extrabold text-white">
                      {s.stage}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="min-w-0 text-lg font-extrabold text-slate-900">
                          {s.title}
                        </span>
                        <span className="shrink-0 rounded-full bg-slate-200 px-3 py-0.5 text-xs font-semibold text-slate-500">
                          Coming soon
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{s.description}</p>
                    </div>
                  </div>
                )
                )}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Then Continue
              </div>
            </div>

            <div className="mt-3 grid gap-4">
              {stages.slice(2).map((s) => (
                <Link
                  key={s.stage}
                  href={s.href!}
                  className="group flex items-center gap-5 rounded-2xl border-2 border-blue-200 bg-blue-50 p-5 sm:p-6 transition hover:-translate-y-1 hover:shadow-md hover:border-blue-300"
                >
                  <div className="flex h-12 w-3 shrink-0 rounded-full bg-blue-800" />
                  <div className="flex-1 min-w-0">
                    <div className="text-lg font-extrabold text-slate-900">{s.title}</div>
                    <p className="mt-1 text-sm text-slate-600">{s.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-blue-700 transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>

            <div className="mt-4 grid gap-4">
              {postExtensionStages.map((s) => (
                <Link
                  key={s.stage}
                  href={s.href}
                  className="group flex items-center gap-5 rounded-2xl border-2 border-blue-200 bg-blue-50 p-5 sm:p-6 transition hover:-translate-y-1 hover:shadow-md hover:border-blue-300"
                >
                  <div className="flex h-12 w-3 shrink-0 rounded-full bg-blue-800" />
                  <div className="flex-1 min-w-0">
                    <div className="text-lg font-extrabold text-slate-900">
                      {s.title}
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{s.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-blue-700 transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="py-6 text-center text-sm text-slate-500">
          Requirements can vary by immigration office - always confirm locally.
        </div>
      </div>
    </div>
  );
}
