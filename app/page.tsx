import Script from "next/script";
import { Card, CardContent } from "@/components/ui/card";
import HomeVisaGrid from "@/components/home-visa-grid";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Free Thailand Visa Checklists and Guides",
  description:
    "Free Thailand visa checklists, immigration guides, and practical tools for marriage visas, retirement visas, reporting, and more.",
  path: "/",
});

export default function HomePage() {
  return (
    <div className="bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-3 pt-6 sm:pt-8">
        <Card className="rounded-3xl border border-slate-200/80 bg-white/95 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
          <CardContent className="relative p-8 sm:p-10">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Which Thailand Visa Checklist do you need?
              </h1>
              <p className="mt-2 text-base text-slate-600">
                Get Your Free, Step-by-Step Document Checklist
              </p>
            </div>

            <HomeVisaGrid />
          </CardContent>
        </Card>
      </div>

      <Script src="https://saily.com/embed/receiver.js" strategy="afterInteractive" />
    </div>
  );
}
