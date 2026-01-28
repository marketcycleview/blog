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
  // === 숨김 처리된 도구 (페이지는 유지, 목록에서만 제외) ===
  {
    id: "saju",
    title: {
      ko: "무료 사주팔자",
      en: "Free Saju Analysis",
    },
    description: {
      ko: "생년월일시로 보는 사주 분석",
      en: "Saju analysis based on birth date & time",
    },
    icon: "🔮",
    href: "/tools/saju",
    category: "other",
    hidden: true,
  },
  {
    id: "today-fortune",
    title: {
      ko: "오늘의 운세",
      en: "Today's Fortune",
    },
    description: {
      ko: "매일 달라지는 일진 운세",
      en: "Daily fortune that changes every day",
    },
    icon: "🌅",
    href: "/tools/today-fortune",
    category: "other",
    hidden: true,
  },
  {
    id: "zodiac-fortune",
    title: {
      ko: "2026 띠별 운세",
      en: "2026 Zodiac Fortune",
    },
    description: {
      ko: "병오년 12띠 운세 총정리",
      en: "2026 fortune for all 12 zodiac signs",
    },
    icon: "🐴",
    href: "/tools/zodiac-fortune",
    category: "other",
    hidden: true,
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
