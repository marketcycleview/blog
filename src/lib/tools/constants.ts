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
  category: "welfare" | "finance" | "tax" | "calculator" | "career" | "legal" | "business" | "realestate" | "other";
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
  career: {
    ko: "취업/커리어",
    en: "Career",
    icon: "💼",
    color: "indigo",
  },
  legal: {
    ko: "법률/분쟁",
    en: "Legal",
    icon: "⚖️",
    color: "red",
  },
  business: {
    ko: "창업/사업",
    en: "Business",
    icon: "🚀",
    color: "amber",
  },
  realestate: {
    ko: "부동산",
    en: "Real Estate",
    icon: "🏠",
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

  // === Phase 1: 신규 도구 ===
  {
    id: "legal-notice-generator",
    title: { ko: "내용증명 작성기", en: "Legal Notice Generator" },
    description: { ko: "내용증명 문서를 무료로 작성·복사·다운로드", en: "Generate legal notice documents for free" },
    icon: "📝",
    href: "/tools/legal-notice-generator",
    category: "legal",
    isPopular: true,
  },
  {
    id: "year-end-tax-simulator",
    title: { ko: "연말정산 시뮬레이터", en: "Year-End Tax Simulator" },
    description: { ko: "공제 항목별 환급/추가납부액 시뮬레이션", en: "Simulate year-end tax settlement" },
    icon: "🧾",
    href: "/tools/year-end-tax-simulator",
    category: "tax",
    isPopular: true,
  },
  {
    id: "post-resignation-timeline",
    title: { ko: "퇴사 후 할 일 타임라인", en: "Post-Resignation Timeline" },
    description: { ko: "퇴사일 기준 해야 할 일을 날짜별로 정리", en: "Timeline of tasks after resignation" },
    icon: "📅",
    href: "/tools/post-resignation-timeline",
    category: "career",
    isPopular: true,
  },
  {
    id: "financial-health-score",
    title: { ko: "나의 재무 건강 점수", en: "Financial Health Score" },
    description: { ko: "5개 영역 진단으로 재무 건강 점수 확인", en: "Check your financial health score" },
    icon: "❤️",
    href: "/tools/financial-health-score",
    category: "finance",
    isNew: true,
  },
  {
    id: "loan-finder",
    title: { ko: "나에게 맞는 대출 찾기", en: "Loan Finder" },
    description: { ko: "조건에 맞는 대출 상품 추천", en: "Find the best loan for your situation" },
    icon: "🔎",
    href: "/tools/loan-finder",
    category: "finance",
    isPopular: true,
  },

  // === Phase 2: 엔진 재활용 ===
  {
    id: "birth-parenting-timeline",
    title: { ko: "출산/육아 혜택 타임라인", en: "Birth & Parenting Benefits" },
    description: { ko: "출산 예정일 입력 → 혜택 날짜별 정리", en: "Timeline of birth & parenting benefits" },
    icon: "👶",
    href: "/tools/birth-parenting-timeline",
    category: "welfare",
    isNew: true,
  },
  {
    id: "housing-cost-simulator",
    title: { ko: "전세vs월세vs매매 시뮬레이터", en: "Housing Cost Simulator" },
    description: { ko: "거주 비용 비교로 최적 선택지 확인", en: "Compare housing cost options" },
    icon: "🏡",
    href: "/tools/housing-cost-simulator",
    category: "realestate",
    isNew: true,
  },
  {
    id: "individual-vs-corp-tax",
    title: { ko: "개인사업자 vs 법인 세금 비교", en: "Individual vs Corp Tax" },
    description: { ko: "매출 기준 개인/법인 세금 비교", en: "Compare taxes: individual vs corporation" },
    icon: "⚖️",
    href: "/tools/individual-vs-corp-tax",
    category: "tax",
    isNew: true,
  },
  {
    id: "finance-iq-test",
    title: { ko: "금융 IQ 테스트", en: "Finance IQ Test" },
    description: { ko: "20문제로 금융 상식 수준 확인", en: "Test your financial knowledge" },
    icon: "🧠",
    href: "/tools/finance-iq-test",
    category: "finance",
    isNew: true,
  },
  {
    id: "my-tax-calendar",
    title: { ko: "나의 세금 캘린더", en: "My Tax Calendar" },
    description: { ko: "직업별 세금 일정 + .ics 다운로드", en: "Personalized tax schedule with calendar export" },
    icon: "🗓️",
    href: "/tools/my-tax-calendar",
    category: "tax",
    isNew: true,
  },

  // === Phase 3: 엔진 재활용 확장 ===
  {
    id: "dispute-resolution-guide",
    title: { ko: "분쟁 해결 경로 안내", en: "Dispute Resolution Guide" },
    description: { ko: "분쟁 유형별 최적 해결 방법 추천", en: "Find the best dispute resolution path" },
    icon: "🛡️",
    href: "/tools/dispute-resolution-guide",
    category: "legal",
    isNew: true,
  },
  {
    id: "resignation-letter-generator",
    title: { ko: "퇴사 통보서 작성기", en: "Resignation Letter Generator" },
    description: { ko: "퇴사 통보서 자동 생성 및 다운로드", en: "Generate resignation letter" },
    icon: "✉️",
    href: "/tools/resignation-letter-generator",
    category: "career",
    isNew: true,
  },
  {
    id: "retirement-fund-simulator",
    title: { ko: "은퇴자금 시뮬레이터", en: "Retirement Fund Simulator" },
    description: { ko: "은퇴 후 자금 충분 여부 시뮬레이션", en: "Simulate retirement fund sufficiency" },
    icon: "🏖️",
    href: "/tools/retirement-fund-simulator",
    category: "finance",
    isNew: true,
  },
  {
    id: "pension-timing-comparator",
    title: { ko: "국민연금 수령시기별 비교", en: "Pension Timing Comparator" },
    description: { ko: "조기·정상·연기 수령 총액 비교", en: "Compare pension start timing options" },
    icon: "⏰",
    href: "/tools/pension-timing-comparator",
    category: "welfare",
    isNew: true,
  },
  {
    id: "housing-subscription-guide",
    title: { ko: "나에게 맞는 청약 전략", en: "Housing Subscription Guide" },
    description: { ko: "조건별 맞춤 청약 전략 추천", en: "Find your best housing subscription strategy" },
    icon: "🏗️",
    href: "/tools/housing-subscription-guide",
    category: "realestate",
    isNew: true,
  },
  {
    id: "startup-roadmap-timeline",
    title: { ko: "창업 로드맵 타임라인", en: "Startup Roadmap Timeline" },
    description: { ko: "업종별 창업 절차를 날짜와 함께 안내", en: "Step-by-step startup timeline by business type" },
    icon: "🚀",
    href: "/tools/startup-roadmap-timeline",
    category: "business",
    isNew: true,
  },
  {
    id: "repayment-method-comparator",
    title: { ko: "상환방식 비교 계산기", en: "Repayment Method Comparator" },
    description: { ko: "원리금균등·원금균등·만기일시 비교", en: "Compare loan repayment methods" },
    icon: "📊",
    href: "/tools/repayment-method-comparator",
    category: "finance",
    isNew: true,
  },

  // === Phase 4: 엔진 재활용 + 신규 ===
  {
    id: "business-plan-generator",
    title: { ko: "사업계획서 템플릿 생성기", en: "Business Plan Generator" },
    description: { ko: "업종별 사업계획서 골격 자동 생성", en: "Generate business plan templates" },
    icon: "📄",
    href: "/tools/business-plan-generator",
    category: "business",
    isNew: true,
  },
  {
    id: "lease-contract-checker",
    title: { ko: "임대차 계약서 검토 도구", en: "Lease Contract Checker" },
    description: { ko: "전세·월세 계약 체크리스트로 안전 확인", en: "Check lease contract safety" },
    icon: "🔒",
    href: "/tools/lease-contract-checker",
    category: "realestate",
    isNew: true,
  },
  {
    id: "home-purchase-timeline",
    title: { ko: "내 집 마련 타임라인", en: "Home Purchase Timeline" },
    description: { ko: "자금 축적 → 목표 달성 시점 시뮬레이션", en: "Simulate your home purchase timeline" },
    icon: "🏠",
    href: "/tools/home-purchase-timeline",
    category: "realestate",
    isNew: true,
  },
  {
    id: "career-path-diagnosis",
    title: { ko: "창업 vs 프리랜서 vs 취업 진단", en: "Career Path Diagnosis" },
    description: { ko: "6가지 질문으로 맞춤 커리어 경로 추천", en: "Find your ideal career path" },
    icon: "🧭",
    href: "/tools/career-path-diagnosis",
    category: "career",
    isNew: true,
  },
  {
    id: "tax-knowledge-quiz",
    title: { ko: "세금 상식 퀴즈", en: "Tax Knowledge Quiz" },
    description: { ko: "20문제로 세금 상식 수준 테스트", en: "Test your tax knowledge" },
    icon: "📝",
    href: "/tools/tax-knowledge-quiz",
    category: "tax",
    isNew: true,
  },
  {
    id: "realestate-terms-quiz",
    title: { ko: "부동산 용어 퀴즈", en: "Real Estate Terms Quiz" },
    description: { ko: "20문제로 부동산 상식 테스트", en: "Test your real estate knowledge" },
    icon: "🏢",
    href: "/tools/realestate-terms-quiz",
    category: "realestate",
    isNew: true,
  },
  {
    id: "inflation-calculator",
    title: { ko: "물가 상승률 체감 계산기", en: "Inflation Calculator" },
    description: { ko: "과거 돈의 현재 가치 계산", en: "Calculate past money in today's value" },
    icon: "📈",
    href: "/tools/inflation-calculator",
    category: "finance",
    isNew: true,
  },

  // === Phase 5: 독립형 도구 ===
  {
    id: "education-cost-planner",
    title: { ko: "자녀 교육비 플래너", en: "Education Cost Planner" },
    description: { ko: "유치원~대학 교육비 시뮬레이션 + 저축 계획", en: "Simulate education costs from kindergarten to university" },
    icon: "🎓",
    href: "/tools/education-cost-planner",
    category: "finance",
    isNew: true,
  },
  {
    id: "investment-comparator",
    title: { ko: "적금 vs ETF vs 부동산 수익 비교", en: "Investment Comparator" },
    description: { ko: "같은 금액 투자 시 세후 수익 비교", en: "Compare returns: savings vs ETF vs real estate" },
    icon: "💹",
    href: "/tools/investment-comparator",
    category: "finance",
    isNew: true,
  },

  // === 금리 비교 ===
  {
    id: "interest-rate-dashboard",
    title: { ko: "오늘의 금리 비교표", en: "Interest Rate Dashboard" },
    description: { ko: "은행별 정기예금·적금 금리 비교", en: "Compare deposit & savings rates across banks" },
    icon: "📊",
    href: "/tools/interest-rate-dashboard",
    category: "finance",
    isNew: true,
  },
  {
    id: "mortgage-rate-comparison",
    title: { ko: "주택담보대출 금리 비교", en: "Mortgage Rate Comparison" },
    description: { ko: "은행별 주담대 금리 비교 (고정·변동·혼합)", en: "Compare mortgage rates: fixed, variable, hybrid" },
    icon: "🏠",
    href: "/tools/mortgage-rate-comparison",
    category: "finance",
    isNew: true,
  },
  {
    id: "jeonse-loan-rates",
    title: { ko: "전세자금대출 금리 비교", en: "Jeonse Loan Rates" },
    description: { ko: "은행별 전세대출 금리·한도 비교", en: "Compare jeonse loan rates across banks" },
    icon: "🏢",
    href: "/tools/jeonse-loan-rates",
    category: "finance",
    isNew: true,
  },
  {
    id: "credit-loan-rates",
    title: { ko: "신용대출 금리 비교", en: "Credit Loan Rates" },
    description: { ko: "신용등급별 은행 대출금리 조회", en: "Check loan rates by credit grade" },
    icon: "💳",
    href: "/tools/credit-loan-rates",
    category: "finance",
    isNew: true,
  },

  // === 전월세 시세 ===
  {
    id: "rent-price-heatmap",
    title: { ko: "전월세 시세 히트맵", en: "Rent Price Heatmap" },
    description: { ko: "지역별 아파트 전세·월세 실거래가 비교", en: "Compare apartment rent prices by district" },
    icon: "🗺️",
    href: "/tools/rent-price-heatmap",
    category: "realestate",
    isNew: true,
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
