import type { ChecklistData } from "./types";

export const marriageStageTwoChecklist: ChecklistData = {
  title: "Marriage Visa: 90-Day Non-Immigrant O",
  subtitle: "Convert your current visa to a Non-Immigrant O based on marriage to a Thai national",
  sections: [
    {
      title: "Pre-check Eligibility",
      items: [
        { text: "You have at least 15 days remaining (some offices require 21 days)" },
        {
          text: "TM.30 address reporting is completed (receipt required)",
          noteLink: "Example",
          noteUrl: "/examples/TM.30-example.png",
        },
      ],
    },
    {
      title: "Personal Documents",
      items: [
        { text: "Passport (valid at least 6 months with 2+ blank pages)" },
        { text: "Passport photo, taken within 6 months (4×6 cm)" },
        { text: "Photocopy: Photo Page, Visa Stamp & Latest Entry Stamp" },
      ],
    },
    {
      title: "Relationship & Accommodation",
      items: [
        { text: "Your spouse in person" },
        { text: "Thai spouse National ID + copy" },
        { text: "Copy of spouse Blue Book (Tabien Baan)" },
        { text: "Rental Contract, Copy of Landlord's ID & House Book (if renting)" },
        { text: "Thai Marriage Certificate Kor Ror 3 - original + copy" },
        { text: "Kor Ror 2 (updated same year) - original + copy" },
        { text: "4 family photos (2 inside home + 2 outside home) on one page" },
        {
          text: "Hand-drawn map with major roads nearby",
          noteLink: "Example",
          noteUrl: "/examples/hand-drawn-map-example.jpg",
        },
        { text: "Child's birth certificate (if applicable)" },
        { text: "Spouse name change document (if applicable)" },
        { text: "Signed letter from spouse confirming ongoing marriage" },
      ],
    },
    {
      title: "Proof of Income / Funds",
      items: [
        { text: "Bank book (original)" },
        { text: "Bank book updated on the day + copy" },
        { text: "Copy of bank book personal information page" },
        { text: "Bank statement covering last 2 months (issued within 7 days of appointment)" },
        { text: "Bank letter confirming account details and balance (issued within 7 days of appointment)" },
        { text: "400,000 THB in bank (at least 2 months prior) OR 40,000 THB monthly salary with supporting documents" },
      ],
    },
    {
      title: "Payment",
      items: [{ text: "2,000 THB" }],
    },
  ],
  tips: [
    "Download all forms and prepare in advance",
    "Normally only 1 Passport photo is required, however, sometimes 2 is requested",
    "Prepare two copies of your documents (not always required, but recommended)",
    "Sign the bottom corner of every copy",
  ],
};
