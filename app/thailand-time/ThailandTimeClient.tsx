"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock3 } from "lucide-react";
import Link from "next/link";

const THAILAND_TIMEZONE = "Asia/Bangkok";

const CITY_TIMEZONES = [
  { label: "Abu Dhabi", zone: "Asia/Dubai" },
  { label: "Amsterdam", zone: "Europe/Amsterdam" },
  { label: "Athens", zone: "Europe/Athens" },
  { label: "Auckland", zone: "Pacific/Auckland" },
  { label: "Bangkok", zone: "Asia/Bangkok" },
  { label: "Beijing", zone: "Asia/Shanghai" },
  { label: "Berlin", zone: "Europe/Berlin" },
  { label: "Brussels", zone: "Europe/Brussels" },
  { label: "Budapest", zone: "Europe/Budapest" },
  { label: "Buenos Aires", zone: "America/Argentina/Buenos_Aires" },
  { label: "Cairo", zone: "Africa/Cairo" },
  { label: "Chicago", zone: "America/Chicago" },
  { label: "Copenhagen", zone: "Europe/Copenhagen" },
  { label: "Delhi", zone: "Asia/Kolkata" },
  { label: "Dubai", zone: "Asia/Dubai" },
  { label: "Dublin", zone: "Europe/Dublin" },
  { label: "Frankfurt", zone: "Europe/Berlin" },
  { label: "Hong Kong", zone: "Asia/Hong_Kong" },
  { label: "Honolulu", zone: "Pacific/Honolulu" },
  { label: "Istanbul", zone: "Europe/Istanbul" },
  { label: "Jakarta", zone: "Asia/Jakarta" },
  { label: "Johannesburg", zone: "Africa/Johannesburg" },
  { label: "Kuala Lumpur", zone: "Asia/Kuala_Lumpur" },
  { label: "Lisbon", zone: "Europe/Lisbon" },
  { label: "London", zone: "Europe/London" },
  { label: "Los Angeles", zone: "America/Los_Angeles" },
  { label: "Madrid", zone: "Europe/Madrid" },
  { label: "Manila", zone: "Asia/Manila" },
  { label: "Melbourne", zone: "Australia/Melbourne" },
  { label: "Mexico City", zone: "America/Mexico_City" },
  { label: "Miami", zone: "America/New_York" },
  { label: "Moscow", zone: "Europe/Moscow" },
  { label: "Mumbai", zone: "Asia/Kolkata" },
  { label: "New York", zone: "America/New_York" },
  { label: "Osaka", zone: "Asia/Tokyo" },
  { label: "Paris", zone: "Europe/Paris" },
  { label: "Perth", zone: "Australia/Perth" },
  { label: "Prague", zone: "Europe/Prague" },
  { label: "Rome", zone: "Europe/Rome" },
  { label: "San Francisco", zone: "America/Los_Angeles" },
  { label: "Seoul", zone: "Asia/Seoul" },
  { label: "Shanghai", zone: "Asia/Shanghai" },
  { label: "Singapore", zone: "Asia/Singapore" },
  { label: "Stockholm", zone: "Europe/Stockholm" },
  { label: "Sydney", zone: "Australia/Sydney" },
  { label: "Taipei", zone: "Asia/Taipei" },
  { label: "Tokyo", zone: "Asia/Tokyo" },
  { label: "Toronto", zone: "America/Toronto" },
  { label: "Vancouver", zone: "America/Vancouver" },
  { label: "Vienna", zone: "Europe/Vienna" },
  { label: "Warsaw", zone: "Europe/Warsaw" },
  { label: "Zurich", zone: "Europe/Zurich" },
] as const;

const WORLD_COMPARISON_CITIES = [
  { label: "Bangkok", zone: "Asia/Bangkok" },
  { label: "London", zone: "Europe/London" },
  { label: "Dubai", zone: "Asia/Dubai" },
  { label: "Tokyo", zone: "Asia/Tokyo" },
  { label: "New York", zone: "America/New_York" },
  { label: "Sydney", zone: "Australia/Sydney" },
] as const;

const DEFAULT_SOURCE = { label: "London", zone: "Europe/London" } as const;

function toSourceOptionValue(label: string, zone: string) {
  return `${label}__${zone}`;
}

function formatThailandDate(timestamp: number) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: THAILAND_TIMEZONE,
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(timestamp));
}

function formatTimeForZone(timestamp: number, zone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: zone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(timestamp));
}

function getNowInZoneDatetimeLocal(zone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: zone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "00";

  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}

function formatDateTimeForZone(date: Date, zone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: zone,
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function parseDatetimeLocal(input: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(input);
  if (!match) return null;
  const [, y, m, d, hh, mm] = match;
  return {
    year: Number(y),
    month: Number(m),
    day: Number(d),
    hour: Number(hh),
    minute: Number(mm),
  };
}

function getTimeZoneOffsetMs(timestamp: number, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(timestamp));

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? "0");

  const asUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second")
  );

  return asUtc - timestamp;
}

function formatUtcOffset(timestamp: number, zone: string) {
  const totalMinutes = Math.round(getTimeZoneOffsetMs(timestamp, zone) / 60000);
  const sign = totalMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(totalMinutes);
  const hours = Math.floor(abs / 60);
  const minutes = abs % 60;
  return minutes === 0
    ? `UTC${sign}${hours}`
    : `UTC${sign}${hours}:${String(minutes).padStart(2, "0")}`;
}

function zonedDateTimeToUtcMs(
  dateTime: { year: number; month: number; day: number; hour: number; minute: number },
  timeZone: string
) {
  const utcGuess = Date.UTC(
    dateTime.year,
    dateTime.month - 1,
    dateTime.day,
    dateTime.hour,
    dateTime.minute,
    0
  );
  const offset1 = getTimeZoneOffsetMs(utcGuess, timeZone);
  let timestamp = utcGuess - offset1;
  const offset2 = getTimeZoneOffsetMs(timestamp, timeZone);
  if (offset2 !== offset1) {
    timestamp = utcGuess - offset2;
  }
  return timestamp;
}

export default function ThailandTimeClient() {
  const [now, setNow] = useState(() => Date.now());
  const localZone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone || "Etc/UTC", []);
  const sourceOptions = useMemo(
    () => [
      {
        label: "Detected Local Time Zone",
        zone: localZone,
        value: toSourceOptionValue("Detected Local Time Zone", localZone),
      },
      ...CITY_TIMEZONES.map((city) => ({
        ...city,
        value: toSourceOptionValue(city.label, city.zone),
      })),
    ],
    [localZone]
  );
  const [selectedSourceValue, setSelectedSourceValue] = useState(() =>
    toSourceOptionValue(DEFAULT_SOURCE.label, DEFAULT_SOURCE.zone)
  );
  const [selectedLocalDateTime, setSelectedLocalDateTime] = useState(() =>
    getNowInZoneDatetimeLocal(DEFAULT_SOURCE.zone)
  );

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const selectedSource =
    sourceOptions.find((option) => option.value === selectedSourceValue) ?? sourceOptions[0];
  const sourceZone = selectedSource.zone;
  const sourceZoneLabel = selectedSource.label;

  useEffect(() => {
    setSelectedLocalDateTime(getNowInZoneDatetimeLocal(sourceZone));
  }, [sourceZone]);

  const thailandTime = formatTimeForZone(now, THAILAND_TIMEZONE);
  const thailandDate = formatThailandDate(now);

  const parsedSourceDateTime = useMemo(
    () => parseDatetimeLocal(selectedLocalDateTime),
    [selectedLocalDateTime]
  );
  const sourceInstantMs = useMemo(() => {
    if (!parsedSourceDateTime) return null;
    return zonedDateTimeToUtcMs(parsedSourceDateTime, sourceZone);
  }, [parsedSourceDateTime, sourceZone]);

  const diffMinutes = useMemo(() => {
    if (sourceInstantMs == null) return 0;
    const sourceOffset = getTimeZoneOffsetMs(sourceInstantMs, sourceZone) / 60000;
    const thaiOffset = getTimeZoneOffsetMs(sourceInstantMs, THAILAND_TIMEZONE) / 60000;
    return thaiOffset - sourceOffset;
  }, [sourceInstantMs, sourceZone]);

  const diffHours = Math.floor(Math.abs(diffMinutes) / 60);
  const diffMins = Math.abs(diffMinutes) % 60;
  const hourPart = diffHours > 0 ? `${diffHours} ${diffHours === 1 ? "hour" : "hours"}` : "";
  const minutePart = diffMins > 0 ? `${diffMins} ${diffMins === 1 ? "minute" : "minutes"}` : "";
  const diffAmount = [hourPart, minutePart].filter(Boolean).join(" ");
  const diffLabel =
    diffMinutes === 0
      ? `${sourceZoneLabel} and Thailand are the same time.`
      : diffMinutes > 0
        ? `Thailand is ${diffAmount} ahead of ${sourceZoneLabel}.`
        : `${sourceZoneLabel} is ${diffAmount} ahead of Thailand.`;

  return (
    <div className="space-y-6">
      <div className="mx-auto max-w-md rounded-2xl border border-sky-200 bg-sky-50 p-3 sm:p-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wide text-sky-800">
            <span aria-hidden="true">🇹🇭</span>
            <span>Thailand Time</span>
            <span aria-hidden="true">🇹🇭</span>
          </div>
          <div className="mt-0.5 text-3xl font-extrabold text-slate-900 sm:text-4xl">{thailandTime} ICT</div>
          <div className="mt-0.5 text-sm text-slate-600">{thailandDate}</div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-xl font-extrabold text-slate-900">Thailand Time Comparison</h2>
        <p className="mt-2 text-sm text-slate-600">
          Select a source location and any date/time (including future dates) to compare with Thailand.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <select
            value={selectedSourceValue}
            onChange={(e) => setSelectedSourceValue(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          >
            {sourceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="datetime-local"
            value={selectedLocalDateTime}
            onChange={(e) => setSelectedLocalDateTime(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          />
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Time entered is interpreted in the selected location&apos;s time zone.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Selected Location Time</div>
            <div className="mt-1 text-sm font-semibold text-slate-800">{sourceZoneLabel}</div>
            <div className="mt-1 text-lg font-extrabold text-slate-900">
              {sourceInstantMs != null
                ? formatDateTimeForZone(new Date(sourceInstantMs), sourceZone)
                : "Enter a valid date/time"}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Thailand (ICT, UTC+7)</div>
            <div className="mt-1 text-sm font-semibold text-slate-800">Bangkok, Thailand</div>
            <div className="mt-1 text-lg font-extrabold text-slate-900">
              {sourceInstantMs != null
                ? formatDateTimeForZone(new Date(sourceInstantMs), THAILAND_TIMEZONE)
                : "Enter a valid date/time"}
            </div>
          </div>
        </div>
        <div className="mt-3 rounded-xl border border-sky-200 bg-sky-50 p-3 text-sm font-semibold text-sky-900">
          {diffLabel}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-xl font-extrabold text-slate-900">World Time Comparison</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WORLD_COMPARISON_CITIES.map((city) => (
            <div key={city.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="text-sm font-semibold text-slate-800">{city.label}</div>
              <div className="mt-0.5 text-xs font-medium text-slate-500">{formatUtcOffset(now, city.zone)}</div>
              <div className="mt-1 text-xl font-extrabold text-slate-900">{formatTimeForZone(now, city.zone)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-xl font-extrabold text-slate-900">Related Tools</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <Link
            href={{
              pathname: "/guides/do-i-need-a-visa-thailand",
              query: {
                returnTo: "/thailand-time",
                returnLabel: "Back to Thailand Time",
              },
            }}
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-center text-xs font-semibold text-white hover:bg-blue-700 sm:px-4 sm:text-sm"
          >
            Thailand Visa Eligibility
          </Link>
          <Link
            href={{
              pathname: "/guides/90-day-reporting",
              query: {
                returnTo: "/thailand-time",
                returnLabel: "Back to Thailand Time",
              },
            }}
            className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-3 py-2 text-center text-xs font-semibold text-white hover:bg-violet-700 sm:px-4 sm:text-sm"
          >
            90-Day Reporting
          </Link>
          <Link
            href={{
              pathname: "/guides/overstay-thailand",
              query: {
                returnTo: "/thailand-time",
                returnLabel: "Back to Thailand Time",
              },
            }}
            className="inline-flex items-center justify-center rounded-xl bg-red-600 px-3 py-2 text-center text-xs font-semibold text-white hover:bg-red-700 sm:px-4 sm:text-sm"
          >
            Overstay Checker
          </Link>
          <Link
            href={{
              pathname: "/tdac",
              query: {
                returnTo: "/thailand-time",
                returnLabel: "Back to Thailand Time",
              },
            }}
            className="rounded-xl bg-sky-600 px-3 py-2 text-center text-xs font-semibold text-white hover:bg-sky-700 sm:px-4 sm:text-sm"
          >
            Thailand Digital Arrival Card TDAC
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        Thailand uses one time zone nationwide: ICT (UTC+7), with no daylight saving time.
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Clock3 className="h-4 w-4" />
        Last refreshed: {formatTimeForZone(now, THAILAND_TIMEZONE)} ICT
      </div>
    </div>
  );
}
