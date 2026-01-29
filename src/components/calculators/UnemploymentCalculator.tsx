"use client";

import { useState, useMemo } from "react";
import {
  calculateUnemploymentBenefit,
  getBenefitDurationTable,
  UNEMPLOYMENT_BENEFIT_2026,
  type UnemploymentResult,
} from "@/lib/calculators/unemployment";

function formatNumber(num: number): string {
  return num.toLocaleString("ko-KR");
}

export default function UnemploymentCalculator() {
  const [age, setAge] = useState<string>("30");
  const [insuranceYears, setInsuranceYears] = useState<number>(3);
  const [insuranceMonths, setInsuranceMonths] = useState<number>(0);
  const [salary1, setSalary1] = useState<string>("3000000");
  const [salary2, setSalary2] = useState<string>("3000000");
  const [salary3, setSalary3] = useState<string>("3000000");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const result = useMemo<UnemploymentResult | null>(() => {
    const ageNum = parseInt(age, 10);
    const s1 = parseInt(salary1.replace(/,/g, ""), 10);
    const s2 = parseInt(salary2.replace(/,/g, ""), 10);
    const s3 = parseInt(salary3.replace(/,/g, ""), 10);

    if (isNaN(ageNum) || isNaN(s1) || isNaN(s2) || isNaN(s3)) return null;

    const totalMonths = insuranceYears * 12 + insuranceMonths;

    return calculateUnemploymentBenefit({
      age: ageNum,
      insurancePeriodMonths: totalMonths,
      last3MonthsSalary: [s1, s2, s3],
      isDisabled,
    });
  }, [age, insuranceYears, insuranceMonths, salary1, salary2, salary3, isDisabled]);

  const durationTable = useMemo(() => getBenefitDurationTable(), []);

  const handleSalaryChange = (
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

  const applySalaryToAll = () => {
    setSalary2(salary1);
    setSalary3(salary1);
  };

  return (
    <div className="space-y-6">
      {/* 입력 섹션 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">실업급여 정보 입력</h2>

        {/* 나이 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            만 나이
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-3 text-lg font-bold border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="30"
            min="18"
            max="70"
          />
          <p className="text-sm text-gray-500 mt-1">
            * 만 50세 이상은 지급일수가 늘어납니다
          </p>
        </div>

        {/* 고용보험 가입기간 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            고용보험 가입기간
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <select
                value={insuranceYears}
                onChange={(e) => setInsuranceYears(parseInt(e.target.value, 10))}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20].map((y) => (
                  <option key={y} value={y}>
                    {y}년
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <select
                value={insuranceMonths}
                onChange={(e) => setInsuranceMonths(parseInt(e.target.value, 10))}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((m) => (
                  <option key={m} value={m}>
                    {m}개월
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 최근 3개월 급여 */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              퇴직 전 3개월 급여 (세전)
            </label>
            <button
              onClick={applySalaryToAll}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              첫 달과 동일하게 적용
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs text-gray-500 block mb-1">1개월 전</label>
              <div className="relative">
                <input
                  type="text"
                  value={salary1}
                  onChange={(e) => handleSalaryChange(e.target.value, setSalary1)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="300만"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">2개월 전</label>
              <div className="relative">
                <input
                  type="text"
                  value={salary2}
                  onChange={(e) => handleSalaryChange(e.target.value, setSalary2)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="300만"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">3개월 전</label>
              <div className="relative">
                <input
                  type="text"
                  value={salary3}
                  onChange={(e) => handleSalaryChange(e.target.value, setSalary3)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="300만"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 장애인 여부 */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isDisabled"
            checked={isDisabled}
            onChange={(e) => setIsDisabled(e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="isDisabled" className="text-sm text-gray-700">
            장애인 (지급일수 우대)
          </label>
        </div>
      </div>

      {/* 결과 섹션 */}
      {result && (
        <>
          {result.isEligible ? (
            <>
              {/* 핵심 결과 */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
                <div className="text-center">
                  <p className="text-blue-100 mb-1">예상 총 수령액</p>
                  <p className="text-4xl font-bold mb-2">
                    {formatNumber(result.totalBenefit)}원
                  </p>
                  <p className="text-blue-200 text-sm">
                    {result.benefitDays}일 × {formatNumber(result.dailyBenefit)}원
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-blue-500 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-blue-200 text-sm">일일 실업급여</p>
                    <p className="text-xl font-bold">{formatNumber(result.dailyBenefit)}원</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">월 예상 수령액</p>
                    <p className="text-xl font-bold">{formatNumber(result.monthlyBenefit)}원</p>
                  </div>
                </div>
              </div>

              {/* 상세 정보 */}
              <div className="bg-white border rounded-xl p-4 sm:p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">계산 상세</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">평균 일급</span>
                    <span className="font-medium">{formatNumber(result.averageDailyWage)}원</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">일일 실업급여 (60%)</span>
                    <span className="font-medium">{formatNumber(result.dailyBenefit)}원</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">지급일수</span>
                    <span className="font-medium">{result.benefitDays}일</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">지급기간</span>
                    <span className="font-medium">약 {Math.ceil(result.benefitDays / 30)}개월</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                  <p>
                    💡 실업급여는 <strong>퇴직 다음날부터 7일 대기기간</strong> 후 지급 시작됩니다.
                    고용센터 방문하여 구직 신청 필수!
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-800 text-lg font-medium mb-2">
                실업급여 수급 자격이 부족합니다
              </p>
              <p className="text-red-600">{result.eligibilityReason}</p>
            </div>
          )}
        </>
      )}

      {/* 지급일수 테이블 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          고용보험 가입기간별 지급일수
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-2 px-3 text-left">가입기간</th>
                <th className="py-2 px-3 text-center">50세 미만</th>
                <th className="py-2 px-3 text-center">50세 이상/장애인</th>
              </tr>
            </thead>
            <tbody>
              {durationTable.map((row) => (
                <tr key={row.period} className="border-b">
                  <td className="py-2 px-3">{row.periodLabel}</td>
                  <td className="py-2 px-3 text-center">{row.under50}일</td>
                  <td className="py-2 px-3 text-center">{row.over50}일</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2026년 기준 정보 */}
      <div className="bg-gray-50 border rounded-xl p-4 sm:p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">2026년 실업급여 기준</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg">
            <p className="text-gray-500 text-sm mb-1">지급률</p>
            <p className="text-2xl font-bold text-blue-600">60%</p>
            <p className="text-xs text-gray-500">퇴직 전 평균임금의</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <p className="text-gray-500 text-sm mb-1">일일 상한액</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatNumber(UNEMPLOYMENT_BENEFIT_2026.maxDailyBenefit)}원
            </p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <p className="text-gray-500 text-sm mb-1">일일 하한액</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatNumber(UNEMPLOYMENT_BENEFIT_2026.minDailyBenefit)}원
            </p>
            <p className="text-xs text-gray-500">최저임금 80%</p>
          </div>
        </div>
      </div>

      {/* 안내 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        <p className="font-medium mb-2">💡 실업급여 수급 조건</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>비자발적 퇴직 (권고사직, 계약만료, 정리해고 등)</li>
          <li>퇴직 전 18개월 중 고용보험 180일 이상 가입</li>
          <li>근로 의사와 능력이 있으나 취업하지 못한 상태</li>
          <li>적극적인 구직 활동 (고용센터 정기 방문 필수)</li>
          <li>자발적 퇴직도 정당한 사유가 있으면 수급 가능</li>
        </ul>
      </div>
    </div>
  );
}
