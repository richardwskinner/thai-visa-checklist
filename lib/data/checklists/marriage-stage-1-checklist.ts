import type { ChecklistData } from "./types";

export const marriageStageOneChecklist: ChecklistData = {
  title: "Marriage Visa - Stage 1",
  subtitle: "Apply for Non-O Visa - To stay with Thai family residing in Thailand (More than 60 days)",
  sections: [
    {
      title: "1) Key Rules Before Applying",
      items: [
        { text: "Apply outside of Thailand (home country or a neighboring country like Laos or Vietnam)" },
        { text: "Have proof that you're physically in that country, such as an entry stamp or visa" },
        { text: "Passport validity: 6+ months (single entry)" },
      ],
    },
    {
      title: "2) Required Documents (upload to eVisa)",
      items: [
        { text: "Passport bio page" },
        { text: "2x passport photos, taken within 6-months (4×6 cm)" },
        { text: "Document indicating current location (utility bill or entry stamp/visa)" },
        { text: "One of the following: monthly income 40,000 THB+ OR bank balance 400,000 THB+" },
        { text: "Bank statement covering the last 3 months (bank statement covering the last 3 months)" },
        { text: "Marriage certificate (Kor Ror 2 and Kor Ror 3 if married in Thailand)" },
        { text: "Thai spouse ID card" },
        { text: "Thai spouse house registration (tabien Baan)" },
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
        { text: "You will receive a QR code via the eVisa System" },
        { text: "Pay the visa fee - some accept online payment, others require in-person payment" },
        { text: "Processing is typically 3-5 working days" },
        { text: "Remain in that country until approved" },
      ],
    },
    {
      title: "5) After Approval",
      items: [
        { text: "Print/save your visa approval document" },
        { text: "Carry full document set when entering Thailand" },
        { text: "TM30 must be filed after arrival" },
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
