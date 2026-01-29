"use client";

import { useState, useMemo } from "react";
import {
  calculateLoan,
  compareLoanTypes,
  REPAYMENT_TYPE_NAMES,
  type RepaymentType,
  type LoanCalculationResult,
} from "@/lib/calculators/loan";

function formatNumber(num: number): string {
  return num.toLocaleString("ko-KR");
}

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState<string>("100000000");
  const [annualRate, setAnnualRate] = useState<string>("4.5");
  const [years, setYears] = useState<number>(30);
  const [repaymentType, setRepaymentType] = useState<RepaymentType>("equal_principal_interest");
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  const months = years * 12;

  const result = useMemo<LoanCalculationResult | null>(() => {
    const p = parseInt(principal.replace(/,/g, ""), 10);
    const r = parseFloat(annualRate);
    if (isNaN(p) || isNaN(r) || p <= 0) return null;
    return calculateLoan({ principal: p, annualRate: r, months, repaymentType });
  }, [principal, annualRate, months, repaymentType]);

  const comparison = useMemo(() => {
    const p = parseInt(principal.replace(/,/g, ""), 10);
    const r = parseFloat(annualRate);
    if (isNaN(p) || isNaN(r) || p <= 0) return null;
    return compareLoanTypes(p, r, months);
  }, [principal, annualRate, months]);

  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value) {
      setPrincipal(parseInt(value, 10).toLocaleString("ko-KR"));
    } else {
      setPrincipal("");
    }
  };

  const quickAmounts = [5000, 10000, 15000, 20000, 30000, 50000];
  const quickRates = [3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0];
  const quickYears = [5, 10, 15, 20, 25, 30, 35, 40];

  return (
    <div className="space-y-6">
      {/* 입력 섹션 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">대출 정보 입력</h2>

        {/* 대출금액 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            대출금액
          </label>
          <div className="relative">
            <input
              type="text"
              value={principal}
              onChange={handlePrincipalChange}
              className="w-full px-4 py-3 text-lg font-bold border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="100,000,000"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              원
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setPrincipal((amount * 10000).toLocaleString("ko-KR"))}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-green-100 hover:text-green-700 rounded-lg transition-colors"
              >
                {amount >= 10000 ? `${amount / 10000}억` : `${amount}만`}
              </button>
            ))}
          </div>
        </div>

        {/* 연이율 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            연이율
          </label>
          <div className="relative">
            <input
              type="text"
              value={annualRate}
              onChange={(e) => setAnnualRate(e.target.value.replace(/[^0-9.]/g, ""))}
              className="w-full px-4 py-3 text-lg font-bold border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="4.5"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              %
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {quickRates.map((rate) => (
              <button
                key={rate}
                onClick={() => setAnnualRate(rate.toString())}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  annualRate === rate.toString()
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 hover:bg-green-100 hover:text-green-700"
                }`}
              >
                {rate}%
              </button>
            ))}
          </div>
        </div>

        {/* 대출기간 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            대출기간
          </label>
          <div className="flex flex-wrap gap-2">
            {quickYears.map((y) => (
              <button
                key={y}
                onClick={() => setYears(y)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  years === y
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 hover:bg-green-100 hover:text-green-700"
                }`}
              >
                {y}년
              </button>
            ))}
          </div>
        </div>

        {/* 상환방식 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            상환방식
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {(Object.keys(REPAYMENT_TYPE_NAMES) as RepaymentType[]).map((type) => (
              <button
                key={type}
                onClick={() => setRepaymentType(type)}
                className={`px-4 py-3 rounded-lg text-sm transition-colors ${
                  repaymentType === type
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 hover:bg-green-100 hover:text-green-700"
                }`}
              >
                {REPAYMENT_TYPE_NAMES[type]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 결과 섹션 */}
      {result && (
        <>
          {/* 핵심 결과 */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
            <div className="text-center">
              <p className="text-green-100 mb-1">월 상환액</p>
              <p className="text-4xl font-bold mb-2">
                {formatNumber(result.monthlyPayment)}원
              </p>
              <p className="text-green-200 text-sm">
                {REPAYMENT_TYPE_NAMES[repaymentType]} 기준
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-green-500 grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-green-200 text-sm">총 상환액</p>
                <p className="text-xl font-bold">{formatNumber(result.totalPayment)}원</p>
              </div>
              <div>
                <p className="text-green-200 text-sm">총 이자</p>
                <p className="text-xl font-bold text-yellow-300">
                  {formatNumber(result.totalInterest)}원
                </p>
              </div>
            </div>
          </div>

          {/* 상환방식 비교 */}
          {comparison && (
            <div className="bg-white border rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">상환방식별 비교</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="py-3 px-2 text-left">상환방식</th>
                      <th className="py-3 px-2 text-right">월 상환액</th>
                      <th className="py-3 px-2 text-right">총 이자</th>
                      <th className="py-3 px-2 text-right">총 상환액</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(Object.entries(comparison) as [string, LoanCalculationResult][]).map(
                      ([type, calc]) => {
                        const typeName =
                          REPAYMENT_TYPE_NAMES[type.replace(/([A-Z])/g, "_$1").toLowerCase() as RepaymentType] ||
                          REPAYMENT_TYPE_NAMES[calc.input.repaymentType];
                        const isSelected = calc.input.repaymentType === repaymentType;
                        return (
                          <tr
                            key={type}
                            className={`border-b ${isSelected ? "bg-green-50 font-bold" : ""}`}
                          >
                            <td className="py-3 px-2">{typeName}</td>
                            <td className="py-3 px-2 text-right">
                              {formatNumber(calc.monthlyPayment)}원
                              {type === "equal_principal" && (
                                <span className="text-xs text-gray-500 block">
                                  (첫달 기준)
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-2 text-right text-red-600">
                              {formatNumber(calc.totalInterest)}원
                            </td>
                            <td className="py-3 px-2 text-right">
                              {formatNumber(calc.totalPayment)}원
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                <p>
                  💡 <strong>원금균등상환</strong>이 총 이자가 가장 적고,{" "}
                  <strong>만기일시상환</strong>이 가장 많습니다.
                </p>
              </div>
            </div>
          )}

          {/* 상환 스케줄 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">상환 스케줄</h3>
              <button
                onClick={() => setShowSchedule(!showSchedule)}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {showSchedule ? "접기" : "펼치기"}
              </button>
            </div>

            {showSchedule && (
              <div className="overflow-x-auto max-h-96 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-white">
                    <tr className="border-b">
                      <th className="py-2 px-2 text-left">회차</th>
                      <th className="py-2 px-2 text-right">상환액</th>
                      <th className="py-2 px-2 text-right">원금</th>
                      <th className="py-2 px-2 text-right">이자</th>
                      <th className="py-2 px-2 text-right">잔액</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.slice(0, 60).map((payment) => (
                      <tr key={payment.month} className="border-b">
                        <td className="py-2 px-2">{payment.month}회</td>
                        <td className="py-2 px-2 text-right">{formatNumber(payment.payment)}</td>
                        <td className="py-2 px-2 text-right">{formatNumber(payment.principal)}</td>
                        <td className="py-2 px-2 text-right text-red-600">
                          {formatNumber(payment.interest)}
                        </td>
                        <td className="py-2 px-2 text-right">
                          {formatNumber(payment.remainingBalance)}
                        </td>
                      </tr>
                    ))}
                    {result.schedule.length > 60 && (
                      <tr className="bg-gray-50">
                        <td colSpan={5} className="py-3 text-center text-gray-500">
                          ... 외 {result.schedule.length - 60}개 항목
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {!showSchedule && (
              <div className="text-center py-4 text-gray-500">
                상환 스케줄을 보려면 &apos;펼치기&apos; 버튼을 클릭하세요
              </div>
            )}
          </div>
        </>
      )}

      {/* 안내 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        <p className="font-medium mb-2">💡 상환방식 설명</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>
            <strong>원리금균등상환:</strong> 매월 같은 금액 상환 (가장 일반적)
          </li>
          <li>
            <strong>원금균등상환:</strong> 초반 부담 크지만 총 이자 적음
          </li>
          <li>
            <strong>만기일시상환:</strong> 만기에 원금 일시 상환, 이자 부담 큼
          </li>
        </ul>
      </div>
    </div>
  );
}
