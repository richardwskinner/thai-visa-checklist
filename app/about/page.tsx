import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Thai Visa Checklist — why it exists, how it helps, and how to connect with trusted visa agents.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-4xl px-5 py-10">
        {/* Top nav */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            ← Back to home
          </Link>

          <Link
            href="/"
            className="text-sm font-semibold text-slate-900 hover:underline underline-offset-4"
          >
            Thai Visa Checklist
          </Link>
        </div>

        {/* Content card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 text-center">
            About Thai Visa Checklist
          </h1>

          <div className="mt-6 flex justify-center">
  <Image
    src="/images/immigration-cartoon.png"
    alt="Cartoon of someone at Thai immigration with too many documents"
    width={500}
    height={500}
    className="rounded-2xl shadow-md"
    priority
  />
</div>

          <p className="mt-6 text-slate-700 leading-relaxed">
            Thai Visa Checklist started one day while standing in the immigration
            office, holding a numbered ticket and wondering whether one missing
            photocopy was about to ruin our morning.
          </p>

          <p className="mt-4 text-slate-700 leading-relaxed">
            After going through the process many times and always forgetting something, I created my
            own checklist. Although much of the information is available online,
            it’s scattered, inconsistent, and often outdated. I wanted one clear
            document where everything I needed was centralised — something I
            could print, and tick off as I prepared. So this site was created to solve one simple problem:
          </p>

          <p className="mt-3 text-xl font-extrabold text-slate-900">
            Make immigration day predictable.
          </p>

          <p className="mt-6 text-slate-700 leading-relaxed">
            Each checklist is structured so you can print it out, put it in your
            document folder, and physically tick off each item as you prepare.
            No scrolling through blog posts at the counter. No guessing what you
            forgot. Just a clean, practical list you can rely on.
          </p>

          <p className="mt-4 text-slate-700 leading-relaxed">
            Thai Visa Checklist is completely free to use. No login. No hidden
            fees. Just straightforward checklists designed to reduce second
            trips to immigration.
          </p>

         <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
  <p className="text-slate-800 leading-relaxed">
    Thai Visa Checklist is not a law firm, government body, or visa agency.
    We do not provide legal advice or immigration services. The information
    provided on this website is for general guidance only.
  </p>

  <p className="mt-3 text-slate-800 leading-relaxed">
    Immigration requirements can change, vary by office, and individual
    circumstances. Always confirm requirements directly with your
    local immigration office before submitting an application.
  </p>
</div>

          <p className="mt-6 text-slate-700 leading-relaxed">
            If you’d prefer to have a professional to handle the process - {" "}
            <a
              href="/contact"
              className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-900"
            >
              Get in touch here.
            </a>
          </p>

          <p className="mt-10 text-sm text-slate-500">
            Until then — bring extra copies.
          </p>
        </div>
      </div>
    </div>
  );
}
