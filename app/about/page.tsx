import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Thai Visa Checklist - why it exists, how it helps, and how to connect with trusted visa agents.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-4xl px-5 py-10">
       
        {/* Content card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 text-center">
            About Thai Visa Checklist
          </h1>

          <div className="mt-6 flex justify-center">
  <Image
    src="/images/immigration-photo.png"
    alt="Photo at Thai immigration"
    width={500}
    height={500}
    className="rounded-2xl shadow-md"
    priority
  />
</div>

          <p className="mt-6 text-slate-700 leading-relaxed">
  Thai Visa Checklist started one morning in a crowded immigration office, holding a numbered ticket, wondering whether one missing document was about to ruin my day.
</p>

<p className="mt-4 text-slate-700 leading-relaxed">
  I had already been through the process multiple times, yet somehow there was always something missing. A form I didn&apos;t know I needed. A photocopy another office had never asked for. I learned quickly that different immigration offices, and even different officers, can ask for slightly different documents. That uncertainty is what makes the process stressful.
</p>

<p className="mt-4 text-slate-700 leading-relaxed">
  After almost a decade navigating Thailand’s immigration system firsthand, I stopped relying on memory and built my own master checklist. Not just the minimum requirements, but everything I had ever been asked for.
</p>

<p className="mt-4 text-slate-700 leading-relaxed">
I wanted one clear, structured list based on my successful applications and real conversations with immigration officers. Something I could print, place on top of my documents, and tick off one by one so I knew I had everything covered.
</p>

<p className="mt-6 text-slate-700 leading-relaxed">
  Each checklist is designed so you can print it, and walk into immigration feeling prepared. No scrolling through long blog posts at the counter. No guessing what might be requested. Just a clean, practical checklist that helps reduce the chance of extra trips.
</p>

<p className="mt-4 text-slate-700 leading-relaxed">
  Thai Visa Checklist was created in 2026 after navigating Thailand’s immigration system firsthand. It is completely free to use - no login, and no hidden fees, just practical guidance based on real experience, designed to make complex visa processes clearer through simple, visual checklists that enable you to complete the process without an agent.
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
          <p className="mt-10 text-sm text-slate-500">
            Until then - bring extra copies.
          </p>
        </div>
      </div>
    </div>
  );
}
