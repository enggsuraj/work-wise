"use client";

import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";

import { Label } from "@/components/ui/label";

import logo from "@/icons/logo.png";

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="bg-gray-900 text-white p-3 flex justify-between items-center w-full">
      <Label className="text-sm font-medium flex justify-start">
        <Link href="/" rel="noopener noreferrer" className="flex justify-start">
          <Image src={logo} alt="WorkWise Logo" width={20} height={15} />
          <Label className="ml-2">WorkWise</Label>
        </Link>
        <span className="italic text-sm font-light font-[cursive] hidden md:inline">
          {" "}
          - empowering careers with smarter tools
        </span>
      </Label>
      <div className="flex gap-4 items-center">
        {status === "authenticated" && (
          <Label className="text-sm text-green-200">
            {"{ "}Welcome {session?.user?.name}
            {" }"}
          </Label>
        )}
        {status === "authenticated" && (
          <>
            <Link
              href="https://www.linkedin.com/in/enggsuraj"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={18} />
            </Link>
            <Link
              href="https://instagram.com/blogtheorem"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={18} />
            </Link>

            <Link
              href="https://github.com/enggsuraj/work-wise"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={18} />
            </Link>

            <Link
              href="https://github.com/enggsuraj/work-wise/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Label className="text-sm cursor-pointer">Report an Issue</Label>
            </Link>
          </>
        )}

        {status === "authenticated" ? (
          <button onClick={() => signOut()} className="text-sm cursor-pointer">
            Sign Out
          </button>
        ) : (
          <Link href="/login" rel="noopener noreferrer">
            <Label className="text-sm cursor-pointer">Sign In for More </Label>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
