import type { ChecklistData } from "./types";

export const marriageStageOneChecklist: ChecklistData = {
  title: "Marriage Visa: 90-Day Non-Immigrant O",
  subtitle: "Non-Immigrant O: To stay with Thai family residing in Thailand (More than 60 days)",
  sections: [
    {
      title: "1) Key Rules Before Applying",
      items: [
        { text: "Apply outside of Thailand (home country or a neighboring country like Laos or Vietnam)" },
        { text: "Have proof that you're physically in that country, such as an entry stamp or visa" },
        { text: "Passport (valid at least 6 months with 2+ blank pages)" },
      ],
    },
    {
      title: "2) Required Documents (upload to eVisa)",
      items: [
        { text: "Passport bio page" },
        { text: "Passport photo, taken within 6 months (4×6 cm)" },
        { text: "Offical document confirming current location" },
        { text: "One of the following: Bank balance 400,000 THB OR Monthly income 40,000 THB+" },
        { text: "Bank statement covering the last 3 months" },
        { text: "Marriage certificate (Kor Ror 2 and Kor Ror 3 if married in Thailand)" },
        { text: "Thai spouse ID card" },
        { text: "Thai spouse house registration (Tabien Baan)" },
        { text: "Invitation/supporting letter from your spouse (sponsor letter)" },
      ],
    },
    {
      title: "3) Travel Information Required in Application",
      items: [
        { text: "Intended date of entry" },
        { text: "Port of arrival (Air/Land/Sea)" },
        { text: "Flight number or transport details" },
        { text: "Accommodation address in Thailand" },
      ],
    },
    {
      title: "4) After Submission",
      items: [
        { text: "Pay the visa fee: some offices accept online payment, others require in person" },
        { text: "Processing is typically 3-5 working days (varies by location)" },
        { text: "Remain in that country until you recieve feedback and approval" },
        { text: "Once approved you will receive an email/visa approval document" },
      ],
    },
    {
      title: "5) After Approval",
      items: [
        { text: "Print and save your visa approval document" },
        { text: "Ensure TM.30 is filed within 24 hours of arrival (by property owner / hotel)" },
        { text: "Apply for a 1-year extension of stay during the last 30 days of your visa, if staying long term" },
        { text: "Apply for a Re-Entry Permit before leaving Thailand, if you plan to travel" },
      ],
    },
  ],
  tips: [
    "Do not apply more than 3 months before intended arrival.",
    "Embassy requirements can vary slightly by location, they may email requesting additional information.",
    "If you struggle scanning and uploading your documents, request help from a friend.",
    "It's important that your information, images and documents are uploaded correctly and clearly.",
  ],
};
