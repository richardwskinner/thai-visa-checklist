import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExternalLink, Plane } from "lucide-react";
import { Suspense } from "react";
import GuideBackButton from "@/components/guide-back-button";
import { ShareInline } from "@/components/share-bar";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Thailand Digital Arrival Card (TDAC)",
  description:
    "Everything you need to know about the Thailand Digital Arrival Card (TDAC), including who must complete it and when to submit it before arrival.",
  path: "/tdac",
});

const FAQS = [
  {
    question: "Who needs to complete TDAC?",
    answer:
      "All foreign nationals entering Thailand must complete the TDAC before arrival. Thai citizens do not need to complete it.",
  },
  {
    question: "When should I complete TDAC?",
    answer:
      "You can submit it at any time within 72 hours before arrival, including on the day you arrive in Thailand.",
  },
  {
    question: "Do you have to pay to submit your TDAC?",
    answer:
      "No. The TDAC is completely free. You should not be charged any fee to submit it.",
  },
  {
    question: "Do children need TDAC?",
    answer:
      "Yes. Each traveler requires their own submission, including minors.",
  },
  {
    question: "Do I need to complete TDAC every time I enter Thailand?",
    answer:
      "Yes. A new TDAC must be completed for each entry into Thailand.",
  },
  {
    question: "What happens if I do not complete TDAC?",
    answer:
      "You may be delayed at immigration and asked to complete it before being processed.",
  },
] as const;

export default function TDACPage() {
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
      <div className="mx-auto w-full max-w-5xl overflow-hidden px-4 sm:px-5">
        {/* Top actions */}
        <div className="flex items-center gap-2 pt-6 sm:pt-8 md:justify-between md:gap-3">
          <div className="flex-1 md:flex-none">
            <GuideBackButton fallbackHref="/" fallbackLabel="Back to Home" />
          </div>
          <div className="shrink-0">
            <Suspense fallback={null}>
              <ShareInline />
            </Suspense>
          </div>
        </div>

        {/* Main content */}
        <Card className="mt-4 rounded-3xl border-0 bg-white shadow-sm sm:mt-6">
          <CardContent className="p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100">
                  <Plane className="h-6 w-6 text-amber-700" />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                  Thailand Digital Arrival Card (TDAC)
                </h1>
              </div>

              <div className="md:shrink-0">
                <a
                  href="https://tdac.immigration.go.th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-6 py-3 text-base font-bold text-white shadow-md transition hover:bg-amber-600 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Submit your TDAC <ExternalLink className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 p-6">
              <p className="text-lg font-semibold text-amber-900">
                Since 1 May 2025, all non-Thai nationals must complete the TDAC online for free before entering Thailand by air, land, or sea. No more paper arrival cards (TM.6).
              </p>
            </div>

            {/* Key info */}
            <div className="mt-10 space-y-8">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">When to submit</h2>
                <p className="mt-2 text-slate-700">
                  Submit your TDAC up to 3 days (72 hours) before your arrival in Thailand, including the day of arrival. You must submit a new one every time you enter Thailand, it is single-use only.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Who needs to submit</h2>
                <p className="mt-2 text-slate-700">
                  All non-Thai nationals, regardless of visa type, nationality, or mode of transport. This includes tourists, visa holders, and residents returning from abroad.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">What you need to fill it out</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "Passport details",
                    "Personal information",
                    "Travel details (flight number, port of entry)",
                    "Accommodation address in Thailand",
                    "Health declaration - List all the countries/territories you have stayed within 2 weeks before arrival",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">After you submit</h2>
                <p className="mt-2 text-slate-700">
                  You will receive your TDAC with a QR code via email. If requested, you can show it on your phone at immigration, no need to print it. You can also update your information at any time before arrival, except for your name, nationality, and date of birth.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Group submissions</h2>
                <p className="mt-2 text-slate-700">
                  You can submit for family members or a group, up to 10 people per submission. The accommodation and travel details can be copied from the first traveler.
                </p>
              </div>
            </div>

            <section className="mt-10">
              <h2 className="text-xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
              <Accordion type="multiple" className="mt-4 space-y-3">
                {FAQS.map((faq) => (
                  <AccordionItem
                    key={faq.question}
                    value={faq.question}
                    className="rounded-2xl border border-slate-200 bg-white px-4"
                  >
                    <AccordionTrigger className="text-base font-bold text-slate-900 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-slate-700">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Important notes */}
            <div className="mt-10 rounded-lg bg-amber-50 border-l-4 border-amber-500 p-5">
              <div className="font-bold text-amber-900">Good to know</div>
              <div className="mt-2 text-sm text-amber-900 space-y-1">
                <p>All details must be entered in English.</p>
                <p>The TDAC is not a visa, it is a digital arrival card, you still need the correct visa or exemption eligibility.</p>
                <p>It takes about 3–5 minutes to fill out if you have your info ready.</p>
                <p>The TDAC is completely free. You should not be charged any fee to submit it.</p>
              </div>
            </div>

            {/* Second CTA */}
            <div className="mt-8">
              <p className="mt-3 text-sm text-slate-500">
                Official Thai Immigration Bureau website -{" "}
                <a
                  href="https://tdac.immigration.go.th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800"
                >
                  tdac.immigration.go.th
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="py-8 text-xs text-slate-500">
          <Separator className="mb-4" />
          Information based on the official Thai Immigration Bureau guidelines. Always check the official site for the latest updates.
        </div>
      </div>
    </div>
  );
}
