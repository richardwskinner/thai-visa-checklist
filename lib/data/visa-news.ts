export type VisaNewsCategory = "Visa" | "Immigration" | "Travel";

export type VisaNewsItem = {
  slug: string;
  title: string;
  summary: string;
  category: VisaNewsCategory;
  publishedAt: string;
  isPinned?: boolean;
  sourceLabel: string;
  sourceUrl: string;
};

export const visaNews: VisaNewsItem[] = [
  {
    slug: "visa-free-stay-under-review-2026",
    title: "Thailand Reviewing 60-Day Visa-Free Stays",
    summary:
      "Thai authorities are reviewing the 60-day visa-free stay framework after complaints about misuse, with possible policy adjustments under consideration.",
    category: "Visa",
    publishedAt: "2026-02-18",
    isPinned: true,
    sourceLabel: "Bangkok Post",
    sourceUrl:
      "https://www.bangkokpost.com/thailand/general/3200100/thailand-reviewing-visafree-stays-as-local-complaints-pile-up",
  },
  {
    slug: "immigration-announcement-34106",
    title: "Immigration Tightens Screening of Repeat Visa-Run Patterns",
    summary:
      "Immigration announced stricter checks on repeated visa-run behavior, with possible entry refusal after repeated unjustified runs and closer review of extensions and overstays.",
    category: "Immigration",
    publishedAt: "2025-11-12",
    isPinned: true,
    sourceLabel: "Thai Immigration Bureau",
    sourceUrl: "https://www.immigration.go.th/?p=34106",
  },
  {
    slug: "immigration-announcement-34124",
    title: "Overstay Fines Waived for Flood-Stranded Tourists in 8 Southern Provinces",
    summary:
      "Immigration approved a temporary overstay fine waiver for foreigners unable to depart due to severe flooding in Songkhla, Nakhon Si Thammarat, Phatthalung, Trang, Satun, Pattani, Yala, and Narathiwat (applies 20 Nov to 31 Dec 2025).",
    category: "Immigration",
    publishedAt: "2025-11-28",
    sourceLabel: "Thai Immigration Bureau",
    sourceUrl: "https://www.immigration.go.th/?p=34124",
  },
  {
    slug: "official-portals-check-before-applying",
    title: "Thai e-Visa Rolled Out Globally from January 1, 2025",
    summary:
      "The Ministry of Foreign Affairs announced the global launch of the Thai e-Visa system across Royal Thai Embassies and Consulates, available via thaievisa.go.th from January 1, 2025.",
    category: "Visa",
    publishedAt: "2024-12-17",
    isPinned: true,
    sourceLabel: "MFA Announcement",
    sourceUrl: "https://www.mfa.go.th/en/content/kick-off-thai-e-visa-en",
  },
  {
    slug: "tdac-mandatory-from-may-2025",
    title: "TDAC Became Mandatory from May 1, 2025",
    summary:
      "All non-Thai nationals entering Thailand by air, land, or sea must submit TDAC online within 3 days before arrival.",
    category: "Immigration",
    publishedAt: "2025-04-21",
    sourceLabel: "Royal Thai Embassy (KL)",
    sourceUrl: "https://kualalumpur.thaiembassy.org/en/publicservice/thailand-digital-arrival-card-tdac",
  },
  {
    slug: "international-passenger-fee-rise-june-2026",
    title: "Thailand to Raise International Passenger Fee in June",
    summary:
      "Authorities plan to increase the international passenger service charge from June 20, 2026, which may affect total outbound travel costs.",
    category: "Travel",
    publishedAt: "2026-02-20",
    sourceLabel: "Bangkok Post",
    sourceUrl:
      "https://www.bangkokpost.com/thailand/general/3201739/thailand-to-raise-international-passenger-fee-in-june",
  },
];
