// 상환방식 비교 시뮬레이터 모듈 (원리금균등 vs 원금균등 vs 만기일시)

export interface RepaymentInput {
  principal: number; // 대출 원금 (원)
  annualRate: number; // 연 금리 (%)
  termMonths: number; // 대출 기간 (개월)
}

export interface MonthlyPayment {
  month: number;
  payment: number; // 월 납입액
  principalPart: number; // 원금 상환분
  interestPart: number; // 이자 상환분
  balance: number; // 남은 원금
}

export interface RepaymentScenario {
  label: string;
  firstPayment: number;
  lastPayment: number;
  totalInterest: number;
  totalPayment: number;
  schedule: MonthlyPayment[];
}

export interface RepaymentComparisonResult {
  equalPrincipalInterest: RepaymentScenario; // 원리금균등
  equalPrincipal: RepaymentScenario; // 원금균등
  bulletRepayment: RepaymentScenario; // 만기일시
  interestSaved: string; // 이자 절약 설명
}

// 원리금균등 상환
function calcEqualPrincipalInterest(principal: number, monthlyRate: number, months: number): RepaymentScenario {
  const schedule: MonthlyPayment[] = [];
  let balance = principal;

  const payment = monthlyRate > 0
    ? Math.round((principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1))
    : Math.round(principal / months);

  let totalInterest = 0;

  for (let m = 1; m <= months; m++) {
    const interestPart = Math.round(balance * monthlyRate);
    const principalPart = payment - interestPart;
    balance = Math.max(0, balance - principalPart);
    totalInterest += interestPart;
    schedule.push({ month: m, payment, principalPart, interestPart, balance });
  }

  return {
    label: "원리금균등",
    firstPayment: payment,
    lastPayment: payment,
    totalInterest,
    totalPayment: principal + totalInterest,
    schedule,
  };
}

// 원금균등 상환
function calcEqualPrincipal(principal: number, monthlyRate: number, months: number): RepaymentScenario {
  const schedule: MonthlyPayment[] = [];
  let balance = principal;
  const monthlyPrincipal = Math.round(principal / months);
  let totalInterest = 0;

  for (let m = 1; m <= months; m++) {
    const interestPart = Math.round(balance * monthlyRate);
    const principalPart = m === months ? balance : monthlyPrincipal;
    const payment = principalPart + interestPart;
    balance = Math.max(0, balance - principalPart);
    totalInterest += interestPart;
    schedule.push({ month: m, payment, principalPart, interestPart, balance });
  }

  return {
    label: "원금균등",
    firstPayment: schedule[0]?.payment || 0,
    lastPayment: schedule[schedule.length - 1]?.payment || 0,
    totalInterest,
    totalPayment: principal + totalInterest,
    schedule,
  };
}

// 만기일시 상환
function calcBulletRepayment(principal: number, monthlyRate: number, months: number): RepaymentScenario {
  const schedule: MonthlyPayment[] = [];
  const monthlyInterest = Math.round(principal * monthlyRate);
  let totalInterest = 0;

  for (let m = 1; m <= months; m++) {
    const isLast = m === months;
    const payment = isLast ? monthlyInterest + principal : monthlyInterest;
    totalInterest += monthlyInterest;
    schedule.push({
      month: m,
      payment,
      principalPart: isLast ? principal : 0,
      interestPart: monthlyInterest,
      balance: isLast ? 0 : principal,
    });
  }

  return {
    label: "만기일시",
    firstPayment: monthlyInterest,
    lastPayment: monthlyInterest + principal,
    totalInterest,
    totalPayment: principal + totalInterest,
    schedule,
  };
}

export function calculateRepaymentComparison(input: RepaymentInput): RepaymentComparisonResult {
  const { principal, annualRate, termMonths } = input;
  const monthlyRate = annualRate / 100 / 12;

  const equalPrincipalInterest = calcEqualPrincipalInterest(principal, monthlyRate, termMonths);
  const equalPrincipal = calcEqualPrincipal(principal, monthlyRate, termMonths);
  const bulletRepayment = calcBulletRepayment(principal, monthlyRate, termMonths);

  // 이자 절약 비교
  const minInterest = Math.min(
    equalPrincipalInterest.totalInterest,
    equalPrincipal.totalInterest,
    bulletRepayment.totalInterest
  );
  const maxInterest = Math.max(
    equalPrincipalInterest.totalInterest,
    equalPrincipal.totalInterest,
    bulletRepayment.totalInterest
  );
  const saved = maxInterest - minInterest;

  const interestSaved = `원금균등 상환이 만기일시 대비 총 이자를 ${Math.round(saved / 10000).toLocaleString()}만원 절약합니다. 원리금균등은 그 중간입니다.`;

  return {
    equalPrincipalInterest,
    equalPrincipal,
    bulletRepayment,
    interestSaved,
  };
}
