/** Future value of monthly contributions at end of each month. */
export function futureValueMonthlyAnnuity(
  monthlyPayment: number,
  annualRate: number,
  years: number
): number {
  if (years <= 0 || monthlyPayment <= 0) return 0;
  const r = annualRate / 12;
  const n = years * 12;
  if (r === 0) return monthlyPayment * n;
  return monthlyPayment * ((Math.pow(1 + r, n) - 1) / r);
}

export function formatINR(value: number, fractionDigits = 0): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(value);
}

export function parseNum(s: string): number | null {
  const n = parseFloat(s.replace(/,/g, "").trim());
  return Number.isFinite(n) ? n : null;
}
