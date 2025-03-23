import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import NavigationButtons from "@/components/common/NavigationButtons";
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
  authors: [{ name: "blogtheorem", url: "https://workwise.vercel.app" }],
  applicationName: "WorkWise",
  robots: "index, follow",
  openGraph: {
    title: "WorkWise - Career Growth Made Simple",
    description:
      "Get accurate estimations for your last working day, salary hikes, and notice period calculations.",
    url: "https://workwise.vercel.app",
    siteName: "WorkWise",
    images: [
      {
        url: "https://workwise.app/workwisetheme.png",
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
    images: ["https://workwise.app/workwisepage.png"],
  },
  alternates: {
    canonical: "https://workwise.vercel.app/notice-period",
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
              url: "https://workwise.vercel.app/notice-period",
              description:
                "WorkWise provides essential career calculators for notice period, last working day estimation, salary hike projections, and work experience tracking.",
              keywords: SEO_KEYWORDS,
              author: {
                "@type": "Person",
                name: "blogtheorem",
                url: "https://workwise.vercel.app/notice-period",
              },
              publisher: {
                "@type": "Organization",
                name: "WorkWise",
                url: "https://workwise.vercel.app/notice-period",
                logo: {
                  "@type": "ImageObject",
                  url: "https://workwise.app/workwisetheme.png",
                  width: 1200,
                  height: 630,
                },
              },
              image: {
                "@type": "ImageObject",
                url: "https://workwise.app/workwisetheme.png",
                width: 1200,
                height: 630,
                caption: "WorkWise Career Calculator",
              },
              sameAs: ["https://twitter.com/blogtheorem"],
              potentialAction: {
                "@type": "SearchAction",
                target: "https://workwise.vercel.app/search?q={query}",
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
          <Header />
          <main className="flex-grow justify-center items-center bg-gray-100 p-6">
            <div className="flex flex-grow justify-center text-center p-6 pt-0">
              <NavigationButtons />
            </div>
            <div className="flex-grow flex justify-center items-center">
              {children}
            </div>
          </main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
