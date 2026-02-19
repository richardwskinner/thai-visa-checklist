import { Card, CardContent } from "@/components/ui/card";
import HomeVisaGrid from "@/components/home-visa-grid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thai Visa Checklist Helper — Free Document Checklists for Thailand Visas",
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

            <div className="mt-7 text-center text-sm text-slate-500">
              Requirements can vary by immigration office - always confirm locally.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
