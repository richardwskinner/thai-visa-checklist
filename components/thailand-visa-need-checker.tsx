"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  DATASET_LAST_CHECKED,
  EntryMethod,
  evaluateThailandVisaNeed,
  nationalityOptions,
  VISA_ELIGIBILITY_SOURCES,
} from "@/lib/data/thai-visa-eligibility";
import { ChevronDown, ExternalLink } from "lucide-react";

function toIsoDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseIsoDate(dateString: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);
  if (!match) return null;
  const [, y, m, d] = match;
  const year = Number(y);
  const month = Number(m);
  const day = Number(d);
  if (!year || month < 1 || month > 12 || day < 1 || day > 31) return null;
  return new Date(Date.UTC(year, month - 1, day));
}

function diffCalendarDaysInclusive(entryDate: string, departureDate: string) {
  const entry = parseIsoDate(entryDate);
  const departure = parseIsoDate(departureDate);
  if (!entry || !departure) return null;
  const msPerDay = 24 * 60 * 60 * 1000;
  const diff = Math.floor((departure.getTime() - entry.getTime()) / msPerDay);
  if (diff < 0) return null;
  return diff + 1;
}

function renderNoteWithLinks(note: string) {
  const token = "MFA-linked";
  if (!note.includes(token)) return note;

  const [before, ...rest] = note.split(token);
  const after = rest.join(token);

  return (
    <>
      {before}
      <a
        href={VISA_ELIGIBILITY_SOURCES.klEmbassyVisaHub}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold underline underline-offset-2"
      >
        {token}
      </a>
      {after}
    </>
  );
}

export default function ThailandVisaNeedChecker() {
  const today = new Date();
  const defaultEntry = toIsoDate(today);
  const defaultDeparture = toIsoDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 29));

  const [nationality, setNationality] = useState("USA");
  const [entryMethod, setEntryMethod] = useState<EntryMethod>("air");
  const [entryDate, setEntryDate] = useState(defaultEntry);
  const [departureDate, setDepartureDate] = useState(defaultDeparture);
  const [checkedSignature, setCheckedSignature] = useState<string | null>(null);

  const plannedStayDays = useMemo(() => diffCalendarDaysInclusive(entryDate, departureDate), [entryDate, departureDate]);

  const result = useMemo(
    () =>
      evaluateThailandVisaNeed({
        nationality,
        purpose: "tourism",
        entryMethod,
        plannedStayDays: plannedStayDays ?? 1,
        passportDocumentType: "ordinary_passport",
        passportClass: "regular",
      }),
    [entryMethod, nationality, plannedStayDays]
  );
  const currentSignature = `${nationality}|${entryMethod}|${entryDate}|${departureDate}`;
  const hasChecked = checkedSignature === currentSignature;
  const hasValidDates = plannedStayDays !== null;

  const resultStyle =
    result.kind === "visa_exempt"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : result.kind === "voa"
        ? "border-blue-200 bg-blue-50 text-blue-900"
        : result.kind === "manual_check"
          ? "border-amber-200 bg-amber-50 text-amber-900"
          : "border-rose-200 bg-rose-50 text-rose-900";

  return (
    <section className="max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <h2 className="text-xl font-extrabold text-slate-900">Thailand Visa Eligibility</h2>
        <div className="text-xs text-slate-500 sm:text-right">
          Official-source dataset • Checked {DATASET_LAST_CHECKED}
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block min-w-0">
          <span className="text-sm font-semibold text-slate-700">Passport nationality</span>
          <div className="relative mt-1 min-w-0">
            <select
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className="block w-full min-w-0 max-w-full box-border appearance-none rounded-xl border border-slate-300 bg-white px-3 py-2 pr-10 text-sm text-slate-900"
            >
              {nationalityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
          <p className="mt-1 text-xs text-slate-500">
            If your nationality is not listed, check Thai eVisa or your nearest embassy.
          </p>
        </label>

        <label className="block min-w-0">
          <span className="text-sm font-semibold text-slate-700">Entry method</span>
          <div className="relative mt-1 min-w-0">
            <select
              value={entryMethod}
              onChange={(e) => setEntryMethod(e.target.value as EntryMethod)}
              className="block w-full min-w-0 max-w-full box-border appearance-none rounded-xl border border-slate-300 bg-white px-3 py-2 pr-10 text-sm text-slate-900"
            >
              <option value="air">Air</option>
              <option value="land">Land</option>
              <option value="sea">Sea</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </label>

        <label className="block min-w-0">
          <span className="text-sm font-semibold text-slate-700">Planned entry date</span>
          <input
            type="date"
            lang="en-GB"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            className="mt-1 block w-full min-w-0 max-w-full box-border appearance-none rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          />
        </label>

        <label className="block min-w-0">
          <span className="text-sm font-semibold text-slate-700">Planned departure date</span>
          <input
            type="date"
            lang="en-GB"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="mt-1 block w-full min-w-0 max-w-full box-border appearance-none rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          />
        </label>
      </div>

      <div className="mt-3 text-sm text-slate-600">
        {hasValidDates ? (
          <>
            Calculated stay length: <span className="font-semibold text-slate-900">{plannedStayDays}</span> day
            {plannedStayDays === 1 ? "" : "s"} (inclusive of entry and departure dates)
          </>
        ) : (
          <span className="text-rose-700">Please enter a valid departure date on or after the entry date.</span>
        )}
      </div>

      <div className="mt-5">
        <button
          type="button"
          onClick={() => hasValidDates && setCheckedSignature(currentSignature)}
          disabled={!hasValidDates}
          className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Check Here
        </button>
      </div>

      {hasChecked && (
        <div className={`mt-5 rounded-2xl border p-4 sm:p-5 ${resultStyle}`}>
          <div className="text-lg font-extrabold">
            {result.kind === "visa_required" || result.kind === "manual_check" ? "⚠️ " : "✅ "}
            {result.title}
          </div>
          <p className="mt-2 text-sm leading-relaxed">
            {result.detail}
            {(result.kind === "visa_required" || result.kind === "manual_check") && (
              <>
                {" "}
                <a
                  href={VISA_ELIGIBILITY_SOURCES.eVisa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold underline underline-offset-2"
                >
                  Thai e-Visa Official Site <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </>
            )}
          </p>
          {result.notes.length > 0 && (
            <ul className="mt-3 space-y-1 text-sm">
              {result.notes.map((note) => (
                <li key={note}>• {renderNoteWithLinks(note)}</li>
              ))}
            </ul>
          )}

          {result.extensionHint?.likelyEligibleFromVisaExempt && (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              <p>
                If you enter visa-free and need longer than {result.extensionHint.currentAllowanceDays} days, many
                travellers can apply for an extension inside Thailand (commonly a 30-day tourist/visa-exempt
                extension, subject to immigration approval).
              </p>
              <p className="mt-2">
                <Link
                  href="/guides/tourist-extension"
                  className="font-semibold underline underline-offset-2"
                >
                  See our tourist extension guide
                </Link>
                .
              </p>
            </div>
          )}

          <div className="mt-4 rounded-xl border border-slate-200/80 bg-white/80 p-3 text-sm text-slate-800">
            <p>
              <span className="font-semibold">Important:</span> Temporary policy changes, special cases, or checkpoint
              restrictions can affect entry. Final permission and length of stay is decided by the immigration officer
              at entry.
            </p>
            <p className="mt-2">
              <span className="font-semibold">TDAC:</span> You must complete TDAC within 3 days before arrival (
              <a
                href={VISA_ELIGIBILITY_SOURCES.tdac}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2"
              >
                Submit here
              </a>
              ).
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
