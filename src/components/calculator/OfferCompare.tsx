"use client";

import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { formatINR, parseNum } from "@/lib/finance";

import { CalculatorHeading } from "@/components/common/CalculatorHeading";

type OfferDraft = {
  name: string;
  monthlyFixed: string;
  variablePct: string;
  joinBonus: string;
  joinBonusYear: string;
  equityTotal: string;
  vestYears: string;
};

const defaultOffer = (name: string): OfferDraft => ({
  name,
  monthlyFixed: "",
  variablePct: "15",
  joinBonus: "",
  joinBonusYear: "1",
  equityTotal: "",
  vestYears: "4",
});

function fourYearTotalFromOffer(o: OfferDraft): number | null {
  const m = parseNum(o.monthlyFixed);
  const pct = (parseNum(o.variablePct) ?? 0) / 100;
  const jb = parseNum(o.joinBonus) ?? 0;
  const jbY = Math.min(4, Math.max(1, Math.floor(parseNum(o.joinBonusYear) ?? 1)));
  const eq = parseNum(o.equityTotal) ?? 0;
  const vy = Math.max(1, Math.floor(parseNum(o.vestYears) ?? 4));
  if (m === null || m <= 0) return null;

  const annualFixed = m * 12;
  const annualVar = annualFixed * pct;
  const eqPerYear = eq / vy;

  let sum = 0;
  for (let y = 1; y <= 4; y++) {
    const bonusAlloc = y === jbY ? jb : 0;
    const equityAlloc = y <= vy ? eqPerYear : 0;
    sum += annualFixed + annualVar + bonusAlloc + equityAlloc;
  }
  return sum;
}

function yearOneCash(o: OfferDraft): number | null {
  const m = parseNum(o.monthlyFixed);
  const pct = (parseNum(o.variablePct) ?? 0) / 100;
  const jb = parseNum(o.joinBonus) ?? 0;
  const jbY = Math.min(4, Math.max(1, Math.floor(parseNum(o.joinBonusYear) ?? 1)));
  const eq = parseNum(o.equityTotal) ?? 0;
  const vy = Math.max(1, Math.floor(parseNum(o.vestYears) ?? 4));
  if (m === null || m <= 0) return null;

  const annualFixed = m * 12;
  const annualVar = annualFixed * pct;
  const eqPerYear = eq / vy;
  const bonusAlloc = jbY === 1 ? jb : 0;
  const equityAlloc = vy >= 1 ? eqPerYear : 0;
  return annualFixed + annualVar + bonusAlloc + equityAlloc;
}

export default function OfferCompare() {
  const [offerA, setOfferA] = useState<OfferDraft>(() => defaultOffer("Offer A"));
  const [offerB, setOfferB] = useState<OfferDraft>(() => defaultOffer("Offer B"));
  const [offerC, setOfferC] = useState<OfferDraft>(() => defaultOffer("Offer C"));
  const [showThird, setShowThird] = useState(false);

  const metrics = useMemo(() => {
    const list = showThird
      ? [
          { key: "a" as const, label: offerA.name || "Offer A", o: offerA },
          { key: "b" as const, label: offerB.name || "Offer B", o: offerB },
          { key: "c" as const, label: offerC.name || "Offer C", o: offerC },
        ]
      : [
          { key: "a" as const, label: offerA.name || "Offer A", o: offerA },
          { key: "b" as const, label: offerB.name || "Offer B", o: offerB },
        ];

    const y1 = list.map((x) => yearOneCash(x.o));
    const y4 = list.map((x) => fourYearTotalFromOffer(x.o));

    const maxY1 = Math.max(...y1.map((v) => (v != null ? v : -Infinity)), -Infinity);
    const maxY4 = Math.max(...y4.map((v) => (v != null ? v : -Infinity)), -Infinity);

    return { list, y1, y4, maxY1, maxY4 };
  }, [offerA, offerB, offerC, showThird]);

  const patch = (
    which: "a" | "b" | "c",
    patchIn: Partial<OfferDraft>
  ) => {
    const fn =
      which === "a"
        ? setOfferA
        : which === "b"
          ? setOfferB
          : setOfferC;
    fn((prev) => ({ ...prev, ...patchIn }));
  };

  const resetAll = () => {
    setOfferA(defaultOffer("Offer A"));
    setOfferB(defaultOffer("Offer B"));
    setOfferC(defaultOffer("Offer C"));
    setShowThird(false);
  };

  return (
    <div className="flex w-full flex-col items-center pt-0">
      <Card className="w-full max-w-5xl rounded-2xl p-4 shadow-lg sm:p-6 lg:p-8">
        <CalculatorHeading className="mb-2">OFFER COMPARISON</CalculatorHeading>
        <p className="mb-4 text-center text-xs text-muted-foreground">
          Same model as{" "}
          <a
            href="/offer-decoder"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            Offer decoder
          </a>
          . For one offer’s year-by-year rows, use that tool.
        </p>

        <div className="mb-4 flex items-center gap-2">
          <Checkbox
            id="oc-third"
            checked={showThird}
            onCheckedChange={(c) => setShowThird(c === true)}
          />
          <Label htmlFor="oc-third" className="cursor-pointer text-sm font-normal">
            Compare three offers
          </Label>
        </div>

        <div
          className={`grid gap-4 ${
            showThird ? "md:grid-cols-3" : "md:grid-cols-2"
          }`}
        >
          {(["a", "b", "c"] as const)
            .filter((k) => k !== "c" || showThird)
            .map((which) => {
              const o = which === "a" ? offerA : which === "b" ? offerB : offerC;
              const id = `oc-${which}-`;
              return (
                <Card
                  key={which}
                  className="border-border bg-card shadow-sm"
                >
                  <CardContent className="space-y-3 p-4 pt-4">
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">
                      Column {which.toUpperCase()}
                    </Label>
                    <div>
                      <Label htmlFor={`${id}name`} className="text-xs">
                        Label
                      </Label>
                      <Input
                        id={`${id}name`}
                        value={o.name}
                        onChange={(e) => patch(which, { name: e.target.value })}
                        placeholder={which === "a" ? "Offer A" : which === "b" ? "Offer B" : "Offer C"}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${id}fixed`} className="text-xs">
                        Monthly fixed (₹)
                      </Label>
                      <Input
                        id={`${id}fixed`}
                        inputMode="decimal"
                        value={o.monthlyFixed}
                        onChange={(e) => patch(which, { monthlyFixed: e.target.value })}
                        placeholder="e.g. 150000"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${id}var`} className="text-xs">
                        Variable (% of annual fixed)
                      </Label>
                      <Input
                        id={`${id}var`}
                        inputMode="decimal"
                        value={o.variablePct}
                        onChange={(e) => patch(which, { variablePct: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${id}jb`} className="text-xs">
                        One-time joining bonus (₹)
                      </Label>
                      <Input
                        id={`${id}jb`}
                        inputMode="decimal"
                        value={o.joinBonus}
                        onChange={(e) => patch(which, { joinBonus: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${id}jby`} className="text-xs">
                        Bonus in year (1–4)
                      </Label>
                      <Input
                        id={`${id}jby`}
                        inputMode="numeric"
                        value={o.joinBonusYear}
                        onChange={(e) => patch(which, { joinBonusYear: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${id}eq`} className="text-xs">
                        Total equity value (₹, illustrative)
                      </Label>
                      <Input
                        id={`${id}eq`}
                        inputMode="decimal"
                        value={o.equityTotal}
                        onChange={(e) => patch(which, { equityTotal: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${id}vy`} className="text-xs">
                        Vesting (years)
                      </Label>
                      <Input
                        id={`${id}vy`}
                        inputMode="decimal"
                        value={o.vestYears}
                        onChange={(e) => patch(which, { vestYears: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>

        <div className="mt-6 overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[280px] text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 font-medium">Metric</th>
                {metrics.list.map((x) => (
                  <th key={x.key} className="p-3 font-medium">
                    {x.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3 text-muted-foreground">Year 1 total (modelled)</td>
                {metrics.list.map((x, i) => {
                  const v = metrics.y1[i];
                  const best =
                    v != null && metrics.maxY1 !== -Infinity && v === metrics.maxY1;
                  return (
                    <td
                      key={x.key}
                      className={`p-3 font-semibold ${best ? "bg-primary/10 text-primary" : ""}`}
                    >
                      {v != null ? formatINR(v, 0) : "—"}
                    </td>
                  );
                })}
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 text-muted-foreground">Four-year total (modelled)</td>
                {metrics.list.map((x, i) => {
                  const v = metrics.y4[i];
                  const best =
                    v != null && metrics.maxY4 !== -Infinity && v === metrics.maxY4;
                  return (
                    <td
                      key={x.key}
                      className={`p-3 font-semibold ${best ? "bg-primary/10 text-primary" : ""}`}
                    >
                      {v != null ? formatINR(v, 0) : "—"}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Highlights show the largest figure in each row among offers with valid monthly fixed. Cliff,
          taxes, and performance variable are not modelled.
        </p>

        <Button type="button" variant="outline" className="mt-4" onClick={resetAll}>
          Reset all
        </Button>
      </Card>
    </div>
  );
}
