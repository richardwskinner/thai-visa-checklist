export type EntryMethod = "air" | "land" | "sea";

export type BilateralOrdinaryRule = {
  days: number;
  note?: string;
};

export const VISA_ELIGIBILITY_SOURCES = {
  klEmbassyVisaHub: "https://kualalumpur.thaiembassy.org/en/publicservice/visa-exemption-and-voa",
  voaListPdf: "https://image.mfa.go.th/mfa/0/zE6021nSnu/0303/VOA.pdf",
  p60ListPdf:
    "https://image.mfa.go.th/mfa/0/zE6021nSnu/0303/%E0%B8%9C.60.pdf",
  bilateralOrdinaryPdf:
    "https://image.mfa.go.th/mfa/0/zE6021nSnu/%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%8A%E0%B8%B2%E0%B8%8A%E0%B8%99/Bilat_Ordinary.pdf",
  bilateralDiplomaticPdf:
    "https://image.mfa.go.th/mfa/0/zE6021nSnu/%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%8A%E0%B8%B2%E0%B8%8A%E0%B8%99/Bilat_Diplomatic.pdf",
  eVisa: "https://www.thaievisa.go.th/",
  tdac: "https://tdac.immigration.go.th/arrival-card/",
} as const;

// Source basis:
// - P.60 (Department of Consular Affairs, 15 Jul 2024): visa exemption up to 60 days for ordinary passports
// - VOA list (Department of Consular Affairs, 15 Jul 2024): VOA up to 15 days
// - Bilateral ordinary passport list (Department of Consular Affairs, 12 Dec 2025): special exemptions by agreement
export const DATASET_LAST_CHECKED = "2026-02-24";

const P60_VISA_EXEMPT_60 = [
  "Albania",
  "Andorra",
  "Australia",
  "Austria",
  "Bahrain",
  "Belgium",
  "Bhutan",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Cambodia",
  "Canada",
  "China",
  "Colombia",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Denmark",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Estonia",
  "Fiji",
  "Finland",
  "France",
  "Georgia",
  "Germany",
  "Greece",
  "Guatemala",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Korea (ROK)",
  "Kosovo",
  "Kuwait",
  "Laos",
  "Latvia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Malaysia",
  "Maldives",
  "Malta",
  "Mauritius",
  "Mexico",
  "Monaco",
  "Mongolia",
  "Morocco",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Oman",
  "Panama",
  "Papua New Guinea",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "San Marino",
  "Saudi Arabia",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sri Lanka",
  "South Africa",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Tonga",
  "Trinidad and Tobago",
  "Türkiye",
  "Ukraine",
  "UAE",
  "United Kingdom",
  "USA",
  "Uruguay",
  "Uzbekistan",
  "Vietnam",
] as const;

const VOA_15 = [
  "Armenia",
  "Belarus",
  "Bhutan",
  "Bolivia",
  "Bulgaria",
  "China",
  "Costa Rica",
  "Cyprus",
  "El Salvador",
  "Ethiopia",
  "Fiji",
  "Georgia",
  "India",
  "Kazakhstan",
  "Kyrgyzstan",
  "Malta",
  "Mexico",
  "Namibia",
  "Nauru",
  "Papua New Guinea",
  "Paraguay",
  "Romania",
  "Russia",
  "Saudi Arabia",
  "Serbia",
  "Seychelles",
  "Taiwan",
  "Uzbekistan",
  "Tunisia",
  "Vanuatu",
  "Venezuela",
] as const;

export const bilateralOrdinaryRules: Record<string, BilateralOrdinaryRule> = {
  Cambodia: { days: 14 },
  "Myanmar": { days: 14, note: "International airports only" },
  Kazakhstan: { days: 14 },
  Laos: { days: 14 },
  Macao: { days: 14 },
  Mongolia: { days: 14 },
  Russia: { days: 14 },
  "Timor-Leste": { days: 14 },
  Vietnam: { days: 14 },

  China: { days: 30 },
  "Hong Kong": { days: 30 },
  "Korea (ROK)": { days: 30 },

  Argentina: { days: 90 },
  Brazil: { days: 90 },
  Chile: { days: 90 },
  Peru: { days: 90 },
};

const normalizeMap: Record<string, string> = {
  "South Korea": "Korea (ROK)",
  "Korea, Republic of": "Korea (ROK)",
  "Republic of Korea": "Korea (ROK)",
  "U.S.A.": "USA",
  "United States": "USA",
  "United States of America": "USA",
  UK: "United Kingdom",
  "Great Britain": "United Kingdom",
  "Macau": "Macao",
  "Turkey": "Türkiye",
  "U.A.E.": "UAE",
  "United Arab Emirates": "UAE",
  Kyrgyzstan: "Kyrgyzstan",
};

export const visaExempt60Countries = new Set<string>(P60_VISA_EXEMPT_60);
export const visaOnArrival15Countries = new Set<string>(VOA_15);

export const nationalityOptions = [
  ...new Set([
    ...P60_VISA_EXEMPT_60,
    ...VOA_15,
    ...Object.keys(bilateralOrdinaryRules),
  ]),
].sort((a, b) => a.localeCompare(b));

export function normalizeNationality(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return "";
  return normalizeMap[trimmed] ?? trimmed;
}

export type VisaEligibilityResult =
  | {
      kind: "visa_exempt";
      days: number;
      title: string;
      detail: string;
      notes: string[];
      extensionHint?: {
        likelyEligibleFromVisaExempt: true;
        currentAllowanceDays: number;
        commonExtensionDays?: number;
      };
      longStayVisaHint?: {
        reason: "longer_than_visa_exempt_plus_extension";
        totalDaysWithCommonExtension: number;
      };
    }
  | {
      kind: "voa";
      days: number;
      title: string;
      detail: string;
      notes: string[];
      extensionHint?: {
        likelyEligibleFromVisaExempt: true;
        currentAllowanceDays: number;
        commonExtensionDays?: number;
      };
      longStayVisaHint?: {
        reason: "longer_than_visa_exempt_plus_extension";
        totalDaysWithCommonExtension: number;
      };
    }
  | {
      kind: "visa_required";
      title: string;
      detail: string;
      notes: string[];
      extensionHint?: {
        likelyEligibleFromVisaExempt: true;
        currentAllowanceDays: number;
        commonExtensionDays?: number;
      };
      longStayVisaHint?: {
        reason: "longer_than_visa_exempt_plus_extension";
        totalDaysWithCommonExtension: number;
      };
    };

export function evaluateThailandVisaNeed(params: {
  nationality: string;
  entryMethod: EntryMethod;
  plannedStayDays: number;
}): VisaEligibilityResult {
  const nationality = normalizeNationality(params.nationality);
  const notes: string[] = [];

  if (!Number.isFinite(params.plannedStayDays) || params.plannedStayDays < 1) {
    return {
      kind: "visa_required",
      title: "Enter valid travel dates",
      detail: "Planned stay length must be at least 1 day (inclusive of entry and departure dates).",
      notes,
    };
  }

  if (!nationality) {
    return {
      kind: "visa_required",
      title: "Need a visa before travel",
      detail:
        "Your nationality is not in this checker’s local official-source list, so you should verify on the official Thai e-Visa / embassy pages before travel.",
      notes,
    };
  }

  let bestVisaExemptDays = visaExempt60Countries.has(nationality) ? 60 : 0;
  const bilateral = bilateralOrdinaryRules[nationality];
  if (bilateral) {
    bestVisaExemptDays = Math.max(bestVisaExemptDays, bilateral.days);
    if (bilateral.note) notes.push(`${nationality}: ${bilateral.note}`);
  }

  if (nationality === "Myanmar" && params.entryMethod !== "air") {
    return {
      kind: "visa_required",
      title: "Likely need a visa before travel",
      detail:
        "Myanmar ordinary passport bilateral exemption shown in the official list is noted for international airports only.",
      notes: ["For land/sea entry, verify current eligibility with the Thai embassy and official MFA lists."],
    };
  }

  if (bestVisaExemptDays > 0) {
    const commonExtensionDays = 30;
    const totalDaysWithCommonExtension = bestVisaExemptDays + commonExtensionDays;

    if (params.plannedStayDays <= bestVisaExemptDays) {
      return {
        kind: "visa_exempt",
        days: bestVisaExemptDays,
        title: `You can travel visa-free for up to ${bestVisaExemptDays} days`,
        detail: "",
        notes,
      };
    }

    const needsLongStayVisa = params.plannedStayDays > totalDaysWithCommonExtension;

    return {
      kind: "visa_required",
      title: needsLongStayVisa
        ? "Your stay is longer than the visa-free limit"
        : "Your visa-exempt does not cover the full stay",
      detail: needsLongStayVisa
        ? `Your planned stay exceeds the visa-exempt period plus a common 30-day extension (${totalDaysWithCommonExtension} days total).`
        : `Your planned stay (${params.plannedStayDays} days) is longer than the visa-exempt stay (${bestVisaExemptDays} days).`,
      notes,
      extensionHint: {
        likelyEligibleFromVisaExempt: true,
        currentAllowanceDays: bestVisaExemptDays,
        commonExtensionDays,
      },
      longStayVisaHint:
        needsLongStayVisa
          ? {
              reason: "longer_than_visa_exempt_plus_extension",
              totalDaysWithCommonExtension,
            }
          : undefined,
    };
  }

  if (visaOnArrival15Countries.has(nationality)) {
    if (params.plannedStayDays <= 15) {
      return {
        kind: "voa",
        days: 15,
        title: "You can use Visa on Arrival (VOA) for 15 days",
        detail: "Check approved entry checkpoints and current VOA conditions before travel.",
        notes,
      };
    }
    return {
      kind: "visa_required",
      title: "Need a visa before travel",
      detail:
        "Your planned stay is longer than the typical 15-day Visa on Arrival stay period. You will likely need a long-stay visa before travel.",
      notes,
    };
  }

  return {
    kind: "visa_required",
    title: "Need a visa before travel",
    detail:
      "Your nationality does not appear in the current ordinary-passport visa exemption or VOA lists used by this checker.",
    notes,
  };
}
