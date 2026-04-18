import Link from "next/link";
import { routes } from "@/constants";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-background min-h-[60vh]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-4xl">
        <div className="text-center w-full">
          <h1 className="text-4xl font-bold mb-4 text-foreground">WorkWise Career Tools</h1>
          <p className="text-muted-foreground mb-8">Essential calculators for your career growth and transitions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {routes.map((route) => (
            <Link 
              key={route.path} 
              href={route.path}
              className="block p-6 bg-card text-card-foreground rounded-lg shadow-md hover:shadow-lg transition-shadow border border-border"
            >
              <h2 className="text-xl font-semibold mb-2">{route.label}</h2>
              <p className="text-muted-foreground text-sm">{route.description}</p>
            </Link>
          ))}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-muted-foreground">
        <Link href="/blog" className="hover:text-foreground underline-offset-4 hover:underline">Blog</Link>
        <Link href="/privacy" className="hover:text-foreground underline-offset-4 hover:underline">Privacy Policy</Link>
        <Link href="/terms" className="hover:text-foreground underline-offset-4 hover:underline">Terms of Service</Link>
      </footer>
    </div>
  );
}
