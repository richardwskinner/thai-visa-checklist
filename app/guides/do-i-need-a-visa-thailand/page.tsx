import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Globe2 } from "lucide-react";
import ThailandVisaNeedChecker from "@/components/thailand-visa-need-checker";
import { VISA_ELIGIBILITY_SOURCES } from "@/lib/data/thai-visa-eligibility";

export const metadata: Metadata = {
  title: "Do I Need a Visa for Thailand?",
  description:
    "Check if you need a visa for Thailand based on passport nationality, entry method, and planned stay using official Thai government source lists.",
};

export default function DoINeedAVisaThailandPage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-5">
        <div className="pt-6 sm:pt-8">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-600 px-5 py-3 text-base font-medium text-white transition hover:bg-slate-700"
          >
            <ArrowLeft className="h-5 w-5" /> Back to Guides
          </Link>
        </div>

        <Card className="mt-4 rounded-3xl border-0 bg-white shadow-sm sm:mt-6">
          <CardContent className="p-4 sm:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100">
                <Globe2 className="h-6 w-6 text-blue-700" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Do I Need a Visa for Thailand?
              </h1>
            </div>

            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6">
              <p className="text-base font-semibold text-blue-900 sm:text-lg">
                Enter your travel dates and nationality to see if you&apos;re visa-exempt, or if you need a visa.
              </p>
              <p className="mt-3 text-sm text-blue-900/80">
                This tool is intended to help people travelling to Thailand. Visa rules, permitted stay lengths, and
                entry conditions are set by Thai immigration authorities and may change at any time.
              </p>
            </div>

            <div className="mt-8 sm:mt-10">
              <ThailandVisaNeedChecker />
            </div>

            <div className="mt-10 space-y-8">
              <section>
                <h2 className="text-xl font-extrabold text-slate-900">How this tool works</h2>
                <div className="mt-3 space-y-3 text-slate-700">
                  <p>
                    The checker compares your nationality against official-source visa exemption and Visa on Arrival
                    lists (
                    <a
                      href={VISA_ELIGIBILITY_SOURCES.klEmbassyVisaHub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-700 underline underline-offset-2"
                    >
                      Royal Thai Embassy
                    </a>
                    ), then checks whether your planned stay fits the allowed period.
                  </p>
                  <p>
                    It does not replace embassy advice or immigration officer discretion at entry.
                  </p>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>

        <div className="py-8 text-xs text-slate-500">
          <Separator className="mb-4" />
          Visa rules can change. Always verify with the official Thai e-Visa website or a Thai embassy/consulate before
          travel.
        </div>
      </div>
    </div>
  );
}
