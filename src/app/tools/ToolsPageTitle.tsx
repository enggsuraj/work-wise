"use client";

import { ToolInfoButton } from "@/components/common/ToolInfoButton";

export function ToolsPageTitle() {
  return (
    <div className="flex items-center justify-center gap-2">
      <h1 className="text-3xl font-bold text-foreground">All tools</h1>
      <ToolInfoButton size="md" />
    </div>
  );
}
