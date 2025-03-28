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
    <>
      <Header />
      <main className={`flex-grow justify-center items-center bg-gray-100 p-6`}>
        {!isLoginPage && (
          <div className="flex flex-grow justify-center text-center p-6 pt-0">
            <NavigationButtons />
          </div>
        )}
        <div
          className={`flex-grow flex justify-center items-center ${
            isLoginPage ? "h-full" : ""
          }`}
        >
          {children}
        </div>
      </main>
      <Footer />
      <Analytics />
    </>
  );
};

export default Layout;
