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
  id: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: ChecklistSection[];
  tips: string[];
}

export const retirementChecklist: VisaChecklist = {
  id: "retirement-extension",
  title: 'Non-Immigrant "O" (Retirement Visa)',
  subtitle: "Annual extension of stay based on retirement purposes",
  lastUpdated: "13 Feb 2026",
  sections: [
    {
      title: "Personal Documents",
      items: [
        { text: "Passport (Must be valid for at least 18 months)", required: true },
        { text: "2x Passport Photo, taken within 6 months (4×6 cm)", required: true },
        { text: "Passport Photocopies: Photo Page, Previous Visa Stamp & Latest Entry Stamp", required: true },
        { text: "TM.30 Receipt", required: true },
        { text: "90-Day Report Receipt", required: false },
      ],
    },
    {
      title: "Proof of Funds (choose one option)",
      items: [
        {
          text: "Option A: 800,000 THB in a Thai bank account (2 months before first extension, 3 months before renewals)\nOption B: Monthly income/pension of at least 65,000 THB (certified by your embassy)\nOption C: Combination of bank deposit + annual income totaling at least 800,000 THB",
          required: true,
        },
      ],
    },
    {
      title: "Financial Documents",
      items: [
        { text: "Bank book (original)", required: true },
        { text: "Bank book updated on the day of application + copy", required: true },
        { text: "Copy of bank book personal information page", required: true },
        { text: "Official bank letter confirming account and balance (Same day recommended)", required: true },
        { text: "Bank statement for the past 3 months (renewals) or 2 months (first extension)", required: true },
        { text: "Embassy income/pension letter (if using income method)", required: false },
      ],
    },
    {
      title: "Accommodation",
      items: [
        { text: "Copy of lease/rental agreement", required: false },
        { text: "Copy of landlord's ID card (if Thai) or passport (if foreigner)", required: false },
        { text: "Copy of house book (Tabian Baan) for the property", required: false },
        { text: "Hand-drawn map to your residence (some offices require this)", required: false },
        { text: "Photos of your residence (some offices require this)", required: false },
      ],
    },
    {
      title: "Health Insurance (required for O-A visa holders only)",
      items: [
        { text: "Health insurance policy covering the full stay period", required: false },
        { text: "Minimum 40,000 THB outpatient coverage", required: false },
        { text: "Minimum 400,000 THB inpatient coverage", required: false },
      ],
    },
    {
      title: "Payment",
      items: [
        { text: "1,900 THB", required: true },
      ],
    },
  ],
  tips: [
    "Apply 30–45 days before your current extension expires - don't wait until the last day",
    "Prepare 2 copies of all documents and sign the bottom of every corner",
    "If using the 800,000 THB deposit method, the funds must remain for 3 months after approval (then never drop below 400,000 THB)",
    "Health insurance is mandatory for O-A visa holders but not required for Non-O retirement extensions",
    "Some offices may also ask for a personal information form / CV",
  ],
};
