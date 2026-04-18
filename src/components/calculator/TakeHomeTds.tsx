"use client";

import { useEffect, useMemo, useState } from "react";

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

import { useDebouncedUrlParams } from "@/hooks/useDebouncedUrlParams";
import { summarizeNewRegime, summarizeOldRegime } from "@/lib/india-tax";
import { formatINR, parseNum } from "@/lib/finance";

export default function TakeHomeTds() {
  const [monthlyGross, setMonthlyGross] = useState("");
  const [regime, setRegime] = useState<"new" | "old">("new");
  const [epfMonthly, setEpfMonthly] = useState("1800");
  const [ptMonthly, setPtMonthly] = useState("200");
  const [eightyC, setEightyC] = useState("150000");

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const g = sp.get("g");
    const r = sp.get("r");
    const e = sp.get("epf");
    const p = sp.get("pt");
    const c = sp.get("c");
    if (g !== null) setMonthlyGross(g);
    if (r === "old" || r === "new") setRegime(r);
    if (e !== null) setEpfMonthly(e);
    if (p !== null) setPtMonthly(p);
    if (c !== null) setEightyC(c);
  }, []);

  const urlSync = useMemo(
    () => ({
      g: monthlyGross,
      r: regime,
      epf: epfMonthly,
      pt: ptMonthly,
      c: eightyC,
    }),
    [monthlyGross, regime, epfMonthly, ptMonthly, eightyC]
  );
  useDebouncedUrlParams(urlSync);

  const result = useMemo(() => {
    const m = parseNum(monthlyGross);
    if (m === null || m <= 0) return null;
    const annual = m * 12;
    const epf = Math.max(0, parseNum(epfMonthly) ?? 0);
    const pt = Math.max(0, parseNum(ptMonthly) ?? 0);
    const ded = parseNum(eightyC) ?? 0;
    const taxAnnual =
      regime === "new"
        ? summarizeNewRegime(annual).taxAfterCess
        : summarizeOldRegime(annual, ded).taxAfterCess;
    const taxMonthly = taxAnnual / 12;
    const inHand = m - epf - pt - taxMonthly;
    return { annual, taxAnnual, taxMonthly, inHand, epf, pt };
  }, [monthlyGross, regime, epfMonthly, ptMonthly, eightyC]);

  return (
    <main className="p-6 pt-0">
      <Card className="mx-auto w-full max-w-xl rounded-2xl p-4 shadow-lg sm:p-6 lg:p-8">
        <h1 className="mb-2 text-center text-sm font-bold">TAKE-HOME &amp; TDS (ILLUSTRATIVE)</h1>
        <p className="mb-4 text-center text-xs text-muted-foreground">
          Salary only; annual tax ÷ 12. PF/PT are inputs. Verify with payroll and Form 16.
        </p>
        <CardContent className="space-y-4 px-0">
          <div>
            <Label className="mb-2 block w-full" htmlFor="th-g">
              Monthly gross salary (₹)
            </Label>
            <Input
              id="th-g"
              inputMode="decimal"
              value={monthlyGross}
              onChange={(e) => setMonthlyGross(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2 block w-full">Tax regime</Label>
            <Select
              value={regime}
              onValueChange={(v) => setRegime(v as "new" | "old")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New (115BAC)</SelectItem>
                <SelectItem value="old">Old (with Chapter VI-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {regime === "old" && (
            <div>
              <Label className="mb-2 block w-full" htmlFor="th-80c">
                Chapter VI-A deductions (annual, ₹)
              </Label>
              <Input
                id="th-80c"
                inputMode="decimal"
                value={eightyC}
                onChange={(e) => setEightyC(e.target.value)}
              />
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2 block w-full" htmlFor="th-epf">
                Employee PF / month (₹)
              </Label>
              <Input
                id="th-epf"
                inputMode="decimal"
                value={epfMonthly}
                onChange={(e) => setEpfMonthly(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block w-full" htmlFor="th-pt">
                Professional tax / month (₹)
              </Label>
              <Input
                id="th-pt"
                inputMode="decimal"
                value={ptMonthly}
                onChange={(e) => setPtMonthly(e.target.value)}
              />
            </div>
          </div>

          {result && (
            <div className="space-y-2 rounded-lg border border-border bg-muted/40 p-4 text-sm">
              <p>
                <span className="text-muted-foreground">Est. monthly in-hand: </span>
                <strong className="text-lg text-primary">
                  {formatINR(result.inHand, 0)}
                </strong>
              </p>
              <p className="text-muted-foreground">
                Annual tax (incl. cess): {formatINR(result.taxAnnual, 0)} · Monthly TDS (flat
                spread): {formatINR(result.taxMonthly, 0)}
              </p>
            </div>
          )}

          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setMonthlyGross("");
              setRegime("new");
              setEpfMonthly("1800");
              setPtMonthly("200");
              setEightyC("150000");
            }}
          >
            Reset
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
