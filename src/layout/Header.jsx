"use client";

import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

import { Label } from "@/components/ui/label";
import ThemeToggle from "@/components/theme/ThemeToggle";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const socialLinks = [
    {
      href: "https://github.com/enggsuraj/work-wise",
      icon: <FaGithub size={18} />,
    },
  ];

  const extraLinks = [
    {
      href: "https://github.com/enggsuraj/work-wise/issues",
      label: "Report an Issue",
    },
  ];

  return (
    <header className="relative flex w-full items-center justify-between border-b border-border bg-card p-3 text-card-foreground print:hidden">
      <div className="flex items-center">
        <Link
          href="/"
          rel="noopener noreferrer"
          className="flex cursor-pointer items-center"
        >
          <Image src="/favicon.png" alt="WorkWise Logo" width={20} height={20} />
          <Label className="ml-2 cursor-pointer">WorkWise</Label>
          <span className="ml-1 hidden text-sm font-light italic md:inline">
            — empowering careers with smarter tools
          </span>
        </Link>
      </div>

      <div className="hidden items-center gap-3 md:flex">
        <ThemeToggle />
        <Link
          href="/blog"
          className="text-sm text-foreground transition-colors hover:underline"
        >
          <Label className="cursor-pointer text-sm">Blog</Label>
        </Link>
        {socialLinks.map(({ href, icon }, index) => (
          <Link
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground"
          >
            {icon}
          </Link>
        ))}
        {extraLinks.map(({ href, label }, index) => (
          <Link
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Label className="cursor-pointer text-sm">{label}</Label>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <button
          type="button"
          className="text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-14 right-0 z-50 flex w-52 flex-col items-start gap-3 border border-border bg-card p-4 shadow-lg md:hidden">
          <Link
            href="/blog"
            className="text-sm text-foreground hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>
          {socialLinks.map(({ href, icon }, index) => (
            <Link
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              {icon} <span>Social</span>
            </Link>
          ))}
          {extraLinks.map(({ href, label }, index) => (
            <Link
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <Label className="cursor-pointer text-sm">{label}</Label>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
