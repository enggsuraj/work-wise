import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/notice-period",
        permanent: true,
      },
    ];
  },
  devIndicators: false,
};

export default nextConfig;
