import Gratuity from "@/components/calculator/Gratuity";
import { gratuityCalculatorKeywords } from "@/constants";

const page = () => {
  return <Gratuity />;
};

export const metadata = {
  title: "Gratuity Calculator India 2026 | ÷26 & ÷30, FTE & 50% CTC",
  description:
    "Estimate gratuity using (15 × wages × years) ÷ 26 or ÷30, tenure rounding, optional 50% CTC wage floor, and fixed-term notes. Aligns with common summaries of the Code on Social Security, 2020 (e.g. Nov 2025 updates). Not legal advice.",
  keywords: gratuityCalculatorKeywords,
};

export default page;
