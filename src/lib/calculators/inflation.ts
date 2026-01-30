// 물가 상승률 체감 계산기

export interface InflationInput {
  baseYear: number;
  compareYear: number;
  amount: number; // 기준연도 금액 (원)
  customRate?: number; // 사용자 지정 물가상승률 (%)
}

export interface InflationYearData {
  year: number;
  value: number;
  cumRate: number; // 누적 상승률 (%)
}

export interface InflationResult {
  baseAmount: number;
  adjustedAmount: number; // 비교연도 가치
  totalInflation: number; // 총 물가 상승률 (%)
  annualAverage: number; // 연평균 상승률 (%)
  purchasingPower: number; // 구매력 변화 (%)
  yearlyData: InflationYearData[];
  examples: { item: string; baseCost: number; currentCost: number }[];
}

// 한국 소비자물가 연평균 상승률 (실제 통계청 데이터 기반 근사)
const CPI_RATES: Record<number, number> = {
  1990: 8.6, 1991: 9.3, 1992: 6.2, 1993: 4.8, 1994: 6.3,
  1995: 4.5, 1996: 4.9, 1997: 4.4, 1998: 7.5, 1999: 0.8,
  2000: 2.3, 2001: 4.1, 2002: 2.8, 2003: 3.5, 2004: 3.6,
  2005: 2.8, 2006: 2.2, 2007: 2.5, 2008: 4.7, 2009: 2.8,
  2010: 2.9, 2011: 4.0, 2012: 2.2, 2013: 1.3, 2014: 1.3,
  2015: 0.7, 2016: 1.0, 2017: 1.9, 2018: 1.5, 2019: 0.4,
  2020: 0.5, 2021: 2.5, 2022: 5.1, 2023: 3.6, 2024: 2.3,
  2025: 2.0, 2026: 2.0, // 추정
};

function getRate(year: number, customRate?: number): number {
  if (customRate !== undefined) return customRate;
  return CPI_RATES[year] ?? 2.5; // 데이터 없으면 2.5% 가정
}

export function calculateInflation(input: InflationInput): InflationResult {
  const { baseYear, compareYear, amount, customRate } = input;
  const startYear = Math.min(baseYear, compareYear);
  const endYear = Math.max(baseYear, compareYear);
  const isForward = compareYear >= baseYear;

  const yearlyData: InflationYearData[] = [];
  let cumValue = amount;
  let cumRate = 0;

  yearlyData.push({ year: startYear, value: amount, cumRate: 0 });

  for (let y = startYear + 1; y <= endYear; y++) {
    const rate = getRate(y, customRate);
    cumValue = cumValue * (1 + rate / 100);
    cumRate = ((cumValue / amount) - 1) * 100;
    yearlyData.push({ year: y, value: Math.round(cumValue), cumRate: Math.round(cumRate * 10) / 10 });
  }

  const adjustedAmount = Math.round(cumValue);
  const totalInflation = Math.round(cumRate * 10) / 10;
  const years = endYear - startYear;
  const annualAverage = years > 0 ? Math.round((Math.pow(cumValue / amount, 1 / years) - 1) * 1000) / 10 : 0;

  // 구매력: 과거 금액의 현재 구매력 또는 현재 금액의 과거 구매력
  const purchasingPower = isForward
    ? Math.round((amount / adjustedAmount) * 100 * 10) / 10 // 과거 돈의 현재 가치 비율
    : Math.round((adjustedAmount / amount) * 100 * 10) / 10;

  // 체감 예시 (기준연도 기준)
  const multiplier = adjustedAmount / amount;
  const examples = [
    { item: "짜장면", baseCost: baseYear <= 2000 ? 3000 : baseYear <= 2010 ? 4000 : 5000, currentCost: 0 },
    { item: "버스요금", baseCost: baseYear <= 2000 ? 600 : baseYear <= 2010 ? 900 : 1200, currentCost: 0 },
    { item: "아파트 전세 (서울 평균)", baseCost: baseYear <= 2000 ? 8000_0000 : baseYear <= 2010 ? 20000_0000 : 35000_0000, currentCost: 0 },
    { item: "대학 등록금 (연)", baseCost: baseYear <= 2000 ? 300_0000 : baseYear <= 2010 ? 600_0000 : 700_0000, currentCost: 0 },
  ].map((e) => ({ ...e, currentCost: Math.round(e.baseCost * multiplier) }));

  return {
    baseAmount: amount,
    adjustedAmount,
    totalInflation,
    annualAverage,
    purchasingPower,
    yearlyData,
    examples,
  };
}
