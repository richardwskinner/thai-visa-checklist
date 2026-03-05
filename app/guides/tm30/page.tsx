import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExternalLink, MapPin } from "lucide-react";
import ExampleLink from "@/components/example-link";
import GuideBackButton from "@/components/guide-back-button";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TM.30 in Thailand - What It Is and Who Needs to File It",
  description:
    "A simple guide to the TM.30 notification in Thailand. What it is, who is responsible, how to file it online or in person, and why it matters for your visa.",
  alternates: {
    canonical: "/guides/tm30",
  },
};

const FAQS = [
  {
    question: "How do I know if my TM.30 was filed?",
    answer:
      "Ask your landlord for the Receipt of Notification (paper) or a downloaded confirmation from the online system.",
  },
  {
    question: "What if I lose my TM.30 receipt?",
    answer:
      "The landlord can log into the online system and download another copy. If it was filed in person, immigration may reprint it or ask for it to be filed again.",
  },
  {
    question: "Do I need a new TM.30 every time I travel?",
    answer:
      "Yes. If you return to your home address in Thailand after traveling abroad or staying at a hotel within Thailand, a new TM.30 should be filed within 24 hours of your return.",
  },
] as const;

export default function TM30Page() {
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
      <div className="mx-auto w-full max-w-5xl px-5">
        <div className="pt-8">
          <GuideBackButton />
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
                The TM.30 is a notification that tells Thai Immigration where a foreigner is staying.
                It is your landlord&apos;s responsibility to file it - but if they don&apos;t, you are
                the one who will face problems at immigration.
              </p>
            </div>

            <div className="mt-10 space-y-8">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-extrabold text-slate-900">What is TM.30</h2>
                  <ExampleLink href="/examples/TM.30-example.png" label="Receipt example" />
                </div>
                <p className="mt-2 text-slate-700">
                  TM.30 is a form used to report where a foreigner is staying in Thailand. Under the Immigration Act of 1979, any
                  property owner, landlord, or hotel hosting a foreigner must notify immigration of that
                  foreigner&apos;s stay within 24 hours of arrival. It is not a visa and does not affect
                  how long you can stay. It simply tells the government where you live.
                </p>
              </div>

              {/* ✅ Bullet version */}
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Who is responsible</h2>

                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-teal-500 shrink-0" />
                    <span>Legally, the landlord or property owner must file the TM.30.</span>
                  </li>

                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-teal-500 shrink-0" />
                    <span>Hotels and serviced apartments file this automatically when you check in.</span>
                  </li>

                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-teal-500 shrink-0" />
                    <span>For private rentals, you may need to remind your landlord or assist them.</span>
                  </li>

                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-teal-500 shrink-0" />
                    <span>
                      Some landlords sign an authorisation letter allowing the foreigner or an agent to
                      file on their behalf.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">When must it be filed</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "When a foreigner first moves into a property - within 24 hours",
                    "When a foreigner returns to Thailand from abroad - within 24 hours",
                    "When a foreigner moves to a new address",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 rounded-full bg-teal-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-slate-700">
                  Even if you return to the same address after travelling abroad, a new TM.30 may be
                  required.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">How to file TM.30</h2>
                <div className="mt-4 space-y-4">
                  <div className="rounded-2xl border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-900">Online</h3>
                    <p className="mt-1 text-slate-700">
                      The landlord can register on the{" "}
                      <a
                        href="https://tm30.immigration.go.th"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-teal-700 underline underline-offset-2"
                      >
                        official TM.30 online portal <ExternalLink className="h-3.5 w-3.5" />
                      </a>{" "}
                      and file notifications digitally. This is the fastest method and provides a downloadable receipt which the foreigner should keep.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-900">In person</h3>
                    <p className="mt-1 text-slate-700">
                      The landlord (or authorized person) visits the local immigration office with the
                      documents. After filing, they receive a stamped receipt, the &quot;Receipt of
                      Notification&quot;, which the foreigner should keep.
                    </p>
                  </div>

                </div>
              </div>

              {/* ✅ Bullet version */}
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Why it matters to you</h2>

                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-teal-500 shrink-0" />
                    <span>The TM.30 receipt is required for visa extensions, including{" "}
                      <Link
                        href="/visa/marriage/extension-of-stay"
                        className="font-semibold text-teal-700 underline underline-offset-2"
                      >
                        marriage
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/visa/retirement/extension-of-stay"
                        className="font-semibold text-teal-700 underline underline-offset-2"
                      >
                        retirement
                      </Link>{" "}
                      visas.</span>
                  </li>

                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-teal-500 shrink-0" />
                    <span>It is often required for{" "}
                      <Link
                        href={{
                          pathname: "/guides/90-day-reporting",
                          query: {
                            returnTo: "/guides/tm30",
                            returnLabel: "Back to TM.30 Guide",
                          },
                        }}
                        className="font-semibold text-teal-700 underline underline-offset-2"
                      >
                        90-day reporting
                      </Link>.</span>
                  </li>

                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-teal-500 shrink-0" />
                    <span>Without it, your immigration application may be delayed or rejected.</span>
                  </li>

                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-teal-500 shrink-0" />
                    <span>Some hospitals request it when processing insurance claims.</span>
                  </li>
                </ul>
              </div>

              {/* ✅ Bullet version */}
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">What happens if it is not filed</h2>

                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-teal-500 shrink-0" />
                    <span>Landlords may face fines of up to 10,000 THB for the first offence.</span>
                  </li>

                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-teal-500 shrink-0" />
                    <span>Foreigners may face problems extending visas or completing{" "}
                      <Link
                        href={{
                          pathname: "/guides/90-day-reporting",
                          query: {
                            returnTo: "/guides/tm30",
                            returnLabel: "Back to TM.30 Guide",
                          },
                        }}
                        className="font-semibold text-teal-700 underline underline-offset-2"
                      >
                        90-day reporting
                      </Link>.</span>
                  </li>

                  <li className="flex items-start gap-3 text-slate-700">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-teal-500 shrink-0" />
                    <span>Enforcement varies by immigration office.</span>
                  </li>
                </ul>
              </div>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="mt-4 space-y-3">
                  {FAQS.map((faq, idx) => (
                    <AccordionItem
                      key={faq.question}
                      value={`faq-${idx + 1}`}
                      className="rounded-2xl border border-slate-200 bg-white px-4"
                    >
                      <AccordionTrigger className="text-base font-bold text-slate-900 hover:no-underline">
                        <span className="min-w-0">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-slate-700">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </div>

            <div className="mt-10 rounded-lg bg-amber-50 border-l-4 border-amber-500 p-5">
              <div className="font-bold text-amber-900">Good to know</div>
              <div className="mt-2 text-sm text-amber-900 space-y-1">
                <p>
                  TM.30 records where you live, while 90-day reporting confirms you are still at that
                  address.
                </p>
                <p>
                  Hotels and serviced apartments file TM.30 automatically - you don&apos;t need to do
                  anything.
                </p>
                <p>
                  Keep a copy of your Receipt of Notification safe - you will need it at immigration.
                </p>
                
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="py-8 text-xs text-slate-500">
          <Separator className="mb-4" />
          Information based on official Thai Immigration Bureau guidelines. Always check with your local
          immigration office for the latest requirements.
        </div>
      </div>
    </div>
  );
}
