// 도구 데이터 타입 정의
export interface Tool {
  id: string;
  title: {
    ko: string;
    en: string;
  };
  description: {
    ko: string;
    en: string;
  };
  icon: string;
  href: string;
  category: "welfare" | "finance" | "tax" | "calculator" | "other";
  isNew?: boolean;
  isPopular?: boolean;
  hidden?: boolean; // 목록에서 숨김 (페이지는 유지)
}

// 카테고리 정보
export const TOOL_CATEGORIES: Record<
  string,
  { ko: string; en: string; icon: string; color: string }
> = {
  welfare: {
    ko: "복지/지원금",
    en: "Welfare",
    icon: "💰",
    color: "blue",
  },
  finance: {
    ko: "금융/대출",
    en: "Finance",
    icon: "🏦",
    color: "green",
  },
  tax: {
    ko: "세금/연말정산",
    en: "Tax",
    icon: "📋",
    color: "purple",
  },
  calculator: {
    ko: "생활 계산기",
    en: "Calculator",
    icon: "🧮",
    color: "orange",
  },
  other: {
    ko: "기타",
    en: "Other",
    icon: "📦",
    color: "gray",
  },
};

// 도구 목록
export const TOOLS: Tool[] = [
  // === 복지/지원금 ===
  {
    id: "welfare-finder",
    title: {
      ko: "복지 정책 찾기",
      en: "Welfare Policy Finder",
    },
    description: {
      ko: "나에게 맞는 복지 정책 검색",
      en: "Find welfare policies that fit you",
    },
    icon: "🔍",
    href: "/tools/welfare-finder",
    category: "welfare",
    isPopular: true,
  },
  {
    id: "median-income-calculator",
    title: {
      ko: "중위소득 계산기",
      en: "Median Income Calculator",
    },
    description: {
      ko: "가구별 기준 중위소득 확인 및 복지 자격 조회",
      en: "Check median income and welfare eligibility",
    },
    icon: "📊",
    href: "/tools/median-income-calculator",
    category: "welfare",
  },

  // === 금융/대출 ===
  {
    id: "loan-calculator",
    title: {
      ko: "대출 이자 계산기",
      en: "Loan Interest Calculator",
    },
    description: {
      ko: "원리금균등, 원금균등, 만기일시 비교",
      en: "Compare repayment methods and interest",
    },
    icon: "🏦",
    href: "/tools/loan-calculator",
    category: "finance",
    isPopular: true,
  },
  {
    id: "jeonwolse-calculator",
    title: {
      ko: "전월세 전환 계산기",
      en: "Deposit-Rent Converter",
    },
    description: {
      ko: "전세 ↔ 월세 전환, 보증금 조정 계산",
      en: "Convert between Jeonse and monthly rent",
    },
    icon: "🏠",
    href: "/tools/jeonwolse-calculator",
    category: "finance",
  },

  // === 세금/연말정산 ===
  {
    id: "salary-calculator",
    title: {
      ko: "연봉 실수령액 계산기",
      en: "Net Salary Calculator",
    },
    description: {
      ko: "4대보험, 소득세 공제 후 실수령액 계산",
      en: "Calculate net salary after tax and insurance",
    },
    icon: "💵",
    href: "/tools/salary-calculator",
    category: "tax",
    isPopular: true,
  },
  {
    id: "tax-refund-calculator",
    title: {
      ko: "연말정산 환급액 계산기",
      en: "Tax Refund Calculator",
    },
    description: {
      ko: "소득공제, 세액공제 반영 예상 환급액",
      en: "Estimate your year-end tax refund",
    },
    icon: "💰",
    href: "/tools/tax-refund-calculator",
    category: "tax",
    isNew: true,
  },
  {
    id: "severance-calculator",
    title: {
      ko: "퇴직금 계산기",
      en: "Severance Pay Calculator",
    },
    description: {
      ko: "근속연수별 퇴직금 및 세금 계산",
      en: "Calculate severance pay by work period",
    },
    icon: "🎁",
    href: "/tools/severance-calculator",
    category: "tax",
  },
  {
    id: "unemployment-calculator",
    title: {
      ko: "실업급여 계산기",
      en: "Unemployment Benefit Calculator",
    },
    description: {
      ko: "예상 수령액, 지급일수 확인",
      en: "Estimate unemployment benefit amount",
    },
    icon: "📋",
    href: "/tools/unemployment-calculator",
    category: "welfare",
  },

  // === 생활 계산기 ===
  {
    id: "budget-planner",
    title: {
      ko: "재무설계 계산기",
      en: "Budget Planner",
    },
    description: {
      ko: "월 지출을 3가지로 분류하고 저축 가능액 계산",
      en: "Categorize expenses and calculate savings",
    },
    icon: "💸",
    href: "/tools/budget-planner",
    category: "calculator",
  },
];

// 보이는 도구만 필터링 (hidden 제외)
export function getVisibleTools(): Tool[] {
  return TOOLS.filter((tool) => !tool.hidden);
}

// 카테고리별 도구 필터링 (hidden 제외)
export function getToolsByCategory(category: string): Tool[] {
  return TOOLS.filter((tool) => tool.category === category && !tool.hidden);
}

// 인기 도구만 가져오기 (hidden 제외)
export function getPopularTools(): Tool[] {
  return TOOLS.filter((tool) => tool.isPopular && !tool.hidden);
}

// 새로운 도구만 가져오기 (hidden 제외)
export function getNewTools(): Tool[] {
  return TOOLS.filter((tool) => tool.isNew && !tool.hidden);
}

// 메인페이지용 도구 (최대 6개, hidden 제외)
export function getFeaturedTools(limit: number = 6): Tool[] {
  const visible = getVisibleTools();
  const popular = visible.filter((t) => t.isPopular);
  const newTools = visible.filter((t) => t.isNew && !t.isPopular);
  const others = visible.filter((t) => !t.isPopular && !t.isNew);

  return [...popular, ...newTools, ...others].slice(0, limit);
}
