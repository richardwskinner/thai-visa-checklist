"use client";

import Link from "next/link";
import { VISAS } from "@/lib/data/visas";
import { analytics } from "@/lib/analytics";

const homeCardBackgrounds: Record<string, string> = {
  marriage: "bg-gradient-to-r from-pink-400 via-pink-500 to-fuchsia-500",
  retirement: "bg-gradient-to-r from-slate-600 via-blue-700 to-blue-800",
  business: "bg-gradient-to-br from-indigo-500 to-indigo-600",
  education: "bg-gradient-to-br from-emerald-500 to-green-600",
};

export default function HomeVisaGrid() {
  const hiddenVisaSlugs = new Set(["business", "education"]);
  const cardBaseClass =
    "group relative overflow-hidden rounded-[2rem] border border-white/35 px-7 py-7 text-left text-white shadow-[0_20px_50px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_58px_rgba(15,23,42,0.24),inset_0_1px_0_rgba(255,255,255,0.3)]";

  return (
    <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
      {VISAS.filter((v) => !hiddenVisaSlugs.has(v.slug)).map((v) =>
        v.disabled ? (
          <div
            key={v.slug}
            className={`${cardBaseClass} ${homeCardBackgrounds[v.slug] ?? "bg-slate-700"} opacity-90`}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-10 top-14 h-28 w-28 rounded-full bg-sky-300/35 blur-2xl" />
              <div className="absolute -right-8 top-8 h-24 w-24 rounded-full bg-blue-300/35 blur-2xl" />
              <div className="absolute bottom-0 left-1/3 h-16 w-40 rounded-full bg-white/30 blur-2xl" />
            </div>
            <span className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              Coming soon
            </span>
            <div className="relative text-3xl font-extrabold tracking-tight">
              <span className="mr-3">{v.emoji}</span>
              {v.title}
            </div>
            <div className="relative mt-2 text-lg font-semibold text-white/85">{v.subtitle}</div>
          </div>
        ) : (
          <Link
            key={v.slug}
            href={v.href}
            onClick={() => analytics.trackHomepageSelect(v.slug, v.href)}
            className={`${cardBaseClass} ${homeCardBackgrounds[v.slug] ?? "bg-slate-700"}`}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-10 top-14 h-28 w-28 rounded-full bg-sky-300/35 blur-2xl" />
              <div className="absolute -right-8 top-8 h-24 w-24 rounded-full bg-blue-300/35 blur-2xl" />
              <div className="absolute bottom-0 left-1/3 h-16 w-40 rounded-full bg-white/30 blur-2xl" />
            </div>
            <div className="relative text-3xl font-extrabold tracking-tight">
              <span className="mr-3">{v.emoji}</span>
              {v.title}
            </div>
            <div className="relative mt-2 text-lg font-semibold text-white/85">{v.subtitle}</div>
          </Link>
        )
      )}

      <Link
        href="/tdac"
        onClick={() => analytics.trackHomepageSelect("tdac", "/tdac")}
        className={`${cardBaseClass} bg-gradient-to-r from-sky-500 via-blue-500 to-blue-500`}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-10 top-14 h-28 w-28 rounded-full bg-sky-300/35 blur-2xl" />
          <div className="absolute -right-8 top-8 h-24 w-24 rounded-full bg-blue-300/35 blur-2xl" />
          <div className="absolute bottom-0 left-1/3 h-16 w-40 rounded-full bg-white/30 blur-2xl" />
        </div>
        <div className="relative text-3xl font-extrabold tracking-tight">
          <span className="mr-3">✈️</span>
          TDAC
        </div>
        <div className="relative mt-2 text-lg font-semibold text-white/85">Thailand Digital Arrival Card</div>
      </Link>

      <Link
        href={{
          pathname: "/guides/do-i-need-a-visa-thailand",
          query: {
            returnTo: "/",
            returnLabel: "Back to Home",
          },
        }}
        onClick={() =>
          analytics.trackHomepageSelect("do-i-need-a-visa", "/guides/do-i-need-a-visa-thailand")
        }
        className={`${cardBaseClass} bg-gradient-to-r from-indigo-600 via-violet-600 to-violet-500`}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-10 top-14 h-28 w-28 rounded-full bg-sky-300/35 blur-2xl" />
          <div className="absolute -right-8 top-8 h-24 w-24 rounded-full bg-blue-300/35 blur-2xl" />
          <div className="absolute bottom-0 left-1/3 h-16 w-40 rounded-full bg-white/30 blur-2xl" />
        </div>
        <div className="relative text-2xl font-extrabold tracking-tight sm:text-3xl">
          <span className="mr-3">🛂</span>
          Do I Need a Visa?
        </div>
        <div className="relative mt-2 text-lg font-semibold text-white/85">Thailand travel entry checker</div>
      </Link>
    </div>
  );
}
