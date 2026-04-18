"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Grid3X3, Home, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  POPULAR_ROUTE_PATHS,
  ROUTE_CATEGORY_LABEL,
  ROUTE_CATEGORY_ORDER,
  groupRoutesByCategory,
  routes,
  type AppRoute,
} from "@/constants";
import { cn } from "@/lib/utils";

function matchesQuery(route: AppRoute, q: string): boolean {
  if (!q.trim()) return false;
  const s = q.trim().toLowerCase();
  return (
    route.label.toLowerCase().includes(s) ||
    route.description.toLowerCase().includes(s) ||
    route.path.toLowerCase().includes(s)
  );
}

export default function ToolsNav() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [browseOpen, setBrowseOpen] = useState(false);

  const grouped = useMemo(() => groupRoutesByCategory(routes), []);
  const filtered = useMemo(
    () => routes.filter((r) => matchesQuery(r, query)),
    [query]
  );

  const popular = useMemo(() => {
    return POPULAR_ROUTE_PATHS.map((p) => routes.find((r) => r.path === p)).filter(
      (r): r is AppRoute => r != null
    );
  }, []);

  const linkClass = (path: string) =>
    cn(
      "block rounded-md px-3 py-2 text-left text-sm transition-colors",
      pathname === path
        ? "bg-primary text-primary-foreground"
        : "hover:bg-muted"
    );

  return (
    <nav
      aria-label="Tools navigation"
      className="mx-auto w-full max-w-4xl px-2 pb-2 pt-1"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/"
            className={cn(
              "inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-colors",
              pathname === "/"
                ? "bg-primary text-primary-foreground"
                : "bg-card hover:bg-muted"
            )}
          >
            <Home className="size-4" aria-hidden />
            Home
          </Link>
          <Link
            href="/tools"
            className={cn(
              "inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-colors",
              pathname === "/tools"
                ? "bg-primary text-primary-foreground"
                : "bg-card hover:bg-muted"
            )}
          >
            <Grid3X3 className="size-4" aria-hidden />
            All tools
          </Link>
          <Popover open={browseOpen} onOpenChange={setBrowseOpen}>
            <PopoverTrigger asChild>
              <Button type="button" variant="outline" size="sm" className="gap-1">
                Browse
                <ChevronDown className="size-4 opacity-70" aria-hidden />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="max-h-[min(70vh,28rem)] w-[min(100vw-1.5rem,22rem)] overflow-y-auto p-0"
              align="start"
              sideOffset={8}
            >
              <div className="border-b border-border px-3 py-2 text-xs font-medium text-muted-foreground">
                By category
              </div>
              <div className="p-2">
                {ROUTE_CATEGORY_ORDER.map((cat) => (
                  <div key={cat} className="mb-3 last:mb-0">
                    <div className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {ROUTE_CATEGORY_LABEL[cat]}
                    </div>
                    <ul className="space-y-0.5">
                      {grouped[cat].map((route) => (
                        <li key={route.path}>
                          <Link
                            href={route.path}
                            prefetch
                            className={linkClass(route.path)}
                            onClick={() => setBrowseOpen(false)}
                          >
                            {route.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="relative min-w-0 flex-1 sm:max-w-md">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools…"
            aria-label="Search tools"
            className="border-neutral-200 bg-white pl-9 text-neutral-900 placeholder:text-neutral-500 dark:bg-white dark:text-neutral-900 dark:placeholder:text-neutral-500 dark:border-neutral-300"
          />
        </div>
      </div>

      {!query.trim() && (
        <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
          <span className="w-full text-[11px] font-medium uppercase tracking-wide text-muted-foreground sm:w-auto sm:py-1">
            Popular
          </span>
          {popular.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              prefetch
              className={cn(
                "rounded-full border border-border px-2.5 py-1 text-xs font-medium transition-colors",
                pathname === route.path
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card hover:bg-muted"
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>
      )}

      {query.trim() && (
        <div className="mt-2 max-h-56 overflow-y-auto rounded-md border border-border bg-card shadow-sm">
          {filtered.length === 0 ? (
            <p className="p-4 text-center text-sm text-muted-foreground">
              No tools match &quot;{query}&quot;
            </p>
          ) : (
            <ul className="divide-y divide-border p-1">
              {filtered.map((route) => (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    prefetch
                    className="block rounded-sm px-3 py-2.5 hover:bg-muted"
                    onClick={() => setQuery("")}
                  >
                    <span className="font-medium">{route.label}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground line-clamp-2">
                      {route.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </nav>
  );
}
