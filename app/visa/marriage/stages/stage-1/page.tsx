"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Printer } from "lucide-react";
import { analytics } from "@/lib/analytics";

const STORAGE_KEY_CHECKED = "thai-visa-checklist:marriage:stage1:checked:v1";
const STORAGE_KEY_FONTSIZE = "thai-visa-checklist:fontsize:v1";

type ChecklistItem = {
  text: string;
};

type ChecklistSection = {
  title: string;
  items: ChecklistItem[];
};

const APPLICATION_FORMS = [{ code: "Thai e-Visa", url: "https://www.thaievisa.go.th" }] as const;

const stageOneChecklist: {
  title: string;
  subtitle: string;
  sections: ChecklistSection[];
  tips: string[];
} = {
  title: "Marriage Visa - Stage 1",
  subtitle: "Apply Abroad for Non-Immigrant O - To stay with Thai family residing in Thailand (More than 60 days)",
  sections: [
    {
      title: "1) Key Rules Before Applying",
      items: [
        { text: "Apply outside of Thailand (home country or neighboring country such as Laos or Vietnam)" }, 
        { text: "Have proof that you're physically in that country, such as an Entry stamp or visa"},
        { text: "Passport validity: 6+ months (single entry)" },
      ],
    },
    {
      title: "2) Required Documents (Upload to eVisa)",
      items: [
        { text: "Passport bio page" },
        { text: "Photo, taken within last 6 months" },
        { text: "Document indicating current location (utility bill or entry stamp/visa)" },
        { text: "Show one of the following: monthly income 40,000 THB+ OR bank balance 400,000 THB+" },
        { text: "Bank statement covering the last 3 months" },
        { text: "Marriage certificate (Kor Ror 2 and Kor Ror 3 if married in Thailand)" },
        { text: "Thai spouse ID card" },
        { text: "Thai spouse house registration (Tabien Baan)" },
        { text: "Invitation/supporting letter from your spouse (sponsor letter) (recommended)" },
      ],
    },
    {
      title: "3) Travel Information Required in Application",
      items: [
        { text: "Intended date of entry" },
        { text: "Port of arrival (Air/Land/Sea)" },
        { text: "Flight number or transport details" },
        { text: "Accommodation address in Thailand" },
      ],
    },
    {
      title: "4) After Submission",
      items: [
        { text: "You will receive a QR code via the eVisa System" },
        { text: "Visit selected embassy to pay visa fee" },
        { text: "Processing is typically 3-5 working days" },
        { text: "Remain in that country until approved" },
      ],
    },
    {
      title: "5) After Approval",
      items: [
        { text: "Print/save your visa approval document" },
        { text: "Carry full document set when entering Thailand" },
        { text: "TM30 must be filed after arrival" },
      ],
    },
  ],
  tips: [
    "Do not apply more than 3 months before intended arrival.",
    "Embassy requirements can vary slightly by location, they may email requesting additional information.",
    "If you struggle scanning and uploading your documents, request help from a friend.",
    "It's important that your information, images and documents are uploaded correctly and clearly."
  ],
};

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
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 print:bg-white print:text-slate-900 print:border-slate-300"
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
      <div className="mt-2 h-[3px] w-full rounded-full bg-blue-700 print:mt-1" />

      <div className="mt-3 grid gap-2 print:mt-1 print:gap-1">
        {items.map((item, idx) => {
          const key = `${title}:${idx}`;
          return (
            <label key={key} className="flex cursor-pointer items-center gap-3 print:gap-2">
              <Checkbox
                checked={!!checked[key]}
                onCheckedChange={() => onToggle(key)}
                className="h-5 w-5 rounded-md print:h-4 print:w-4 data-[state=checked]:bg-[#249C0F] data-[state=checked]:border-[#249C0F]"
              />
              <div className={`${classes.itemText} text-slate-900 leading-snug`}>{item.text}</div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default function MarriageStageOnePage() {
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
      analytics.trackChecklistItem("marriage-stage-1", key, newValue);
      return { ...prev, [key]: newValue };
    });
  };

  const handleReset = () => {
    if (window.confirm("Reset all checkboxes? This cannot be undone.")) {
      setChecked({});
      analytics.trackReset("marriage-stage-1");
    }
  };

  const total = useMemo(
    () => stageOneChecklist.sections.reduce((sum, section) => sum + section.items.length, 0),
    []
  );
  const done = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#eef3fb] print:min-h-0 print:bg-white">
      <div className="mx-auto w-full max-w-5xl px-5 print:px-0">
        <div className="flex flex-col gap-3 pt-8 print:hidden sm:flex-row sm:items-center sm:justify-between">
          <Button asChild className="h-12 justify-start rounded-2xl bg-slate-600 px-5 text-base hover:bg-slate-700">
            <Link href="/visa/marriage/stages">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Marriage Visa Stages
            </Link>
          </Button>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <span className="text-sm font-medium text-slate-700">Text Size:</span>
              <div className="flex gap-1">
                {(["small", "medium", "large"] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setFontSize(size);
                      analytics.trackFontSizeChange(size, "marriage-stage-1");
                    }}
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
              onClick={() => {
                analytics.trackPrint("marriage-stage-1");
                window.print();
              }}
              className="h-12 rounded-2xl bg-blue-600 px-5 text-base hover:bg-blue-700"
            >
              <Printer className="mr-2 h-5 w-5" /> Print
            </Button>
          </div>
        </div>

        <Card className="mt-6 rounded-3xl border-0 bg-white shadow-sm print:mt-0 print:rounded-none print:shadow-none print:scale-95">
          <CardContent className="p-6 sm:p-10 print:p-4 print:pb-0">
            <h1 className={`${classes.title} text-center font-extrabold tracking-tight text-slate-900`}>
              {stageOneChecklist.title}
            </h1>
            <p className={`mt-2 ${classes.subtitle} text-center text-slate-600`}>{stageOneChecklist.subtitle}</p>

            <div className="mt-8 print:hidden">
              <div className={`flex items-center justify-between ${classes.progress} font-semibold text-slate-700`}>
                <div>
                  Progress: {done} of {total} items
                </div>
                <div>{pct}%</div>
              </div>
              <div className="mt-2">
                <Progress value={pct} className="h-3 [&>div]:bg-[#249C0F]" />
              </div>
            </div>

            <div className="mt-8 print:mt-4">
              <div className={`${classes.itemText} text-slate-900 leading-snug`}>
                Apply via the official system:
              </div>
              <div className="mt-3 print:mt-2">
                <FormChips />
              </div>
            </div>

            {stageOneChecklist.sections.map((section) => (
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
              <div className={`${classes.itemText} font-bold text-amber-900`}>Important notes</div>
              <ul className={`mt-2 list-disc space-y-1 pl-6 ${classes.label} text-amber-900`}>
                {stageOneChecklist.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>

              <div className="hidden print:block mt-4 pt-3 border-t border-amber-200 text-center text-[10px] text-amber-600">
                thaivisachecklist.com
              </div>
            </div>

            <div className="mt-8 print:hidden">
              <Separator />
            </div>
          </CardContent>
        </Card>
      </div>

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

          h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }

          p, li {
            orphans: 3;
            widows: 3;
          }

          section, div[class*="Section"] {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          .print\\:break-inside-auto {
            page-break-inside: auto !important;
            break-inside: auto !important;
          }

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
