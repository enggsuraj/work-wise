import TaxRegimeCompare from "@/components/calculator/TaxRegimeCompare";

export const metadata = {
  title: "Old vs New Tax Regime Compare | WorkWise",
  description:
    "Illustrative India income tax comparison for salaried income under old and new regimes.",
  keywords: ["old vs new tax regime", "115BAC", "income tax India"],
};

export default function Page() {
  return <TaxRegimeCompare />;
}
