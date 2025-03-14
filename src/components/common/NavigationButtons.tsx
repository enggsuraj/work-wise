"use client";

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

  return (
    <div className="flex justify-center text-center p-6 gap-4">
      {routes?.map((route) => (
        <button
          key={route.path}
          onClick={() => router.push(route.path)}
          className="px-4 py-2 border border-black bg-white text-black text-sm rounded-sm cursor-pointer transition"
        >
          <Label className="cursor-pointer transition">{route.label}</Label>
        </button>
      ))}
    </div>
  );
}
