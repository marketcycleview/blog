// 전세 vs 월세 vs 매매 비교 계산 모듈

export interface HousingInput {
  years: number; // 거주 기간 (년)
  // 전세
  jeonseDeposit: number; // 전세보증금
  jeonseLoanRate: number; // 전세대출 금리 (%)
  jeonseLoanRatio: number; // 전세대출 비율 (%)
  // 월세
  monthlyDeposit: number; // 월세 보증금
  monthlyRent: number; // 월 임대료
  rentIncreaseRate: number; // 연 인상률 (%)
  // 매매
  purchasePrice: number; // 매매가
  purchaseLoanRatio: number; // 대출 비율 (%)
  purchaseLoanRate: number; // 대출 금리 (%)
  priceGrowthRate: number; // 연 시세상승률 (%)
}

export interface HousingResult {
  label: string;
  initialCost: number; // 초기 비용
  monthlyCost: number; // 월 평균 비용
  totalCost: number; // 총 거주비용 (기간 전체)
  assetValue: number; // 기간 종료 시 자산 가치
  netCost: number; // 순비용 (총비용 - 자산가치)
}

export interface HousingComparisonResult {
  jeonse: HousingResult;
  monthly: HousingResult;
  purchase: HousingResult;
  winner: string;
  winnerReason: string;
  breakeven?: string; // 매매가 유리해지는 시세 상승률
}

export function calculateHousingComparison(input: HousingInput): HousingComparisonResult {
  const { years } = input;
  const months = years * 12;

  // ─── 전세 계산 ───
  const jeonseLoan = input.jeonseDeposit * (input.jeonseLoanRatio / 100);
  const jeonseOwnMoney = input.jeonseDeposit - jeonseLoan;
  const jeonseMonthlyInterest = (jeonseLoan * (input.jeonseLoanRate / 100)) / 12;
  const jeonseTotalInterest = jeonseMonthlyInterest * months;
  // 전세는 보증금 돌려받으므로 순비용 = 이자 + 기회비용
  const jeonseOpportunityCost = jeonseOwnMoney * 0.03 * years; // 연 3% 기회비용
  const jeonseTotalCost = jeonseTotalInterest + jeonseOpportunityCost;

  const jeonse: HousingResult = {
    label: "전세",
    initialCost: jeonseOwnMoney,
    monthlyCost: Math.round(jeonseMonthlyInterest),
    totalCost: Math.round(jeonseTotalCost),
    assetValue: 0, // 전세 종료 시 보증금 반환 (원금 회수)
    netCost: Math.round(jeonseTotalCost),
  };

  // ─── 월세 계산 ───
  let monthlyTotalRent = 0;
  let currentRent = input.monthlyRent;
  for (let y = 0; y < years; y++) {
    monthlyTotalRent += currentRent * 12;
    currentRent = Math.round(currentRent * (1 + input.rentIncreaseRate / 100));
  }
  const monthlyOpportunityCost = input.monthlyDeposit * 0.03 * years;
  const monthlyTotalCost = monthlyTotalRent + monthlyOpportunityCost;

  const monthly: HousingResult = {
    label: "월세",
    initialCost: input.monthlyDeposit,
    monthlyCost: input.monthlyRent,
    totalCost: Math.round(monthlyTotalCost),
    assetValue: 0,
    netCost: Math.round(monthlyTotalCost),
  };

  // ─── 매매 계산 ───
  const purchaseLoan = input.purchasePrice * (input.purchaseLoanRatio / 100);
  const purchaseOwnMoney = input.purchasePrice - purchaseLoan;
  const purchaseMonthlyPayment = purchaseLoan > 0
    ? (purchaseLoan * (input.purchaseLoanRate / 100 / 12) * Math.pow(1 + input.purchaseLoanRate / 100 / 12, months)) / (Math.pow(1 + input.purchaseLoanRate / 100 / 12, months) - 1)
    : 0;
  const purchaseTotalPayment = purchaseMonthlyPayment * months;
  const purchaseTotalInterest = purchaseTotalPayment - purchaseLoan;
  // 취득세 (약 1~3%)
  const acquisitionTax = input.purchasePrice * 0.01;
  // 시세 상승
  const futureValue = Math.round(input.purchasePrice * Math.pow(1 + input.priceGrowthRate / 100, years));
  const appreciation = futureValue - input.purchasePrice;
  // 보유세 (연 0.1~0.3% 가정)
  const holdingTax = input.purchasePrice * 0.002 * years;
  const purchaseTotalCost = purchaseTotalInterest + acquisitionTax + holdingTax;
  // 남은 대출 잔액 (원리금균등 상환이므로 0)
  const purchaseAssetValue = futureValue;
  const purchaseNetCost = Math.round(purchaseTotalCost - appreciation);

  const purchase: HousingResult = {
    label: "매매",
    initialCost: Math.round(purchaseOwnMoney + acquisitionTax),
    monthlyCost: Math.round(purchaseMonthlyPayment + holdingTax / months),
    totalCost: Math.round(purchaseTotalCost),
    assetValue: Math.round(appreciation),
    netCost: purchaseNetCost,
  };

  // ─── 승자 결정 ───
  const results = [
    { name: "전세", net: jeonse.netCost },
    { name: "월세", net: monthly.netCost },
    { name: "매매", net: purchase.netCost },
  ];
  results.sort((a, b) => a.net - b.net);
  const winner = results[0].name;

  let winnerReason = "";
  if (winner === "전세") winnerReason = `${years}년간 전세가 순비용 기준 가장 경제적입니다. 보증금이 돌아오므로 실질 부담이 적습니다.`;
  else if (winner === "월세") winnerReason = `${years}년간 월세가 초기 자금 부담이 가장 적고, 순비용도 낮습니다.`;
  else winnerReason = `${years}년간 매매가 시세 상승을 고려하면 순비용이 가장 낮습니다. 자산 형성 효과가 큽니다.`;

  // 손익분기: 매매가 전세보다 유리해지려면 필요한 시세 상승률
  let breakeven: string | undefined;
  if (winner !== "매매") {
    // 역산: purchaseTotalCost - appreciation = jeonse.netCost 되려면
    // appreciation = purchaseTotalCost - jeonse.netCost
    const neededAppreciation = purchaseTotalCost - jeonse.netCost;
    // price * (1+r)^y - price = neededAppreciation
    // (1+r)^y = 1 + needed/price
    const ratio = 1 + neededAppreciation / input.purchasePrice;
    if (ratio > 0) {
      const neededRate = (Math.pow(ratio, 1 / years) - 1) * 100;
      if (neededRate > 0 && neededRate < 20) {
        breakeven = `매매가 유리해지려면 연 ${neededRate.toFixed(1)}% 이상 시세가 올라야 합니다.`;
      }
    }
  }

  return { jeonse, monthly, purchase, winner, winnerReason, breakeven };
}
