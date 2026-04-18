import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | WorkWise",
  description: "Terms for using WorkWise calculators and content.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 text-foreground">
      <h1 className="mb-4 text-2xl font-bold">Terms of Service</h1>
      <p className="mb-3 text-sm text-muted-foreground">
        WorkWise provides calculators and educational content for informational purposes only.
        Results are estimates and may not match your employer, tax, or statutory calculations.
      </p>
      <p className="mb-3 text-sm text-muted-foreground">
        You agree to use the site at your own risk. Nothing here is financial, legal, or tax
        advice. Always verify with qualified professionals and your HR or payroll team.
      </p>
      <p className="text-sm text-muted-foreground">
        The site may change or be unavailable at any time. Continued use means you accept these
        terms.
      </p>
    </div>
  );
}
