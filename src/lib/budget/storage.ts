import type { BudgetData, Expense } from "./types";

const STORAGE_KEY = "budget-planner-data";

// 기본 데이터
function createDefaultData(): BudgetData {
  return {
    income: 0,
    expenses: [],
    updatedAt: Date.now(),
  };
}

// 데이터 로드
export function loadBudgetData(): BudgetData {
  if (typeof window === "undefined") {
    return createDefaultData();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return createDefaultData();
    }

    const data = JSON.parse(stored) as BudgetData;

    // 데이터 유효성 검사
    if (
      typeof data.income !== "number" ||
      !Array.isArray(data.expenses)
    ) {
      return createDefaultData();
    }

    return data;
  } catch {
    return createDefaultData();
  }
}

// 데이터 저장
export function saveBudgetData(data: BudgetData): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const toSave: BudgetData = {
      ...data,
      updatedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (error) {
    console.error("Failed to save budget data:", error);
  }
}

// 수입 업데이트
export function updateIncome(income: number): BudgetData {
  const data = loadBudgetData();
  data.income = income;
  saveBudgetData(data);
  return data;
}

// 지출 추가
export function addExpense(expense: Omit<Expense, "id" | "createdAt">): BudgetData {
  const data = loadBudgetData();
  const newExpense: Expense = {
    ...expense,
    id: generateId(),
    createdAt: Date.now(),
  };
  data.expenses.push(newExpense);
  saveBudgetData(data);
  return data;
}

// 지출 수정
export function updateExpense(
  expenseId: string,
  updates: Partial<Omit<Expense, "id" | "createdAt">>
): BudgetData {
  const data = loadBudgetData();
  const index = data.expenses.findIndex((e) => e.id === expenseId);

  if (index !== -1) {
    data.expenses[index] = {
      ...data.expenses[index],
      ...updates,
    };
    saveBudgetData(data);
  }

  return data;
}

// 지출 삭제
export function deleteExpense(expenseId: string): BudgetData {
  const data = loadBudgetData();
  data.expenses = data.expenses.filter((e) => e.id !== expenseId);
  saveBudgetData(data);
  return data;
}

// 지출 카테고리 변경
export function changeExpenseCategory(
  expenseId: string,
  newCategory: Expense["category"]
): BudgetData {
  return updateExpense(expenseId, { category: newCategory });
}

// 전체 초기화
export function resetBudgetData(): BudgetData {
  const data = createDefaultData();
  saveBudgetData(data);
  return data;
}

// ID 생성
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
