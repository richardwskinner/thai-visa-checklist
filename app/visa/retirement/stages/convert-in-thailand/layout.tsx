import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Retirement Visa: Convert to Non-O in Thailand",
  description:
    "Retirement visa checklist for converting in Thailand to Non-Immigrant O with forms, personal documents, and financial evidence.",
  path: "/visa/retirement/stages/convert-in-thailand",
});

export default function RetirementStageTwoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
