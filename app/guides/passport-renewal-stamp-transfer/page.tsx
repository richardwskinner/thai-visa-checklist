import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ExternalLink, IdCard } from "lucide-react";

export const metadata: Metadata = {
  title: "Renewing Your Passport in Thailand and Transferring Visa Stamps",
  description:
    "How to renew your passport in Thailand and transfer your visa, extension, and re-entry stamps to a new passport before your next immigration filing.",
};

const BANGKOK_TRANSFER_FORM_URL =
  "https://bangkok.immigration.go.th/wp-content/uploads/2021/08/Transfer-Stamp-to-New-Passport-Form.pdf";

const FAQS = [
  {
    question: "Should I renew my passport before my next yearly extension?",
    answer:
      "Yes. Many applicants renew first, then transfer stamps to the new passport, and then file the next extension using the newer passport.",
  },
  {
    question: "Do I need to transfer visa and re-entry stamps to my new passport?",
    answer:
      "In practice, yes. Immigration offices provide transfer-stamp forms and new-passport forms for this process. Bring both old and new passports.",
  },
  {
    question: "What documents are commonly requested for stamp transfer?",
    answer:
      "Commonly requested items include old and new passports, passport bio-page copies, latest entry and extension stamp copies, transfer form, and sometimes embassy/consulate confirmation documents depending on your case.",
  },
  {
    question: "Can requirements vary by immigration office?",
    answer:
      "Yes. Local offices can request additional copies or supporting documents. Confirm the latest checklist with your immigration office before you go.",
  },
] as const;

export default function PassportStampTransferGuidePage() {
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

      <div className="mx-auto w-full max-w-5xl overflow-hidden px-4 sm:px-5">
        <div className="pt-6 sm:pt-8">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-600 px-5 py-3 text-base font-medium text-white transition hover:bg-slate-700"
          >
            <ArrowLeft className="h-5 w-5" /> Back to Guides
          </Link>
        </div>

        <Card className="mt-4 rounded-3xl border-0 bg-white shadow-sm sm:mt-6">
          <CardContent className="p-4 sm:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-100">
                <IdCard className="h-6 w-6 text-rose-600" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Passport Renewal and Visa Stamp Transfer in Thailand
              </h1>
            </div>

            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
              <p className="text-base font-semibold text-amber-900 sm:text-lg">
                If your passport will expire before your next visa extension cycle, renew it first, then transfer your
                immigration stamps to the new passport before your next filing.
              </p>
              <p className="mt-3 text-sm text-amber-900/80">
                This is based on common immigration practice and published form availability. Final approval and document
                requirements remain at officer discretion.
              </p>
            </div>

            <div className="mt-8 space-y-8 sm:mt-10">
              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Why this matters</h2>
                <p className="mt-2 text-slate-700">
                  Many expats run into this when they hold a marriage or retirement extension but their passport validity
                  gets short. Renewing your passport and transferring stamps early helps avoid last-minute issues at your
                  next extension or re-entry filing.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Typical order of steps</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "Renew your passport with your embassy or consulate in Thailand.",
                    "Prepare old and new passports plus signed copies of key pages.",
                    "Complete transfer/new-passport forms used by your immigration office.",
                    "Visit your local immigration office to transfer current stamps.",
                    "Check all transferred details before leaving the counter.",
                    "Use the new passport for your next extension and re-entry applications.",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-rose-500" />
                      <span className="min-w-0">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Commonly requested documents</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "Old passport and new passport (originals)",
                    "Signed copies of old/new passport bio pages",
                    "Copy of latest entry stamp and current visa/extension stamp",
                    "Copy of re-entry permit page (if you have one)",
                    "Copy of TDAC / entry record (as requested by your office)",
                    "TM.30 copy (often requested by many offices)",
                    "Transfer Stamp to New Passport form",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-rose-500" />
                      <span className="min-w-0">{item}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm text-slate-600">
                  Also useful:{" "}
                  <Link href="/guides/re-entry-permit" className="font-semibold text-rose-700 underline underline-offset-2">
                    Re-entry permit guide
                  </Link>{" "}
                  and{" "}
                  <Link href="/guides/tm30" className="font-semibold text-rose-700 underline underline-offset-2">
                    TM.30 guide
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">What the transfer form asks for</h2>
                <p className="mt-2 text-slate-700">
                  The transfer-stamp form typically asks for your previous and new passport details (number, place of
                  issue, issue date, expiry date), nationality, and the reason for transfer.
                </p>
                <p className="mt-3 text-sm text-slate-700">
                  Bangkok transfer form:{" "}
                  <a
                    href={BANGKOK_TRANSFER_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-rose-700 underline underline-offset-2"
                  >
                    Transfer Stamp to New Passport Form <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Office variation to expect</h2>
                <p className="mt-2 text-slate-700">
                  Immigration offices can vary on required copies and supporting documents. Before you go, ask your local
                  office for their latest list and bring extra signed copies to avoid repeat trips.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
                <div className="mt-4 space-y-5">
                  {FAQS.map((faq) => (
                    <div key={faq.question}>
                      <h3 className="text-base font-bold text-slate-900">{faq.question}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

          </CardContent>
        </Card>

        <div className="py-8 text-xs text-slate-500">
          <Separator className="mb-4" />
          Immigration requirements can change and vary by office. Always verify with your local immigration office before
          filing.
        </div>
      </div>
    </div>
  );
}
