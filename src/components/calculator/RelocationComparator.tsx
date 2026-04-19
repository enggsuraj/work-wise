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

import { CITY_COST_INDEX } from "@/constants";
import { formatINR, parseNum } from "@/lib/finance";

import { CalculatorHeading } from "@/components/common/CalculatorHeading";

const cities = Object.keys(CITY_COST_INDEX).sort();

export default function RelocationComparator() {
  const [from, setFrom] = useState("Bengaluru");
  const [to, setTo] = useState("Mumbai");
  const [ctc, setCtc] = useState("");

  const suggestion = useMemo(() => {
    const annual = parseNum(ctc);
    if (annual === null || annual <= 0) return null;
    const i0 = CITY_COST_INDEX[from] ?? 100;
    const i1 = CITY_COST_INDEX[to] ?? 100;
    if (i0 <= 0) return null;
    const ratio = i1 / i0;
    return { ratio, target: annual * ratio };
  }, [from, to, ctc]);

  return (
    <main className="p-6 pt-0">
      <Card className="mx-auto w-full max-w-2xl rounded-2xl p-4 shadow-lg sm:p-6 lg:p-8">
        <CalculatorHeading className="mb-2">RELOCATION &amp; COST OF LIVING</CalculatorHeading>
        <p className="mb-4 text-center text-xs text-muted-foreground">
          Simple index ratio between cities (Bengaluru = 100). For negotiation ballpark only.
        </p>
        <CardContent className="space-y-4 px-0">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2 block w-full">Current city</Label>
              <Select value={from} onValueChange={setFrom}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {cities.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block w-full">New city</Label>
              <Select value={to} onValueChange={setTo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {cities.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="mb-2 block w-full" htmlFor="reloc-ctc">
              Current annual CTC (₹)
            </Label>
            <Input
              id="reloc-ctc"
              inputMode="decimal"
              value={ctc}
              onChange={(e) => setCtc(e.target.value)}
            />
          </div>

          {suggestion && (
            <div className="rounded-lg border border-border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">Index ratio ({from} → {to})</p>
              <p className="text-xl font-semibold">{suggestion.ratio.toFixed(3)}×</p>
              <p className="mt-3 text-sm text-muted-foreground">Comparable CTC (rough)</p>
              <p className="text-2xl font-bold text-primary">
                {formatINR(suggestion.target, 0)}
              </p>
            </div>
          )}

          <Button type="button" variant="secondary" onClick={() => setCtc("")}>
            Reset amount
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
