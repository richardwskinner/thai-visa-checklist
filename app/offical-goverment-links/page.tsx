import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink, Landmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { resourceLinks } from "@/lib/data/resource-links";

export const metadata: Metadata = {
  title: "Offical Goverment Links",
  description:
    "Offical Goverment Links for Thailand including Thai Immigration Bureau, Thai e-Visa, MFA, 90-day reporting, TM.30, and related portals.",
};

export default function OfficalGovermentLinksPage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-5">
        <div className="pt-6 sm:pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-600 px-5 py-3 text-base font-medium text-white transition hover:bg-slate-700"
          >
            <ArrowLeft className="h-5 w-5" /> Back to Home
          </Link>
        </div>

        <Card className="mt-4 rounded-3xl border-0 bg-white shadow-sm sm:mt-6">
          <CardContent className="p-4 sm:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100">
                <Landmark className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                  Offical Goverment Links
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  Official Thailand immigration and government portals in one place.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                {resourceLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    title={link.label}
                    className="grid w-full grid-cols-[3.75rem_minmax(0,1fr)_1rem] items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-left text-slate-700 hover:text-slate-900"
                  >
                    {link.logo ? (
                      <span className="flex h-10 w-14 items-center justify-center rounded-md bg-white px-1">
                        <Image
                          src={link.logo}
                          alt=""
                          aria-hidden="true"
                          width={48}
                          height={32}
                          className="max-h-8 w-auto object-contain"
                        />
                      </span>
                    ) : (
                      <span className="flex h-10 w-14 items-center justify-center rounded-md bg-slate-50" />
                    )}
                    <span className="min-w-0 leading-snug">{link.label}</span>
                    <ExternalLink className="h-3.5 w-3.5 justify-self-end text-slate-400" />
                  </a>
                ))}
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
              Requirements can vary by immigration office - always confirm locally.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
