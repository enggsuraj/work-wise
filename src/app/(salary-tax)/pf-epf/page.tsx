import PFEPFEstimator from "@/components/calculator/PFEPFEstimator";

export const metadata = {
  title: "PF / EPF Maturity Estimator | WorkWise",
  description:
    "Project your EPF corpus from monthly contributions and assumed interest. Illustrative only.",
  keywords: ["EPF calculator", "PF maturity", "provident fund India", "EPFO"],
};

export default function Page() {
  return <PFEPFEstimator />;
}
