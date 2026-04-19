"use client";

import { usePathname } from "next/navigation";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getAppRouteByPath } from "@/constants";
import { cn } from "@/lib/utils";

type Props = {
  /** Larger hit target on directory pages */
  size?: "sm" | "md";
  className?: string;
};

/**
 * “i” control: shows route description from {@link getAppRouteByPath} on hover (desktop) / tap opens hover card on touch.
 */
export function ToolInfoButton({ size = "sm", className }: Props) {
  const pathname = usePathname();
  const route = getAppRouteByPath(pathname);
  if (!route) return null;

  return (
    <HoverCard openDelay={150} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-full border border-muted-foreground/25 bg-transparent font-serif font-medium leading-none text-muted-foreground/60 transition-colors hover:border-muted-foreground/40 hover:bg-muted/15 hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            size === "sm" ? "size-4 text-[8px]" : "size-[18px] text-[9px]",
            className
          )}
          aria-label={`About: ${route.label}`}
        >
          i
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        className="w-80 max-w-[min(100vw-2rem,22rem)] text-sm leading-relaxed"
        side="bottom"
        align="center"
      >
        <p className="font-medium text-foreground">What this tool does</p>
        <p className="mt-2 text-muted-foreground">{route.description}</p>
      </HoverCardContent>
    </HoverCard>
  );
}
