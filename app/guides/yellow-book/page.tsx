import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Home } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Is a Yellow Book (Tabien Baan) and How to Get One?",
  description:
    "A practical guide to Thailand's Yellow House Book (Tabien Baan): what it is, who can apply, required documents, process, and common issues.",
};

export default function YellowBookPage() {
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
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100">
                <Home className="h-6 w-6 text-amber-600" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Yellow Book (Tabien Baan)
              </h1>
            </div>

            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <p className="text-lg font-semibold text-amber-900">
                The Yellow Book (Tabien Baan) is an official Thai house registration record for foreign residents.
                It is not a visa, but it can make many administrative tasks easier.
              </p>
            </div>

            <div className="mt-10 space-y-8">
              <section>
                <h2 className="text-xl font-extrabold text-slate-900">What it is</h2>
                <p className="mt-2 text-slate-700">
                  The Yellow Book (Tabien Baan) records that a foreigner lives at a specific Thai address.
                  It is issued by the local district office (Amphur/Khet). It does not replace your passport, visa status, 90-day reporting, or visa extensions.
                  It also does not grant residency rights.
                </p>

              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Who can apply</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "Foreigners legally staying in Thailand (typically long-term or non-immigrant visa holders)",
                    "People living at a Thai address with the cooperation of the house owner",
                    "Applicants who can provide original documents and Thai translations if requested",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Common documents requested</h2>
                <p className="mt-2 text-slate-700">
                  Requirements vary by district office, but commonly include:
                </p>
                <div className="mt-3 grid gap-2">
                  {[
                    "Passport + copies (bio page, visa sticker, latest entry stamp)",
                    "Thai translation of passport (often required)",
                    "Proof of address (Blue House Book copy, ownership papers, or rental contract)",
                    "House owner's ID card + presence at the office (commonly required)",
                    "TM.30 receipt (often requested)",
                    "Marriage certificate (if applying via Thai spouse address)",
                    "Thai witness(es) (in some districts)",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-slate-700">
                  If you are unsure about TM.30, see our{" "}
                  <Link
                    href="/guides/tm30"
                    className="font-semibold text-amber-700 underline underline-offset-2"
                  >
                    TM.30 guide
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">How the process usually works</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "Visit your local district office (Amphur/Khet) with original documents",
                    "Submit the application and supporting copies",
                    "The office verifies your address and eligibility and may request additional documents",
                    "If approved, the Yellow Book can be issued the same day or scheduled for collection",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-slate-700">
                  Processing time varies depending on the district office.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Why people get one (Acceptance depends on the institution)
                </h2>
                <p className="mt-2 text-slate-700">A Yellow Book can simplify proof of address for:</p>
                <div className="mt-3 grid gap-2">
                  {[
                    "Opening bank accounts",
                    "Applying for a Thai driver's license",
                    "Vehicle registration",
                    "Utility connections",
                    "Applying for a Pink ID card (Foreigner ID)",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="mt-10 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-5">
              <div className="font-bold text-amber-900">Important</div>
              <div className="mt-2 space-y-1 text-sm text-amber-900">
                <p>
                  Requirements vary significantly by district office - it is best to call in advance to confirm what
                  they require.
                </p>
                <p>
                  The Yellow Book does not replace{" "}
                  <Link
                    href="/guides/90-day-reporting"
                    className="font-semibold text-amber-700 underline underline-offset-2"
                  >
                    90-day reporting
                  </Link>{" "}
                  or visa extensions.
                </p>
                <p>Bring extra signed copies of documents to avoid repeat trips.</p>
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
