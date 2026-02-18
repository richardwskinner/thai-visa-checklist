"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { analytics } from "@/lib/analytics";

const STORAGE_KEY = "thai-visa-checklist:marriage:stage1:checked:v1";

type ChecklistItem = {
  text: string;
};

type ChecklistSection = {
  title: string;
  items: ChecklistItem[];
};

const APPLICATION_FORMS = [
  { code: "Thai e-Visa", url: "https://www.thaievisa.go.th" },
] as const;

const stageOneChecklist: {
  title: string;
  subtitle: string;
  sections: ChecklistSection[];
  tips: string[];
} = {
  title: "Marriage Visa Stage 1",
  subtitle: "Apply Abroad for Non-Immigrant O (Marriage)",
  sections: [
    {
      title: "Eligibility & Planning",
      items: [
        { text: "Valid passport with at least 6 months remaining" },
        { text: "Thai marriage registration documents ready (Kor Ror 2 and Kor Ror 3)" },
        { text: "Apply at the Thai embassy/consulate responsible for your country of residence" },
        { text: "Check that your intended entry date matches the visa validity window" },
      ],
    },
    {
      title: "Application Package",
      items: [
        { text: "Completed Non-Immigrant O visa application in Thai e-Visa system" },
        { text: "Recent passport photo (4x6 cm, plain background)" },
        { text: "Passport bio page copy" },
        { text: "Proof of residence in your current country (if requested by embassy)" },
      ],
    },
    {
      title: "Marriage & Sponsor Documents",
      items: [
        { text: "Marriage certificate copy" },
        { text: "Thai spouse ID card copy" },
        { text: "Thai spouse house registration (Tabien Baan) copy" },
        { text: "Invitation/support letter from Thai spouse" },
      ],
    },
    {
      title: "Financial & Travel Evidence",
      items: [
        { text: "Recent bank statement(s) showing sufficient funds (amount varies by embassy)" },
        { text: "Proof of accommodation in Thailand (if requested)" },
        { text: "Flight booking or travel itinerary (if requested)" },
      ],
    },
    {
      title: "After Approval",
      items: [
        { text: "Print or save your visa approval document" },
        { text: "Carry the full supporting document set when entering Thailand" },
        { text: "Plan TM.30 filing after arrival at your Thai address" },
      ],
    },
  ],
  tips: [
    "Embassy requirements vary by country, so always follow your specific embassy checklist first.",
    "Upload clear scans and sign any pages where signature is requested.",
    "If documents are not in Thai or English, certified translation may be required.",
  ],
};

function FormChips() {
  return (
    <div className="flex flex-wrap gap-2">
      {APPLICATION_FORMS.map((form) => (
        <a
          key={form.code}
          href={form.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
          onClick={(e) => e.stopPropagation()}
        >
          {form.code}
          <span className="text-slate-400">↗</span>
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
}: {
  title: string;
  items: ChecklistItem[];
  checked: Record<string, boolean>;
  onToggle: (key: string) => void;
}) {
  return (
    <div className="mt-6">
      <div className="text-xl font-extrabold text-slate-900">{title}</div>
      <div className="mt-2 h-[3px] w-full rounded-full bg-pink-700" />

      <div className="mt-3 grid gap-2">
        {items.map((item, idx) => {
          const key = `${title}:${idx}`;
          return (
            <label key={key} className="flex cursor-pointer items-center gap-3">
              <Checkbox
                checked={!!checked[key]}
                onCheckedChange={() => onToggle(key)}
                className="h-5 w-5 rounded-md data-[state=checked]:bg-[#249C0F] data-[state=checked]:border-[#249C0F]"
              />
              <div className="text-sm leading-snug text-slate-900">{item.text}</div>
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
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") return parsed as Record<string, boolean>;
      }
    } catch {
      // ignore
    }
    return {};
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      // ignore
    }
  }, [checked]);

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
  const totalWithForms = total + 1;
  const done = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);
  const pct = totalWithForms ? Math.round((done / totalWithForms) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-5">
        <div className="flex flex-col gap-3 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild className="h-12 justify-start rounded-2xl bg-slate-600 px-5 text-base hover:bg-slate-700">
            <Link href="/visa/marriage/stages">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Marriage Stages
            </Link>
          </Button>

          <Button
            variant="outline"
            onClick={handleReset}
            className="h-12 rounded-2xl bg-white px-5 text-base hover:bg-slate-50"
          >
            Reset
          </Button>
        </div>

        <Card className="mt-6 rounded-3xl border-0 bg-white shadow-sm">
          <CardContent className="p-6 sm:p-10">
            <h1 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">
              {stageOneChecklist.title}
            </h1>
            <p className="mt-2 text-center text-base text-slate-600">{stageOneChecklist.subtitle}</p>

            <div className="mt-8">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                <div>
                  Progress: {done} of {totalWithForms} items
                </div>
                <div>{pct}%</div>
              </div>
              <div className="mt-2">
                <Progress value={pct} className="h-3 [&>div]:bg-[#249C0F]" />
              </div>
            </div>

            <div className="mt-8">
              <div className="text-xl font-extrabold text-slate-900">Application forms</div>
              <div className="mt-2 h-[3px] w-full rounded-full bg-pink-700" />

              <label className="mt-4 flex cursor-pointer items-start gap-3">
                <Checkbox
                  checked={!!checked.__forms__}
                  onCheckedChange={() => handleToggle("__forms__")}
                  className="mt-1 h-5 w-5 rounded-md data-[state=checked]:bg-[#249C0F] data-[state=checked]:border-[#249C0F]"
                />
                <div className="flex-1">
                  <div className="text-sm leading-snug text-slate-900">
                    Start your application via the official system:
                  </div>
                  <div className="mt-3">
                    <FormChips />
                  </div>
                </div>
              </label>
            </div>

            {stageOneChecklist.sections.map((section) => (
              <Section
                key={section.title}
                title={section.title}
                items={section.items}
                checked={checked}
                onToggle={handleToggle}
              />
            ))}

            <div className="mt-8 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-5">
              <div className="text-sm font-bold text-amber-900">Extra tips</div>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-xs text-amber-900">
                {stageOneChecklist.tips.map((tip) => (
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
