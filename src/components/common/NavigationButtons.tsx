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

  if (pathname === "/login") return null;

  return pathname !== "/login" ? (
    <div className="flex flex-grow justify-center text-center p-6 pt-0">
      <div className="grid grid-cols-2 gap-4 md:p-6 md:flex md:justify-center md:gap-4 md:flex-wrap">
        {routes.map((route, index) => (
          <Link key={index} href={route.path} prefetch>
            <button
              onClick={() => setActivePath(route.path)}
              className={`px-4 py-2 border border-black text-black text-sm rounded-sm cursor-pointer transition ${
                activePath === route.path ? "bg-black text-white" : "bg-white"
              }`}
            >
              <Label className="cursor-pointer flex justify-center">
                {route.label}
              </Label>
            </button>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
}
