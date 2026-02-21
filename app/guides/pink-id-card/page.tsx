import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, IdCard } from "lucide-react";
import type { Metadata } from "next";

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
                  It is usually issued through your local district office (Amphur/Khet), often after{" "}
                  <Link
                    href="/guides/yellow-book"
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
                    "Foreigners legally staying in Thailand",
                    "Applicants with an address registered in Thailand (commonly via Yellow Book)",
                    "People who can provide originals and Thai translations if requested",
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
                    "Yellow Book (Tabien Baan), if already issued",
                    "Proof of current address",
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
                <div className="mt-3 grid gap-2">
                  {[
                    "Visit your local district office (Amphur/Khet) with original documents",
                    "Submit application and supporting copies",
                    "Office verifies identity, address, and supporting records",
                    "If approved, card is issued same day or scheduled for collection",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-rose-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
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
            </div>

            <div className="mt-10 rounded-lg border-l-4 border-rose-500 bg-rose-50 p-5">
              <div className="font-bold text-rose-900">Important</div>
              <div className="mt-2 space-y-1 text-sm text-rose-900">
                <p>Requirements vary by district office and can change without notice.</p>
                <p>Some offices require a Yellow Book first before issuing a Pink ID card.</p>
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
