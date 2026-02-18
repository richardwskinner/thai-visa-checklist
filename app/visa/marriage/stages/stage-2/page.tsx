"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { analytics } from "@/lib/analytics";

const STORAGE_KEY = "thai-visa-checklist:marriage:stage2:checked:v1";

type ChecklistItem = {
  text: string;
};

type ChecklistSection = {
  title: string;
  items: ChecklistItem[];
};

const APPLICATION_FORMS = [
  { code: "TM.86", url: "https://bangkok.immigration.go.th/en/downloads_en/" },
  { code: "TM.87", url: "https://bangkok.immigration.go.th/en/downloads_en/" },
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
        { text: "You are in Thailand on a visa/status that can be converted" },
        { text: "You have enough permitted stay remaining before expiry (many offices ask 15+ days)" },
        { text: "Your address registration is up to date (TM.30 receipt available)" },
      ],
    },
    {
      title: "Core Forms",
      items: [
        { text: "TM.86 or TM.87 (use the form that matches your current entry status)" },
        { text: "Passport-size photo (4x6 cm)" },
        { text: "STM.2 acknowledgement form" },
        { text: "STM.9 overstay acknowledgement form" },
        { text: "STM.11 penalties acknowledgement form" },
      ],
    },
    {
      title: "Personal Documents",
      items: [
        { text: "Passport original" },
        { text: "Copies of passport bio page, latest entry stamp, and current visa stamp" },
        { text: "TM.6 departure card copy (if applicable)" },
      ],
    },
    {
      title: "Marriage & Address Evidence",
      items: [
        { text: "Thai marriage certificate (Kor Ror 3) copy" },
        { text: "Recent Kor Ror 2 extract copy" },
        { text: "Thai spouse ID card copy" },
        { text: "Thai spouse house registration (Tabien Baan) copy" },
        { text: "Proof of your accommodation in Thailand (rental contract or house docs)" },
      ],
    },
    {
      title: "Financial Evidence",
      items: [
        { text: "Thai bank book (original + copy)" },
        { text: "Bank statement and bank letter (same-day issue preferred)" },
        { text: "Evidence of 400,000 THB deposit or 40,000 THB monthly income, as required by your office" },
      ],
    },
    {
      title: "Submission Day",
      items: [
        { text: "Attend immigration with your Thai spouse (if requested by local office)" },
        { text: "Bring signed copies of all documents" },
        { text: "Prepare fees in cash (commonly 2,000 THB for conversion; some cases also include 1,900 THB extension fee)" },
      ],
    },
  ],
  tips: [
    "Different immigration offices can ask for additional local forms and photo sets.",
    "If any form is unclear, ask immigration to confirm whether TM.86 or TM.87 applies in your case.",
    "Keep scanned copies of everything you submit for Stage 3 extension.",
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

export default function MarriageStageTwoPage() {
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
              {stageTwoChecklist.title}
            </h1>
            <p className="mt-2 text-center text-base text-slate-600">{stageTwoChecklist.subtitle}</p>

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
                    Download and complete the forms required by your immigration office:
                  </div>
                  <div className="mt-3">
                    <FormChips />
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
              />
            ))}

            <div className="mt-8 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-5">
              <div className="text-sm font-bold text-amber-900">Extra tips</div>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-xs text-amber-900">
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
