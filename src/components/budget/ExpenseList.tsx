"use client";

import type { Expense, ExpenseCategory } from "@/lib/budget";
import { EXPENSE_CATEGORIES, CATEGORY_ORDER, formatCurrency } from "@/lib/budget";
import ExpenseItem from "./ExpenseItem";

interface ExpenseListProps {
  expenses: Expense[];
  onChangeCategory: (expenseId: string, category: ExpenseCategory) => void;
  onDelete: (expenseId: string) => void;
}

export default function ExpenseList({
  expenses,
  onChangeCategory,
  onDelete,
}: ExpenseListProps) {
  // 카테고리별로 지출 분류
  const expensesByCategory: Record<ExpenseCategory, Expense[]> = {
    essential: [],
    flexible: [],
    luxury: [],
  };

  for (const expense of expenses) {
    expensesByCategory[expense.category].push(expense);
  }

  // 지출이 없는 경우
  if (expenses.length === 0) {
    return (
      <div className="bg-white border rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">📝</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          아직 등록된 지출이 없어요
        </h3>
        <p className="text-gray-500">
          위에서 &quot;새 지출 추가&quot; 버튼을 눌러 지출을 추가해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {CATEGORY_ORDER.map((categoryId) => {
        const categoryExpenses = expensesByCategory[categoryId];
        const category = EXPENSE_CATEGORIES[categoryId];
        const total = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);

        // 해당 카테고리에 지출이 없으면 렌더링하지 않음
        if (categoryExpenses.length === 0) {
          return null;
        }

        return (
          <div
            key={categoryId}
            className="bg-white border rounded-xl overflow-hidden"
            style={{ borderColor: category.borderColor }}
          >
            {/* 카테고리 헤더 */}
            <div
              className="px-4 py-3 flex items-center justify-between"
              style={{ backgroundColor: category.bgColor }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <h3 className="font-bold" style={{ color: category.color }}>
                  {category.label}
                </h3>
                <span className="text-sm text-gray-500">
                  ({categoryExpenses.length}건)
                </span>
              </div>
              <p className="font-bold" style={{ color: category.color }}>
                {formatCurrency(total)}원
              </p>
            </div>

            {/* 항목 목록 */}
            <div className="p-3 space-y-2">
              {categoryExpenses.map((expense) => (
                <ExpenseItem
                  key={expense.id}
                  expense={expense}
                  onChangeCategory={onChangeCategory}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
