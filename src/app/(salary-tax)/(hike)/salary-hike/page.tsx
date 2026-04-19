import SalaryHikeCalculator from "@/components/calculator/SalaryHike";
import { salaryHikeKeywords } from "@/constants";

const page = () => {
  return <SalaryHikeCalculator />;
};

export const metadata = {
  title: "Salary Hike Calculator India | Accurate & Easy Estimation",
  description: "Calculate your salary hike easily with our salary hike calculator for India. Includes formulas, tips, and more.",
  keywords: salaryHikeKeywords
};

export default page;
