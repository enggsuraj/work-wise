import Gratuity from "@/components/calculator/Gratuity";
import { gratuityCalculatorKeywords } from "@/constants";

const page = () => {
  return <Gratuity />;
};

export const metadata = {
  title: "Gratuity Calculator India | Accurate & Easy Calculation",
  description: "Calculate your gratuity easily with our gratuity calculator for India. Includes formulas, eligibility, and more.",
  keywords: gratuityCalculatorKeywords
};

export default page;
