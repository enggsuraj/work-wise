"use client";

import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { formatINR, parseNum } from "@/lib/finance";

import { CalculatorHeading } from "@/components/common/CalculatorHeading";

type YearRow = { year: number; fixed: number; variable: number; bonus: number; equity: number; total: number };

export default function OfferDecoder() {
  const [monthlyFixed, setMonthlyFixed] = useState("");
  const [variablePct, setVariablePct] = useState("15");
  const [joinBonus, setJoinBonus] = useState("");
  const [joinBonusYear, setJoinBonusYear] = useState("1");
  const [equityTotal, setEquityTotal] = useState("");
  const [vestYears, setVestYears] = useState("4");

  const rows = useMemo(() => {
    const m = parseNum(monthlyFixed);
    const pct = (parseNum(variablePct) ?? 0) / 100;
    const jb = parseNum(joinBonus) ?? 0;
    const jbY = Math.min(4, Math.max(1, Math.floor(parseNum(joinBonusYear) ?? 1)));
    const eq = parseNum(equityTotal) ?? 0;
    const vy = Math.max(1, Math.floor(parseNum(vestYears) ?? 4));
    if (m === null || m <= 0) return [];

    const annualFixed = m * 12;
    const annualVar = annualFixed * pct;
    const eqPerYear = eq / vy;

    const out: YearRow[] = [];
    for (let y = 1; y <= 4; y++) {
      const bonusAlloc = y === jbY ? jb : 0;
      const equityAlloc = y <= vy ? eqPerYear : 0;
      const total = annualFixed + annualVar + bonusAlloc + equityAlloc;
      out.push({
        year: y,
        fixed: annualFixed,
        variable: annualVar,
        bonus: bonusAlloc,
        equity: equityAlloc,
        total,
      });
    }
    return out;
  }, [monthlyFixed, variablePct, joinBonus, joinBonusYear, equityTotal, vestYears]);

  const fourYearTotal = useMemo(
    () => rows.reduce((s, r) => s + r.total, 0),
    [rows]
  );

  return (
    <main className="p-6 pt-0">
      <Card className="mx-auto w-full max-w-3xl rounded-2xl p-4 shadow-lg sm:p-6 lg:p-8">
        <CalculatorHeading className="mb-2">OFFER DECODER</CalculatorHeading>
        <p className="mb-4 text-center text-xs text-muted-foreground">
          Linear vesting model. Variable pay applied evenly each year. Equity split evenly over vest
          years (cliff not modelled).
        </p>
        <CardContent className="space-y-4 px-0">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2 block w-full" htmlFor="of-fixed">
                Monthly fixed (₹)
              </Label>
              <Input
                id="of-fixed"
                inputMode="decimal"
                value={monthlyFixed}
                onChange={(e) => setMonthlyFixed(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block w-full" htmlFor="of-var">
                Target variable (% of annual fixed)
              </Label>
              <Input
                id="of-var"
                inputMode="decimal"
                value={variablePct}
                onChange={(e) => setVariablePct(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block w-full" htmlFor="of-jb">
                One-time joining bonus (₹)
              </Label>
              <Input
                id="of-jb"
                inputMode="decimal"
                value={joinBonus}
                onChange={(e) => setJoinBonus(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block w-full" htmlFor="of-jby">
                Joining bonus in year (1–4)
              </Label>
              <Input
                id="of-jby"
                inputMode="numeric"
                value={joinBonusYear}
                onChange={(e) => setJoinBonusYear(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block w-full" htmlFor="of-eq">
                Total equity grant value (₹, illustrative)
              </Label>
              <Input
                id="of-eq"
                inputMode="decimal"
                value={equityTotal}
                onChange={(e) => setEquityTotal(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block w-full" htmlFor="of-vy">
                Vesting period (years)
              </Label>
              <Input
                id="of-vy"
                inputMode="decimal"
                value={vestYears}
                onChange={(e) => setVestYears(e.target.value)}
              />
            </div>
          </div>

          {rows.length > 0 && (
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-2 font-medium">Year</th>
                    <th className="p-2 font-medium">Fixed</th>
                    <th className="p-2 font-medium">Variable</th>
                    <th className="p-2 font-medium">Bonus</th>
                    <th className="p-2 font-medium">Equity</th>
                    <th className="p-2 font-medium">Year total</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.year} className="border-t border-border">
                      <td className="p-2">{r.year}</td>
                      <td className="p-2">{formatINR(r.fixed, 0)}</td>
                      <td className="p-2">{formatINR(r.variable, 0)}</td>
                      <td className="p-2">{formatINR(r.bonus, 0)}</td>
                      <td className="p-2">{formatINR(r.equity, 0)}</td>
                      <td className="p-2 font-semibold">{formatINR(r.total, 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {rows.length > 0 && (
            <div className="rounded-lg border border-border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">Four-year cash + equity (modelled)</p>
              <p className="text-2xl font-bold text-primary">{formatINR(fourYearTotal, 0)}</p>
            </div>
          )}

          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setMonthlyFixed("");
              setVariablePct("15");
              setJoinBonus("");
              setJoinBonusYear("1");
              setEquityTotal("");
              setVestYears("4");
            }}
          >
            Reset
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
