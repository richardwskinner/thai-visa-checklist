import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Landmark } from "lucide-react";
import GuideBackButton from "@/components/guide-back-button";

const RD_FOREIGNERS_TAX_PDF =
  "https://www.rd.go.th/fileadmin/user_upload/lorkhor/newspr/2024/FOREIGNERS_PAY_TAX2024.pdf";

export const metadata: Metadata = {
  title: "Foreigners Paying Tax in Thailand (Revenue Department Guide)",
  description:
    "General information for foreigners paying tax in Thailand, including the 180-day rule, foreign income remittance rules, filing, and foreign tax credits.",
};

export default function ForeignersPayingTaxThailandGuidePage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-5">
        <div className="pt-6 sm:pt-8">
          <GuideBackButton />
        </div>

        <Card className="mt-4 rounded-3xl border-0 bg-white shadow-sm sm:mt-6">
          <CardContent className="p-4 sm:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100">
                <Landmark className="h-6 w-6 text-emerald-700" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Foreigners Paying Tax in Thailand
              </h1>
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
              <p className="text-base font-semibold text-emerald-900 sm:text-lg">
                For foreigners who stay in Thailand for 180 days or more in a calendar year.
              </p>
              <p className="mt-3 text-sm text-emerald-900/80">
                This guide is general information only. Tax outcomes depend on your residency status, income source,
                remittance timing, and any applicable Double Tax Agreements. Always confirm with the Thai Revenue
                Department or a qualified tax professional.
              </p>
            </div>

            <div className="mt-8 space-y-8 sm:mt-10">
              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Who Pays Tax in Thailand</h2>
                <p className="mt-3 text-slate-700">
                  If you earn income from work, business, or assets located in Thailand, you are subject to Thai income
                  tax. This applies whether the money is paid inside or outside Thailand.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Foreign Income</h2>
                <p className="mt-3 text-slate-700">
                  As of the 1 January 2024, if you stay in Thailand 180 days or more in the year foreign income that was earned and brought (remitted) to Thailand becomes taxable.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">What Is Not Taxed</h2>
                <div className="mt-3 grid gap-2 text-slate-700">
                  {[
                    "Foreign income earned before 1 January 2024 is not taxable, even if transferred into Thailand later.",
                    "Foreign income earned in a year you were not a Thai tax resident, meaning fewer than 180 days in Thailand, is also not taxable, even if remitted later.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 leading-7">
                      <div className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-emerald-300" />
                      <span className="min-w-0 leading-7">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Filing Your Tax Return</h2>
                <p className="mt-3 text-slate-700">
                  Foreigners must file an annual Thai tax return reporting Thai-sourced income and any taxable foreign
                  income that has been remitted. Salary-only income is filed using Form P.N.D. 91. If you have other
                  types of income, use Form P.N.D. 90. If only part of your foreign income is remitted, only that
                  portion is included in your taxable income.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Foreign Tax Credits</h2>
                <p className="mt-3 text-slate-700">
                  If tax was already paid overseas, relief may be available under a Double Tax Agreement. Tax paid can be used as a credit against tax payable in Thailand.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Official source</h2>
                <a
                  href={RD_FOREIGNERS_TAX_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 font-semibold text-blue-700 underline underline-offset-2"
                >
                  Thailand Revenue Department - Foreigners Pay Tax (2024) <ExternalLink className="h-4 w-4" />
                </a>
              </section>
            </div>

            <div className="mt-10 text-xs text-slate-500">
              <Separator className="mb-4" />
              General guidance only. Confirm your situation with the Thai Revenue Department or a qualified tax professional.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
