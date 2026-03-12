import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { visaNews } from "@/lib/data/visa-news";
import { ExternalLink, Pin, CalendarDays } from "lucide-react";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Thailand Visa News",
  description:
    "Thailand visa news and updates on policies, forms, deadlines, and official immigration sources.",
  path: "/visa-news",
});

const categoryStyles: Record<string, string> = {
  Policy: "bg-blue-100 text-blue-800",
  Border: "bg-emerald-100 text-emerald-800",
  Reporting: "bg-yellow-100 text-yellow-800",
  Fees: "bg-orange-100 text-orange-800",
  Official: "bg-violet-100 text-violet-800",
  Life: "bg-stone-100 text-stone-800",
};

const newsFilters = ["All", "Policy", "Border", "Reporting", "Fees", "Official", "Life"] as const;
const filterChipStyles: Record<(typeof newsFilters)[number], string> = {
  All: "bg-slate-100 text-slate-700 border-slate-200",
  Policy: "bg-blue-100 text-blue-800 border-blue-200",
  Border: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Reporting: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Fees: "bg-orange-100 text-orange-800 border-orange-200",
  Official: "bg-violet-100 text-violet-800 border-violet-200",
  Life: "bg-stone-100 text-stone-800 border-stone-200",
};

function formatDate(dateString: string) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getSourceLogo(sourceLabel: string, sourceUrl: string) {
  const label = sourceLabel.toLowerCase();

  if (label.includes("immigration bureau")) {
    return "/resource-logos/Immigration-bureau.png";
  }

  if (label.includes("royal thai embassy")) {
    return "/resource-logos/Royal-thai-embassy.jpg";
  }

  if (label.includes("mfa")) {
    return "/resource-logos/mfa_logo.webp";
  }

  if (label.includes("bangkok post")) {
    return "/resource-logos/BangkokPost.png";
  }

  try {
    const url = new URL(sourceUrl);
    return `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(url.origin)}`;
  } catch {
    return null;
  }
}

function SourceLogoBadge({ sourceLabel, sourceUrl }: { sourceLabel: string; sourceUrl: string }) {
  const sourceLogo = getSourceLogo(sourceLabel, sourceUrl);

  if (!sourceLogo) return null;

  return (
    <a
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open source: ${sourceLabel}`}
      title={sourceLabel}
      className="inline-flex h-10 w-16 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-white px-1.5 shadow-sm hover:border-slate-300"
    >
      <img
        src={sourceLogo}
        alt={`${sourceLabel} logo`}
        className="max-h-7 w-auto object-contain"
        loading="lazy"
      />
    </a>
  );
}

function SourceLink({ sourceLabel, sourceUrl }: { sourceLabel: string; sourceUrl: string }) {
  return (
    <a
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:text-blue-900"
    >
      {sourceLabel} <ExternalLink className="h-3.5 w-3.5" />
    </a>
  );
}

export default async function VisaNewsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const params = searchParams ? await searchParams : undefined;
  const requestedCategory = params?.category;
  const activeFilter = newsFilters.includes(requestedCategory as (typeof newsFilters)[number])
    ? (requestedCategory as (typeof newsFilters)[number])
    : "All";

  const byNewest = [...visaNews].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const filtered = activeFilter === "All" ? byNewest : byNewest.filter((item) => item.category === activeFilter);
  const showPinned = activeFilter === "All";
  const pinned = showPinned ? filtered.filter((item) => item.isPinned).slice(0, 2) : [];
  const pinnedSlugs = new Set(pinned.map((item) => item.slug));
  const updates = showPinned ? filtered.filter((item) => !pinnedSlugs.has(item.slug)) : filtered;

  const filterLinks = newsFilters.map((filter) => {
    const isActive = activeFilter === filter;
    const href = filter === "All" ? "/visa-news" : `/visa-news?category=${encodeURIComponent(filter)}`;
    const base = filterChipStyles[filter];
    return (
      <Link
        key={filter}
        href={href}
        className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
          isActive
            ? `${base} ring-1 ring-inset ring-current`
            : `${base} opacity-70 hover:opacity-100`
        }`}
      >
        {filter}
      </Link>
    );
  });

  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-5 py-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Thailand Visa News</h1>
          <p className="mt-3 text-lg text-slate-600">
            Updates focused on Thai visa news, policies, fees, and life in Thailand.
          </p>
        </div>

        {showPinned && pinned.length > 0 && (
          <section className="mt-10">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-700">
                <Pin className="h-4 w-4" />
                Pinned Updates
              </div>
              <div className="flex flex-wrap items-center gap-2">{filterLinks}</div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {pinned.map((item) => (
                <Card key={item.slug} className="rounded-3xl border-0 bg-white shadow-sm">
                  <CardContent className="relative p-6">
                    <div className="absolute right-6 top-6">
                      <SourceLogoBadge sourceLabel={item.sourceLabel} sourceUrl={item.sourceUrl} />
                    </div>
                    <div
                      className={`inline-flex rounded-full px-3 py-1 pr-3 text-xs font-semibold ${
                        categoryStyles[item.category] ?? "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {item.category}
                    </div>
                    <h2 className="mt-3 pr-20 text-lg font-bold text-slate-900">{item.title}</h2>
                    <p className="mt-2 text-sm text-slate-600">{item.summary}</p>
                    <div className="mt-4 space-y-1 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />
                        Published {formatDate(item.publishedAt)}
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-slate-600">
                      Source:{" "}
                      <SourceLink sourceLabel={item.sourceLabel} sourceUrl={item.sourceUrl} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section className="mt-10">
          {!showPinned && (
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm font-bold uppercase tracking-wide text-slate-700">Latest Updates</div>
              <div className="flex flex-wrap items-center gap-2">{filterLinks}</div>
            </div>
          )}
          {showPinned && (
            <div className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-700">Latest Updates</div>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            {updates.map((item) => (
              <Card key={item.slug} className="rounded-3xl border-0 bg-white shadow-sm">
                <CardContent className="relative p-6">
                  <div className="absolute right-6 top-6">
                    <SourceLogoBadge sourceLabel={item.sourceLabel} sourceUrl={item.sourceUrl} />
                  </div>
                  <div
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      categoryStyles[item.category] ?? "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {item.category}
                  </div>
                  <h2 className="mt-3 pr-20 text-lg font-bold text-slate-900">{item.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">{item.summary}</p>
                  <div className="mt-4 text-xs text-slate-500">
                    Published {formatDate(item.publishedAt)}
                  </div>
                  <div className="mt-4 text-sm text-slate-600">
                    Source:{" "}
                    <SourceLink sourceLabel={item.sourceLabel} sourceUrl={item.sourceUrl} />
                  </div>
                </CardContent>
              </Card>
            ))}
            {updates.length === 0 && (
              <Card className="rounded-3xl border-0 bg-white shadow-sm">
                <CardContent className="p-6 text-sm text-slate-600">
                  No news items found for <span className="font-semibold text-slate-900">{activeFilter}</span>.
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        <div className="mt-10 text-xs text-slate-500">
          <Separator className="mb-4" />
        </div>
      </div>
    </div>
  );
}
