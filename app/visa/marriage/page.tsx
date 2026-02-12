"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, FileDown, Printer } from "lucide-react";
import { marriageChecklist } from "@/lib/data/marriage";
import type { ChecklistItem } from "@/lib/data/marriage";

/* ── Storage keys ── */
const STORAGE_KEY_CHECKED = "thai-visa-checklist:marriage:checked:v1";
const STORAGE_KEY_FONTSIZE = "thai-visa-checklist:fontsize:v1";

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
};

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
    <div className="mt-10 print:mt-4">
      <div className={`${classes.sectionTitle} font-extrabold text-slate-900`}>{title}</div>
      <div className="mt-3 h-[3px] w-full rounded-full bg-blue-700 print:mt-1" />

      <div className="mt-5 grid gap-4 print:mt-2 print:gap-2">
        {items.map((item, idx) => {
          const key = `${title}:${idx}`;
          return (
            <label
              key={key}
              className="flex items-start gap-4 print:gap-2 cursor-pointer"
            >
              <div className="pt-1">
                <Checkbox
                  checked={!!checked[key]}
                  onCheckedChange={() => onToggle(key)}
                  className="h-6 w-6 rounded-md print:h-4 print:w-4"
                />
              </div>
              <div className={`${classes.itemText} text-slate-900`}>
                <div className="leading-snug">
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
                <div className={`mt-1 ${classes.label} text-slate-500`}>
                  {item.required ? "Required" : "Optional"}
                </div>
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

  // Load saved progress and font size on mount
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

  // Save progress when checked changes (skip initial empty state)
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

  // Toggle a single checkbox
  const handleToggle = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Reset with confirmation
  const handleReset = () => {
    if (window.confirm("Reset all checkboxes? This cannot be undone.")) {
      setChecked({});
    }
  };

  // Progress calculation
  const total = useMemo(() => {
    let count = 0;
    marriageChecklist.sections.forEach((s) => (count += s.items.length));
    return count;
  }, []);

  const done = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);
  const pct = total ? Math.round((done / total) * 100) : 0;

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

          <div className="flex flex-wrap gap-3 items-center">
            {/* Font Size Selector */}
            <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2 shadow-sm border border-slate-200">
              <span className="text-sm font-medium text-slate-700">Text Size:</span>
              <div className="flex gap-1">
                {(["small", "medium", "large"] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition capitalize ${
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
              onClick={() => alert("PDF export coming soon!")}
              className="h-12 rounded-2xl bg-red-600 px-5 text-base hover:bg-red-700"
            >
              <FileDown className="mr-2 h-5 w-5" /> PDF
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
            <h1 className={`${classes.title} font-extrabold tracking-tight text-slate-900`}>
              {marriageChecklist.title}
            </h1>
            <p className={`mt-3 ${classes.subtitle} text-slate-600`}>
              {marriageChecklist.subtitle}
            </p>
            <p className={`mt-1 ${classes.label} text-slate-400`}>
              Last updated: {marriageChecklist.lastUpdated}
            </p>
            <p className={`mt-2 ${classes.progress} text-slate-500`}>Document Checklist</p>

            {/* Progress bar */}
            <div className="mt-10 print:hidden">
              <div
                className={`flex items-center justify-between ${classes.progress} font-semibold text-slate-700`}
              >
                <div>
                  Progress: {done} of {total} items
                </div>
                <div>{pct}%</div>
              </div>
              <div className="mt-3">
                <Progress value={pct} className="h-3" />
              </div>
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
            <div className="mt-12 rounded-lg bg-amber-50 border-l-4 border-amber-500 p-6 print:mt-6 print:p-4">
              <div className={`${classes.itemText} font-bold text-amber-900`}>
                Important Notes:
              </div>
              <ul className={`mt-3 list-disc pl-6 ${classes.label} text-amber-900 space-y-2`}>
                {marriageChecklist.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="py-10 text-xs text-slate-500">
          <Separator className="mb-4" />
          Reminder: exact document requirements can vary by immigration office.
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
