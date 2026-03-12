import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Marriage Visa: Convert to Non-O in Thailand",
  description:
    "Marriage visa checklist for converting in Thailand to Non-Immigrant O with forms, relationship documents, financial evidence, and filing steps.",
  path: "/visa/marriage/stages/convert-in-thailand",
});

export default function MarriageConvertInThailandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
