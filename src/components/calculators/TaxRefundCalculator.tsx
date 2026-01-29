"use client";

import { useState, useMemo } from "react";
import {
  calculateTaxRefund,
  TAX_BRACKETS_2026,
  type TaxRefundResult,
} from "@/lib/calculators/tax-refund";

function formatNumber(num: number): string {
  return num.toLocaleString("ko-KR");
}

export default function TaxRefundCalculator() {
  // 기본 정보
  const [annualSalary, setAnnualSalary] = useState<string>("50000000");
  const [dependents, setDependents] = useState<number>(1);
  const [paidIncomeTax, setPaidIncomeTax] = useState<string>("2000000");

  // 공제 항목
  const [nationalPension, setNationalPension] = useState<string>("2700000");
  const [healthInsurance, setHealthInsurance] = useState<string>("2000000");
  const [creditCard, setCreditCard] = useState<string>("10000000");
  const [debitCard, setDebitCard] = useState<string>("5000000");
  const [pensionSavings, setPensionSavings] = useState<string>("0");
  const [monthlyRent, setMonthlyRent] = useState<string>("0");
  const [medicalExpense, setMedicalExpense] = useState<string>("0");

  const result = useMemo<TaxRefundResult | null>(() => {
    const salary = parseInt(annualSalary.replace(/,/g, ""), 10);
    const paid = parseInt(paidIncomeTax.replace(/,/g, ""), 10);

    if (isNaN(salary) || isNaN(paid)) return null;

    return calculateTaxRefund({
      annualSalary: salary,
      dependents,
      paidIncomeTax: paid,
      nationalPension: parseInt(nationalPension.replace(/,/g, ""), 10) || 0,
      healthInsurance: parseInt(healthInsurance.replace(/,/g, ""), 10) || 0,
      creditCardUsage: parseInt(creditCard.replace(/,/g, ""), 10) || 0,
      debitCardUsage: parseInt(debitCard.replace(/,/g, ""), 10) || 0,
      pensionSavings: parseInt(pensionSavings.replace(/,/g, ""), 10) || 0,
      monthlyRent: parseInt(monthlyRent.replace(/,/g, ""), 10) || 0,
      medicalExpense: parseInt(medicalExpense.replace(/,/g, ""), 10) || 0,
    });
  }, [
    annualSalary,
    dependents,
    paidIncomeTax,
    nationalPension,
    healthInsurance,
    creditCard,
    debitCard,
    pensionSavings,
    monthlyRent,
    medicalExpense,
  ]);

  const handleNumberChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const numValue = value.replace(/[^0-9]/g, "");
    if (numValue) {
      setter(parseInt(numValue, 10).toLocaleString("ko-KR"));
    } else {
      setter("");
    }
  };

  // 빠른 선택
  const quickSalaries = [3000, 4000, 5000, 6000, 7000, 8000, 10000];

  return (
    <div className="space-y-6">
      {/* 기본 정보 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">기본 정보</h2>

        {/* 총급여 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            연간 총급여 (세전)
          </label>
          <div className="relative">
            <input
              type="text"
              value={annualSalary}
              onChange={(e) => handleNumberChange(e.target.value, setAnnualSalary)}
              className="w-full px-4 py-3 text-lg font-bold border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="50,000,000"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              원
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {quickSalaries.map((salary) => (
              <button
                key={salary}
                onClick={() => setAnnualSalary((salary * 10000).toLocaleString("ko-KR"))}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-purple-100 hover:text-purple-700 rounded-lg"
              >
                {salary}만
              </button>
            ))}
          </div>
        </div>

        {/* 부양가족 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            부양가족 수 (본인 포함)
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                onClick={() => setDependents(num)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  dependents === num
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 hover:bg-purple-100"
                }`}
              >
                {num}명
              </button>
            ))}
          </div>
        </div>

        {/* 기납부 세액 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            기납부 소득세 (원천징수액)
          </label>
          <div className="relative">
            <input
              type="text"
              value={paidIncomeTax}
              onChange={(e) => handleNumberChange(e.target.value, setPaidIncomeTax)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="원천징수 영수증 확인"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              원
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            * 원천징수 영수증에서 소득세 결정세액 확인
          </p>
        </div>
      </div>

      {/* 공제 항목 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">공제 항목 입력</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 국민연금 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              국민연금 납부액
            </label>
            <input
              type="text"
              value={nationalPension}
              onChange={(e) => handleNumberChange(e.target.value, setNationalPension)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="0"
            />
          </div>

          {/* 건강보험 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              건강보험료 납부액
            </label>
            <input
              type="text"
              value={healthInsurance}
              onChange={(e) => handleNumberChange(e.target.value, setHealthInsurance)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="0"
            />
          </div>

          {/* 신용카드 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              신용카드 사용액
            </label>
            <input
              type="text"
              value={creditCard}
              onChange={(e) => handleNumberChange(e.target.value, setCreditCard)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="0"
            />
          </div>

          {/* 체크카드 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              체크카드/현금영수증
            </label>
            <input
              type="text"
              value={debitCard}
              onChange={(e) => handleNumberChange(e.target.value, setDebitCard)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="0"
            />
          </div>

          {/* 연금저축 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              연금저축/IRP 납입액
            </label>
            <input
              type="text"
              value={pensionSavings}
              onChange={(e) => handleNumberChange(e.target.value, setPensionSavings)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="0"
            />
          </div>

          {/* 월세 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              연간 월세 납부액
            </label>
            <input
              type="text"
              value={monthlyRent}
              onChange={(e) => handleNumberChange(e.target.value, setMonthlyRent)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="0"
            />
          </div>

          {/* 의료비 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              의료비 지출액
            </label>
            <input
              type="text"
              value={medicalExpense}
              onChange={(e) => handleNumberChange(e.target.value, setMedicalExpense)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* 결과 섹션 */}
      {result && (
        <>
          {/* 핵심 결과 */}
          <div
            className={`rounded-xl p-6 text-white ${
              result.refundAmount >= 0
                ? "bg-gradient-to-r from-green-600 to-green-700"
                : "bg-gradient-to-r from-red-600 to-red-700"
            }`}
          >
            <div className="text-center">
              <p className="text-white/80 mb-1">
                {result.refundAmount >= 0 ? "예상 환급액" : "추가 납부 예상"}
              </p>
              <p className="text-4xl font-bold mb-2">
                {result.refundAmount >= 0 ? "+" : ""}
                {formatNumber(result.refundAmount)}원
              </p>
              <p className="text-white/60 text-sm">
                결정세액 {formatNumber(result.finalTax)}원 vs 기납부세액{" "}
                {formatNumber(result.paidIncomeTax)}원
              </p>
            </div>
          </div>

          {/* 계산 흐름 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">연말정산 계산 흐름</h3>

            <div className="space-y-4">
              {/* 1단계: 근로소득금액 */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">1. 근로소득금액</h4>
                <div className="flex justify-between text-sm">
                  <span>총급여</span>
                  <span>{formatNumber(result.annualSalary)}원</span>
                </div>
                <div className="flex justify-between text-sm text-red-600">
                  <span>- 근로소득공제</span>
                  <span>-{formatNumber(result.earnedIncomeDeduction)}원</span>
                </div>
                <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                  <span>= 근로소득금액</span>
                  <span>{formatNumber(result.earnedIncome)}원</span>
                </div>
              </div>

              {/* 2단계: 과세표준 */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">2. 과세표준</h4>
                <div className="flex justify-between text-sm">
                  <span>근로소득금액</span>
                  <span>{formatNumber(result.earnedIncome)}원</span>
                </div>
                <div className="flex justify-between text-sm text-red-600">
                  <span>- 소득공제 합계</span>
                  <span>-{formatNumber(result.totalIncomeDeduction)}원</span>
                </div>
                <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                  <span>= 과세표준</span>
                  <span>{formatNumber(result.taxableIncome)}원</span>
                </div>
              </div>

              {/* 3단계: 결정세액 */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">3. 결정세액</h4>
                <div className="flex justify-between text-sm">
                  <span>산출세액</span>
                  <span>{formatNumber(result.calculatedTax)}원</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>- 세액공제 합계</span>
                  <span>-{formatNumber(result.totalTaxCredit)}원</span>
                </div>
                <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                  <span>= 결정세액</span>
                  <span>{formatNumber(result.finalTax)}원</span>
                </div>
              </div>
            </div>
          </div>

          {/* 공제 상세 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">공제 항목 상세</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* 소득공제 */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">소득공제</h4>
                <div className="space-y-2">
                  {Object.entries(result.deductionDetails).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-600">{key}</span>
                      <span>{formatNumber(value)}원</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>합계</span>
                    <span>{formatNumber(result.totalIncomeDeduction)}원</span>
                  </div>
                </div>
              </div>

              {/* 세액공제 */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">세액공제</h4>
                <div className="space-y-2">
                  {Object.entries(result.taxCreditDetails).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-600">{key}</span>
                      <span className="text-green-600">{formatNumber(value)}원</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>합계</span>
                    <span className="text-green-600">
                      {formatNumber(result.totalTaxCredit)}원
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 세율표 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">2026년 소득세율표</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-2 px-3 text-left">과세표준</th>
                <th className="py-2 px-3 text-center">세율</th>
              </tr>
            </thead>
            <tbody>
              {TAX_BRACKETS_2026.slice(0, -1).map((bracket, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-3">
                    {formatNumber(bracket.min)}원 ~ {formatNumber(bracket.max)}원
                  </td>
                  <td className="py-2 px-3 text-center font-medium">
                    {(bracket.rate * 100).toFixed(0)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 안내 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        <p className="font-medium mb-2">💡 연말정산 팁</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>
            신용카드보다 <strong>체크카드/현금영수증</strong> 공제율이 2배 (15% vs 30%)
          </li>
          <li>
            <strong>연금저축/IRP</strong>는 연 최대 900만원까지 세액공제 (13.2~16.5%)
          </li>
          <li>
            총급여 5,500만원 이하면 <strong>월세 세액공제 17%</strong> (초과시 15%)
          </li>
          <li>의료비는 총급여 3% 초과분만 공제 대상</li>
          <li>이 계산기는 간소화된 추정치입니다. 정확한 금액은 홈택스에서 확인하세요.</li>
        </ul>
      </div>
    </div>
  );
}
