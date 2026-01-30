// 은퇴자금 시뮬레이터 계산 모듈

export interface RetirementInput {
  currentAge: number;
  retireAge: number;
  lifeExpectancy: number; // 기대수명
  currentSavings: number; // 현재 보유 자산 (원)
  monthlyContribution: number; // 월 저축액 (원)
  expectedReturnRate: number; // 예상 수익률 (%)
  inflationRate: number; // 물가상승률 (%)
  monthlyExpense: number; // 은퇴 후 월 생활비 (원)
  pensionMonthly: number; // 국민연금 예상 월 수령액 (원)
}

export interface RetirementYearData {
  age: number;
  asset: number; // 해당 나이 시점 자산
}

export interface RetirementResult {
  retireAsset: number; // 은퇴 시점 예상 자산
  totalNeeded: number; // 은퇴 후 필요 총액
  pensionTotal: number; // 연금 총 수령액
  shortage: number; // 부족분 (음수면 여유)
  depletionAge: number | null; // 자산 소진 나이 (null이면 소진 안 됨)
  yearlyData: RetirementYearData[]; // 나이별 자산 추이
  monthlyShortage: number; // 월 추가 저축 필요액
  scenarios: {
    optimistic: { retireAsset: number; depletionAge: number | null };
    normal: { retireAsset: number; depletionAge: number | null };
    pessimistic: { retireAsset: number; depletionAge: number | null };
  };
}

function simulateAssets(
  currentAge: number,
  retireAge: number,
  lifeExpectancy: number,
  currentSavings: number,
  monthlyContribution: number,
  annualReturn: number,
  monthlyExpense: number,
  pensionMonthly: number,
  inflationRate: number
): { yearlyData: RetirementYearData[]; depletionAge: number | null; retireAsset: number } {
  const yearlyData: RetirementYearData[] = [];
  let asset = currentSavings;
  const monthlyReturn = annualReturn / 100 / 12;
  let depletionAge: number | null = null;
  let retireAsset = 0;

  for (let age = currentAge; age <= lifeExpectancy; age++) {
    yearlyData.push({ age, asset: Math.round(asset) });

    if (age < retireAge) {
      // 축적 단계: 월 저축 + 수익률
      for (let m = 0; m < 12; m++) {
        asset = asset * (1 + monthlyReturn) + monthlyContribution;
      }
    } else {
      if (age === retireAge) retireAsset = Math.round(asset);
      // 인출 단계: 월 생활비 - 연금 + 수익률(보수적)
      const yearsRetired = age - retireAge;
      const inflatedExpense = monthlyExpense * Math.pow(1 + inflationRate / 100, yearsRetired);
      const monthlyWithdraw = inflatedExpense - pensionMonthly;
      const retiredReturn = Math.max(0, annualReturn - 1) / 100 / 12; // 은퇴 후 보수적 운용
      for (let m = 0; m < 12; m++) {
        asset = asset * (1 + retiredReturn) - Math.max(0, monthlyWithdraw);
      }
      if (asset <= 0 && depletionAge === null) {
        depletionAge = age;
        asset = 0;
      }
    }
  }

  return { yearlyData, depletionAge, retireAsset };
}

export function calculateRetirementFund(input: RetirementInput): RetirementResult {
  const {
    currentAge, retireAge, lifeExpectancy, currentSavings,
    monthlyContribution, expectedReturnRate, inflationRate,
    monthlyExpense, pensionMonthly,
  } = input;

  // 기본 시뮬레이션
  const normal = simulateAssets(
    currentAge, retireAge, lifeExpectancy, currentSavings,
    monthlyContribution, expectedReturnRate, monthlyExpense,
    pensionMonthly, inflationRate
  );

  // 낙관적 (+2%)
  const optimistic = simulateAssets(
    currentAge, retireAge, lifeExpectancy, currentSavings,
    monthlyContribution, expectedReturnRate + 2, monthlyExpense,
    pensionMonthly, inflationRate
  );

  // 비관적 (-2%)
  const pessimistic = simulateAssets(
    currentAge, retireAge, lifeExpectancy, currentSavings,
    monthlyContribution, Math.max(0, expectedReturnRate - 2), monthlyExpense,
    pensionMonthly, inflationRate
  );

  // 은퇴 후 필요 총액
  const retireYears = lifeExpectancy - retireAge;
  let totalNeeded = 0;
  for (let y = 0; y < retireYears; y++) {
    totalNeeded += monthlyExpense * Math.pow(1 + inflationRate / 100, y) * 12;
  }
  totalNeeded = Math.round(totalNeeded);

  const pensionTotal = Math.round(pensionMonthly * 12 * retireYears);

  // 부족분
  const shortage = Math.round(totalNeeded - pensionTotal - normal.retireAsset);

  // 월 추가 저축 필요액
  let monthlyShortage = 0;
  if (shortage > 0) {
    const monthsToRetire = (retireAge - currentAge) * 12;
    if (monthsToRetire > 0) {
      const monthlyRate = expectedReturnRate / 100 / 12;
      if (monthlyRate > 0) {
        // 미래가치 공식 역산: FV = PMT * ((1+r)^n - 1) / r
        const factor = (Math.pow(1 + monthlyRate, monthsToRetire) - 1) / monthlyRate;
        monthlyShortage = Math.round(shortage / factor);
      } else {
        monthlyShortage = Math.round(shortage / monthsToRetire);
      }
    }
  }

  return {
    retireAsset: normal.retireAsset,
    totalNeeded,
    pensionTotal,
    shortage,
    depletionAge: normal.depletionAge,
    yearlyData: normal.yearlyData,
    monthlyShortage: Math.max(0, monthlyShortage),
    scenarios: {
      optimistic: { retireAsset: optimistic.retireAsset, depletionAge: optimistic.depletionAge },
      normal: { retireAsset: normal.retireAsset, depletionAge: normal.depletionAge },
      pessimistic: { retireAsset: pessimistic.retireAsset, depletionAge: pessimistic.depletionAge },
    },
  };
}
