import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import NavigationButtons from "@/components/common/NavigationButtons";
import SessionProviderWrapper from "@/components/common/SessionProviderWrapper"; // Import the wrapper

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
  title: "WorkWise",
  description:
    "Highlights notice period, last working day, salary hike, and experience calculators.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full flex flex-col w-full max-w-full overflow-x-hidden`}
      >
        <SessionProviderWrapper>
          <Header />
          <main className="flex-grow justify-center items-center bg-gray-100 p-6">
            <div className="flex flex-grow justify-center text-center p-6">
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
