import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ExternalLink, PlusCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thailand Tourist Visa Extension (30 Days) - How to Extend Your Stay",
  description:
    "How to extend your Thailand tourist visa or visa exemption by 30 days. Requirements, documents needed, fee, where to apply, and common mistakes to avoid.",
};

const TM7_FORM =
  "https://www.immigration.go.th/wp-content/uploads/2022/10/4.คำขออนุญาตเพื่ออยู่ในราชอาณาจักรเป็นการชั่วคราวต่อไป-ตม.7.pdf";

export default function TouristExtensionPage() {
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

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                <PlusCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Thailand Tourist Visa Extension (30 Days)
              </h1>
            </div>

            {/* Key Callout */}
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <p className="text-lg font-semibold text-emerald-900">
                Most tourists can extend their stay once for 30 days at a local immigration office.
                The standard fee is 1,900 THB.
              </p>
            </div>

            <div className="mt-10 space-y-8">

              {/* Who can extend */}
              <section>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Who can apply for a 30-day extension
                </h2>

                <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
                  <li>
                    <Link
                      href="/guides/voa-visa-exemption"
                      className="font-semibold text-emerald-700 underline underline-offset-2"
                    >
                      Visa Exemption
                    </Link>{" "}
                    entries
                  </li>
                  <li>Single-entry Tourist Visa (TR)</li>
                  <li>Some Visa on Arrival cases (confirm locally)</li>
                </ul>

                <p className="mt-3 text-slate-700">
                  Extensions are granted at the discretion of Thai Immigration.
                </p>
              </section>

              {/* Fee */}
              <section>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Extension fee
                </h2>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
                  <div className="text-sm font-semibold text-slate-600">
                    Standard fee
                  </div>
                  <div className="mt-2 text-3xl font-extrabold text-slate-900">
                    1,900 THB
                  </div>
                  <p className="mt-2 text-sm text-slate-700">
                    Bring cash. Card payments are not accepted at most immigration offices.
                  </p>
                </div>
              </section>

              {/* Documents */}
              <section>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Documents required
                </h2>

                <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
                  <li>Passport (original)</li>
                  <li>
                    TM.7 form -{" "}
                    <a
                      href={TM7_FORM}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-emerald-700 underline underline-offset-2"
                    >
                      Download <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </li>
                  <li>1x passport photo (4x6 cm)</li>
                  <li>Photocopies of passport photo page + entry stamp</li>
                  <li>
                    <Link
                      href="/guides/tm30"
                      className="font-semibold text-emerald-700 underline underline-offset-2"
                    >
                      TM.30
                    </Link>{" "}
                    receipt (if applicable)
                  </li>
                </ul>
              </section>

              {/* Where */}
              <section>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Where to apply
                </h2>
                <p className="mt-2 text-slate-700">
                  Apply at your local immigration office before your permitted stay expires.
                  Major offices include Bangkok (Chaeng Wattana), Chiang Mai, Phuket, Pattaya, and others.
                </p>
                <p className="mt-3 text-slate-700">
                  It&apos;s best to apply 5–7 days before your expiry date. If you haven&apos;t already, make sure you&apos;ve completed the{" "}
                  <Link
                    href="/tdac"
                    className="font-semibold text-emerald-700 underline underline-offset-2"
                  >
                    Thailand Digital Arrival Card (TDAC)
                  </Link>{" "}
                  before arriving in Thailand.
                </p>
              </section>

              {/* Processing time */}
              <section>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Processing time
                </h2>
                <p className="mt-2 text-slate-700">
                  Usually same-day. Expect 30 minutes to several hours depending on location and queue.
                </p>
              </section>

              {/* After approval */}
              <section>
                <h2 className="text-xl font-extrabold text-slate-900">
                  What happens after approval
                </h2>
                <p className="mt-2 text-slate-700">
                  Immigration will place an extension stamp in your passport showing your new permitted stay date.
                </p>
              </section>

              {/* Common mistakes */}
              <section className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-5">
                <div className="font-bold text-amber-900">
                  Common mistakes
                </div>
                <div className="mt-2 space-y-1 text-sm text-amber-900">
                  <p>• Waiting until the last day</p>
                  <p>• No TM.30 receipt</p>
                  <p>• Incorrect photo size</p>
                  <p>• Missing photocopies</p>
                </div>
              </section>

            </div>
          </CardContent>
        </Card>

        <div className="py-8 text-xs text-slate-500">
          <Separator className="mb-4" />
          Information based on Thai Immigration guidance. Requirements can vary by office - always confirm locally.
        </div>
      </div>
    </div>
  );
}
