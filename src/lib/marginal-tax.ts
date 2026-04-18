import { summarizeNewRegime, summarizeOldRegime } from "@/lib/india-tax";

/** Extra annual tax when `bonusAnnual` is added to salary (same FY). */
export function marginalTaxOnBonus(
  annualSalary: number,
  bonusAnnual: number,
  regime: "old" | "new",
  chapter6ADeductionsOld: number
): { extraTax: number; effectiveRate: number } {
  if (bonusAnnual <= 0) return { extraTax: 0, effectiveRate: 0 };
  if (regime === "new") {
    const t0 = summarizeNewRegime(annualSalary).taxAfterCess;
    const t1 = summarizeNewRegime(annualSalary + bonusAnnual).taxAfterCess;
    const extraTax = t1 - t0;
    return {
      extraTax,
      effectiveRate: bonusAnnual > 0 ? extraTax / bonusAnnual : 0,
    };
  }
  const t0 = summarizeOldRegime(annualSalary, chapter6ADeductionsOld).taxAfterCess;
  const t1 = summarizeOldRegime(annualSalary + bonusAnnual, chapter6ADeductionsOld)
    .taxAfterCess;
  const extraTax = t1 - t0;
  return {
    extraTax,
    effectiveRate: bonusAnnual > 0 ? extraTax / bonusAnnual : 0,
  };
}
