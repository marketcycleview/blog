// 2026년 기준 중위소득 (예상치, 실제 발표 후 수정 필요)
// 2025년 대비 약 6% 인상 가정
export const MEDIAN_INCOME_2026: Record<number, number> = {
  1: 2392013, // 1인 가구
  2: 3932658, // 2인 가구
  3: 5025353, // 3인 가구
  4: 6097773, // 4인 가구
  5: 7108192, // 5인 가구
  6: 8064805, // 6인 가구
  7: 8988428, // 7인 가구
};

// 7인 이상 가구의 경우 1인당 추가 금액
export const ADDITIONAL_PER_PERSON = 923623;

// 일반적인 복지 기준 (중위소득 %)
export const WELFARE_THRESHOLDS = [
  { percent: 30, name: '생계급여', description: '기초생활수급자 (생계급여)' },
  { percent: 40, name: '의료급여', description: '기초생활수급자 (의료급여)' },
  { percent: 48, name: '주거급여', description: '기초생활수급자 (주거급여)' },
  { percent: 50, name: '저소득층 기준', description: '다양한 복지 정책 기준' },
  { percent: 60, name: '청년 지원', description: '청년월세지원, 청년도약계좌 등' },
  { percent: 72, name: '교육급여', description: '교육급여 대상' },
  { percent: 80, name: '긴급복지', description: '긴급복지 지원' },
  { percent: 100, name: '중위소득', description: '기준 중위소득' },
  { percent: 150, name: '중산층', description: '중산층 기준' },
  { percent: 180, name: '차상위 확대', description: '일부 지원 정책 상한' },
];

export interface MedianIncomeResult {
  householdSize: number;
  medianIncome: number; // 100% 기준 중위소득
  incomeByPercent: Record<number, number>; // 비율별 소득
  inputIncome?: number; // 입력한 가구 소득
  incomePercent?: number; // 입력 소득의 중위소득 대비 %
  eligibleWelfares?: typeof WELFARE_THRESHOLDS; // 해당되는 복지
}

// 가구원 수에 따른 기준 중위소득 계산
export function getMedianIncome(householdSize: number): number {
  if (householdSize <= 0) return 0;
  if (householdSize <= 7) {
    return MEDIAN_INCOME_2026[householdSize];
  }
  // 7인 초과
  return MEDIAN_INCOME_2026[7] + ADDITIONAL_PER_PERSON * (householdSize - 7);
}

// 중위소득 비율 계산
export function calculateMedianIncomePercent(householdSize: number, monthlyIncome: number): number {
  const medianIncome = getMedianIncome(householdSize);
  if (medianIncome === 0) return 0;
  return Math.round((monthlyIncome / medianIncome) * 100 * 10) / 10;
}

// 해당되는 복지 정책 필터
export function getEligibleWelfares(incomePercent: number): typeof WELFARE_THRESHOLDS {
  return WELFARE_THRESHOLDS.filter(w => incomePercent <= w.percent);
}

// 메인 계산 함수
export function calculateMedianIncome(
  householdSize: number,
  monthlyIncome?: number
): MedianIncomeResult {
  const medianIncome = getMedianIncome(householdSize);

  // 주요 비율별 소득
  const incomeByPercent: Record<number, number> = {};
  WELFARE_THRESHOLDS.forEach(w => {
    incomeByPercent[w.percent] = Math.floor(medianIncome * (w.percent / 100));
  });

  const result: MedianIncomeResult = {
    householdSize,
    medianIncome,
    incomeByPercent,
  };

  if (monthlyIncome !== undefined && monthlyIncome > 0) {
    const incomePercent = calculateMedianIncomePercent(householdSize, monthlyIncome);
    result.inputIncome = monthlyIncome;
    result.incomePercent = incomePercent;
    result.eligibleWelfares = getEligibleWelfares(incomePercent);
  }

  return result;
}

// 가구원수별 비율 테이블 생성
export function generateMedianIncomeTable(): Array<{
  householdSize: number;
  median100: number;
  median50: number;
  median60: number;
  median80: number;
  median150: number;
}> {
  return [1, 2, 3, 4, 5, 6, 7].map(size => {
    const median = getMedianIncome(size);
    return {
      householdSize: size,
      median100: median,
      median50: Math.floor(median * 0.5),
      median60: Math.floor(median * 0.6),
      median80: Math.floor(median * 0.8),
      median150: Math.floor(median * 1.5),
    };
  });
}
