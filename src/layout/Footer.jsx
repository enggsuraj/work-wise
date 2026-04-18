export default function Footer() {
  return (
    <footer className="mt-auto flex items-center justify-center border-t border-border bg-card p-3 text-card-foreground print:hidden">
      <p className="text-[8pt]">
        © 2026 WorkWiseTool Built with 🖤 and ☕️ by{" "}
        <a
          href="https://instagram.com/blogtheorem"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline-offset-4 hover:underline"
          title="Instagram @blogtheorem"
        >
          blogtheorem
        </a>
        .
      </p>
    </footer>
  );
}
