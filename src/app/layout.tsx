import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";

import Layout from "@/layout/Layout";

import SessionProviderWrapper from "@/components/common/SessionProviderWrapper";

import { SEO_KEYWORDS } from "@/constants";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WorkWise - Empowering careers with smarter tools",
  description:
    "WorkWise provides essential career calculators for notice period, last working day estimation, salary hike projections, and work experience tracking.",
  keywords: SEO_KEYWORDS,
  authors: [{ name: "blogtheorem", url: "https://workwisetool.site" }],
  applicationName: "WorkWise",
  robots: "index, follow",
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon.png'
  },
  verification: {
    google: "Tk_5dbJlZpiV5aRTXdx5_tE3OmKFZP4I8R1Qm6uLqZ0",
  },
  openGraph: {
    title: "WorkWise - Career Growth Made Simple",
    description:
      "Get accurate estimations for your last working day, salary hikes, and notice period calculations.",
    url: "https://workwisetool.site",
    siteName: "WorkWise",
    images: [
      {
        url: "https://workwisetool.site/workwisetheme.png",
        width: 1200,
        height: 630,
        alt: "WorkWise Career Calculator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@blogtheorem",
    creator: "@blogtheorem",
    title: "WorkWise - Career Growth Made Simple",
    description:
      "Easily calculate your last working day, salary hike percentage, and total work experience.",
    images: ["https://workwisetool.site/workwisepage.png"],
  },
  alternates: {
    canonical: "https://workwisetool.site/notice-period",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "WorkWise",
              url: "https://workwisetool.site/notice-period",
              description:
                "WorkWise provides essential career calculators for notice period, last working day estimation, salary hike projections, and work experience tracking.",
              keywords: SEO_KEYWORDS,
              author: {
                "@type": "Person",
                name: "blogtheorem",
                url: "https://workwisetool.site/notice-period",
              },
              publisher: {
                "@type": "Organization",
                name: "WorkWise",
                url: "https://workwisetool.site/notice-period",
                logo: {
                  "@type": "ImageObject",
                  url: "https://workwisetool.site/workwisetheme.png",
                  width: 1200,
                  height: 630,
                },
              },
              image: {
                "@type": "ImageObject",
                url: "https://workwisetool.site/workwisetheme.png",
                width: 1200,
                height: 630,
                caption: "WorkWise Career Calculator",
              },
              sameAs: ["https://twitter.com/blogtheorem"],
              potentialAction: {
                "@type": "SearchAction",
                target: "https://workwisetool.site/search?q={query}",
                "query-input": "required name=query",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full flex flex-col w-full max-w-full overflow-x-hidden`}
      >
        <SessionProviderWrapper>
          <Layout>{children}</Layout>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
