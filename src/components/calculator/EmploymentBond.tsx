"use client";

import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { formatINR, parseNum } from "@/lib/finance";

import { CalculatorHeading } from "@/components/common/CalculatorHeading";

export default function EmploymentBond() {
  const [bondAmount, setBondAmount] = useState("");
  const [lockInMonths, setLockInMonths] = useState("24");
  const [servedMonths, setServedMonths] = useState("");

  const out = useMemo(() => {
    const b = parseNum(bondAmount);
    const lock = parseNum(lockInMonths);
    const served = parseNum(servedMonths);
    if (b === null || b <= 0 || lock === null || lock <= 0) return null;
    if (served === null || served < 0) return null;
    const frac = Math.min(1, Math.max(0, served / lock));
    const penalty = b * (1 - frac);
    return { penalty, frac };
  }, [bondAmount, lockInMonths, servedMonths]);

  return (
    <main className="p-6 pt-0">
      <Card className="mx-auto w-full max-w-xl rounded-2xl p-4 shadow-lg sm:p-6 lg:p-8">
        <CalculatorHeading className="mb-2">EMPLOYMENT BOND (LINEAR MODEL)</CalculatorHeading>
        <p className="mb-4 text-center text-xs text-muted-foreground">
          Illustrative: penalty = bond × (1 − served ÷ lock-in). Real bonds follow your contract and
          Indian contract law — not legal advice.
        </p>
        <CardContent className="space-y-4 px-0">
          <div>
            <Label className="mb-2 block w-full" htmlFor="eb-a">
              Stated bond / training cost (₹)
            </Label>
            <Input id="eb-a" inputMode="decimal" value={bondAmount} onChange={(e) => setBondAmount(e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2 block w-full" htmlFor="eb-l">
                Lock-in period (months)
              </Label>
              <Input id="eb-l" inputMode="decimal" value={lockInMonths} onChange={(e) => setLockInMonths(e.target.value)} />
            </div>
            <div>
              <Label className="mb-2 block w-full" htmlFor="eb-s">
                Months served
              </Label>
              <Input id="eb-s" inputMode="decimal" value={servedMonths} onChange={(e) => setServedMonths(e.target.value)} />
            </div>
          </div>

          {out && (
            <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm">
              <p>
                Linear est. max penalty if you leave now:{" "}
                <strong>{formatINR(out.penalty, 0)}</strong>
              </p>
              <p className="text-muted-foreground">
                Time served: {(out.frac * 100).toFixed(0)}% of lock-in
              </p>
            </div>
          )}

          <Button type="button" variant="secondary" onClick={() => { setBondAmount(""); setLockInMonths("24"); setServedMonths(""); }}>
            Reset
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
