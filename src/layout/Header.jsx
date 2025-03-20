"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

import { Label } from "@/components/ui/label";

import logo from "@/icons/logo.png";

const Header = () => {
  const { data: session, status } = useSession();

  const [menuOpen, setMenuOpen] = useState(false);

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/enggsuraj",
      icon: <FaLinkedin size={18} />,
    },
    {
      href: "https://instagram.com/blogtheorem",
      icon: <FaInstagram size={18} />,
    },
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
    <header className="bg-gray-900 text-white p-3 flex justify-between items-center w-full">
      <div className="flex items-center">
        <Link href="/" rel="noopener noreferrer" className="flex items-center">
          <Image src={logo} alt="WorkWise Logo" width={20} height={15} />
          <Label className="ml-2">WorkWise</Label>
        </Link>
        <span className="italic text-sm font-light hidden md:inline">
          {" "}
          - empowering careers with smarter tools
        </span>
      </div>

      <div className="hidden md:flex gap-4 items-center">
        {status === "authenticated" && (
          <Label className="text-sm text-green-200">
            Welcome {session?.user?.name}
          </Label>
        )}
        {status === "authenticated" && (
          <>
            {socialLinks.map(({ href, icon }, index) => (
              <Link
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
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
                <Label className="text-sm cursor-pointer">{label}</Label>
              </Link>
            ))}
          </>
        )}
        {status === "authenticated" ? (
          <button onClick={() => signOut()} className="text-sm cursor-pointer">
            Sign Out
          </button>
        ) : (
          <Link href="/login" rel="noopener noreferrer">
            <Label className="text-sm cursor-pointer">Sign In for More</Label>
          </Link>
        )}
      </div>

      <button
        className="md:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {menuOpen && (
        <div className="absolute top-14 right-0 w-48 bg-gray-800 p-4 flex flex-col items-start md:hidden z-50">
          {status === "authenticated" && (
            <Label className="text-sm text-green-200 mb-2">
              Welcome {session?.user?.name}
            </Label>
          )}
          {status === "authenticated" && (
            <>
              {socialLinks.map(({ href, icon }, index) => (
                <Link
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-2 flex items-center gap-2"
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
                  className="mb-2"
                >
                  <Label className="text-sm cursor-pointer">{label}</Label>
                </Link>
              ))}
            </>
          )}
          {status === "authenticated" ? (
            <button
              onClick={() => signOut()}
              className="text-sm cursor-pointer"
            >
              Sign Out
            </button>
          ) : (
            <Link href="/login" rel="noopener noreferrer">
              <Label className="text-sm cursor-pointer">Sign In for More</Label>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
