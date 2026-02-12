"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Printer } from "lucide-react";
import { marriageChecklist } from "@/lib/data/marriage";
import type { ChecklistItem } from "@/lib/data/marriage";

/* ── Storage keys ── */
const STORAGE_KEY_CHECKED = "thai-visa-checklist:marriage:checked:v1";
const STORAGE_KEY_FONTSIZE = "thai-visa-checklist:fontsize:v1";

/* ── Application form links (compact pills) ── */
const APPLICATION_FORMS = [
  {
    code: "TM.7",
    url: "https://www.immigration.go.th/wp-content/uploads/2022/10/4.%E0%B8%84%E0%B8%B3%E0%B8%82%E0%B8%AD%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%8D%E0%B8%B2%E0%B8%95%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%AD%E0%B8%A2%E0%B8%B9%E0%B9%88%E0%B9%83%E0%B8%99%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%AD%E0%B8%B2%E0%B8%93%E0%B8%B2%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%A3%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%A7%E0%B8%84%E0%B8%A3%E0%B8%B2%E0%B8%A7%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B9%84%E0%B8%9B-%E0%B8%95%E0%B8%A1.7.pdf",
  },
  { code: "STM.2", url: "https://bangkok.immigration.go.th/wp-content/uploads/STM-2-FORM-2025.pdf" },
  { code: "STM.9", url: "https://bangkok.immigration.go.th/wp-content/uploads/STM-9-FORM-2025.pdf" },
  { code: "STM.10", url: "https://bangkok.immigration.go.th/wp-content/uploads/STM-10-FORM-2025.pdf" },
  { code: "STM.11", url: "https://bangkok.immigration.go.th/wp-content/uploads/STM-11-FORM-2025.pdf" },
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
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
          onClick={(e) => e.stopPropagation()}
        >
          {f.code}
          <span className="text-slate-400">↗</span>
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

/* ── Section component ── */
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
    <div className="mt-6 print:mt-3">
      <div className={`${classes.sectionTitle} font-extrabold text-slate-900`}>{title}</div>
      <div className="mt-2 h-[3px] w-full rounded-full bg-blue-700 print:mt-1" />

      <div className="mt-3 grid gap-2 print:mt-1 print:gap-1">
        {items.map((item, idx) => {
          const key = `${title}:${idx}`;
          return (
            <label key={key} className="flex cursor-pointer items-center gap-3 print:gap-2">
              <Checkbox
                checked={!!checked[key]}
                onCheckedChange={() => onToggle(key)}
                className="h-5 w-5 rounded-md print:h-4 print:w-4 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
              <div className={`${classes.itemText} text-slate-900 leading-snug`}>
                {item.text}
                {item.noteLink && item.noteUrl && (
                  <a
                    href={item.noteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-700 underline underline-offset-2 print:hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.noteLink}
                  </a>
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
export default function MarriageVisaPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [fontSize, setFontSize] = useState<FontSize>("small");
  const [loaded, setLoaded] = useState(false);

  const classes = fontSizeClasses[fontSize];

  // Load saved progress + font size
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CHECKED);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") setChecked(parsed);
      }

      const savedSize = localStorage.getItem(STORAGE_KEY_FONTSIZE);
      if (savedSize === "small" || savedSize === "medium" || savedSize === "large") {
        setFontSize(savedSize);
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  // Save progress
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_CHECKED, JSON.stringify(checked));
    } catch {
      // ignore
    }
  }, [checked, loaded]);

  // Save font size preference
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_FONTSIZE, fontSize);
    } catch {
      // ignore
    }
  }, [fontSize, loaded]);

  const handleToggle = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleReset = () => {
    if (window.confirm("Reset all checkboxes? This cannot be undone.")) {
      setChecked({});
    }
  };

  // Total checklist items (data) + 1 extra for forms checkbox
  const total = useMemo(
    () => marriageChecklist.sections.reduce((sum, s) => sum + s.items.length, 0),
    []
  );
  const totalWithForms = total + 1;

  const done = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);
  const pct = totalWithForms ? Math.round((done / totalWithForms) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-5">
        {/* Top actions */}
        <div className="flex flex-col gap-3 pt-8 print:hidden sm:flex-row sm:items-center sm:justify-between">
          <Button asChild className="h-12 justify-start rounded-2xl bg-slate-600 px-5 text-base hover:bg-slate-700">
            <Link href="/">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Visa Selection
            </Link>
          </Button>

          <div className="flex flex-wrap items-center gap-3">
            {/* Font Size Selector */}
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <span className="text-sm font-medium text-slate-700">Text Size:</span>
              <div className="flex gap-1">
                {(["small", "medium", "large"] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`rounded-lg px-3 py-1 text-sm font-medium transition capitalize ${
                      fontSize === size
                        ? "bg-indigo-600 text-white"
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
              onClick={() => window.print()}
              className="h-12 rounded-2xl bg-blue-600 px-5 text-base hover:bg-blue-700"
            >
              <Printer className="mr-2 h-5 w-5" /> Print
            </Button>
          </div>
        </div>

        {/* Content */}
        <Card className="mt-6 rounded-3xl border-0 bg-white shadow-sm">
          <CardContent className="p-10 print:p-6">
            <h1 className={`${classes.title} text-center font-extrabold tracking-tight text-slate-900`}>
              {marriageChecklist.title}
            </h1>

            {/* Progress bar */}
            <div className="mt-6 print:hidden">
              <div className={`flex items-center justify-between ${classes.progress} font-semibold text-slate-700`}>
                <div>
                  Progress: {done} of {totalWithForms} items
                </div>
                <div>{pct}%</div>
              </div>
              <div className="mt-2">
                <Progress value={pct} className="h-3 [&>div]:bg-green-500" />
              </div>
            </div>

            {/* Application forms (UNDER progress bar) */}
            <div className="mt-8 print:hidden">
              <div className={`${fontSizeClasses[fontSize].sectionTitle} font-extrabold text-slate-900`}>
                Application forms
              </div>
              <div className="mt-2 h-[3px] w-full rounded-full bg-blue-700" />

              <label className="mt-4 flex cursor-pointer items-start gap-3">
                <Checkbox
                  checked={!!checked["__forms__"]}
                  onCheckedChange={() => handleToggle("__forms__")}
                  className="mt-1 h-5 w-5 rounded-md data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                />

                <div className="flex-1">
                  <div className={`${classes.itemText} text-slate-900 leading-snug`}>
                    Download and complete the required application forms:
                  </div>

                  <div className="mt-3">
                    <FormChips />
                  </div>
                </div>
              </label>
            </div>

            {/* Sections */}
            {marriageChecklist.sections.map((section) => (
              <Section
                key={section.title}
                title={section.title}
                items={section.items}
                checked={checked}
                onToggle={handleToggle}
                fontSize={fontSize}
              />
            ))}

            {/* Tips */}
            <div className="mt-8 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-5 print:mt-4 print:p-4">
              <div className={`${classes.itemText} font-bold text-amber-900`}>Extra Tips:</div>
              <ul className={`mt-2 list-disc space-y-1 pl-6 ${classes.label} text-amber-900`}>
                {marriageChecklist.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="py-8 text-xs text-slate-500">
          <Separator className="mb-4" />
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          @page { margin: 0.5in; }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}
