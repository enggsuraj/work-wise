"use client";

import { useState } from "react";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, Home, User, Briefcase, Settings } from "lucide-react";

const sidebarLinks = [
  { href: "#", label: "Home", icon: Home },
  { href: "#", label: "Profile", icon: User },
  { href: "#", label: "Projects", icon: Briefcase },
  { href: "#", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="p-2 fixed top-4 left-4 z-50 bg-gray-800 text-white rounded-md md:hidden">
          <Menu className="w-6 h-6" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-gray-900 text-white">
          <nav className="flex flex-col space-y-2 p-4">
            {sidebarLinks.map(({ href, label, icon: Icon }, index) => (
              <Link
                key={index}
                href={href}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen bg-gray-900 text-white p-4">
        <nav className="flex flex-col space-y-2">
          {sidebarLinks.map(({ href, label, icon: Icon }, index) => (
            <Link
              key={index}
              href={href}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}
