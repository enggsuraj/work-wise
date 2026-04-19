import NoticePeriodCalculator from "@/components/calculator/NoticePeriod";
import { noticePeriodKeywords } from "@/constants";

export const metadata = {
  title: "Notice Period Calculator | Find Your Last Working Day in Seconds",
  description: "Struggling to pinpoint your last working day? Use our free, accurate notice period calculator. Simply enter your resignation date and notice period to get instant results, plus insights into key rules, formulas, and best practices for a professional transition.",
  keywords: noticePeriodKeywords
};

const page = () => {
  return <NoticePeriodCalculator />;
};

export default page;
