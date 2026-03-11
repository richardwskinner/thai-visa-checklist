import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/visa/marriage/extension-of-stay",
  },
};

export default function MarriageExtensionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
