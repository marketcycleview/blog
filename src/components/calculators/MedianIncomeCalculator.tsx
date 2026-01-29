"use client";

import { useState, useMemo } from "react";
import {
  calculateMedianIncome,
  generateMedianIncomeTable,
  WELFARE_THRESHOLDS,
  type MedianIncomeResult,
} from "@/lib/calculators/median-income";

function formatNumber(num: number): string {
  return num.toLocaleString("ko-KR");
}

export default function MedianIncomeCalculator() {
  const [householdSize, setHouseholdSize] = useState<number>(1);
  const [monthlyIncome, setMonthlyIncome] = useState<string>("");

  const result = useMemo<MedianIncomeResult>(() => {
    const income = monthlyIncome
      ? parseInt(monthlyIncome.replace(/,/g, ""), 10)
      : undefined;
    return calculateMedianIncome(householdSize, income);
  }, [householdSize, monthlyIncome]);

  const medianTable = useMemo(() => generateMedianIncomeTable(), []);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value) {
      setMonthlyIncome(parseInt(value, 10).toLocaleString("ko-KR"));
    } else {
      setMonthlyIncome("");
    }
  };

  return (
    <div className="space-y-6">
      {/* 입력 섹션 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">가구 정보 입력</h2>

        {/* 가구원 수 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            가구원 수
          </label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((size) => (
              <button
                key={size}
                onClick={() => setHouseholdSize(size)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  householdSize === size
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 hover:bg-orange-100 hover:text-orange-700"
                }`}
              >
                {size}인
              </button>
            ))}
          </div>
        </div>

        {/* 월 소득 입력 (선택) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            월 소득 (선택사항 - 내 중위소득 비율 확인용)
          </label>
          <div className="relative">
            <input
              type="text"
              value={monthlyIncome}
              onChange={handleIncomeChange}
              className="w-full px-4 py-3 text-lg font-bold border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="월 소득을 입력하세요"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              원
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            * 세전 소득 기준 (근로소득 + 사업소득 + 재산소득 + 이전소득)
          </p>
        </div>
      </div>

      {/* 기준 중위소득 결과 */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6 text-white">
        <div className="text-center">
          <p className="text-orange-100 mb-1">{householdSize}인 가구 기준 중위소득</p>
          <p className="text-4xl font-bold mb-2">
            {formatNumber(result.medianIncome)}원
          </p>
          <p className="text-orange-200 text-sm">2026년 기준 (월)</p>
        </div>

        {result.inputIncome && result.incomePercent && (
          <div className="mt-4 pt-4 border-t border-orange-500">
            <div className="text-center">
              <p className="text-orange-100 mb-1">내 소득은 중위소득의</p>
              <p className="text-3xl font-bold text-yellow-300">
                {result.incomePercent}%
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 내 소득으로 받을 수 있는 복지 */}
      {result.eligibleWelfares && result.eligibleWelfares.length > 0 && (
        <div className="bg-white border rounded-xl p-4 sm:p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            받을 수 있는 복지 정책 기준
          </h3>
          <div className="space-y-2">
            {result.eligibleWelfares.map((welfare) => (
              <div
                key={welfare.percent}
                className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-green-800">{welfare.name}</p>
                  <p className="text-sm text-green-600">{welfare.description}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  {welfare.percent}% 이하
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            * 실제 수급 자격은 재산, 부양의무자 등 추가 조건이 있습니다.
          </p>
        </div>
      )}

      {/* 비율별 소득 기준 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {householdSize}인 가구 비율별 소득 기준
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-2 px-3 text-left">비율</th>
                <th className="py-2 px-3 text-left">적용 복지</th>
                <th className="py-2 px-3 text-right">월 소득 기준</th>
              </tr>
            </thead>
            <tbody>
              {WELFARE_THRESHOLDS.map((threshold) => {
                const isEligible =
                  result.incomePercent !== undefined &&
                  result.incomePercent <= threshold.percent;
                return (
                  <tr
                    key={threshold.percent}
                    className={`border-b ${isEligible ? "bg-green-50" : ""}`}
                  >
                    <td className="py-2 px-3 font-medium">
                      {threshold.percent}%
                      {isEligible && (
                        <span className="ml-2 text-green-600">✓</span>
                      )}
                    </td>
                    <td className="py-2 px-3">{threshold.name}</td>
                    <td className="py-2 px-3 text-right">
                      {formatNumber(result.incomeByPercent[threshold.percent])}원 이하
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 가구원수별 중위소득 표 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          2026년 가구원수별 기준 중위소득
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-2 px-2 text-center">가구</th>
                <th className="py-2 px-2 text-right">50%</th>
                <th className="py-2 px-2 text-right">60%</th>
                <th className="py-2 px-2 text-right">100%</th>
                <th className="py-2 px-2 text-right">150%</th>
              </tr>
            </thead>
            <tbody>
              {medianTable.map((row) => {
                const isSelected = row.householdSize === householdSize;
                return (
                  <tr
                    key={row.householdSize}
                    className={`border-b ${isSelected ? "bg-orange-50 font-bold" : ""}`}
                  >
                    <td className="py-2 px-2 text-center">{row.householdSize}인</td>
                    <td className="py-2 px-2 text-right text-xs sm:text-sm">
                      {formatNumber(row.median50)}
                    </td>
                    <td className="py-2 px-2 text-right text-xs sm:text-sm">
                      {formatNumber(row.median60)}
                    </td>
                    <td className="py-2 px-2 text-right text-xs sm:text-sm">
                      {formatNumber(row.median100)}
                    </td>
                    <td className="py-2 px-2 text-right text-xs sm:text-sm">
                      {formatNumber(row.median150)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">단위: 원/월</p>
      </div>

      {/* 안내 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        <p className="font-medium mb-2">💡 기준 중위소득이란?</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>전체 가구를 소득순으로 줄 세웠을 때 정확히 중간에 있는 가구의 소득</li>
          <li>매년 보건복지부에서 발표하며, 복지 정책 수급 기준으로 사용</li>
          <li>2026년 기준 1인 가구 약 239만원, 4인 가구 약 610만원</li>
          <li>소득 인정액 = 근로소득 + 사업소득 + 재산소득 + 이전소득 - 공제</li>
        </ul>
      </div>
    </div>
  );
}
