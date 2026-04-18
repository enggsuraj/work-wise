"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Label } from "@/components/ui/label";

import { routes } from "@/constants";

export default function NavigationButtons() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<string>("");

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  return (
    <div className="grid max-h-[min(40vh,22rem)] grid-cols-2 gap-2 overflow-y-auto md:max-h-none md:grid-cols-none md:p-6 md:flex md:justify-center md:gap-2 md:flex-wrap">
      {routes.map((route) => (
        <Link key={route.path} href={route.path} prefetch>
          <button
            onClick={() => setActivePath(route.path)}
            className={`px-3 py-2 border text-sm rounded-sm cursor-pointer transition dark:border-border ${
              activePath === route.path
                ? "border-black bg-black text-white dark:border-primary dark:bg-primary dark:text-primary-foreground"
                : "border-black bg-white text-black dark:border-border dark:bg-card dark:text-card-foreground"
            }`}
          >
            <Label className="cursor-pointer flex justify-center">
              {route.label}
            </Label>
          </button>
        </Link>
      ))}
    </div>
  );
}
