import { createSectionMetadata } from "@/lib/seo";

export const metadata = createSectionMetadata({
  title: "Retirement Visa - 1 Year Extension Checklist",
  description:
    "Printable checklist for a 1-year Thailand retirement visa extension (Non-Immigrant O, age 50+), including forms, financial documents, and filing tips.",
});

export default function RetirementVisaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
