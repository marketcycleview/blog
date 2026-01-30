/** 복지 서비스 */
export interface WelfareService {
  id: string;
  name: string;
  summary: string;
  category: WelfareCategory;
  targetGroup: string;
  department: string;
  applyMethod: string;
  url?: string;
}

export type WelfareCategory =
  | "생활안정"
  | "주거"
  | "교육"
  | "고용"
  | "건강"
  | "문화"
  | "기타";

export interface WelfareData {
  services: WelfareService[];
  totalCount: number;
  updatedAt: string;
  isLive: boolean;
}

export const WELFARE_CATEGORIES: { code: WelfareCategory; label: string; icon: string }[] = [
  { code: "생활안정", label: "생활안정", icon: "💰" },
  { code: "주거", label: "주거·자립", icon: "🏠" },
  { code: "교육", label: "교육", icon: "📚" },
  { code: "고용", label: "고용·창업", icon: "💼" },
  { code: "건강", label: "건강·의료", icon: "🏥" },
  { code: "문화", label: "문화·여가", icon: "🎭" },
  { code: "기타", label: "기타", icon: "📦" },
];

export const TARGET_GROUPS = [
  { code: "all", label: "전체" },
  { code: "청년", label: "청년" },
  { code: "노인", label: "노인" },
  { code: "장애인", label: "장애인" },
  { code: "한부모", label: "한부모" },
  { code: "저소득", label: "저소득" },
  { code: "임산부", label: "임산부" },
  { code: "아동", label: "아동" },
  { code: "직장인", label: "직장인" },
  { code: "국가유공자", label: "국가유공자" },
];
