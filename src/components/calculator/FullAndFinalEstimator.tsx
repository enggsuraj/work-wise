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

import { formatINR, parseNum } from "@/lib/finance";

export default function FullAndFinalEstimator() {
  const [monthly, setMonthly] = useState("");
  const [daysLastMonth, setDaysLastMonth] = useState("");
  const [leaveDays, setLeaveDays] = useState("");
  const [divisor, setDivisor] = useState<"26" | "30">("30");
  const [bonus, setBonus] = useState("");
  const [reimbursements, setReimbursements] = useState("");
  const [deductions, setDeductions] = useState("");

  const total = useMemo(() => {
    const m = parseNum(monthly);
    if (m === null || m <= 0) return null;
    const dLast = parseNum(daysLastMonth) ?? 0;
    const perDay = m / Number(divisor);
    const salaryPart = Math.max(0, dLast) * perDay;
    const ld = parseNum(leaveDays) ?? 0;
    const leaveEncash = ld * perDay;
    const b = parseNum(bonus) ?? 0;
    const r = parseNum(reimbursements) ?? 0;
    const ded = parseNum(deductions) ?? 0;
    return salaryPart + leaveEncash + b + r - ded;
  }, [monthly, daysLastMonth, leaveDays, divisor, bonus, reimbursements, deductions]);

  const reset = () => {
    setMonthly("");
    setDaysLastMonth("");
    setLeaveDays("");
    setDivisor("30");
    setBonus("");
    setReimbursements("");
    setDeductions("");
  };

  return (
    <main className="p-6 pt-0">
      <Card className="mx-auto w-full max-w-2xl rounded-2xl p-4 shadow-lg sm:p-6 lg:p-8">
        <h1 className="mb-2 text-center text-sm font-bold">FULL &amp; FINAL (ROUGH ESTIMATE)</h1>
        <p className="mb-4 text-center text-xs text-muted-foreground">
          Not legal advice. Uses your divisor for per-day pay (common: 26 for earned leave, 30 for
          calendar).
        </p>
        <CardContent className="grid gap-4 px-0 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label className="mb-2 block w-full" htmlFor="fnf-monthly">
              Last drawn gross monthly (₹)
            </Label>
            <Input
              id="fnf-monthly"
              inputMode="decimal"
              value={monthly}
              onChange={(e) => setMonthly(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2 block w-full" htmlFor="fnf-days">
              Unpaid days in last month
            </Label>
            <Input
              id="fnf-days"
              inputMode="decimal"
              value={daysLastMonth}
              onChange={(e) => setDaysLastMonth(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2 block w-full" htmlFor="fnf-leave">
              Encashable leave (days)
            </Label>
            <Input
              id="fnf-leave"
              inputMode="decimal"
              value={leaveDays}
              onChange={(e) => setLeaveDays(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2 block w-full">Per-day divisor</Label>
            <Select value={divisor} onValueChange={(v) => setDivisor(v as "26" | "30")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 (calendar)</SelectItem>
                <SelectItem value="26">26 (working)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2 block w-full" htmlFor="fnf-bonus">
              Accrued bonus / variable (₹)
            </Label>
            <Input
              id="fnf-bonus"
              inputMode="decimal"
              value={bonus}
              onChange={(e) => setBonus(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2 block w-full" htmlFor="fnf-reim">
              Reimbursements owed (₹)
            </Label>
            <Input
              id="fnf-reim"
              inputMode="decimal"
              value={reimbursements}
              onChange={(e) => setReimbursements(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <Label className="mb-2 block w-full" htmlFor="fnf-ded">
              Deductions (loans, notice shortfall, etc.) (₹)
            </Label>
            <Input
              id="fnf-ded"
              inputMode="decimal"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
            />
          </div>

          <div className="sm:col-span-2 rounded-lg border border-border bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground">Ballpark settlement</p>
            <p className="text-2xl font-bold text-primary">
              {total === null ? "—" : formatINR(total, 0)}
            </p>
          </div>

          <Button type="button" variant="secondary" onClick={reset} className="sm:col-span-2">
            Reset
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
