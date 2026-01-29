// 연말정산 환급액 계산기
// 2026년 기준 (예상치)

// 소득공제 한도
export const DEDUCTION_LIMITS_2026 = {
  // 인적공제
  basicDeduction: 1500000, // 기본공제 (1인당)

  // 보험료 공제
  healthInsurance: 'full', // 건강보험료 전액
  employmentInsurance: 'full', // 고용보험료 전액
  nationalPension: 'full', // 국민연금 전액
  privateInsurance: 1000000, // 보장성보험료 한도

  // 주택 관련
  housingLoanInterest: 18000000, // 주택자금공제 한도 (장기주택저당차입금)
  monthlyRentDeduction: 9000000, // 월세 세액공제 한도 (총급여 5500만 이하)

  // 신용카드 등
  cardDeductionLimit: 3000000, // 신용카드 소득공제 한도 (기본)
  cardDeductionRate: {
    credit: 0.15, // 신용카드 15%
    debit: 0.30, // 체크카드, 현금영수증 30%
    traditional: 0.40, // 전통시장 40%
    transport: 0.40, // 대중교통 40%
  },

  // 연금저축
  pensionSavings: 9000000, // 연금저축 + IRP 합산 한도 (총급여 1.2억 이하)
  pensionSavingsOnly: 6000000, // 연금저축만 한도

  // 기타
  educationExpense: 9000000, // 대학교 교육비 한도
  medicalExpense: 7000000, // 의료비 한도 (총급여 3% 초과분)
  donationLimit: 0.3, // 법정기부금 한도 (소득의 30%)
};

// 세율표 (2026년)
export const TAX_BRACKETS_2026 = [
  { min: 0, max: 14000000, rate: 0.06 },
  { min: 14000000, max: 50000000, rate: 0.15 },
  { min: 50000000, max: 88000000, rate: 0.24 },
  { min: 88000000, max: 150000000, rate: 0.35 },
  { min: 150000000, max: 300000000, rate: 0.38 },
  { min: 300000000, max: 500000000, rate: 0.40 },
  { min: 500000000, max: 1000000000, rate: 0.42 },
  { min: 1000000000, max: Infinity, rate: 0.45 },
];

export interface TaxRefundInput {
  // 기본 정보
  annualSalary: number; // 총급여
  dependents: number; // 부양가족 수 (본인 포함)

  // 이미 낸 세금
  paidIncomeTax: number; // 기납부 소득세

  // 공제 항목
  nationalPension?: number; // 국민연금 납부액
  healthInsurance?: number; // 건강보험료 납부액

  // 신용카드 등 사용액
  creditCardUsage?: number;
  debitCardUsage?: number;
  cashReceiptUsage?: number;
  traditionalMarketUsage?: number;
  publicTransportUsage?: number;

  // 주거
  monthlyRent?: number; // 연간 월세 납부액
  housingLoanInterest?: number; // 주택담보대출 이자

  // 연금/저축
  pensionSavings?: number; // 연금저축
  irp?: number; // IRP

  // 기타
  medicalExpense?: number; // 의료비
  educationExpense?: number; // 교육비
  donation?: number; // 기부금
}

export interface TaxRefundResult {
  // 소득 정보
  annualSalary: number;
  earnedIncomeDeduction: number; // 근로소득공제
  earnedIncome: number; // 근로소득금액

  // 공제 합계
  totalIncomeDeduction: number; // 소득공제 합계
  taxableIncome: number; // 과세표준

  // 세금
  calculatedTax: number; // 산출세액
  totalTaxCredit: number; // 세액공제 합계
  finalTax: number; // 결정세액

  // 결과
  paidIncomeTax: number; // 기납부세액
  refundAmount: number; // 환급액 (마이너스면 추가 납부)

  // 상세 breakdown
  deductionDetails: Record<string, number>;
  taxCreditDetails: Record<string, number>;
}

// 근로소득공제 계산
function calculateEarnedIncomeDeduction(salary: number): number {
  if (salary <= 5000000) {
    return salary * 0.7;
  } else if (salary <= 15000000) {
    return 3500000 + (salary - 5000000) * 0.4;
  } else if (salary <= 45000000) {
    return 7500000 + (salary - 15000000) * 0.15;
  } else if (salary <= 100000000) {
    return 12000000 + (salary - 45000000) * 0.05;
  } else {
    return 14750000 + (salary - 100000000) * 0.02;
  }
}

// 산출세액 계산
function calculateTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;

  let tax = 0;
  let prevMax = 0;

  for (const bracket of TAX_BRACKETS_2026) {
    if (taxableIncome > bracket.min) {
      const taxableInBracket = Math.min(taxableIncome, bracket.max) - prevMax;
      tax += taxableInBracket * bracket.rate;
      prevMax = bracket.max;
    } else {
      break;
    }
  }

  return Math.floor(tax);
}

// 신용카드 소득공제 계산
function calculateCardDeduction(input: TaxRefundInput): number {
  const { annualSalary } = input;
  const totalUsage =
    (input.creditCardUsage || 0) +
    (input.debitCardUsage || 0) +
    (input.cashReceiptUsage || 0) +
    (input.traditionalMarketUsage || 0) +
    (input.publicTransportUsage || 0);

  // 총급여의 25% 초과분만 공제
  const threshold = annualSalary * 0.25;
  if (totalUsage <= threshold) return 0;

  const excessUsage = totalUsage - threshold;

  // 각 결제수단별 공제율 적용
  let deduction = 0;
  const rates = DEDUCTION_LIMITS_2026.cardDeductionRate;

  // 간략화: 비율에 따라 공제 계산
  const creditRatio = (input.creditCardUsage || 0) / totalUsage || 0;
  const debitRatio = ((input.debitCardUsage || 0) + (input.cashReceiptUsage || 0)) / totalUsage || 0;
  const traditionalRatio = (input.traditionalMarketUsage || 0) / totalUsage || 0;
  const transportRatio = (input.publicTransportUsage || 0) / totalUsage || 0;

  deduction =
    excessUsage * creditRatio * rates.credit +
    excessUsage * debitRatio * rates.debit +
    excessUsage * traditionalRatio * rates.traditional +
    excessUsage * transportRatio * rates.transport;

  // 한도 적용
  const limit = Math.min(
    DEDUCTION_LIMITS_2026.cardDeductionLimit,
    annualSalary * 0.2
  );

  return Math.min(Math.floor(deduction), limit);
}

// 메인 계산 함수
export function calculateTaxRefund(input: TaxRefundInput): TaxRefundResult {
  const { annualSalary, dependents, paidIncomeTax } = input;

  // 1. 근로소득공제
  const earnedIncomeDeduction = calculateEarnedIncomeDeduction(annualSalary);
  const earnedIncome = annualSalary - earnedIncomeDeduction;

  // 2. 소득공제 계산
  const deductionDetails: Record<string, number> = {};

  // 인적공제
  deductionDetails['인적공제'] = dependents * DEDUCTION_LIMITS_2026.basicDeduction;

  // 국민연금
  deductionDetails['국민연금'] = input.nationalPension || 0;

  // 건강보험료
  deductionDetails['건강보험료'] = input.healthInsurance || 0;

  // 신용카드 등
  deductionDetails['신용카드등'] = calculateCardDeduction(input);

  // 주택자금
  deductionDetails['주택자금'] = Math.min(
    input.housingLoanInterest || 0,
    DEDUCTION_LIMITS_2026.housingLoanInterest
  );

  // 연금저축/IRP (세액공제로 이동)
  const pensionTotal = Math.min(
    (input.pensionSavings || 0) + (input.irp || 0),
    DEDUCTION_LIMITS_2026.pensionSavings
  );

  const totalIncomeDeduction = Object.values(deductionDetails).reduce((a, b) => a + b, 0);

  // 3. 과세표준
  const taxableIncome = Math.max(0, earnedIncome - totalIncomeDeduction);

  // 4. 산출세액
  const calculatedTax = calculateTax(taxableIncome);

  // 5. 세액공제 계산
  const taxCreditDetails: Record<string, number> = {};

  // 근로소득세액공제
  let earnedIncomeTaxCredit = 0;
  if (calculatedTax <= 1300000) {
    earnedIncomeTaxCredit = calculatedTax * 0.55;
  } else {
    earnedIncomeTaxCredit = 715000 + (calculatedTax - 1300000) * 0.3;
  }
  earnedIncomeTaxCredit = Math.min(earnedIncomeTaxCredit, 740000); // 한도
  taxCreditDetails['근로소득세액공제'] = Math.floor(earnedIncomeTaxCredit);

  // 연금저축 세액공제 (총급여 5500만 이하 15%, 초과 12%)
  const pensionCreditRate = annualSalary <= 55000000 ? 0.15 : 0.12;
  taxCreditDetails['연금저축세액공제'] = Math.floor(pensionTotal * pensionCreditRate);

  // 월세 세액공제
  if (input.monthlyRent && annualSalary <= 80000000) {
    const rentCreditRate = annualSalary <= 55000000 ? 0.17 : 0.15;
    const rentDeduction = Math.min(input.monthlyRent, DEDUCTION_LIMITS_2026.monthlyRentDeduction);
    taxCreditDetails['월세세액공제'] = Math.floor(rentDeduction * rentCreditRate);
  }

  // 의료비 세액공제 (총급여 3% 초과분의 15%)
  if (input.medicalExpense) {
    const medicalThreshold = annualSalary * 0.03;
    const medicalExcess = Math.max(0, input.medicalExpense - medicalThreshold);
    const medicalLimit = Math.min(medicalExcess, DEDUCTION_LIMITS_2026.medicalExpense);
    taxCreditDetails['의료비세액공제'] = Math.floor(medicalLimit * 0.15);
  }

  // 교육비 세액공제 (15%)
  if (input.educationExpense) {
    const educationLimit = Math.min(input.educationExpense, DEDUCTION_LIMITS_2026.educationExpense);
    taxCreditDetails['교육비세액공제'] = Math.floor(educationLimit * 0.15);
  }

  // 기부금 세액공제
  if (input.donation) {
    const donationLimit = earnedIncome * DEDUCTION_LIMITS_2026.donationLimit;
    const donationAmount = Math.min(input.donation, donationLimit);
    const donationCredit = donationAmount <= 10000000
      ? donationAmount * 0.15
      : 1500000 + (donationAmount - 10000000) * 0.30;
    taxCreditDetails['기부금세액공제'] = Math.floor(donationCredit);
  }

  const totalTaxCredit = Object.values(taxCreditDetails).reduce((a, b) => a + b, 0);

  // 6. 결정세액
  const finalTax = Math.max(0, calculatedTax - totalTaxCredit);

  // 7. 환급액 (기납부 - 결정세액)
  const refundAmount = paidIncomeTax - finalTax;

  return {
    annualSalary,
    earnedIncomeDeduction,
    earnedIncome,
    totalIncomeDeduction,
    taxableIncome,
    calculatedTax,
    totalTaxCredit,
    finalTax,
    paidIncomeTax,
    refundAmount,
    deductionDetails,
    taxCreditDetails,
  };
}

// 간단 환급 예상 (소득공제 시뮬레이션)
export function estimateRefundByDeduction(
  annualSalary: number,
  additionalDeduction: number,
  currentTaxRate: number = 0.15
): number {
  // 추가 소득공제액 × 한계세율 = 예상 환급액
  return Math.floor(additionalDeduction * currentTaxRate);
}
