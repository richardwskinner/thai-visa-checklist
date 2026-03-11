import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/visa/retirement/extension-of-stay",
  },
};

export default function RetirementExtensionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
