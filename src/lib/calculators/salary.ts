// 2026년 기준 4대보험 요율 및 세율
export const INSURANCE_RATES_2026 = {
  nationalPension: 0.045, // 국민연금 4.5%
  healthInsurance: 0.0709, // 건강보험 7.09% (2026년)
  longTermCare: 0.1295, // 장기요양보험 (건강보험의 12.95%)
  employmentInsurance: 0.009, // 고용보험 0.9%
};

// 국민연금 상한/하한
export const PENSION_LIMITS = {
  min: 370000, // 기준소득월액 하한
  max: 6170000, // 기준소득월액 상한 (2026년 예상)
};

// 건강보험 상한
export const HEALTH_INSURANCE_MAX = 8477820; // 월 상한액 (2026년 예상)

// 간이세액표 기반 소득세 계산 (2026년)
// 실제로는 더 복잡하지만 간략화
export function calculateIncomeTax(monthlyIncome: number, dependents: number): number {
  // 비과세 급여 제외 (식대 20만원)
  const taxableIncome = Math.max(0, monthlyIncome - 200000);

  if (taxableIncome <= 0) return 0;

  // 간이세액표 근사치 (단순화)
  let tax = 0;

  if (taxableIncome <= 1060000) {
    tax = 0;
  } else if (taxableIncome <= 1500000) {
    tax = (taxableIncome - 1060000) * 0.06;
  } else if (taxableIncome <= 3000000) {
    tax = 26400 + (taxableIncome - 1500000) * 0.15;
  } else if (taxableIncome <= 4500000) {
    tax = 251400 + (taxableIncome - 3000000) * 0.24;
  } else if (taxableIncome <= 8700000) {
    tax = 611400 + (taxableIncome - 4500000) * 0.35;
  } else if (taxableIncome <= 15000000) {
    tax = 2081400 + (taxableIncome - 8700000) * 0.38;
  } else {
    tax = 4476400 + (taxableIncome - 15000000) * 0.40;
  }

  // 부양가족 공제 (1인당 약 15만원 감소 효과, 간략화)
  const dependentDeduction = (dependents - 1) * 50000;
  tax = Math.max(0, tax - dependentDeduction);

  return Math.floor(tax);
}

export interface SalaryCalculationResult {
  // 입력값
  annualSalary: number;
  monthlyGross: number;
  dependents: number;
  includeSeverance: boolean;

  // 4대보험
  nationalPension: number;
  healthInsurance: number;
  longTermCare: number;
  employmentInsurance: number;
  totalInsurance: number;

  // 세금
  incomeTax: number;
  localIncomeTax: number;
  totalTax: number;

  // 결과
  totalDeductions: number;
  monthlyNet: number;
  annualNet: number;

  // 비율
  deductionRate: number;
}

export function calculateSalary(
  annualSalary: number,
  dependents: number = 1,
  includeSeverance: boolean = false
): SalaryCalculationResult {
  // 퇴직금 포함 여부에 따른 연봉 조정
  const actualAnnual = includeSeverance ? annualSalary * (12 / 13) : annualSalary;
  const monthlyGross = Math.floor(actualAnnual / 12);

  // 국민연금 (상한/하한 적용)
  const pensionBase = Math.min(Math.max(monthlyGross, PENSION_LIMITS.min), PENSION_LIMITS.max);
  const nationalPension = Math.floor(pensionBase * INSURANCE_RATES_2026.nationalPension);

  // 건강보험
  const healthInsurance = Math.min(
    Math.floor(monthlyGross * INSURANCE_RATES_2026.healthInsurance),
    HEALTH_INSURANCE_MAX
  );

  // 장기요양보험
  const longTermCare = Math.floor(healthInsurance * INSURANCE_RATES_2026.longTermCare);

  // 고용보험
  const employmentInsurance = Math.floor(monthlyGross * INSURANCE_RATES_2026.employmentInsurance);

  const totalInsurance = nationalPension + healthInsurance + longTermCare + employmentInsurance;

  // 소득세
  const incomeTax = calculateIncomeTax(monthlyGross, dependents);
  const localIncomeTax = Math.floor(incomeTax * 0.1); // 지방소득세 10%
  const totalTax = incomeTax + localIncomeTax;

  // 총 공제액
  const totalDeductions = totalInsurance + totalTax;

  // 실수령액
  const monthlyNet = monthlyGross - totalDeductions;
  const annualNet = monthlyNet * 12;

  // 공제율
  const deductionRate = totalDeductions / monthlyGross;

  return {
    annualSalary,
    monthlyGross,
    dependents,
    includeSeverance,
    nationalPension,
    healthInsurance,
    longTermCare,
    employmentInsurance,
    totalInsurance,
    incomeTax,
    localIncomeTax,
    totalTax,
    totalDeductions,
    monthlyNet,
    annualNet,
    deductionRate,
  };
}

// 연봉별 실수령액 테이블 생성
export function generateSalaryTable(minSalary: number = 24000000, maxSalary: number = 100000000, step: number = 1000000): SalaryCalculationResult[] {
  const results: SalaryCalculationResult[] = [];
  for (let salary = minSalary; salary <= maxSalary; salary += step) {
    results.push(calculateSalary(salary, 1, false));
  }
  return results;
}
