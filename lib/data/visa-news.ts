export type VisaNewsCategory =
  | "Policy"
  | "Border"
  | "Reporting"
  | "Fees"
  | "Official"
  | "Life";

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
    category: "Policy",
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
    category: "Border",
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
    category: "Fees",
    publishedAt: "2025-11-28",
    sourceLabel: "Thai Immigration Bureau",
    sourceUrl: "https://www.immigration.go.th/?p=34124",
  },
  {
    slug: "official-portals-check-before-applying",
    title: "Thai e-Visa Rolled Out Globally from January 1, 2025",
    summary:
      "The Ministry of Foreign Affairs announced the global launch of the Thai e-Visa system across Royal Thai Embassies and Consulates, available via thaievisa.go.th from January 1, 2025.",
    category: "Official",
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
    category: "Reporting",
    publishedAt: "2025-04-21",
    sourceLabel: "Royal Thai Embassy (KL)",
    sourceUrl: "https://kualalumpur.thaiembassy.org/en/publicservice/thailand-digital-arrival-card-tdac",
  },
  {
    slug: "international-passenger-fee-rise-june-2026",
    title: "Thailand to Raise International Passenger Fee in June",
    summary:
      "Authorities plan to increase the international passenger service charge from June 20, 2026, which may affect total outbound travel costs.",
    category: "Fees",
    publishedAt: "2026-02-20",
    sourceLabel: "Bangkok Post",
    sourceUrl:
      "https://www.bangkokpost.com/thailand/general/3201739/thailand-to-raise-international-passenger-fee-in-june",
  },
  {
    slug: "dlt-online-licence-renewals-2026",
    title: "DLT Plans Online Driving Licence Renewals",
    summary:
      "Thailand's Land Transport Department says eligible motorists will be able to renew licences online under a phased rollout, with implementation tied to digital medical-certificate verification and related system checks.",
    category: "Life",
    publishedAt: "2026-02-17",
    sourceLabel: "Bangkok Post",
    sourceUrl:
      "https://www.bangkokpost.com/thailand/general/3198863/land-transport-department-to-allow-online-licence-renewals",
  },
  {
    slug: "aot-charge-justification-opinion-2026",
    title: "Bangkok Post Opinion Questions AOT Passenger Charge Increase",
    summary:
      "A Bangkok Post opinion piece argues Airports of Thailand should better justify the planned passenger service charge increase by clearly showing what travelers will receive in return and how the added revenue will be used.",
    category: "Fees",
    publishedAt: "2026-02-23",
    sourceLabel: "Bangkok Post",
    sourceUrl:
      "https://www.bangkokpost.com/opinion/opinion/3203025/airports-of-thailand-must-justify-charge",
  },
  {
    slug: "new-year-2026-five-day-holiday-tourism-boost",
    title: "Thailand Declares 5-Day New Year Holiday to Support Tourism",
    summary:
      "Thailand approved an extended five-day New Year break (Dec 31, 2025 to Jan 4, 2026), including a special holiday on Jan 2, to encourage domestic travel and consumer spending.",
    category: "Life",
    publishedAt: "2025-11-08",
    sourceLabel: "Bangkok Post",
    sourceUrl:
      "https://www.bangkokpost.com/thailand/general/3132730/thailand-declares-5day-new-year-holiday-to-boost-tourism-economy",
  },
];
