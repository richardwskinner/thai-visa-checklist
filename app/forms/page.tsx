import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";

type FormItem = {
  code: string;
  name: string;
  purpose: string;
  url: string;
  usedIn: Array<{ label: string; href: string }>;
};

type FormGroup = {
  title: string;
  color: string;
  items: FormItem[];
};

const OFFICIAL_FORMS_PAGE = "https://www.immigration.go.th/?page_id=3159";
const TM47_URL = "https://www.immigration.go.th/wp-content/uploads/2022/10/18.Form-TM-47.pdf";
const TM8_URL =
  "https://www.immigration.go.th/wp-content/uploads/2022/10/5.%E0%B8%84%E0%B8%B3%E0%B8%82%E0%B8%AD%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%8D%E0%B8%B2%E0%B8%95%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%81%E0%B8%A5%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A1%E0%B8%B2%E0%B9%83%E0%B8%99%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%AD%E0%B8%B2%E0%B8%93%E0%B8%B2%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%A3%E0%B8%AD%E0%B8%B5%E0%B8%81-%E0%B8%95%E0%B8%A1.8.pdf";
const TM30_FORM_URL =
  "https://www.immigration.go.th/wp-content/uploads/2022/10/17.%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%88%E0%B9%89%E0%B8%87%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%84%E0%B8%99%E0%B8%95%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%94%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B9%80%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%9E%E0%B8%B1%E0%B8%81%E0%B8%AD%E0%B8%B2%E0%B8%A8%E0%B8%B1%E0%B8%A2.pdf";

const formGroups: FormGroup[] = [
  {
    title: "Reporting & Travel Forms",
    color: "bg-violet-100 text-violet-700",
    items: [
      {
        code: "TM.47",
        name: "90-Day Reporting Form",
        purpose: "Form used for reporting a stay in Thailand over 90 days (paper filing / mail filing cases).",
        url: TM47_URL,
        usedIn: [{ label: "90-Day Reporting Guide", href: "/guides/90-day-reporting" }],
      },
      {
        code: "TM.8",
        name: "Re-Entry Permit Application Form",
        purpose: "Form used to apply for a single or multiple re-entry permit before leaving Thailand.",
        url: TM8_URL,
        usedIn: [{ label: "Re-Entry Permit Guide", href: "/guides/re-entry-permit" }],
      },
      {
        code: "TM.30",
        name: "Notification of Residence (TM.30 Form)",
        purpose:
          "Paper TM.30 notification form (landlord/hotel filing form). Many filings are now also done through the official TM.30 online system.",
        url: TM30_FORM_URL,
        usedIn: [
          { label: "TM.30 Guide", href: "/guides/tm30" },
          { label: "Marriage Visa - 1 Year Extension", href: "/visa/marriage" },
          { label: "Retirement Visa - 1 Year Extension", href: "/visa/retirement" },
        ],
      },
    ],
  },
  {
    title: "Extension Forms",
    color: "bg-emerald-100 text-emerald-700",
    items: [
      {
        code: "TM.7",
        name: "Application to Extend Temporary Stay",
        purpose: "Main application form used for 1-year extension filings at immigration.",
        url: "https://www.immigration.go.th/wp-content/uploads/2022/10/4.%E0%B8%84%E0%B8%B3%E0%B8%82%E0%B8%AD%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%8D%E0%B8%B2%E0%B8%95%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%AD%E0%B8%A2%E0%B8%B9%E0%B9%88%E0%B9%83%E0%B8%99%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%AD%E0%B8%B2%E0%B8%93%E0%B8%B2%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%A3%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%A7%E0%B8%84%E0%B8%A3%E0%B8%B2%E0%B8%A7%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B9%84%E0%B8%9B-%E0%B8%95%E0%B8%A1.7.pdf",
        usedIn: [
          { label: "Marriage Visa - 1 Year Extension", href: "/visa/marriage" },
          { label: "Retirement Visa - 1 Year Extension", href: "/visa/retirement" },
        ],
      },
      {
        code: "STM.2",
        name: "Acknowledgement Form",
        purpose: "Acknowledgement form commonly requested with extension and conversion applications.",
        url: "https://bangkok.immigration.go.th/wp-content/uploads/STM-2-FORM-2025.pdf",
        usedIn: [
          { label: "Marriage Visa - 1 Year Extension", href: "/visa/marriage" },
          { label: "Retirement Visa - 1 Year Extension", href: "/visa/retirement" },
          { label: "Marriage Visa Stage 2 (Conversion)", href: "/visa/marriage/stages/stage-2" },
          { label: "Retirement Visa Stage 2 (Conversion)", href: "/visa/retirement/stages/stage-2" },
        ],
      },
      {
        code: "STM.9",
        name: "Overstay Acknowledgement Form",
        purpose: "Overstay acknowledgement form often bundled with extension and conversion filings.",
        url: "https://bangkok.immigration.go.th/wp-content/uploads/STM-9-FORM-2025.pdf",
        usedIn: [
          { label: "Marriage Visa - 1 Year Extension", href: "/visa/marriage" },
          { label: "Retirement Visa - 1 Year Extension", href: "/visa/retirement" },
          { label: "Marriage Visa Stage 2 (Conversion)", href: "/visa/marriage/stages/stage-2" },
          { label: "Retirement Visa Stage 2 (Conversion)", href: "/visa/retirement/stages/stage-2" },
        ],
      },
      {
        code: "STM.10",
        name: "Immigration Acknowledgement Form",
        purpose: "Additional acknowledgement form currently listed on the marriage extension checklist.",
        url: "https://bangkok.immigration.go.th/wp-content/uploads/STM-10-FORM-2025.pdf",
        usedIn: [{ label: "Marriage Visa - 1 Year Extension", href: "/visa/marriage" }],
      },
      {
        code: "STM.11",
        name: "Penalties / Conditions Acknowledgement Form",
        purpose: "Penalties and conditions acknowledgement form commonly requested by immigration.",
        url: "https://bangkok.immigration.go.th/wp-content/uploads/STM-11-FORM-2025.pdf",
        usedIn: [
          { label: "Marriage Visa - 1 Year Extension", href: "/visa/marriage" },
          { label: "Retirement Visa - 1 Year Extension", href: "/visa/retirement" },
          { label: "Marriage Visa Stage 2 (Conversion)", href: "/visa/marriage/stages/stage-2" },
          { label: "Retirement Visa Stage 2 (Conversion)", href: "/visa/retirement/stages/stage-2" },
        ],
      },
    ],
  },
  {
    title: "Conversion Forms",
    color: "bg-blue-100 text-blue-700",
    items: [
      {
        code: "TM.86",
        name: "Application for Change of Visa / Status (Tourist Visa cases)",
        purpose: "Commonly used if converting from a tourist visa (office confirmation recommended).",
        url: "https://www.inter.chula.ac.th/wp-content/uploads/2022/02/TM86.pdf",
        usedIn: [{ label: "Marriage Visa Stage 2 (Conversion)", href: "/visa/marriage/stages/stage-2" }],
      },
      {
        code: "TM.87",
        name: "Application for Visa (Visa-Exempt / other status cases)",
        purpose: "Commonly used if converting from visa-exempt or another eligible status (confirm locally).",
        url: "https://www.inter.chula.ac.th/wp-content/uploads/2022/02/TM87.pdf",
        usedIn: [{ label: "Marriage Visa Stage 2 (Conversion)", href: "/visa/marriage/stages/stage-2" }],
      },
    ],
  },
];

export const metadata: Metadata = {
  title: "Most Used Thai Immigration Forms (Checklist Forms)",
  description:
    "Official download links for the Thai immigration forms used on our marriage and retirement visa checklists, with quick notes on what each form is for.",
};

export default function FormsPage() {
  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-5">
        <div className="pt-6 sm:pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-600 px-5 py-3 text-base font-medium text-white transition hover:bg-slate-700"
          >
            <ArrowLeft className="h-5 w-5" /> Back to Checklists
          </Link>
        </div>

        <Card className="mt-4 rounded-3xl border-0 bg-white shadow-sm sm:mt-6">
          <CardContent className="p-4 sm:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100">
                <FileText className="h-6 w-6 text-slate-700" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Immigration Forms
              </h1>
            </div>

            <div className="mt-8 space-y-8 sm:mt-10">
              {formGroups.map((group) => (
                <section key={group.title}>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-extrabold text-slate-900">{group.title}</h2>
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${group.color}`}>
                      {group.items.length} form{group.items.length === 1 ? "" : "s"}
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {group.items.map((form) => (
                      <div key={`${group.title}-${form.code}`} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-sm font-bold uppercase tracking-wide text-slate-500">{form.code}</div>
                            <h3 className="mt-1 text-base font-bold text-slate-900">{form.name}</h3>
                          </div>
                          <a
                            href={form.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                          >
                            Open form <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>

                        <p className="mt-2 text-sm text-slate-700">{form.purpose}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="py-8 text-xs text-slate-500">
          <Separator className="mb-4" />
          For the full official list of Thai Immigration forms, visit the{" "}
          <a
            href={OFFICIAL_FORMS_PAGE}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-slate-700 underline underline-offset-2"
          >
            Thai Immigration forms page
          </a>
          .
        </div>
      </div>
    </div>
  );
}
