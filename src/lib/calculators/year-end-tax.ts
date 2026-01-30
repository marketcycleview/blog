// 2026년 연말정산 시뮬레이터 계산 모듈

// ─── 2026년 기준 세율표 (과세표준 구간) ───
const TAX_BRACKETS = [
  { limit: 14_000_000, rate: 0.06, deduction: 0 },
  { limit: 50_000_000, rate: 0.15, deduction: 1_260_000 },
  { limit: 88_000_000, rate: 0.24, deduction: 5_760_000 },
  { limit: 150_000_000, rate: 0.35, deduction: 15_440_000 },
  { limit: 300_000_000, rate: 0.38, deduction: 19_940_000 },
  { limit: 500_000_000, rate: 0.40, deduction: 25_940_000 },
  { limit: 1_000_000_000, rate: 0.42, deduction: 35_940_000 },
  { limit: Infinity, rate: 0.45, deduction: 65_940_000 },
];

// ─── 근로소득공제 계산 ───
function calcEarnedIncomeDeduction(totalSalary: number): number {
  if (totalSalary <= 5_000_000) return Math.min(totalSalary, totalSalary * 0.7);
  if (totalSalary <= 15_000_000) return 3_500_000 + (totalSalary - 5_000_000) * 0.4;
  if (totalSalary <= 45_000_000) return 7_500_000 + (totalSalary - 15_000_000) * 0.15;
  if (totalSalary <= 100_000_000) return 12_000_000 + (totalSalary - 45_000_000) * 0.05;
  return 14_750_000 + (totalSalary - 100_000_000) * 0.02;
}

// ─── 산출세액 계산 ───
function calcTaxAmount(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  for (const bracket of TAX_BRACKETS) {
    if (taxableIncome <= bracket.limit) {
      return Math.floor(taxableIncome * bracket.rate - bracket.deduction);
    }
  }
  return 0;
}

// ─── 간이세액표 기반 기납부세액 추정 ───
function estimateWithheldTax(totalSalary: number, dependents: number): number {
  // 간이세액표 근사치: 근로소득 간이세액 (월급 기준 × 12)
  const monthly = totalSalary / 12;
  const earnedIncome = totalSalary - calcEarnedIncomeDeduction(totalSalary);
  const basicDeduction = 1_500_000 * dependents;
  const standardDeduction = 1_000_000; // 표준세액공제 근사
  const taxBase = Math.max(0, earnedIncome - basicDeduction);
  const annualTax = calcTaxAmount(taxBase);
  // 간이세액은 산출세액에서 근로소득세액공제를 뺀 근사치
  const workTaxCredit = Math.min(
    annualTax <= 1_300_000 ? annualTax * 0.55 : 715_000 + (annualTax - 1_300_000) * 0.3,
    660_000 + Math.max(0, (annualTax - 1_300_000) * 0.3)
  );
  const estimated = Math.max(0, annualTax - workTaxCredit - standardDeduction);
  return Math.floor(estimated);
}

// ─── 입력 타입 ───
export interface YearEndTaxInput {
  totalSalary: number; // 총급여
  dependents: number; // 부양가족 수 (본인 포함)
  childrenUnder20: number; // 20세 이하 자녀 수
  hasSpouse: boolean; // 배우자 유무

  // 소득공제
  nationalPension: number; // 국민연금 납입액
  healthInsurance: number; // 건강보험료
  employmentInsurance: number; // 고용보험료
  housingSubscription: number; // 주택청약 납입액
  creditCard: number; // 신용카드 사용액
  debitCard: number; // 체크카드/현금영수증
  traditionalMarket: number; // 전통시장/대중교통

  // 세액공제
  medicalExpense: number; // 의료비
  educationExpense: number; // 교육비
  donation: number; // 기부금
  monthlyRent: number; // 월세 (무주택 세대주)
  pensionSavings: number; // 연금저축
  irp: number; // IRP
  insurancePremium: number; // 보장성보험료
}

export interface YearEndTaxResult {
  // 소득
  totalSalary: number;
  earnedIncomeDeduction: number;
  earnedIncome: number; // 근로소득금액

  // 소득공제
  personalDeduction: number; // 인적공제
  pensionDeduction: number; // 연금보험료공제
  insuranceDeduction: number; // 건강/고용보험료
  housingDeduction: number; // 주택청약
  cardDeduction: number; // 신용카드 등 소득공제
  totalIncomeDeduction: number;

  // 과세표준 & 산출세액
  taxableIncome: number;
  calculatedTax: number;
  taxBracketRate: string; // 적용 세율

  // 세액공제
  workTaxCredit: number; // 근로소득세액공제
  childTaxCredit: number; // 자녀세액공제
  pensionSavingsCredit: number; // 연금저축 세액공제
  irpCredit: number; // IRP 세액공제
  insurancePremiumCredit: number; // 보험료 세액공제
  medicalCredit: number; // 의료비 세액공제
  educationCredit: number; // 교육비 세액공제
  donationCredit: number; // 기부금 세액공제
  monthlyRentCredit: number; // 월세 세액공제
  standardTaxCredit: number; // 표준세액공제
  totalTaxCredit: number;

  // 결정세액 & 환급
  determinedTax: number; // 결정세액
  localIncomeTax: number; // 지방소득세
  totalDetermined: number; // 결정세액 + 지방소득세
  withheldTax: number; // 기납부세액 (소득세 + 지방소득세)
  refundAmount: number; // 환급(+) 또는 추가납부(-)

  // 추천
  suggestions: string[];
}

export function calculateYearEndTax(input: YearEndTaxInput): YearEndTaxResult {
  const { totalSalary, dependents, childrenUnder20, hasSpouse } = input;

  // 1. 근로소득금액
  const earnedIncomeDeduction = calcEarnedIncomeDeduction(totalSalary);
  const earnedIncome = totalSalary - earnedIncomeDeduction;

  // 2. 소득공제
  const personalDeduction = 1_500_000 * dependents;
  const pensionDeduction = Math.min(input.nationalPension, totalSalary * 0.09 / 2 * 12 + 100_000); // 실제 납입액
  const insuranceDeduction = input.healthInsurance + input.employmentInsurance;
  const housingDeduction = Math.min(input.housingSubscription, 2_400_000); // 연 240만원 한도

  // 신용카드 소득공제: 총급여의 25% 초과분
  const cardThreshold = totalSalary * 0.25;
  const totalCardUsage = input.creditCard + input.debitCard + input.traditionalMarket;
  let cardExcess = Math.max(0, totalCardUsage - cardThreshold);
  // 공제율: 신용카드 15%, 체크카드/현금영수증 30%, 전통시장/대중교통 40%
  let cardDeduction = 0;
  if (cardExcess > 0) {
    // 간소화: 초과분에 대해 가중 평균 공제율 적용
    const creditCardShare = totalCardUsage > 0 ? input.creditCard / totalCardUsage : 0;
    const debitShare = totalCardUsage > 0 ? input.debitCard / totalCardUsage : 0;
    const marketShare = totalCardUsage > 0 ? input.traditionalMarket / totalCardUsage : 0;
    const avgRate = creditCardShare * 0.15 + debitShare * 0.30 + marketShare * 0.40;
    cardDeduction = Math.floor(cardExcess * (avgRate || 0.15));
    // 한도: 총급여 7천만원 이하 300만원, 초과 250만원
    const cardLimit = totalSalary <= 70_000_000 ? 3_000_000 : 2_500_000;
    cardDeduction = Math.min(cardDeduction, cardLimit);
  }

  const totalIncomeDeduction =
    personalDeduction + pensionDeduction + insuranceDeduction + housingDeduction + cardDeduction;

  // 3. 과세표준
  const taxableIncome = Math.max(0, earnedIncome - totalIncomeDeduction);

  // 4. 산출세액
  const calculatedTax = calcTaxAmount(taxableIncome);
  let taxBracketRate = "6%";
  for (const b of TAX_BRACKETS) {
    if (taxableIncome <= b.limit) {
      taxBracketRate = `${(b.rate * 100).toFixed(0)}%`;
      break;
    }
  }

  // 5. 세액공제
  // 근로소득세액공제
  let workTaxCredit: number;
  if (calculatedTax <= 1_300_000) {
    workTaxCredit = Math.floor(calculatedTax * 0.55);
  } else {
    workTaxCredit = Math.floor(715_000 + (calculatedTax - 1_300_000) * 0.3);
  }
  const workCreditLimit = totalSalary <= 33_000_000 ? 740_000 :
    totalSalary <= 70_000_000 ? 660_000 : 500_000;
  workTaxCredit = Math.min(workTaxCredit, workCreditLimit);

  // 자녀세액공제
  let childTaxCredit = 0;
  if (childrenUnder20 === 1) childTaxCredit = 150_000;
  else if (childrenUnder20 === 2) childTaxCredit = 350_000;
  else if (childrenUnder20 >= 3) childTaxCredit = 350_000 + (childrenUnder20 - 2) * 300_000;

  // 연금저축 세액공제 (연 600만원 한도, 총급여 5500만원 이하 15%, 초과 12%)
  const pensionSavingsLimit = 6_000_000;
  const pensionSavingsBase = Math.min(input.pensionSavings, pensionSavingsLimit);
  const pensionRate = totalSalary <= 55_000_000 ? 0.15 : 0.12;
  const pensionSavingsCredit = Math.floor(pensionSavingsBase * pensionRate);

  // IRP 세액공제 (연금저축 + IRP 합산 900만원 한도)
  const irpCombinedLimit = 9_000_000;
  const irpBase = Math.min(input.irp, irpCombinedLimit - pensionSavingsBase);
  const irpCredit = Math.floor(Math.max(0, irpBase) * pensionRate);

  // 보장성보험료 세액공제 (연 100만원 한도, 12%)
  const insurancePremiumCredit = Math.floor(Math.min(input.insurancePremium, 1_000_000) * 0.12);

  // 의료비 세액공제: 총급여 3% 초과분의 15%
  const medicalThreshold = totalSalary * 0.03;
  const medicalExcess = Math.max(0, input.medicalExpense - medicalThreshold);
  const medicalCredit = Math.floor(medicalExcess * 0.15);

  // 교육비 세액공제: 15%
  const educationCredit = Math.floor(input.educationExpense * 0.15);

  // 기부금 세액공제: 1000만원 이하 15%, 초과 30%
  let donationCredit = 0;
  if (input.donation > 0) {
    if (input.donation <= 10_000_000) {
      donationCredit = Math.floor(input.donation * 0.15);
    } else {
      donationCredit = Math.floor(10_000_000 * 0.15 + (input.donation - 10_000_000) * 0.30);
    }
  }

  // 월세 세액공제: 총급여 7000만원 이하 17%, 5500만원 이하 17% (한도 750만원/1000만원)
  let monthlyRentCredit = 0;
  if (input.monthlyRent > 0 && totalSalary <= 70_000_000) {
    const rentRate = totalSalary <= 55_000_000 ? 0.17 : 0.15;
    const rentLimit = totalSalary <= 55_000_000 ? 10_000_000 : 7_500_000;
    monthlyRentCredit = Math.floor(Math.min(input.monthlyRent, rentLimit) * rentRate);
  }

  // 표준세액공제 (항목별 세액공제를 안 받는 경우 13만원, 여기서는 0으로)
  const hasItemizedCredits =
    insurancePremiumCredit + medicalCredit + educationCredit + donationCredit > 0;
  const standardTaxCredit = hasItemizedCredits ? 0 : 130_000;

  const totalTaxCredit =
    workTaxCredit + childTaxCredit + pensionSavingsCredit + irpCredit +
    insurancePremiumCredit + medicalCredit + educationCredit + donationCredit +
    monthlyRentCredit + standardTaxCredit;

  // 6. 결정세액
  const determinedTax = Math.max(0, calculatedTax - totalTaxCredit);
  const localIncomeTax = Math.floor(determinedTax * 0.1);
  const totalDetermined = determinedTax + localIncomeTax;

  // 7. 기납부세액
  const withheldTax = Math.floor(estimateWithheldTax(totalSalary, dependents) * 1.1); // 소득세+지방소득세

  // 8. 환급액
  const refundAmount = withheldTax - totalDetermined;

  // 9. 추가 공제 추천
  const suggestions: string[] = [];
  if (input.pensionSavings === 0) suggestions.push("연금저축에 가입하면 최대 90만원 세액공제 가능");
  if (input.irp === 0) suggestions.push("IRP에 가입하면 연금저축과 합산 최대 148.5만원 공제 가능");
  if (input.monthlyRent > 0 && totalSalary > 70_000_000) suggestions.push("총급여 7천만원 초과 시 월세 세액공제 불가");
  if (input.monthlyRent === 0 && totalSalary <= 70_000_000) suggestions.push("월세를 내고 있다면 월세 세액공제 가능 (최대 17%)");
  if (input.medicalExpense <= totalSalary * 0.03) suggestions.push("의료비가 총급여의 3% 이하이면 공제 대상 아님");
  if (input.housingSubscription === 0) suggestions.push("주택청약 납입액도 소득공제 대상 (연 240만원 한도)");
  if (input.debitCard === 0 && input.creditCard > 0) suggestions.push("체크카드 공제율(30%)이 신용카드(15%)보다 높습니다");

  return {
    totalSalary,
    earnedIncomeDeduction,
    earnedIncome,
    personalDeduction,
    pensionDeduction,
    insuranceDeduction,
    housingDeduction,
    cardDeduction,
    totalIncomeDeduction,
    taxableIncome,
    calculatedTax,
    taxBracketRate,
    workTaxCredit,
    childTaxCredit,
    pensionSavingsCredit,
    irpCredit,
    insurancePremiumCredit,
    medicalCredit,
    educationCredit,
    donationCredit,
    monthlyRentCredit,
    standardTaxCredit,
    totalTaxCredit,
    determinedTax,
    localIncomeTax,
    totalDetermined,
    withheldTax,
    refundAmount,
    suggestions,
  };
}
