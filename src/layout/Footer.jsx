import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-3 mt-auto flex justify-center items-center">
      <p className="text-[8pt]">
        © 2025 WorkWiseTool Built with 🖤 and ☕️ by{" "}
        <a
          href="https://blogtheorem.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-emerald-600"
        >
          blogtheorem
        </a>
        .
      </p>
    </footer>
  );
}
