import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Overstay in Thailand - Fines, Blacklist Rules and What To Do",
  description:
    "Official overstay rules in Thailand: fine amounts, blacklist durations, surrender vs arrest outcomes, and what to do if you have overstayed.",
};

const SAMUTPRAKAN_OVERSTAY_URL = "https://www.samutprakanimmigration.go.th/warning-overstay/";
const SURIN_OVERSTAY_URL =
  "https://surin.immigration.go.th/checkstatus/%E0%B9%82%E0%B8%97%E0%B8%A9%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3-overstay/";
const IMMIGRATION_MAIN_URL = "https://www.immigration.go.th/";

const FAQS = [
  {
    question: "How much is the overstay fine in Thailand?",
    answer:
      "The overstay fine is 500 THB per day, up to a maximum of 20,000 THB, based on official immigration overstay notices.",
  },
  {
    question: "If I pay the overstay fine, will I avoid blacklist?",
    answer:
      "Not always. Blacklist duration depends on how long you overstayed and whether you surrendered yourself or were arrested.",
  },
  {
    question: "What is the difference between surrender and arrest for overstay?",
    answer:
      "Surrender usually results in lighter blacklist outcomes. Arrested overstay cases have significantly stricter blacklist periods.",
  },
  {
    question: "What should I do immediately if I already overstayed?",
    answer:
      "Act quickly. Go to immigration or depart via an international checkpoint as soon as possible, with your passport and enough funds for fines. Long overstay cases can be high risk.",
  },
] as const;

export default function OverstayThailandGuidePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mx-auto w-full max-w-5xl overflow-hidden px-4 sm:px-5">
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
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Overstay in Thailand - Fines, Blacklist Rules and What To Do
              </h1>
            </div>

            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6">
              <p className="text-base font-semibold text-red-900 sm:text-lg">
                Overstaying your permitted stay in Thailand results in a daily fine and may lead to temporary re-entry bans
                depending on duration and circumstances.
              </p>
              <p className="mt-3 text-sm text-red-900/80">
                Rules below are based on official Thai immigration overstay notices and can be applied differently case by
                case.
              </p>
            </div>

            <div className="mt-8 space-y-8 sm:mt-10">
              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Official fine amount</h2>
                <p className="mt-2 text-slate-700">
                  Immigration overstay notices state the fine is <span className="font-bold">500 THB per day</span>, capped
                  at <span className="font-bold">20,000 THB</span>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Blacklist rules (official notice table)</h2>

                <div className="mt-4 space-y-4 sm:hidden">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-base font-bold text-slate-900">Voluntary Surrender</div>
                    <div className="mt-3 space-y-2">
                      {[
                        ["Less than 90 days", "No blacklist"],
                        ["More than 90 days", "1 year"],
                        ["More than 1 year", "3 years"],
                        ["More than 3 years", "5 years"],
                        ["More than 5 years", "10 years"],
                      ].map(([duration, blacklist]) => (
                        <div key={duration} className="rounded-xl border border-slate-200 bg-white p-3">
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Overstay Duration
                          </div>
                          <div className="mt-1 font-semibold text-slate-900">{duration}</div>
                          <div className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Blacklist Period
                          </div>
                          <div className="mt-1 text-slate-700">{blacklist}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-base font-bold text-slate-900">Arrested</div>
                    <div className="mt-3 space-y-2">
                      {[
                        ["Less than 1 year", "5 years"],
                        ["More than 1 year", "10 years"],
                      ].map(([duration, blacklist]) => (
                        <div key={duration} className="rounded-xl border border-slate-200 bg-white p-3">
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Overstay Duration
                          </div>
                          <div className="mt-1 font-semibold text-slate-900">{duration}</div>
                          <div className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Blacklist Period
                          </div>
                          <div className="mt-1 text-slate-700">{blacklist}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 hidden overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:block sm:p-5">
                  <div className="text-base font-bold text-slate-900">Voluntary Surrender</div>
                  <table className="mt-3 w-full min-w-[620px] border-collapse text-left text-sm">
                    <thead className="text-slate-900">
                      <tr className="border-b border-slate-300">
                        <th className="px-0 py-3 font-bold">Overstay Duration</th>
                        <th className="px-0 py-3 font-bold">Blacklist Period</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700">
                      <tr className="border-b border-slate-200">
                        <td className="px-0 py-3">Less than 90 days</td>
                        <td className="px-0 py-3">No blacklist</td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="px-0 py-3">More than 90 days</td>
                        <td className="px-0 py-3">1 year</td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="px-0 py-3">More than 1 year</td>
                        <td className="px-0 py-3">3 years</td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="px-0 py-3">More than 3 years</td>
                        <td className="px-0 py-3">5 years</td>
                      </tr>
                      <tr>
                        <td className="px-0 py-3">More than 5 years</td>
                        <td className="px-0 py-3">10 years</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="mt-8 text-base font-bold text-slate-900">Arrested</div>
                  <table className="mt-3 w-full min-w-[620px] border-collapse text-left text-sm">
                    <thead className="text-slate-900">
                      <tr className="border-b border-slate-300">
                        <th className="px-0 py-3 font-bold">Overstay Duration</th>
                        <th className="px-0 py-3 font-bold">Blacklist Period</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700">
                      <tr className="border-b border-slate-200">
                        <td className="px-0 py-3">Less than 1 year</td>
                        <td className="px-0 py-3">5 years</td>
                      </tr>
                      <tr>
                        <td className="px-0 py-3">More than 1 year</td>
                        <td className="px-0 py-3">10 years</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">What to do if you already overstayed</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "Do not ignore it - risk increases the longer you wait.",
                    "Prepare your passport and enough cash for overstay fine payment.",
                    "If possible, surrender/resolve at immigration or before departure instead of waiting to be arrested.",
                    "If your overstay is long or complicated, get professional legal/immigration advice.",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
                      <span className="min-w-0">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
                <div className="mt-4 space-y-3">
                  {FAQS.map((faq) => (
                    <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
                      <summary className="flex list-none cursor-pointer items-start justify-between gap-3 text-base font-bold text-slate-900">
                        <span className="min-w-0">{faq.question}</span>
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-slate-500 transition group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            <div className="mt-10 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-5">
              <div className="font-bold text-blue-900">Official sources</div>
              <div className="mt-2 space-y-2 text-sm text-blue-900">
                <a
                  href={SAMUTPRAKAN_OVERSTAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-2"
                >
                  Samut Prakan Immigration - Overstay Warning <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <br />
                <a
                  href={SURIN_OVERSTAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-2"
                >
                  Surin Immigration - Overstay Penalty Notice <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <br />
                <a
                  href={IMMIGRATION_MAIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-2"
                >
                  Thai Immigration Bureau <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="py-8 text-xs text-slate-500">
          <Separator className="mb-4" />
          This page is general guidance only. Overstay outcomes can vary by case and officer assessment.
        </div>
      </div>
    </div>
  );
}
