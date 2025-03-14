import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-3 flex justify-between items-center">
      <Label className="block text-sm font-medium">
        <Link href="/" rel="noopener noreferrer">
          WorkWise
        </Link>
        <span className="italic text-sm font-light font-[cursive]">
          {" "}
          - empowering careers with smarter tools
        </span>
      </Label>
      <div className="flex gap-4">
        <Link
          href="https://www.linkedin.com/in/enggsuraj"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={18} />
        </Link>
        <Link
          href="https://github.com/enggsuraj/work-wise"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={18} />
        </Link>
        <Link
          href="https://instagram.com/blogtheorem"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={18} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
