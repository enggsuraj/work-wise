"use client";

import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { formatINR, parseNum } from "@/lib/finance";

import { CalculatorHeading } from "@/components/common/CalculatorHeading";

function addDays(isoDate: string, days: number): Date | null {
  if (!isoDate) return null;
  const d = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  d.setDate(d.getDate() + days);
  return d;
}

export default function GardenLeavePlanner() {
  const [start, setStart] = useState("");
  const [noticeDays, setNoticeDays] = useState("");
  const [leaveDays, setLeaveDays] = useState("0");
  const [monthly, setMonthly] = useState("");

  const plan = useMemo(() => {
    const n = parseNum(noticeDays);
    const lv = parseNum(leaveDays) ?? 0;
    if (!start || n === null || n < 0) return null;
    const lwd = addDays(start, n);
    if (!lwd) return null;
    const m = parseNum(monthly);
    const fullNoticePay =
      m !== null && m > 0 ? (m / 30) * n : null;
    return { lwd, n, lv, fullNoticePay };
  }, [start, noticeDays, leaveDays, monthly]);

  return (
    <main className="p-6 pt-0">
      <Card className="mx-auto w-full max-w-2xl rounded-2xl p-4 shadow-lg sm:p-6 lg:p-8">
        <CalculatorHeading className="mb-2">GARDEN LEAVE / NOTICE OVERLAP</CalculatorHeading>
        <p className="mb-4 text-center text-xs text-muted-foreground">
          Last working day = resignation date + full notice calendar days. If you take paid leave
          during notice, many employers still pay for the whole notice window—confirm with HR. Rough
          pay shown only if you assume pay stops for leave days (uncommon).
        </p>
        <CardContent className="space-y-4 px-0">
          <div>
            <Label className="mb-2 block w-full" htmlFor="gl-start">
              Resignation / notice start date
            </Label>
            <Input
              id="gl-start"
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="mb-2 block w-full" htmlFor="gl-notice">
                Notice period (calendar days)
              </Label>
              <Input
                id="gl-notice"
                inputMode="numeric"
                value={noticeDays}
                onChange={(e) => setNoticeDays(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2 block w-full" htmlFor="gl-leave">
                Planned leave days inside notice
              </Label>
              <Input
                id="gl-leave"
                inputMode="numeric"
                value={leaveDays}
                onChange={(e) => setLeaveDays(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label className="mb-2 block w-full" htmlFor="gl-pay">
              Monthly gross (optional, for rough pay line)
            </Label>
            <Input
              id="gl-pay"
              inputMode="decimal"
              value={monthly}
              onChange={(e) => setMonthly(e.target.value)}
            />
          </div>

          {plan && (
            <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-4 text-sm">
              <p>
                <span className="text-muted-foreground">Last working day: </span>
                <strong>
                  {plan.lwd.toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </strong>
              </p>
              <p className="text-muted-foreground">
                Notice spans {plan.n} calendar day(s). You indicated {plan.lv} leave day(s) inside
                that window—policy may still pay full notice.
              </p>
              {plan.fullNoticePay !== null && (
                <p>
                  <span className="text-muted-foreground">
                    Approx. gross for notice window (₹/30 × days, if fully paid):{" "}
                  </span>
                  <strong>{formatINR(plan.fullNoticePay, 0)}</strong>
                </p>
              )}
            </div>
          )}

          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setStart("");
              setNoticeDays("");
              setLeaveDays("0");
              setMonthly("");
            }}
          >
            Reset
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
