import type { ChecklistData } from "./types";

export const retirementChecklist: ChecklistData = {
  id: "retirement-extension",
  title: 'Non-Immigrant O (Extension)',
  subtitle: "1 Year extension of stay based on retirement purposes",
  lastUpdated: "13 Feb 2026",
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
        { text: "Photocopy: Photo Page, Visa Stamp & Latest Entry Stamp", required: true },
      ],
    },
    {
      title: "Proof of Funds (Select one)",
      items: [
        {
          text: "800,000 THB in a Thai bank account (2 months before first extension, 3 months before renewals)",
          required: true,
          financialMethods: ["bank"],
        },
        {
          text: "65,000 THB Monthly Income/Pension (certified by your embassy)",
          required: true,
          financialMethods: ["monthly-income"],
        },
        {
          text: "Combination of bank deposit & monhtly income/pension totaling at least 800,000 THB per year",
          required: true,
          financialMethods: ["combination"],
        },
      ],
    },
    {
      title: "Financial Documents",
      items: [
        { text: "Bank book (original)", required: true, financialMethods: ["bank", "combination"] },
        {
          text: "Bank book updated on the day of application + copy",
          required: true,
          financialMethods: ["bank", "combination"],
        },
        {
          text: "Copy of bank book personal information page",
          required: true,
          financialMethods: ["bank", "combination"],
        },
        {
          text: "Official bank letter confirming account and balance (within 7 days of appointment)",
          required: true,
          financialMethods: ["bank", "combination"],
        },
        {
          text: "Bank statement (2 months for first extension, 3 months for renewals)",
          required: true,
          financialMethods: ["bank", "combination"],
        },
        {
          text: "The funds must remain for 3 months after approval (then never drop below 400,000 THB)",
          required: true,
          financialMethods: ["bank"],
        },
        {
          text: "Embassy income/pension letter (if using income method)",
          required: true,
          financialMethods: ["monthly-income", "combination"],
        },
        {
          text: "Bank book (original)",
          required: true,
          financialMethods: ["monthly-income"],
        },
        {
          text: "Bank book updated on the day of application + copy",
          required: true,
          financialMethods: ["monthly-income"],
        },
        {
          text: "Copy of bank book personal information page",
          required: true,
          financialMethods: ["monthly-income"],
        },
        {
          text: "Official bank letter confirming account and balance (within 7 days of appointment)",
          required: true,
          financialMethods: ["monthly-income"],
        },
      ],
    },
    {
      title: "Accommodation",
      items: [
        {
          text: "Renting: Rental Contract, Copy of Landlord's ID (passport if foreigner) and copy of Blue Book.",
          required: false,
        },
        {
          text: "Owner: Copy of Title deed/Chanote, copy of yellow book, copy of DBD if purchase was made via a company",
          required: false,
        },
        {
          text: "Hand-drawn map to your residence",
          required: false,
          noteLink: "View example map",
          noteUrl: "/examples/hand-drawn-map-example.jpg",
        },
      ],
    },
    {
      title: "Payment",
      items: [{ text: "1,900 THB Cash", required: true }],
    },
  ],
  tips: [
    "Apply 30–45 days before your current extension expires, don't wait until the last day",
    "Prepare 2 copies of all documents and sign the bottom of every corner",
    "Always verify with the immigration office you are attending what documents are required",
    "If using the 800,000 THB deposit method, the funds must remain for 3 months after approval (then never drop below 400,000 THB)",
    "Health insurance is mandatory for O-A visa holders but not required for Non-O retirement extensions",
    "Some offices may also ask for a personal information form / CV",
  ],
};
