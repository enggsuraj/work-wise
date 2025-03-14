import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-3 flex justify-between items-center">
      <Label className="block text-sm font-medium">WorkWise</Label>
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
      </div>
    </header>
  );
};

export default Header;
