import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ExternalLink, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TM.30 in Thailand — What It Is and Who Needs to File It",
  description:
    "A simple guide to the TM.30 notification in Thailand. What it is, who is responsible, how to file it online or in person, and why it matters for your visa.",
};

export default function TM30Page() {
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
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100">
                <MapPin className="h-6 w-6 text-teal-600" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                TM.30 in Thailand
              </h1>
            </div>

            <div className="mt-6 rounded-2xl bg-teal-50 border border-teal-200 p-6">
              <p className="text-lg font-semibold text-teal-900">
                The TM.30 is a notification that tells Thai Immigration where a foreigner is staying. It is your landlord&apos;s responsibility to file it - but if they don&apos;t, you are the one who will face problems at immigration.
              </p>
            </div>

            <div className="mt-10 space-y-8">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">What is TM.30</h2>
                <p className="mt-2 text-slate-700">
                  TM.30 stands for &quot;Notification from House-Master, Owner or the Possessor of the Residence where Alien has Stayed.&quot; Under the Immigration Act of 1979, any property owner, landlord, or hotel hosting a foreigner must notify immigration of that foreigner&apos;s stay within 24 hours of arrival. It is not a visa and does not affect how long you can stay. It simply tells the government where you live.
                </p>
                <p className="mt-2 text-slate-700">
                </p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Who is responsible</h2>
                <p className="mt-2 text-slate-700">
                  Legally, the property owner or landlord is responsible for filing the TM.30 - not the foreigner. In practice, hotels and serviced apartments do this automatically. For private rentals, condos, and houses, you may need to remind your landlord or help them file it. Some landlords will sign an authorization letter allowing the foreigner or an agent to file on their behalf.
                </p>
                <p className="mt-2 text-slate-700">
                </p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">When must it be filed</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "When a foreigner first moves into a property — within 24 hours",
                    "When a foreigner returns to Thailand from abroad — within 24 hours",
                    "When a foreigner moves to a new address",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 rounded-full bg-teal-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-slate-700">
                  Even if you return to the same address after travelling abroad, a new TM.30 may be required depending on your local immigration office.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">What documents are needed</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "Landlord's ID card or passport",
                    "Copy of house book (Tabien Baan) or title deed",
                    "Foreigner's passport copy (photo page, visa page, latest entry stamp)",
                    "Lease or rental agreement (some offices require this)",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 rounded-full bg-teal-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">How to file TM.30</h2>
                <div className="mt-4 space-y-4">
                  <div className="rounded-2xl border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-900">Online</h3>
                    <p className="mt-1 text-slate-700">
                      The landlord can register on the official TM.30 website and file notifications digitally. This is the fastest method and provides a downloadable receipt.
                    </p>
                    <a
                      href="https://tm30.immigration.go.th"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-teal-700 underline underline-offset-2"
                    >
                      Official TM.30 Online Portal <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-900">In person</h3>
                    <p className="mt-1 text-slate-700">
                      The landlord (or authorized person) visits the local immigration office with the documents. After filing, they receive a stamped receipt - the &quot;Receipt of Notification&quot; - which the foreigner should keep.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-900">Via the Section 38 app</h3>
                    <p className="mt-1 text-slate-700">
                      Thai Immigration has a mobile application that landlords can use to submit TM.30 notifications and download receipts digitally.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Why it matters to you</h2>
                <p className="mt-2 text-slate-700">
                  Even though the landlord is responsible for filing, the TM.30 receipt is required when you visit immigration for visa extensions, 90-day reporting, or re-entry permits. Without it, your application may be delayed or rejected. Some hospitals also ask for it when processing insurance claims.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">What happens if it is not filed</h2>
                <p className="mt-2 text-slate-700">
                  Landlords who fail to file face a fine of up to 10,000 THB for the first offence. For foreigners, not having a TM.30 receipt can cause problems when trying to extend your visa, do 90-day reporting, or access other government services. Enforcement varies by immigration office - some are strict, others are more relaxed.
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-lg bg-amber-50 border-l-4 border-amber-500 p-5">
              <div className="font-bold text-amber-900">Good to know</div>
              <div className="mt-2 text-sm text-amber-900 space-y-1">
                <p>TM.30 records where you live, while 90-day reporting confirms you are still at that address.</p>
                <p>Hotels and serviced apartments file TM.30 automatically - you don't need to do anything.</p>
                <p>Keep a copy of your Receipt of Notification safe - you will need it at immigration.</p>
                <p>If you lose your receipt, you may need a police report before immigration will issue a replacement.</p>
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