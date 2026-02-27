import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CarFront, ExternalLink } from "lucide-react";
import GuideBackButton from "@/components/guide-back-button";

const DLT_NEW_LICENSE_URL = "https://www.dlt.go.th/en/new-license";
const DLT_TWO_YEAR_LICENSE_URL = "https://www.dlt.go.th/en/two-year-license";
const DLT_SMART_QUEUE_URL = "https://gecc.dlt.go.th/";

const FAQS = [
  {
    question: "Can foreigners get a Thai driving licence?",
    answer:
      "Yes. Foreigners can apply for a Thai driving licence if they meet DLT requirements and provide the required identity, immigration status, and address documents.",
  },
  {
    question: "Do I need a residence certificate or work permit?",
    answer:
      "In many cases, yes. DLT offices commonly ask for proof of Thai address, often a residence certificate or a valid work permit showing your address. Confirm your local office's requirement before going.",
  },
  {
    question: "Can I convert my foreign licence instead of taking all tests?",
    answer:
      "Often yes, depending on your licence type and local DLT office rules. Some applicants can convert a valid foreign licence (or use an international driving permit) with fewer tests than first-time applicants.",
  },
  {
    question: "Do requirements vary by DLT office?",
    answer:
      "Yes. Booking systems, accepted documents, translations, and test requirements can vary by office. Always check your local DLT office and the official DLT page before attending.",
  },
] as const;

export const metadata: Metadata = {
  title: "How Foreigners Can Get a Driving Licence in Thailand",
  description:
    "A practical guide for foreigners applying for a Thai driving licence: documents, common tests, conversion options, and what to expect at the DLT office.",
};

export default function ThaiDrivingLicenceGuidePage() {
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
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-100">
                <CarFront className="h-6 w-6 text-sky-700" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                How Foreigners Can Get a Driving Licence in Thailand
              </h1>
            </div>

            <div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 sm:p-6">
              <p className="text-base font-semibold text-sky-900 sm:text-lg">
                Foreigners can apply for a Thai driving licence through the Department of Land Transport (DLT), but the
                exact documents and steps can vary by office.
              </p>
              <p className="mt-3 text-sm text-sky-900/80">
                Use this guide as a practical checklist, then confirm the latest requirements with your local DLT office
                and the official DLT page before booking or attending.
              </p>
            </div>

            <div className="mt-8 space-y-8 sm:mt-10">
              <section>
                <h2 className="text-xl font-extrabold text-slate-900">What this guide covers</h2>
                <p className="mt-2 text-slate-700">
                  This page is for foreigners applying for a Thai driving licence, including both first-time applicants
                  and people converting a valid foreign licence. The process can differ depending on whether you are
                  applying for a car licence, motorcycle licence, or both. Common minimum ages often referenced are 18+ for car licences and 15+ for motorcycle licences
                </p>
                
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Common documents foreigners are asked for</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "Passport (original) plus copies of bio page and current visa/extension stamp",
                    "Proof of Thai address (commonly a residence certificate or work permit, depending on your case)",
                    "Medical certificate (from a clinic/hospital, usually recent and commonly within 30 days)",
                    "Foreign driving licence (if converting) and copies",
                    "International Driving Permit (if you have one and your office accepts it for conversion process support)",
                    "Passport-size photos if requested (some offices take photos on site)",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-sky-600" />
                      <span className="min-w-0">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  Address documents are one of the most common reasons for delays. Bring originals and signed copies.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Typical process at the DLT office</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "Check whether your local DLT office requires an online booking before walk-in (some use DLT Smart Queue).",
                    "Submit documents and complete the application at the counter.",
                    "Complete physical screening tests (commonly color blindness, reaction, and depth/peripheral vision tests).",
                    "Complete required training/theory steps if applicable.",
                    "Take theory and/or practical test if your case requires it.",
                    "Pay the licence fee and collect your licence card.",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-sky-600" />
                      <span className="min-w-0">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  Queue/booking system (commonly used):{" "}
                  <a
                    href={DLT_SMART_QUEUE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-sky-700 underline underline-offset-2"
                  >
                    DLT Smart Queue <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">First-time vs conversion applications</h2>
                <div className="mt-3 space-y-3 text-slate-700">
                  <p>
                    <span className="font-semibold text-slate-900">First-time applicants:</span> usually complete the
                    full process, which may include training, theory testing, and practical testing depending on the
                    licence category.
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Conversion applicants:</span> if you hold a valid
                    foreign licence, some offices may reduce parts of the testing process. Requirements vary by office
                    and by the documents you provide.
                  </p>
                  <p>
                    Many applicants are first issued a temporary Thai licence before later upgrading/renewing to a
                    longer-validity licence. Check the official DLT pages for the licence type and validity that applies
                    to your case.
                  </p>
                  <p className="text-sm text-slate-600">
                    Practical note: many guides report a temporary 2-year licence first, followed by a later 5-year
                    renewal, but your exact path depends on your documents and office procedure.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Test and fee expectations (office-dependent)</h2>
                <div className="mt-3 space-y-3 text-slate-700">
                  <p>
                    If you are not converting from a qualifying foreign licence, you may be asked to complete theory and
                    practical testing after the physical screening tests.
                  </p>
                  <p>
                    Some practical guides report the theory test as 50 multiple-choice questions with a passing score of
                    45, but confirm the latest format and score requirement with DLT.
                  </p>
                  <p>
                    Fees vary by licence type and can change. Check the DLT page or your local office for the latest
                    official fee schedule before attending.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Common issues to avoid</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "Turning up without the correct address proof",
                    "Bringing copies but not originals",
                    "Assuming one DLT office follows the same rules as another",
                    "Missing a booking requirement or arriving late for test slots",
                    "Not checking whether translation/notarization is needed for your foreign licence",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-sky-600" />
                      <span className="min-w-0">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Official source</h2>
                <p className="mt-2 text-slate-700">
                  The Department of Land Transport publishes guidance for new licence applications and temporary
                  two-year licences here:
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <a
                    href={DLT_NEW_LICENSE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-sky-700 underline underline-offset-2"
                  >
                    DLT New License Page <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={DLT_TWO_YEAR_LICENSE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-sky-700 underline underline-offset-2"
                  >
                    DLT Two-Year License Page <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <p className="mt-4 text-xs text-slate-500">
                  Additional practical cross-check used for this guide: Roojai driving guide article (non-government
                  source). DLT pages remain the primary source for final requirements.
                </p>
              </section>

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
          </CardContent>
        </Card>

        <div className="py-8 text-xs text-slate-500">
          <Separator className="mb-4" />
          DLT requirements and local office practices can change. Always confirm with your local DLT office before you
          attend.
        </div>
      </div>
    </div>
  );
}
