import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";
import HomeVisaGrid from "@/components/home-visa-grid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thai Visa Checklist Helper - Free Document Checklists for Thailand Visas",
  description:
    "Free, comprehensive document checklists for Thai visa applications. Marriage visa, retirement visa, business visa and more. Never miss a document again.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50">
      <div className="mx-auto w-full max-w-5xl px-3 pt-6 sm:pt-8">
        <Card className="rounded-3xl border border-slate-200/80 bg-white/95 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
          <CardContent className="p-8 sm:p-10">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Which Thailand Visa Are You Applying For?
              </h2>
              <p className="mt-2 text-base text-slate-600">
                Get Your Free, Step-by-Step Document Checklist.
              </p>
            </div>

            <HomeVisaGrid />

            <div className="mt-8">
              <Separator />
            </div>

            <section className="mt-8">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="text-center text-sm font-bold text-slate-800">Official Government Resources</div>
                <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <a
                    href="https://www.immigration.go.th/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 hover:text-slate-900"
                  >
                    Thai Immigration Bureau <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                  </a>
                  <a
                    href="https://www.thaievisa.go.th/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 hover:text-slate-900"
                  >
                    Thai e-Visa Official Portal <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                  </a>
                  <a
                    href="https://www.mfa.go.th/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 hover:text-slate-900"
                  >
                    Ministry of Foreign Affairs <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                  </a>
                  <a
                    href="https://tm47.immigration.go.th/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 hover:text-slate-900"
                  >
                    90-Day Reporting Portal <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                  </a>
                  <a
                    href="https://tm30.immigration.go.th/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 hover:text-slate-900"
                  >
                    TM.30 Portal <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                  </a>
                  <a
                    href="https://www.rd.go.th/english"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 hover:text-slate-900"
                  >
                    Revenue Department <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                  </a>
                  <a
                    href="https://thai.tourismthailand.org/Home"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 hover:text-slate-900"
                  >
                    Tourism Authority of Thailand <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                  </a>
                  <a
                    href="https://www.airportthai.co.th/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 hover:text-slate-900"
                  >
                    Airports of Thailand <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                  </a>
                </div>
              </div>
            </section>

            <div className="mt-7 text-center text-sm text-slate-500">
              Requirements can vary by immigration office - always confirm locally.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
