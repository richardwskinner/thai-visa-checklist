import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { resourceLinks } from "@/lib/data/resource-links";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Official Government Links",
  description:
    "Official Thailand immigration and government links, including Thai Immigration Bureau, Thai e-Visa, MFA, 90-day reporting, and TM.30 portals.",
  path: "/offical-goverment-links",
});

const LINK_DESCRIPTIONS: Record<string, string> = {
  "Thai Immigration Bureau":
    "Main immigration website for official announcements, immigration offices, forms, and services.",
  "Thai e-Visa Official Portal":
    "Official online portal to apply for eligible Thai visas before travel.",
  "Ministry of Foreign Affairs":
    "Official MFA website with consular information, embassy contacts, and visa policy updates.",
  "Thailand.go.th":
    "Thailand government portal with public services and general official information.",
  "90-Day Reporting Portal":
    "Official online system for submitting 90-day address reports (TM.47) when eligible.",
  "TM.30 Portal":
    "Official online reporting portal for residence notification (TM.30) by property owner/host.",
  "Thailand Digital Arrival Card (TDAC)":
    "Official portal to submit the Thailand Digital Arrival Card before arrival in Thailand.",
  "Revenue Department":
    "Official tax authority website for tax rules, forms, and taxpayer services.",
  "Tourism Authority of Thailand":
    "Official tourism website for destination information, travel inspiration, and visitor resources.",
  "Airports of Thailand":
    "Official AOT website with airport information, services, and airport-related notices.",
  "Board of Investment (BOI)":
    "Official BOI website with investment promotion information, services, and business-related guidance.",
  "Social Security Office (SSO)":
    "Official Social Security Office website for social security services, benefits, and employer/employee information.",
};

export default function OfficalGovermentLinksPage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-5">
        <div className="pt-10 text-center sm:pt-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Official Government Links
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Official Thailand immigration and government portals in one place.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resourceLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
            >
              <Card className="h-full rounded-3xl border-0 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <CardContent className="p-7">
                  <div className="flex items-center gap-3">
                    {link.logo ? (
                      <span className="flex h-12 w-12 items-center justify-center">
                        <Image
                          src={link.logo}
                          alt=""
                          aria-hidden="true"
                          width={34}
                          height={34}
                          className="max-h-9 w-auto object-contain"
                        />
                      </span>
                    ) : (
                      <span className="flex h-12 w-12 items-center justify-center" />
                    )}
                    <h2 className="min-w-0 text-lg font-bold text-slate-900">{link.label}</h2>
                    <ExternalLink className="ml-auto h-4 w-4 shrink-0 text-slate-400" />
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    {LINK_DESCRIPTIONS[link.label] ?? "Official government resource."}
                  </p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}
