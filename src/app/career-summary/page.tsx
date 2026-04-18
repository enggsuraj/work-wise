import CareerExportPack from "@/components/calculator/CareerExportPack";

export const metadata = {
  title: "Career Summary Export | WorkWise",
  description: "Compile career numbers and export via Markdown copy or print to PDF.",
  keywords: ["career summary", "salary negotiation notes"],
};

export default function Page() {
  return <CareerExportPack />;
}
