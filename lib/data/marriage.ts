export interface ChecklistItem {
  text: string;
  required: boolean;
  noteLink?: string;
  noteUrl?: string;
}

export interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

export interface VisaChecklist {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: ChecklistSection[];
  tips: string[];
}

export const marriageChecklist: VisaChecklist = {
  title: 'Non-Immigrant Type "O" (Marriage Visa)',
  subtitle: "For foreigners married to Thai nationals",
  lastUpdated: "11 Feb 2026",

  sections: [
    {
      title: "Personal Documents",
      items: [
        { text: "Passport (Original)", required: true },
        { text: "1x Passport Photo (4x6 cm)", required: true },
        { text: "TM.30 Receipt", required: true },
        { text: "90 Day Report Receipt", required: false },
        {
          text: "Copy of Passport Photo Page, Visa & Entry Stamp",
          required: true,
        },
      ],
    },

    {
      title: "Relationship & Accommodation",
      items: [
        { text: "Your spouse in person", required: true },
        { text: "Copy of spouse's National ID", required: true },
        { text: "Copy of spouse's Blue Book (Tabian Baan)", required: true },
        {
          text: "Thai Marriage Certificate Kor Ror 3 (original + copy)",
          required: true,
        },
        {
          text: "Kor Ror 2 (updated same year) (original + copy)",
          required: true,
        },
        {
          text: "4 Family photos (2 inside home + 2 outside home)",
          required: true,
        },
        { text: "Hand-drawn map (major roads nearby)", required: true },
        { text: "House/Condo contract", required: true },
        { text: "Children's birth certificate (if applicable)", required: false },
        { text: "Spouse name change document (if applicable)", required: false },
        {
          text: "Signed letter from spouse confirming ongoing marriage",
          required: true,
        },
      ],
    },

    {
      title: "Proof of Income / Funds",
      items: [
        { text: "Bank book (original)", required: true },
        { text: "Bank book updated on the day + copy", required: true },
        {
          text: "Copy of bank book personal information page",
          required: true,
        },
        {
          text: "Bank statement covering last 6 months (issued within 7 days of appointment)",
          required: true,
        },
        {
          text: "Official bank letter confirming account holder details (Same day recommended)",
          required: true,
        },
        {
          text:
            "400,000 THB in bank (at least 3 months prior) OR 40,000 THB monthly salary (certified)",
          required: true,
        },
      ],
    },

    {
      title: "Payment",
      items: [{ text: "1,900 THB", required: true }],
    },
  ],

  tips: [
    "Download TM.7 and STM forms and prepare in advance",
    "Prepare two copies of your documents (not always required, but recommended).",
    "Sign the bottom of all copies.",
  ],
};
