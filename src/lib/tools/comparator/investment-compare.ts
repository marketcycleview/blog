// 적금 vs ETF vs 부동산 수익 비교 계산 모듈

export interface InvestmentCompareInput {
  initialAmount: number; // 원 단위
  monthlyAmount: number; // 원 단위
  years: number; // 투자 기간 (년)
  savingsRate: number; // 적금 금리 %
  etfReturnRate: number; // ETF 예상 수익률 %
  etfVolatility: number; // ETF 변동성 %
  realEstateAppreciation: number; // 부동산 시세상승률 %
  realEstateRentalYield: number; // 임대수익률 %
  realEstateLoanRatio: number; // 대출 비율 %
  realEstateLoanRate: number; // 대출 금리 %
  taxApplied: boolean; // 세후 계산 여부
}

export interface YearlyValue {
  year: number;
  value: number;
}

export interface SavingsResult {
  totalInvested: number;
  finalValue: number;
  profit: number;
  profitRate: number;
  afterTax: number;
  yearlyData: YearlyValue[];
}

export interface EtfResult {
  totalInvested: number;
  finalValue: number;
  profit: number;
  profitRate: number;
  afterTax: number;
  optimistic: number;
  pessimistic: number;
  yearlyData: YearlyValue[];
}

export interface RealEstateResult {
  purchasePrice: number;
  totalInvested: number;
  finalPropertyValue: number;
  totalRentalIncome: number;
  totalLoanInterest: number;
  remainingLoan: number;
  netProfit: number;
  profitRate: number;
  afterTax: number;
  yearlyData: YearlyValue[];
}

export interface InvestmentCompareResult {
  savings: SavingsResult;
  etf: EtfResult;
  realEstate: RealEstateResult;
  winner: "savings" | "etf" | "realEstate";
  summary: string;
}

// 적금 계산 (월복리 근사)
function calculateSavings(
  initial: number,
  monthly: number,
  years: number,
  annualRate: number,
  applyTax: boolean
): SavingsResult {
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;
  const totalInvested = initial + monthly * totalMonths;
  const yearlyData: YearlyValue[] = [];

  // 년도별 계산
  let value = initial;
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      value = value * (1 + monthlyRate) + monthly;
    }
    yearlyData.push({ year: y, value: Math.round(value) });
  }

  const finalValue = Math.round(value);
  const grossProfit = finalValue - totalInvested;
  // 이자소득세 15.4%
  const tax = applyTax ? Math.round(grossProfit * 0.154) : 0;
  const afterTax = finalValue - tax;
  const profit = afterTax - totalInvested;
  const profitRate = totalInvested > 0 ? (profit / totalInvested) * 100 : 0;

  return { totalInvested, finalValue, profit, profitRate, afterTax, yearlyData };
}

// ETF 계산 (적립식 투자, 연복리)
function calculateEtf(
  initial: number,
  monthly: number,
  years: number,
  annualReturn: number,
  volatility: number,
  applyTax: boolean
): EtfResult {
  const totalMonths = years * 12;
  const totalInvested = initial + monthly * totalMonths;

  function simulate(rate: number): { final: number; yearlyData: YearlyValue[] } {
    const monthlyRate = rate / 100 / 12;
    const data: YearlyValue[] = [];
    let value = initial;
    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        value = value * (1 + monthlyRate) + monthly;
      }
      data.push({ year: y, value: Math.round(value) });
    }
    return { final: Math.round(value), yearlyData: data };
  }

  const normal = simulate(annualReturn);
  const optimisticSim = simulate(annualReturn + volatility / 2);
  const pessimisticSim = simulate(Math.max(0, annualReturn - volatility / 2));

  const grossProfit = normal.final - totalInvested;
  // 금융투자소득세 간략: 수익의 15.4% (소액은 비과세이지만 단순화)
  const tax = applyTax ? Math.round(Math.max(0, grossProfit) * 0.154) : 0;
  const afterTax = normal.final - tax;
  const profit = afterTax - totalInvested;
  const profitRate = totalInvested > 0 ? (profit / totalInvested) * 100 : 0;

  return {
    totalInvested,
    finalValue: normal.final,
    profit,
    profitRate,
    afterTax,
    optimistic: optimisticSim.final,
    pessimistic: pessimisticSim.final,
    yearlyData: normal.yearlyData,
  };
}

// 부동산 계산 (레버리지 + 임대수익 + 시세상승)
function calculateRealEstate(
  initial: number,
  monthly: number,
  years: number,
  appreciation: number,
  rentalYield: number,
  loanRatio: number,
  loanRate: number,
  applyTax: boolean
): RealEstateResult {
  // 초기 투자금 = 자기자본, 매입가 = 자기자본 / (1 - 대출비율)
  const selfRatio = 1 - loanRatio / 100;
  const purchasePrice = selfRatio > 0 ? Math.round(initial / selfRatio) : initial;
  let loanBalance = purchasePrice - initial;
  const totalMonths = years * 12;

  const yearlyData: YearlyValue[] = [];
  let propertyValue = purchasePrice;
  let totalRentalIncome = 0;
  let totalLoanInterest = 0;
  let totalMonthlyPaid = 0;

  for (let y = 1; y <= years; y++) {
    // 시세 상승
    propertyValue = propertyValue * (1 + appreciation / 100);

    // 연간 임대수익 (매입가 기준)
    const annualRent = purchasePrice * (rentalYield / 100);
    totalRentalIncome += annualRent;

    // 연간 대출이자
    const annualInterest = loanBalance * (loanRate / 100);
    totalLoanInterest += annualInterest;

    // 월 추가 투자금 → 대출 원금 상환
    const annualRepayment = Math.min(loanBalance, monthly * 12);
    loanBalance = Math.max(0, loanBalance - annualRepayment);
    totalMonthlyPaid += annualRepayment;

    // 순자산 = 시세 - 잔여대출 + 누적임대수익 - 누적이자
    const netAsset =
      Math.round(propertyValue) -
      Math.round(loanBalance) +
      Math.round(totalRentalIncome) -
      Math.round(totalLoanInterest) -
      Math.round(totalMonthlyPaid); // 상환금은 이미 지출

    // 순자산 = 시세 - 대출잔액 (임대수익과 이자는 현금흐름)
    const equity = Math.round(propertyValue) - Math.round(loanBalance);
    yearlyData.push({ year: y, value: equity });
  }

  const finalPropertyValue = Math.round(propertyValue);
  const remainingLoan = Math.round(loanBalance);
  totalRentalIncome = Math.round(totalRentalIncome);
  totalLoanInterest = Math.round(totalLoanInterest);
  totalMonthlyPaid = Math.round(totalMonthlyPaid);

  // 총 투자금 = 초기자본 + 월 납입 총액
  const totalInvested = initial + monthly * totalMonths;

  // 순수익 = (시세 - 잔여대출) + 임대수익 - 이자 - 총투자금
  const grossProfit =
    finalPropertyValue -
    remainingLoan +
    totalRentalIncome -
    totalLoanInterest -
    totalInvested;

  // 양도소득세 간략: 시세차익의 20%
  const capitalGain = finalPropertyValue - purchasePrice;
  const tax = applyTax ? Math.round(Math.max(0, capitalGain) * 0.2) : 0;

  const netProfit = grossProfit - tax;
  const profitRate = totalInvested > 0 ? (netProfit / totalInvested) * 100 : 0;
  const afterTax =
    finalPropertyValue -
    remainingLoan +
    totalRentalIncome -
    totalLoanInterest -
    tax;

  return {
    purchasePrice,
    totalInvested,
    finalPropertyValue,
    totalRentalIncome,
    totalLoanInterest,
    remainingLoan,
    netProfit,
    profitRate,
    afterTax,
    yearlyData,
  };
}

export function calculateInvestmentComparison(
  input: InvestmentCompareInput
): InvestmentCompareResult {
  const savings = calculateSavings(
    input.initialAmount,
    input.monthlyAmount,
    input.years,
    input.savingsRate,
    input.taxApplied
  );

  const etf = calculateEtf(
    input.initialAmount,
    input.monthlyAmount,
    input.years,
    input.etfReturnRate,
    input.etfVolatility,
    input.taxApplied
  );

  const realEstate = calculateRealEstate(
    input.initialAmount,
    input.monthlyAmount,
    input.years,
    input.realEstateAppreciation,
    input.realEstateRentalYield,
    input.realEstateLoanRatio,
    input.realEstateLoanRate,
    input.taxApplied
  );

  // 세후 기준 비교
  const savingsVal = savings.afterTax;
  const etfVal = etf.afterTax;
  const reVal = realEstate.afterTax;

  let winner: "savings" | "etf" | "realEstate";
  if (savingsVal >= etfVal && savingsVal >= reVal) {
    winner = "savings";
  } else if (etfVal >= savingsVal && etfVal >= reVal) {
    winner = "etf";
  } else {
    winner = "realEstate";
  }

  const winnerName =
    winner === "savings"
      ? "적금"
      : winner === "etf"
        ? "ETF/펀드"
        : "부동산";

  const totalInvested = savings.totalInvested;
  const bestProfit =
    winner === "savings"
      ? savings.profit
      : winner === "etf"
        ? etf.profit
        : realEstate.netProfit;

  const summary = `${input.years}년간 동일 금액 투자 시, ${winnerName}이(가) 세후 기준 가장 높은 수익(${bestProfit >= 0 ? "+" : ""}${Math.round(bestProfit / 10000).toLocaleString()}만원)을 기록합니다.`;

  return { savings, etf, realEstate, winner, summary };
}
