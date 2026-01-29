"use client";

import { useState, useMemo } from "react";
import {
  calculateSeveranceSimple,
  calculateSeveranceTax,
  type SeveranceResult,
} from "@/lib/calculators/severance";

function formatNumber(num: number): string {
  return num.toLocaleString("ko-KR");
}

export default function SeveranceCalculator() {
  const [years, setYears] = useState<number>(3);
  const [months, setMonths] = useState<number>(0);
  const [averageSalary, setAverageSalary] = useState<string>("3000000");

  const result = useMemo<SeveranceResult | null>(() => {
    const salary = parseInt(averageSalary.replace(/,/g, ""), 10);
    if (isNaN(salary) || salary <= 0) return null;
    return calculateSeveranceSimple(years, months, salary);
  }, [years, months, averageSalary]);

  const taxResult = useMemo(() => {
    if (!result || !result.isEligible) return null;
    return calculateSeveranceTax(result.severancePay, Math.max(1, Math.floor(result.totalYears)));
  }, [result]);

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value) {
      setAverageSalary(parseInt(value, 10).toLocaleString("ko-KR"));
    } else {
      setAverageSalary("");
    }
  };

  // 빠른 선택
  const quickSalaries = [200, 250, 300, 350, 400, 450, 500, 600];

  return (
    <div className="space-y-6">
      {/* 입력 섹션 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">퇴직금 정보 입력</h2>

        {/* 근속기간 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            근속기간
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <select
                value={years}
                onChange={(e) => setYears(parseInt(e.target.value, 10))}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                {Array.from({ length: 41 }, (_, i) => i).map((y) => (
                  <option key={y} value={y}>
                    {y}년
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <select
                value={months}
                onChange={(e) => setMonths(parseInt(e.target.value, 10))}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((m) => (
                  <option key={m} value={m}>
                    {m}개월
                  </option>
                ))}
              </select>
            </div>
          </div>
          {years === 0 && months < 12 && (
            <p className="text-sm text-red-500 mt-1">
              * 1년 미만 근무 시 퇴직금 지급 대상이 아닙니다
            </p>
          )}
        </div>

        {/* 평균 월급 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            평균 월급 (세전, 최근 3개월 기준)
          </label>
          <div className="relative">
            <input
              type="text"
              value={averageSalary}
              onChange={handleSalaryChange}
              className="w-full px-4 py-3 text-lg font-bold border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="3,000,000"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              원
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {quickSalaries.map((salary) => (
              <button
                key={salary}
                onClick={() => setAverageSalary((salary * 10000).toLocaleString("ko-KR"))}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-indigo-100 hover:text-indigo-700 rounded-lg transition-colors"
              >
                {salary}만
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 결과 섹션 */}
      {result && (
        <>
          {result.isEligible ? (
            <>
              {/* 핵심 결과 */}
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-6 text-white">
                <div className="text-center">
                  <p className="text-indigo-100 mb-1">예상 퇴직금</p>
                  <p className="text-4xl font-bold mb-2">
                    {formatNumber(result.severancePay)}원
                  </p>
                  <p className="text-indigo-200 text-sm">
                    {years}년 {months}개월 근무 기준
                  </p>
                </div>

                {taxResult && (
                  <div className="mt-4 pt-4 border-t border-indigo-500 grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-indigo-200 text-sm">예상 퇴직소득세</p>
                      <p className="text-xl font-bold text-yellow-300">
                        -{formatNumber(taxResult.estimatedTax)}원
                      </p>
                    </div>
                    <div>
                      <p className="text-indigo-200 text-sm">세후 수령액</p>
                      <p className="text-xl font-bold">
                        {formatNumber(taxResult.netSeverance)}원
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* 계산 상세 */}
              <div className="bg-white border rounded-xl p-4 sm:p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">계산 상세</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">총 근속일수</span>
                    <span className="font-medium">{formatNumber(result.totalDays)}일</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">평균 일급</span>
                    <span className="font-medium">{formatNumber(result.averageDailyWage)}원</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">1년당 퇴직금</span>
                    <span className="font-medium">
                      {formatNumber(result.averageDailyWage * 30)}원
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-indigo-50 rounded-lg text-sm text-indigo-800">
                  <p>
                    <strong>퇴직금 계산 공식:</strong>
                    <br />
                    평균임금 × 30일 × (근속일수 / 365)
                  </p>
                </div>
              </div>

              {/* 연차별 breakdown */}
              {result.yearlyBreakdown.length > 0 && (
                <div className="bg-white border rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">연차별 퇴직금</h3>
                  <div className="space-y-2">
                    {result.yearlyBreakdown.map((item, index) => (
                      <div
                        key={item.year}
                        className="flex justify-between py-2 border-b"
                      >
                        <span className="text-gray-600">
                          {item.year}년차
                          {index === result.yearlyBreakdown.length - 1 &&
                            months > 0 &&
                            " (잔여기간 포함)"}
                        </span>
                        <span className="font-medium">{formatNumber(item.amount)}원</span>
                      </div>
                    ))}
                    <div className="flex justify-between py-2 font-bold text-indigo-600">
                      <span>합계</span>
                      <span>{formatNumber(result.severancePay)}원</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-800 text-lg font-medium mb-2">
                퇴직금 지급 대상이 아닙니다
              </p>
              <p className="text-red-600">{result.eligibilityReason}</p>
            </div>
          )}
        </>
      )}

      {/* 근속연수별 퇴직금 표 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">근속연수별 예상 퇴직금</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-2 px-3 text-left">근속연수</th>
                <th className="py-2 px-3 text-right">월급 300만원</th>
                <th className="py-2 px-3 text-right">월급 400만원</th>
                <th className="py-2 px-3 text-right">월급 500만원</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 5, 7, 10, 15, 20].map((y) => {
                const calc300 = calculateSeveranceSimple(y, 0, 3000000);
                const calc400 = calculateSeveranceSimple(y, 0, 4000000);
                const calc500 = calculateSeveranceSimple(y, 0, 5000000);
                const isSelected = y === years && months === 0;
                return (
                  <tr
                    key={y}
                    className={`border-b ${isSelected ? "bg-indigo-50 font-bold" : ""}`}
                  >
                    <td className="py-2 px-3">{y}년</td>
                    <td className="py-2 px-3 text-right">
                      {formatNumber(calc300.severancePay)}원
                    </td>
                    <td className="py-2 px-3 text-right">
                      {formatNumber(calc400.severancePay)}원
                    </td>
                    <td className="py-2 px-3 text-right">
                      {formatNumber(calc500.severancePay)}원
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 안내 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        <p className="font-medium mb-2">💡 퇴직금 알아두기</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>1년 이상 근무한 근로자는 퇴직금 수령 자격이 있습니다.</li>
          <li>퇴직금 = 평균임금 × 30일 × (근속일수 / 365)</li>
          <li>평균임금 = 최근 3개월 급여 총액 / 91일</li>
          <li>상여금, 연차수당도 평균임금에 포함됩니다.</li>
          <li>퇴직금은 퇴직소득세가 별도로 부과됩니다.</li>
          <li>퇴직 후 14일 이내 지급이 원칙입니다.</li>
        </ul>
      </div>
    </div>
  );
}
