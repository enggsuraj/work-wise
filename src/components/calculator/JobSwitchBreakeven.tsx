"use client";

import { useEffect, useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useDebouncedUrlParams } from "@/hooks/useDebouncedUrlParams";
import { parseNum } from "@/lib/finance";

export default function JobSwitchBreakeven() {
  const [oldInHand, setOldInHand] = useState("");
  const [newInHand, setNewInHand] = useState("");
  const [buyout, setBuyout] = useState("");
  const [relocation, setRelocation] = useState("");
  const [signingBonus, setSigningBonus] = useState("");

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    if (sp.get("o") !== null) setOldInHand(sp.get("o")!);
    if (sp.get("n") !== null) setNewInHand(sp.get("n")!);
    if (sp.get("b") !== null) setBuyout(sp.get("b")!);
    if (sp.get("r") !== null) setRelocation(sp.get("r")!);
    if (sp.get("s") !== null) setSigningBonus(sp.get("s")!);
  }, []);

  const urlSync = useMemo(
    () => ({
      o: oldInHand,
      n: newInHand,
      b: buyout,
      r: relocation,
      s: signingBonus,
    }),
    [oldInHand, newInHand, buyout, relocation, signingBonus]
  );
  useDebouncedUrlParams(urlSync);

  const months = useMemo(() => {
    const o = parseNum(oldInHand);
    const n = parseNum(newInHand);
    const bo = parseNum(buyout) ?? 0;
    const rel = parseNum(relocation) ?? 0;
    const sign = parseNum(signingBonus) ?? 0;
    if (o === null || n === null) return null;
    const delta = n - o;
    if (delta <= 0) return { kind: "no_gain" as const, delta };
    const netCost = bo + rel - sign;
    if (netCost <= 0) return { kind: "immediate" as const, delta, netCost };
    return { kind: "months" as const, delta, months: netCost / delta, netCost };
  }, [oldInHand, newInHand, buyout, relocation, signingBonus]);

  return (
    <main className="p-6 pt-0">
      <Card className="mx-auto w-full max-w-xl rounded-2xl p-4 shadow-lg sm:p-6 lg:p-8">
        <h1 className="mb-2 text-center text-sm font-bold">JOB SWITCH BREAK-EVEN</h1>
        <p className="mb-4 text-center text-xs text-muted-foreground">
          Net upfront cost = notice buyout + relocation − signing bonus. Months to recover = net cost
          ÷ monthly in-hand gain.
        </p>
        <CardContent className="space-y-4 px-0">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2 block w-full" htmlFor="jb-old">
                Current monthly in-hand (₹)
              </Label>
              <Input id="jb-old" inputMode="decimal" value={oldInHand} onChange={(e) => setOldInHand(e.target.value)} />
            </div>
            <div>
              <Label className="mb-2 block w-full" htmlFor="jb-new">
                New monthly in-hand (₹)
              </Label>
              <Input id="jb-new" inputMode="decimal" value={newInHand} onChange={(e) => setNewInHand(e.target.value)} />
            </div>
          </div>
          <div>
            <Label className="mb-2 block w-full" htmlFor="jb-buy">
              Notice buyout you pay (₹)
            </Label>
            <Input id="jb-buy" inputMode="decimal" value={buyout} onChange={(e) => setBuyout(e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2 block w-full" htmlFor="jb-rel">
                Relocation cost (₹)
              </Label>
              <Input id="jb-rel" inputMode="decimal" value={relocation} onChange={(e) => setRelocation(e.target.value)} />
            </div>
            <div>
              <Label className="mb-2 block w-full" htmlFor="jb-sign">
                Signing / joining bonus (₹, +cash)
              </Label>
              <Input id="jb-sign" inputMode="decimal" value={signingBonus} onChange={(e) => setSigningBonus(e.target.value)} />
            </div>
          </div>

          {months && (
            <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm">
              {months.kind === "no_gain" && (
                <p>New in-hand is not higher than current — break-even not meaningful.</p>
              )}
              {months.kind === "immediate" && (
                <p>
                  Net upfront is {months.netCost <= 0 ? "zero or negative" : "low"} — you recover from
                  day one (before monthly cash flow).
                </p>
              )}
              {months.kind === "months" && (
                <p>
                  Rough months to recover net cost: <strong>{months.months.toFixed(1)}</strong> months
                  (₹{months.netCost.toLocaleString("en-IN")} ÷ ₹
                  {months.delta.toLocaleString("en-IN")}/mo).
                </p>
              )}
            </div>
          )}

          <Button type="button" variant="secondary" onClick={() => { setOldInHand(""); setNewInHand(""); setBuyout(""); setRelocation(""); setSigningBonus(""); }}>
            Reset
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
