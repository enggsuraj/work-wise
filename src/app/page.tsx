import Link from "next/link";
import { routes } from "@/constants";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-4xl">
        <div className="text-center w-full">
          <h1 className="text-4xl font-bold mb-4">WorkWise Career Tools</h1>
          <p className="text-gray-600 mb-8">Essential calculators for your career growth and transitions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {routes.map((route, index) => (
            <Link 
              key={index} 
              href={route.path}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <h2 className="text-xl font-semibold mb-2">{route.label}</h2>
              <p className="text-gray-600 text-sm">
                {route.label === "Notice Period" && "Calculate your last working day based on notice period"}
                {route.label === "Salary Hike" && "Estimate your salary increase after appraisal"}
                {route.label === "Hike Percentage" && "Calculate your salary hike percentage"}
                {route.label === "Work Experience" && "Track your professional experience duration"}
                {route.label === "LWD Checklist" && "Complete checklist for your last working day"}
                {route.label === "Gratuity Calculator" && "Calculate your gratuity amount"}
                {route.label === "Leave Encashment" && "Calculate your leave encashment amount"}
                {route.label === "CTC vs InHand Salary" && "Compare CTC and in-hand salary"}
              </p>
            </Link>
          ))}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-600">
        <Link href="/blog" className="hover:text-gray-900">Blog</Link>
        <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
        <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
      </footer>
    </div>
  );
}
