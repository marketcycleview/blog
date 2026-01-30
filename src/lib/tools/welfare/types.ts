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
  { code: "youth", label: "청년" },
  { code: "senior", label: "노인" },
  { code: "disabled", label: "장애인" },
  { code: "singleparent", label: "한부모" },
  { code: "lowIncome", label: "저소득" },
  { code: "pregnant", label: "임산부" },
  { code: "child", label: "아동" },
  { code: "worker", label: "직장인" },
  { code: "veteran", label: "국가유공자" },
];
