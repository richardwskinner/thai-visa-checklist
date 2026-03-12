import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Marriage Visa: Apply Outside Thailand",
  description:
    "Marriage visa checklist for applying outside Thailand, including Thai eVisa requirements, relationship documents, travel details, and post-approval steps.",
  path: "/visa/marriage/stages/apply-outside-thailand",
});

export default function MarriageApplyOutsideThailandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
