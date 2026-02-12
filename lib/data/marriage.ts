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
      title: "Application Forms",
      items: [
        {
          text: "TM.7",
          noteLink: "Download Form",
          noteUrl:
            "https://www.immigration.go.th/wp-content/uploads/2022/10/4.%E0%B8%84%E0%B8%B3%E0%B8%82%E0%B8%AD%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%8D%E0%B8%B2%E0%B8%95%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%AD%E0%B8%A2%E0%B8%B9%E0%B9%88%E0%B9%83%E0%B8%99%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%AD%E0%B8%B2%E0%B8%93%E0%B8%B2%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%A3%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%A7%E0%B8%84%E0%B8%A3%E0%B8%B2%E0%B8%A7%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B9%84%E0%B8%9B-%E0%B8%95%E0%B8%A1.7.pdf",
          required: true,
        },
        { text: "STM.2, 9, 10, 11", required: true },
      ],
    },
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
        { text: "Copy of spouse's passport (if available)", required: false },
        {
          text: "Copy of spouse's Blue Book (Tabian Baan)",
          required: true,
        },
        {
          text: "Thai Marriage Certificate Kor Ror 3 (original + copy)",
          required: true,
        },
        {
          text: "Kor Ror 2 (updated same year) (original + copy)",
          required: true,
        },
        {
          text: "Family photos (inside home + outside with house number)",
          required: true,
        },
        { text: "Hand-drawn map (major roads nearby)", required: true },
        { text: "House/Condo contract", required: true },
        {
          text: "Children's birth certificate (if applicable)",
          required: false,
        },
        {
          text: "Spouse name change document (if applicable)",
          required: false,
        },
        {
          text: "Letter from your spouse confirming marriage",
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
          text: "Bank statement up to 6 months (issued within 7 days)",
          required: true,
        },
        {
          text: "Bank letter confirming your bank account",
          required: true,
        },
        {
          text: "400,000 THB in bank (at least 3 months prior) OR 40,000 THB monthly salary (certified)",
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
    "Prepare 2 copies of your documents (it's not always required, but better to be prepared)",
    "Sign the bottom of all copies",
  ],
};
