import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { visaNews } from "@/lib/data/visa-news";
import { ExternalLink, Pin, CalendarDays } from "lucide-react";

export const metadata: Metadata = {
  title: "Visa News",
  description:
    "Thailand visa news and updates on policies, forms, deadlines, and official immigration sources.",
};

const categoryStyles: Record<string, string> = {
  Visa: "bg-blue-100 text-blue-800",
  Immigration: "bg-rose-100 text-rose-800",
  Travel: "bg-violet-100 text-violet-800",
};

function formatDate(dateString: string) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function VisaNewsPage() {
  const byNewest = [...visaNews].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const pinned = byNewest.filter((item) => item.isPinned).slice(0, 2);
  const pinnedSlugs = new Set(pinned.map((item) => item.slug));
  const updates = byNewest.filter((item) => !pinnedSlugs.has(item.slug));

  return (
    <div className="min-h-screen bg-[#eef3fb]">
      <div className="mx-auto w-full max-w-5xl px-5 py-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Thailand Visa News</h1>
          <p className="mt-3 text-lg text-slate-600">
            Updates focused on visa policies, forms, and deadlines from official sources.
          </p>
        </div>

        {pinned.length > 0 && (
          <section className="mt-10">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-700">
              <Pin className="h-4 w-4" />
              Pinned Updates
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {pinned.map((item) => (
                <Card key={item.slug} className="rounded-3xl border-0 bg-white shadow-sm">
                  <CardContent className="p-6">
                    <div
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        categoryStyles[item.category] ?? "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {item.category}
                    </div>
                    <h2 className="mt-3 text-lg font-bold text-slate-900">{item.title}</h2>
                    <p className="mt-2 text-sm text-slate-600">{item.summary}</p>
                    <div className="mt-4 space-y-1 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />
                        Published {formatDate(item.publishedAt)}
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-slate-600">
                      Source:{" "}
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:text-blue-900"
                      >
                        {item.sourceLabel} <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section className="mt-10">
          <div className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-700">Latest Updates</div>
          <div className="space-y-4">
            {updates.map((item) => (
              <Card key={item.slug} className="rounded-3xl border-0 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      categoryStyles[item.category] ?? "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {item.category}
                  </div>
                  <h2 className="mt-3 text-lg font-bold text-slate-900">{item.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">{item.summary}</p>
                  <div className="mt-4 text-xs text-slate-500">
                    Published {formatDate(item.publishedAt)}
                  </div>
                  <div className="mt-4 text-sm text-slate-600">
                    Source:{" "}
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:text-blue-900"
                    >
                      {item.sourceLabel} <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="mt-10 text-xs text-slate-500">
          <Separator className="mb-4" />
          Always verify final requirements with official Thai government sources and your local immigration office.
        </div>
      </div>
    </div>
  );
}
