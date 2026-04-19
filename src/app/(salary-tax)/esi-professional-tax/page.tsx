import EsiProfessionalTax from "@/components/calculator/EsiProfessionalTax";

export const metadata = {
  title: "ESI & Professional Tax (Rough) | WorkWise",
  description: "Employee ESI deduction and state professional tax benchmarks.",
  keywords: ["ESI deduction", "professional tax India"],
};

export default function Page() {
  return <EsiProfessionalTax />;
}
