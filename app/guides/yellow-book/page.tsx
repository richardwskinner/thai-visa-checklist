import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Home } from "lucide-react";
import type { Metadata } from "next";
import ExampleLink from "@/components/example-link";
import GuideBackButton from "@/components/guide-back-button";

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
          <GuideBackButton />
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
                The Yellow Book (often called a Tabien Baan or Thor.Ror.13 house registration book) is an official Thai house registration record for foreign residents.
                It is not a visa, but it can make many administrative tasks easier.
              </p>
            </div>

            <div className="mt-10 space-y-8">
              <section>
                <h2 className="text-xl font-extrabold text-slate-900">What is it</h2>
                <p className="mt-2 text-slate-700">
                  The Yellow Book (Tabien Baan) records that a foreigner lives at a specific Thai address.
                  It is issued by the local district office (Amphur/Khet). It does not replace your passport, visa status, 90-day reporting, and does not grant residency rights. Thailand’s house registration system has two main types: the blue Tabien Baan (for Thai citizens/permanent residents) and the yellow Tabien Baan (Thor.Ror.13) for foreign residents.
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
                    "Passport and copies (bio page, visa and latest entry stamp)",
                    "Notarised copy of your passport and Thai translation",
                    "Proof of address (Blue House Book copy, ownership papers, or rental contract)",
                    "House owner's ID card + presence at the office (commonly required)",
                    "TM.30 receipt (often requested)",
                    "Marriage certificate (if applying via Thai spouse address)",
                    "Thai witness(es) (in some districts)",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                      <span>
                        {item === "TM.30 receipt (often requested)" ? (
                          <>
                            {item}{" "}
                            <ExampleLink
                              href="/examples/TM.30-example.png"
                              label="View example"
                              className="ml-1"
                            />
                          </>
                        ) : (
                          item
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">How the process usually works</h2>
                <ol className="mt-3 space-y-3">
                  {[
                    "Call or visit your local district office (Amphur/Khet) to enquire about the required documents",
                    "Visit your local district office with original documents",
                    "Submit the application and supporting copies",
                    "The office verifies your address and eligibility and may request additional documents",
                    "If approved, the Yellow Book can be issued the same day or scheduled for collection",
                  ].map((step, index) => (
                    <li key={step} className="flex items-start gap-3 text-slate-700">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-3 text-slate-700">
                  Processing time varies depending on the district office.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">
                  What can it be used for?
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
                      <span>
                        {item === "Applying for a Pink ID card (Foreigner ID)" ? (
                          <>
                            Applying for a{" "}
                            <Link
                              href={{
                                pathname: "/guides/pink-id-card",
                                query: {
                                  returnTo: "/guides/yellow-book",
                                  returnLabel: "Back to Yellow Book Guide",
                                },
                              }}
                              className="font-semibold text-amber-700 underline underline-offset-2"
                            >
                              Pink ID card
                            </Link>
                            {" "}(Foreigner ID)
                          </>
                        ) : (
                          item
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="mt-4 space-y-3">
                  <AccordionItem value="faq-1" className="rounded-2xl border border-slate-200 bg-white px-4">
                    <AccordionTrigger className="text-base font-bold text-slate-900 hover:no-underline">
                      <span className="min-w-0">Do I need to own property to apply?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-slate-700">
                      No. You can be registered at a rented property if the owner cooperates and attends the district
                      office.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-2" className="rounded-2xl border border-slate-200 bg-white px-4">
                    <AccordionTrigger className="text-base font-bold text-slate-900 hover:no-underline">
                      <span className="min-w-0">Does the Yellow Book replace TM.30?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-slate-700">
                      No. TM.30 is an immigration requirement for reporting a foreigner&apos;s address. The Yellow
                      Book is a civil registration document. They are separate systems.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-3" className="rounded-2xl border border-slate-200 bg-white px-4">
                    <AccordionTrigger className="text-base font-bold text-slate-900 hover:no-underline">
                      <span className="min-w-0">Does it replace 90-day reporting?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-slate-700">
                      No. You must still complete 90-day reporting if required by your visa type.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-4" className="rounded-2xl border border-slate-200 bg-white px-4">
                    <AccordionTrigger className="text-base font-bold text-slate-900 hover:no-underline">
                      <span className="min-w-0">What happens if I move to a new address?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-slate-700">
                      You must update your registration at the new district office. You can only be registered at one
                      address at a time.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-5" className="rounded-2xl border border-slate-200 bg-white px-4">
                    <AccordionTrigger className="text-base font-bold text-slate-900 hover:no-underline">
                      <span className="min-w-0">How much does it cost?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-slate-700">
                      There is usually no significant official fee, but minor administrative fees may apply depending
                      on the district office.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faq-6" className="rounded-2xl border border-slate-200 bg-white px-4">
                    <AccordionTrigger className="text-base font-bold text-slate-900 hover:no-underline">
                      <span className="min-w-0">Does the Yellow Book give me permanent residency?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-slate-700">
                      No. It does not grant permanent residency, citizenship, or any immigration status. It only
                      records your address in the Thai house registration system.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>
            </div>

            <div className="mt-10 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-5">
              <div className="font-bold text-amber-900">Good to know</div>
              <div className="mt-2 space-y-1 text-sm text-amber-900">
                <p>
                  Requirements vary significantly by district office, it is best to call in advance to confirm what
                  they require.
                </p>
                <p>
                  The Yellow Book does not replace{" "}
                  <Link
                    href={{
                      pathname: "/guides/90-day-reporting",
                      query: {
                        returnTo: "/guides/yellow-book",
                        returnLabel: "Back to Yellow Book Guide",
                      },
                    }}
                    className="font-semibold text-amber-700 underline underline-offset-2"
                  >
                    90-day reporting
                  </Link>{" "}
                  or{" "}
                  <Link
                    href={{
                      pathname: "/guides/tm30",
                      query: {
                        returnTo: "/guides/yellow-book",
                        returnLabel: "Back to Yellow Book Guide",
                      },
                    }}
                    className="font-semibold text-amber-700 underline underline-offset-2"
                  >
                    TM.30
                  </Link>
                  .
                </p>
                <p>Moving address requires re-registration at the new district office.</p>
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
