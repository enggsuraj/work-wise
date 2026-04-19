import OfferDecoder from "@/components/calculator/OfferDecoder";

export const metadata = {
  title: "Offer Decoder — Fixed, Variable, Bonus, Equity | WorkWise",
  description: "Break down compensation components year by year for a job offer.",
  keywords: ["offer breakdown", "CTC components", "RSU vesting"],
};

export default function Page() {
  return <OfferDecoder />;
}
