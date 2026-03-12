import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Contact",
  description:
    "Contact Thai Visa Checklist to send feedback, suggest guides, report updates, or ask a question about the website.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
