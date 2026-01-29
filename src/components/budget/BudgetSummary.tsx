"use client";

import type { BudgetSummary as BudgetSummaryType } from "@/lib/budget";
import {
  EXPENSE_CATEGORIES,
  formatCurrency,
  evaluateBudgetHealth,
  getBudgetHealthMessage,
  getCategoryAdvice,
} from "@/lib/budget";

interface BudgetSummaryProps {
  summary: BudgetSummaryType;
}

export default function BudgetSummary({ summary }: BudgetSummaryProps) {
  const health = evaluateBudgetHealth(summary);
  const healthInfo = getBudgetHealthMessage(health);

  // 수입이 없으면 안내 메시지
  if (summary.income === 0) {
    return (
      <div className="bg-white border rounded-xl p-6 text-center">
        <div className="text-4xl mb-4">💰</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          월 수입을 먼저 입력해주세요
        </h3>
        <p className="text-gray-500">
          수입을 입력하면 지출 비율과 저축 가능액을 계산해드려요.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-xl p-4 sm:p-6">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span>📊</span>
        <span>예산 요약</span>
      </h3>

      {/* 건강 상태 */}
      <div
        className="p-4 rounded-lg mb-4"
        style={{ backgroundColor: `${healthInfo.color}15` }}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{healthInfo.emoji}</span>
          <div>
            <p className="font-bold" style={{ color: healthInfo.color }}>
              {healthInfo.title}
            </p>
            <p className="text-sm text-gray-600">{healthInfo.description}</p>
          </div>
        </div>
      </div>

      {/* 주요 지표 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* 수입 */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">월 수입</p>
          <p className="text-xl font-bold">{formatCurrency(summary.income)}원</p>
        </div>

        {/* 총 지출 */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">총 지출</p>
          <p className="text-xl font-bold">
            {formatCurrency(summary.totalExpenses)}원
          </p>
        </div>

        {/* 저축 가능액 */}
        <div
          className={`p-3 rounded-lg ${
            summary.savings >= 0 ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <p className="text-sm text-gray-500 mb-1">저축 가능액</p>
          <p
            className={`text-xl font-bold ${
              summary.savings >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {summary.savings < 0 ? "-" : ""}
            {formatCurrency(Math.abs(summary.savings))}원
          </p>
        </div>

        {/* 저축률 */}
        <div
          className={`p-3 rounded-lg ${
            summary.savingsRate >= 20 ? "bg-green-50" : "bg-orange-50"
          }`}
        >
          <p className="text-sm text-gray-500 mb-1">저축률</p>
          <p
            className={`text-xl font-bold ${
              summary.savingsRate >= 20 ? "text-green-600" : "text-orange-600"
            }`}
          >
            {summary.savingsRate.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* 카테고리별 비율 */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">카테고리별 비율</h4>
        {summary.categories.map((cat) => {
          const categoryInfo = EXPENSE_CATEGORIES[cat.category];
          const advice = getCategoryAdvice(cat.category, cat.percentage);
          const barWidth = Math.min(cat.percentage, 100);

          return (
            <div key={cat.category}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: categoryInfo.color }}
                  />
                  <span className="text-sm font-medium">{categoryInfo.label}</span>
                  <span className="text-xs text-gray-400">
                    (권장 {categoryInfo.recommendedMin}-{categoryInfo.recommendedMax}%)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">
                    {cat.percentage.toFixed(1)}%
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({formatCurrency(cat.total)}원)
                  </span>
                </div>
              </div>

              {/* 비율 바 */}
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor: cat.isOverBudget
                      ? "#EF4444"
                      : categoryInfo.color,
                  }}
                />
              </div>

              {/* 조언 메시지 */}
              {advice && (
                <p className="text-xs text-orange-600 mt-1">⚠️ {advice}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
