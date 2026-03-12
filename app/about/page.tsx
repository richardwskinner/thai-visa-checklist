import Image from "next/image";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "About Thai Visa Checklist",
  description:
    "Learn why Thai Visa Checklist exists, how it helps people prepare immigration paperwork, and how to get in touch.",
  path: "/about",
});

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

          <p className="mt-6 text-justify text-slate-700 leading-relaxed">
  Thai Visa Checklist started one morning in a crowded immigration office, holding a numbered ticket, wondering whether one missing document was about to ruin my day.
</p>

<p className="mt-4 text-justify text-slate-700 leading-relaxed">
  After almost a decade navigating Thailand’s immigration system firsthand, I stopped relying on memory and built my own master checklist. Not just the minimum requirements, but everything I had ever been asked for.
</p>

<p className="mt-4 text-justify text-slate-700 leading-relaxed">
I wanted a clear, structured list based on my successful applications and conversations with immigration officers. Something to print, place on top of my documents, and tick off one by one so I knew I had everything covered.
</p>

<p className="mt-4 text-justify text-slate-700 leading-relaxed">
  I created this web app in the beginning of 2026. It is completely free to use. No login, no hidden fees, just practical guidance based on real experiences, designed to make visa processes simpler through checklists that enable you to complete the process without an agent.
</p>

         <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
  <p className="text-slate-800 leading-relaxed">
    Thai Visa Checklist is not a law firm, government body, or visa agency.
    We do not provide legal advice or immigration services. The information
    provided on this website is for general guidance only.
  </p>

  <p className="mt-3 text-slate-800 leading-relaxed">
    Immigration requirements change and vary by office or individual
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
