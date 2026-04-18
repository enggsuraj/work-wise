"use client";

import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { formatINR, parseNum } from "@/lib/finance";

export default function ContractVsPermanent() {
  const [dailyRate, setDailyRate] = useState("");
  const [billableDays, setBillableDays] = useState("22");
  const [ctcAnnual, setCtcAnnual] = useState("");
  const [benefitsPct, setBenefitsPct] = useState("15");

  const out = useMemo(() => {
    const d = parseNum(dailyRate);
    const days = parseNum(billableDays) ?? 22;
    const ctc = parseNum(ctcAnnual);
    const bp = (parseNum(benefitsPct) ?? 0) / 100;
    if (d === null || d <= 0 || ctc === null || ctc <= 0) return null;
    const contractAnnual = d * days * 12;
    const effectivePermanent = ctc * (1 - bp);
    return { contractAnnual, effectivePermanent, delta: contractAnnual - effectivePermanent };
  }, [dailyRate, billableDays, ctcAnnual, benefitsPct]);

  return (
    <main className="p-6 pt-0">
      <Card className="mx-auto w-full max-w-xl rounded-2xl p-4 shadow-lg sm:p-6 lg:p-8">
        <h1 className="mb-2 text-center text-sm font-bold">CONTRACT VS PERMANENT</h1>
        <p className="mb-4 text-center text-xs text-muted-foreground">
          Contract annual = daily rate × billable days × 12. &quot;Effective&quot; permanent cash ≈
          CTC × (1 − benefits%) — rough; employer costs are not take-home.
        </p>
        <CardContent className="space-y-4 px-0">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2 block w-full" htmlFor="cv-d">
                Daily contract rate (₹)
              </Label>
              <Input id="cv-d" inputMode="decimal" value={dailyRate} onChange={(e) => setDailyRate(e.target.value)} />
            </div>
            <div>
              <Label className="mb-2 block w-full" htmlFor="cv-days">
                Billable days / month
              </Label>
              <Input id="cv-days" inputMode="decimal" value={billableDays} onChange={(e) => setBillableDays(e.target.value)} />
            </div>
          </div>
          <div>
            <Label className="mb-2 block w-full" htmlFor="cv-ctc">
              Permanent CTC (annual ₹)
            </Label>
            <Input id="cv-ctc" inputMode="decimal" value={ctcAnnual} onChange={(e) => setCtcAnnual(e.target.value)} />
          </div>
          <div>
            <Label className="mb-2 block w-full" htmlFor="cv-b">
              Non-cash benefits load (% of CTC)
            </Label>
            <Input id="cv-b" inputMode="decimal" value={benefitsPct} onChange={(e) => setBenefitsPct(e.target.value)} />
          </div>

          {out && (
            <div className="space-y-2 rounded-lg border border-border bg-muted/40 p-4 text-sm">
              <p>Contract annual: <strong>{formatINR(out.contractAnnual, 0)}</strong></p>
              <p className="text-muted-foreground">
                Adj. permanent (illustrative): {formatINR(out.effectivePermanent, 0)}
              </p>
              <p>
                Difference (contract − adj. perm):{" "}
                <strong>{formatINR(out.delta, 0)}</strong>
              </p>
            </div>
          )}

          <Button type="button" variant="secondary" onClick={() => { setDailyRate(""); setBillableDays("22"); setCtcAnnual(""); setBenefitsPct("15"); }}>
            Reset
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
