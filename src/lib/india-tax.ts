/**
 * Illustrative India income-tax helpers for salaried residents (under 60).
 * Uses FY 2024–25 style slabs for new regime (115BAC) and classic old slabs.
 * Always verify with a qualified professional; rules and rebates change yearly.
 */

const CESS = 0.04;

/** Standard deduction for salary income */
export const STD_DED_NEW = 75_000;
export const STD_DED_OLD = 50_000;

function addCess(tax: number): number {
  return Math.round(tax * (1 + CESS));
}

/** Old regime: slabs on taxable income (after std ded + Chapter VI-A etc.) */
export function taxOldRegimeBase(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  let x = taxableIncome;
  let tax = 0;
  const b1 = Math.min(x, 250_000);
  tax += b1 * 0;
  x -= b1;
  const b2 = Math.min(x, 250_000);
  tax += b2 * 0.05;
  x -= b2;
  const b3 = Math.min(x, 500_000);
  tax += b3 * 0.2;
  x -= b3;
  tax += x * 0.3;
  return tax;
}

/** New regime: slabs on taxable income (after std deduction already applied to gross). */
export function taxNewRegimeBase(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  let x = taxableIncome;
  let tax = 0;
  const s0 = Math.min(x, 300_000);
  tax += s0 * 0;
  x -= s0;
  const s1 = Math.min(x, 400_000);
  tax += s1 * 0.05;
  x -= s1;
  const s2 = Math.min(x, 300_000);
  tax += s2 * 0.1;
  x -= s2;
  const s3 = Math.min(x, 200_000);
  tax += s3 * 0.15;
  x -= s3;
  const s4 = Math.min(x, 300_000);
  tax += s4 * 0.2;
  x -= s4;
  tax += x * 0.3;
  return tax;
}

export type TaxSummary = {
  gross: number;
  taxable: number;
  taxBeforeRebate: number;
  taxAfterCess: number;
  rebateApplied: boolean;
};

/**
 * Old regime: gross salary income minus standard deduction and extra deductions (80C etc.).
 */
export function summarizeOldRegime(
  grossSalary: number,
  extraDeductions: number
): TaxSummary {
  const taxable = Math.max(
    0,
    grossSalary - STD_DED_OLD - Math.max(0, extraDeductions)
  );
  const taxBeforeRebate = taxOldRegimeBase(taxable);
  return {
    gross: grossSalary,
    taxable,
    taxBeforeRebate,
    taxAfterCess: addCess(taxBeforeRebate),
    rebateApplied: false,
  };
}

/**
 * New regime: gross minus standard deduction; if taxable ≤ ₹7L, rebate often removes tax (simplified).
 */
export function summarizeNewRegime(grossSalary: number): TaxSummary {
  const taxable = Math.max(0, grossSalary - STD_DED_NEW);
  let taxBeforeRebate = taxNewRegimeBase(taxable);
  let rebateApplied = false;
  if (taxable <= 700_000 && taxBeforeRebate > 0) {
    taxBeforeRebate = 0;
    rebateApplied = true;
  }
  return {
    gross: grossSalary,
    taxable,
    taxBeforeRebate,
    taxAfterCess: addCess(taxBeforeRebate),
    rebateApplied,
  };
}
