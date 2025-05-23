import NoticePeriodCalculator from "@/components/calculator/NoticePeriod";
import { noticePeriodKeywords } from "@/constants";

export const metadata = {
  title: "Notice Period Calculator India | Accurate & Easy Calculation",
  description: "Calculate your notice period easily with our calculator for India. Includes rules, formulas, and more.",
  keywords: noticePeriodKeywords
};

const page = () => {
  return <NoticePeriodCalculator />;
};

export default page;
