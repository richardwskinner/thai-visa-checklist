import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ExternalLink, CalendarClock } from "lucide-react";
import type { Metadata } from "next";
import NinetyDayCalculator from "./NinetyDayCalculator";

export const metadata: Metadata = {
  title: "90-Day Reporting in Thailand - What It Is and How to Do It",
  description:
    "Everything you need to know about 90-day reporting in Thailand. Who needs to report, when to do it, how to report online, by mail, or in person, and what happens if you miss it.",
};

const TM47_URL = "https://www.immigration.go.th/wp-content/uploads/2022/10/18.Form-TM-47.pdf";
const TM47_PORTAL = "https://tm47.immigration.go.th";
const FAQS = [
  {
    question: "Does 90-day reporting extend my visa?",
    answer:
      "No. It does not extend your visa or permission of stay. It only updates your address record with immigration.",
  },
  {
    question: "When can I submit my 90-day report?",
    answer:
      "You can usually report 15 days before your due date until 7 days after your due date.",
  },
  {
    question: "What happens if I miss 90-day reporting?",
    answer:
      "If you report late yourself, the fine is typically 2,000 THB. If you are found before reporting, the fine can be higher.",
  },
  {
    question: "Does leaving Thailand reset the 90-day count?",
    answer:
      "Yes. If you leave and re-enter Thailand, the 90-day count starts again from your latest entry date.",
  },
  {
    question: "Why was my online 90-day report rejected?",
    answer:
      "Unfortunately the system does not provide a specific reason. Common reasons for rejection include not having previously completed at least one 90-day report in person, or address details that do not match your registered TM.30 information. Double-check all passport and address details carefully and try to submit again.",
  },
  {
    question: "What do you do if you lose your 90-Day Report receipt?",
    answer:
      "Go to your local immigration office with your passport and explain that the receipt was lost. In some offices, you can proceed with your next 90-day report in person without the old slip. In other offices, they may ask for a police report confirming the loss before allowing the next filing.",
  },
] as const;

export default function NinetyDayReportingpage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-5 overflow-hidden">
        <div className="pt-6 sm:pt-8">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-600 px-5 py-3 text-base font-medium text-white transition hover:bg-slate-700"
          >
            <ArrowLeft className="h-5 w-5" /> Back to Guides
          </Link>
        </div>

        <Card className="mt-4 sm:mt-6 rounded-3xl border-0 bg-white shadow-sm">
          <CardContent className="p-4 sm:p-10">
            {/* Header (stack on mobile) */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100">
                <CalendarClock className="h-6 w-6 text-violet-600" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                90-Day Reporting Thailand
              </h1>
            </div>

            <div className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 p-5 sm:p-6">
              <p className="text-base sm:text-lg font-semibold text-violet-900">
                If you stay in Thailand for more than 90 consecutive days, you must report your current address to immigration.
                This is not a visa extension - it’s a separate legal requirement.
              </p>
              <p className="mt-3 text-sm text-violet-900/80">
                If you’ve recently changed address or moved hotels, also read our{" "}
                <Link
                  href="/guides/tm30"
                  className="font-semibold text-violet-800 underline underline-offset-2"
                >
                  TM.30 explained
                </Link>{" "}
                guide.
              </p>
            </div>

            <div className="mt-8 sm:mt-10 space-y-8">
              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Who needs to report</h2>
                <p className="mt-2 text-slate-700">
                  All foreigners staying in Thailand for more than 90 consecutive days on any long-term visa - including work,
                  retirement, marriage, education, DTV, and Thailand Elite visas. If you plan to travel while on a long-stay visa,
                  make sure you understand{" "}
                  <Link
                    href="/guides/re-entry-permit"
                    className="font-semibold text-violet-700 underline underline-offset-2"
                  >
                    re-entry permits
                  </Link>{" "}
                  (leaving without one can cancel many extensions).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">When to report</h2>
                <p className="mt-2 text-slate-700">
                  You can report from 15 days before your due date up to 7 days after it. This gives you a roughly 3-week
                  window. Your due date is exactly 90 days from your latest entry into Thailand or from your last report -
                  whichever is more recent. If you leave Thailand and return, the 90-day count resets from your new entry date.
                </p>

                <NinetyDayCalculator />

                <p className="mt-4 text-sm text-slate-600">
                  Coming into Thailand soon? You will need to complete the{" "}
                  <Link
                    href="/tdac"
                    className="font-semibold text-violet-700 underline underline-offset-2"
                  >
                    Thailand Digital Arrival Card (TDAC)
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">What you need</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "Passport (original for in-person, copies for mail/online)",
                    "Previous 90-day report receipt (if applicable)",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-violet-500" />
                      <span className="min-w-0">{item}</span>
                    </div>
                  ))}

                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="h-2 w-2 shrink-0 rounded-full bg-violet-500" />
                    <span className="min-w-0">
                      TM.47 form -{" "}
                      <a
                        href={TM47_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-violet-700 underline underline-offset-2"
                      >
                        Download <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </span>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">How to report</h2>

                <div className="mt-4 space-y-4">
                  <div className="rounded-2xl border border-violet-200 bg-violet-50/30 p-5">
                    <h3 className="font-bold text-slate-900">In person</h3>
                    <p className="mt-1 text-slate-700">
                      Visit your local immigration office with your documents. This is the most reliable method. Processing is
                      usually same-day, but arrive early to beat the queues.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-violet-200 bg-violet-50/30 p-5">
                    <h3 className="font-bold text-slate-900">Online</h3>
                    <p className="mt-1 text-slate-700">
                      Use the official immigration website. You must have completed at least one in-person report before you can
                      use the online system. The system can be unreliable - submit a few days early in case it fails.
                    </p>
                    <a
                      href={TM47_PORTAL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-violet-700 underline underline-offset-2"
                    >
                      Official 90-Day Reporting Portal <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="rounded-2xl border border-violet-200 bg-violet-50/30 p-5">
                    <h3 className="font-bold text-slate-900">By mail</h3>
                    <p className="mt-1 text-slate-700">
                      Send the TM.47 form and passport copies by registered mail to your local immigration office at least 15
                      days before your due date. Include a stamped self-addressed envelope so they can return your receipt.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-violet-200 bg-violet-50/30 p-5">
                    <h3 className="font-bold text-slate-900">Through an agent</h3>
                    <p className="mt-1 text-slate-700">
                      A licensed visa agent can submit on your behalf. This is the most convenient option but comes with a
                      service fee.
                    </p>
                  </div>
                </div>

              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
                <div className="mt-4 space-y-5">
                  {FAQS.map((faq) => (
                    <div key={faq.question}>
                      <h3 className="text-base font-bold text-slate-900">{faq.question}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="mt-10 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-5">
              <div className="font-bold text-amber-900">Good to know</div>
              <div className="mt-2 space-y-1 text-sm text-amber-900">
                <p>90-day reporting does not extend your visa - it only confirms your address.</p>
                <p>Set a calendar reminder 15 days before your due date so you never miss it.</p>
                <p>The online system is famously unreliable near deadlines - don&apos;t leave it to the last day.</p>
                <p>LTR visa holders only need to report once per year instead of every 90 days.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="py-8 text-xs text-slate-500">
          <Separator className="mb-4" />
          Information based on official Thai Immigration Bureau guidelines. Always check with your local immigration office for
          the latest requirements.
        </div>
      </div>
    </div>
  );
}
