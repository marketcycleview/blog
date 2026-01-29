// 지출 카테고리 타입
export type ExpenseCategory = "essential" | "flexible" | "luxury";

// 지출 카테고리 정보
export interface CategoryInfo {
  id: ExpenseCategory;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  recommendedMin: number; // 권장 최소 비율 (%)
  recommendedMax: number; // 권장 최대 비율 (%)
}

// 지출 항목 그룹
export type ExpenseGroup =
  | "housing"
  | "food"
  | "transport"
  | "telecom"
  | "health"
  | "finance"
  | "education"
  | "culture"
  | "shopping"
  | "beauty"
  | "social"
  | "pet"
  | "childcare";

// 지출 항목 정보
export interface ExpenseItemInfo {
  id: string;
  label: string;
  group: ExpenseGroup;
  defaultCategory: ExpenseCategory; // 기본 배치 카테고리
}

// 지출 그룹 정보
export interface ExpenseGroupInfo {
  id: ExpenseGroup;
  label: string;
  icon: string;
}

// 개별 지출 데이터
export interface Expense {
  id: string;
  itemId: string; // ExpenseItemInfo.id 참조
  amount: number;
  category: ExpenseCategory;
  memo?: string;
  createdAt: number;
}

// 예산 데이터 (로컬 스토리지 저장용)
export interface BudgetData {
  income: number;
  expenses: Expense[];
  updatedAt: number;
}

// 카테고리별 요약
export interface CategorySummary {
  category: ExpenseCategory;
  total: number;
  percentage: number;
  isOverBudget: boolean;
  isUnderBudget: boolean;
}

// 전체 예산 요약
export interface BudgetSummary {
  income: number;
  totalExpenses: number;
  savings: number;
  savingsRate: number;
  categories: CategorySummary[];
}
