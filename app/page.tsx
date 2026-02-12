"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, FileDown, Printer, Search } from "lucide-react";

/**
 * Clean, friendly mockup inspired by your screenshots:
 * - Home: big title + centered question + large colored cards
 * - Marriage: top actions (Back / Export / Print), big title, progress, simple sections
 * - Save progress (localStorage)
 * - Coming soon badges for other visas
 */

const VISAS = [
  {
    slug: "marriage",
    emoji: "💑",
    title: "Marriage Visa",
    subtitle: 'Non-Immigrant Type "O" (Spouse)',
    bg: "bg-pink-600",
  },
  {
    slug: "retirement",
    emoji: "🏖️",
    title: "Retirement Visa",
    subtitle: 'Non-Immigrant Type "O" / "O-A" (50+ years)',
    bg: "bg-blue-600",
    disabled: true,
  },
  {
    slug: "business",
    emoji: "💼",
    title: "Business/Work Visa",
    subtitle: 'Non-Immigrant Type "B"',
    bg: "bg-indigo-600",
    disabled: true,
  },
  {
    slug: "education",
    emoji: "📚",
    title: "Education Visa",
    subtitle: "Non-Immigrant ED",
    bg: "bg-green-600",
    disabled: true,
  },
];

const marriage = {
  title: 'Non-Immigrant Type "O" (Marriage Visa)',
  subtitle: "For foreigners married to Thai nationals",
  lastUpdated: "11 Feb 2026",
  sections: [
    {
      title: "Application Forms",
      items: [
        { text: "TM.7", noteLink: "Download Form", required: true },
        { text: "STM.2, 9, 10, 11", required: true },
      ],
    },
    {
      title: "Personal Documents",
      items: [
        { text: "Passport (Original)", required: true },
        { text: "1x Passport Photo (4x6 cm)", required: true },
        { text: "TM.30 Receipt", required: true },
        { text: "90 Day Report Receipt", required: false },
        { text: "Copy of Passport Photo Page, Visa & Entry Stamp", required: true },
      ],
    },
    {
      title: "Relationship & Accommodation",
      items: [
        { text: "Your spouse in person", required: true },
        { text: "Copy of spouse’s National ID", required: true },
        { text: "Copy of spouse’s passport (if available)", required: false },
        { text: "Copy of spouse’s Blue Book (Tabian Baan)", required: true },
        { text: "Thai Marriage Certificate Kor Ror 3 (original + copy)", required: true },
        { text: "Kor Ror 2 (updated same year) (original + copy)", required: true },
        { text: "Family photos (inside home + outside with house number)", required: true },
        { text: "Hand-drawn map (major roads nearby)", required: true },
        { text: "House/Condo contract", required: true },
        { text: "Children’s birth certificate (if applicable)", required: false },
        { text: "Spouse name change document (if applicable)", required: false },
        { text: "Letter from your spouse confirming marriage", required: true },
      ],
    },
    {
      title: "Proof of Income / Funds",
      items: [
        { text: "Bank book (original)", required: true },
        { text: "Bank book updated on the day + copy", required: true },
        { text: "Copy of bank book personal information page", required: true },
        { text: "Bank statement up to 6 months (issued within 7 days)", required: true },
        { text: "Bank letter confirming your bank account", required: true },
        {
          text:
            "400,000 THB in bank (at least 3 months prior) OR 40,000 THB monthly salary (certified)",
          required: true,
        },
      ],
    },
    {
      title: "Payment",
      items: [{ text: "1,900 THB", required: true }],
    },
  ],
  tips: [
    "Prepare 2 sets of documents (not always required, but safer)",
    "Sign the bottom corner of all copies",
  ],
};

const STORAGE_KEY_MARRIAGE = "thai-visa-checklist:marriage:checked:v1";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-5xl px-5">{children}</div>;
}

function Home({ onSelectMarriage }: { onSelectMarriage: () => void }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return VISAS;
    return VISAS.filter(
      (v) => v.title.toLowerCase().includes(s) || v.subtitle.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <Container>
        {/* Centered hero */}
        <div className="pt-10 pb-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900">
            Thai Visa Checklist Helper
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Get organized for your visa application with comprehensive checklists
          </p>

          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm max-w-2xl mx-auto">
            <Search className="h-5 w-5 text-slate-400" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search visas…"
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        <Card className="rounded-3xl border-0 shadow-sm">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-slate-900">
                Which visa are you applying for?
              </h2>
            </div>

            <div className="mt-7 grid gap-5">
              {filtered.map((v) => (
                <button
                  key={v.slug}
                  onClick={() => {
                    if (v.slug === "marriage") return onSelectMarriage();
                    alert("Coming soon — only the Marriage Visa checklist is available right now.");
                  }}
                  className={`group relative w-full rounded-2xl ${v.bg} px-7 py-7 text-left text-white shadow-md transition hover:shadow-lg hover:-translate-y-[1px] ${
                    v.disabled ? "opacity-90" : ""
                  }`}
                  aria-disabled={v.disabled ? "true" : "false"}
                >
                  {v.disabled ? (
                    <span className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                      Coming soon
                    </span>
                  ) : null}

                  <div className="text-3xl font-extrabold tracking-tight">
                    <span className="mr-3">{v.emoji}</span>
                    {v.title}
                  </div>
                  <div className="mt-2 text-lg font-semibold text-white/85">{v.subtitle}</div>
                </button>
              ))}
            </div>

            <div className="mt-7 text-center text-sm text-slate-500">
              Free to use • More checklists coming soon
            </div>
          </CardContent>
        </Card>

        <div className="py-10 text-xs text-slate-500">
          <Separator className="mb-4" />
          Note: Requirements can vary by immigration office. Always confirm locally.
        </div>
      </Container>
    </div>
  );
}

function Section({
  title,
  items,
  checked,
  setChecked,
}: {
  title: string;
  items: { text: string; required?: boolean; noteLink?: string }[];
  checked: Record<string, boolean>;
  setChecked: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) {
  return (
    <div className="mt-10">
      <div className="text-3xl font-extrabold text-slate-900">{title}</div>
      <div className="mt-3 h-[3px] w-full rounded-full bg-blue-700" />

      <div className="mt-5 grid gap-4">
        {items.map((it, idx) => {
          const key = `${title}:${idx}`;
          return (
            <div key={key} className="flex items-start gap-4">
              <div className="pt-1">
                <Checkbox
                  checked={!!checked[key]}
                  onCheckedChange={(v) => setChecked((s) => ({ ...s, [key]: Boolean(v) }))}
                  className="h-6 w-6 rounded-md"
                />
              </div>
              <div className="text-xl text-slate-900">
                <div className="leading-snug">
                  {it.text}{" "}
                  {it.noteLink ? (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Hook this up to the official TM.7 link later.");
                      }}
                      className="ml-2 text-blue-700 underline underline-offset-2"
                    >
                      {it.noteLink}
                    </a>
                  ) : null}
                </div>
                <div className="mt-1 text-sm text-slate-500">
                  {it.required ? "Required" : "Optional"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MarriagePage({ onBack }: { onBack: () => void }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // Load saved progress
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_MARRIAGE);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") setChecked(parsed);
    } catch {
      // ignore
    }
  }, []);

  // Save progress
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MARRIAGE, JSON.stringify(checked));
    } catch {
      // ignore
    }
  }, [checked]);

  const total = useMemo(() => {
    let count = 0;
    marriage.sections.forEach((s) => (count += s.items.length));
    return count;
  }, []);

  const done = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <Container>
        {/* Top actions */}
        <div className="flex flex-col gap-3 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Button
            onClick={onBack}
            className="h-12 justify-start rounded-2xl bg-slate-600 px-5 text-base hover:bg-slate-700"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Visa Selection
          </Button>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setChecked({})}
              className="h-12 rounded-2xl bg-white px-5 text-base hover:bg-slate-50"
            >
              Reset
            </Button>

            <Button
              onClick={() => alert("Export to PDF: wire up later (server or client PDF).")}
              className="h-12 rounded-2xl bg-red-600 px-5 text-base hover:bg-red-700"
            >
              <FileDown className="mr-2 h-5 w-5" /> Export to PDF
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
          <CardContent className="p-10">
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
              {marriage.title}
            </h1>
            <p className="mt-3 text-xl text-slate-600">{marriage.subtitle}</p>
            <p className="mt-2 text-lg text-slate-500">Document Checklist</p>

            <div className="mt-10">
              <div className="flex items-center justify-between text-lg font-semibold text-slate-700">
                <div>
                  Progress: {done} of {total} items
                </div>
                <div>{pct}%</div>
              </div>
              <div className="mt-3">
                <Progress value={pct} className="h-3" />
              </div>
            </div>

            {marriage.sections.map((s) => (
              <Section
                key={s.title}
                title={s.title}
                items={s.items}
                checked={checked}
                setChecked={setChecked}
              />
            ))}

            <div className="mt-12 rounded-2xl bg-slate-50 p-6">
              <div className="text-lg font-bold text-slate-900">Tips</div>
              <ul className="mt-2 list-disc pl-6 text-slate-700">
                {marriage.tips.map((t) => (
                  <li key={t} className="mt-1">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-3 text-sm text-slate-500">
                Last updated: {marriage.lastUpdated}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="py-10 text-xs text-slate-500">
          <Separator className="mb-4" />
          Reminder: exact document requirements can vary by immigration office.
        </div>
      </Container>
    </div>
  );
}

export default function VisaChecklistMockup() {
  const [route, setRoute] = useState<"home" | "marriage">("home");

  return route === "home" ? (
    <Home onSelectMarriage={() => setRoute("marriage")} />
  ) : (
    <MarriagePage onBack={() => setRoute("home")} />
  );
}
