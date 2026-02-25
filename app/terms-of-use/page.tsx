import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use for Thai Visa Checklist, including acceptable use, content limitations, and liability disclaimers.",
};

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-4xl px-5 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <h1 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Terms of Use</h1>

          <div className="mt-8 space-y-6 text-slate-700">
            <section>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">Acceptance of Terms</h2>
              <p className="mt-2 leading-relaxed">
                By using Thai Visa Checklist, you agree to these Terms of Use. If you do not agree, please do not use
                the website.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">Informational Use Only</h2>
              <p className="mt-2 leading-relaxed">
                The content on this website is provided for general informational purposes only. It is not legal advice,
                immigration advice, or professional advice of any kind.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">No Guarantee of Accuracy or Approval</h2>
              <p className="mt-2 leading-relaxed">
                While we aim to provide practical and accurate information, rules and requirements can change and may
                vary by office. We do not guarantee the accuracy, completeness, or outcome of any application, report,
                or checklist process.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">User Responsibility</h2>
              <p className="mt-2 leading-relaxed">
                You are responsible for verifying all requirements, deadlines, fees, and procedures directly with the
                relevant Thai government office, bank, district office, or other authority before relying on the
                information provided on this website.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">Intellectual Property</h2>
              <p className="mt-2 leading-relaxed">
                Unless otherwise stated, website content, layout, and original checklist materials on Thai Visa
                Checklist are the property of the site owner. Official forms, logos, and third-party materials remain
                the property of their respective owners.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">External Links</h2>
              <p className="mt-2 leading-relaxed">
                The website may link to official websites and third-party websites for convenience. We are not
                responsible for the content, accuracy, availability, or policies of external sites.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">Limitation of Liability</h2>
              <p className="mt-2 leading-relaxed">
                To the fullest extent permitted by law, Thai Visa Checklist is not liable for any loss, delay, refusal,
                penalty, cost, or damages resulting from the use of this website or reliance on its content.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">Changes to Terms</h2>
              <p className="mt-2 leading-relaxed">
                These Terms of Use may be updated from time to time. Continued use of the website after changes are
                posted means you accept the updated terms.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
