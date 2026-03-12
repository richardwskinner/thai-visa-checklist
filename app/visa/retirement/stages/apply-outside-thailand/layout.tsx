import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Retirement Visa: Apply Outside Thailand",
  description:
    "Retirement visa checklist for applying outside Thailand, including key rules, required documents, travel details, and post-approval steps.",
  path: "/visa/retirement/stages/apply-outside-thailand",
});

export default function RetirementStageOneLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
