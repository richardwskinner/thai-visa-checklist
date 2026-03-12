import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Building2, ExternalLink } from "lucide-react";
import GuideBackButton from "@/components/guide-back-button";
import { createRouteMetadata } from "@/lib/seo";

const KBANK_FOREIGN_ACCOUNT_URL =
  "https://www.kasikornbank.com/en/personal/services/guides/Pages/foreigncustomer.aspx";
const KBANK_SAVINGS_URL = "https://www.kasikornbank.com/EN/Personal/Account/Pages/Savings.aspx";
const BANGKOK_BANK_EXPAT_BOOKLET_URL =
  "https://www.bangkokbank.com/-/media/Files/Personal/Other-Services/Branch-Services/International-Branches/ExpatBooklet_Jan2017.ashx?la=en";

const FAQS = [
  {
    question: "Can a foreigner open a bank account in Thailand?",
    answer:
      "Yes, but approval depends on the bank and branch. Requirements vary based on your visa type, work permit or residence documents, and the purpose of the account.",
  },
  {
    question: "Can I open a Thai bank account on a tourist visa or visa exemption?",
    answer:
      "Some banks/branches may refuse tourist or visa-exempt applicants, while others may consider them with extra supporting documents. Policies vary by bank and branch, so ask the branch directly before visiting.",
  },
  {
    question: "What address proof is commonly requested?",
    answer:
      "Common examples include a residence certificate, work permit showing address, tenancy documents, or other documents accepted by the bank. Branch staff will tell you what they accept in your case.",
  },
  {
    question: "Why do foreigners get rejected even with the same visa as someone else?",
    answer:
      "Branch-level policy and staff discretion can differ. The same bank may approve at one branch and reject at another depending on document checks, risk controls, and internal rules.",
  },
] as const;

export const metadata = createRouteMetadata({
  title: "Open a Bank Account in Thailand",
  description:
    "Practical guide for foreigners opening a bank account in Thailand, including documents, visa considerations, branch differences, and what to bring.",
  path: "/guides/opening-bank-account-thailand",
});

export default function OpeningBankAccountThailandPage() {
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
                <Building2 className="h-6 w-6 text-emerald-700" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Opening a Bank Account in Thailand as a Foreigner
              </h1>
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
              <p className="text-base font-semibold text-emerald-900 sm:text-lg">
                It is possible for foreigners to open a Thai bank account, but the biggest factor is often branch-level
                requirements, not just the bank brand.
              </p>
              <p className="mt-3 text-sm text-emerald-900/80">
                Bring more supporting documents than you think you need and confirm the branch checklist in advance if
                possible.
              </p>
            </div>

            <div className="mt-8 space-y-8 sm:mt-10">
              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Why foreigners open Thai bank accounts</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "Receive salary, pension, or transfers in Thailand",
                    "Pay rent, utilities, and bills more easily",
                    "Use Thai banking apps and QR payments",
                    "Prepare for visa extensions that require proof of funds",
                    "Avoid repeated foreign card fees and FX charges",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                      <span className="min-w-0">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">What usually affects approval</h2>
                <div className="mt-3 space-y-3 text-slate-700">
                  <p>
                    Banks check your identity, immigration status, and reason for opening the account. The branch may
                    also assess risk, document quality, and whether your address and purpose are clear.
                  </p>
                  <p>
                    The same documents may be accepted at one branch and rejected at another. This is common in
                    Thailand, so branch selection matters.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Common documents to bring</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "Passport (original) and copies of bio page and current visa/entry/extension pages",
                    "Thai phone number (many banks require a local number for SMS/OTP)",
                    "Proof of address in Thailand (branch-specific accepted formats vary)",
                    "Work permit (if you are working in Thailand)",
                    "Supporting documents that explain your purpose (employment letter, school documents, pension proof, etc.)",
                    "Extra ID/supporting documents (foreign ID card, driving licence, or other documents if requested)",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                      <span className="min-w-0">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  For address evidence, some foreigners also use local documents such as a{" "}
                  <Link
                    href={{
                      pathname: "/guides/yellow-book",
                      query: {
                        returnTo: "/guides/opening-bank-account-thailand",
                        returnLabel: "Back to Opening Bank Account Guide",
                      },
                    }}
                    className="font-semibold text-emerald-700 underline underline-offset-2"
                  >
                    Yellow Book (Tabien Baan)
                  </Link>{" "}
                  where applicable.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Visa type and status matter</h2>
                <div className="mt-3 space-y-3 text-slate-700">
                  <p>
                    Some banks clearly state they require a non-immigrant visa and supporting documents related to your
                    purpose in Thailand. For example, KBank publishes foreigner document requirements and notes that
                    branch staff may request additional documents.
                  </p>
                  <p>
                    Other banks may consider a wider range of cases but ask for reference letters or extra proof. This
                    is why calling the specific branch first can save time.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Best strategy before you go</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "Choose a branch used to dealing with foreigners (business districts / expat areas often help)",
                    "Call first and ask exactly what they require for your visa type",
                    "Bring originals plus signed copies of everything",
                    "Bring one or two backup documents for address and identity",
                    "Be ready to try a different branch if the first one refuses",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                      <span className="min-w-0">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Common reasons for rejection or delay</h2>
                <div className="mt-3 grid gap-2">
                  {[
                    "No accepted proof of Thai address",
                    "Visa type not accepted by that bank/branch",
                    "Missing supporting documents for your purpose of stay",
                    "No Thai phone number for OTP/mobile banking setup",
                    "Branch applying stricter internal policy than another branch",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                      <span className="min-w-0">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-extrabold text-slate-900">Official and reference sources</h2>
                <div className="mt-3 flex flex-col gap-2">
                  <a
                    href={KBANK_FOREIGN_ACCOUNT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 underline underline-offset-2"
                  >
                    KBank Foreign Customer / Required Documents <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={KBANK_SAVINGS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 underline underline-offset-2"
                  >
                    KBank Open Bank Account (Savings) <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={BANGKOK_BANK_EXPAT_BOOKLET_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 underline underline-offset-2"
                  >
                    Bangkok Bank Expat Booklet (foreign account opening examples) <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <p className="mt-4 text-xs text-slate-500">
                  Bank policy can change by bank and branch. Always treat the branch you will visit as the final source
                  for your exact document checklist.
                </p>
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
            </div>
          </CardContent>
        </Card>

        <div className="py-8 text-xs text-slate-500">
          <Separator className="mb-4" />
          Bank and branch policies can change without notice. Always confirm with the branch you plan to use before you
          visit.
        </div>
      </div>
    </div>
  );
}
