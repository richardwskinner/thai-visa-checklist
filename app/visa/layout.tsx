import { createSectionMetadata } from "@/lib/seo";

export const metadata = createSectionMetadata({
  title: "Thailand Visa Checklists",
  description:
    "Printable Thailand visa document checklists, stage guides, and immigration form help for common visa routes including marriage and retirement.",
});

export default function MarriageVisaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
