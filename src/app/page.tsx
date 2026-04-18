import Link from "next/link";
import {
  ROUTE_CATEGORY_LABEL,
  ROUTE_CATEGORY_ORDER,
  groupRoutesByCategory,
  routes,
} from "@/constants";

export default function Home() {
  const grouped = groupRoutesByCategory(routes);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 bg-background p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20 min-h-[60vh]">
      <main className="row-start-2 flex w-full max-w-4xl flex-col items-center gap-10 sm:items-start">
        <div className="w-full text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">WorkWise Career Tools</h1>
          <p className="mb-6 text-muted-foreground">
            Essential calculators for your career growth and transitions
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
          >
            View all tools by category →
          </Link>
        </div>

        <div className="w-full space-y-10">
          {ROUTE_CATEGORY_ORDER.map((cat) => (
            <section key={cat} aria-labelledby={`cat-${cat}`}>
              <h2
                id={`cat-${cat}`}
                className="mb-4 text-lg font-semibold text-foreground"
              >
                {ROUTE_CATEGORY_LABEL[cat]}
              </h2>
              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {grouped[cat].map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    className="block rounded-lg border border-border bg-card p-5 text-card-foreground shadow-sm transition-shadow hover:shadow-md"
                  >
                    <h3 className="mb-1 text-lg font-semibold leading-snug">{route.label}</h3>
                    <p className="text-sm text-muted-foreground">{route.description}</p>
                  </Link>
                ))}
              </div>
            </section>
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
