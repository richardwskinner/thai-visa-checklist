import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie Policy for Thai Visa Checklist, including analytics cookies and how cookies may be used for site functionality and performance.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-4xl px-5 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-900">Cookie Policy</h1>

          <div className="mt-8 space-y-6 text-slate-700">
            <section>
              <h2 className="text-xl font-extrabold text-slate-900">What Are Cookies?</h2>
              <p className="mt-2 leading-relaxed">
                Cookies are small text files stored on your device when you visit a website. They can help websites
                work properly, remember preferences, and measure how the site is used.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">How Thai Visa Checklist Uses Cookies</h2>
              <p className="mt-2 leading-relaxed">
                Thai Visa Checklist may use cookies and similar technologies for analytics, performance measurement, and
                site functionality. For example, analytics tools may use cookies to measure page visits and user
                engagement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">Analytics Cookies</h2>
              <p className="mt-2 leading-relaxed">
                We may use analytics services (such as Google Analytics) to understand website traffic and improve the
                content and experience. These services may place cookies or use similar technologies to collect
                aggregated usage information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">Managing Cookies</h2>
              <p className="mt-2 leading-relaxed">
                You can control or delete cookies through your browser settings. Disabling cookies may affect some site
                features or analytics functionality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">Third-Party Services</h2>
              <p className="mt-2 leading-relaxed">
                Third-party tools and websites linked from this site may use their own cookies and tracking
                technologies. Their policies are separate from Thai Visa Checklist.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-slate-900">Changes to This Policy</h2>
              <p className="mt-2 leading-relaxed">
                This Cookie Policy may be updated from time to time. Continued use of the website after changes are
                posted means you accept the updated policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
