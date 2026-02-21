import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ExternalLink, Plane } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thailand Digital Arrival Card (TDAC) - What You Need to Know",
  description:
    "Everything you need to know about the Thailand Digital Arrival Card (TDAC). Required for all non-Thai nationals entering Thailand from 1 May 2025.",
};

export default function TDACPage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-5">
        {/* Back button */}
        <div className="pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-600 px-5 py-3 text-base font-medium text-white transition hover:bg-slate-700"
          >
            <ArrowLeft className="h-5 w-5" /> Back to Home
          </Link>
        </div>

        {/* Main content */}
        <Card className="mt-6 rounded-3xl border-0 bg-white shadow-sm">
          <CardContent className="p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100">
                <Plane className="h-6 w-6 text-sky-600" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Thailand Digital Arrival Card (TDAC)
              </h1>
            </div>

            <div className="mt-6 rounded-2xl bg-sky-50 border border-sky-200 p-6">
              <p className="text-lg font-semibold text-sky-900">
                Since 1 May 2025, all non-Thai nationals must complete the TDAC online before entering Thailand - by air, land, or sea. No more paper arrival cards (TM.6).
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <a
                href="https://tdac.immigration.go.th"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl bg-sky-600 px-8 py-4 text-lg font-bold text-white shadow-md transition hover:bg-sky-700 hover:-translate-y-1 hover:shadow-lg"
              >
                Fill Out Your TDAC <ExternalLink className="h-5 w-5" />
              </a>
            </div>

            {/* Key info */}
            <div className="mt-10 space-y-8">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">When to submit</h2>
                <p className="mt-2 text-slate-700">
                  Submit your TDAC up to 3 days (72 hours) before your arrival in Thailand, including the day of arrival. You must submit a new one every time you enter Thailand - it is single-use only.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Who needs to submit</h2>
                <p className="mt-2 text-slate-700">
                  All non-Thai nationals, regardless of visa type, nationality, or mode of transport. This includes tourists, visa holders, and residents returning from abroad.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">What you need to fill it out</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "Passport details",
                    "Personal information",
                    "Travel details (flight number, port of entry)",
                    "Accommodation address in Thailand",
                    "Health declaration",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 rounded-full bg-sky-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">After you submit</h2>
                <p className="mt-2 text-slate-700">
                  You will receive your TDAC with a QR code via email. You can show it on your phone at immigration - no need to print it. You can also update your information at any time before arrival, except for your name, nationality, and date of birth.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Group submissions</h2>
                <p className="mt-2 text-slate-700">
                  You can submit for family members or a group - up to 10 people per submission. The accommodation and travel details can be copied from the first traveler.
                </p>
              </div>
            </div>

            {/* Important notes */}
            <div className="mt-10 rounded-lg bg-amber-50 border-l-4 border-amber-500 p-5">
              <div className="font-bold text-amber-900">Good to know</div>
              <div className="mt-2 text-sm text-amber-900 space-y-1">
                <p>All details must be entered in English.</p>
                <p>The TDAC is not a visa, it's a digital arrival card - you still need the correct visa or exemption eligibility.</p>
                <p>It takes about 3–5 minutes to fill out if you have your info ready.</p>
              </div>
            </div>

            {/* Second CTA */}
            <div className="mt-8">
              <a
                href="https://tdac.immigration.go.th"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl bg-sky-600 px-8 py-4 text-lg font-bold text-white shadow-md transition hover:bg-sky-700 hover:-translate-y-1 hover:shadow-lg"
              >
                Fill Out Your TDAC <ExternalLink className="h-5 w-5" />
              </a>
              <p className="mt-3 text-sm text-slate-500">
                Official Thai Immigration Bureau website - tdac.immigration.go.th
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="py-8 text-xs text-slate-500">
          <Separator className="mb-4" />
          Information based on the official Thai Immigration Bureau guidelines. Always check the official site for the latest updates.
        </div>
      </div>
    </div>
  );
}