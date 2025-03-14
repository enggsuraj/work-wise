"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Label } from "@/components/ui/label";

const routes = [
  { path: "/notice-period", label: "Notice Period" },
  { path: "/salary-hike", label: "Salary Hike" },
  { path: "/hike-percentage", label: "Hike Percentage" },
  { path: "/work-experience", label: "Work Experience" },
];

export default function NavigationButtons() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<string>(pathname);

  return (
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
  );
}
