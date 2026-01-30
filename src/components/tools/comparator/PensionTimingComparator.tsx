"use client";

import { useState, useMemo } from "react";
import { calculatePensionComparison, type PensionInput } from "@/lib/tools/comparator/pension-compare";

function formatWon(n: number): string {
  if (Math.abs(n) >= 100_000_000) return `${(n / 100_000_000).toFixed(1)}억원`;
  if (Math.abs(n) >= 10_000) return `${Math.round(n / 10_000).toLocaleString()}만원`;
  return `${n.toLocaleString()}원`;
}

export default function PensionTimingComparator() {
  const [currentAge, setCurrentAge] = useState(50);
  const [expectedMonthly, setExpectedMonthly] = useState(100); // 만원
  const [normalAge, setNormalAge] = useState(65);

  const result = useMemo(() => {
    if (expectedMonthly <= 0) return null;
    const input: PensionInput = { currentAge, expectedMonthly: expectedMonthly * 10000, normalAge };
    return calculatePensionComparison(input);
  }, [currentAge, expectedMonthly, normalAge]);

  return (
    <div className="space-y-6">
      {/* 입력 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">기본 정보 입력</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">현재 나이</label>
            <input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} min={30} max={70}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">예상 월 수령액 (정상 수령 기준)</label>
            <div className="flex items-center gap-2">
              <input type="number" value={expectedMonthly} onChange={(e) => setExpectedMonthly(Number(e.target.value))} min={10} max={300}
                className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              <span className="text-sm text-gray-500">만원</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">국민연금공단 내연금알아보기에서 확인 가능</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">정상 수령 개시 나이</label>
            <select value={normalAge} onChange={(e) => setNormalAge(Number(e.target.value))}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value={62}>62세 (1957~1960년생)</option>
              <option value={63}>63세 (1961~1964년생)</option>
              <option value={64}>64세 (1965~1968년생)</option>
              <option value={65}>65세 (1969년생 이후)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 결과 */}
      {result && (
        <>
          {/* 비교표 */}
          <div className="bg-white border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-gray-600 font-medium">항목</th>
                    <th className="px-4 py-3 text-center text-orange-700 font-bold">조기수령</th>
                    <th className="px-4 py-3 text-center text-blue-700 font-bold">정상수령</th>
                    <th className="px-4 py-3 text-center text-green-700 font-bold">연기수령</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-3 text-gray-600">수령 시작 나이</td>
                    <td className="px-4 py-3 text-center font-bold">{result.early.startAge}세</td>
                    <td className="px-4 py-3 text-center font-bold">{result.normal.startAge}세</td>
                    <td className="px-4 py-3 text-center font-bold">{result.deferred.startAge}세</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600">감액/증액</td>
                    <td className="px-4 py-3 text-center text-red-600 font-bold">{result.early.adjustment}%</td>
                    <td className="px-4 py-3 text-center">0%</td>
                    <td className="px-4 py-3 text-center text-green-600 font-bold">+{result.deferred.adjustment}%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600">월 수령액</td>
                    <td className="px-4 py-3 text-center font-bold">{formatWon(result.early.monthlyAmount)}</td>
                    <td className="px-4 py-3 text-center font-bold">{formatWon(result.normal.monthlyAmount)}</td>
                    <td className="px-4 py-3 text-center font-bold">{formatWon(result.deferred.monthlyAmount)}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-600 font-medium">80세까지 총액</td>
                    <td className="px-4 py-3 text-center font-bold">{formatWon(result.early.totalAt80)}</td>
                    <td className="px-4 py-3 text-center font-bold">{formatWon(result.normal.totalAt80)}</td>
                    <td className="px-4 py-3 text-center font-bold">{formatWon(result.deferred.totalAt80)}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600 font-medium">85세까지 총액</td>
                    <td className="px-4 py-3 text-center font-bold">{formatWon(result.early.totalAt85)}</td>
                    <td className="px-4 py-3 text-center font-bold">{formatWon(result.normal.totalAt85)}</td>
                    <td className="px-4 py-3 text-center font-bold">{formatWon(result.deferred.totalAt85)}</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="px-4 py-3 text-gray-600 font-medium">90세까지 총액</td>
                    <td className="px-4 py-3 text-center font-bold">{formatWon(result.early.totalAt90)}</td>
                    <td className="px-4 py-3 text-center font-bold">{formatWon(result.normal.totalAt90)}</td>
                    <td className="px-4 py-3 text-center font-bold">{formatWon(result.deferred.totalAt90)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 손익분기 */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
            <h3 className="font-bold text-lg mb-3">손익분기점 분석</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-blue-200">조기 vs 정상 손익분기</p>
                <p className="font-bold text-lg">{result.breakevenEarlyVsNormal}세</p>
                <p className="text-blue-200 text-xs">{result.breakevenEarlyVsNormal}세 이후 생존하면 정상수령이 유리</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-blue-200">정상 vs 연기 손익분기</p>
                <p className="font-bold text-lg">{result.breakevenNormalVsDeferred}세</p>
                <p className="text-blue-200 text-xs">{result.breakevenNormalVsDeferred}세 이후 생존하면 연기수령이 유리</p>
              </div>
            </div>
          </div>

          {/* 추천 */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="font-bold text-green-800 mb-2">종합 판단</p>
            <p className="text-sm text-green-700">{result.recommendation}</p>
          </div>

          {/* 누적 수령 비교 바 차트 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <h3 className="font-bold text-gray-900 mb-3">나이별 누적 수령액 비교</h3>
            {[75, 80, 85, 90].map((age) => {
              const earlyTotal = Math.max(0, (age - result.early.startAge) * 12) * result.early.monthlyAmount;
              const normalTotal = Math.max(0, (age - result.normal.startAge) * 12) * result.normal.monthlyAmount;
              const deferredTotal = Math.max(0, (age - result.deferred.startAge) * 12) * result.deferred.monthlyAmount;
              const maxTotal = Math.max(earlyTotal, normalTotal, deferredTotal, 1);
              return (
                <div key={age} className="mb-4">
                  <p className="text-sm font-bold text-gray-600 mb-1">{age}세 시점</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-12">조기</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-4"><div className="bg-orange-400 h-4 rounded-full" style={{ width: `${(earlyTotal / maxTotal) * 100}%` }} /></div>
                      <span className="text-xs text-gray-600 w-16 text-right">{formatWon(earlyTotal)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-12">정상</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-4"><div className="bg-blue-500 h-4 rounded-full" style={{ width: `${(normalTotal / maxTotal) * 100}%` }} /></div>
                      <span className="text-xs text-gray-600 w-16 text-right">{formatWon(normalTotal)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-12">연기</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-4"><div className="bg-green-500 h-4 rounded-full" style={{ width: `${(deferredTotal / maxTotal) * 100}%` }} /></div>
                      <span className="text-xs text-gray-600 w-16 text-right">{formatWon(deferredTotal)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 참고 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
            <p className="font-medium mb-1">참고사항</p>
            <ul className="list-disc list-inside space-y-1">
              <li>조기수령: 1년 앞당길 때마다 6% 감액 (최대 5년, 30% 감액)</li>
              <li>연기수령: 1년 늦출 때마다 7.2% 증액 (최대 5년, 36% 증액)</li>
              <li>국민연금은 매년 물가상승률만큼 인상되므로 실질 가치가 유지됩니다.</li>
              <li>건강 상태, 개인 재정, 다른 소득원을 종합적으로 고려하세요.</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
