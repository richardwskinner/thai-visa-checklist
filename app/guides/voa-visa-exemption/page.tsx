import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Globe } from "lucide-react";
import type { Metadata } from "next";
import GuideBackButton from "@/components/guide-back-button";

export const metadata: Metadata = {
  title: "Thailand Entry Options - Visa Exemption vs Visa on Arrival (VOA)",
  description:
    "Confused between Thailand visa exemption and visa on arrival? This guide explains the differences, who qualifies, typical stay length, fees, and what to check before you fly.",
  alternates: {
    canonical: "/guides/voa-visa-exemption",
  },
};

export default function ThailandEntryOptionsPage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-5">
        <div className="pt-8">
          <GuideBackButton />
        </div>

        <Card className="mt-6 rounded-3xl border-0 bg-white shadow-sm">
          <CardContent className="p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Visa Exemption vs Visa on Arrival (VOA)
              </h1>
            </div>

            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-6">
              <p className="text-lg font-semibold text-blue-900">
                Visa Exemption and Visa on Arrival (VOA) are not the same.
              </p>
              <p className="mt-2 text-sm text-blue-900/80">
                Visa Exemption allows eligible passport holders to enter Thailand without applying for a visa in
                advance and without paying a visa fee. Visa on Arrival (VOA) requires eligible travellers to apply for
                a short-term visa at the airport or border checkpoint upon arrival and pay a fee.
              </p>
              <p className="mt-2 text-sm text-blue-900/80">
                Always check your passport’s eligibility and permitted length of stay before travelling.
              </p>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <Link
                  href={{
                    pathname: "/guides/do-i-need-a-visa-thailand",
                    query: {
                      returnTo: "/guides/voa-visa-exemption",
                      returnLabel: "Back to VOA vs Visa Exemption Guide",
                    },
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Not sure? Use our Visa Checker (15 seconds).
                </Link>
              </div>
            </div>

            <div className="mt-10 space-y-8">
              <section>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Key Differences
                </h2>
                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
                  <div className="grid grid-cols-2 bg-slate-100 text-sm font-bold text-slate-900">
                    <div className="px-4 py-3">Visa Exemption</div>
                    <div className="border-l border-slate-200 px-4 py-3">Visa on Arrival</div>
                  </div>
                  <div className="grid grid-cols-2 text-sm text-slate-700">
                    <div className="px-4 py-3">No visa required in advance</div>
                    <div className="border-l border-slate-200 px-4 py-3">Visa issued at arrival</div>
                  </div>
                  <div className="grid grid-cols-2 border-t border-slate-200 text-sm text-slate-700">
                    <div className="px-4 py-3">No visa fee</div>
                    <div className="border-l border-slate-200 px-4 py-3">2,000 THB fee</div>
                  </div>
                  <div className="grid grid-cols-2 border-t border-slate-200 text-sm text-slate-700">
                    <div className="px-4 py-3">Usually longer permitted stay</div>
                    <div className="border-l border-slate-200 px-4 py-3">Shorter permitted stay (typically 15 days)</div>
                  </div>
                  <div className="grid grid-cols-2 border-t border-slate-200 text-sm text-slate-700">
                    <div className="px-4 py-3">Faster immigration process</div>
                    <div className="border-l border-slate-200 px-4 py-3">Additional paperwork at airport</div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  Permitted stay lengths vary by nationality and entry point.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">What to Prepare (Both Options)</h2>
                <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
                  <li>Passport (recommended minimum 6 months validity)</li>
                  <li>Onward or return ticket</li>
                  <li>Accommodation details</li>
                  <li>Proof of funds if requested (typically 10,000 THB per person)</li>
                  <li>
                    Complete the{" "}
                    <Link
                      href="/tdac"
                      className="font-semibold text-blue-700 underline underline-offset-2"
                    >
                      Thailand Digital Arrival Card (TDAC)
                    </Link>{" "}
                    before arrival
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Visa on Arrival - Additional Requirements
                </h2>
                <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
                  <li>Completed VOA application form</li>
                  <li>One passport photo (4 x 6 cm, taken within 6 months)</li>
                  <li>Visa fee (2,000 THB, cash recommended)</li>
                  <li>Confirmed onward ticket within permitted stay</li>
                  <li>Proof of funds if requested</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Want to Stay Longer?
                </h2>
                <p className="mt-2 text-slate-700">
                  If eligible, you may apply for a{" "}
                  <Link
                    href={{
                      pathname: "/guides/tourist-extension",
                      query: {
                        returnTo: "/guides/voa-visa-exemption",
                        returnLabel: "Back to VOA vs Visa Exemption Guide",
                      },
                    }}
                    className="font-semibold text-blue-700 underline underline-offset-2"
                  >
                    30-day tourist extension
                  </Link>{" "}
                  at a local immigration office before your permitted stay expires.
                </p>
                <p className="mt-2 text-slate-700">
                  Visa on Arrival extensions are more limited and not always guaranteed.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">FAQ</h2>
                <div className="mt-4 space-y-3">
                  <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-base font-bold text-slate-900">
                      <span className="min-w-0">Which is better - Visa Exemption or VOA?</span>
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-slate-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700">
                      <p>Visa Exemption is better because, it is free and often allows a longer stay. VOA is for nationalities that are not eligible for visa exemption.</p>
                    </div>
                  </details>

                  <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-base font-bold text-slate-900">
                      <span className="min-w-0">How long can I stay under Visa on Arrival?</span>
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-slate-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      Visa on Arrival typically allows a shorter stay (commonly around 15 days). Extension options are
                      limited and not guaranteed.
                    </p>
                  </details>

                  <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-base font-bold text-slate-900">
                      <span className="min-w-0">Can I work under Visa Exemption or VOA?</span>
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-slate-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      No. Neither Visa Exemption nor Visa on Arrival allows you to work in Thailand.
                    </p>
                  </details>

                  <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-base font-bold text-slate-900">
                      <span className="min-w-0">Can I enter Thailand multiple times on Visa Exemption?</span>
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-slate-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700">
                      <p>
                        Yes, you can enter Thailand multiple times under Visa Exemption, as long as your nationality
                        is eligible.
                      </p>
                      <p>
                        However, immigration officers have discretion to refuse entry if they believe you are using
                        visa exemption to live in Thailand long-term rather than for genuine tourism. There is no
                        officially published annual limit on entries.
                      </p>
                      <ul className="list-disc space-y-1 pl-5">
                        <li>Frequent back-to-back entries may raise questions.</li>
                        <li>You may be asked to show proof of funds.</li>
                        <li>You may be asked to show an onward ticket.</li>
                        <li>You may be asked to show accommodation details.</li>
                      </ul>
                    </div>
                  </details>

                  <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-base font-bold text-slate-900">
                      <span className="min-w-0">
                        If my passport stamp says 7 August, when do I need to leave Thailand?
                      </span>
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-slate-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      If your permitted stay stamp shows 7 August, you should depart Thailand before 11:59 PM on 7 August.
                      Do not stay past midnight into 8 August. To reduce risk, leave earlier in the day in case of delays or
                      checkpoint issues.
                    </p>
                  </details>
                </div>
              </section>

            </div>
          </CardContent>
        </Card>

        <div className="py-8 text-xs text-slate-500">
          <Separator className="mb-4" />
          Rules can change and may vary by checkpoint - always confirm before you travel.
        </div>
      </div>
    </div>
  );
}
