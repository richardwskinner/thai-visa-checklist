import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Disclaimer for Thai Visa Checklist. General information only, no legal advice, and no guarantee of approval.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-4xl px-5 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <h1 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Disclaimer</h1>

          <div className="mt-8 space-y-6 text-slate-700">
            <section>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">General Information Only</h2>
              <p className="mt-2 leading-relaxed">
                The information on Thai Visa Checklist is provided for general guidance and informational purposes only.
                It is not legal advice, immigration advice, or professional financial advice.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">No Guarantee of Approval</h2>
              <p className="mt-2 leading-relaxed">
                Visa, extension, reporting, and document outcomes are always subject to officer discretion and the rules
                applied by the relevant Thai government office at the time of application.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">Requirements Can Change</h2>
              <p className="mt-2 leading-relaxed">
                Immigration and administrative requirements can change without notice and may vary by office, province,
                district, or branch. Always confirm the latest checklist and procedure directly with the office you plan
                to visit.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">No Government Affiliation</h2>
              <p className="mt-2 leading-relaxed">
                Thai Visa Checklist is an independent website and is not affiliated with the Thai Immigration Bureau,
                Department of Land Transport, Ministry of Foreign Affairs, or any other government agency.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">External Links</h2>
              <p className="mt-2 leading-relaxed">
                This website may link to official websites and third-party sources for convenience. We do not control
                external websites and are not responsible for their content, availability, or policy changes.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">Use at Your Own Risk</h2>
              <p className="mt-2 leading-relaxed">
                You are responsible for checking your own eligibility, document requirements, deadlines, and current
                rules before acting on any information found on this website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
