import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CalendarClock, PlaneTakeoff, MapPin, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thailand Visa & Immigration Guides — Free Help for Expats",
  description:
    "Free, easy-to-read guides on Thai immigration topics including 90-day reporting, re-entry permits, TM.30, and the Thailand Digital Arrival Card (TDAC).",
};

const guides = [
  {
    title: "90-Day Reporting",
    description: "Who needs to report, when to do it, and how to file online, by mail, or in person.",
    href: "/guides/90-day-reporting",
    icon: CalendarClock,
    color: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    title: "Re-Entry Permits",
    description: "How to keep your visa when you travel. Single vs multiple, costs, and where to apply.",
    href: "/guides/re-entry-permit",
    icon: PlaneTakeoff,
    color: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "TM.30 Explained",
    description: "What TM.30 is, who files it, and why you need the receipt for visa extensions.",
    href: "/guides/tm30",
    icon: MapPin,
    color: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  {
    title: "Thailand Digital Arrival Card (TDAC)",
    description: "How to fill in the TDAC before you arrive in Thailand.",
    href: "/tdac",
    icon: Globe,
    color: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-5">
        <div className="pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-600 px-5 py-3 text-base font-medium text-white transition hover:bg-slate-700"
          >
            <ArrowLeft className="h-5 w-5" /> Home
          </Link>
        </div>

        <div className="mt-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Immigration Guides
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Free, simple guides to help you understand Thai immigration requirements
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {guides.map((guide) => (
            <Link key={guide.href} href={guide.href}>
              <Card className="h-full rounded-3xl border-0 bg-white shadow-sm transition hover:shadow-md hover:-translate-y-1">
                <CardContent className="p-7">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${guide.color}`}>
                      <guide.icon className={`h-5 w-5 ${guide.iconColor}`} />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">{guide.title}</h2>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{guide.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="py-10 text-xs text-slate-500">
          <Separator className="mb-4" />
          Information is provided for guidance only. Requirements can vary by immigration office — always confirm locally.
        </div>
      </div>
    </div>
  );
}