export interface VisaInfo {
  slug: string;
  emoji: string;
  title: string;
  subtitle: string;
  bg: string;
  href: string;
  disabled?: boolean;
}

export const VISAS: VisaInfo[] = [
  {
    slug: "marriage",
    emoji: "💑",
    title: "Marriage Visa",
    subtitle: 'Non-Immigrant Type "O" (Marriage to a Thai National)',
    bg: "bg-pink-600",
    href: "/visa/marriage",
  },
  {
    slug: "retirement",
    emoji: "🏖️",
    title: "Retirement Visa",
    subtitle: 'Non-Immigrant Type "O" / "O-A" (50+ years)',
    bg: "bg-blue-600",
    href: "/visa/retirement",
    disabled: true,
  },
  {
    slug: "business",
    emoji: "💼",
    title: "Business/Work Visa",
    subtitle: 'Non-Immigrant Type "B"',
    bg: "bg-indigo-600",
    href: "/visa/business",
    disabled: true,
  },
  {
    slug: "education",
    emoji: "📚",
    title: "Education Visa",
    subtitle: "Non-Immigrant ED",
    bg: "bg-green-600",
    href: "/visa/education",
    disabled: true,
  },
];
