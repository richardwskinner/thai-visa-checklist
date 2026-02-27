import type { ChecklistData } from "./types";

export const retirementStageTwoChecklist: ChecklistData = {
  title: "Convert Visa in Thailand to Non-O",
  subtitle: "Non-Immigrant O - Retirement for foreigners aged 50 years or older",
  sections: [
    {
      title: "Pre-check Eligibility",
      items: [
        { text: "You are at least 50 years old" },
        { text: "You hold a visa/status that can be converted at immigration" },
        { text: "You have enough permitted stay left before expiry to file conversion" },
      ],
    },
    {
      title: "Core Forms",
      items: [
        { text: "TM.86 or TM.87 (use the form appropriate to your current status)" },
        { text: "Passport photo (4x6 cm)" },
        { text: "STM.2 acknowledgement form" },
        { text: "STM.9 overstay acknowledgement form" },
        { text: "STM.11 penalties acknowledgement form" },
      ],
    },
    {
      title: "Personal Documents",
      items: [
        { text: "Passport original" },
        { text: "Copies of passport bio page, latest entry stamp, and visa/status page" },
        { text: "TM.6 copy if your passport includes departure card records" },
        {
          text: "TM.30 receipt for your current address",
          noteLink: "Example",
          noteUrl: "/examples/TM.30-example.png",
        },
      ],
    },
    {
      title: "Financial Documents",
      items: [
        { text: "Thai bank book (original + copy)" },
        { text: "Bank statement and bank letter (same-day issue preferred)" },
        { text: "Evidence of funds/income that meets retirement threshold for your office" },
      ],
    },
    {
      title: "Submission Day",
      items: [
        { text: "Bring signed copies of all required pages" },
        { text: "Prepare conversion fee in cash (typically 2,000 THB)" },
        { text: "Ask immigration for next steps and timeline toward annual extension (Stage 3)" },
      ],
    },
  ],
  tips: [
    "Local offices can add extra requirements such as hand-drawn map or residence photos.",
    "Use same-day bank documents whenever possible to avoid re-issuing requests.",
    "Keep a full copy set after conversion for your one-year extension filing.",
  ],
};
