import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calculator, Clock3, ShieldAlert, ExternalLink } from "lucide-react";
import ThailandVisaNeedChecker from "@/components/thailand-visa-need-checker";
import ThailandOverstayChecker from "@/components/thailand-overstay-checker";
import NinetyDayCalculator from "@/app/guides/90-day-reporting/NinetyDayCalculator";

export const metadata: Metadata = {
  title: "Thai Visa Calculators",
  description:
    "Free Thailand visa and immigration tools including a 90-day report calculator, visa checker, and overstay calculator.",
};

const toolSections = [
  {
    title: "Do I Need a Visa for Thailand?",
    description:
      "Check visa status based on nationality, entry method, and stay length.",
    href: "/guides/do-i-need-a-visa-thailand",
    hrefLabel: "Open visa checker guide",
    icon: Calculator,
    color: "bg-blue-100",
    iconColor: "text-blue-700",
    tool: <ThailandVisaNeedChecker />,
  },
  {
    title: "90-Day Report Calculator",
    description:
      "Calculate your next 90-day reporting window and due date based on your latest entry or last report date.",
    href: "/guides/90-day-reporting",
    hrefLabel: "Open 90-day reporting guide",
    icon: Clock3,
    color: "bg-violet-100",
    iconColor: "text-violet-700",
    tool: <NinetyDayCalculator />,
  },
  {
    title: "Overstay Calculator",
    description:
      "Estimate your permitted stay expiry, overstay days, fine amount, and blacklist risk guidance.",
    href: "/guides/overstay-thailand",
    hrefLabel: "Open overstay guide",
    icon: ShieldAlert,
    color: "bg-red-100",
    iconColor: "text-red-700",
    tool: <ThailandOverstayChecker />,
  },
] as const;

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-5">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Thai Visa Calculators</h1>
          <p className="mt-3 text-lg text-slate-600">
            Use these visa calculators directly here, or open the full guides for more details.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {toolSections.map((section) => (
            <Card key={section.href} className="rounded-3xl border-0 bg-white shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${section.color}`}
                      >
                        <section.icon className={`h-5 w-5 ${section.iconColor}`} />
                      </div>
                      <h2 className="text-xl font-extrabold text-slate-900">{section.title}</h2>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{section.description}</p>
                  </div>

                  <Link
                    href={section.href}
                    className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-blue-700 underline underline-offset-2"
                  >
                    {section.hrefLabel} <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-5">{section.tool}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="py-10 text-xs text-slate-500">
          <Separator className="mb-4" />
          Tools are for general guidance only. Always verify dates, eligibility, and requirements with official sources.
        </div>
      </div>
    </div>
  );
}
