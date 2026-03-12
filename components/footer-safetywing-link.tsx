"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const SAFETYWING_URL =
  "https://explore.safetywing.com/Nomad-insurance-complete/?referenceID=26491026&utm_source=26491026&utm_medium=Ambassador";

export default function FooterSafetyWingLink() {
  const pathname = usePathname();

  if (!pathname || pathname === "/") {
    return null;
  }

  return (
    <a
      href={SAFETYWING_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View SafetyWing plans"
      className="mx-auto mt-5 block w-full max-w-[280px] md:ml-auto md:mr-0"
    >
      <Image
        src="/SafetyWing-button-promo-2.png"
        alt="View SafetyWing plans"
        width={1459}
        height={334}
        className="h-auto w-full"
      />
    </a>
  );
}
