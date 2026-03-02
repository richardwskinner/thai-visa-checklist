import type { ChecklistData } from "./types";

export const retirementStageOneChecklist: ChecklistData = {
  title: "Apply outside Thailand (Recommended)",
  subtitle: "Non-Immigrant O: Retirement for foreigners aged 50 years or older",
  sections: [
    {
      title: "1) Key Rules Before Applying",
      items: [
        { text: "Apply outside of Thailand (home country or a neighboring country like Laos or Vietnam)" },
        { text: "Have proof that you're physically in that country, such as an entry stamp or visa" },
        { text: "Be at least 50 years old at the time of application" },
        { text: "Passport valid at least 6 months (12 months recommended)" },
        { text: "You must not intend to work in Thailand" },
      ],
    },
    {
      title: "2) Required Documents (upload to eVisa)",
      items: [
        { text: "Passport bio page" },
        { text: "Passport photo, taken within 6-months (4×6 cm)" },
        { text: "Document indicating current location (entry stamp, visa, or proof of residence)" },
        { text: "One of the following: monthly income 65,000 THB+, or bank balance 800,000 THB+, or a combination" },
        { text: "Bank statements covering the last 3 months" },
        { text: "Proof of accommodation in Thailand (hotel booking or address details)" },
        { text: "Travel itinerary showing entry to and departure from Thailand" },
        { text: "Some embassies may request additional documents such as police clearance or a medical certificate" },
      ],
    },
    {
      title: "3) Travel Information Required in Application",
      items: [
        { text: "Intended date of entry" },
        { text: "Port of arrival (Air / Land / Sea)" },
        { text: "Flight number or transport details" },
        { text: "Accommodation address in Thailand" },
      ],
    },
    {
      title: "4) After Submission",
      items: [
        { text: "You will receive a QR code or visa approval document via the eVisa system" },
        { text: "Pay the visa fee: some offices accept online payment, others require in person" },
        { text: "Processing is typically 3-5 working days (varies by location)" },
        { text: "Remain in the country where you applied until approval is issued" },
      ],
    },
    {
      title: "5) After Approval",
      items: [
        { text: "Print and save your visa approval document" },
        { text: "Carry a full copy of your uploaded documents when travelling" },
        { text: "On arrival, check your entry stamp carefully to confirm your 90-day permitted stay" },
        { text: "TM.30 must be filed at your address within 24 hours of arrival (by your accommodation provider)" },
      ],
    },
  ],
  tips: [
    "Embassy and consulate requirements can vary by location and can change without notice",
    "Always verify current requirements on the official Thai e-Visa portal and mission website before submitting",
    "Keep both digital and printed copies of all submissions and approval documents",
  ],
};
