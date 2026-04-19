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

import { marginalTaxOnBonus } from "@/lib/marginal-tax";
import { formatINR, parseNum } from "@/lib/finance";

import { CalculatorHeading } from "@/components/common/CalculatorHeading";

export default function BonusTaxTiming() {
  const [annualSalary, setAnnualSalary] = useState("");
  const [bonus, setBonus] = useState("");
  const [regime, setRegime] = useState<"new" | "old">("new");
  const [eightyC, setEightyC] = useState("150000");

  const r = useMemo(() => {
    const s = parseNum(annualSalary);
    const b = parseNum(bonus);
    if (s === null || s < 0 || b === null || b <= 0) return null;
    const ded = parseNum(eightyC) ?? 0;
    return marginalTaxOnBonus(s, b, regime, ded);
  }, [annualSalary, bonus, regime, eightyC]);

  return (
    <main className="p-6 pt-0">
      <Card className="mx-auto w-full max-w-xl rounded-2xl p-4 shadow-lg sm:p-6 lg:p-8">
        <CalculatorHeading className="mb-2">BONUS &amp; MARGINAL TAX</CalculatorHeading>
        <p className="mb-4 text-center text-xs text-muted-foreground">
          Extra tax when annual bonus is added to the same FY salary (slab effect). Same total income
          over the year usually has the same annual tax; this shows the incremental burden on the
          bonus slice.
        </p>
        <CardContent className="space-y-4 px-0">
          <div>
            <Label className="mb-2 block w-full" htmlFor="bt-sal">
              Annual salary (₹, excl. this bonus)
            </Label>
            <Input
              id="bt-sal"
              inputMode="decimal"
              value={annualSalary}
              onChange={(e) => setAnnualSalary(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2 block w-full" htmlFor="bt-b">
              Annual bonus (₹)
            </Label>
            <Input
              id="bt-b"
              inputMode="decimal"
              value={bonus}
              onChange={(e) => setBonus(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2 block w-full">Regime</Label>
            <Select
              value={regime}
              onValueChange={(v) => setRegime(v as "new" | "old")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="old">Old</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {regime === "old" && (
            <div>
              <Label className="mb-2 block w-full" htmlFor="bt-80c">
                Chapter VI-A (annual, ₹)
              </Label>
              <Input
                id="bt-80c"
                inputMode="decimal"
                value={eightyC}
                onChange={(e) => setEightyC(e.target.value)}
              />
            </div>
          )}

          {r && (
            <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm">
              <p>
                Extra tax on bonus: <strong>{formatINR(r.extraTax, 0)}</strong>
              </p>
              <p className="text-muted-foreground">
                Effective rate on bonus: {(r.effectiveRate * 100).toFixed(1)}%
              </p>
            </div>
          )}

          <Button type="button" variant="secondary" onClick={() => { setAnnualSalary(""); setBonus(""); setEightyC("150000"); }}>
            Reset
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
