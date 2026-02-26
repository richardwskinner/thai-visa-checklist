import type { ChecklistData } from "./types";

export const retirementStageOneChecklist: ChecklistData = {
  title: "Retirement Visa Stage 1",
  subtitle: "Enter Thailand with the right status for retirement route",
  sections: [
    {
      title: "Eligibility & Entry Plan",
      items: [
        { text: "You are at least 50 years old by the time you apply for retirement extension" },
        { text: "Passport valid for at least 12 months (recommended for smooth extension process)" },
        { text: "Choose your entry route: Visa Exemption, Tourist Visa, or Non-Immigrant O from abroad" },
      ],
    },
    {
      title: "Before Travel",
      items: [
        { text: "Book accommodation and keep address details ready for TM.30 filing" },
        { text: "Prepare initial funds and transfer plan to your Thai bank account if using bank method" },
        { text: "Bring key personal records and pension/income evidence (if using income method later)" },
      ],
    },
    {
      title: "On Arrival",
      items: [
        { text: "Check entry stamp date and permitted stay period before leaving immigration counter" },
        { text: "Keep boarding pass and travel details in case immigration requests supporting timeline" },
        { text: "Ensure TM.30 is filed at your address within 24 hours" },
      ],
    },
    {
      title: "Prepare for Stage 2 / Stage 3",
      items: [
        { text: "Open a Thai bank account early if planning to use 800,000 THB deposit route" },
        { text: "Track your stay expiry date and start preparing conversion/extension docs in advance" },
        { text: "Keep copies of passport pages, entry stamp, and TM.30 receipt" },
      ],
    },
  ],
  tips: [
    "Immigration office practice varies, so confirm local requirements early.",
    "If your stay period is short, plan timing carefully so conversion is possible before expiry.",
    "Carry printed copies even if you also store digital versions.",
  ],
};
