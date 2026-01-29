"use client";

import type { BudgetSummary } from "@/lib/budget";
import { EXPENSE_CATEGORIES, formatCurrency } from "@/lib/budget";

interface BudgetChartProps {
  summary: BudgetSummary;
}

export default function BudgetChart({ summary }: BudgetChartProps) {
  // 수입이 없거나 지출이 없으면 표시 안 함
  if (summary.income === 0 || summary.totalExpenses === 0) {
    return null;
  }

  // 저축 비율
  const savingsPercentage = Math.max(0, summary.savingsRate);

  // 파이 차트 데이터 준비
  const chartData = [
    ...summary.categories.map((cat) => ({
      id: cat.category,
      label: EXPENSE_CATEGORIES[cat.category].label,
      percentage: cat.percentage,
      color: EXPENSE_CATEGORIES[cat.category].color,
      amount: cat.total,
    })),
  ];

  // 저축 추가 (양수일 때만)
  if (savingsPercentage > 0) {
    chartData.push({
      id: "savings",
      label: "저축",
      percentage: savingsPercentage,
      color: "#10B981", // emerald-500
      amount: summary.savings,
    });
  }

  // 합계가 100%를 넘으면 조정
  const totalPercentage = chartData.reduce((sum, d) => sum + d.percentage, 0);

  // CSS conic-gradient 생성
  let currentAngle = 0;
  const gradientParts = chartData.map((item) => {
    const adjustedPercentage =
      totalPercentage > 100
        ? (item.percentage / totalPercentage) * 100
        : item.percentage;
    const startAngle = currentAngle;
    currentAngle += adjustedPercentage;
    return `${item.color} ${startAngle}% ${currentAngle}%`;
  });

  // 남은 부분 (적자일 때)
  if (currentAngle < 100) {
    gradientParts.push(`#E5E7EB ${currentAngle}% 100%`);
  }

  const conicGradient = `conic-gradient(from 0deg, ${gradientParts.join(", ")})`;

  return (
    <div className="bg-white border rounded-xl p-4 sm:p-6">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span>🥧</span>
        <span>지출 구성</span>
      </h3>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* 파이 차트 */}
        <div className="relative w-48 h-48 shrink-0">
          <div
            className="w-full h-full rounded-full"
            style={{ background: conicGradient }}
          />
          {/* 중앙 원 (도넛 효과) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center">
            <p className="text-xs text-gray-500">총 지출</p>
            <p className="text-lg font-bold">
              {summary.totalExpenses >= 10000
                ? `${Math.round(summary.totalExpenses / 10000)}만`
                : formatCurrency(summary.totalExpenses)}
            </p>
          </div>
        </div>

        {/* 범례 */}
        <div className="flex-1 space-y-2">
          {chartData.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-sm font-bold">
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {formatCurrency(item.amount)}원
                </p>
              </div>
            </div>
          ))}

          {/* 적자 표시 */}
          {summary.savings < 0 && (
            <div className="flex items-center gap-3 pt-2 border-t">
              <div className="w-4 h-4 rounded-full shrink-0 bg-red-500" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-red-600">적자</span>
                  <span className="text-sm font-bold text-red-600">
                    -{formatCurrency(Math.abs(summary.savings))}원
                  </span>
                </div>
                <p className="text-sm text-red-500">
                  수입보다 지출이 많아요!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 권장 비율 안내 */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          💡 <strong>권장 비율</strong>: 기초생활비 50-60% / 여유비 20-30% /
          사치비 0-10% / 저축 20% 이상
        </p>
      </div>
    </div>
  );
}
