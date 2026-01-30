// 국민연금 수령시기별 비교 모듈

export interface PensionInput {
  currentAge: number;
  expectedMonthly: number; // 예상 월 수령액 (정상 수령 기준)
  normalAge: number; // 정상 수령 개시 나이 (기본 65세)
}

export interface PensionScenario {
  label: string;
  startAge: number;
  adjustment: number; // 감액/증액 비율 (%)
  monthlyAmount: number;
  totalAt80: number;
  totalAt85: number;
  totalAt90: number;
}

export interface PensionComparisonResult {
  early: PensionScenario;
  normal: PensionScenario;
  deferred: PensionScenario;
  breakevenEarlyVsNormal: number; // 정상이 조기보다 유리해지는 나이
  breakevenNormalVsDeferred: number; // 연기가 정상보다 유리해지는 나이
  recommendation: string;
}

function calcTotal(monthlyAmount: number, startAge: number, endAge: number): number {
  const months = Math.max(0, (endAge - startAge) * 12);
  return monthlyAmount * months;
}

function findBreakeven(amount1: number, start1: number, amount2: number, start2: number): number {
  // 누적 수령액이 같아지는 나이 찾기
  let total1 = 0;
  let total2 = 0;
  const maxAge = 100;

  for (let age = Math.min(start1, start2); age <= maxAge; age++) {
    if (age >= start1) total1 += amount1 * 12;
    if (age >= start2) total2 += amount2 * 12;

    if (total2 > total1 && age > start2) return age;
  }
  return maxAge;
}

export function calculatePensionComparison(input: PensionInput): PensionComparisonResult {
  const { expectedMonthly, normalAge } = input;

  const earlyAge = normalAge - 5;
  const deferredAge = normalAge + 5;

  // 조기수령: 1년당 6% 감액 → 5년 조기 = 30% 감액
  const earlyReduction = 0.30;
  const earlyMonthly = Math.round(expectedMonthly * (1 - earlyReduction));

  // 연기수령: 1년당 7.2% 증액 → 5년 연기 = 36% 증액
  const deferredIncrease = 0.36;
  const deferredMonthly = Math.round(expectedMonthly * (1 + deferredIncrease));

  const early: PensionScenario = {
    label: "조기수령",
    startAge: earlyAge,
    adjustment: -30,
    monthlyAmount: earlyMonthly,
    totalAt80: calcTotal(earlyMonthly, earlyAge, 80),
    totalAt85: calcTotal(earlyMonthly, earlyAge, 85),
    totalAt90: calcTotal(earlyMonthly, earlyAge, 90),
  };

  const normal: PensionScenario = {
    label: "정상수령",
    startAge: normalAge,
    adjustment: 0,
    monthlyAmount: expectedMonthly,
    totalAt80: calcTotal(expectedMonthly, normalAge, 80),
    totalAt85: calcTotal(expectedMonthly, normalAge, 85),
    totalAt90: calcTotal(expectedMonthly, normalAge, 90),
  };

  const deferred: PensionScenario = {
    label: "연기수령",
    startAge: deferredAge,
    adjustment: 36,
    monthlyAmount: deferredMonthly,
    totalAt80: calcTotal(deferredMonthly, deferredAge, 80),
    totalAt85: calcTotal(deferredMonthly, deferredAge, 85),
    totalAt90: calcTotal(deferredMonthly, deferredAge, 90),
  };

  const breakevenEarlyVsNormal = findBreakeven(earlyMonthly, earlyAge, expectedMonthly, normalAge);
  const breakevenNormalVsDeferred = findBreakeven(expectedMonthly, normalAge, deferredMonthly, deferredAge);

  let recommendation = "";
  if (breakevenNormalVsDeferred <= 82) {
    recommendation = `평균 기대수명(약 83세)을 고려하면, 연기수령이 유리합니다. ${breakevenNormalVsDeferred}세 이후부터 연기수령의 누적 수령액이 더 커집니다.`;
  } else if (breakevenEarlyVsNormal <= 77) {
    recommendation = `건강에 자신이 있다면 정상수령을 권장합니다. ${breakevenEarlyVsNormal}세 이후부터 정상수령의 누적 수령액이 더 큽니다.`;
  } else {
    recommendation = `개인 건강 상태와 재정 상황에 따라 판단하세요. 당장 생활비가 필요하면 조기수령, 여유가 있다면 연기수령이 유리합니다.`;
  }

  return { early, normal, deferred, breakevenEarlyVsNormal, breakevenNormalVsDeferred, recommendation };
}
