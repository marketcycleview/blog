// 콘텐츠 카테고리 설정 (단일 소스)
// 도구 카테고리(tools/constants.ts)와는 별도 — 역할이 다름

export interface Category {
  id: string;
  icon: string;
  color: string; // tailwind color prefix (e.g. "blue", "green")
  label: { ko: string; en: string };
  description: { ko: string; en: string };
  href: string; // "/{locale}/subsidy" 등에서 locale 제외 경로
}

export const CATEGORIES: Category[] = [
  {
    id: "subsidy",
    icon: "💰",
    color: "blue",
    label: { ko: "복지/지원금", en: "Subsidies" },
    description: {
      ko: "정부/지자체 지원금, 복지 정책 관련 정보를 한눈에 확인하세요.",
      en: "Find government subsidies and welfare policy information.",
    },
    href: "/subsidy",
  },
  {
    id: "finance",
    icon: "🏦",
    color: "green",
    label: { ko: "금융/대출", en: "Finance" },
    description: {
      ko: "대출, 저축, 투자, 금융상품 비교 등 금융 정보를 제공합니다.",
      en: "Information on loans, savings, investments, and financial product comparisons.",
    },
    href: "/finance",
  },
  {
    id: "tax",
    icon: "📋",
    color: "purple",
    label: { ko: "세금/연말정산", en: "Tax" },
    description: {
      ko: "연말정산, 종합소득세, 양도세 등 세금 신고와 절세 정보를 알려드립니다.",
      en: "Tax filing and tax-saving information including year-end settlement and income tax.",
    },
    href: "/tax",
  },
  {
    id: "real-estate",
    icon: "🏠",
    color: "orange",
    label: { ko: "부동산", en: "Real Estate" },
    description: {
      ko: "전세/월세, 매매, 청약, 경매, 재개발 등 부동산 정보를 정리합니다.",
      en: "Real estate information including rent, purchase, subscriptions, and redevelopment.",
    },
    href: "/real-estate",
  },
  {
    id: "career",
    icon: "💼",
    color: "indigo",
    label: { ko: "취업/커리어", en: "Career" },
    description: {
      ko: "연봉, 이직, 퇴사, 부업, 직장인 권리 등 커리어 정보를 다룹니다.",
      en: "Career information including salary, job change, resignation, and employee rights.",
    },
    href: "/career",
  },
  {
    id: "legal",
    icon: "⚖️",
    color: "red",
    label: { ko: "법률/소비자", en: "Legal" },
    description: {
      ko: "계약, 환불, 사기 대처, 소송, 내용증명 등 법률 정보를 안내합니다.",
      en: "Legal information including contracts, refunds, fraud, lawsuits, and legal notices.",
    },
    href: "/legal",
  },
  {
    id: "business",
    icon: "🚀",
    color: "amber",
    label: { ko: "창업/사업", en: "Business" },
    description: {
      ko: "사업자등록, 온라인사업, 프랜차이즈, 운영 정보를 제공합니다.",
      en: "Business information including registration, online business, franchise, and operations.",
    },
    href: "/business",
  },
];

// id → Category 매핑
export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
);

// 모든 카테고리 id 배열
export const ALL_CATEGORY_IDS: string[] = CATEGORIES.map((c) => c.id);
