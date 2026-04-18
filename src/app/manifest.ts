import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WorkWise Career Tools",
    short_name: "WorkWise",
    description:
      "Career calculators: notice period, salary, tax, PF, and more.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#171717",
    icons: [
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
