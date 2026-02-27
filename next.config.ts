import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/visa/marriage",
        destination: "/visa/marriage/extension-of-stay",
        permanent: true,
      },
      {
        source: "/visa/marriage/stages/stage-1",
        destination: "/visa/marriage/stages/apply-outside-thailand",
        permanent: true,
      },
      {
        source: "/visa/marriage/stages/stage-2",
        destination: "/visa/marriage/stages/convert-in-thailand",
        permanent: true,
      },
      {
        source: "/visa/retirement",
        destination: "/visa/retirement/extension-of-stay",
        permanent: true,
      },
      {
        source: "/visa/retirement/stages/stage-1",
        destination: "/visa/retirement/stages/apply-outside-thailand",
        permanent: true,
      },
      {
        source: "/visa/retirement/stages/stage-2",
        destination: "/visa/retirement/stages/convert-in-thailand",
        permanent: true,
      },
      {
        source: "/official-government-links",
        destination: "/offical-goverment-links",
        permanent: true,
      },
      {
        source: "/official-government-resources",
        destination: "/offical-goverment-links",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.thaivisachecklist.com" }],
        destination: "https://thaivisachecklist.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
