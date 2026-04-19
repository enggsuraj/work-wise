import EmploymentBond from "@/components/calculator/EmploymentBond";

export const metadata = {
  title: "Employment Bond Estimate | WorkWise",
  description: "Linear training-bond penalty if you leave before lock-in ends.",
  keywords: ["employment bond India", "training bond penalty"],
};

export default function Page() {
  return <EmploymentBond />;
}
