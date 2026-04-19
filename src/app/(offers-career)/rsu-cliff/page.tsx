import RsuCliff from "@/components/calculator/RsuCliff";

export const metadata = {
  title: "RSU & Equity Cliff | WorkWise",
  description: "Vesting schedule with cliff and linear annual value.",
  keywords: ["RSU cliff", "equity vesting calculator"],
};

export default function Page() {
  return <RsuCliff />;
}
