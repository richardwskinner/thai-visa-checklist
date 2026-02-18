import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ExternalLink, PlaneTakeoff } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Re-Entry Permit in Thailand — How to protect Your Visa When You Travel outside of the country",
  description:
    "Everything you need to know about the Thailand re-entry permit. Single vs multiple, how to get one at the airport or immigration office, costs, and what happens if you forget.",
};

const TM8_URL = "https://www.immigration.go.th/wp-content/uploads/2022/10/5.%E0%B8%84%E0%B8%B3%E0%B8%82%E0%B8%AD%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%8D%E0%B8%B2%E0%B8%95%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%81%E0%B8%A5%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A1%E0%B8%B2%E0%B9%83%E0%B8%99%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%AD%E0%B8%B2%E0%B8%93%E0%B8%B2%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%A3%E0%B8%AD%E0%B8%B5%E0%B8%81-%E0%B8%95%E0%B8%A1.8.pdf";

export default function ReEntryPermitPage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-5">
        <div className="pt-8">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-600 px-5 py-3 text-base font-medium text-white transition hover:bg-slate-700"
          >
            <ArrowLeft className="h-5 w-5" /> Back to Guides
          </Link>
        </div>

        <Card className="mt-6 rounded-3xl border-0 bg-white shadow-sm">
          <CardContent className="p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
                <PlaneTakeoff className="h-6 w-6 text-orange-600" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Re-Entry Permit in Thailand
              </h1>
            </div>

            <div className="mt-6 rounded-2xl bg-orange-50 border border-orange-200 p-6">
              <p className="text-lg font-semibold text-orange-900">
                If you leave Thailand without a re-entry permit, your visa is automatically cancelled the moment you depart. This applies to most single-entry and extended visas including retirement, marriage, work, and education visas.
              </p>
            </div>

            <div className="mt-10 space-y-8">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">What is a re-entry permit</h2>
                <p className="mt-2 text-slate-700">
                  A re-entry permit is an official stamp in your passport from Thai Immigration that allows you to leave Thailand and return without losing your current visa. It does not extend your visa or give you extra time - it simply preserves your existing visa status while you are abroad.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Who needs one</h2>
                <p className="mt-2 text-slate-700">
                  Anyone on a single-entry visa or extension of stay who plans to leave Thailand and return. This includes holders of Non-Immigrant O (retirement, marriage), Non-Immigrant B (work), education visas, and most extensions of stay. If you have a multiple-entry visa, you do not need a re-entry permit. Note that when you return to Thailand, your{" "}
                  <Link
                    href="/guides/90-day-reporting"
                    className="font-semibold text-orange-700 underline underline-offset-2"
                  >
                    90-day reporting
                  </Link>{" "}
                  count resets from your new entry date.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Two types</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-orange-200 bg-orange-50/30 p-5">
                    <h3 className="font-bold text-slate-900">Single re-entry</h3>
                    <p className="mt-1 text-slate-700">One trip out and back. Valid until your visa expires.</p>
                    <p className="mt-2 text-2xl font-extrabold text-slate-900">1,000 THB</p>
                  </div>
                  <div className="rounded-2xl border border-orange-200 bg-orange-50/30 p-5">
                    <h3 className="font-bold text-slate-900">Multiple re-entry</h3>
                    <p className="mt-1 text-slate-700">Unlimited trips out and back. Valid until your visa expires.</p>
                    <p className="mt-2 text-2xl font-extrabold text-slate-900">3,800 THB</p>
                  </div>
                </div>
                
              </div>

              <div>
  <h2 className="text-xl font-extrabold text-slate-900">What you need</h2>

  <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
    <li>Passport</li>
    <li>1x photo (4×6 cm)</li>
    <li>
      Photocopies of your passport photo page, visa page, and latest entry stamp
      <span className="text-slate-500"> (not always necessary)</span>
    </li>
    <li>Fee in cash</li>
    <li>
      TM.8 form —{" "}
      <a
        href={TM8_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 font-medium text-orange-700 underline underline-offset-2"
      >
        Download PDF <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </li>
  </ul>
</div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Where to get one</h2>
                <div className="mt-4 space-y-4">
                  <div className="rounded-2xl border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-900">At the airport (same day as departure)</h3>
                    <p className="mt-1 text-slate-700">
                      All major international airports — Suvarnabhumi, Don Mueang, Chiang Mai, Phuket, and Hat Yai - have re-entry permit counters. They are located after passport control in the departure area. Arrive early in case there is any delay.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-900">At any immigration office (in advance)</h3>
                    <p className="mt-1 text-slate-700">
                      You can apply days or weeks before your trip at your local immigration office. Bring a photo and all documents. Processing takes 10 minutes to an hour depending on the queue.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">When you return to Thailand</h2>
                <p className="mt-2 text-slate-700">
                  Make sure the immigration officer sees your re-entry permit stamp when you arrive back. Open your passport to the re-entry page. If they miss it, you may get a tourist stamp instead and your visa will be lost. When filling out the{" "}
                  <Link
                    href="/tdac"
                    className="font-semibold text-orange-700 underline underline-offset-2"
                  >
                    TDAC
                  </Link>
                  , enter your re-entry permit number in the visa number field.
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-lg bg-amber-50 border-l-4 border-amber-500 p-5">
              <div className="font-bold text-amber-900">Good to know</div>
              <div className="mt-2 text-sm text-amber-900 space-y-1">
                <p>You must get the re-entry permit before you leave Thailand - you cannot get one from abroad.</p>
                <p>The re-entry permit expires when your visa expires, not separately.</p>
                <p>A re-entry permit does not extend your stay, it only preserves it.</p>
                <p>After returning, your landlord must file a new{" "}
                  <Link
                    href="/guides/tm30"
                    className="font-semibold text-orange-700 underline underline-offset-2"
                  >
                    TM.30
                  </Link>{" "}
                  within 24 hours.</p>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="https://immigration.go.th/citizen_manual/guid_en5.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-orange-700 underline underline-offset-2"
              >
                Official Re-Entry Permit Guide (Thai Immigration PDF) <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="py-8 text-xs text-slate-500">
          <Separator className="mb-4" />
          Information based on official Thai Immigration Bureau guidelines. Always check with your local immigration office for the latest requirements.
        </div>
      </div>
    </div>
  );
}