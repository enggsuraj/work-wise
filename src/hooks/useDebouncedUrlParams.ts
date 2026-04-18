"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/** Writes `values` to the URL query string (debounced). Skip first run. */
export function useDebouncedUrlParams(
  values: Record<string, string>,
  debounceMs = 450
) {
  const router = useRouter();
  const pathname = usePathname();
  const skip = useRef(true);

  useEffect(() => {
    if (skip.current) {
      skip.current = false;
      return;
    }
    const t = window.setTimeout(() => {
      const q = new URLSearchParams();
      for (const [k, v] of Object.entries(values)) {
        if (v !== undefined && v !== "") q.set(k, v);
      }
      const s = q.toString();
      router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
    }, debounceMs);
    return () => window.clearTimeout(t);
  }, [values, debounceMs, pathname, router]);
}
