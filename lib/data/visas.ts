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
    subtitle: 'Non-Immigrant Type "O"',
    bg: "bg-gradient-to-br from-pink-500 to-rose-600",
    href: "/visa/marriage/stages",
  },
  {
    slug: "retirement",
    emoji: "🏖️",
    title: "Retirement Visa",
    subtitle: 'Non-Immigrant Type "O" 50+',
    bg: "bg-gradient-to-br from-sky-500 to-blue-600",
    href: "/visa/retirement/stages",
  },
  {
    slug: "business",
    emoji: "💼",
    title: "Business/Work Visa",
    subtitle: 'Non-Immigrant Type "B"',
    bg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    href: "/visa/business",
    disabled: true,
  },
  {
    slug: "education",
    emoji: "📚",
    title: "Education Visa",
    subtitle: "Non-Immigrant ED",
    bg: "bg-gradient-to-br from-emerald-500 to-green-600",
    href: "/visa/education",
    disabled: true,
  },
];
