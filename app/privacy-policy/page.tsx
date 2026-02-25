import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Thai Visa Checklist, including information on analytics, contact emails, and how website usage data is handled.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-4xl px-5 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <h1 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Privacy Policy</h1>

          <div className="mt-8 space-y-6 text-slate-700">
            <section>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">Overview</h2>
              <p className="mt-2 leading-relaxed">
                Thai Visa Checklist respects your privacy. This page explains what information may be collected when you
                use the website and how that information is used.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">Information You Provide</h2>
              <p className="mt-2 leading-relaxed">
                If you contact us by email, we may receive your email address and any information you include in your
                message. We use that information only to respond to your enquiry and manage communications.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">Analytics and Usage Data</h2>
              <p className="mt-2 leading-relaxed">
                This website uses analytics tools (such as Google Analytics) to understand how visitors use the site,
                including page views, traffic sources, and general engagement. This helps improve the website content
                and user experience.
              </p>
              <p className="mt-2 leading-relaxed">
                Analytics data is typically aggregated and does not directly identify you personally, but it may include
                technical information such as device type, browser, approximate location, and pages visited.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">Cookies and Similar Technologies</h2>
              <p className="mt-2 leading-relaxed">
                The website may use cookies or similar technologies for analytics, site functionality, and performance.
                See the Cookie Policy for more details.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">External Links</h2>
              <p className="mt-2 leading-relaxed">
                Thai Visa Checklist links to official government websites and third-party websites for reference. We are
                not responsible for the privacy practices or content of those external sites.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">Data Retention and Security</h2>
              <p className="mt-2 leading-relaxed">
                We do not intentionally collect sensitive personal information through this website. Any emails or
                communications received may be retained for reasonable administrative purposes. No website or email
                system can guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">Changes to This Policy</h2>
              <p className="mt-2 leading-relaxed">
                This Privacy Policy may be updated from time to time. Continued use of the website after changes are
                posted means you accept the updated policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
