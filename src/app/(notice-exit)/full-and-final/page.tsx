import FullAndFinalEstimator from "@/components/calculator/FullAndFinalEstimator";

export const metadata = {
  title: "Full & Final Settlement Estimator | WorkWise",
  description:
    "Rough full and final settlement: unpaid days, leave encashment, bonus, deductions.",
  keywords: ["FnF calculator", "full and final settlement", "India payroll"],
};

export default function Page() {
  return <FullAndFinalEstimator />;
}
