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

import { CalculatorHeading } from "@/components/common/CalculatorHeading";

export default function NoticeBuyout() {
  const [monthly, setMonthly] = useState("");
  const [days, setDays] = useState("");
  const [divisor, setDivisor] = useState<"26" | "30">("30");

  const buyout = useMemo(() => {
    const m = parseNum(monthly);
    const d = parseNum(days);
    if (m === null || m <= 0 || d === null || d <= 0) return null;
    const perDay = m / Number(divisor);
    return perDay * d;
  }, [monthly, days, divisor]);

  return (
    <main className="p-6 pt-0">
      <Card className="mx-auto w-full max-w-xl rounded-2xl p-4 shadow-lg sm:p-6 lg:p-8">
        <CalculatorHeading className="mb-2">NOTICE BUYOUT</CalculatorHeading>
        <p className="mb-4 text-center text-xs text-muted-foreground">
          Buyout ≈ (gross per day) × days. Your contract may use a different base (basic only,
          etc.).
        </p>
        <CardContent className="space-y-4 px-0">
          <div>
            <Label className="mb-2 block w-full" htmlFor="nb-monthly">
              Monthly gross used for per-day pay (₹)
            </Label>
            <Input
              id="nb-monthly"
              inputMode="decimal"
              value={monthly}
              onChange={(e) => setMonthly(e.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2 block w-full" htmlFor="nb-days">
                Notice days to buy out
              </Label>
              <Input
                id="nb-days"
                inputMode="decimal"
                value={days}
                onChange={(e) => setDays(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block w-full">Days in month divisor</Label>
              <Select value={divisor} onValueChange={(v) => setDivisor(v as "26" | "30")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="26">26</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground">Estimated buyout</p>
            <p className="text-2xl font-bold text-primary">
              {buyout === null ? "—" : formatINR(buyout, 0)}
            </p>
          </div>

          <Button type="button" variant="secondary" onClick={() => { setMonthly(""); setDays(""); }}>
            Reset
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
