import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";
import GuideBackButton from "@/components/guide-back-button";

export const metadata: Metadata = {
  title: "Thailand Marriage Visa Guide - Non-Immigrant O and 1-Year Extension",
  description:
    "In-depth Thailand marriage visa guide: getting a 90-day Non-Immigrant O, opening a Thai bank account, seasoning funds, applying for a 1-year extension, and understanding the consideration period.",
};

export default function MarriageVisaGuidePage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-5">
        <div className="pt-8">
          <GuideBackButton />
        </div>

        <Card className="mt-6 rounded-3xl border-0 bg-white shadow-sm">
          <CardContent className="p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Thailand Marriage Visa Guide
              </h1>
            </div>

            <div className="mt-6 rounded-2xl border border-pink-200 bg-pink-50 p-6">
              <p className="text-lg font-semibold text-pink-900">
                This guide outlines the typical process for obtaining a 1-year extension of stay in Thailand based on
                marriage, starting with a 90-day Non-Immigrant O visa.
              </p>
              <p className="mt-3 text-sm text-pink-900/80">
                Requirements and procedures vary by immigration office. Always confirm locally before applying.
              </p>
            </div>

            <div className="mt-10 space-y-8">
              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Step 1. Start with a 90-day Non-Immigrant O</h2>
                <p className="mt-2 text-slate-700">
                  Before applying for a 1-year extension of stay, you must hold valid Non-Immigrant O status based on
                  marriage.
                </p>
                <p className="mt-3 text-slate-700">You can obtain this in one of two ways:</p>
                <p className="mt-3 text-slate-700">
                  <span className="font-semibold text-slate-900">Option 1 - Apply outside Thailand (Recommended):</span>{" "}
                  Apply for a 90-day Non-Immigrant O visa at a Thai Embassy or Consulate in your home country or a
                  neighboring country. This is generally the most straightforward route.
                </p>
                <p className="mt-3 text-slate-700">
                  <span className="font-semibold text-slate-900">Option 2 - Convert inside Thailand (If eligible):</span>{" "}
                  Enter Thailand on a visa-exempt entry or tourist visa and apply to convert to Non-Immigrant O at
                  your local immigration office.
                </p>
                <p className="mt-3 text-slate-700">
                  Some offices may require you to demonstrate that you can meet the financial requirements before
                  approving the conversion.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={{
                      pathname: "/visa/marriage/stages/apply-outside-thailand",
                      query: {
                        returnTo: "/guides/marriage-visa-thailand",
                        returnLabel: "Back to Marriage Visa Guide",
                      },
                    }}
                    className="rounded-xl bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700"
                  >
                    Checklist: Apply outside Thailand
                  </Link>
                  <Link
                    href={{
                      pathname: "/visa/marriage/stages/convert-in-thailand",
                      query: {
                        returnTo: "/guides/marriage-visa-thailand",
                        returnLabel: "Back to Marriage Visa Guide",
                      },
                    }}
                    className="rounded-xl bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-800 hover:bg-pink-200"
                  >
                    Checklist: Convert in Thailand
                  </Link>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Step 2. Meet the Financial Requirements</h2>
                <p className="mt-2 text-slate-700">For a marriage-based extension, you must meet one of the following:</p>
                <ul className="mt-2 list-disc space-y-2 pl-6 text-slate-700">
                  <li>400,000 THB deposited in a Thai bank account</li>
                  <li>40,000 THB monthly income (supported by appropriate documentation)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Step 3. Season Your Funds</h2>
                <p className="mt-2 text-slate-700">If using the 400,000 THB deposit method:</p>
                <ul className="mt-2 list-disc space-y-2 pl-6 text-slate-700">
                  <li>For a first extension, funds must be deposited at least 2 months before applying.</li>
                  <li>For renewals, many offices require 3 months.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Step 4. Apply for the 1-Year Extension</h2>
                <p className="mt-2 text-slate-700">
                  Apply at your local immigration office before your current permitted stay expires. Many offices allow
                  applications up to 30 days before expiry.
                </p>
                <div className="mt-4">
                  <Link
                    href={{
                      pathname: "/visa/marriage/extension-of-stay",
                      query: {
                        returnTo: "/guides/marriage-visa-thailand",
                        returnLabel: "Back to Marriage Visa Guide",
                      },
                    }}
                    className="rounded-xl bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700"
                  >
                    Checklist: Extension

                  </Link>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Step 5. Under Consideration Period</h2>
                <p className="mt-2 text-slate-700">
                  Marriage extensions are commonly placed under consideration for 21-30 days.
                </p>
                <p className="mt-3 text-slate-700">
                  You will receive a stamp with a return date for the final result. During this period, immigration
                  may:
                </p>
                <ul className="mt-2 list-disc space-y-2 pl-6 text-slate-700">
                  <li>Review documents</li>
                  <li>Request additional evidence</li>
                  <li>Conduct a home visit</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">After approval: keep your status active</h2>
                <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
                  <li>
                    File 90-day reporting while staying in Thailand:
                    {" "}
                    <Link
                      href={{
                        pathname: "/guides/90-day-reporting",
                        query: {
                          returnTo: "/guides/marriage-visa-thailand",
                          returnLabel: "Back to Marriage Visa Guide",
                        },
                      }}
                      className="font-semibold text-pink-700 underline underline-offset-2"
                    >
                      90-day reporting guide
                    </Link>
                  </li>
                  <li>
                    Get a re-entry permit before leaving Thailand:
                    {" "}
                    <Link
                      href={{
                        pathname: "/guides/re-entry-permit",
                        query: {
                          returnTo: "/guides/marriage-visa-thailand",
                          returnLabel: "Back to Marriage Visa Guide",
                        },
                      }}
                      className="font-semibold text-pink-700 underline underline-offset-2"
                    >
                      re-entry permit guide
                    </Link>
                  </li>
                  <li>
                    Keep TM.30 updated when residence details change:
                    {" "}
                    <Link
                      href={{
                        pathname: "/guides/tm30",
                        query: {
                          returnTo: "/guides/marriage-visa-thailand",
                          returnLabel: "Back to Marriage Visa Guide",
                        },
                      }}
                      className="font-semibold text-pink-700 underline underline-offset-2"
                    >
                      TM.30 guide
                    </Link>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Use the full checklist flow</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Link
                    href={{
                      pathname: "/visa/marriage/stages/apply-outside-thailand",
                      query: {
                        returnTo: "/guides/marriage-visa-thailand",
                        returnLabel: "Back to Marriage Visa Guide",
                      },
                    }}
                    className="rounded-2xl border border-pink-200 bg-pink-50 p-4 text-sm font-semibold text-pink-900 hover:bg-pink-100"
                  >
                    Stage 1
                    <div className="mt-1 font-normal text-pink-800">Apply outside Thailand</div>
                  </Link>
                  <Link
                    href={{
                      pathname: "/visa/marriage/extension-of-stay",
                      query: {
                        returnTo: "/guides/marriage-visa-thailand",
                        returnLabel: "Back to Marriage Visa Guide",
                      },
                    }}
                    className="rounded-2xl border border-pink-200 bg-pink-50 p-4 text-sm font-semibold text-pink-900 hover:bg-pink-100"
                  >
                    Stage 2
                    <div className="mt-1 font-normal text-pink-800">1-year extension checklist</div>
                  </Link>
                  <Link
                    href={{
                      pathname: "/guides/90-day-reporting",
                      query: {
                        returnTo: "/guides/marriage-visa-thailand",
                        returnLabel: "Back to Marriage Visa Guide",
                      },
                    }}
                    className="rounded-2xl border border-pink-200 bg-pink-50 p-4 text-sm font-semibold text-pink-900 hover:bg-pink-100"
                  >
                    Stage 3
                    <div className="mt-1 font-normal text-pink-800">90-day report</div>
                  </Link>
                  <Link
                    href={{
                      pathname: "/guides/re-entry-permit",
                      query: {
                        returnTo: "/guides/marriage-visa-thailand",
                        returnLabel: "Back to Marriage Visa Guide",
                      },
                    }}
                    className="rounded-2xl border border-pink-200 bg-pink-50 p-4 text-sm font-semibold text-pink-900 hover:bg-pink-100"
                  >
                    Stage 4
                    <div className="mt-1 font-normal text-pink-800">Re-entry permit</div>
                  </Link>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>

        <div className="py-8 text-xs text-slate-500">
          <Separator className="mb-4" />
          General guidance only. Final approval is at the discretion of Thai Immigration and requirements can vary by
          office.
        </div>
      </div>
    </div>
  );
}
