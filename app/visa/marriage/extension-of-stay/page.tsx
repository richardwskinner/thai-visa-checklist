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
import { ArrowLeft } from "lucide-react";
import { marriageChecklist } from "@/lib/data/checklists/marriage-extension-checklist";
import type { ChecklistItem } from "@/lib/data/checklists/types";
import { analytics } from "@/lib/analytics";
import ChecklistRequirementsDisclaimer from "@/components/checklist-requirements-disclaimer";
import ChecklistCustomizedBadge from "@/components/checklist-customized-badge";
import ChecklistPrintMenu from "@/components/checklist-print-menu";
import ResetChecklistDialog from "@/components/reset-checklist-dialog";
import ExampleLink from "@/components/example-link";
import PrintChecklistHeader from "@/components/print-checklist-header";
import {
  checklistActionButtonClass,
  checklistBackButtonClass,
  checklistTextSizeButtonClass,
  checklistTextSizeGroupClass,
} from "@/lib/checklist-toolbar-styles";
import { useChecklistCustomization } from "@/lib/use-checklist-customization";

/* ── Storage keys ── */
const STORAGE_KEY_CHECKED = "thai-visa-checklist:marriage:checked:v1";
const STORAGE_KEY_FONTSIZE = "thai-visa-checklist:fontsize:v1";
const STORAGE_KEY_FINANCIAL_METHOD = "thai-visa-checklist:marriage:financial-method:v1";
const STORAGE_KEY_CUSTOMIZATIONS = "thai-visa-checklist:marriage:customizations:v1";

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

const FAQS = [
  {
    question:
      'Do I need to keep the 400,000 THB in my account during the "under consideration" period for a marriage extension in Bangkok?',
    answer:
      "There is no published rule requiring the 400,000 THB to remain after submission. Bangkok usually issues a short under consideration stamp of around 21 days. Officers previously asked to see an updated bank book on collection day, but this is not common now. Confirm with your officer and avoid moving funds until final approval.",
  },
  {
    question:
      'Can I leave Thailand during the marriage extension "under consideration" period?',
    answer:
      "In many cases, yes, if you obtain a re-entry permit and return before the under consideration stamp expires. Confirm this with your immigration office when you apply, because some offices may schedule a home visit during this period.",
  },
  {
    question: "What if my passport has less than one year remaining?",
    answer:
      "Immigration will only grant your one-year Non-Immigrant O (Marriage) extension up to your passport expiry date. If your passport has less than 12 months remaining, your extension is shortened to match the remaining validity. Renewing your passport before applying is usually advisable. Many countries also require at least 6 months passport validity for international travel.",
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
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-sm font-medium text-slate-700 hover:bg-slate-100
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
type FinancialMethod = "bank" | "thai-income" | "foreign-income";
type SectionItemWithKey = ChecklistItem & { itemKey: string; isCustom?: boolean; customId?: string };
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
  financialMethod?: FinancialMethod;
  onFinancialMethodChange?: (method: FinancialMethod) => void;
  isCustomizeMode: boolean;
  draftValue: string;
  onDraftChange: (value: string) => void;
  onAddCustomItem: () => void;
  onRemoveItem: (item: SectionItemWithKey) => void;
}) {
  const classes = fontSizeClasses[fontSize];
  const isFinancialSection = title.startsWith("Proof of Funds");

  return (
    <div className="mt-6 print:mt-2">
      <div className={`${classes.sectionTitle} font-extrabold text-slate-900`}>
        {title}
        {isFinancialSection && <span className="ml-2 print:hidden">(Select one)</span>}
      </div>
      <div className="mt-2 h-[3px] w-full rounded-full bg-pink-600 print:mt-1" />
      {isFinancialSection && financialMethod && onFinancialMethodChange && (
        <div className="mt-4 rounded-2xl border border-pink-200 bg-pink-50 p-4 print:hidden">
          <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
            {([
              ["bank", "A: 400,000 THB Bank Deposit"],
              ["thai-income", "B: 40,000 THB Thai Monthly Income"],
              ["foreign-income", "C: 40,000 THB Foreign Monthly Income"],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => onFinancialMethodChange(value)}
                className={`rounded-full border px-3 py-1.5 text-center text-sm font-medium transition ${
                  financialMethod === value
                    ? "border-pink-600 bg-pink-600 text-white"
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
            <div key={key} className="flex items-start gap-2">
              <label className="flex flex-1 cursor-pointer items-center gap-3 print:gap-2">
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

/* ── Main page ── */
export default function MarriageVisaPage() {
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
    if (saved === "bank" || saved === "thai-income" || saved === "foreign-income") return saved;
    if (saved === "income") return "thai-income";
    return "bank";
  });
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

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
      analytics.trackChecklistItem('marriage', key, newValue);
      return { ...prev, [key]: newValue };
    });
  };

  const handleReset = () => {
    setChecked({});
    resetCustomizations();
    analytics.trackReset('marriage');
  };

  const filteredSections = useMemo<ChecklistSectionWithKeys[]>(
    () =>
      marriageChecklist.sections.map((section, sectionIndex) => ({
        title: section.title,
        items: section.items
          .filter(
            (item) =>
              !item.financialMethods ||
              item.financialMethods.includes(financialMethod)
          )
          .map((item, itemIndex) => ({
            ...item,
            itemKey: `${sectionIndex}:${itemIndex}:${item.text}`,
          })),
      })),
    [financialMethod]
  );

  const customizedSections = useMemo<ChecklistSectionWithKeys[]>(
    () =>
      filteredSections.map((section) => {
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
    [filteredSections, hiddenItemKeySet, customItemsBySection]
  );

  // Total visible checklist items + 1 extra for forms checkbox
  const total = useMemo(
    () => customizedSections.reduce((sum, s) => sum + s.items.length, 0),
    [customizedSections]
  );
  const totalWithForms = total + 1;
  const visibleKeys = useMemo(
    () =>
      new Set([
        "__forms__",
        ...customizedSections.flatMap((section) => section.items.map((item) => item.itemKey)),
      ]),
    [customizedSections]
  );
  const done = useMemo(
    () => Object.entries(checked).filter(([key, value]) => Boolean(value) && visibleKeys.has(key)).length,
    [checked, visibleKeys]
  );
  const pct = totalWithForms ? Math.round((done / totalWithForms) * 100) : 0;

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto w-full max-w-5xl px-5 print:px-0">
        {/* Top actions */}
        <div className="flex flex-col gap-3 pt-8 print:hidden sm:flex-row sm:items-center sm:justify-between">
          <Button asChild className={checklistBackButtonClass}>
            <Link href="/visa/marriage/stages">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Stages
            </Link>
          </Button>

          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:flex-nowrap sm:gap-2">
            <Button
              asChild
              variant="outline"
              className={checklistActionButtonClass}
            >
              <Link href="/contact">Send feedback</Link>
            </Button>

            {/* Font Size Selector */}
            <div className={checklistTextSizeGroupClass}>
              <span className="text-sm font-medium text-slate-700">Text Size:</span>
              <div className="flex gap-1">
                {(["small", "medium", "large"] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setFontSize(size);
                      analytics.trackFontSizeChange(size, 'marriage');
                    }}
                    className={checklistTextSizeButtonClass(fontSize === size, "pink")}
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
              className={checklistActionButtonClass}
            >
              {isCustomizeMode ? "Done customising" : "Customise"}
            </Button>

            <Button
              variant="outline"
              onClick={() => setIsResetDialogOpen(true)}
              className={checklistActionButtonClass}
            >
              Reset
            </Button>

            <ChecklistPrintMenu source="marriage-extension" tone="pink" onPrint={() => analytics.trackPrint("marriage")} />
          </div>
        </div>
        <ResetChecklistDialog
          open={isResetDialogOpen}
          onOpenChange={setIsResetDialogOpen}
          onConfirm={handleReset}
          tone="pink"
        />

        <div className="mt-6 print:hidden">
          {isCustomizeMode && (
            <div className="rounded-2xl border border-pink-200 bg-pink-50 px-4 py-3 text-sm text-pink-900">
              Customise mode: Remove items or add your own - Printing will use your customised list.
            </div>
          )}
        </div>

        {/* Content */}
        <Card
          data-checklist-print-root="true"
          className="mt-6 rounded-3xl border-0 bg-white shadow-sm print:mt-0 print:rounded-none print:shadow-none print:scale-95"
        >
          <CardContent className="relative p-10 print:px-4 print:pt-0 print:pb-0">
            <ChecklistCustomizedBadge isCustomized={hasCustomizations} />
            <PrintChecklistHeader />
            <h1 className={`${classes.title} text-center font-extrabold tracking-tight text-slate-900`}>
              {marriageChecklist.title}
            </h1>
            <p className={`mt-2 ${classes.subtitle} text-center text-slate-600`}>
                          {marriageChecklist.subtitle}
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

            {/* Application forms (screen: under progress bar / print: still included) */}
            <div className="mt-8 print:mt-4">
              <div className={`${fontSizeClasses[fontSize].sectionTitle} font-extrabold text-slate-900`}>
                Application Forms
              </div>
              <div className="mt-2 h-[3px] w-full rounded-full bg-pink-600 print:mt-1" />

              <label className="mt-4 flex cursor-pointer items-start gap-3 print:gap-2">
                <Checkbox
                  checked={!!checked["__forms__"]}
                  onCheckedChange={() => handleToggle("__forms__")}
                  className="mt-1 h-5 w-5 rounded-md border-slate-600 print:border-black print:h-4 print:w-4 data-[state=checked]:bg-[#249C0F] data-[state=checked]:border-[#249C0F]"
                />

                <div className="flex-1">
                  <div className={`${classes.itemText} text-slate-900 leading-snug`}>
                    Download and complete the required application forms:
                  </div>

                  <div className="mt-3 print:mt-2">
                    <FormChips />
                  </div>
                </div>
              </label>
            </div>

            {/* Sections */}
            {customizedSections.map((section) => (
              <Section
                key={section.title}
                title={section.title}
                items={section.items}
                checked={checked}
                onToggle={handleToggle}
                fontSize={fontSize}
                financialMethod={financialMethod}
                onFinancialMethodChange={setFinancialMethod}
                isCustomizeMode={isCustomizeMode}
                draftValue={draftBySection[section.title] ?? ""}
                onDraftChange={(value) => setDraftForSection(section.title, value)}
                onAddCustomItem={() => addCustomItem(section.title)}
                onRemoveItem={(item) => removeItemFromChecklist(section.title, item)}
              />
            ))}

            {/* Tips */}
            <div className="mt-8 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-5 print:mt-2 print:p-4 print:break-inside-auto">
              <div className={`${classes.itemText} font-bold text-amber-900`}>Notes</div>
              <ul className={`mt-2 list-disc space-y-1 pl-6 ${classes.label} text-amber-900`}>
                {marriageChecklist.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
            <ChecklistRequirementsDisclaimer />

            {/* This separator/footer is what often causes the "blank second page" - hide on print */}
          </CardContent>
        </Card>

        <div className="mt-6 print:hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-lg font-extrabold text-slate-900">Frequently Asked Questions</div>
          <Accordion type="single" collapsible className="mt-3 space-y-3">
            <AccordionItem value="faq-1" className="rounded-2xl border border-slate-200 bg-white px-4">
              <AccordionTrigger className="text-left text-sm font-bold text-slate-900 hover:no-underline sm:text-base">
                <span className="min-w-0">
                  Do I need to keep the 400,000 THB in my account during the &quot;under consideration&quot; period for a
                  marriage extension in Bangkok?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-slate-700">
                There is no published rule requiring the 400,000 THB to remain after submission. Bangkok usually
                issues a short under consideration stamp of around 21 days. Officers previously asked to see an
                updated bank book on collection day, but this is not common now. It&apos;s best to confirm with your
                officer and avoid moving funds until final approval.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-2" className="rounded-2xl border border-slate-200 bg-white px-4">
              <AccordionTrigger className="text-left text-sm font-bold text-slate-900 hover:no-underline sm:text-base">
                <span className="min-w-0">
                  Can I leave Thailand during the marriage extension &quot;under consideration&quot; period?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-slate-700">
                In many cases, yes, if you obtain a re-entry permit and return before the under consideration stamp
                expires. However, you should confirm this with your immigration office when you apply, because some
                offices may schedule a home visit during the under consideration period and you may need to coordinate
                your travel around that.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-3" className="rounded-2xl border border-slate-200 bg-white px-4">
              <AccordionTrigger className="text-left text-sm font-bold text-slate-900 hover:no-underline sm:text-base">
                <span className="min-w-0">What if my passport has less than one year remaining?</span>
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-slate-700">
                Immigration will only grant your one-year Non-Immigrant O (Marriage) extension up to your
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
