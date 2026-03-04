import type { Metadata } from "next";
import { ShareInFrame } from "@/components/share-bar";

export const metadata: Metadata = {
  title: "Thailand Visa Checklists | Thai Visa Checklist",
  description:
    "Printable Thailand visa document checklists, stage guides, and immigration form help for common visa routes including marriage and retirement.",
};

export default function MarriageVisaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div id="visa-share-scope">{children}</div>
      <ShareInFrame scopeId="visa-share-scope" />
    </>
  );
}
