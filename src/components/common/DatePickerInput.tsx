"use client";

import { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  value: string;
  onChange: (isoYyyyMmDd: string) => void;
  placeholder?: string;
  className?: string;
  /** Extra handler (e.g. Notice Period runs calculate on Enter). */
  onInputKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
};

/** Parse YYYY-MM-DD as a local calendar date (avoids UTC off-by-one in DayPicker). */
function parseIsoLocal(iso: string): Date | undefined {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return undefined;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (!Number.isFinite(y) || !Number.isFinite(mo) || !Number.isFinite(d)) return undefined;
  return new Date(y, mo - 1, d, 12, 0, 0, 0);
}

function toIsoLocal(date: Date): string {
  const y = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${mo}-${d}`;
}

/**
 * Read-only field look: button trigger + popover calendar (Radix needs a real button, not input-in-div).
 */
export function DatePickerInput({
  id,
  value,
  onChange,
  placeholder = "Select a date",
  className,
  onInputKeyDown,
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!value) setOpen(false);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          className={cn(
            // Match `Input` field: white/surface, thin border, placeholder tone — like Notice Period
            "mb-4 h-9 w-full min-w-0 justify-between gap-2 px-3 py-1 font-normal shadow-xs",
            "border-input bg-background text-foreground hover:bg-background hover:text-foreground",
            "text-base md:text-sm",
            className
          )}
          onKeyDown={onInputKeyDown}
        >
          <span
            className={cn(
              "min-w-0 flex-1 truncate text-left",
              !value && "text-muted-foreground"
            )}
          >
            {value || placeholder}
          </span>
          <CalendarIcon className="h-5 w-5 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value ? parseIsoLocal(value) : undefined}
          onSelect={(date) => {
            if (date) {
              onChange(toIsoLocal(date));
            }
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
