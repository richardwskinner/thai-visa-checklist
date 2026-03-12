import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { createRouteMetadata } from "@/lib/seo";

type HolidayItem = {
  date: string;
  name: string;
  note?: string;
  about?: string;
};

const nationalHolidays: HolidayItem[] = [
  {
    date: "January 1, 2026",
    name: "New Year's Day",
    about: "Start of the calendar year and a major travel period. Many offices, banks, and businesses close.",
  },
  {
    date: "January 2, 2026",
    name: "Special Holiday",
    about: "An additional government-declared holiday extending the New Year break period.",
  },
  {
    date: "March 3, 2026",
    name: "Makha Bucha",
    about: "An important Buddhist holy day marking a gathering of monks to hear the Buddha's teachings. Many people visit temples and make merit.",
  },
  {
    date: "April 6, 2026",
    name: "Chakri Memorial Day",
    about: "Commemorates the founding of the Chakri Dynasty and honors Thai kings in the current royal line.",
  },
  {
    date: "April 13, 2026",
    name: "Songkran",
    about: "Thai New Year festival. Traditionally focused on family visits, temple merit-making, and respectful water-pouring rituals.",
  },
  {
    date: "April 14, 2026",
    name: "Songkran",
    about: "Continuation of the Songkran holiday period. Travel, family gatherings, and local ceremonies remain common nationwide.",
  },
  {
    date: "April 15, 2026",
    name: "Songkran",
    about: "Final official Songkran holiday day in many calendars, with heavy domestic travel and some reduced office services.",
  },
  {
    date: "May 1, 2026",
    name: "Labour Day",
    about: "Recognizes workers and labor rights. Closures can vary by sector, but many offices and businesses adjust hours.",
  },
  {
    date: "May 4, 2026",
    name: "Coronation Day",
    about: "Royal holiday marking the coronation of the reigning monarch. Government offices usually close.",
  },
  {
    date: "June 1, 2026",
    name: "Visakha Bucha Day (observed)",
    about: "Major Buddhist holy day associated with the Buddha's birth, enlightenment, and passing. This is the observed closure date in the 2026 official list.",
  },
  {
    date: "June 3, 2026",
    name: "H.M. Queen's Birthday",
    about: "Royal holiday celebrating Her Majesty Queen Suthida's birthday.",
  },
  {
    date: "July 28, 2026",
    name: "H.M. King's Birthday",
    about: "Royal holiday marking His Majesty the King's birthday, commonly observed with ceremonies and displays.",
  },
  {
    date: "July 29, 2026",
    name: "Asarnha Bucha Day",
    about: "Buddhist holy day commemorating the Buddha's first sermon. Many Thais visit temples and participate in candlelight processions.",
  },
  {
    date: "August 12, 2026",
    name: "H.M. Queen Mother's Birthday",
    about: "Royal holiday honoring Queen Sirikit, also widely recognized as Mother's Day in Thailand.",
  },
  {
    date: "October 13, 2026",
    name: "H.M. King Bhumibol Memorial Day",
    about: "Memorial day honoring King Bhumibol Adulyadej (Rama IX), with remembrance activities and official ceremonies.",
  },
  {
    date: "October 23, 2026",
    name: "King Chulalongkorn Memorial Day",
    about: "Honors King Chulalongkorn (Rama V), remembered for major reforms and modernization of Thailand.",
  },
  {
    date: "December 7, 2026",
    name: "Substitute Holiday for Father's Day",
    about: "Observed closure day for Father's Day / King Bhumibol birthday period when 5 December falls on a weekend.",
  },
  {
    date: "December 10, 2026",
    name: "Constitution Day",
    about: "Marks the adoption of Thailand's first permanent constitution in 1932. Government offices typically close.",
  },
  {
    date: "December 31, 2026",
    name: "New Year's Eve",
    about: "Year-end holiday with heavy travel and celebrations. Plan immigration, banking, and transport around closures.",
  },
];

const governmentOnlyHolidays: HolidayItem[] = [
  {
    date: "July 30, 2026",
    name: "Buddhist Lent",
    about: "Beginning of the Buddhist Lent period (Khao Phansa), when monks traditionally remain in one temple for the rainy season retreat.",
  },
];

export const metadata = createRouteMetadata({
  title: "Thailand Public Holidays 2026",
  description:
    "Thailand public holidays for 2026 with official holiday dates and short cultural and religious context notes.",
  path: "/thailand-public-holidays-2026",
});

type SectionTheme = {
  shell: string;
  badge: string;
  tableBorder: string;
  headerBg: string;
  datePill: string;
  dot: string;
};

const sectionThemes: Record<"national" | "government", SectionTheme> = {
  national: {
    shell: "border-blue-200 bg-blue-50/40",
    badge: "bg-blue-100 text-blue-800",
    tableBorder: "border-blue-200/80",
    headerBg: "bg-blue-50",
    datePill: "bg-blue-50 text-blue-900 border-blue-200",
    dot: "bg-blue-500",
  },
  government: {
    shell: "border-emerald-200 bg-emerald-50/40",
    badge: "bg-emerald-100 text-emerald-800",
    tableBorder: "border-emerald-200/80",
    headerBg: "bg-emerald-50",
    datePill: "bg-emerald-50 text-emerald-900 border-emerald-200",
    dot: "bg-emerald-500",
  },
};

function HolidaySection({
  title,
  subtitle,
  items,
  theme,
}: {
  title: string;
  subtitle: string;
  items: HolidayItem[];
  theme: "national" | "government";
}) {
  const colors = sectionThemes[theme];

  return (
    <section className={`mt-8 rounded-2xl border p-4 sm:p-5 ${colors.shell}`}>
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
      </div>

      <div className={`mt-4 overflow-hidden rounded-2xl border bg-white ${colors.tableBorder}`}>
        <div
          className={`hidden grid-cols-[220px_1fr] border-b px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-600 sm:grid ${colors.tableBorder} ${colors.headerBg}`}
        >
          <div>Date</div>
          <div>Holiday</div>
        </div>

        <div>
          {items.map((item, index) => (
            <div
              key={`${item.date}-${item.name}`}
              className={`px-4 py-3 first:border-t-0 sm:grid sm:grid-cols-[220px_1fr] sm:gap-4 ${
                index === 0 ? "" : "border-t border-slate-100"
              } ${index % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}
            >
              <div className="text-sm font-semibold text-slate-900">
                <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs sm:text-sm ${colors.datePill}`}>
                  {item.date}
                </span>
              </div>
              <div className="mt-1 text-sm text-slate-800 sm:mt-0">
                <div className="flex items-start gap-2">
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${colors.dot}`} />
                  <span className="font-semibold text-slate-900">{item.name}</span>
                </div>
                {item.about ? <div className="mt-1 text-xs leading-relaxed text-slate-600">{item.about}</div> : null}
                {item.note ? <div className="mt-1 text-xs text-slate-500">{item.note}</div> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ThailandPublicHolidays2026Page() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#e0f2fe_0%,_#f8fafc_35%,_#f8fafc_100%)]">
      <div className="mx-auto w-full max-w-5xl px-3 py-6 sm:py-8">
        <Card className="rounded-3xl border border-slate-200/80 bg-white/95 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
          <CardContent className="p-6 sm:p-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-r from-sky-50 via-white to-indigo-50 p-5 sm:p-6">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Thailand Public Holidays 2026
              </h1>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-blue-800">
                  National holidays
                </span>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-800">
                  Government office dates
                </span>
              </div>
            </div>

            <HolidaySection
              title="National Public Holidays"
              subtitle="Nationwide public holidays shown by the Bangkok Post."
              items={nationalHolidays}
              theme="national"
            />

            <HolidaySection
              title="Additional Official Holiday Date"
              subtitle="Additional date shown by the Bangkok Post."
              items={governmentOnlyHolidays}
              theme="government"
            />

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <div className="font-bold text-slate-900">Source</div>
              <p className="mt-1">
                Holiday dates on this page follow the Bangkok Post 2026 official Thailand holidays graphic.{" "}
                <a
                  href="https://www.facebook.com/photo.php?fbid=1290223356483758&set=a.372486674924102&id=100064883163929"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800"
                >
                  Bangkok Post <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
