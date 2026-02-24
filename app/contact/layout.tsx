import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Thai Visa Checklist",
  description:
    "Contact Thai Visa Checklist to send feedback, suggest guides, report updates, or ask a question about the website.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
