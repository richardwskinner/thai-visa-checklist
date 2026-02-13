import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ExternalLink, CalendarClock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "90-Day Reporting in Thailand — What It Is and How to Do It",
  description:
    "Everything you need to know about 90-day reporting in Thailand. Who needs to report, when to do it, how to report online, by mail, or in person, and what happens if you miss it.",
};

export default function NinetyDayReportingPage() {
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
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
                <CalendarClock className="h-6 w-6 text-violet-600" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                90-Day Reporting Thailand
              </h1>
            </div>

            <div className="mt-6 rounded-2xl bg-violet-50 border border-violet-200 p-6">
              <p className="text-lg font-semibold text-violet-900">
                If you stay in Thailand for more than 90 consecutive days, you must report your current address to immigration. This is not a visa extension — it is a separate legal requirement.
              </p>
            </div>

            <div className="mt-10 space-y-8">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Who needs to report</h2>
                <p className="mt-2 text-slate-700">
                  All foreigners staying in Thailand for more than 90 consecutive days on any long-term visa - including work, retirement, marriage, education, DTV, and Thailand Elite visas. Tourists who leave before 90 days do not need to report.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">When to report</h2>
                <p className="mt-2 text-slate-700">
                  You can report from 15 days before your due date up to 7 days after it. This gives you a roughly 3-week window. Your due date is exactly 90 days from your latest entry into Thailand or from your last report - whichever is more recent. If you leave Thailand and return, the 90-day count resets from your new entry date.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">What you need</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "Passport (original for in-person, copies for mail/online)",
                    "Previous 90-day report receipt (if applicable)",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 rounded-full bg-violet-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="h-2 w-2 rounded-full bg-violet-500 shrink-0" />
                    <span>
                      TM.47 form —{" "}
                      <a
                        href="https://www.immigration.go.th/wp-content/uploads/2022/10/18.Form-TM-47.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-violet-700 underline underline-offset-2"
                      >
                        Download <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">How to report</h2>

                <div className="mt-4 space-y-4">
                  <div className="rounded-2xl border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-900">In person</h3>
                    <p className="mt-1 text-slate-700">
                      Visit your local immigration office with your documents. This is the most reliable method. Processing is usually same-day, but arrive early to beat the queues.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-900">Online</h3>
                    <p className="mt-1 text-slate-700">
                      Use the official immigration website. You must have completed at least one in-person report before you can use the online system. The system can be unreliable — submit a few days early in case it fails.
                    </p>
                    <a
                      href="https://tm47.immigration.go.th"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-violet-700 underline underline-offset-2"
                    >
                      Official 90-Day Reporting Portal <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-900">By mail</h3>
                    <p className="mt-1 text-slate-700">
                      Send the TM.47 form and passport copies by registered mail to your local immigration office at least 15 days before your due date. Include a stamped self-addressed envelope so they can return your receipt.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-900">Through an agent</h3>
                    <p className="mt-1 text-slate-700">
                      A licensed visa agent can submit on your behalf. This is the most convenient option but comes with a service fee.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">What happens if you miss it</h2>
                <p className="mt-2 text-slate-700">
                  If you report late yourself, the fine is 2,000 THB. If you are caught by an immigration officer before you report, the fine can be up to 5,000 THB. Repeated non-compliance can complicate future visa extensions.
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-lg bg-amber-50 border-l-4 border-amber-500 p-5">
              <div className="font-bold text-amber-900">Good to know</div>
              <div className="mt-2 text-sm text-amber-900 space-y-1">
                <p>90-day reporting does not extend your visa — it only confirms your address.</p>
                <p>Set a calendar reminder 15 days before your due date so you never miss it.</p>
                <p>The online system is famously unreliable near deadlines — don&apos;t leave it to the last day.</p>
                <p>LTR visa holders only need to report once per year instead of every 90 days.</p>
              </div>
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
