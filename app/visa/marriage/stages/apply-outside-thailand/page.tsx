"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Printer } from "lucide-react";
import { analytics } from "@/lib/analytics";
import ChecklistCustomizedBadge from "@/components/checklist-customized-badge";
import ChecklistRequirementsDisclaimer from "@/components/checklist-requirements-disclaimer";
import PrintChecklistHeader from "@/components/print-checklist-header";
import { marriageStageOneChecklist as stageOneChecklist } from "@/lib/data/checklists/marriage-stage-1-checklist";
import type { ChecklistItem } from "@/lib/data/checklists/types";
import { allowPrintWithEmailGate } from "@/lib/print-email-gate";
import { useChecklistCustomization } from "@/lib/use-checklist-customization";

const STORAGE_KEY_CHECKED = "thai-visa-checklist:marriage:stage1:checked:v1";
const STORAGE_KEY_FONTSIZE = "thai-visa-checklist:fontsize:v1";
const STORAGE_KEY_CUSTOMIZATIONS = "thai-visa-checklist:marriage:stage1:customizations:v1";

const APPLICATION_FORMS = [{ code: "Thai e-Visa", url: "https://www.thaievisa.go.th" }] as const;

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
type SectionItemWithKey = ChecklistItem & { itemKey: string; isCustom?: boolean; customId?: string };
type ChecklistSectionWithKeys = { title: string; items: SectionItemWithKey[] };

function FormChips() {
  return (
    <div className="flex flex-wrap gap-2">
      {APPLICATION_FORMS.map((form) => (
        <a
          key={form.code}
          href={form.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-sm font-medium text-slate-700 hover:bg-slate-100 print:bg-white print:text-slate-900 print:border-slate-300"
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
  isCustomizeMode,
  draftValue,
  onDraftChange,
  onAddCustomItem,
  onRemoveItem,
}: {
  title: string;
  items: SectionItemWithKey[];
  checked: Record<string, boolean>;
  onToggle: (key: string) => void;
  fontSize: FontSize;
  isCustomizeMode: boolean;
  draftValue: string;
  onDraftChange: (value: string) => void;
  onAddCustomItem: () => void;
  onRemoveItem: (item: SectionItemWithKey) => void;
}) {
  const classes = fontSizeClasses[fontSize];

  return (
    <div className="mt-6 print:mt-2">
      <div className={`${classes.sectionTitle} font-extrabold text-slate-900`}>{title}</div>
      <div className="mt-2 h-[3px] w-full rounded-full bg-pink-600 print:mt-1" />

      <div className="mt-3 grid gap-2 print:mt-1 print:gap-1">
        {items.map((item) => {
          const key = item.itemKey;
          return (
            <div key={key} className="flex items-start gap-2">
              <label className="flex flex-1 cursor-pointer items-center gap-3 print:gap-2">
                <Checkbox
                  checked={!!checked[key]}
                  onCheckedChange={() => onToggle(key)}
                  className="h-5 w-5 rounded-md border-slate-600 print:border-black print:h-4 print:w-4 data-[state=checked]:bg-[#249C0F] data-[state=checked]:border-[#249C0F]"
                />
                <div className={`${classes.itemText} text-slate-900 leading-snug`}>{item.text}</div>
              </label>
              {isCustomizeMode && (
                <button
                  type="button"
                  onClick={() => onRemoveItem(item)}
                  className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 print:hidden"
                >
                  {item.isCustom ? "Delete" : "Remove"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {isCustomizeMode && (
        <div className="mt-3 flex items-center gap-2 print:hidden">
          <input
            type="text"
            value={draftValue}
            onChange={(e) => onDraftChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onAddCustomItem();
              }
            }}
            placeholder="Add custom item for this section"
            className="h-9 flex-1 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
          />
          <button
            type="button"
            onClick={onAddCustomItem}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Add
          </button>
        </div>
      )}
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
  const {
    isCustomizeMode,
    setIsCustomizeMode,
    hiddenItemKeys,
    customItemsBySection,
    draftBySection,
    setDraftForSection,
    hideBaseItem,
    addCustomItem,
    removeCustomItem,
    resetCustomizations,
  } = useChecklistCustomization(STORAGE_KEY_CUSTOMIZATIONS);
  const hiddenItemKeySet = useMemo(() => new Set(hiddenItemKeys), [hiddenItemKeys]);
  const hasCustomizations = useMemo(
    () => hiddenItemKeys.length > 0 || Object.values(customItemsBySection).some((items) => items.length > 0),
    [hiddenItemKeys, customItemsBySection]
  );

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
    if (window.confirm("Reset checklist progress and customisations? This cannot be undone.")) {
      setChecked({});
      resetCustomizations();
      analytics.trackReset("marriage-stage-1");
    }
  };

  const baseSections = useMemo<ChecklistSectionWithKeys[]>(
    () =>
      stageOneChecklist.sections.map((section) => ({
        title: section.title,
        items: section.items.map((item, idx) => ({
          ...item,
          itemKey: `${section.title}:${idx}`,
        })),
      })),
    []
  );
  const customizedSections = useMemo<ChecklistSectionWithKeys[]>(
    () =>
      baseSections.map((section) => {
        const visibleBaseItems = section.items.filter((item) => !hiddenItemKeySet.has(item.itemKey));
        const customItems = (customItemsBySection[section.title] ?? []).map((item) => ({
          text: item.text,
          itemKey: `custom:${section.title}:${item.id}`,
          isCustom: true,
          customId: item.id,
        }));
        return {
          ...section,
          items: [...visibleBaseItems, ...customItems],
        };
      }),
    [baseSections, hiddenItemKeySet, customItemsBySection]
  );
  const total = useMemo(
    () => customizedSections.reduce((sum, section) => sum + section.items.length, 0),
    [customizedSections]
  );
  const visibleKeys = useMemo(
    () => new Set(customizedSections.flatMap((section) => section.items.map((item) => item.itemKey))),
    [customizedSections]
  );
  const done = useMemo(
    () => Object.entries(checked).filter(([key, value]) => Boolean(value) && visibleKeys.has(key)).length,
    [checked, visibleKeys]
  );
  const pct = total ? Math.round((done / total) * 100) : 0;

  const removeItemFromChecklist = (sectionTitle: string, item: SectionItemWithKey) => {
    if (item.isCustom && item.customId) {
      removeCustomItem(sectionTitle, item.customId);
    } else {
      hideBaseItem(item.itemKey);
    }
    setChecked((prev) => {
      if (!(item.itemKey in prev)) return prev;
      const next = { ...prev };
      delete next[item.itemKey];
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#eef3fb] print:min-h-0 print:bg-white">
      <div className="mx-auto w-full max-w-5xl px-5 print:px-0">
        <div className="flex flex-col gap-3 pt-8 print:hidden sm:flex-row sm:items-center sm:justify-between">
          <Button asChild className="h-11 justify-start rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-900 hover:bg-slate-50 sm:h-10">
            <Link href="/visa/marriage/stages">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Stages
            </Link>
          </Button>

          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:flex-nowrap sm:gap-2">
            <Button
              asChild
              variant="outline"
              className="h-11 flex-1 basis-0 rounded-2xl bg-white px-3 text-sm hover:bg-slate-50 sm:h-12 sm:flex-none sm:basis-auto sm:px-5 sm:text-base"
            >
              <Link href="/contact">Send feedback</Link>
            </Button>

            <div className="order-2 basis-full flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm sm:order-none sm:basis-auto">
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
                        ? "bg-pink-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCustomizeMode((prev) => !prev)}
              className="h-11 flex-1 basis-0 rounded-2xl bg-white px-3 text-sm hover:bg-slate-50 sm:h-12 sm:flex-none sm:basis-auto sm:px-5 sm:text-base"
            >
              {isCustomizeMode ? "Done customising" : "Customise"}
            </Button>

            <Button
              variant="outline"
              onClick={handleReset}
              className="h-11 flex-1 basis-0 rounded-2xl bg-white px-3 text-sm hover:bg-slate-50 sm:h-12 sm:flex-none sm:basis-auto sm:px-5 sm:text-base"
            >
              Reset
            </Button>

            <Button
              onClick={async () => {
                const allowed = await allowPrintWithEmailGate("marriage-stage-1", () => {
                  analytics.trackPrint("marriage-stage-1");
                  window.print();
                });
                if (!allowed) return;
              }}
              className="h-11 flex-1 basis-0 rounded-2xl bg-pink-600 px-3 text-sm hover:bg-pink-700 sm:h-12 sm:flex-none sm:basis-auto sm:px-5 sm:text-base"
            >
              <Printer className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Print
            </Button>
          </div>
        </div>

        <div className="mt-6 print:hidden">
          {isCustomizeMode && (
            <div className="rounded-2xl border border-pink-200 bg-pink-50 px-4 py-3 text-sm text-pink-900">
              Customise mode: remove items or add your own items by section. Printing will use your customised list.
            </div>
          )}
        </div>

        <Card className="mt-6 rounded-3xl border-0 bg-white shadow-sm print:mt-0 print:rounded-none print:shadow-none print:scale-95">
          <CardContent className="relative p-6 sm:p-10 print:px-4 print:pt-0 print:pb-0">
            <ChecklistCustomizedBadge isCustomized={hasCustomizations} />
            <PrintChecklistHeader />
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

            {customizedSections.map((section) => (
              <Section
                key={section.title}
                title={section.title}
                items={section.items}
                checked={checked}
                onToggle={handleToggle}
                fontSize={fontSize}
                isCustomizeMode={isCustomizeMode}
                draftValue={draftBySection[section.title] ?? ""}
                onDraftChange={(value) => setDraftForSection(section.title, value)}
                onAddCustomItem={() => addCustomItem(section.title)}
                onRemoveItem={(item) => removeItemFromChecklist(section.title, item)}
              />
            ))}

            <div className="mt-8 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-5 print:mt-2 print:p-4 print:break-inside-auto">
              <div className={`${classes.itemText} font-bold text-amber-900`}>Notes</div>
              <ul className={`mt-2 list-disc space-y-1 pl-6 ${classes.label} text-amber-900`}>
                {stageOneChecklist.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
            <ChecklistRequirementsDisclaimer />

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
