/** Illustrative HRA exemption (old regime style): min of three components. */

export type HraInputs = {
  basicMonthly: number;
  daMonthly: number;
  hraReceivedMonthly: number;
  rentPaidMonthly: number;
  isMetro: boolean;
};

export function hraExemptMonthly(input: HraInputs): {
  exempt: number;
  a: number;
  b: number;
  c: number;
} {
  const salary = Math.max(0, input.basicMonthly + input.daMonthly);
  const rentMinus10 = Math.max(0, input.rentPaidMonthly - 0.1 * salary);
  const pct = input.isMetro ? 0.5 : 0.4;
  const c = pct * salary;
  const a = Math.max(0, input.hraReceivedMonthly);
  const b = rentMinus10;
  const exempt = Math.min(a, b, c);
  return { exempt, a, b, c };
}
