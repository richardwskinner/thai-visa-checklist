import type { ChecklistData } from "./types";

export const marriageChecklist: ChecklistData = {
  title: 'Non-Immigrant O (Extension)',
  subtitle: "1 Year extension of stay based on Marriage to Thai National",
  lastUpdated: "11 Feb 2026",
  sections: [
    {
      title: "Personal Documents",
      items: [
        { text: "Passport (valid at least 6 months with 2+ blank pages)", required: true },
        { text: "1x passport photos, taken within 6-months (4×6 cm)", required: true },
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
        { text: "Copy of Thai spouse Blue Book (Tabien Baan)", required: true },
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
        {
          text: "Signed letter from spouse confirming ongoing marriage",
          required: true,
        },
      ],
    },
    {
      title: "Proof of Funds (choose one option)",
      items: [
        {
          text: "Option A: 400,000 THB in a Thai bank account (2 months before first extension, 3 months before renewals)",
          required: true,
        },
        {
          text: "Option B: Monthly income of at least 40,000 THB (supported by appropriate documents)",
          required: true,
        },
        {
          text: "Option C: Combination of bank deposit + annual income totaling at least 400,000 THB (if accepted by your immigration office)",
          required: false,
        },
      ],
    },
    {
      title: "Financial Documents",
      items: [
        { text: "Bank book (original)", required: true },
        { text: "Bank book updated on the day of application + copy", required: true },
        { text: "Copy of bank book personal information page", required: true },
        { text: "Official bank letter confirming account and balance (within 7 days of appointment)", required: true },
        { text: "Bank statement for the past 3 months (renewals) or 2 months (first extension)", required: true },
        { text: "Income evidence letter or supporting income documents (if using income method)", required: false },
      ],
    },
    {
      title: "Payment",
      items: [{ text: "1,900 THB Cash", required: true }],
    },
  ],
  tips: [
    "Download all forms and prepare in advance",
    "Always verify with the immigration office you are attending what docuemnts are needed",
    "1 set of documents is generally enough, however, some offices request 2 sets",
  ],
};
