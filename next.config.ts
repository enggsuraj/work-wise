import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "https://workwisetool.vercel.app/:path*",
        destination: "https://www.workwisetool.vercel.app/:path*",
        permanent: true,
      },
      {
        source: "/",
        destination: "/notice-period",
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
