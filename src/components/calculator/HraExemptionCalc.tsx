"use client";

import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { hraExemptMonthly } from "@/lib/hra";
import { formatINR, parseNum } from "@/lib/finance";

import { CalculatorHeading } from "@/components/common/CalculatorHeading";

export default function HraExemptionCalc() {
  const [basic, setBasic] = useState("");
  const [da, setDa] = useState("0");
  const [hra, setHra] = useState("");
  const [rent, setRent] = useState("");
  const [metro, setMetro] = useState(true);

  const out = useMemo(() => {
    const b = parseNum(basic);
    const d = parseNum(da) ?? 0;
    const h = parseNum(hra);
    const r = parseNum(rent);
    if (b === null || b <= 0 || h === null || r === null) return null;
    return hraExemptMonthly({
      basicMonthly: b,
      daMonthly: d,
      hraReceivedMonthly: h,
      rentPaidMonthly: r,
      isMetro: metro,
    });
  }, [basic, da, hra, rent, metro]);

  return (
    <main className="p-6 pt-0">
      <Card className="mx-auto w-full max-w-xl rounded-2xl p-4 shadow-lg sm:p-6 lg:p-8">
        <CalculatorHeading className="mb-2">HRA EXEMPTION (ILLUSTRATIVE)</CalculatorHeading>
        <p className="mb-4 text-center text-xs text-muted-foreground">
          Old-regime style: exempt = min(HRA received, rent − 10% of salary, 40% or 50% of salary).
          Salary = basic + DA.
        </p>
        <CardContent className="space-y-4 px-0">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2 block w-full" htmlFor="hra-b">
                Basic / month (₹)
              </Label>
              <Input
                id="hra-b"
                inputMode="decimal"
                value={basic}
                onChange={(e) => setBasic(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block w-full" htmlFor="hra-da">
                DA / month (₹)
              </Label>
              <Input
                id="hra-da"
                inputMode="decimal"
                value={da}
                onChange={(e) => setDa(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2 block w-full" htmlFor="hra-h">
                HRA received / month (₹)
              </Label>
              <Input
                id="hra-h"
                inputMode="decimal"
                value={hra}
                onChange={(e) => setHra(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block w-full" htmlFor="hra-r">
                Rent paid / month (₹)
              </Label>
              <Input
                id="hra-r"
                inputMode="decimal"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="hra-metro"
              checked={metro}
              onCheckedChange={(c) => setMetro(c === true)}
            />
            <Label htmlFor="hra-metro" className="cursor-pointer text-sm font-normal">
              Metro (50% cap); off = 40%
            </Label>
          </div>

          {out && (
            <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm">
              <p className="font-semibold text-primary">
                Exempt HRA / month: {formatINR(out.exempt, 0)}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Components — HRA: {formatINR(out.a, 0)}, rent − 10%: {formatINR(out.b, 0)}, % cap:{" "}
                {formatINR(out.c, 0)}
              </p>
            </div>
          )}

          <Button type="button" variant="secondary" onClick={() => { setBasic(""); setDa("0"); setHra(""); setRent(""); }}>
            Reset
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
