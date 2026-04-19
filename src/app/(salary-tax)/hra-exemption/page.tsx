import HraExemptionCalc from "@/components/calculator/HraExemptionCalc";

export const metadata = {
  title: "HRA Exemption Estimator | WorkWise",
  description: "Estimate monthly exempt HRA under common Indian tax rules.",
  keywords: ["HRA exemption", "house rent allowance India"],
};

export default function Page() {
  return <HraExemptionCalc />;
}
