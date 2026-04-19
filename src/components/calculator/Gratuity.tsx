"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

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
import { Checkbox } from "@/components/ui/checkbox";

import { CalculatorHeading } from "@/components/common/CalculatorHeading";

/** Section 10(10) tax exemption ceiling (commonly cited; verify with current law). */
const TAX_EXEMPT_GRATUITY_CAP = 20_00_000;

/** Completed years: fraction beyond full years — if &gt; 6 months, count as one full year (common rule). */
function completedYearsForGratuity(fullYears: number, extraMonths: number): number {
  return fullYears + (extraMonths > 6 ? 1 : 0);
}

type EmploymentKind = "permanent" | "fte";

export default function GratuityCalculator() {
  const [salary, setSalary] = useState<string>("");
  const [monthlyCtc, setMonthlyCtc] = useState<string>("");
  const [applyWageFloor, setApplyWageFloor] = useState(false);
  const [employmentKind, setEmploymentKind] = useState<EmploymentKind>("permanent");
  const [years, setYears] = useState<string>("5");
  const [months, setMonths] = useState<string>("0");
  const [coveredUnderAct, setCoveredUnderAct] = useState(true);
  const [gratuity, setGratuity] = useState<string>("");

  const formatNumberWithCommas = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(value))) {
      setSalary(formatNumberWithCommas(value));
    }
  };

  const handleCtcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(value))) {
      setMonthlyCtc(formatNumberWithCommas(value));
    }
  };

  const divisor = coveredUnderAct ? 26 : 30;

  /** Wage base for gratuity: Basic+DA, optionally floored at 50% of monthly CTC (wage-code style check). */
  function effectiveWageForGratuity(basicDa: number): number {
    const ctc = parseFloat(monthlyCtc.replace(/,/g, ""));
    if (applyWageFloor && Number.isFinite(ctc) && ctc > 0) {
      return Math.max(basicDa, 0.5 * ctc);
    }
    return basicDa;
  }

  const calculateGratuity = () => {
    const salaryValue = parseFloat(salary.replace(/,/g, ""));
    const yearsValue = parseInt(years, 10);
    const monthsValue = parseInt(months, 10);

    if (isNaN(salaryValue) || isNaN(yearsValue) || isNaN(monthsValue)) return;

    const wageUsed = effectiveWageForGratuity(salaryValue);
    const workingYears = completedYearsForGratuity(yearsValue, monthsValue);
    const gratuityAmount = (15 * wageUsed * workingYears) / divisor;
    setGratuity(formatNumberWithCommas(gratuityAmount.toFixed(2)));
  };

  const resetCalculator = () => {
    setSalary("");
    setMonthlyCtc("");
    setApplyWageFloor(false);
    setEmploymentKind("permanent");
    setYears("5");
    setMonths("0");
    setCoveredUnderAct(true);
    setGratuity("");
  };

  const parsedGratuity = useMemo(() => {
    const n = parseFloat(gratuity.replace(/,/g, ""));
    return Number.isFinite(n) ? n : null;
  }, [gratuity]);

  const canCalculate = salary.trim() !== "" && years !== "" && months !== "";

  const wageFloorActive = useMemo(() => {
    const basicDa = parseFloat(salary.replace(/,/g, ""));
    const ctc = parseFloat(monthlyCtc.replace(/,/g, ""));
    if (!applyWageFloor || !Number.isFinite(basicDa) || !Number.isFinite(ctc) || ctc <= 0) {
      return false;
    }
    return basicDa < 0.5 * ctc;
  }, [salary, monthlyCtc, applyWageFloor]);

  const yearsNum = parseInt(years, 10);
  const monthsNum = parseInt(months, 10);
  const workingYearsPreview = completedYearsForGratuity(
    Number.isFinite(yearsNum) ? yearsNum : 0,
    Number.isFinite(monthsNum) ? monthsNum : 0
  );

  return (
    <div className="flex w-full justify-center bg-gray-100 py-2 dark:bg-background sm:py-4">
      <Card className="w-full max-w-2xl rounded-2xl p-4 shadow-lg sm:p-6 lg:p-8">
        <CalculatorHeading>GRATUITY CALCULATOR</CalculatorHeading>

        <div className="mb-4 space-y-2 rounded-md border border-border bg-muted/40 p-3 text-left text-xs text-muted-foreground">
          <p>
            <strong className="text-foreground">Payment of Gratuity Act, 1972</strong> usually covers
            establishments with <strong>10 or more employees</strong>. Updates under the{" "}
            <strong>Code on Social Security, 2020</strong> are widely discussed as effective from{" "}
            <strong>21 Nov 2025</strong> (see overview below). Typically{" "}
            <strong>5 years</strong> continuous service for permanent employees;{" "}
            <strong>fixed-term</strong> workers may qualify after about <strong>1 year</strong> under
            the new framing. Death/disablement: special rules apply. Some policies treat{" "}
            <strong>4 years 240 days</strong> as completing five years—confirm with your employer.
          </p>
          <p>
            Under the new rules summary, <strong>wages</strong> for gratuity should reflect at least{" "}
            <strong>50% of CTC</strong>; this tool uses <strong>last drawn Basic + DA</strong>, with an
            optional <strong>50% of monthly CTC</strong> floor when enabled. Gratuity is often{" "}
            <strong>tax-exempt up to ₹20 lakh</strong> under Section 10(10); confirm with HR / a CA.
          </p>
          <p>
            Reference:{" "}
            <a
              href="https://www.bajajfinserv.in/investments/gratuity-rules"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              Gratuity rules — Bajaj Finserv
            </a>
            {" · "}
            <Link
              href="/blog/gratuity-rules-fixed-term-india"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              Fixed-term &amp; contract overview
            </Link>
            .
          </p>
        </div>

        <Label className="mb-2 block text-sm font-medium">Employment type (for eligibility notes)</Label>
        <Select
          value={employmentKind}
          onValueChange={(v) => setEmploymentKind(v as EmploymentKind)}
        >
          <SelectTrigger className="mb-3 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="permanent">Permanent / open-ended</SelectItem>
            <SelectItem value="fte">Fixed-term (FTE) / short contract</SelectItem>
          </SelectContent>
        </Select>
        {employmentKind === "fte" ? (
          <p className="mb-4 text-xs text-muted-foreground">
            Under widely discussed Code rules, fixed-term hires may get <strong>pro-rata</strong>{" "}
            gratuity after about <strong>one year</strong> — confirm wording in your appointment
            letter and notifications for your establishment.
          </p>
        ) : (
          <p className="mb-4 text-xs text-muted-foreground">
            Usual rule for permanent staff: <strong>5 years</strong> continuous service (with
            exceptions e.g. death/disablement). If you have under 5 years, payout may be nil under
            classic rules — use <strong>Fixed-term</strong> above if that matches your role.
          </p>
        )}

        <Label className="mb-2 block text-sm font-medium">
          Last drawn salary — Basic + Dearness Allowance (₹ / month)
        </Label>
        <Input
          type="text"
          placeholder="e.g. 75000"
          value={salary}
          onChange={handleSalaryChange}
          className="mb-4"
        />

        <Label className="mb-2 block text-sm font-medium">
          Monthly CTC (optional — for 50% wage floor)
        </Label>
        <Input
          type="text"
          placeholder="e.g. 80000"
          value={monthlyCtc}
          onChange={handleCtcChange}
          className="mb-2"
        />
        <div className="mb-4 flex w-full min-w-0 items-start gap-2">
          <Checkbox
            id="grat-wage-floor"
            checked={applyWageFloor}
            onCheckedChange={(c) => setApplyWageFloor(c === true)}
            disabled={monthlyCtc.replace(/,/g, "").trim() === ""}
            className="mt-0.5"
          />
          <Label
            htmlFor="grat-wage-floor"
            className="block w-full min-w-0 cursor-pointer text-left text-sm font-normal leading-snug"
          >
            Use <strong>max(Basic+DA, 50% of CTC)</strong> as wages for this estimate (aligns with
            common wage-code “50%” checks; verify your structure).
          </Label>
        </div>

        <div className="mb-4 flex w-full min-w-0 items-start gap-2">
          <Checkbox
            id="grat-covered"
            checked={coveredUnderAct}
            onCheckedChange={(c) => setCoveredUnderAct(c === true)}
            className="mt-0.5"
          />
          <Label
            htmlFor="grat-covered"
            className="block w-full min-w-0 cursor-pointer text-left text-sm font-normal leading-snug"
          >
            Establishment <strong>covered</strong> under the Payment of Gratuity Act (use ÷
            <strong>26</strong> on last drawn Basic+DA). Uncheck for the ÷<strong>30</strong> variant
            used when <strong>not</strong> covered — often based on <strong>average wages over the last
            10 months</strong>; this field still uses one monthly figure as a shortcut (see your
            employer).
          </Label>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <Label className="mb-2 block text-sm font-medium">Full years of service</Label>
            <Select value={years} onValueChange={setYears}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Years" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {[...Array(51)].map((_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    {i} years
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-1/2">
            <Label className="mb-2 block text-sm font-medium">Additional months (0–11)</Label>
            <Select value={months} onValueChange={setMonths}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[...Array(12)].map((_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    {i} months
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="mt-2 text-xs text-muted-foreground">
          Tenure rounding: if extra months <strong>&gt; 6</strong>, that period is counted as one
          full year (e.g. 11 years 8 months → 12 years), per common gratuity rounding.
        </p>

        <div className="mt-4 flex w-full gap-2">
          <Button
            onClick={calculateGratuity}
            className={`flex-1 text-white ${
              canCalculate ? "cursor-pointer bg-green-600 hover:bg-green-700" : "bg-gray-400"
            }`}
            disabled={!canCalculate}
          >
            Calculate gratuity
          </Button>
          <Button
            onClick={resetCalculator}
            variant="outline"
            className="cursor-pointer"
          >
            Reset
          </Button>
        </div>

        {gratuity && (
          <CardContent className="mt-4 text-center text-lg">
            <Label className="mb-2 block text-sm font-medium">
              Estimated gratuity
            </Label>
            <p className="text-2xl font-bold text-green-700 dark:text-green-500">₹ {gratuity}</p>
            {wageFloorActive && (
              <p className="mt-2 text-xs text-left text-muted-foreground">
                Wage base used: <strong>50% of CTC</strong> (higher than Basic+DA entered).
              </p>
            )}
            <p className="mt-2 text-sm text-muted-foreground">
              (15 × wage for calculation × completed years) ÷ {divisor}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Completed years for this estimate:{" "}
              <strong>
                {completedYearsForGratuity(parseInt(years, 10), parseInt(months, 10))}
              </strong>{" "}
              (from {years}y {months}m)
            </p>
            {employmentKind === "permanent" && workingYearsPreview < 5 && (
              <p className="mt-2 rounded-md border border-amber-200 bg-amber-50 p-2 text-left text-xs text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
                With under 5 completed years, many permanent employees have <strong>no</strong>{" "}
                gratuity under classic rules — this number is illustrative only; check your policy.
              </p>
            )}
            {employmentKind === "fte" && workingYearsPreview < 1 && (
              <p className="mt-2 rounded-md border border-amber-200 bg-amber-50 p-2 text-left text-xs text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
                Under one year of service: fixed-term eligibility often starts around{" "}
                <strong>one year</strong> — confirm before relying on this estimate.
              </p>
            )}
            {parsedGratuity != null && parsedGratuity > TAX_EXEMPT_GRATUITY_CAP && (
              <p className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-2 text-xs text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
                Amount exceeds the commonly cited <strong>₹20 lakh</strong> tax-exemption ceiling;
                the excess may be taxable unless your employer / scheme says otherwise.
              </p>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}
