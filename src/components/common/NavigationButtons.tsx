"use client";

import { use, useEffect, useState } from "react";
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
    <div className="flex justify-center text-center p-6 gap-4 flex-wrap">
      {routes.map((route) => (
        <button
          key={route.path}
          onClick={() => handleButtonClick(route.path)}
          className={`px-4 py-2 border border-black text-black text-sm rounded-sm cursor-pointer transition ${
            activePath === route.path ? "bg-black text-white" : "bg-white"
          }`}
        >
          <Label className="cursor-pointer">{route.label}</Label>
        </button>
      ))}
    </div>
  );
}
