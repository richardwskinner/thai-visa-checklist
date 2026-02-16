"use client";

import { useMemo, useState } from "react";
import { CalendarPlus } from "lucide-react";

function toISODateUTC(d: Date) {
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function addDaysUTC(date: Date, days: number) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

function parseDateInputToUTC(value: string) {
  // value is "YYYY-MM-DD" from <input type="date" />
  const [y, m, d] = value.split("-").map(Number);
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
}

function formatPretty(iso: string) {
  // safe, consistent rendering in client
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
  return dt.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function buildGoogleCalendarUrl(params: {
  title: string;
  details: string;
  startISO: string; // YYYY-MM-DD
  endISOExclusive: string; // YYYY-MM-DD
}) {
  // All-day event uses YYYYMMDD format
  const start = params.startISO.replaceAll("-", "");
  const end = params.endISOExclusive.replaceAll("-", "");

  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", params.title);
  url.searchParams.set("details", params.details);
  url.searchParams.set("dates", `${start}/${end}`);
  return url.toString();
}

function buildICS(params: {
  title: string;
  description: string;
  startISO: string;
  endISOExclusive: string;
}) {
  // All-day VEVENT
  const dtstamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const uid = (typeof crypto !== "undefined" && "randomUUID" in crypto)
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  const dtStart = params.startISO.replaceAll("-", "");
  const dtEnd = params.endISOExclusive.replaceAll("-", "");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Thai Visa Checklist//90 Day Report//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `SUMMARY:${params.title}`,
    `DESCRIPTION:${params.description.replace(/\n/g, "\\n")}`,
    `DTSTART;VALUE=DATE:${dtStart}`,
    `DTEND;VALUE=DATE:${dtEnd}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export default function NinetyDayCalculator() {
  const [baseDate, setBaseDate] = useState<string>("");

    const result = useMemo(() => {
    if (!baseDate) return null;

    const baseUTC = parseDateInputToUTC(baseDate);
    const dueUTC = addDaysUTC(baseUTC, 90);

    const dueISO = toISODateUTC(dueUTC);
    const openISO = toISODateUTC(addDaysUTC(dueUTC, -15));
    const lateISO = toISODateUTC(addDaysUTC(dueUTC, 7));

    // ✅ Calendar event should be on WINDOW OPEN (15 days before due date)
    const windowStartUTC = addDaysUTC(dueUTC, -15);
    const windowStartISO = toISODateUTC(windowStartUTC);

    // All-day event end is exclusive (next day)
    const windowStartEndExclusiveISO = toISODateUTC(addDaysUTC(windowStartUTC, 1));

    const title = "Thailand 90-Day Report Window Opens";
    const details =
      `Your 90-day reporting window opens today.\n\n` +
      `Due date: ${formatPretty(dueISO)}\n` +
      `Window: ${formatPretty(openISO)} to ${formatPretty(lateISO)}\n\n` +
      `Tip: Do it early (online can be unreliable).`;

    const googleUrl = buildGoogleCalendarUrl({
      title,
      details,
      startISO: windowStartISO,
      endISOExclusive: windowStartEndExclusiveISO,
    });

    const ics = buildICS({
      title,
      description: details,
      startISO: windowStartISO,
      endISOExclusive: windowStartEndExclusiveISO,
    });

    return { dueISO, openISO, lateISO, googleUrl, ics };
  }, [baseDate]);

  function downloadICS() {
    if (!result) return;
    const blob = new Blob([result.ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "thailand-90-day-report.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">Due Date Calculator</h3>
          <p className="mt-1 text-sm text-slate-700">
            Enter your <span className="font-semibold">last entry date</span> or{" "}
            <span className="font-semibold">last 90-day report date</span>.
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
          <CalendarPlus className="h-5 w-5 text-violet-700" />
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Date you last entered Thailand (or last report)
          </label>
          <input
            type="date"
            value={baseDate}
            onChange={(e) => setBaseDate(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
        </div>

        <div className="rounded-xl bg-white p-4 border border-slate-200">
          {!result ? (
            <div className="text-sm text-slate-600">
              Pick a date to see your due date + reporting window.
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-sm text-slate-600">Next due date</div>
              <div className="text-xl font-extrabold text-slate-900">
                {formatPretty(result.dueISO)}
              </div>
              <div className="text-xs text-slate-600">
                Window: {formatPretty(result.openISO)} → {formatPretty(result.lateISO)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={result?.googleUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white ${
            result ? "bg-violet-600 hover:bg-violet-700" : "bg-slate-300 cursor-not-allowed"
          }`}
          onClick={(e) => {
            if (!result) e.preventDefault();
          }}
        >
          Add to Google Calendar
        </a>

        <button
          type="button"
          onClick={downloadICS}
          disabled={!result}
          className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold ${
            result
              ? "bg-white text-slate-900 border border-slate-300 hover:bg-slate-50"
              : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
          }`}
        >
          Download .ICS (Apple/Outlook)
        </button>
      </div>

      <div className="mt-3 text-xs text-slate-600">
        Calendar tip: set a reminder for <span className="font-semibold">15 days before</span> the due date.
      </div>
    </div>
  );
}
