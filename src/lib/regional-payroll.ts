/** Rough monthly professional tax (₹); varies by slab — illustrative. */
export const STATE_PT_MONTHLY_ROUGH: Record<string, number> = {
  "Andhra Pradesh": 200,
  "Assam": 208,
  Bihar: 208,
  Gujarat: 200,
  Karnataka: 200,
  Kerala: 208,
  "Madhya Pradesh": 208,
  Maharashtra: 200,
  "National Capital Region": 200,
  Odisha: 200,
  Punjab: 200,
  "Tamil Nadu": 208,
  Telangana: 200,
  "Uttar Pradesh": 0,
  "West Bengal": 208,
  Other: 200,
};

/** ESI employee contribution rate (wage ceiling rules apply). */
export const ESI_EMPLOYEE_RATE = 0.0075;
/** Monthly gross ceiling for ESI applicability (common slab; verify current law). */
export const ESI_GROSS_CEILING = 21_000;

export function monthlyEsiEmployee(grossMonthly: number): number {
  if (grossMonthly <= 0 || grossMonthly > ESI_GROSS_CEILING) return 0;
  return Math.round(grossMonthly * ESI_EMPLOYEE_RATE * 100) / 100;
}
