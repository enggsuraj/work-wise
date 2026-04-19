import GardenLeavePlanner from "@/components/calculator/GardenLeavePlanner";

export const metadata = {
  title: "Garden Leave & Notice Overlap Planner | WorkWise",
  description: "Plan last working day and notice overlap with leave days.",
  keywords: ["garden leave", "notice period leave", "LWD"],
};

export default function Page() {
  return <GardenLeavePlanner />;
}
