"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Printer } from "lucide-react";
import { analytics } from "@/lib/analytics";
import ChecklistNotice from "@/components/checklist-notice";
import ExampleLink from "@/components/example-link";
import PrintChecklistHeader from "@/components/print-checklist-header";
import { retirementStageTwoChecklist as stageTwoChecklist } from "@/lib/data/checklists/retirement-convert-in-thailand-checklist";
import type { ChecklistItem } from "@/lib/data/checklists/types";
import { useContextualBackLink } from "@/lib/use-contextual-back-link";
import { allowPrintWithEmailGate } from "@/lib/print-email-gate";

const STORAGE_KEY_CHECKED = "thai-visa-checklist:retirement:stage2:checked:v1";
const STORAGE_KEY_FONTSIZE = "thai-visa-checklist:fontsize:v1";

const APPLICATION_FORMS = [
  { code: "TM.86", url: "https://bangkok.immigration.go.th/en/downloads_en/" },
  { code: "TM.87", url: "https://bangkok.immigration.go.th/en/downloads_en/" },
  { code: "STM.2", url: "https://bangkok.immigration.go.th/wp-content/uploads/STM-2-FORM-2025.pdf" },
  { code: "STM.9", url: "https://bangkok.immigration.go.th/wp-content/uploads/STM-9-FORM-2025.pdf" },
  { code: "STM.11", url: "https://bangkok.immigration.go.th/wp-content/uploads/STM-11-FORM-2025.pdf" },
] as const;

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

function FormChips() {
  return (
    <div className="flex flex-wrap gap-2">
      {APPLICATION_FORMS.map((form) => (
        <a
          key={form.code}
          href={form.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 print:bg-white print:text-slate-900 print:border-slate-300"
          onClick={(e) => e.stopPropagation()}
        >
          {form.code}
          <span className="text-slate-400 print:hidden">↗</span>
        </a>
      ))}
    </div>
  );
}

function Section({
  title,
  items,
  checked,
  onToggle,
  fontSize,
}: {
  title: string;
  items: ChecklistItem[];
  checked: Record<string, boolean>;
  onToggle: (key: string) => void;
  fontSize: FontSize;
}) {
  const classes = fontSizeClasses[fontSize];

  return (
    <div className="mt-6 print:mt-2">
      <div className={`${classes.sectionTitle} font-extrabold text-slate-900`}>{title}</div>
      <div className="mt-2 h-[3px] w-full rounded-full bg-blue-800 print:mt-1" />

      <div className="mt-3 grid gap-2 print:mt-1 print:gap-1">
        {items.map((item, idx) => {
          const key = `${title}:${idx}`;
          return (
            <label key={key} className="flex cursor-pointer items-center gap-3 print:gap-2">
              <Checkbox
                checked={!!checked[key]}
                onCheckedChange={() => onToggle(key)}
                className="h-5 w-5 rounded-md border-slate-600 print:border-black print:h-4 print:w-4 data-[state=checked]:bg-[#249C0F] data-[state=checked]:border-[#249C0F]"
              />
              <div className={`${classes.itemText} text-slate-900 leading-snug`}>
                {item.text}
                {item.noteLink && item.noteUrl && (
                  <ExampleLink
                    href={item.noteUrl}
                    label={item.noteLink}
                    className="ml-2 align-middle"
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </div>
            </label>
          );
        })}
      </div>

      <style>{`
        @media print {
          header { display: none !important; }
          footer { display: none !important; }
        }
      `}</style>
    </div>
  );
}

export default function RetirementStageTwoPage() {
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

  const classes = fontSizeClasses[fontSize];

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHECKED, JSON.stringify(checked));
    } catch {
      // ignore
    }
  }, [checked]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FONTSIZE, fontSize);
    } catch {
      // ignore
    }
  }, [fontSize]);

  const handleToggle = (key: string) => {
    setChecked((prev) => {
      const newValue = !prev[key];
      analytics.trackChecklistItem("retirement-stage-2", key, newValue);
      return { ...prev, [key]: newValue };
    });
  };

  const handleReset = () => {
    if (window.confirm("Reset all checkboxes? This cannot be undone.")) {
      setChecked({});
      analytics.trackReset("retirement-stage-2");
    }
  };

  const total = useMemo(
    () => stageTwoChecklist.sections.reduce((sum, section) => sum + section.items.length, 0),
    []
  );
  const totalWithForms = total + 1;
  const done = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);
  const pct = totalWithForms ? Math.round((done / totalWithForms) * 100) : 0;
  const { href: backHref, label: backLabel } = useContextualBackLink(
    "/visa/retirement/stages",
    "Back to Retirement Stages"
  );

  return (
    <div className="min-h-screen bg-[#eef3fb] print:min-h-0 print:bg-white">
      <div className="mx-auto w-full max-w-5xl px-5 print:px-0">
        <div className="flex flex-col gap-3 pt-8 print:hidden sm:flex-row sm:items-center sm:justify-between">
          <Button asChild className="h-12 justify-start rounded-2xl bg-slate-600 px-5 text-base hover:bg-slate-700">
            <Link href={backHref}>
              <ArrowLeft className="mr-2 h-5 w-5" /> {backLabel}
            </Link>
          </Button>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="outline" className="h-12 rounded-2xl bg-white px-5 text-base hover:bg-slate-50">
              <Link href="/contact">Send feedback</Link>
            </Button>

            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <span className="text-sm font-medium text-slate-700">Text Size:</span>
              <div className="flex gap-1">
                {(["small", "medium", "large"] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setFontSize(size);
                      analytics.trackFontSizeChange(size, "retirement-stage-2");
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
              className="h-12 rounded-2xl bg-white px-5 text-base hover:bg-slate-50"
            >
              Reset
            </Button>

            <Button
              onClick={async () => {
                const allowed = await allowPrintWithEmailGate("retirement-stage-2", () => {
                  analytics.trackPrint("retirement-stage-2");
                  window.print();
                });
                if (!allowed) return;
              }}
              className="h-12 rounded-2xl bg-blue-800 px-5 text-base hover:bg-blue-900"
            >
              <Printer className="mr-2 h-5 w-5" /> Print
            </Button>
          </div>
        </div>

        <div className="mt-6 print:hidden">
          <ChecklistNotice />
        </div>

        <Card className="mt-6 rounded-3xl border-0 bg-white shadow-sm print:mt-0 print:rounded-none print:shadow-none print:scale-95">
          <CardContent className="p-6 sm:p-10 print:px-4 print:pt-0 print:pb-0">
            <PrintChecklistHeader />
            <h1 className={`${classes.title} text-center font-extrabold tracking-tight text-slate-900`}>
              {stageTwoChecklist.title}
            </h1>
            <p className={`mt-2 ${classes.subtitle} text-center text-slate-600`}>{stageTwoChecklist.subtitle}</p>

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

            <div className="mt-8 print:mt-4">
              <div className={`${classes.sectionTitle} font-extrabold text-slate-900`}>
                Application forms
              </div>
              <div className="mt-2 h-[3px] w-full rounded-full bg-blue-800 print:mt-1" />

              <label className="mt-4 flex cursor-pointer items-start gap-3 print:gap-2">
                <Checkbox
                  checked={!!checked.__forms__}
                  onCheckedChange={() => handleToggle("__forms__")}
                  className="mt-1 h-5 w-5 rounded-md border-slate-600 print:border-black print:h-4 print:w-4 data-[state=checked]:bg-[#249C0F] data-[state=checked]:border-[#249C0F]"
                />
                <div className="flex-1">
                  <div className={`${classes.itemText} text-slate-900 leading-snug`}>
                    Download and complete the forms required by your immigration office:
                  </div>
                  <div className="mt-3 print:mt-2">
                    <FormChips />
                  </div>
                  <ul className={`mt-3 list-disc space-y-1 pl-5 ${classes.label} text-slate-700`}>
                    <li>TM.86 → Used if converting from Tourist Visa.</li>
                    <li>TM.87 → Used if converting from Visa Exempt.</li>
                  </ul>
                </div>
              </label>
            </div>

            {stageTwoChecklist.sections.map((section) => (
              <Section
                key={section.title}
                title={section.title}
                items={section.items}
                checked={checked}
                onToggle={handleToggle}
                fontSize={fontSize}
              />
            ))}

            <div className="mt-8 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-5 print:mt-2 print:p-4 print:break-inside-auto">
              <div className={`${classes.itemText} font-bold text-amber-900`}>Notes</div>
              <ul className={`mt-2 list-disc space-y-1 pl-6 ${classes.label} text-amber-900`}>
                {stageTwoChecklist.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
