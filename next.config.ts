import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/notice-period",
        permanent: true,
      },
      {
        source: "/:path*/",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/notice-period",
        permanent: true,
      },
      {
        source: "/index.php",
        destination: "/notice-period",
        permanent: true,
      },
    ];
  },
  devIndicators: false,
};

export default nextConfig;
