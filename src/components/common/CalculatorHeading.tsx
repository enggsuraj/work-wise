"use client";

import { cn } from "@/lib/utils";

import { ToolInfoButton } from "@/components/common/ToolInfoButton";

type Props = {
  children: React.ReactNode;
  /** Extra classes on the outer row (margins, print) */
  className?: string;
  /** Extra classes on the &lt;h1&gt; */
  titleClassName?: string;
};

/**
 * Centered tool title with an “i” info control (description on hover).
 */
export function CalculatorHeading({ children, className, titleClassName }: Props) {
  return (
    <div
      className={cn(
        "mb-4 flex items-center justify-center gap-2",
        className
      )}
    >
      <h1
        className={cn("text-center text-sm font-bold", titleClassName)}
      >
        {children}
      </h1>
      <ToolInfoButton />
    </div>
  );
}
