"use client";

import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "@/components/theme/ThemeProvider";
import PwaRegister from "@/components/pwa/PwaRegister";

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <PwaRegister />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
