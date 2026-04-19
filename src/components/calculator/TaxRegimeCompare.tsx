"use client";

import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  STD_DED_NEW,
  STD_DED_OLD,
  summarizeNewRegime,
  summarizeOldRegime,
} from "@/lib/india-tax";
import { formatINR, parseNum } from "@/lib/finance";

import { CalculatorHeading } from "@/components/common/CalculatorHeading";

export default function TaxRegimeCompare() {
  const [gross, setGross] = useState("");
  const [extraDed, setExtraDed] = useState("150000");

  const result = useMemo(() => {
    const g = parseNum(gross);
    if (g === null || g < 0) return null;
    const ex = parseNum(extraDed) ?? 0;
    const oldS = summarizeOldRegime(g, ex);
    const newS = summarizeNewRegime(g);
    return { oldS, newS };
  }, [gross, extraDed]);

  return (
    <main className="p-6 pt-0">
      <Card className="mx-auto w-full max-w-2xl rounded-2xl p-4 shadow-lg sm:p-6 lg:p-8">
        <CalculatorHeading className="mb-2">OLD VS NEW REGIME (ILLUSTRATIVE)</CalculatorHeading>
        <p className="mb-4 text-center text-xs text-muted-foreground">
          Salary income only. Old regime: standard deduction ₹
          {STD_DED_OLD.toLocaleString("en-IN")} plus extra deductions (e.g. 80C). New regime:
          standard deduction ₹{STD_DED_NEW.toLocaleString("en-IN")}; rebate under 115BAC applied
          when taxable ≤ ₹7L (simplified).
        </p>
        <CardContent className="space-y-4 px-0">
          <div>
            <Label className="mb-2 block w-full" htmlFor="tax-gross">
              Annual gross salary (₹)
            </Label>
            <Input
              id="tax-gross"
              inputMode="decimal"
              value={gross}
              onChange={(e) => setGross(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2 block w-full" htmlFor="tax-80c">
              Chapter VI-A deductions for old regime (₹)
            </Label>
            <Input
              id="tax-80c"
              inputMode="decimal"
              value={extraDed}
              onChange={(e) => setExtraDed(e.target.value)}
            />
          </div>

          {result && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border p-4">
                <h2 className="mb-2 font-semibold">Old regime</h2>
                <p className="text-xs text-muted-foreground">
                  Taxable: {formatINR(result.oldS.taxable, 0)}
                </p>
                <p className="mt-2 text-lg font-bold">
                  Tax + cess: {formatINR(result.oldS.taxAfterCess, 0)}
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h2 className="mb-2 font-semibold">New regime</h2>
                <p className="text-xs text-muted-foreground">
                  Taxable: {formatINR(result.newS.taxable, 0)}
                  {result.newS.rebateApplied ? " (rebate applied)" : ""}
                </p>
                <p className="mt-2 text-lg font-bold">
                  Tax + cess: {formatINR(result.newS.taxAfterCess, 0)}
                </p>
              </div>
            </div>
          )}

          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setGross("");
              setExtraDed("150000");
            }}
          >
            Reset
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
