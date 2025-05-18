import HikePercentage from "@/components/calculator/HikePercentage";
import { hikePercentageKeywords } from "@/constants";

export const metadata = {
  title: "Hike Percentage Calculator India | Accurate & Easy Calculation",
  description: "Calculate your salary hike percentage easily with our calculator for India. Includes formulas, tips, and more.",
  keywords: hikePercentageKeywords
};

const page = () => {
  return <HikePercentage />;
};

export default page;
