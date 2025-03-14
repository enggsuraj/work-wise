"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

const routes = [
  { path: "/notice-period", label: "Notice Period" },
  { path: "/salary-hike", label: "Salary Hike" },
  { path: "/hike-percentage", label: "Hike Percentage" },
  { path: "/work-experience", label: "Work Experience" },
];

export default function NavigationButtons() {
  const router = useRouter();
  const [activePath, setActivePath] = useState<string>("/notice-period");

  const handleButtonClick = (path: string) => {
    setActivePath(path);
    router.push(path);
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:p-6 md:flex md:justify-center md:gap-4 md:flex-wrap">
      {routes.map((route, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(route.path)}
          className={`px-4 py-2 border border-black text-black text-sm rounded-sm cursor-pointer transition ${
            activePath === route.path ? "bg-black text-white" : "bg-white"
          }`}
        >
          <Label className="cursor-pointer flex justify-center">
            {route.label}
          </Label>
        </button>
      ))}
    </div>
  );
}
