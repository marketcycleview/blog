// 실업급여 계산기
// 2026년 기준 (예상치)

// 실업급여 기준
export const UNEMPLOYMENT_BENEFIT_2026 = {
  minDailyBenefit: 64192, // 하한액 (최저임금의 80%)
  maxDailyBenefit: 77000, // 상한액 (2026년 예상)
  replacementRate: 0.6, // 퇴직 전 평균임금의 60%
};

// 고용보험 가입기간 및 연령에 따른 급여 지급일수
export const BENEFIT_DURATION_TABLE: Record<string, Record<string, number>> = {
  // 연령 그룹
  'under50': {
    'less1year': 120,    // 1년 미만
    '1to3years': 150,    // 1년~3년
    '3to5years': 180,    // 3년~5년
    '5to10years': 210,   // 5년~10년
    'over10years': 240,  // 10년 이상
  },
  '50andOver': {
    'less1year': 120,
    '1to3years': 180,
    '3to5years': 210,
    '5to10years': 240,
    'over10years': 270,
  },
  'disabled': {
    'less1year': 120,
    '1to3years': 180,
    '3to5years': 210,
    '5to10years': 240,
    'over10years': 270,
  },
};

export interface UnemploymentInput {
  age: number;
  insurancePeriodMonths: number; // 고용보험 가입 기개월
  last3MonthsSalary: number[]; // 최근 3개월 급여 (세전)
  isDisabled?: boolean;
}

export interface UnemploymentResult {
  isEligible: boolean;
  eligibilityReason?: string;
  averageDailyWage: number; // 평균 일급
  dailyBenefit: number; // 일일 실업급여
  benefitDays: number; // 지급일수
  totalBenefit: number; // 총 예상 수령액
  monthlyBenefit: number; // 월 예상 수령액 (30일 기준)
  startDate?: string; // 대기기간 후 지급 시작일
}

// 고용보험 가입기간 카테고리
function getInsurancePeriodCategory(months: number): string {
  if (months < 12) return 'less1year';
  if (months < 36) return '1to3years';
  if (months < 60) return '3to5years';
  if (months < 120) return '5to10years';
  return 'over10years';
}

// 연령 카테고리
function getAgeCategory(age: number, isDisabled: boolean): string {
  if (isDisabled) return 'disabled';
  if (age >= 50) return '50andOver';
  return 'under50';
}

// 실업급여 계산
export function calculateUnemploymentBenefit(input: UnemploymentInput): UnemploymentResult {
  const { age, insurancePeriodMonths, last3MonthsSalary, isDisabled = false } = input;

  // 자격 확인: 고용보험 180일(약 6개월) 이상 가입
  if (insurancePeriodMonths < 6) {
    return {
      isEligible: false,
      eligibilityReason: '고용보험 가입기간이 180일(약 6개월) 미만입니다.',
      averageDailyWage: 0,
      dailyBenefit: 0,
      benefitDays: 0,
      totalBenefit: 0,
      monthlyBenefit: 0,
    };
  }

  // 평균임금 계산 (최근 3개월 급여 기준)
  const totalSalary = last3MonthsSalary.reduce((sum, s) => sum + s, 0);
  const averageMonthlyWage = totalSalary / last3MonthsSalary.length;
  const averageDailyWage = Math.floor(averageMonthlyWage / 30);

  // 일일 실업급여 = 평균임금의 60% (상한/하한 적용)
  let dailyBenefit = Math.floor(averageDailyWage * UNEMPLOYMENT_BENEFIT_2026.replacementRate);
  dailyBenefit = Math.max(dailyBenefit, UNEMPLOYMENT_BENEFIT_2026.minDailyBenefit);
  dailyBenefit = Math.min(dailyBenefit, UNEMPLOYMENT_BENEFIT_2026.maxDailyBenefit);

  // 지급일수 결정
  const ageCategory = getAgeCategory(age, isDisabled);
  const periodCategory = getInsurancePeriodCategory(insurancePeriodMonths);
  const benefitDays = BENEFIT_DURATION_TABLE[ageCategory][periodCategory];

  // 총 수령액
  const totalBenefit = dailyBenefit * benefitDays;
  const monthlyBenefit = dailyBenefit * 30;

  return {
    isEligible: true,
    averageDailyWage,
    dailyBenefit,
    benefitDays,
    totalBenefit,
    monthlyBenefit,
  };
}

// 지급일수 테이블 반환
export function getBenefitDurationTable(): Array<{
  period: string;
  periodLabel: string;
  under50: number;
  over50: number;
}> {
  const periods = [
    { key: 'less1year', label: '1년 미만' },
    { key: '1to3years', label: '1년~3년' },
    { key: '3to5years', label: '3년~5년' },
    { key: '5to10years', label: '5년~10년' },
    { key: 'over10years', label: '10년 이상' },
  ];

  return periods.map(p => ({
    period: p.key,
    periodLabel: p.label,
    under50: BENEFIT_DURATION_TABLE['under50'][p.key],
    over50: BENEFIT_DURATION_TABLE['50andOver'][p.key],
  }));
}
