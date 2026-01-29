// 대출 상환 방식
export type RepaymentType = 'equal_principal_interest' | 'equal_principal' | 'bullet';

export interface LoanCalculationInput {
  principal: number; // 대출금액
  annualRate: number; // 연이율 (%)
  months: number; // 대출기간 (개월)
  repaymentType: RepaymentType; // 상환방식
}

export interface MonthlyPayment {
  month: number;
  payment: number; // 월 상환액
  principal: number; // 원금
  interest: number; // 이자
  remainingBalance: number; // 남은 원금
}

export interface LoanCalculationResult {
  input: LoanCalculationInput;
  monthlyPayment: number; // 월 상환액 (원리금균등일 때)
  totalPayment: number; // 총 상환액
  totalInterest: number; // 총 이자
  schedule: MonthlyPayment[]; // 상환 스케줄
}

// 원리금균등상환 계산
function calculateEqualPrincipalInterest(input: LoanCalculationInput): LoanCalculationResult {
  const { principal, annualRate, months } = input;
  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) {
    // 무이자
    const monthlyPayment = Math.floor(principal / months);
    const schedule: MonthlyPayment[] = [];
    let remaining = principal;

    for (let i = 1; i <= months; i++) {
      const payment = i === months ? remaining : monthlyPayment;
      remaining -= payment;
      schedule.push({
        month: i,
        payment,
        principal: payment,
        interest: 0,
        remainingBalance: remaining,
      });
    }

    return {
      input,
      monthlyPayment,
      totalPayment: principal,
      totalInterest: 0,
      schedule,
    };
  }

  // 월 상환액 계산 공식
  const monthlyPayment = Math.floor(
    principal * monthlyRate * Math.pow(1 + monthlyRate, months) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );

  const schedule: MonthlyPayment[] = [];
  let remainingBalance = principal;
  let totalInterest = 0;

  for (let month = 1; month <= months; month++) {
    const interest = Math.floor(remainingBalance * monthlyRate);
    const principalPayment = monthlyPayment - interest;
    remainingBalance -= principalPayment;

    if (month === months) {
      // 마지막 달 잔액 정리
      remainingBalance = 0;
    }

    totalInterest += interest;

    schedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest,
      remainingBalance: Math.max(0, remainingBalance),
    });
  }

  return {
    input,
    monthlyPayment,
    totalPayment: monthlyPayment * months,
    totalInterest,
    schedule,
  };
}

// 원금균등상환 계산
function calculateEqualPrincipal(input: LoanCalculationInput): LoanCalculationResult {
  const { principal, annualRate, months } = input;
  const monthlyRate = annualRate / 100 / 12;
  const monthlyPrincipal = Math.floor(principal / months);

  const schedule: MonthlyPayment[] = [];
  let remainingBalance = principal;
  let totalInterest = 0;

  for (let month = 1; month <= months; month++) {
    const interest = Math.floor(remainingBalance * monthlyRate);
    const principalPayment = month === months ? remainingBalance : monthlyPrincipal;
    const payment = principalPayment + interest;
    remainingBalance -= principalPayment;
    totalInterest += interest;

    schedule.push({
      month,
      payment,
      principal: principalPayment,
      interest,
      remainingBalance: Math.max(0, remainingBalance),
    });
  }

  return {
    input,
    monthlyPayment: schedule[0].payment, // 첫 달 상환액 (최대)
    totalPayment: principal + totalInterest,
    totalInterest,
    schedule,
  };
}

// 만기일시상환 계산
function calculateBullet(input: LoanCalculationInput): LoanCalculationResult {
  const { principal, annualRate, months } = input;
  const monthlyRate = annualRate / 100 / 12;
  const monthlyInterest = Math.floor(principal * monthlyRate);

  const schedule: MonthlyPayment[] = [];

  for (let month = 1; month <= months; month++) {
    const isLast = month === months;
    schedule.push({
      month,
      payment: isLast ? principal + monthlyInterest : monthlyInterest,
      principal: isLast ? principal : 0,
      interest: monthlyInterest,
      remainingBalance: isLast ? 0 : principal,
    });
  }

  const totalInterest = monthlyInterest * months;

  return {
    input,
    monthlyPayment: monthlyInterest,
    totalPayment: principal + totalInterest,
    totalInterest,
    schedule,
  };
}

// 대출 계산 메인 함수
export function calculateLoan(input: LoanCalculationInput): LoanCalculationResult {
  switch (input.repaymentType) {
    case 'equal_principal_interest':
      return calculateEqualPrincipalInterest(input);
    case 'equal_principal':
      return calculateEqualPrincipal(input);
    case 'bullet':
      return calculateBullet(input);
    default:
      return calculateEqualPrincipalInterest(input);
  }
}

// 상환방식 비교
export function compareLoanTypes(principal: number, annualRate: number, months: number): {
  equalPrincipalInterest: LoanCalculationResult;
  equalPrincipal: LoanCalculationResult;
  bullet: LoanCalculationResult;
} {
  return {
    equalPrincipalInterest: calculateLoan({ principal, annualRate, months, repaymentType: 'equal_principal_interest' }),
    equalPrincipal: calculateLoan({ principal, annualRate, months, repaymentType: 'equal_principal' }),
    bullet: calculateLoan({ principal, annualRate, months, repaymentType: 'bullet' }),
  };
}

// 상환방식 한글명
export const REPAYMENT_TYPE_NAMES: Record<RepaymentType, string> = {
  equal_principal_interest: '원리금균등상환',
  equal_principal: '원금균등상환',
  bullet: '만기일시상환',
};
