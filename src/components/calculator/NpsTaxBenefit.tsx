"use client";

import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { summarizeOldRegime } from "@/lib/india-tax";
import { futureValueMonthlyAnnuity, formatINR, parseNum } from "@/lib/finance";

const NPS_80CCD1B_ANNUAL = 50_000;

export default function NpsTaxBenefit() {
  const [grossAnnual, setGrossAnnual] = useState("");
  const [chapter6A, setChapter6A] = useState("150000");
  const [years, setYears] = useState("15");
  const [rate, setRate] = useState("10");

  const benefit = useMemo(() => {
    const g = parseNum(grossAnnual);
    if (g === null || g <= 0) return null;
    const ded = parseNum(chapter6A) ?? 0;
    const t0 = summarizeOldRegime(g, ded).taxAfterCess;
    const t1 = summarizeOldRegime(g, ded + NPS_80CCD1B_ANNUAL).taxAfterCess;
    const saved = Math.max(0, t0 - t1);
    const y = parseNum(years) ?? 0;
    const r = (parseNum(rate) ?? 0) / 100;
    const monthly = NPS_80CCD1B_ANNUAL / 12;
    const fv = futureValueMonthlyAnnuity(monthly, r, y);
    return { saved, fv };
  }, [grossAnnual, chapter6A, years, rate]);

  return (
    <main className="p-6 pt-0">
      <Card className="mx-auto w-full max-w-xl rounded-2xl p-4 shadow-lg sm:p-6 lg:p-8">
        <h1 className="mb-2 text-center text-sm font-bold">NPS — 80CCD(1B)</h1>
        <p className="mb-4 text-center text-xs text-muted-foreground">
          Additional ₹{NPS_80CCD1B_ANNUAL.toLocaleString("en-IN")}/yr under old regime (beyond 80C).
          Tax saving is illustrative; add Tier-I contribution accordingly.
        </p>
        <CardContent className="space-y-4 px-0">
          <div>
            <Label className="mb-2 block w-full" htmlFor="nps-g">
              Annual gross salary (₹)
            </Label>
            <Input
              id="nps-g"
              inputMode="decimal"
              value={grossAnnual}
              onChange={(e) => setGrossAnnual(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2 block w-full" htmlFor="nps-6a">
              Other Chapter VI-A (excl. this NPS bucket) (₹)
            </Label>
            <Input
              id="nps-6a"
              inputMode="decimal"
              value={chapter6A}
              onChange={(e) => setChapter6A(e.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2 block w-full" htmlFor="nps-y">
                Years to project
              </Label>
              <Input id="nps-y" inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} />
            </div>
            <div>
              <Label className="mb-2 block w-full" htmlFor="nps-r">
                Assumed return (% p.a.)
              </Label>
              <Input id="nps-r" inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} />
            </div>
          </div>

          {benefit && (
            <div className="space-y-2 rounded-lg border border-border bg-muted/40 p-4 text-sm">
              <p>
                Est. tax saved (old regime): <strong>{formatINR(benefit.saved, 0)}</strong>
              </p>
              <p className="text-muted-foreground">
                If ₹{NPS_80CCD1B_ANNUAL.toLocaleString("en-IN")}/yr goes to NPS, rough corpus after{" "}
                {years}y: <strong>{formatINR(benefit.fv, 0)}</strong>
              </p>
            </div>
          )}

          <Button type="button" variant="secondary" onClick={() => { setGrossAnnual(""); setChapter6A("150000"); setYears("15"); setRate("10"); }}>
            Reset
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
