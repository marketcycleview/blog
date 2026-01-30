// 자녀 교육비 플래너 계산 모듈

export interface EducationCostInput {
  childCount: number; // 자녀 수 (1~4)
  currentAge: number; // 현재 자녀 나이(첫째 기준, 0~18)
  kindergarten: "public" | "private"; // 유치원
  elementary: "public" | "private"; // 초등학교
  middle: "public" | "private"; // 중학교
  high: "public" | "private"; // 고등학교
  university: "national" | "private-arts" | "private-stem" | "private-humanities" | "none"; // 대학교
  monthlyExtra: number; // 월 사교육비 (원)
  inflationRate: number; // 교육비 물가상승률 (%, default 3)
  currentSavings: number; // 현재 교육 관련 저축 (원)
}

export interface EducationStageBreakdown {
  stage: string;
  years: number;
  annualCost: number;
  totalCost: number;
  type: string;
}

export interface EducationCostResult {
  totalCost: number; // 총 교육비 (명목)
  stageBreakdown: EducationStageBreakdown[];
  extraCostTotal: number; // 사교육비 총합
  inflationAdjustedTotal: number; // 물가 반영 총 교육비
  monthlySavingsNeeded: number; // 월 필요 저축액
  yearsUntilEnd: number; // 교육 완료까지 남은 년수
  currentSavings: number;
  gap: number; // 부족분
  perChildCost: number; // 자녀 1인당 교육비
}

// 2026년 기준 교육 단계별 연간 비용 (원)
const ANNUAL_COSTS: Record<string, Record<string, number>> = {
  kindergarten: { public: 700_000, private: 4_000_000 },
  elementary: { public: 1_000_000, private: 10_000_000 },
  middle: { public: 1_500_000, private: 12_000_000 },
  high: { public: 2_000_000, private: 15_000_000 },
  university: {
    national: 4_500_000,
    "private-arts": 10_000_000,
    "private-stem": 9_000_000,
    "private-humanities": 7_000_000,
    none: 0,
  },
};

// 교육 단계별 나이 범위 및 기간
const STAGES: {
  key: string;
  label: string;
  startAge: number;
  endAge: number;
  years: number;
}[] = [
  { key: "kindergarten", label: "유치원", startAge: 4, endAge: 6, years: 3 },
  { key: "elementary", label: "초등학교", startAge: 7, endAge: 12, years: 6 },
  { key: "middle", label: "중학교", startAge: 13, endAge: 15, years: 3 },
  { key: "high", label: "고등학교", startAge: 16, endAge: 18, years: 3 },
  { key: "university", label: "대학교", startAge: 19, endAge: 22, years: 4 },
];

const TYPE_LABELS: Record<string, string> = {
  public: "공립",
  private: "사립",
  national: "국립",
  "private-arts": "사립(예체능)",
  "private-stem": "사립(이공)",
  "private-humanities": "사립(인문)",
  none: "미진학",
};

export function calculateEducationCost(
  input: EducationCostInput
): EducationCostResult {
  const {
    childCount,
    currentAge,
    kindergarten,
    elementary,
    middle,
    high,
    university,
    monthlyExtra,
    inflationRate,
    currentSavings,
  } = input;

  const typeMap: Record<string, string> = {
    kindergarten,
    elementary,
    middle,
    high,
    university,
  };

  // 교육 완료 나이 (대학 미진학이면 18세)
  const educationEndAge = university === "none" ? 18 : 22;

  // 자녀별 나이: 첫째가 가장 크고, 이후 2세 간격으로 어림
  const childAges: number[] = [];
  for (let i = 0; i < childCount; i++) {
    childAges.push(Math.max(0, currentAge - i * 2));
  }

  let totalCostNominal = 0;
  let inflationAdjustedTotal = 0;
  let extraCostTotal = 0;

  // 단계별 비용 (첫째 기준으로 표시)
  const stageBreakdown: EducationStageBreakdown[] = [];

  // 각 자녀별 비용 계산
  for (let c = 0; c < childCount; c++) {
    const childAge = childAges[c];

    for (const stage of STAGES) {
      const type = typeMap[stage.key];
      if (type === "none" && stage.key === "university") continue;

      const annualCost = ANNUAL_COSTS[stage.key]?.[type] ?? 0;
      if (annualCost === 0) continue;

      // 이 자녀가 해당 단계에서 남은 년수 계산
      let remainingYears = 0;
      if (childAge <= stage.startAge) {
        remainingYears = stage.years;
      } else if (childAge <= stage.endAge) {
        remainingYears = stage.endAge - childAge + 1;
      }

      if (remainingYears <= 0) continue;

      // 각 해의 비용에 인플레이션 적용
      for (let y = 0; y < remainingYears; y++) {
        let yearsFromNow: number;
        if (childAge <= stage.startAge) {
          yearsFromNow = stage.startAge - childAge + y;
        } else {
          yearsFromNow = y;
        }

        totalCostNominal += annualCost;
        inflationAdjustedTotal +=
          annualCost * Math.pow(1 + inflationRate / 100, yearsFromNow);
      }

      // 첫째 자녀만 stageBreakdown에 기록
      if (c === 0) {
        let firstChildRemaining = 0;
        if (currentAge <= stage.startAge) {
          firstChildRemaining = stage.years;
        } else if (currentAge <= stage.endAge) {
          firstChildRemaining = stage.endAge - currentAge + 1;
        }

        if (firstChildRemaining > 0) {
          stageBreakdown.push({
            stage: stage.label,
            years: firstChildRemaining,
            annualCost,
            totalCost: annualCost * firstChildRemaining,
            type: TYPE_LABELS[type] || type,
          });
        }
      }
    }

    // 사교육비: 자녀 나이부터 교육 완료까지
    const extraYears = Math.max(0, educationEndAge - childAge);
    const annualExtra = monthlyExtra * 12;
    for (let y = 0; y < extraYears; y++) {
      const inflatedExtra =
        annualExtra * Math.pow(1 + inflationRate / 100, y);
      extraCostTotal += inflatedExtra;
    }
  }

  inflationAdjustedTotal += extraCostTotal;

  // 교육 완료까지 남은 년수 (가장 어린 자녀 기준)
  const youngestAge = childAges[childAges.length - 1];
  const yearsUntilEnd = Math.max(0, educationEndAge - youngestAge);
  const remainingMonths = yearsUntilEnd * 12;

  // 부족분
  const gap = Math.max(0, inflationAdjustedTotal - currentSavings);

  // 월 필요 저축액
  const monthlySavingsNeeded =
    remainingMonths > 0 ? Math.round(gap / remainingMonths) : 0;

  // 1인당 교육비
  const perChildCost =
    childCount > 0 ? Math.round(inflationAdjustedTotal / childCount) : 0;

  return {
    totalCost: Math.round(totalCostNominal),
    stageBreakdown,
    extraCostTotal: Math.round(extraCostTotal),
    inflationAdjustedTotal: Math.round(inflationAdjustedTotal),
    monthlySavingsNeeded,
    yearsUntilEnd,
    currentSavings,
    gap: Math.round(gap),
    perChildCost,
  };
}
