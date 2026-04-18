import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | WorkWise",
  description: "How WorkWise handles your data on this site.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 text-foreground">
      <h1 className="mb-4 text-2xl font-bold">Privacy Policy</h1>
      <p className="mb-3 text-sm text-muted-foreground">
        WorkWise tools run mostly in your browser. Calculations and checklist state (where used) may
        be stored locally on your device (for example in localStorage). We do not sell your data.
      </p>
      <p className="mb-3 text-sm text-muted-foreground">
        If you use Google sign-in or AI features, those providers process data under their own
        policies. Analytics may collect anonymous usage data to improve the service.
      </p>
      <p className="text-sm text-muted-foreground">
        This page is a general summary and is not legal advice. For questions, contact the site
        owner.
      </p>
    </div>
  );
}
