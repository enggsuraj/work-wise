"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { Label } from "@/components/ui/label";
import { routes } from "@/constants";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-full bg-gray-900 text-white flex flex-col p-4">
      <nav className="space-y-2">
        {routes.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={twMerge(
                "flex items-center gap-3 p-3 rounded-lg transition cursor-pointer",
                pathname === item.path ? "bg-gray-700" : "hover:bg-gray-800"
              )}
            >
              <Icon className="text-lg cursor-pointer" />
              <Label className="cursor-pointer">{item.label}</Label>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
