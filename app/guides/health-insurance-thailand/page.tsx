import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HeartPulse, ExternalLink, ShieldPlus, Siren } from "lucide-react";
import GuideBackButton from "@/components/guide-back-button";
import SafetyWingWidget from "@/components/safetywing-widget";
import { createRouteMetadata } from "@/lib/seo";

const NHSO_URL = "https://eng.nhso.go.th";
const SSO_URL = "https://www.sso.go.th/wpr/eng";
const THAI_RED_CROSS_HIV_TESTING_URL = "https://th.aidsid.or.th/medical-examination-service/";
const BUMRUNGRAD_URL = "https://www.bumrungrad.com/en";
const BANGKOK_HOSPITAL_URL = "https://www.bangkokhospital.com/en";
const SAMITIVEJ_URL = "https://www.samitivejhospitals.com";
const AXA_HEALTH_URL = "https://www.axa.co.th/en/personal/health-insurance";
const SAFETYWING_URL =
  "https://explore.safetywing.com/Nomad-insurance-complete/?referenceID=26491026&utm_source=26491026&utm_medium=Ambassador";

const FAQS = [
  {
    question: "Do most foreigners in Thailand use private health insurance?",
    answer:
      "Yes. Because public healthcare access for foreigners is limited, many expats and long-term visitors rely on private insurance to cover treatment at private hospitals and clinics.",
  },
  {
    question: "Can foreigners use Thailand's universal healthcare scheme?",
    answer:
      "In general, Thailand's Universal Coverage Scheme is for Thai citizens. Most foreigners are not eligible, which is why private insurance is commonly used.",
  },
  {
    question: "What is the difference between cashless treatment and reimbursement?",
    answer:
      "Cashless treatment means the hospital bills the insurer directly. Reimbursement means you pay first and then claim the money back from the insurer later.",
  },
  {
    question: "Is SafetyWing the same as a full local Thai health insurance policy?",
    answer:
      "Not exactly. SafetyWing is commonly used by digital nomads and remote workers as a flexible travel medical-style plan, while local Thai health insurance is usually designed for longer-term treatment in Thailand.",
  },
  {
    question: "Do insurance plans usually cover pre-existing conditions?",
    answer:
      "Often no, or only with restrictions. Pre-existing conditions, waiting periods, and coverage limits vary by insurer and policy, so always read the exclusions carefully.",
  },
] as const;

const localInsuranceExamples = ["AIA Thailand", "AXA Thailand", "Muang Thai Insurance"] as const;
const internationalInsuranceExamples = ["Cigna Global", "Allianz Care", "SafetyWing"] as const;

export const metadata = createRouteMetadata({
  title: "Health Insurance in Thailand",
  description:
    "A practical guide to health insurance in Thailand for expats and visitors, including public options, private insurance, costs, exclusions, claims, and emergency medical numbers.",
  path: "/guides/health-insurance-thailand",
});

export default function HealthInsuranceThailandGuidePage() {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mx-auto w-full max-w-5xl px-4 sm:px-5">
        <div className="pt-6 sm:pt-8">
          <GuideBackButton />
        </div>

        <Card className="mt-4 rounded-3xl border-0 bg-white shadow-sm sm:mt-6">
          <CardContent className="p-4 sm:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100">
                <HeartPulse className="h-6 w-6 text-emerald-700" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Health Insurance in Thailand
              </h1>
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
              <p className="text-base font-semibold text-emerald-900 sm:text-lg">
                Hospitals in Thailand are operated by both public and private providers. The country is known for
                modern healthcare and strong private hospitals, especially in major cities.
              </p>
              <p className="mt-3 text-base font-semibold text-emerald-900 sm:text-lg">
                However, even a short visit to a private hospital can add up. So if you live in Thailand long-term or
                travel here frequently, having health insurance is strongly recommended.
              </p>
            </div>

            <div className="mt-8 space-y-8 sm:mt-10">
              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Quick overview</h2>
                <div className="mt-3 space-y-3 text-slate-700">
                  <p>
                    Without trying to alarm anyone, there are regular news reports of foreigners sustaining injuries in
                    Thailand, particularly motorbike accidents, and later facing medical bills they cannot afford to pay. Having appropriate health
                    insurance can help protect you from these unexpected costs and make accessing treatment much
                    easier.
                  </p>
                  <p>
                    Thailand has a wide range of hospitals, from government hospitals where fees are very affordable
                    but English may be limited, to private hospitals that cater to international patients with
                    English-speaking doctors, modern equipment, and dedicated international patient services.
                  </p>
                  <p>
                    Well-known private hospitals include{" "}
                    <a
                      href={BUMRUNGRAD_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-emerald-700 underline underline-offset-2"
                    >
                      Bumrungrad International Hospital
                    </a>
                    ,{" "}
                    <a
                      href={BANGKOK_HOSPITAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-emerald-700 underline underline-offset-2"
                    >
                      Bangkok Hospital
                    </a>
                    , and{" "}
                    <a
                      href={SAMITIVEJ_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-emerald-700 underline underline-offset-2"
                    >
                      Samitivej Sukhumvit Hospital
                    </a>
                    .
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Public healthcare options</h2>

                <div className="mt-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-bold text-slate-900">Social Security (SSO)</h3>
                    <p className="mt-2 text-slate-700">
                      If you are employed in Thailand with a work permit, SSO registration is generally mandatory and
                      your employer will normally register you with the Social Security Office (SSO). This can give
                      you access to treatment through a designated hospital.
                    </p>
                    <div className="mt-3 grid gap-2">
                      {[
                        "Hospital treatment",
                        "Surgery",
                        "Medication",
                        "Maternity care",
                        "Disability benefits",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-3 text-slate-700">
                          <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-sm text-slate-600">
                      Limitations can include using a registered hospital, coverage limits for some treatments, and
                      longer waits than private hospitals. Sickness benefits require 3 months of contributions within
                      a 15-month period. Most foreigners are not covered by Thailand&apos;s wider universal healthcare
                      system, which is why many expats still choose private insurance even when they have SSO access.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Private health insurance in Thailand</h2>
                <p className="mt-3 text-slate-700">
                  Private insurance is the most common option for foreigners living in Thailand. The two main
                  categories are local Thai insurance and international insurance.
                </p>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h3 className="text-lg font-bold text-slate-900">Local Thai insurance</h3>
                    <p className="mt-2 text-sm text-slate-700">
                      Examples: {localInsuranceExamples.join(", ")}
                    </p>
                    <div className="mt-4 space-y-3">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-slate-900">Benefits</p>
                        <div className="mt-2 grid gap-2">
                          {[
                            "Generally cheaper than international plans",
                            "Strong local hospital networks",
                            "Suitable for residents living long-term in Thailand",
                            "Often easier to manage claims and support within Thailand",
                          ].map((item) => (
                            <div key={item} className="flex items-center gap-3 text-slate-900">
                              <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-slate-900">Downside</p>
                        <div className="mt-2 grid gap-2">
                          {[
                            "Lower annual coverage limits",
                          ].map((item) => (
                            <div key={item} className="flex items-center gap-3 text-slate-900">
                              <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h3 className="text-lg font-bold text-slate-900">International insurance</h3>
                    <p className="mt-2 text-sm text-slate-700">
                      Examples: {internationalInsuranceExamples.join(", ")}
                    </p>
                    <div className="mt-4 space-y-3">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-slate-900">Benefits</p>
                        <div className="mt-2 grid gap-2">
                          {[
                            "Higher coverage limits",
                            "Treatment in multiple countries",
                            "Evacuation and emergency travel benefits",
                            "English-language support and international hospital networks",
                          ].map((item) => (
                            <div key={item} className="flex items-center gap-3 text-slate-900">
                              <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-slate-900">Downside</p>
                        <div className="mt-2 grid gap-2">
                          <div className="flex items-center gap-3 text-slate-900">
                            <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                            <span>Premiums are usually higher than local plans</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Inpatient vs Outpatient Coverage</h2>
                <p className="mt-3 text-slate-700">
                  Health insurance plans in Thailand often separate inpatient (IPD) and outpatient (OPD) treatment.
                </p>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-bold text-slate-900">Inpatient (IPD)</h3>
                    <p className="mt-2 text-slate-700">
                      Treatment where you are admitted to a hospital and stay overnight. This usually includes:
                    </p>
                    <div className="mt-3 grid gap-2 text-slate-700">
                      {["Surgery", "Hospital stays", "Emergency treatment", "ICU care"].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-slate-600">
                      Most insurance policies focus primarily on inpatient coverage.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-bold text-slate-900">Outpatient (OPD)</h3>
                    <p className="mt-2 text-slate-700">
                      Treatment where you visit a doctor or clinic but are not admitted to the hospital, such as:
                    </p>
                    <div className="mt-3 grid gap-2 text-slate-700">
                      {["Doctor consultations", "Prescription medication", "Minor treatments", "Follow-up visits"].map(
                        (item) => (
                          <div key={item} className="flex items-center gap-3">
                            <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                            <span>{item}</span>
                          </div>
                        )
                      )}
                    </div>
                    <p className="mt-4 text-sm text-slate-600">
                      OPD coverage is often optional and can increase the cost of insurance plans.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Cashless treatment vs reimbursement</h2>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-bold text-slate-900">Cashless treatment</h3>
                    <div className="mt-3 grid gap-2 text-slate-700">
                      {[
                        "Hospital bills insurer directly",
                        "Patient usually pays nothing upfront",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-bold text-slate-900">Reimbursement</h3>
                    <div className="mt-3 grid gap-2 text-slate-700">
                      {[
                        "Patient pays hospital first",
                        "Insurance reimburses later after claim submission",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                  <h2 className="text-xl font-extrabold text-slate-900">SafetyWing insurance</h2>
                  <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10 lg:items-start">
                    <div className="max-w-[54ch] space-y-3 text-slate-900">
                      <p>
                        SafetyWing is a popular option among digital nomads and remote workers in Thailand. It is
                        commonly used more like flexible travel medical coverage than a traditional local annual health
                        policy. If you want to check current plans, you can{" "}
                        have a look here{" "}
                        <a
                          href={SAFETYWING_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-emerald-700 underline underline-offset-2"
                        >
                          SafetyWing
                        </a>
                        .
                      </p>
                      <p>Why many expats use SafetyWing:</p>
                      <div className="grid gap-2">
                        {[
                          "Monthly subscription rather than annual policy",
                          "Designed for digital nomads and remote workers",
                          "Coverage while travelling between countries",
                          "Can be purchased even after you have started travelling",
                          "Simple online signup",
                        ].map((item) => (
                          <div key={item} className="flex items-center gap-3">
                            <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-slate-700">
                        Pricing and benefits vary by age and plan. Many travellers use SafetyWing when first arriving
                        in Thailand or while moving between countries before choosing longer-term insurance.
                      </p>
                    </div>

                    <div className="mx-auto flex w-full max-w-[320px] flex-col items-center sm:max-w-[380px] lg:-mt-8 lg:ml-2 lg:mx-0 lg:max-w-none">
                      <SafetyWingWidget affiliateId="26491026" scale="0.9" />
                    </div>

                    <a
                      href={SAFETYWING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View SafetyWing plans"
                      className="mx-auto mt-3 block w-full max-w-[320px] sm:max-w-[420px] lg:col-span-2 lg:-mt-8 lg:max-w-[68%]"
                    >
                      <Image
                        src="/SafetyWing-button-promo-2.png"
                        alt="View SafetyWing plans"
                        width={1459}
                        height={334}
                        className="h-auto w-full"
                      />
                    </a>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Thai Red Cross HIV testing</h2>
                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-slate-700">
                    If you want HIV testing in Bangkok, the Thai Red Cross AIDS and Infectious Diseases Research
                    Centre&apos;s Anonymous Clinic is a well-known option for HIV and STI screening.
                  </p>
                  <div className="mt-4 grid gap-2 text-slate-700">
                    {[
                      "Weekdays: Monday to Friday",
                      "Hours: 08:30 to 14:00",
                      "Lunch break: 12:00 to 13:00",
                      "Closed: weekends and public holidays",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-slate-600">
                    Check the official clinic page before visiting, as services and hours can change.
                  </p>
                  <a
                    href={THAI_RED_CROSS_HIV_TESTING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 underline underline-offset-2"
                  >
                    Thai Red Cross HIV testing information <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </section>

              <section>
                <div className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100">
                      <Siren className="h-5 w-5 text-red-700" />
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-red-900">Emergency medical number</h2>
                      <p className="mt-2 text-red-900/90">
                        In a medical emergency in Thailand, call <span className="font-bold">1669</span> for emergency
                        medical assistance and ambulance services.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

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

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Official and reference links</h2>
                <div className="mt-3 flex flex-col gap-2">
                  {[
                    { label: "Thailand Social Security Office (SSO)", href: SSO_URL },
                    { label: "National Health Security Office (NHSO)", href: NHSO_URL },
                    { label: "SafetyWing", href: SAFETYWING_URL },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 underline underline-offset-2"
                    >
                      {link.label} <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </section>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-200">
                    <ShieldPlus className="h-5 w-5 text-slate-700" />
                  </div>
                  <div className="text-sm leading-7 text-slate-700">
                    <p className="font-semibold text-slate-900">Important note</p>
                    <p className="mt-1">
                      Some Thai visas require proof of health insurance, particularly Non-OA Retirement visas and
                      Long-Term Resident (LTR) visas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 text-xs text-slate-500 sm:pt-10">
              <Separator className="mb-4" />
              This page is general guidance only and is not medical, legal, or insurance advice.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
