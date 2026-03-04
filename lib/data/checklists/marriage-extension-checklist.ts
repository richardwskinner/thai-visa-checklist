import type { ChecklistData } from "./types";

export const marriageChecklist: ChecklistData = {
  title: 'Non-Immigrant O (Extension)',
  subtitle: "1 Year extension of stay based on Marriage to a Thai National",
  lastUpdated: "11 Feb 2026",
  sections: [
    {
      title: "Personal Documents",
      items: [
        { text: "Passport (valid at least 12 months with 2+ blank pages)", required: true },
        { text: "Passport photo, taken within 6 months (4×6 cm)", required: true },
        {
          text: "TM.30 Receipt",
          required: true,
          noteLink: "Example",
          noteUrl: "/examples/TM.30-example.png",
        },
        {
          text: "90 Day Report Receipt",
          required: false,
          noteLink: "Example receipt",
          noteUrl: "/examples/90-day-report-example.pdf",
        },
        {
          text: "Photocopy: Photo Page, Visa Stamp & Latest Entry Stamp",
          required: true,
        },
      ],
    },
    {
      title: "Relationship & Accommodation",
      items: [
        { text: "Your spouse must attend in person", required: true },
        { text: "Thai spouse National ID + copy", required: true },
        { text: "Copy of Thai spouse Blue Book/Tabien Baan", required: true },
        { text: "Renting a house or condo - Rental Contract, Copy of Landlord's ID & Blue Book", required: true },
        {
          text: "Thai Marriage Certificate Kor Ror 3: Original + copy",
          required: true,
        },
        {
          text: "Kor Ror 2 (updated): Original + copy",
          required: true,
        },
        {
          text: "4 Family photos (2 inside home + 2 outside home showing number) on one page",
          required: true,
        },
        {
          text: "Hand-drawn map with major roads nearby",
          required: true,
          noteLink: "view example",
          noteUrl: "/examples/hand-drawn-map-example.jpg",
        },
        { text: "Child's birth certificate (if applicable)", required: false },
        { text: "Spouse name change document (if applicable)", required: false },

      ],
    },
    {
      title: "Proof of Funds",
      items: [
        {
          text: "400,000 THB Bank Deposit (2 months before first extension, 3 months before renewals)",
          required: true,
          financialMethods: ["bank"],
        },
        {
          text: "40,000 THB Monthly Thai Income (12 months)",
          required: true,
          financialMethods: ["thai-income"],
        },
        {
          text: "40,000 THB Monthly Foreign Income (certified by your embassy)",
          required: true,
          financialMethods: ["foreign-income"],
        },
      ],
    },
    {
      title: "Financial Documents",
      items: [
        {
          text: "Bank book updated on the day of application with copy",
          required: true,
          financialMethods: ["bank"],
        },
        {
          text: "Copy of bank book personal information page",
          required: true,
          financialMethods: ["bank"],
        },
        {
          text: "Bank statement (2 months for first extension, 3 months for renewals)",
          required: true,
          financialMethods: ["bank"],
        },
        {
          text: "Bank letter confirming account details and balance (issued within 7 days of appointment)",
          required: true,
          financialMethods: ["bank"],
        },
        {
          text: "Bank book updated on the day of application with copy",
          required: true,
          financialMethods: ["thai-income"],
        },
        {
          text: "Copy of bank book personal information page",
          required: true,
          financialMethods: ["thai-income"],
        },
        {
          text: "Bank statement showing income deposits (last 12 months)",
          required: true,
          financialMethods: ["thai-income"],
        },
        {
          text: "Bank letter confirming account details (issued within 7 days of appointment)",
          required: true,
          financialMethods: ["thai-income"],
        },
        {
          text: "Tax slip (PND 1 / PND 91) and valid work permit with copy",
          required: true,
          financialMethods: ["thai-income"],
        },
        {
          text: "Embassy income certification letter",
          required: true,
          financialMethods: ["foreign-income"],
        },
        {
          text: "Bank book updated on the day of application with copy",
          required: true,
          financialMethods: ["foreign-income"],
        },
        {
          text: "Copy of bank book personal information page",
          required: true,
          financialMethods: ["foreign-income"],
        },
        {
          text: "Bank statement showing income deposits (last 12 months)",
          required: true,
          financialMethods: ["foreign-income"],
        },
        {
          text: "Bank letter confirming account details (issued within 7 days of appointment)",
          required: true,
          financialMethods: ["foreign-income"],
        },
      ],
    },
    {
      title: "Payment",
      items: [{ text: "1,900 THB Cash", required: true }],
    },
  ],
  tips: [
    "Download all forms and prepare in advance",
    "Always verify with the immigration office you are attending what documents are required",
    "1 set of documents is generally enough, however, some offices request 2 sets",
  ],
};
