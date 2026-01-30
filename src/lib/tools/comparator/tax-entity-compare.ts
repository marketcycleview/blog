// 개인사업자 vs 법인 세금 비교 모듈

const INCOME_TAX_BRACKETS = [
  { limit: 14_000_000, rate: 0.06, deduction: 0 },
  { limit: 50_000_000, rate: 0.15, deduction: 1_260_000 },
  { limit: 88_000_000, rate: 0.24, deduction: 5_760_000 },
  { limit: 150_000_000, rate: 0.35, deduction: 15_440_000 },
  { limit: 300_000_000, rate: 0.38, deduction: 19_940_000 },
  { limit: 500_000_000, rate: 0.40, deduction: 25_940_000 },
  { limit: Infinity, rate: 0.42, deduction: 35_940_000 },
];

const CORP_TAX_BRACKETS = [
  { limit: 200_000_000, rate: 0.09, deduction: 0 },
  { limit: 20_000_000_000, rate: 0.19, deduction: 20_000_000 },
  { limit: 300_000_000_000, rate: 0.21, deduction: 420_000_000 },
  { limit: Infinity, rate: 0.24, deduction: 9_420_000_000 },
];

function calcProgressiveTax(income: number, brackets: typeof INCOME_TAX_BRACKETS): number {
  if (income <= 0) return 0;
  for (const b of brackets) {
    if (income <= b.limit) return Math.floor(income * b.rate - b.deduction);
  }
  return 0;
}

export interface TaxEntityInput {
  annualRevenue: number;
  expenseRatio: number; // 경비율 (%)
  ceoSalary: number; // 법인 대표자 급여 (연봉)
}

export interface EntityResult {
  label: string;
  revenue: number;
  expenses: number;
  taxableIncome: number;
  mainTax: number;
  mainTaxLabel: string;
  localTax: number;
  insuranceCost: number;
  dividendTax: number;
  totalTax: number;
  netIncome: number;
  effectiveRate: number; // 실효세율 (%)
}

export interface TaxEntityResult {
  individual: EntityResult;
  corporation: EntityResult;
  winner: string;
  difference: number;
  breakeven: string;
}

export function calculateTaxEntityComparison(input: TaxEntityInput): TaxEntityResult {
  const { annualRevenue, expenseRatio, ceoSalary } = input;
  const expenses = Math.round(annualRevenue * (expenseRatio / 100));

  // ─── 개인사업자 ───
  const indTaxableIncome = Math.max(0, annualRevenue - expenses);
  const indIncomeTax = calcProgressiveTax(indTaxableIncome, INCOME_TAX_BRACKETS);
  const indLocalTax = Math.floor(indIncomeTax * 0.1);
  // 4대보험 (건강보험 지역가입자 + 국민연금)
  const indInsurance = Math.round(Math.min(indTaxableIncome, 100_000_000) * 0.08); // 약 8% 가정
  const indTotalTax = indIncomeTax + indLocalTax + indInsurance;
  const indNetIncome = annualRevenue - expenses - indTotalTax;

  const individual: EntityResult = {
    label: "개인사업자",
    revenue: annualRevenue,
    expenses,
    taxableIncome: indTaxableIncome,
    mainTax: indIncomeTax,
    mainTaxLabel: "종합소득세",
    localTax: indLocalTax,
    insuranceCost: indInsurance,
    dividendTax: 0,
    totalTax: indTotalTax,
    netIncome: indNetIncome,
    effectiveRate: annualRevenue > 0 ? Math.round((indTotalTax / annualRevenue) * 1000) / 10 : 0,
  };

  // ─── 법인 ───
  const corpExpenses = expenses + ceoSalary; // 대표자 급여도 비용
  const corpTaxableIncome = Math.max(0, annualRevenue - corpExpenses);
  const corpTax = calcProgressiveTax(corpTaxableIncome, CORP_TAX_BRACKETS);
  const corpLocalTax = Math.floor(corpTax * 0.1);
  const corpAfterTax = corpTaxableIncome - corpTax - corpLocalTax;

  // 대표자 급여에 대한 소득세
  const ceoIncomeTax = calcProgressiveTax(Math.max(0, ceoSalary - 15_000_000), INCOME_TAX_BRACKETS); // 근로소득공제 간소화
  const ceoLocalTax = Math.floor(ceoIncomeTax * 0.1);

  // 대표자 4대보험 (직장가입자)
  const ceoInsurance = Math.round(Math.min(ceoSalary, 100_000_000) * 0.09);

  // 배당 시 배당소득세 (잔여이익 인출 시)
  const dividendAmount = corpAfterTax;
  const dividendTax = dividendAmount > 0 ? Math.floor(dividendAmount * 0.154) : 0; // 15.4% 원천징수

  const corpTotalTax = corpTax + corpLocalTax + ceoIncomeTax + ceoLocalTax + ceoInsurance + dividendTax;
  const corpNetIncome = annualRevenue - expenses - corpTotalTax;

  const corporation: EntityResult = {
    label: "법인사업자",
    revenue: annualRevenue,
    expenses: corpExpenses,
    taxableIncome: corpTaxableIncome,
    mainTax: corpTax,
    mainTaxLabel: "법인세",
    localTax: corpLocalTax,
    insuranceCost: ceoInsurance,
    dividendTax: dividendTax + ceoIncomeTax + ceoLocalTax,
    totalTax: corpTotalTax,
    netIncome: corpNetIncome,
    effectiveRate: annualRevenue > 0 ? Math.round((corpTotalTax / annualRevenue) * 1000) / 10 : 0,
  };

  const winner = individual.totalTax <= corporation.totalTax ? "개인사업자" : "법인사업자";
  const difference = Math.abs(individual.totalTax - corporation.totalTax);

  // 손익분기 매출 추정
  let breakeven = "현재 조건에서 비교 결과를 참고하세요.";
  if (winner === "개인사업자") {
    breakeven = `현재 매출에서는 개인사업자가 연 ${Math.round(difference / 10000).toLocaleString()}만원 절세됩니다. 매출이 더 높아지면 법인이 유리해질 수 있습니다.`;
  } else {
    breakeven = `현재 매출에서는 법인이 연 ${Math.round(difference / 10000).toLocaleString()}만원 절세됩니다.`;
  }

  return { individual, corporation, winner, difference, breakeven };
}
