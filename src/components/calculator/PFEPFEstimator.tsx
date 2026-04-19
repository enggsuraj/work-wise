"use client";

import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { futureValueMonthlyAnnuity, formatINR, parseNum } from "@/lib/finance";

import { CalculatorHeading } from "@/components/common/CalculatorHeading";

const WAGE_CEILING = 15_000;

export default function PFEPFEstimator() {
  const [mode, setMode] = useState<"simple" | "capped">("simple");
  const [monthlyTotal, setMonthlyTotal] = useState("");
  const [basic, setBasic] = useState("");
  const [rate, setRate] = useState("8.25");
  const [years, setYears] = useState("10");

  const contribution = useMemo(() => {
    if (mode === "simple") {
      return parseNum(monthlyTotal) ?? 0;
    }
    const b = parseNum(basic) ?? 0;
    if (b <= 0) return 0;
    const base = Math.min(b, WAGE_CEILING);
    const employee = 0.12 * base;
    const employerEpf = 0.0367 * base;
    return employee + employerEpf;
  }, [mode, monthlyTotal, basic]);

  const fv = useMemo(() => {
    const y = parseNum(years) ?? 0;
    const r = (parseNum(rate) ?? 0) / 100;
    return futureValueMonthlyAnnuity(contribution, r, y);
  }, [contribution, years, rate]);

  const reset = () => {
    setMonthlyTotal("");
    setBasic("");
    setRate("8.25");
    setYears("10");
  };

  return (
    <main className="p-6 pt-0">
      <Card className="mx-auto w-full max-w-2xl rounded-2xl p-4 shadow-lg sm:p-6 lg:p-8">
        <CalculatorHeading className="mb-2">PF / EPF MATURITY (ILLUSTRATIVE)</CalculatorHeading>
        <p className="mb-4 text-center text-xs text-muted-foreground">
          Annuity future value on monthly credits. Interest is compounded monthly. Verify with your
          EPFO passbook.
        </p>
        <CardContent className="space-y-4 px-0">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant={mode === "simple" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("simple")}
            >
              Simple (total monthly credit)
            </Button>
            <Button
              type="button"
              variant={mode === "capped" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("capped")}
            >
              Capped basic (₹15k ceiling)
            </Button>
          </div>

          {mode === "simple" ? (
            <div>
              <Label className="mb-2 block w-full" htmlFor="monthlyTotal">
                Total monthly contribution to EPF (₹)
              </Label>
              <Input
                id="monthlyTotal"
                inputMode="decimal"
                value={monthlyTotal}
                onChange={(e) => setMonthlyTotal(e.target.value)}
                placeholder="e.g. 7200"
              />
            </div>
          ) : (
            <div>
              <Label className="mb-2 block w-full" htmlFor="basic">
                Monthly basic salary (₹)
              </Label>
              <Input
                id="basic"
                inputMode="decimal"
                value={basic}
                onChange={(e) => setBasic(e.target.value)}
                placeholder="Used with statutory ceiling"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Uses employee 12% + employer EPF 3.67% on min(basic, ₹
                {WAGE_CEILING.toLocaleString("en-IN")}). EPS portion excluded.
              </p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2 block w-full" htmlFor="rate">
                Expected annual interest (%)
              </Label>
              <Input
                id="rate"
                inputMode="decimal"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block w-full" htmlFor="years">
                Years
              </Label>
              <Input
                id="years"
                inputMode="decimal"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground">Monthly credit modelled</p>
            <p className="text-lg font-semibold">{formatINR(contribution, 2)}</p>
            <p className="mt-3 text-sm text-muted-foreground">Projected corpus (end of period)</p>
            <p className="text-2xl font-bold text-primary">{formatINR(fv, 0)}</p>
          </div>

          <Button type="button" variant="secondary" onClick={reset}>
            Reset
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
