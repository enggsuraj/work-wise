"use client";

import { usePathname } from "next/navigation";
import Header from "@/layout/Header";
import NavigationButtons from "@/components/common/NavigationButtons";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/layout/Footer";

const Layout = ({ children }: any) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col">
      <Header />
      <main className="flex w-full min-w-0 flex-1 flex-col bg-gray-100 p-6 dark:bg-background">
        {!isLoginPage && (
          <div className="w-full shrink-0 print:hidden">
            <NavigationButtons />
          </div>
        )}
        <div
          className={`flex w-full min-w-0 flex-1 flex-col items-stretch ${
            isLoginPage ? "min-h-0 justify-center" : ""
          }`}
        >
          {children}
        </div>
      </main>
      <Footer />
      <Analytics />
    </div>
  );
};

export default Layout;
