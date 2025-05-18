import NoticePeriodCalculator from "@/components/calculator/NoticePeriod";
import { noticePeriodKeywords } from "@/constants";

export const metadata = {
  title: "Notice Period Calculator India | Accurate & Easy Calculation",
  description: "Calculate your notice period easily with our notice period calculator for India. Includes formulas, Excel options, annual leave, and more.",
  keywords: noticePeriodKeywords
};

const page = () => {
  return <NoticePeriodCalculator />;
};

export default page;
