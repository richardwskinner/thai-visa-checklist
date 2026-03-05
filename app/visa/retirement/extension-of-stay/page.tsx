"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, Printer } from "lucide-react";
import { retirementChecklist } from "@/lib/data/checklists/retirement-extension-checklist";
import type { ChecklistItem } from "@/lib/data/checklists/types";
import { analytics } from "@/lib/analytics";
import ChecklistNotice from "@/components/checklist-notice";
import ExampleLink from "@/components/example-link";
import PrintChecklistHeader from "@/components/print-checklist-header";
import { allowPrintWithEmailGate } from "@/lib/print-email-gate";

/* ── Storage keys ── */
const STORAGE_KEY_CHECKED = "thai-visa-checklist:retirement:checked:v1";
const STORAGE_KEY_FONTSIZE = "thai-visa-checklist:fontsize:v1";
const STORAGE_KEY_FINANCIAL_METHOD = "thai-visa-checklist:retirement:financial-method:v1";

/* ── Application form links (compact pills) ── */
const APPLICATION_FORMS = [
  {
    code: "TM.7",
    url: "https://www.immigration.go.th/wp-content/uploads/2022/10/4.%E0%B8%84%E0%B8%B3%E0%B8%82%E0%B8%AD%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%8D%E0%B8%B2%E0%B8%95%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%AD%E0%B8%A2%E0%B8%B9%E0%B9%88%E0%B9%83%E0%B8%99%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%AD%E0%B8%B2%E0%B8%93%E0%B8%B2%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%A3%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%A7%E0%B8%84%E0%B8%A3%E0%B8%B2%E0%B8%A7%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B9%84%E0%B8%9B-%E0%B8%95%E0%B8%A1.7.pdf",
  },
  { code: "STM.2", url: "https://bangkok.immigration.go.th/wp-content/uploads/STM-2-FORM-2025.pdf" },
  { code: "STM.9", url: "https://bangkok.immigration.go.th/wp-content/uploads/STM-9-FORM-2025.pdf" },
  { code: "STM.11", url: "https://bangkok.immigration.go.th/wp-content/uploads/STM-11-FORM-2025.pdf" },
] as const;

const FAQS = [
  {
    question:
      "How far in advance can I apply for a retirement extension at Chaeng Wattana?",
    answer:
      "At Chaeng Wattana (Immigration Division 1), a common rule is that you can apply when you have 45 days or less remaining on your current stamp. Office practice can change, so confirm with the office before you go.",
  },
  {
    question: "What if my passport has less than one year remaining?",
    answer:
      "Immigration will only grant your one-year Non-Immigrant O (Retirement) extension up to your passport expiry date. If your passport has less than 12 months remaining, your extension is shortened to match the remaining validity. Renewing your passport before applying is usually advisable. Many countries also require at least 6 months passport validity for international travel.",
  },
] as const;

function FormChips() {
  return (
    <div className="flex flex-wrap gap-2">
      {APPLICATION_FORMS.map((f) => (
        <a
          key={f.code}
          href={f.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100
                     print:bg-white print:text-slate-900 print:border-slate-300"
          onClick={(e) => e.stopPropagation()}
        >
          {f.code}
          <span className="text-slate-400 print:hidden">↗</span>
        </a>
      ))}
    </div>
  );
}

/* ── Font size config ── */
const fontSizeClasses = {
  small: {
    title: "text-2xl",
    subtitle: "text-base",
    sectionTitle: "text-xl",
    itemText: "text-sm",
    label: "text-xs",
    progress: "text-sm",
  },
  medium: {
    title: "text-4xl",
    subtitle: "text-lg",
    sectionTitle: "text-2xl",
    itemText: "text-base",
    label: "text-sm",
    progress: "text-base",
  },
  large: {
    title: "text-5xl",
    subtitle: "text-xl",
    sectionTitle: "text-3xl",
    itemText: "text-xl",
    label: "text-base",
    progress: "text-lg",
  },
} as const;

type FontSize = keyof typeof fontSizeClasses;
type FinancialMethod = "bank" | "monthly-income" | "combination";
type SectionItemWithKey = ChecklistItem & { itemKey: string };
type ChecklistSectionWithKeys = { title: string; items: SectionItemWithKey[] };

/* ── Section component ── */
function Section({
  title,
  items,
  checked,
  onToggle,
  fontSize,
  financialMethod,
  onFinancialMethodChange,
}: {
  title: string;
  items: SectionItemWithKey[];
  checked: Record<string, boolean>;
  onToggle: (key: string) => void;
  fontSize: FontSize;
  financialMethod?: FinancialMethod;
  onFinancialMethodChange?: (method: FinancialMethod) => void;
}) {
  const classes = fontSizeClasses[fontSize];
  const isFinancialSection = title.startsWith("Proof of Funds");

  return (
    <div className="mt-6 print:mt-2">
      <div className={`${classes.sectionTitle} font-extrabold text-slate-900`}>
        {title}
        {isFinancialSection && !title.includes("(Select one)") && (
          <span className="ml-2 print:hidden">(Select one)</span>
        )}
      </div>
      <div className="mt-2 h-[3px] w-full rounded-full bg-blue-800 print:mt-1" />
      {isFinancialSection && financialMethod && onFinancialMethodChange && (
        <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-4 print:hidden">
          <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
            {([
              ["bank", "A: 800,000 THB Bank Deposit"],
              ["monthly-income", "B: 65,000 THB Monthly Income/Pension"],
              ["combination", "C: Combination Method"],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => onFinancialMethodChange(value)}
                className={`rounded-full border px-3 py-1.5 text-center text-sm font-medium transition ${
                  financialMethod === value
                    ? "border-blue-800 bg-blue-800 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-3 grid gap-2 print:mt-1 print:gap-1">
        {items.map((item) => {
          const key = item.itemKey;
          return (
            <label key={key} className="flex cursor-pointer items-center gap-3 print:gap-2">
              <Checkbox
                checked={!!checked[key]}
                onCheckedChange={() => onToggle(key)}
                className="h-5 w-5 rounded-md border-slate-600 print:border-black print:h-4 print:w-4 data-[state=checked]:bg-[#249C0F] data-[state=checked]:border-[#249C0F]"
              />
              <div className={`${classes.itemText} text-slate-900 leading-snug`}>
                {item.text.includes("\n")
                  ? item.text.split("\n").map((line, i) => (
                      <span key={i} className="block">
                        {line}
                      </span>
                    ))
                  : item.text}
                {item.noteLink && item.noteUrl && (
                  <ExampleLink
                    href={item.noteUrl}
                    label="Example"
                    className="ml-2 align-middle"
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
                {item.subItems && item.subItems.length > 0 && (
                  <ul className={`mt-2 list-disc space-y-1 pl-5 ${classes.itemText} text-slate-700`}>
                    {item.subItems.map((subItem) => (
                      <li key={`${key}:${subItem}`}>{subItem}</li>
                    ))}
                  </ul>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main page ── */
export default function RetirementVisaPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CHECKED);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") return parsed as Record<string, boolean>;
      }
    } catch {
      // ignore
    }
    return {};
  });
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    if (typeof window === "undefined") return "small";
    const savedSize = localStorage.getItem(STORAGE_KEY_FONTSIZE);
    if (savedSize === "small" || savedSize === "medium" || savedSize === "large") {
      return savedSize;
    }
    return "small";
  });
  const [financialMethod, setFinancialMethod] = useState<FinancialMethod>(() => {
    if (typeof window === "undefined") return "bank";
    const saved = localStorage.getItem(STORAGE_KEY_FINANCIAL_METHOD);
    if (saved === "bank" || saved === "monthly-income" || saved === "combination") return saved;
    return "bank";
  });

  const classes = fontSizeClasses[fontSize];

  // Save progress
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHECKED, JSON.stringify(checked));
    } catch {
      // ignore
    }
  }, [checked]);

  // Save font size preference
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FONTSIZE, fontSize);
    } catch {
      // ignore
    }
  }, [fontSize]);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FINANCIAL_METHOD, financialMethod);
    } catch {
      // ignore
    }
  }, [financialMethod]);

  const handleToggle = (key: string) => {
    setChecked((prev) => {
      const newValue = !prev[key];
      // Track the event
      analytics.trackChecklistItem('retirement', key, newValue);
      return { ...prev, [key]: newValue };
    });
  };

  const handleReset = () => {
    if (window.confirm("Reset all checkboxes? This cannot be undone.")) {
      setChecked({});
      analytics.trackReset('retirement');
    }
  };

  const filteredSections = useMemo<ChecklistSectionWithKeys[]>(
    () =>
      retirementChecklist.sections.map((section, sectionIndex) => ({
        title: section.title,
        items: section.items
          .filter((item) => !item.financialMethods || item.financialMethods.includes(financialMethod))
          .map((item, itemIndex) => ({
            ...item,
            itemKey: `${sectionIndex}:${itemIndex}:${item.text}`,
          })),
      })),
    [financialMethod]
  );

  // Total visible checklist items + 1 extra for forms checkbox
  const total = useMemo(
    () => filteredSections.reduce((sum, s) => sum + s.items.length, 0),
    [filteredSections]
  );
  const totalWithForms = total + 1;
  const visibleKeys = useMemo(
    () =>
      new Set([
        "__forms__",
        ...filteredSections.flatMap((section) => section.items.map((item) => item.itemKey)),
      ]),
    [filteredSections]
  );
  const done = useMemo(
    () => Object.entries(checked).filter(([key, value]) => Boolean(value) && visibleKeys.has(key)).length,
    [checked, visibleKeys]
  );
  const pct = totalWithForms ? Math.round((done / totalWithForms) * 100) : 0;
  return (
    <div className="min-h-screen bg-[#eef3fb] print:min-h-0 print:bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto w-full max-w-5xl px-5 print:px-0">
        {/* Top actions */}
        <div className="flex flex-col gap-3 pt-8 print:hidden sm:flex-row sm:items-center sm:justify-between">
          <Button asChild className="h-12 justify-start rounded-2xl border border-slate-300 bg-white px-5 text-base text-slate-900 hover:bg-slate-50">
            <Link href="/visa/retirement/stages">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Retirement Stages
            </Link>
          </Button>

          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:gap-3">
            <Button
              asChild
              variant="outline"
              className="h-11 flex-1 basis-0 rounded-2xl bg-white px-3 text-sm hover:bg-slate-50 sm:h-12 sm:flex-none sm:basis-auto sm:px-5 sm:text-base"
            >
              <Link href="/contact">Send feedback</Link>
            </Button>

            {/* Font Size Selector */}
            <div className="order-2 basis-full flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm sm:order-none sm:basis-auto">
              <span className="text-sm font-medium text-slate-700">Text Size:</span>
              <div className="flex gap-1">
                {(["small", "medium", "large"] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setFontSize(size);
                      analytics.trackFontSizeChange(size, 'retirement');
                    }}
                    className={`rounded-lg px-3 py-1 text-sm font-medium transition capitalize ${
                      fontSize === size
                        ? "bg-blue-800 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              onClick={handleReset}
              className="h-11 flex-1 basis-0 rounded-2xl bg-white px-3 text-sm hover:bg-slate-50 sm:h-12 sm:flex-none sm:basis-auto sm:px-5 sm:text-base"
            >
              Reset
            </Button>

            <Button
              onClick={async () => {
                const allowed = await allowPrintWithEmailGate("retirement-extension", () => {
                  analytics.trackPrint('retirement');
                  window.print();
                });
                if (!allowed) return;
              }}
              className="h-11 flex-1 basis-0 rounded-2xl bg-blue-800 px-3 text-sm hover:bg-blue-900 sm:h-12 sm:flex-none sm:basis-auto sm:px-5 sm:text-base"
            >
              <Printer className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Print
            </Button>
          </div>
        </div>

        <div className="mt-6 print:hidden">
          <ChecklistNotice />
        </div>

        {/* Content */}
        <Card className="mt-6 rounded-3xl border-0 bg-white shadow-sm print:mt-0 print:rounded-none print:shadow-none print:scale-95">
          <CardContent className="p-10 print:px-4 print:pt-0 print:pb-0">
            <PrintChecklistHeader />
            <h1 className={`${classes.title} text-center font-extrabold tracking-tight text-slate-900`}>
              {retirementChecklist.title}
            </h1>
            <p className={`mt-2 ${classes.subtitle} text-center text-slate-600`}>
              {retirementChecklist.subtitle}
            </p>

            {/* Progress bar (screen only) */}
            <div className="mt-8 print:hidden">
              <div className={`flex items-center justify-between ${classes.progress} font-semibold text-slate-700`}>
                <div>
                  Progress: {done} of {totalWithForms} items
                </div>
                <div>{pct}%</div>
              </div>
              <div className="mt-2">
                <Progress value={pct} className="h-3 [&>div]:bg-[#249C0F]" />
              </div>
            </div>

            {/* Application forms */}
            <div className="mt-8 print:mt-4">
              <div className={`${fontSizeClasses[fontSize].sectionTitle} font-extrabold text-slate-900`}>
                Application Forms
              </div>
              <div className="mt-2 h-[3px] w-full rounded-full bg-blue-800 print:mt-1" />

              <label className="mt-4 flex cursor-pointer items-start gap-3 print:gap-2">
                <Checkbox
                  checked={!!checked["__forms__"]}
                  onCheckedChange={() => handleToggle("__forms__")}
                  className="mt-1 h-5 w-5 rounded-md border-slate-600 print:border-black print:h-4 print:w-4 data-[state=checked]:bg-[#249C0F] data-[state=checked]:border-[#249C0F]"
                />

                <div className="flex-1">
                  <div className={`${classes.itemText} text-slate-900 leading-snug`}>
                    Download and complete the required application form:
                  </div>

                  <div className="mt-3 print:mt-2">
                    <FormChips />
                  </div>
                </div>
              </label>
            </div>

            {/* Sections */}
            {filteredSections.map((section) => (
              <Section
                key={section.title}
                title={section.title}
                items={section.items}
                checked={checked}
                onToggle={handleToggle}
                fontSize={fontSize}
                financialMethod={financialMethod}
                onFinancialMethodChange={setFinancialMethod}
              />
            ))}

            {/* Tips */}
            <div className="mt-8 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-5 print:mt-2 print:p-4 print:break-inside-auto">
              <div className={`${classes.itemText} font-bold text-amber-900`}>Notes</div>
              <ul className={`mt-2 list-disc space-y-1 pl-6 ${classes.label} text-amber-900`}>
                {retirementChecklist.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>

          </CardContent>
        </Card>

        <div className="mt-6 print:hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-lg font-extrabold text-slate-900">Frequently Asked Questions</div>
          <Accordion type="single" collapsible className="mt-3 space-y-3">
            <AccordionItem value="faq-1" className="rounded-2xl border border-slate-200 bg-white px-4">
              <AccordionTrigger className="text-left text-sm font-bold text-slate-900 hover:no-underline sm:text-base">
                <span className="min-w-0">
                  How far in advance can I apply for a retirement extension at Chaeng Wattana?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-slate-700">
                At Chaeng Wattana (Immigration Division 1), a common rule is that you can apply when you have 45
                days or less remaining on your current stamp. Office practice can change, so confirm with the office
                before you go.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-2" className="rounded-2xl border border-slate-200 bg-white px-4">
              <AccordionTrigger className="text-left text-sm font-bold text-slate-900 hover:no-underline sm:text-base">
                <span className="min-w-0">What if my passport has less than one year remaining?</span>
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-slate-700">
                Immigration will only grant your one-year Non-Immigrant O (Retirement) extension up to your
                passport&apos;s expiry date. If your passport has less than 12 months remaining at the time of
                application, your extension will be shortened to match the remaining validity. For this reason, it is
                advisable to renew your passport before applying if it has less than one year remaining. Also note
                that many countries require at least 6 months of passport validity for international travel.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          @page {
            margin: 0.3in;
            size: letter;
          }

          html, body {
            height: auto !important;
            overflow: visible !important;
          }

          body {
            margin: 0 !important;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          * {
            box-shadow: none !important;
          }

          /* Prevent page breaks inside elements */
          h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }

          /* Prevent orphans and widows */
          p, li {
            orphans: 3;
            widows: 3;
          }

          /* Keep sections together */
          section, div[class*="Section"] {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          /* Allow tips section to break if needed */
          .print\\:break-inside-auto {
            page-break-inside: auto !important;
            break-inside: auto !important;
          }

          /* Scale content to fit on one page - zoom affects layout, transform does not */
          .print\\:scale-95 {
            zoom: 0.90 !important;
          }

          header { display: none !important; }
          footer { display: none !important; }
        }
      `}</style>
    </div>
  );
}
