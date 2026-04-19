import Link from "next/link";
import type { Metadata } from "next";

import {
  ROUTE_CATEGORY_LABEL,
  ROUTE_CATEGORY_ORDER,
  groupRoutesByCategory,
  routes,
} from "@/constants";

import { ToolsPageTitle } from "./ToolsPageTitle";

export const metadata: Metadata = {
  title: "All tools | WorkWise",
  description:
    "Browse every career calculator: notice period, tax, salary, exit checklists, and more.",
};

export default function ToolsDirectoryPage() {
  const grouped = groupRoutesByCategory(routes);

  return (
    <div className="mx-auto min-h-[50vh] w-full max-w-4xl px-4 py-8 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-10 text-center">
        <ToolsPageTitle />
        <p className="mt-2 text-muted-foreground">
          Jump to a category or open any calculator below.
        </p>
        <nav className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
          {ROUTE_CATEGORY_ORDER.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-foreground hover:bg-muted"
            >
              {ROUTE_CATEGORY_LABEL[id]}
            </a>
          ))}
        </nav>
      </header>

      <div className="space-y-12">
        {ROUTE_CATEGORY_ORDER.map((cat) => (
          <section key={cat} id={cat} className="scroll-mt-24">
            <h2 className="mb-4 border-b border-border pb-2 text-lg font-semibold text-foreground">
              {ROUTE_CATEGORY_LABEL[cat]}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {grouped[cat].map((route) => (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    className="block rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <span className="font-medium text-foreground">{route.label}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {route.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-muted-foreground">
        <Link href="/" className="text-primary underline-offset-4 hover:underline">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
