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

const STORAGE_KEY_CHECKED = "thai-visa-checklist:marriage:stage2:checked:v1";
const STORAGE_KEY_FONTSIZE = "thai-visa-checklist:fontsize:v1";

type ChecklistItem = {
  text: string;
};

type ChecklistSection = {
  title: string;
  items: ChecklistItem[];
};

const APPLICATION_FORMS = [
  { code: "TM.86", url: "https://www.inter.chula.ac.th/wp-content/uploads/2022/02/TM86.pdf" },
  { code: "TM.87", url: "https://www.inter.chula.ac.th/wp-content/uploads/2022/02/TM87.pdf" },
  { code: "STM.2", url: "https://bangkok.immigration.go.th/wp-content/uploads/STM-2-FORM-2025.pdf" },
  { code: "STM.9", url: "https://bangkok.immigration.go.th/wp-content/uploads/STM-9-FORM-2025.pdf" },
  { code: "STM.11", url: "https://bangkok.immigration.go.th/wp-content/uploads/STM-11-FORM-2025.pdf" },
] as const;

const stageTwoChecklist: {
  title: string;
  subtitle: string;
  sections: ChecklistSection[];
  tips: string[];
} = {
  title: "Marriage Visa Stage 2",
  subtitle: "Change Visa in Thailand to Non-Immigrant O (Marriage)",
  sections: [
    {
      title: "Pre-check Eligibility",
      items: [
        { text: "You have at least 15 days remaining (some offices require 21 days)" },
        { text: "TM.30 address reporting is completed (receipt required)" },
      ],
    },
    {
      title: "Personal Documents",
      items: [
        { text: "Passport (Valid at least 6 months with 2+ blank pages)" },
        { text: "2x passport photos, taken within 6-months (4×6 cm)" },
        { text: "Photocopy: Photo Page, Visa Stamp & Latest Entry Stamp" },
      ],
    },
    {
      title: "Relationship & Accommodation",
      items: [
        
        { text: "Your spouse in person" },
        { text: "Thai spouse National ID + copy" },
        { text: "Copy of spouse Blue Book (Tabien Baan)" },
        { text: "Renting a house or condo - Rental Contract, Copy of Landlord's ID & House Book"},
        { text: "Thai Marriage Certificate Kor Ror 3 - original + copy"},
        { text: "Kor Ror 2 (updated same year) - original + copy" },
        { text: "4 family photos (2 inside home + 2 outside home) on one page" },
        { text: "Hand-drawn map with major roads nearby" },
        { text: "Child's birth certificate (if applicable)" },
        { text: "Spouse name change document (if applicable)" },
        { text: "Signed letter from spouse confirming ongoing marriage"},
      ],
    },
    {
      title: "Proof of Income / Funds",
      items: [
        { text: "Bank book (original)" },
        { text: "Bank book updated on the day + copy" },
        { text: "Copy of bank book personal information page" },
        { text: "Bank statement covering last 2 months (issued within 7 days of appointment)" },
        { text: "Official bank letter confirming account holder details (Same day recommended)" },
        { text: "400,000 THB in bank (at least 2 months prior) OR 40,000 THB monthly salary with supporting documents" },
      ],
    },
    {
      title: "Payment",
      items: [{ text: "2,000 THB" }],
    },
  ],
  tips: [
    "Download all forms and prepare in advance",
    "Normally only 1 Passport photo is required, however, sometimes 2 is requested",
    "Prepare two copies of your documents (not always required, but recommended)",
    "Sign the bottom corner of every copy",
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

export default function MarriageStageTwoPage() {
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
      analytics.trackChecklistItem("marriage-stage-2", key, newValue);
      return { ...prev, [key]: newValue };
    });
  };

  const handleReset = () => {
    if (window.confirm("Reset all checkboxes? This cannot be undone.")) {
      setChecked({});
      analytics.trackReset("marriage-stage-2");
    }
  };

  const total = useMemo(
    () => stageTwoChecklist.sections.reduce((sum, section) => sum + section.items.length, 0),
    []
  );
  const totalWithForms = total + 1;
  const done = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);
  const pct = totalWithForms ? Math.round((done / totalWithForms) * 100) : 0;

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
                      analytics.trackFontSizeChange(size, "marriage-stage-2");
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
                analytics.trackPrint("marriage-stage-2");
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
              <div className={`${fontSizeClasses[fontSize].sectionTitle} font-extrabold text-slate-900`}>
                Application forms
              </div>
              <div className="mt-2 h-[3px] w-full rounded-full bg-blue-700 print:mt-1" />

              <label className="mt-4 flex cursor-pointer items-start gap-3 print:gap-2">
                <Checkbox
                  checked={!!checked.__forms__}
                  onCheckedChange={() => handleToggle("__forms__")}
                  className="mt-1 h-5 w-5 rounded-md print:h-4 print:w-4 data-[state=checked]:bg-[#249C0F] data-[state=checked]:border-[#249C0F]"
                />
                <div className="flex-1">
                  <div className={`${classes.itemText} text-slate-900 leading-snug`}>
                    Download and complete the required application forms:
                  </div>
                  <div className="mt-3 print:mt-2">
                    <FormChips />
                  </div>
                  <div className={`mt-2 ${classes.label} text-slate-700`}>
                    TM.86 → Used if converting from Tourist Visa.
                  </div>
                  <div className={`${classes.label} text-slate-700`}>
                    TM.87 → Used if converting from Visa Exempt or Non-Immigrant.
                  </div>
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
              <div className={`${classes.itemText} font-bold text-amber-900`}>Extra Tips:</div>
              <ul className={`mt-2 list-disc space-y-1 pl-6 ${classes.label} text-amber-900`}>
                {stageTwoChecklist.tips.map((tip) => (
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
