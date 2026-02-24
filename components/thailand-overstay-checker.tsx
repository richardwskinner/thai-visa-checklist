"use client";

import { useMemo, useState } from "react";

function toIsoDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseIsoDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, y, m, d] = match;
  const year = Number(y);
  const month = Number(m);
  const day = Number(d);
  if (!year || month < 1 || month > 12 || day < 1 || day > 31) return null;
  return new Date(Date.UTC(year, month - 1, day));
}

function addDaysUtc(date: Date, days: number) {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

function diffDaysUtc(a: Date, b: Date) {
  return Math.floor((b.getTime() - a.getTime()) / (24 * 60 * 60 * 1000));
}

function formatDate(date: Date | null) {
  if (!date) return "-";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function getVoluntaryBlacklist(overstayDays: number) {
  if (overstayDays <= 0) return "No overstay";
  if (overstayDays < 90) return "No blacklist (if voluntary surrender/departure)";
  if (overstayDays <= 365) return "Potential 1-year blacklist (voluntary surrender >90 days)";
  if (overstayDays <= 365 * 3) return "Potential 3-year blacklist (voluntary surrender >1 year)";
  if (overstayDays <= 365 * 5) return "Potential 5-year blacklist (voluntary surrender >3 years)";
  return "Potential 10-year blacklist (voluntary surrender >5 years)";
}

function getArrestedBlacklist(overstayDays: number) {
  if (overstayDays <= 0) return "No overstay";
  if (overstayDays <= 365) return "If arrested: potential 5-year blacklist";
  return "If arrested: potential 10-year blacklist";
}

export default function ThailandOverstayChecker() {
  const today = new Date();
  const [entryDate, setEntryDate] = useState(toIsoDate(today));
  const [stayGrantedDays, setStayGrantedDays] = useState("30");
  const [plannedDepartureDate, setPlannedDepartureDate] = useState(toIsoDate(addDaysUtc(new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())), 29)));

  const result = useMemo(() => {
    const entry = parseIsoDate(entryDate);
    const departure = parseIsoDate(plannedDepartureDate);
    const granted = Number(stayGrantedDays);

    if (!entry || !departure || !Number.isFinite(granted) || granted < 1) {
      return { valid: false as const, reason: "Enter valid dates and a stay length of at least 1 day." };
    }

    if (diffDaysUtc(entry, departure) < 0) {
      return { valid: false as const, reason: "Planned departure must be on or after your entry date." };
    }

    // Permitted stay usually counts the entry day as day 1.
    const expiryDate = addDaysUtc(entry, granted - 1);
    const overstayDays = Math.max(0, diffDaysUtc(expiryDate, departure));
    const fine = Math.min(overstayDays * 500, 20000);

    return {
      valid: true as const,
      entry,
      departure,
      expiryDate,
      overstayDays,
      fine,
      voluntaryBlacklist: getVoluntaryBlacklist(overstayDays),
      arrestedBlacklist: getArrestedBlacklist(overstayDays),
    };
  }, [entryDate, plannedDepartureDate, stayGrantedDays]);

  return (
    <section className="rounded-2xl border border-red-200 bg-red-50/70 p-4 sm:p-6">
      <h2 className="text-xl font-extrabold text-slate-900">Leave Date / Overstay Checker</h2>
      <p className="mt-2 text-sm text-slate-700">
Enter your planned departure date to estimate your permitted stay, overstay days, fines, and potential blacklist risk.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Entry date</span>
          <input
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Stay granted (days)</span>
          <input
            type="number"
            min={1}
            inputMode="numeric"
            value={stayGrantedDays}
            onChange={(e) => setStayGrantedDays(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Planned departure date</span>
          <input
            type="date"
            value={plannedDepartureDate}
            onChange={(e) => setPlannedDepartureDate(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          />
        </label>
      </div>

      {!result.valid ? (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          {result.reason}
        </div>
      ) : (
        <div className={`mt-4 grid gap-4 ${result.overstayDays > 0 ? "lg:grid-cols-2" : ""}`}>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="grid gap-2 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Entry date</span>
                <span className="font-semibold text-slate-900">{formatDate(result.entry)}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Permitted stay expires</span>
                <span className="font-semibold text-slate-900">{formatDate(result.expiryDate)}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Planned departure</span>
                <span className="font-semibold text-slate-900">{formatDate(result.departure)}</span>
              </div>
              <div className="mt-1 h-px bg-slate-200" />
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Overstay days</span>
                <span className={`font-bold ${result.overstayDays > 0 ? "text-red-700" : "text-emerald-700"}`}>
                  {result.overstayDays}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Estimated overstay fine</span>
                <span className={`font-bold ${result.overstayDays > 0 ? "text-red-700" : "text-slate-900"}`}>
                  {result.fine.toLocaleString()} THB
                </span>
              </div>
            </div>
          </div>

          {result.overstayDays > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
              <div className="font-bold text-slate-900">Blacklist potential (estimate)</div>
              <p className="mt-2 text-slate-700">{result.voluntaryBlacklist}</p>
              <p className="mt-2 text-slate-700">{result.arrestedBlacklist}</p>
              <p className="mt-3 text-xs text-slate-500">
                Estimate only. Actual outcome depends on official records, exact dates, and whether the case is treated as
                voluntary surrender/departure or arrest.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
