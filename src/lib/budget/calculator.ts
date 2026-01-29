import type {
  BudgetData,
  BudgetSummary,
  CategorySummary,
  ExpenseCategory,
} from "./types";
import { CATEGORY_ORDER, EXPENSE_CATEGORIES } from "./constants";

// 카테고리별 합계 계산
export function calculateCategoryTotals(
  expenses: BudgetData["expenses"]
): Record<ExpenseCategory, number> {
  const totals: Record<ExpenseCategory, number> = {
    essential: 0,
    flexible: 0,
    luxury: 0,
  };

  for (const expense of expenses) {
    totals[expense.category] += expense.amount;
  }

  return totals;
}

// 전체 요약 계산
export function calculateBudgetSummary(data: BudgetData): BudgetSummary {
  const categoryTotals = calculateCategoryTotals(data.expenses);
  const totalExpenses = Object.values(categoryTotals).reduce(
    (sum, v) => sum + v,
    0
  );
  const savings = data.income - totalExpenses;
  const savingsRate = data.income > 0 ? (savings / data.income) * 100 : 0;

  const categories: CategorySummary[] = CATEGORY_ORDER.map((categoryId) => {
    const total = categoryTotals[categoryId];
    const percentage = data.income > 0 ? (total / data.income) * 100 : 0;
    const categoryInfo = EXPENSE_CATEGORIES[categoryId];

    return {
      category: categoryId,
      total,
      percentage,
      isOverBudget: percentage > categoryInfo.recommendedMax,
      isUnderBudget: percentage < categoryInfo.recommendedMin,
    };
  });

  return {
    income: data.income,
    totalExpenses,
    savings,
    savingsRate,
    categories,
  };
}

// 예산 상태 평가
export type BudgetHealth = "excellent" | "good" | "warning" | "danger";

export function evaluateBudgetHealth(summary: BudgetSummary): BudgetHealth {
  // 수입이 없으면 평가 불가
  if (summary.income === 0) {
    return "warning";
  }

  // 지출이 수입을 초과하면 위험
  if (summary.savings < 0) {
    return "danger";
  }

  // 저축률 기준 평가
  if (summary.savingsRate >= 30) {
    return "excellent";
  }
  if (summary.savingsRate >= 20) {
    return "good";
  }
  if (summary.savingsRate >= 10) {
    return "warning";
  }

  return "danger";
}

// 건강 상태별 메시지
export function getBudgetHealthMessage(health: BudgetHealth): {
  emoji: string;
  title: string;
  description: string;
  color: string;
} {
  switch (health) {
    case "excellent":
      return {
        emoji: "🎉",
        title: "훌륭해요!",
        description: "저축률 30% 이상! 재무 관리를 잘 하고 계시네요.",
        color: "#22C55E",
      };
    case "good":
      return {
        emoji: "👍",
        title: "좋아요!",
        description: "저축률 20% 이상! 조금만 더 노력하면 훌륭해요.",
        color: "#3B82F6",
      };
    case "warning":
      return {
        emoji: "⚠️",
        title: "주의가 필요해요",
        description: "저축률이 낮아요. 지출을 점검해보세요.",
        color: "#F97316",
      };
    case "danger":
      return {
        emoji: "🚨",
        title: "위험해요!",
        description: "지출이 수입을 초과했거나 저축이 거의 없어요.",
        color: "#EF4444",
      };
  }
}

// 카테고리별 조언 메시지
export function getCategoryAdvice(
  category: ExpenseCategory,
  percentage: number
): string | null {
  const info = EXPENSE_CATEGORIES[category];

  if (percentage > info.recommendedMax) {
    switch (category) {
      case "essential":
        return "기초생활비 비중이 높아요. 고정 지출 줄이기를 고려해보세요.";
      case "flexible":
        return "여유비가 많아요. 일부를 저축으로 돌려보세요.";
      case "luxury":
        return "사치비가 과해요. 꼭 필요한 지출인지 다시 생각해보세요.";
    }
  }

  return null;
}
