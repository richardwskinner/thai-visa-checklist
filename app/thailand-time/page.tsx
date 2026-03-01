import type { Metadata } from "next";
import Script from "next/script";
import { Card, CardContent } from "@/components/ui/card";
import ThailandTimeClient from "./ThailandTimeClient";

const THAILAND_TIME_URL = "https://thaivisachecklist.com/thailand-time";

export const metadata: Metadata = {
  title: "Thailand Time (ICT) - Thailand Time Now",
  description:
    "Check the current Thailand time now (ICT, UTC+7), compare it with your local time, and use a quick Thailand time converter.",
  alternates: {
    canonical: THAILAND_TIME_URL,
  },
  openGraph: {
    title: "Thailand Time (ICT) - Thailand Time Now",
    description:
      "Live Thailand time (ICT, UTC+7) with local time comparison and quick converter.",
    url: THAILAND_TIME_URL,
  },
  twitter: {
    title: "Thailand Time (ICT) - Thailand Time Now",
    description:
      "Live Thailand time (ICT, UTC+7) with local time comparison and quick converter.",
  },
};

const FAQS = [
  {
    question: "What time zone is Thailand in?",
    answer: "Thailand uses ICT (Indochina Time), which is UTC+7 all year.",
  },
  {
    question: "Does Thailand use daylight saving time?",
    answer: "No. Thailand does not observe daylight saving time.",
  },
  {
    question: "Does Thailand have more than one time zone?",
    answer: "No. Thailand uses one time zone nationwide.",
  },
  {
    question: "Is Bangkok time the same as all of Thailand?",
    answer: "Yes. Thailand uses one standard time zone nationwide.",
  },
  {
    question: "What does ICT mean in Thailand time?",
    answer: "ICT means Indochina Time, the standard time zone used by Thailand (UTC+7).",
  },
  {
    question: "Why does Thailand use UTC+7?",
    answer:
      "Thailand adopted UTC+7 as its standard time to align with neighbouring countries like Vietnam, Cambodia, and Laos. Having a shared time zone simplifies trade, transport, broadcasting, and government coordination across the region.",
  },
  {
    question: "Why is it called Indochina Time?",
    answer:
      "The name “Indochina Time” comes from the historic geographic region of Indochina in mainland Southeast Asia. Although Thailand was never colonised, it shares the same regional time band as Vietnam, Cambodia, and Laos. The term is now simply an international time zone label used to describe UTC+7 across this part of the world.",
  },
  {
    question: "How many hours ahead of UTC is Thailand?",
    answer: "Thailand is 7 hours ahead of UTC (UTC+7).",
  },
] as const;

export default function ThailandTimePage() {
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
    <div className="min-h-screen bg-slate-50">
      <Script
        id="thailand-time-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto w-full max-w-5xl px-4 pt-8 sm:px-5 sm:pt-10">
        <Card className="rounded-3xl border-0 bg-white shadow-sm">
          <CardContent className="p-4 sm:p-10">
            <div>
              <ThailandTimeClient />
            </div>

            <section className="mt-8">
              <h2 className="text-xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
              <div className="mt-4 space-y-3">
                {FAQS.map((faq) => (
                  <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-base font-bold text-slate-900">
                      <span className="min-w-0">{faq.question}</span>
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-slate-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
