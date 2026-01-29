// 전월세 전환 계산기
// 전월세 전환율 = (보증금 차액 × 전환율) / 12

// 2026년 기준 법정 전월세 전환율 상한 (연 10%, 기준금리 + 3.5%)
// 실제로는 기준금리에 따라 변동
export const LEGAL_CONVERSION_RATE_CAP = 10; // 연 10%

// 시장 평균 전환율 (지역별 다름)
export const MARKET_CONVERSION_RATES: Record<string, number> = {
  seoul: 4.5,
  gyeonggi: 5.0,
  incheon: 5.5,
  busan: 5.5,
  daegu: 6.0,
  daejeon: 5.5,
  gwangju: 6.0,
  ulsan: 5.5,
  sejong: 5.0,
  other: 6.0,
};

export interface JeonwolseInput {
  mode: 'jeonse_to_wolse' | 'wolse_to_jeonse';
  jeonseDeposit?: number; // 전세 보증금
  wolseDeposit?: number; // 월세 보증금
  monthlyRent?: number; // 월세
  conversionRate: number; // 전환율 (%)
}

export interface JeonwolseResult {
  jeonseDeposit: number;
  wolseDeposit: number;
  monthlyRent: number;
  conversionRate: number;
  annualRent: number;
  differenceDeposit: number; // 보증금 차이
  yearlyReturn: number; // 연 수익률 (임대인 관점)
}

// 전세 → 월세 전환
export function jeonseToWolse(
  jeonseDeposit: number,
  wolseDeposit: number,
  conversionRate: number
): JeonwolseResult {
  const differenceDeposit = jeonseDeposit - wolseDeposit;
  const annualRent = Math.floor(differenceDeposit * (conversionRate / 100));
  const monthlyRent = Math.floor(annualRent / 12);

  return {
    jeonseDeposit,
    wolseDeposit,
    monthlyRent,
    conversionRate,
    annualRent,
    differenceDeposit,
    yearlyReturn: conversionRate,
  };
}

// 월세 → 전세 전환 (동일 보증금으로 전세 전환 시 필요 보증금)
export function wolseToJeonse(
  wolseDeposit: number,
  monthlyRent: number,
  conversionRate: number
): JeonwolseResult {
  const annualRent = monthlyRent * 12;
  const differenceDeposit = Math.floor(annualRent / (conversionRate / 100));
  const jeonseDeposit = wolseDeposit + differenceDeposit;

  return {
    jeonseDeposit,
    wolseDeposit,
    monthlyRent,
    conversionRate,
    annualRent,
    differenceDeposit,
    yearlyReturn: conversionRate,
  };
}

// 메인 계산 함수
export function calculateJeonwolse(input: JeonwolseInput): JeonwolseResult {
  if (input.mode === 'jeonse_to_wolse') {
    return jeonseToWolse(
      input.jeonseDeposit || 0,
      input.wolseDeposit || 0,
      input.conversionRate
    );
  } else {
    return wolseToJeonse(
      input.wolseDeposit || 0,
      input.monthlyRent || 0,
      input.conversionRate
    );
  }
}

// 보증금 증액 시 월세 감소액 계산
export function calculateRentReduction(
  currentWolseDeposit: number,
  newWolseDeposit: number,
  currentMonthlyRent: number,
  conversionRate: number
): {
  depositIncrease: number;
  monthlyRentDecrease: number;
  newMonthlyRent: number;
} {
  const depositIncrease = newWolseDeposit - currentWolseDeposit;
  const annualRentDecrease = Math.floor(depositIncrease * (conversionRate / 100));
  const monthlyRentDecrease = Math.floor(annualRentDecrease / 12);
  const newMonthlyRent = Math.max(0, currentMonthlyRent - monthlyRentDecrease);

  return {
    depositIncrease,
    monthlyRentDecrease,
    newMonthlyRent,
  };
}

// 지역명
export const REGION_NAMES: Record<string, string> = {
  seoul: '서울',
  gyeonggi: '경기',
  incheon: '인천',
  busan: '부산',
  daegu: '대구',
  daejeon: '대전',
  gwangju: '광주',
  ulsan: '울산',
  sejong: '세종',
  other: '기타 지역',
};
