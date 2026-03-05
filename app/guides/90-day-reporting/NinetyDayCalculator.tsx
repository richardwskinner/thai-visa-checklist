"use client";

import { useMemo, useState } from "react";
import { CalendarDays, CalendarPlus } from "lucide-react";
import { analytics } from "@/lib/analytics";
import { Input } from "@/components/ui/input";

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
  const [y, m, d] = value.split("-").map(Number);
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
}

function formatPretty(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
  return dt.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function buildGoogleCalendarUrl(params: {
  title: string;
  details: string;
  startISO: string;
  endISOExclusive: string;
}) {
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
  const dtstamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const uid =
    typeof crypto !== "undefined" && "randomUUID" in crypto
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

    const windowStartUTC = addDaysUTC(dueUTC, -15);
    const windowStartISO = toISODateUTC(windowStartUTC);
    const windowStartEndExclusiveISO = toISODateUTC(addDaysUTC(windowStartUTC, 1));

    const title = "Thailand 90-Day Report Window Opens";
    const details =
      `Your 90-day reporting window opens today.\n\n` +
      `Due date: ${formatPretty(dueISO)}\n` +
      `Window: ${formatPretty(openISO)} to ${formatPretty(lateISO)}\n\n` +
      `Do it early (online can be unreliable).`;

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
    analytics.trackCalendarExport('ics');
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
    <div className="mt-6 max-w-full overflow-hidden rounded-3xl border border-violet-200 bg-gradient-to-b from-[#ece7ff] via-[#ebe7fb] to-[#e8e4f8] p-4 shadow-[0_16px_40px_rgba(109,40,217,0.12)] sm:p-6">
      <div className="rounded-3xl border border-white/70 bg-white/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-sm sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">Due Date Calculator</h3>
            <p className="mt-2 text-sm text-slate-700">
              Enter your last entry date or last 90-day report date.
            </p>
          </div>

          <div className="flex h-16 w-16 shrink-0 translate-x-1 items-center justify-center rounded-2xl border border-violet-200 bg-white shadow-sm sm:translate-x-2">
            <CalendarPlus className="h-8 w-8 text-violet-600" />
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="min-w-0">
            <div className="relative">
              <Input
                type="date"
                value={baseDate}
                onChange={(e) => {
                  setBaseDate(e.target.value);
                  if (e.target.value) {
                    analytics.trackCalculatorUse();
                  }
                }}
                className="mt-2 block w-full max-w-full rounded-2xl border border-violet-200 bg-white px-4 py-3 pr-12
                       text-sm text-slate-900 outline-none
                       appearance-none [-webkit-appearance:none] [font-size:16px]
                       focus:border-violet-400 focus:ring-2 focus:ring-violet-300"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-violet-100 bg-white/90 p-4">
            {!result ? (
              <div className="text-sm text-slate-600">Pick a date to see your due date + reporting window.</div>
            ) : (
              <div className="space-y-2">
                <div className="text-sm text-slate-600">Next due date</div>
                <div className="text-lg font-extrabold text-slate-900">{formatPretty(result.dueISO)}</div>
                <div className="text-sm text-slate-600">
                  Window: {formatPretty(result.openISO)} → {formatPretty(result.lateISO)}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <a
            href={result?.googleUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-white shadow-md transition ${
              result
                ? "bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-50% to-[#FBBC05] hover:-translate-y-0.5 hover:from-[#3367D6] hover:via-[#D93025] hover:to-[#F9AB00]"
                : "cursor-not-allowed bg-slate-300"
            }`}
            onClick={(e) => {
              if (!result) {
                e.preventDefault();
              } else {
                analytics.trackCalendarExport('google');
              }
            }}
          >
            <CalendarPlus className="h-5 w-5 text-white" />
            Add to Google Calendar
          </a>

          <button
            type="button"
            onClick={downloadICS}
            disabled={!result}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold shadow-sm transition ${
              result
                ? "border border-[#0078D4]/30 bg-gradient-to-r from-[#0078D4] to-[#106EBE] text-white hover:from-[#106EBE] hover:to-[#005A9E]"
                : "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400"
            }`}
          >
            <CalendarDays className="h-4 w-4 text-white" />
            Download .ICS (Apple/Outlook)
          </button>
        </div>
      </div>
    </div>
  );
}
