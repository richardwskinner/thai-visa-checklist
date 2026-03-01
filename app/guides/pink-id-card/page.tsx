import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IdCard } from "lucide-react";
import type { Metadata } from "next";
import GuideBackButton from "@/components/guide-back-button";

export const metadata: Metadata = {
  title: "What Is a Thai Pink ID Card and How to Get One?",
  description:
    "A practical guide to Thailand's Pink ID card for foreigners: what it is, who can apply, required documents, process, and common issues.",
};

export default function PinkIdCardPage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-5">
        <div className="pt-8">
          <GuideBackButton />
        </div>

        <Card className="mt-6 rounded-3xl border-0 bg-white shadow-sm">
          <CardContent className="p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100">
                <IdCard className="h-6 w-6 text-rose-600" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Thai Pink ID Card
              </h1>
            </div>

            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-6">
              <p className="text-lg font-semibold text-rose-900">
                The Pink ID card is a Thai government-issued foreigner identification card. It is not a visa, but
                it can make identity and address checks easier in daily life.
              </p>
            </div>

            <div className="mt-10 space-y-8">
              <section>
                <h2 className="text-xl font-extrabold text-slate-900">What it is</h2>
                <p className="mt-2 text-slate-700">
                  The Pink ID card is an identification card for eligible foreigners registered at a Thai address.
                  It is issued through your local district office (Amphur/Khet), often after{" "}
                  <Link
                    href={{
                      pathname: "/guides/yellow-book",
                      query: {
                        returnTo: "/guides/pink-id-card",
                        returnLabel: "Back to Pink ID Card Guide",
                      },
                    }}
                    className="font-semibold text-rose-700 underline underline-offset-2"
                  >
                    Yellow Book registration
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Who can apply</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "Foreigners legally staying in Thailand on a long-term visa or valid extension",
                    "Applicants with an address registered in a Yellow Book (Tabien Baan)",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-rose-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Common documents requested</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "Passport + copies (bio page, visa, latest entry stamp)",
                    "Yellow Book (Tabien Baan)",
                    "Thai translation of your passport",
                    "House owner's ID and/or presence at office (depends on district)",
                    "Marriage certificate (if applying via Thai spouse address)",
                    "Recent photo(s), if required by district office",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-rose-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">How the process usually works</h2>
                <ol className="mt-3 space-y-3">
                  {[
                    "Call or visit your local district office (Amphur/Khet) to confirm the required documents and current procedures.",
                    "Visit your local district office with all original documents and required copies.",
                    "Submit the application form and supporting documents.",
                    "The office will verify your identity, address, and eligibility, and may request additional documents if needed.",
                    "If approved, the Yellow Book may be issued the same day or scheduled for collection.",
                  ].map((step, index) => (
                    <li key={step} className="flex items-start gap-3 text-slate-700">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-700">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Why people get one</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "Easier ID checks for some government and private services",
                    "Useful as local ID for certain banking or utility tasks",
                    "Can reduce reliance on carrying passport in some situations",
                    "May simplify some district-office paperwork",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-rose-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">FAQ</h2>
                <div className="mt-4 space-y-3">
                  <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-base font-bold text-slate-900">
                      <span className="min-w-0">Can I get a Pink ID on a tourist visa?</span>
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-slate-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      Generally no. Most district offices require a long-term visa or valid extension of stay.
                    </p>
                  </details>

                  <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-base font-bold text-slate-900">
                      <span className="min-w-0">Is the Thai Pink ID card useful for foreigners?</span>
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-slate-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      Yes, it can be useful for everyday identification and address verification in Thailand. It may even open the doors to Thai pricing at national parks; however, this is at the discretion of the individual staff member or organisation.
                    </p>
                  </details>

                  <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-base font-bold text-slate-900">
                      <span className="min-w-0">How much does it cost?</span>
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-slate-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      There is usually no significant official fee, but minor administrative fees may apply depending on the district office.
                    </p>
                  </details>
                </div>
              </section>
            </div>

            <div className="mt-10 rounded-lg border-l-4 border-rose-500 bg-rose-50 p-5">
              <div className="font-bold text-rose-900">Important</div>
              <div className="mt-2 space-y-1 text-sm text-rose-900">
                <p>Requirements vary by district office and can change without notice.</p>
                <p>It does not replace your passport, you are still required by law to carry your passport</p>
                <p>Most offices require a Yellow Book first before issuing a Pink ID card.</p>
                <p>Always call your local Amphur/Khet in advance and confirm their exact checklist.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="py-8 text-xs text-slate-500">
          <Separator className="mb-4" />
          Information is provided for guidance only. Always confirm requirements with your local district office.
        </div>
      </div>
    </div>
  );
}
