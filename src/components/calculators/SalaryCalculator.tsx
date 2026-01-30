"use client";

import { useState, useMemo } from "react";
import { calculateSalary, type SalaryCalculationResult } from "@/lib/calculators/salary";

function formatNumber(num: number): string {
  return num.toLocaleString("ko-KR");
}

function formatPercent(num: number): string {
  return (num * 100).toFixed(1) + "%";
}

export default function SalaryCalculator() {
  const [annualSalary, setAnnualSalary] = useState<string>("36000000");
  const [dependents, setDependents] = useState<number>(1);
  const [includeSeverance, setIncludeSeverance] = useState<boolean>(false);

  const result = useMemo<SalaryCalculationResult | null>(() => {
    const salary = parseInt(annualSalary.replace(/,/g, ""), 10);
    if (isNaN(salary) || salary <= 0) return null;
    return calculateSalary(salary, dependents, includeSeverance);
  }, [annualSalary, dependents, includeSeverance]);

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value) {
      setAnnualSalary(parseInt(value, 10).toLocaleString("ko-KR"));
    } else {
      setAnnualSalary("");
    }
  };

  // 빠른 선택 버튼용 연봉 목록
  const quickSalaries = [2400, 3000, 3600, 4000, 5000, 6000, 7000, 8000, 10000];

  return (
    <div className="space-y-6">
      {/* 입력 섹션 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">연봉 입력</h2>

        {/* 연봉 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            연봉 (세전)
          </label>
          <div className="relative">
            <input
              type="text"
              value={annualSalary}
              onChange={handleSalaryChange}
              className="w-full px-4 py-3 text-lg font-bold border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="36,000,000"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              원
            </span>
          </div>
        </div>

        {/* 빠른 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            빠른 선택
          </label>
          <div className="flex flex-wrap gap-2">
            {quickSalaries.map((salary) => (
              <button
                key={salary}
                onClick={() => setAnnualSalary((salary * 10000).toLocaleString("ko-KR"))}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors"
              >
                {salary >= 10000 ? `${salary / 10000}억` : `${salary}만`}
              </button>
            ))}
          </div>
        </div>

        {/* 부양가족 수 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            부양가족 수 (본인 포함)
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setDependents(num)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  dependents === num
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {num}명
              </button>
            ))}
          </div>
        </div>

        {/* 퇴직금 포함 여부 */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="includeSeverance"
            checked={includeSeverance}
            onChange={(e) => setIncludeSeverance(e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="includeSeverance" className="text-sm text-gray-700">
            퇴직금 별도 계약 (연봉에 퇴직금 포함됨)
          </label>
        </div>
      </div>

      {/* 결과 섹션 */}
      {result && (
        <>
          {/* 핵심 결과 */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
            <div className="text-center">
              <p className="text-blue-100 mb-1">월 실수령액</p>
              <p className="text-4xl font-bold mb-2">
                {formatNumber(result.monthlyNet)}원
              </p>
              <p className="text-blue-200 text-sm">
                연 실수령액: {formatNumber(result.annualNet)}원
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-blue-500 grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-blue-200 text-sm">월급 (세전)</p>
                <p className="text-xl font-bold">{formatNumber(result.monthlyGross)}원</p>
              </div>
              <div>
                <p className="text-blue-200 text-sm">공제율</p>
                <p className="text-xl font-bold">{formatPercent(result.deductionRate)}</p>
              </div>
            </div>
          </div>

          {/* 공제 내역 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">월별 공제 내역</h3>

            {/* 4대보험 */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-500 mb-3">4대보험</h4>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">국민연금 (4.5%)</span>
                  <span className="font-medium">{formatNumber(result.nationalPension)}원</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">건강보험 (3.545%)</span>
                  <span className="font-medium">{formatNumber(result.healthInsurance)}원</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">장기요양보험 (12.95%)</span>
                  <span className="font-medium">{formatNumber(result.longTermCare)}원</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">고용보험 (0.9%)</span>
                  <span className="font-medium">{formatNumber(result.employmentInsurance)}원</span>
                </div>
                <div className="flex justify-between py-2 font-bold text-blue-600">
                  <span>4대보험 합계</span>
                  <span>{formatNumber(result.totalInsurance)}원</span>
                </div>
              </div>
            </div>

            {/* 세금 */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-500 mb-3">세금</h4>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">소득세</span>
                  <span className="font-medium">{formatNumber(result.incomeTax)}원</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">지방소득세 (10%)</span>
                  <span className="font-medium">{formatNumber(result.localIncomeTax)}원</span>
                </div>
                <div className="flex justify-between py-2 font-bold text-blue-600">
                  <span>세금 합계</span>
                  <span>{formatNumber(result.totalTax)}원</span>
                </div>
              </div>
            </div>

            {/* 총 공제액 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">총 공제액</span>
                <span className="text-xl font-bold text-red-600">
                  -{formatNumber(result.totalDeductions)}원
                </span>
              </div>
            </div>
          </div>

          {/* 연봉별 비교표 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">연봉별 실수령액 비교</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left">연봉</th>
                    <th className="py-2 text-right">월 실수령액</th>
                    <th className="py-2 text-right">공제율</th>
                  </tr>
                </thead>
                <tbody>
                  {[2400, 3000, 3600, 4000, 5000, 6000, 7000, 8000, 10000].map((salary) => {
                    const calc = calculateSalary(salary * 10000, 1, false);
                    const isSelected = Math.abs(calc.annualSalary - parseInt(annualSalary.replace(/,/g, ""))) < 1000000;
                    return (
                      <tr
                        key={salary}
                        className={`border-b ${isSelected ? "bg-blue-50 font-bold" : ""}`}
                      >
                        <td className="py-2">{salary >= 10000 ? `${salary / 10000}억` : `${salary}만원`}</td>
                        <td className="py-2 text-right">{formatNumber(calc.monthlyNet)}원</td>
                        <td className="py-2 text-right">{formatPercent(calc.deductionRate)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* 안내 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        <p className="font-medium mb-2">💡 참고사항</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>2026년 기준 4대보험 요율로 계산됩니다.</li>
          <li>소득세는 간이세액표 기준 근사치입니다.</li>
          <li>비과세 급여(식대 20만원)가 반영되어 있습니다.</li>
          <li>실제 금액은 회사 정책에 따라 다를 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
}
