"use client";

import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ESI_GROSS_CEILING,
  STATE_PT_MONTHLY_ROUGH,
  monthlyEsiEmployee,
} from "@/lib/regional-payroll";
import { formatINR, parseNum } from "@/lib/finance";

import { CalculatorHeading } from "@/components/common/CalculatorHeading";

const states = Object.keys(STATE_PT_MONTHLY_ROUGH).sort();

export default function EsiProfessionalTax() {
  const [gross, setGross] = useState("");
  const [state, setState] = useState("Karnataka");
  const [ptOverride, setPtOverride] = useState("");

  const out = useMemo(() => {
    const m = parseNum(gross);
    if (m === null || m < 0) return null;
    const esi = monthlyEsiEmployee(m);
    const ptDefault = STATE_PT_MONTHLY_ROUGH[state] ?? 200;
    const pt =
      ptOverride !== "" ? (parseNum(ptOverride) ?? ptDefault) : ptDefault;
    return { esi, pt, ceiling: ESI_GROSS_CEILING };
  }, [gross, state, ptOverride]);

  return (
    <main className="p-6 pt-0">
      <Card className="mx-auto w-full max-w-xl rounded-2xl p-4 shadow-lg sm:p-6 lg:p-8">
        <CalculatorHeading className="mb-2">ESI &amp; PROFESSIONAL TAX</CalculatorHeading>
        <p className="mb-4 text-center text-xs text-muted-foreground">
          ESI: employee 0.75% of gross if gross ≤ ₹
          {ESI_GROSS_CEILING.toLocaleString("en-IN")} (common ceiling; confirm current law). PT:
          rough state defaults — override if needed.
        </p>
        <CardContent className="space-y-4 px-0">
          <div>
            <Label className="mb-2 block w-full" htmlFor="esi-g">
              Monthly gross (₹)
            </Label>
            <Input
              id="esi-g"
              inputMode="decimal"
              value={gross}
              onChange={(e) => setGross(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2 block w-full">State (PT benchmark)</Label>
            <Select value={state} onValueChange={setState}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {states.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2 block w-full" htmlFor="esi-pt">
              PT override / month (₹, optional)
            </Label>
            <Input
              id="esi-pt"
              inputMode="decimal"
              value={ptOverride}
              onChange={(e) => setPtOverride(e.target.value)}
              placeholder="Leave blank for table value"
            />
          </div>

          {out && (
            <div className="space-y-2 rounded-lg border border-border bg-muted/40 p-4 text-sm">
              <p>
                ESI employee / month: <strong>{formatINR(out.esi, 2)}</strong>
                {parseNum(gross)! > out.ceiling && (
                  <span className="text-muted-foreground"> (above ceiling — often nil)</span>
                )}
              </p>
              <p>
                Professional tax / month: <strong>{formatINR(out.pt, 0)}</strong>
              </p>
            </div>
          )}

          <Button type="button" variant="secondary" onClick={() => { setGross(""); setPtOverride(""); setState("Karnataka"); }}>
            Reset
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
