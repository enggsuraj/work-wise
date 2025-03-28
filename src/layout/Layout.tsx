"use client";

import { usePathname } from "next/navigation";
import Header from "@/layout/Header";
import Sidebar from "@/layout/Sidebar"; // Import Sidebar
import NavigationButtons from "@/components/common/NavigationButtons";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/layout/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Full-Width Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar (Hidden on Login Page) */}
        {!isLoginPage && <Sidebar />}

        {/* Main Content */}
        <main className={`flex-1 bg-gray-100 p-6 ${!isLoginPage ? "" : ""}`}>
          {/* {!isLoginPage && (
            <div className="flex flex-grow justify-center text-center p-6 pt-0">
              <NavigationButtons />
            </div>
          )} */}
          <div className="h-full flex-grow flex justify-center items-center">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Analytics */}
      <Analytics />
    </div>
  );
};

export default Layout;
