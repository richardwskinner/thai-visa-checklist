export type ResourceLink = {
  label: string;
  href: string;
  logo?: string;
};

export const resourceLinks: ResourceLink[] = [
  {
    label: "Thai Immigration Bureau",
    href: "https://www.immigration.go.th/",
    logo: "/resource-logos/Immigration-bureau.png",
  },
  {
    label: "Thai e-Visa Official Portal",
    href: "https://www.thaievisa.go.th/",
    logo: "/resource-logos/mfa_logo.webp",
  },
  {
    label: "Thailand Digital Arrival Card (TDAC)",
    href: "https://tdac.immigration.go.th/arrival-card/#/home",
    logo: "/resource-logos/Immigration-bureau.png",
  },
  {
    label: "90-Day Reporting Portal",
    href: "https://tm47.immigration.go.th/",
    logo: "/resource-logos/Immigration-bureau.png",
  },
  {
    label: "TM.30 Portal",
    href: "https://tm30.immigration.go.th/",
    logo: "/resource-logos/Immigration-bureau.png",
  },
  {
    label: "Ministry of Foreign Affairs",
    href: "https://www.mfa.go.th/",
    logo: "/resource-logos/mfa_logo.webp",
  },
  {
    label: "Thailand.go.th",
    href: "https://thailand.go.th/home",
    logo: "/resource-logos/Sawasdee-thailand.png",
  },
  {
    label: "Revenue Department",
    href: "https://www.rd.go.th/english",
    logo: "/resource-logos/The-revenue-dept.svg",
  },
  {
    label: "Airports of Thailand",
    href: "https://www.airportthai.co.th/en/",
    logo: "/resource-logos/AOT.png",
  },
  {
    label: "Tourism Authority of Thailand",
    href: "https://thai.tourismthailand.org/Home",
    logo: "/resource-logos/amazing-thailand.png",
  },
  {
    label: "Board of Investment (BOI)",
    href: "https://www.boi.go.th",
    logo: "/resource-logos/BOI.png",
  },
  {
    label: "Social Security Office (SSO)",
    href: "https://www.sso.go.th/wpr/main",
    logo: "/resource-logos/Social Security Office (SSO).png",
  },
] as const;
