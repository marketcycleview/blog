// 내 집 마련 타임라인 계산 모듈

export interface HomePurchaseInput {
  currentSavings: number; // 현재 자금 (원)
  monthlySaving: number; // 월 저축액 (원)
  savingsRate: number; // 저축 수익률 (%)
  targetPrice: number; // 목표 주택 가격 (원)
  loanRatio: number; // 대출 비율 (%)
  loanRate: number; // 대출 금리 (%)
  loanTermYears: number; // 대출 기간 (년)
}

export interface YearAccumulation {
  year: number;
  savings: number;
  loanCapacity: number;
  totalCapacity: number; // 자금 + 대출
  achievePercent: number;
}

export interface HomePurchaseResult {
  targetPrice: number;
  requiredDown: number; // 필요 자기자금
  loanAmount: number; // 대출 금액
  monthlyPayment: number; // 대출 월 상환액
  yearsToGoal: number | null; // 목표 달성까지 년수 (null이면 불가)
  accumulation: YearAccumulation[];
  summary: string;
}

export function calculateHomePurchase(input: HomePurchaseInput): HomePurchaseResult {
  const {
    currentSavings, monthlySaving, savingsRate, targetPrice,
    loanRatio, loanRate, loanTermYears,
  } = input;

  const loanAmount = Math.round(targetPrice * (loanRatio / 100));
  const requiredDown = targetPrice - loanAmount;

  // 대출 월 상환액 (원리금균등)
  const monthlyRate = loanRate / 100 / 12;
  const totalMonths = loanTermYears * 12;
  const monthlyPayment = loanAmount > 0 && monthlyRate > 0
    ? Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1))
    : loanAmount > 0 ? Math.round(loanAmount / totalMonths) : 0;

  // 자금 축적 시뮬레이션 (최대 30년)
  const accumulation: YearAccumulation[] = [];
  let savings = currentSavings;
  let yearsToGoal: number | null = null;
  const annualRate = savingsRate / 100;

  for (let y = 0; y <= 30; y++) {
    const totalCapacity = savings + loanAmount;
    const achievePercent = Math.min(100, Math.round((totalCapacity / targetPrice) * 100));
    accumulation.push({
      year: y,
      savings: Math.round(savings),
      loanCapacity: loanAmount,
      totalCapacity: Math.round(totalCapacity),
      achievePercent,
    });

    if (savings >= requiredDown && yearsToGoal === null) {
      yearsToGoal = y;
    }

    // 다음 해: 기존 자산 수익 + 월 저축
    savings = savings * (1 + annualRate) + monthlySaving * 12;
  }

  let summary: string;
  if (yearsToGoal === 0) {
    summary = `현재 자금만으로도 목표 주택(${Math.round(targetPrice / 10000).toLocaleString()}만원) 구입이 가능합니다. 대출 ${Math.round(loanAmount / 10000).toLocaleString()}만원 활용 시 월 ${Math.round(monthlyPayment / 10000).toLocaleString()}만원 상환이 필요합니다.`;
  } else if (yearsToGoal !== null) {
    summary = `약 ${yearsToGoal}년 후 자기자금 ${Math.round(requiredDown / 10000).toLocaleString()}만원이 마련됩니다. 대출 ${Math.round(loanAmount / 10000).toLocaleString()}만원 포함 시 목표 달성 가능합니다.`;
  } else {
    summary = `현재 저축 계획으로는 30년 내 목표 달성이 어렵습니다. 월 저축액 증가 또는 대출 비율 조정을 검토하세요.`;
  }

  return {
    targetPrice,
    requiredDown,
    loanAmount,
    monthlyPayment,
    yearsToGoal,
    accumulation,
    summary,
  };
}
