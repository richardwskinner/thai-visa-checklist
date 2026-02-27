"use client";

import Link from "next/link";
import { VISAS } from "@/lib/data/visas";
import { analytics } from "@/lib/analytics";

export default function HomeVisaGrid() {
  const hiddenVisaSlugs = new Set(["business", "education"]);

  return (
    <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
      {VISAS.filter((v) => !hiddenVisaSlugs.has(v.slug)).map((v) =>
        v.disabled ? (
          <div
            key={v.slug}
            className={`group relative w-full rounded-2xl ${v.bg} px-7 py-7 text-left text-white shadow-sm opacity-90 ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:shadow-md`}
          >
            <span className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              Coming soon
            </span>
            <div className="text-3xl font-extrabold tracking-tight">
              <span className="mr-3">{v.emoji}</span>
              {v.title}
            </div>
            <div className="mt-2 text-lg font-semibold text-white/85">{v.subtitle}</div>
          </div>
        ) : (
          <Link
            key={v.slug}
            href={v.href}
            onClick={() => analytics.trackHomepageSelect(v.slug, v.href)}
            className={`group relative w-full rounded-2xl ${v.bg} px-7 py-7 text-left text-white shadow-sm ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:shadow-md`}
          >
            <div className="text-3xl font-extrabold tracking-tight">
              <span className="mr-3">{v.emoji}</span>
              {v.title}
            </div>
            <div className="mt-2 text-lg font-semibold text-white/85">{v.subtitle}</div>
          </Link>
        )
      )}

      <Link
        href="/tdac"
        onClick={() => analytics.trackHomepageSelect("tdac", "/tdac")}
        className="group relative rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 px-7 py-7 text-left text-white shadow-sm ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="text-3xl font-extrabold tracking-tight">
          <span className="mr-3">✈️</span>
          TDAC
        </div>
        <div className="mt-2 text-lg font-semibold text-white/85">Thailand Digital Arrival Card</div>
      </Link>

      <Link
        href="/guides/do-i-need-a-visa-thailand"
        onClick={() =>
          analytics.trackHomepageSelect("do-i-need-a-visa", "/guides/do-i-need-a-visa-thailand")
        }
        className="group relative rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 px-7 py-7 text-left text-white shadow-sm ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          <span className="mr-3">🛂</span>
          Do I Need a Visa?
        </div>
        <div className="mt-2 text-lg font-semibold text-white/85">Thailand travel entry checker</div>
      </Link>
    </div>
  );
}
