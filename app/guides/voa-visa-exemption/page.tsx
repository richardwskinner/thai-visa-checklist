import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ExternalLink, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thailand Entry Options — Visa Exemption vs Visa on Arrival (VOA)",
  description:
    "Confused between Thailand visa exemption and visa on arrival? This guide explains the differences, who qualifies, typical stay length, fees, and what to check before you fly.",
};

const MFA_VOA_PDF =
  "https://image.mfa.go.th/mfa/0/zE6021nSnu/%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%AA%E0%B8%B2%E0%B8%A3/VOA.pdf";

const EVOA_VFS_INFO =
  "https://thailandevoa.vfsevisa.com/thailand/online/home/information";

const EVOA_VFS_FEES =
  "https://thailandevoa.vfsevisa.com/thailand/online/home/visa-fees";

export default function ThailandEntryOptionsPage() {
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
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Visa Exemption vs Visa on Arrival (VOA)
              </h1>
            </div>

            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-6">
              <p className="text-lg font-semibold text-blue-900">
                Most travellers should use <span className="underline underline-offset-4">visa exemption</span> if eligible.
                Visa on Arrival is for a smaller set of nationalities and usually involves a fee.
              </p>
              <p className="mt-2 text-sm text-blue-900/80">
                Always confirm your passport’s latest eligibility and stay length before travel.
              </p>
            </div>

            <div className="mt-10 space-y-8">

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Quick decision (30 seconds)</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-teal-200 bg-teal-50/30 p-5">
                    <h3 className="font-bold text-slate-900">Choose Visa Exemption if…</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                      <li>Your passport is on the visa exemption list</li>
                      <li>You want the simplest entry (usually no visa fee)</li>
                      <li>You’re visiting for tourism</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-blue-200 bg-blue-50/30 p-5">
                    <h3 className="font-bold text-slate-900">Choose Visa on Arrival if…</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                      <li>Your passport is eligible for VOA but not exemption</li>
                      <li>You’re prepared with photo, documents, and fee</li>
                      <li>You’re doing a short tourism stay</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Key differences</h2>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-900">Visa Exemption</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                      <li>Usually free</li>
                      <li>Often longer stay</li>
                      <li>Granted at immigration on arrival</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-900">Visa on Arrival (VOA)</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                      <li>Fee payable (commonly 2,000 THB)</li>
                      <li>Short stay (commonly up to 15 days)</li>
                      <li>Extra paperwork required</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4">
                  <a
                    href={MFA_VOA_PDF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 underline underline-offset-2"
                  >
                    Official MFA Visa on Arrival reference (PDF) <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">What to prepare</h2>
                <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
                  <li>Passport (6+ months validity)</li>
                  <li>Onward ticket</li>
                  <li>Accommodation details</li>
                  <li>Proof of funds (best to be prepared)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Visa on Arrival (VOA): extra items</h2>
                <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
                  <li>Completed VOA form</li>
                  <li>Photo (4×6 cm commonly requested)</li>
                  <li>Visa fee (cash recommended)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Optional: eVOA</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 p-5">
                    <a
                      href={EVOA_VFS_INFO}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 underline underline-offset-2"
                    >
                      eVOA info page <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-5">
                    <a
                      href={EVOA_VFS_FEES}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 underline underline-offset-2"
                    >
                      eVOA fees page <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </section>

              <section className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-5">
                <div className="font-bold text-amber-900">Common mistakes</div>
                <div className="mt-2 space-y-1 text-sm text-amber-900">
                  <p>• Applying for VOA when you qualify for exemption</p>
                  <p>• No onward ticket</p>
                  <p>• No photo / no cash (VOA)</p>
                </div>
              </section>

            </div>
          </CardContent>
        </Card>

        <div className="py-8 text-xs text-slate-500">
          <Separator className="mb-4" />
          Rules can change and may vary by checkpoint — always confirm before you travel.
        </div>
      </div>
    </div>
  );
}