"use client";

import React, { useMemo, useState } from "react";
import { ArrowLeft, FileDown, Printer, Search } from "lucide-react";

const VISAS = [
  { slug: "marriage", emoji: "💑", title: "Marriage Visa", subtitle: 'Non-Immigrant Type "O" (Spouse)', bg: "bg-pink-600" },
  { slug: "retirement", emoji: "🏖️", title: "Retirement Visa", subtitle: 'Non-Immigrant Type "O" / "O-A" (50+ years)', bg: "bg-blue-600", disabled: true },
  { slug: "business", emoji: "💼", title: "Business/Work Visa", subtitle: 'Non-Immigrant Type "B"', bg: "bg-indigo-600", disabled: true },
  { slug: "education", emoji: "📚", title: "Education Visa", subtitle: "Non-Immigrant ED", bg: "bg-green-600", disabled: true },
];

const marriage = {
  title: 'Non-Immigrant Type "O" (Marriage Visa)',
  subtitle: "For foreigners married to Thai nationals",
  lastUpdated: "11 Feb 2026",
  sections: [
    { title: "Application Forms", items: [{ text: "TM.7", noteLink: "Download Form", required: true }, { text: "STM.2, 9, 10, 11", required: true }] },
    { title: "Personal Documents", items: [{ text: "Passport (Original)", required: true }, { text: "1x Passport Photo (4x6 cm)", required: true }, { text: "TM.30 Receipt", required: true }, { text: "90 Day Report Receipt", required: false }, { text: "Copy of Passport Photo Page, Visa & Entry Stamp", required: true }] },
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
        { text: "400,000 THB in bank (at least 3 months prior) OR 40,000 THB monthly salary (certified)", required: true },
      ],
    },
    { title: "Payment", items: [{ text: "1,900 THB", required: true }] },
  ],
  tips: ["Prepare 2 sets of documents (not always required, but safer)", "Sign the bottom corner of all copies"],
};

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-5xl px-5">{children}</div>;
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden">
      <div className="h-full bg-blue-600" style={{ width: `${value}%` }} />
    </div>
  );
}

function Home({ onSelectMarriage }: { onSelectMarriage: () => void }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return VISAS;
    return VISAS.filter((v) => v.title.toLowerCase().includes(s) || v.subtitle.toLowerCase().includes(s));
  }, [q]);

  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <Container>
        <div className="pt-10 pb-8">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900">Thai Visa Checklist Helper</h1>
          <p className="mt-3 text-lg text-slate-600">Get organized for your visa application with comprehensive checklists</p>

          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search visas…"
              className="w-full border-0 bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">Which visa are you applying for?</h2>
          </div>

          <div className="mt-7 grid gap-5">
            {filtered.map((v) => (
              <button
                key={v.slug}
                disabled={v.disabled}
                onClick={() => v.slug === "marriage" && onSelectMarriage()}
                className={`w-full rounded-2xl ${v.bg} px-7 py-7 text-left text-white shadow-md transition ${
                  v.disabled ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg hover:-translate-y-[1px]"
                }`}
              >
                <div className="text-3xl font-extrabold tracking-tight">
                  <span className="mr-3">{v.emoji}</span>
                  {v.title}
                </div>
                <div className="mt-2 text-lg font-semibold text-white/85">{v.subtitle}</div>
              </button>
            ))}
          </div>

          <div className="mt-7 text-center text-sm text-slate-500">Free to use • Add more visas over time • Updated as you learn</div>
        </div>

        <div className="py-10 text-xs text-slate-500">
          <div className="mb-4 h-px w-full bg-slate-200" />
          Note: Requirements can vary by immigration office. Always confirm locally.
        </div>
      </Container>
    </div>
  );
}

function MarriagePage({ onBack }: { onBack: () => void }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const total = useMemo(() => marriage.sections.reduce((sum, s) => sum + s.items.length, 0), []);
  const done = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <Container>
        <div className="flex flex-col gap-3 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <button onClick={onBack} className="h-12 rounded-2xl bg-slate-600 px-5 text-base text-white hover:bg-slate-700 flex items-center justify-start">
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Visa Selection
          </button>

          <div className="flex gap-3">
            <button onClick={() => alert("Export to PDF: wire up later")} className="h-12 rounded-2xl bg-red-600 px-5 text-base text-white hover:bg-red-700 flex items-center">
              <FileDown className="mr-2 h-5 w-5" /> Export to PDF
            </button>
            <button onClick={() => window.print()} className="h-12 rounded-2xl bg-blue-600 px-5 text-base text-white hover:bg-blue-700 flex items-center">
              <Printer className="mr-2 h-5 w-5" /> Print
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-10 shadow-sm">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">{marriage.title}</h1>
          <p className="mt-3 text-xl text-slate-600">{marriage.subtitle}</p>
          <p className="mt-2 text-lg text-slate-500">Document Checklist</p>

          <div className="mt-10">
            <div className="flex items-center justify-between text-lg font-semibold text-slate-700">
              <div>Progress: {done} of {total} items</div>
              <div>{pct}%</div>
            </div>
            <div className="mt-3">
              <ProgressBar value={pct} />
            </div>
          </div>

          {marriage.sections.map((section) => (
            <div key={section.title} className="mt-10">
              <div className="text-3xl font-extrabold text-slate-900">{section.title}</div>
              <div className="mt-3 h-[3px] w-full rounded-full bg-blue-700" />
              <div className="mt-5 grid gap-4">
                {section.items.map((it, idx) => {
                  const key = `${section.title}:${idx}`;
                  return (
                    <label key={key} className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        className="mt-2 h-6 w-6 rounded-md border-slate-300"
                        checked={!!checked[key]}
                        onChange={(e) => setChecked((s) => ({ ...s, [key]: e.target.checked }))}
                      />
                      <div className="text-xl text-slate-900">
                        <div className="leading-snug">
                          {it.text}{" "}
                          {it.noteLink ? (
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                alert("Hook TM.7 link later");
                              }}
                              className="ml-2 text-blue-700 underline underline-offset-2"
                            >
                              {it.noteLink}
                            </a>
                          ) : null}
                        </div>
                        <div className="mt-1 text-sm text-slate-500">{it.required ? "Required" : "Optional"}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
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
            <div className="mt-3 text-sm text-slate-500">Last updated: {marriage.lastUpdated}</div>
          </div>
        </div>

        <div className="py-10 text-xs text-slate-500">
          <div className="mb-4 h-px w-full bg-slate-200" />
          Reminder: exact document requirements can vary by immigration office.
        </div>
      </Container>
    </div>
  );
}

export default function Page() {
  const [route, setRoute] = useState<"home" | "marriage">("home");
  return route === "home" ? <Home onSelectMarriage={() => setRoute("marriage")} /> : <MarriagePage onBack={() => setRoute("home")} />;
}
