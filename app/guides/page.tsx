import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CalendarClock,
  PlaneTakeoff,
  MapPin,
  Globe,
  Sun,
  Home,
  IdCard,
  BadgeCheck,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thailand Visa & Immigration Guides - Free Help for Expats",
  description:
    "Free, easy-to-read guides on Thai immigration topics including 90-day reporting, tourist visa extensions, re-entry permits, TM.30, visa exemption, and the Thailand Digital Arrival Card (TDAC).",
};

const guides = [
  {
    title: "90-Day Reporting",
    description:
      "What is 90-day reporting in Thailand, who must file, when it is due, and how to report online or in person.",
    href: "/guides/90-day-reporting",
    icon: CalendarClock,
    color: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    title: "Re-Entry Permits",
    description:
      "What is a Thai re-entry permit, do you need one, and how to apply before leaving Thailand.",
    href: "/guides/re-entry-permit",
    icon: PlaneTakeoff,
    color: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "TM.30 Explained",
    description:
      "What is TM.30, who must file it, when it is required, and why it matters for visa extensions.",
    href: "/guides/tm30",
    icon: MapPin,
    color: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  {
    title: "Thailand Digital Arrival Card (TDAC)",
    description:
      "What is the Thailand Digital Arrival Card (TDAC), who needs it, and how to submit it before arrival.",
    href: "/tdac",
    icon: Globe,
    color: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Visa Exemption & Visa on Arrival (VOA)",
    description:
      "Thailand visa exemption vs visa on arrival: who qualifies, how long you can stay, and what documents you need.",
    href: "/guides/voa-visa-exemption",
    icon: Globe,
    color: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    title: "Tourist Visa Extension (30 Days)",
    description:
      "How to extend a Thailand tourist visa or visa exemption by 30 days, including fees, documents, and process.",
    href: "/guides/tourist-extension",
    icon: Sun,
    color: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Yellow Book (Tabien Baan)",
    description:
      "What is the Yellow Book (Tabien Baan), who can get one, what documents you need, and how to apply in Thailand.",
    href: "/guides/yellow-book",
    icon: Home,
    color: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    title: "Thai Pink ID Card",
    description:
      "What is the Thai Pink ID card, who qualifies, which documents are required, and how to apply at your local district office.",
    href: "/guides/pink-id-card",
    icon: IdCard,
    color: "bg-rose-100",
    iconColor: "text-rose-600",
  },
  {
    title: "Passport Renewal and Stamp Transfer",
    description:
      "How to renew your passport in Thailand and transfer visa or extension stamps to your new passport before your next filing.",
    href: "/guides/passport-renewal-stamp-transfer",
    icon: BadgeCheck,
    color: "bg-cyan-100",
    iconColor: "text-cyan-700",
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-5">

        {/* Page heading */}
        <div className="pt-10 text-center sm:pt-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Thailand Visa and Document Guides
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Free, simple step-by-step guides for visas, extensions, reporting, and residency documents.

          </p>
        </div>

        {/* Guide cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {guides.map((guide) => (
            <Link key={guide.href} href={guide.href}>
              <Card className="h-full rounded-3xl border-0 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <CardContent className="p-7">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${guide.color}`}
                    >
                      <guide.icon className={`h-5 w-5 ${guide.iconColor}`} />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {guide.title}
                    </h2>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    {guide.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Footer note */}
        <div className="py-10 text-xs text-slate-500">
          <Separator className="mb-4" />
          Information is provided for guidance only. Requirements can vary by immigration office - always confirm locally.
        </div>
      </div>
    </div>
  );
}
