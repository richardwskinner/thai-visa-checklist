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
  AlertTriangle,
  CarFront,
  Landmark,
  Globe2,
  FileText,
  Heart,
} from "lucide-react";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Thailand Visa and Immigration Guides",
  description:
    "Free, practical guides on Thai immigration topics including 90-day reporting, tourist visa extensions, re-entry permits, TM.30, visa exemption, and TDAC.",
  path: "/guides",
});

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
    href: {
      pathname: "/tdac",
      query: {
        returnTo: "/guides",
        returnLabel: "Back to Guides",
      },
    },
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
    title: "Overstay in Thailand",
    description:
      "Overstay fines, blacklist rules, and what to do now based on official Thai immigration notices.",
    href: "/guides/overstay-thailand",
    icon: AlertTriangle,
    color: "bg-red-100",
    iconColor: "text-red-700",
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
  {
    title: "Thai Driving Licence for Foreigners",
    description:
      "How foreigners can get a driving licence in Thailand, including common documents, tests, and DLT application steps.",
    href: "/guides/thai-driving-licence",
    icon: CarFront,
    color: "bg-sky-100",
    iconColor: "text-sky-700",
  },
  {
    title: "Opening a Thai Bank Account (Foreigner)",
    description:
      "How foreigners can open a bank account in Thailand, what documents banks may ask for, and why branch policy matters.",
    href: "/guides/opening-bank-account-thailand",
    icon: Landmark,
    color: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
  {
    title: "Do I Need a Visa for Thailand?",
    description:
      "Check if you likely need a visa, qualify for visa exemption, or can use Visa on Arrival based on official Thai government source lists.",
    href: "/guides/do-i-need-a-visa-thailand",
    icon: Globe2,
    color: "bg-violet-100",
    iconColor: "text-violet-700",
  },
  {
    title: "Thailand Marriage Visa",
    description:
      "Full marriage visa path in Thailand: 90-day Non-Immigrant O, bank account setup, fund seasoning, extension, and consideration period.",
    href: "/guides/marriage-visa-thailand",
    icon: Heart,
    color: "bg-pink-100",
    iconColor: "text-pink-700",
  },
  {
    title: "Thailand Retirement Visa",
    description:
      "Full retirement visa path in Thailand: 90-day Non-Immigrant O, financial options, one-year extension, and ongoing reporting requirements.",
    href: "/guides/retirement-visa-thailand",
    icon: BadgeCheck,
    color: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    title: "Foreigners Paying Tax in Thailand",
    description:
      "Simple guide to the Revenue Department's 2024 foreigner tax summary, including Thai-sourced income, remittances, and filing basics.",
    href: "/guides/foreigners-paying-tax-thailand",
    icon: FileText,
    color: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-5">

        {/* Page heading */}
        <div className="pt-10 text-center sm:pt-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Thailand Visa and Immigration Guides
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Free, simple step-by-step guides for visas, extensions, reporting, and residency documents.

          </p>
        </div>

        {/* Guide cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link key={guide.title} href={guide.href}>
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
