import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, PlaneTakeoff } from "lucide-react";
import type { Metadata } from "next";
import GuideBackButton from "@/components/guide-back-button";

export const metadata: Metadata = {
  title: "Re-Entry Permit in Thailand - How to protect Your Visa When You Travel outside of the country",
  description:
    "Everything you need to know about the Thailand re-entry permit. Single vs multiple, how to get one at the airport or immigration office, costs, and what happens if you forget.",
};

const TM8_URL = "https://www.immigration.go.th/wp-content/uploads/2022/10/5.%E0%B8%84%E0%B8%B3%E0%B8%82%E0%B8%AD%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%8D%E0%B8%B2%E0%B8%95%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%81%E0%B8%A5%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A1%E0%B8%B2%E0%B9%83%E0%B8%99%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%AD%E0%B8%B2%E0%B8%93%E0%B8%B2%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%A3%E0%B8%AD%E0%B8%B5%E0%B8%81-%E0%B8%95%E0%B8%A1.8.pdf";

function isSafeInternalPath(path: string) {
  return path.startsWith("/") && !path.startsWith("//");
}
const FAQS = [
  {
    question: "Can I get a re-entry permit at Chiangmai International Airport (CNX)?",
    answer:
      "Yes, it is commonly reported that the re-entry permit counter at CNX is open 24/7. It is located before immigration, on the right-hand side. Arrive early and confirm on the day in case airport procedures or staffing change.",
  },
  {
    question: "Can I get a re-entry permit at Suvarnabhumi Airport (BKK)?",
    answer:
      "Yes, it is commonly reported that the re-entry permit counter at Suvarnabhumi Airport (BKK) is open 24/7. You can apply for either a single or a multiple re-entry permit. It is located down the escalator to the right, after security, just before immigration. Arrive early and confirm on the day in case airport procedures or staffing change.",
  },
  {
    question: "Can I get a re-entry permit at Don Mueang International Airport (DMK)?",
    answer:
      "Yes, it is commonly reported that the re-entry permit counter at Don Mueang International Airport (DMK) is open 24/7. You can apply for either a single or a multiple re-entry permit. It is located just behind the immigration officers. Arrive early and confirm on the day in case airport procedures or staffing change.",
  },
  {
    question: "What happens if I leave Thailand without a re-entry permit?",
    answer:
      "Your extension of stay is automatically cancelled when you leave Thailand. You would need to apply for a new visa.",
  },
  {
    question: "How long is a re-entry permit valid?",
    answer:
      "It is valid until the expiry date of your current extension of stay, not 1 year from issue.",
  },
  
] as const;

export default async function ReEntryPermitPage({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string; returnLabel?: string }>;
}) {
  const params = await searchParams;
  const carryReturnContext =
    params.returnTo && isSafeInternalPath(params.returnTo)
      ? {
          returnTo: params.returnTo,
          returnLabel: params.returnLabel || "Back to Guide",
        }
      : undefined;
  const ninetyDayHref = carryReturnContext
    ? { pathname: "/guides/90-day-reporting", query: carryReturnContext }
    : "/guides/90-day-reporting";
  const tm30Href = carryReturnContext
    ? { pathname: "/guides/tm30", query: carryReturnContext }
    : "/guides/tm30";

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
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
                <PlaneTakeoff className="h-6 w-6 text-orange-600" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Re-Entry Permit in Thailand
              </h1>
            </div>

            <div className="mt-6 rounded-2xl bg-orange-50 border border-orange-200 p-6">
              <p className="text-lg font-semibold text-orange-900">
                If you leave Thailand without a re-entry permit, your permission to stay (extension of stay) will automatically be cancelled upon departure. This applies to single-entry and extended visas including retirement, marriage, work, and education visas.
              </p>
            </div>

            <div className="mt-10 space-y-8">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">What is a re-entry permit</h2>
                <p className="mt-2 text-slate-700">
                  A re-entry permit is an official stamp in your passport from Thai Immigration that allows you to leave Thailand and return without losing your current visa. It does not extend your visa or give you extra time - it simply preserves your existing visa status while you are abroad.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Who needs one</h2>
                <p className="mt-2 text-slate-700">
                  Anyone on a single-entry visa or extension of stay who plans to leave Thailand and return. This includes holders of Non-Immigrant O (retirement, marriage), Non-Immigrant B (work), education visas, and most extensions of stay. If you have a multiple-entry visa, you do not need a re-entry permit. Note that when you return to Thailand, your{" "}
                  <Link
                    href={ninetyDayHref}
                    className="font-semibold text-orange-700 underline underline-offset-2"
                  >
                    90-day reporting
                  </Link>{" "}
                  count resets from your new entry date and your landlord must file a new{" "}
                  <Link
                    href={tm30Href}
                    className="font-semibold text-orange-700 underline underline-offset-2"
                  >
                    TM.30
                  </Link>{" "}
                  within 24 hours.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Two types</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-orange-200 bg-orange-50/30 p-5">
                    <h3 className="font-bold text-slate-900">Single re-entry</h3>
                    <p className="mt-1 text-slate-700">One trip out and back. Valid until your visa expires.</p>
                    <p className="mt-2 text-2xl font-extrabold text-slate-900">1,000 THB</p>
                  </div>
                  <div className="rounded-2xl border border-orange-200 bg-orange-50/30 p-5">
                    <h3 className="font-bold text-slate-900">Multiple re-entry</h3>
                    <p className="mt-1 text-slate-700">Unlimited trips. Valid until your visa expires.</p>
                    <p className="mt-2 text-2xl font-extrabold text-slate-900">3,800 THB</p>
                  </div>
                </div>
                
              </div>

              <div>
  <h2 className="text-xl font-extrabold text-slate-900">What you need</h2>

  <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
    <li>Passport</li>
    <li>1x passport photo (4×6 cm)</li>
    <li>
      Photocopies: Passport bio page, visa page, and latest entry stamp (not always required).
    </li>
    <li>Fee in cash</li>
    <li>
      TM.8 form {" "}
      <a
        href={TM8_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 font-medium text-orange-700 underline underline-offset-2"
      >
        Download Form <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </li>
  </ul>
</div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Where to get one</h2>
                <div className="mt-4 space-y-4">
                  <div className="rounded-2xl border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-900">At the airport (same day as departure)</h3>
                    <p className="mt-1 text-slate-700">
                      All major international airports - Suvarnabhumi, Don Mueang, Chiang Mai, Phuket, and Hat Yai, have re-entry permit counters. Arrive early in case there is any delay.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-900">At any immigration office (in advance)</h3>
                    <p className="mt-1 text-slate-700">
                      You can apply any time while your current extension of stay is valid at your local immigration office. Bring a passport photo and all documents. Processing takes 10 minutes to an hour depending on the queue.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">When you return to Thailand</h2>
                <p className="mt-2 text-slate-700">
                  Make sure the immigration officer sees your re-entry permit stamp when you arrive back. When filling out the{" "}
                  <Link
                    href="/tdac"
                    className="font-semibold text-orange-700 underline underline-offset-2"
                  >
                    TDAC
                  </Link>
                  , enter your re-entry permit number in the visa number field.
                </p>
              </div>

              <section>
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
            </div>

            <div className="mt-10 rounded-lg bg-amber-50 border-l-4 border-amber-500 p-5">
              <div className="font-bold text-amber-900">Good to know</div>
              <div className="mt-2 text-sm text-amber-900 space-y-1">
                <p>You must get the re-entry permit before you leave Thailand - you cannot get one from abroad.</p>
                <p>The re-entry permit expires when your visa expires, not separately.</p>
                <p>A re-entry permit does not extend your stay, it only preserves it.</p>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="https://immigration.go.th/citizen_manual/guid_en5.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-orange-700 underline underline-offset-2"
              >
                Official Re-Entry Permit Guide (Thai Immigration PDF) <ExternalLink className="h-4 w-4" />
              </a>
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
