// 퇴직금 계산기
// 근로기준법 기준

export interface SeveranceInput {
  startDate: string; // 입사일 (YYYY-MM-DD)
  endDate: string; // 퇴사일 (YYYY-MM-DD)
  last3MonthsSalary: number[]; // 최근 3개월 급여 (세전)
  annualBonus?: number; // 연간 상여금
  annualLeaveAllowance?: number; // 연차수당
}

export interface SeveranceResult {
  isEligible: boolean;
  eligibilityReason?: string;
  totalDays: number; // 총 재직일수
  totalYears: number; // 총 재직연수
  averageDailyWage: number; // 평균임금 (일급)
  severancePay: number; // 퇴직금
  yearlyBreakdown: Array<{
    year: number;
    amount: number;
  }>;
}

// 두 날짜 사이의 일수 계산
function getDaysBetween(start: Date, end: Date): number {
  const diffTime = end.getTime() - start.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// 퇴직금 계산
export function calculateSeverance(input: SeveranceInput): SeveranceResult {
  const { startDate, endDate, last3MonthsSalary, annualBonus = 0, annualLeaveAllowance = 0 } = input;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = getDaysBetween(start, end);

  // 1년 미만 근무 시 퇴직금 없음
  if (totalDays < 365) {
    return {
      isEligible: false,
      eligibilityReason: '1년 미만 근무 시 퇴직금 지급 대상이 아닙니다.',
      totalDays,
      totalYears: totalDays / 365,
      averageDailyWage: 0,
      severancePay: 0,
      yearlyBreakdown: [],
    };
  }

  const totalYears = totalDays / 365;

  // 평균임금 계산
  // 최근 3개월 급여 + (상여금의 3/12) + (연차수당의 3/12)
  const totalSalary = last3MonthsSalary.reduce((sum, s) => sum + s, 0);
  const bonusFor3Months = annualBonus * (3 / 12);
  const leaveAllowanceFor3Months = annualLeaveAllowance * (3 / 12);
  const total3MonthsWage = totalSalary + bonusFor3Months + leaveAllowanceFor3Months;

  // 평균임금 = 3개월 총급여 / 3개월 일수 (약 91일)
  const daysIn3Months = 91;
  const averageDailyWage = Math.floor(total3MonthsWage / daysIn3Months);

  // 퇴직금 = 평균임금 × 30일 × (재직일수 / 365)
  const severancePay = Math.floor(averageDailyWage * 30 * (totalDays / 365));

  // 연차별 breakdown
  const fullYears = Math.floor(totalYears);
  const yearlyAmount = Math.floor(averageDailyWage * 30);
  const yearlyBreakdown = [];

  for (let i = 1; i <= fullYears; i++) {
    yearlyBreakdown.push({
      year: i,
      amount: yearlyAmount,
    });
  }

  // 잔여 기간
  const remainingDays = totalDays - fullYears * 365;
  if (remainingDays > 0) {
    yearlyBreakdown.push({
      year: fullYears + 1,
      amount: Math.floor(yearlyAmount * (remainingDays / 365)),
    });
  }

  return {
    isEligible: true,
    totalDays,
    totalYears,
    averageDailyWage,
    severancePay,
    yearlyBreakdown,
  };
}

// 간편 계산 (평균 월급만으로)
export function calculateSeveranceSimple(
  yearsWorked: number,
  monthsWorked: number,
  averageMonthlyWage: number
): SeveranceResult {
  const totalDays = yearsWorked * 365 + monthsWorked * 30;

  if (totalDays < 365) {
    return {
      isEligible: false,
      eligibilityReason: '1년 미만 근무 시 퇴직금 지급 대상이 아닙니다.',
      totalDays,
      totalYears: totalDays / 365,
      averageDailyWage: 0,
      severancePay: 0,
      yearlyBreakdown: [],
    };
  }

  const averageDailyWage = Math.floor(averageMonthlyWage / 30);
  const severancePay = Math.floor(averageMonthlyWage * (totalDays / 365));

  const totalYears = totalDays / 365;
  const yearlyBreakdown = [];
  const fullYears = Math.floor(totalYears);

  for (let i = 1; i <= fullYears; i++) {
    yearlyBreakdown.push({
      year: i,
      amount: averageMonthlyWage,
    });
  }

  const remainingDays = totalDays - fullYears * 365;
  if (remainingDays > 0) {
    yearlyBreakdown.push({
      year: fullYears + 1,
      amount: Math.floor(averageMonthlyWage * (remainingDays / 365)),
    });
  }

  return {
    isEligible: true,
    totalDays,
    totalYears,
    averageDailyWage,
    severancePay,
    yearlyBreakdown,
  };
}

// 퇴직금 세금 계산 (간략화)
export function calculateSeveranceTax(severancePay: number, yearsWorked: number): {
  taxableAmount: number;
  estimatedTax: number;
  netSeverance: number;
} {
  // 퇴직소득공제 (간략화)
  // 실제로는 더 복잡한 계산 필요
  const basicDeduction = Math.min(severancePay * 0.4, 8000000 * yearsWorked);
  const taxableAmount = Math.max(0, severancePay - basicDeduction);

  // 퇴직소득세 (환산 과세, 간략화)
  let tax = 0;
  if (taxableAmount > 0) {
    const annualizedAmount = taxableAmount / yearsWorked;
    // 간략화된 세율 적용
    if (annualizedAmount <= 14000000) {
      tax = annualizedAmount * 0.06;
    } else if (annualizedAmount <= 50000000) {
      tax = 840000 + (annualizedAmount - 14000000) * 0.15;
    } else if (annualizedAmount <= 88000000) {
      tax = 6240000 + (annualizedAmount - 50000000) * 0.24;
    } else {
      tax = 15360000 + (annualizedAmount - 88000000) * 0.35;
    }
    tax = tax * yearsWorked;
  }

  const estimatedTax = Math.floor(tax);
  const netSeverance = severancePay - estimatedTax;

  return {
    taxableAmount,
    estimatedTax,
    netSeverance,
  };
}
