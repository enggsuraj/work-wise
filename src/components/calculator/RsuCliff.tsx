"use client";

import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { formatINR, parseNum } from "@/lib/finance";

type Row = { year: number; vestValue: number };

export default function RsuCliff() {
  const [grantValue, setGrantValue] = useState("");
  const [cliffYears, setCliffYears] = useState("1");
  const [vestYearsAfter, setVestYearsAfter] = useState("3");

  const rows = useMemo(() => {
    const g = parseNum(grantValue);
    const c = Math.max(0, Math.floor(parseNum(cliffYears) ?? 0));
    const v = Math.max(1, Math.floor(parseNum(vestYearsAfter) ?? 1));
    if (g === null || g <= 0) return [];
    const perYear = g / v;
    const out: Row[] = [];
    let y = 1;
    for (; y <= c; y++) out.push({ year: y, vestValue: 0 });
    for (let i = 0; i < v; i++, y++) out.push({ year: y, vestValue: perYear });
    return out;
  }, [grantValue, cliffYears, vestYearsAfter]);

  const total = useMemo(() => rows.reduce((s, r) => s + r.vestValue, 0), [rows]);

  return (
    <main className="p-6 pt-0">
      <Card className="mx-auto w-full max-w-2xl rounded-2xl p-4 shadow-lg sm:p-6 lg:p-8">
        <h1 className="mb-2 text-center text-sm font-bold">RSU / EQUITY (CLIFF + VEST)</h1>
        <p className="mb-4 text-center text-xs text-muted-foreground">
          Linear vest after cliff: no value before cliff ends, then equal annual value over vest
          years. Ignores tax at exercise/sale.
        </p>
        <CardContent className="space-y-4 px-0">
          <div>
            <Label className="mb-2 block w-full" htmlFor="rsu-g">
              Total grant value (₹, illustrative)
            </Label>
            <Input id="rsu-g" inputMode="decimal" value={grantValue} onChange={(e) => setGrantValue(e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2 block w-full" htmlFor="rsu-c">
                Cliff (years, no vest)
              </Label>
              <Input id="rsu-c" inputMode="decimal" value={cliffYears} onChange={(e) => setCliffYears(e.target.value)} />
            </div>
            <div>
              <Label className="mb-2 block w-full" htmlFor="rsu-v">
                Vesting years after cliff
              </Label>
              <Input id="rsu-v" inputMode="decimal" value={vestYearsAfter} onChange={(e) => setVestYearsAfter(e.target.value)} />
            </div>
          </div>

          {rows.length > 0 && (
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-2">Year #</th>
                    <th className="p-2">Vest value</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.year} className="border-t border-border">
                      <td className="p-2">{r.year}</td>
                      <td className="p-2">{formatINR(r.vestValue, 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="border-t border-border p-2 text-xs text-muted-foreground">
                Total: {formatINR(total, 0)}
              </p>
            </div>
          )}

          <Button type="button" variant="secondary" onClick={() => { setGrantValue(""); setCliffYears("1"); setVestYearsAfter("3"); }}>
            Reset
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
