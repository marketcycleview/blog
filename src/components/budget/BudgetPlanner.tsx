"use client";

import { useState, useEffect, useCallback } from "react";
import type { BudgetData, ExpenseCategory } from "@/lib/budget";
import {
  loadBudgetData,
  updateIncome,
  addExpense,
  changeExpenseCategory,
  deleteExpense,
  resetBudgetData,
  calculateBudgetSummary,
} from "@/lib/budget";
import IncomeSection from "./IncomeSection";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import BudgetSummary from "./BudgetSummary";
import BudgetChart from "./BudgetChart";

export default function BudgetPlanner() {
  const [data, setData] = useState<BudgetData | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // 초기 데이터 로드
  useEffect(() => {
    const loaded = loadBudgetData();
    setData(loaded);
  }, []);

  // 수입 변경
  const handleIncomeChange = useCallback((income: number) => {
    const updated = updateIncome(income);
    setData(updated);
  }, []);

  // 지출 추가
  const handleAddExpense = useCallback(
    (itemId: string, amount: number, category: ExpenseCategory) => {
      const updated = addExpense({ itemId, amount, category });
      setData(updated);
    },
    []
  );

  // 카테고리 변경
  const handleChangeCategory = useCallback(
    (expenseId: string, category: ExpenseCategory) => {
      const updated = changeExpenseCategory(expenseId, category);
      setData(updated);
    },
    []
  );

  // 지출 삭제
  const handleDeleteExpense = useCallback((expenseId: string) => {
    const updated = deleteExpense(expenseId);
    setData(updated);
  }, []);

  // 전체 초기화
  const handleReset = useCallback(() => {
    const reset = resetBudgetData();
    setData(reset);
    setShowResetConfirm(false);
  }, []);

  // 로딩 중
  if (!data) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  const summary = calculateBudgetSummary(data);

  return (
    <div className="space-y-6">
      {/* 소개 */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100 rounded-xl p-4 sm:p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          💸 월 지출을 3가지로 나눠보세요
        </h2>
        <p className="text-gray-600 mb-3">
          같은 &quot;외식&quot;도 상황에 따라 기초생활비가 될 수도, 사치비가 될
          수도 있어요. 자유롭게 분류하고 내 소비 패턴을 파악해보세요.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
            🔵 기초생활비 (50-60%)
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
            🟢 여유비 (20-30%)
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
            🟠 사치비 (0-10%)
          </span>
        </div>
      </div>

      {/* 수입 입력 */}
      <IncomeSection income={data.income} onChange={handleIncomeChange} />

      {/* 지출 추가 폼 */}
      <ExpenseForm onAdd={handleAddExpense} />

      {/* 요약 및 차트 (2열) */}
      {data.income > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BudgetSummary summary={summary} />
          <BudgetChart summary={summary} />
        </div>
      )}

      {/* 지출 목록 */}
      <ExpenseList
        expenses={data.expenses}
        onChangeCategory={handleChangeCategory}
        onDelete={handleDeleteExpense}
      />

      {/* 초기화 버튼 */}
      {(data.income > 0 || data.expenses.length > 0) && (
        <div className="flex justify-center pt-4">
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-4 py-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              🗑️ 전체 초기화
            </button>
          ) : (
            <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <span className="text-sm text-red-700">
                모든 데이터를 삭제할까요?
              </span>
              <button
                onClick={handleReset}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                삭제
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
            </div>
          )}
        </div>
      )}

      {/* 안내 */}
      <div className="bg-gray-50 border rounded-lg p-4 text-sm text-gray-600">
        <p className="font-medium mb-2">💡 사용 팁</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>
            데이터는 브라우저에 자동 저장되어 새로고침해도 유지돼요.
          </li>
          <li>
            같은 항목도 카테고리를 자유롭게 변경할 수 있어요.
            (예: 회사 근처 점심 = 기초생활비, 데이트 외식 = 여유비)
          </li>
          <li>저축률 20% 이상을 목표로 해보세요.</li>
        </ul>
      </div>
    </div>
  );
}
