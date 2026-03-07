"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock3, Plane } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const DEFAULT_SOURCE = { label: "London", zone: "Europe/London" } as const;

const LOCATION_FLAGS: Record<string, string> = {
  "Abu Dhabi": "🇦🇪",
  Amsterdam: "🇳🇱",
  Athens: "🇬🇷",
  Auckland: "🇳🇿",
  Bangkok: "🇹🇭",
  Beijing: "🇨🇳",
  Berlin: "🇩🇪",
  Brussels: "🇧🇪",
  Budapest: "🇭🇺",
  "Buenos Aires": "🇦🇷",
  Cairo: "🇪🇬",
  Chicago: "🇺🇸",
  Copenhagen: "🇩🇰",
  Delhi: "🇮🇳",
  Dubai: "🇦🇪",
  Dublin: "🇮🇪",
  Frankfurt: "🇩🇪",
  "Hong Kong": "🇭🇰",
  Honolulu: "🇺🇸",
  Istanbul: "🇹🇷",
  Jakarta: "🇮🇩",
  Johannesburg: "🇿🇦",
  "Kuala Lumpur": "🇲🇾",
  Lisbon: "🇵🇹",
  London: "🇬🇧",
  "Los Angeles": "🇺🇸",
  Madrid: "🇪🇸",
  Manila: "🇵🇭",
  Melbourne: "🇦🇺",
  "Mexico City": "🇲🇽",
  Miami: "🇺🇸",
  Moscow: "🇷🇺",
  Mumbai: "🇮🇳",
  "New York": "🇺🇸",
  Osaka: "🇯🇵",
  Paris: "🇫🇷",
  Perth: "🇦🇺",
  Prague: "🇨🇿",
  Rome: "🇮🇹",
  "San Francisco": "🇺🇸",
  Seoul: "🇰🇷",
  Shanghai: "🇨🇳",
  Singapore: "🇸🇬",
  Stockholm: "🇸🇪",
  Sydney: "🇦🇺",
  Taipei: "🇹🇼",
  Tokyo: "🇯🇵",
  Toronto: "🇨🇦",
  Vancouver: "🇨🇦",
  Vienna: "🇦🇹",
  Warsaw: "🇵🇱",
  Zurich: "🇨🇭",
  "Detected Local Time Zone": "🌍",
};

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

function getLocationFlag(label: string) {
  return LOCATION_FLAGS[label] ?? "🌍";
}

export default function ThailandTimeClient({ compact = false }: { compact?: boolean }) {
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
  const sourceFlag = getLocationFlag(sourceZoneLabel);

  return (
    <div className="space-y-6">
      <div
        className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-cover bg-center bg-no-repeat p-3 sm:p-5"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(248,250,252,0.38), rgba(241,245,249,0.42)), url('/images/thailand-time-bg.png')",
        }}
      >

        <div className="relative mx-auto max-w-3xl rounded-[28px] bg-gradient-to-r from-[#e25959] via-[#f8fafc] to-[#3558b5] p-[2px] shadow-[0_14px_40px_rgba(15,23,42,0.16)]">
          <div className="rounded-[26px] bg-white/90 px-4 py-4 backdrop-blur-sm sm:px-8 sm:py-5">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-base font-extrabold uppercase tracking-[0.09em] text-slate-900 sm:text-3xl">
                <span>Thailand Current Time</span>
              </div>
              <div className="mt-1 text-5xl font-black tracking-tight text-slate-900 drop-shadow-[0_2px_0_rgba(30,41,59,0.14)] sm:text-7xl">
                {thailandTime}
                <span className="ml-2 text-3xl font-extrabold sm:text-5xl">ICT</span>
              </div>
              <div className="mt-1 text-lg font-medium text-slate-600 sm:text-2xl">{thailandDate}</div>
            </div>
          </div>
        </div>

        <div className="relative mt-4 rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm backdrop-blur-sm sm:p-6">
          <h2 className="text-xl font-extrabold text-slate-900">Thailand Time Comparison</h2>
          <p className="mt-2 text-sm text-slate-600">
            Select a source location and any date/time (including future dates) to compare with Thailand.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="min-w-0">
              <Select value={selectedSourceValue} onValueChange={setSelectedSourceValue}>
                <SelectTrigger className="h-10 w-full min-w-0 rounded-xl border-slate-300 bg-white text-sm text-slate-900">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {sourceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-0">
              <div className="overflow-hidden rounded-xl border border-slate-300 bg-white">
                <Input
                  type="datetime-local"
                  value={selectedLocalDateTime}
                  onChange={(e) => setSelectedLocalDateTime(e.target.value)}
                  className="h-10 w-full min-w-0 max-w-full rounded-none border-0 bg-transparent px-3 py-2 text-base text-slate-900 shadow-none focus-visible:border-0 focus-visible:ring-0 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Time entered is interpreted in the selected location&apos;s time zone.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Selected Location Time</div>
              <div className="mt-1 text-sm font-semibold text-slate-800">
                <span className="mr-2" aria-hidden="true">{sourceFlag}</span>
                {sourceZoneLabel}
              </div>
              <div className="mt-1 text-lg font-extrabold text-slate-900">
                {sourceInstantMs != null
                  ? formatDateTimeForZone(new Date(sourceInstantMs), sourceZone)
                  : "Enter a valid date/time"}
              </div>
            </div>
            <div className="hidden items-center justify-center sm:flex">
              <div className="relative flex w-28 items-center justify-center">
                <div className="w-full border-t-2 border-dotted border-sky-300" />
                <Plane className="absolute h-5 w-5 text-sky-500" />
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Thailand (ICT, UTC+7)</div>
              <div className="mt-1 text-sm font-semibold text-slate-800">
                <span className="mr-2" aria-hidden="true">🇹🇭</span>
                Bangkok, Thailand
              </div>
              <div className="mt-1 text-lg font-extrabold text-slate-900">
                {sourceInstantMs != null
                  ? formatDateTimeForZone(new Date(sourceInstantMs), THAILAND_TIMEZONE)
                  : "Enter a valid date/time"}
              </div>
            </div>
          </div>
          <div className="mt-3 rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50 via-white to-sky-50 p-3 text-sm text-sky-900">
            <div className="font-semibold">
              {diffMinutes === 0 ? (
                <>
                  {sourceZoneLabel} and Thailand are the same time.
                </>
              ) : diffMinutes > 0 ? (
                <>
                  <span aria-hidden="true">🇹🇭</span> Thailand is {diffAmount} ahead of {sourceZoneLabel}.
                </>
              ) : (
                <>
                  <span aria-hidden="true">{sourceFlag}</span> {sourceZoneLabel} is {diffAmount} ahead of Thailand.
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {!compact && (
        <>
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
        </>
      )}
    </div>
  );
}
