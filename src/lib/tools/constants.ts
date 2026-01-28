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
  category: "fortune" | "calculator" | "finder" | "other";
  isNew?: boolean;
  isPopular?: boolean;
}

// 카테고리 정보
export const TOOL_CATEGORIES: Record<
  string,
  { ko: string; en: string; icon: string; color: string }
> = {
  fortune: {
    ko: "운세/사주",
    en: "Fortune",
    icon: "🔮",
    color: "purple",
  },
  calculator: {
    ko: "계산기",
    en: "Calculator",
    icon: "🧮",
    color: "blue",
  },
  finder: {
    ko: "검색/찾기",
    en: "Finder",
    icon: "🔍",
    color: "green",
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
    category: "fortune",
    isPopular: true,
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
    category: "fortune",
    isNew: true,
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
    category: "fortune",
  },
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
    category: "finder",
    isPopular: true,
  },
];

// 카테고리별 도구 필터링
export function getToolsByCategory(category: string): Tool[] {
  return TOOLS.filter((tool) => tool.category === category);
}

// 인기 도구만 가져오기
export function getPopularTools(): Tool[] {
  return TOOLS.filter((tool) => tool.isPopular);
}

// 새로운 도구만 가져오기
export function getNewTools(): Tool[] {
  return TOOLS.filter((tool) => tool.isNew);
}

// 메인페이지용 도구 (최대 6개)
export function getFeaturedTools(limit: number = 6): Tool[] {
  // 인기 도구 우선, 그 다음 새로운 도구, 나머지
  const popular = TOOLS.filter((t) => t.isPopular);
  const newTools = TOOLS.filter((t) => t.isNew && !t.isPopular);
  const others = TOOLS.filter((t) => !t.isPopular && !t.isNew);

  return [...popular, ...newTools, ...others].slice(0, limit);
}
