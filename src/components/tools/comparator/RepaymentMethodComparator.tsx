"use client";

import { useState, useMemo } from "react";
import { calculateRepaymentComparison, type RepaymentInput, type RepaymentScenario } from "@/lib/tools/comparator/repayment-compare";

function formatWon(n: number): string {
  if (Math.abs(n) >= 100_000_000) return `${(n / 100_000_000).toFixed(1)}억원`;
  if (Math.abs(n) >= 10_000) return `${Math.round(n / 10_000).toLocaleString()}만원`;
  return `${n.toLocaleString()}원`;
}

function ScenarioBar({ scenario, maxInterest }: { scenario: RepaymentScenario; maxInterest: number }) {
  const pct = maxInterest > 0 ? (scenario.totalInterest / maxInterest) * 100 : 0;
  const colors: Record<string, string> = { "원리금균등": "bg-blue-500", "원금균등": "bg-green-500", "만기일시": "bg-orange-500" };
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 w-20">{scenario.label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
        <div className={`h-6 rounded-full ${colors[scenario.label] || "bg-gray-400"}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-sm font-bold w-24 text-right">{formatWon(scenario.totalInterest)}</span>
    </div>
  );
}

export default function RepaymentMethodComparator() {
  const [principal, setPrincipal] = useState(10000); // 만원
  const [annualRate, setAnnualRate] = useState(4.5); // %
  const [termYears, setTermYears] = useState(10);
  const [showSchedule, setShowSchedule] = useState<string | null>(null);

  const result = useMemo(() => {
    if (principal <= 0 || annualRate <= 0 || termYears <= 0) return null;
    const input: RepaymentInput = {
      principal: principal * 10000,
      annualRate,
      termMonths: termYears * 12,
    };
    return calculateRepaymentComparison(input);
  }, [principal, annualRate, termYears]);

  const maxInterest = result ? Math.max(
    result.equalPrincipalInterest.totalInterest,
    result.equalPrincipal.totalInterest,
    result.bulletRepayment.totalInterest,
  ) : 0;

  return (
    <div className="space-y-6">
      {/* 입력 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">대출 조건 입력</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">대출 원금</label>
          <div className="flex items-center gap-2">
            <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} min={100} step={100}
              className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            <span className="text-sm text-gray-500 w-12 text-right">만원</span>
          </div>
          <input type="range" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} min={500} max={50000} step={500}
            className="w-full mt-2 accent-blue-600" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">연 금리</label>
            <div className="flex items-center gap-2">
              <input type="number" value={annualRate} onChange={(e) => setAnnualRate(Number(e.target.value))} min={0.5} max={20} step={0.1}
                className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              <span className="text-sm text-gray-500">%</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">대출 기간</label>
            <div className="flex items-center gap-2">
              <input type="number" value={termYears} onChange={(e) => setTermYears(Number(e.target.value))} min={1} max={40}
                className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              <span className="text-sm text-gray-500">년</span>
            </div>
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
                    <th className="px-3 py-3 text-left text-gray-600">항목</th>
                    <th className="px-3 py-3 text-center text-blue-700 font-bold">원리금균등</th>
                    <th className="px-3 py-3 text-center text-green-700 font-bold">원금균등</th>
                    <th className="px-3 py-3 text-center text-orange-700 font-bold">만기일시</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-3 py-3 text-gray-600">첫 달 납입액</td>
                    <td className="px-3 py-3 text-center font-bold">{formatWon(result.equalPrincipalInterest.firstPayment)}</td>
                    <td className="px-3 py-3 text-center font-bold">{formatWon(result.equalPrincipal.firstPayment)}</td>
                    <td className="px-3 py-3 text-center font-bold">{formatWon(result.bulletRepayment.firstPayment)}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 text-gray-600">마지막 달 납입액</td>
                    <td className="px-3 py-3 text-center">{formatWon(result.equalPrincipalInterest.lastPayment)}</td>
                    <td className="px-3 py-3 text-center">{formatWon(result.equalPrincipal.lastPayment)}</td>
                    <td className="px-3 py-3 text-center">{formatWon(result.bulletRepayment.lastPayment)}</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="px-3 py-3 text-gray-600 font-medium">총 이자</td>
                    <td className="px-3 py-3 text-center font-bold text-red-600">{formatWon(result.equalPrincipalInterest.totalInterest)}</td>
                    <td className="px-3 py-3 text-center font-bold text-red-600">{formatWon(result.equalPrincipal.totalInterest)}</td>
                    <td className="px-3 py-3 text-center font-bold text-red-600">{formatWon(result.bulletRepayment.totalInterest)}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-3 py-3 text-gray-600 font-medium">총 상환액</td>
                    <td className="px-3 py-3 text-center font-bold">{formatWon(result.equalPrincipalInterest.totalPayment)}</td>
                    <td className="px-3 py-3 text-center font-bold">{formatWon(result.equalPrincipal.totalPayment)}</td>
                    <td className="px-3 py-3 text-center font-bold">{formatWon(result.bulletRepayment.totalPayment)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 이자 비교 바 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <h3 className="font-bold text-gray-900 mb-3">총 이자 비교</h3>
            <div className="space-y-3">
              <ScenarioBar scenario={result.equalPrincipalInterest} maxInterest={maxInterest} />
              <ScenarioBar scenario={result.equalPrincipal} maxInterest={maxInterest} />
              <ScenarioBar scenario={result.bulletRepayment} maxInterest={maxInterest} />
            </div>
          </div>

          {/* 결론 */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
            <h3 className="font-bold text-lg mb-2">결론</h3>
            <p className="text-sm text-blue-100">{result.interestSaved}</p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-white/10 rounded-lg p-2">
                <p className="text-blue-200">원리금균등</p>
                <p className="font-bold mt-1">매달 동일 납입</p>
                <p className="text-blue-300">예산 관리 쉬움</p>
              </div>
              <div className="bg-white/10 rounded-lg p-2">
                <p className="text-blue-200">원금균등</p>
                <p className="font-bold mt-1">이자 가장 적음</p>
                <p className="text-blue-300">초반 부담 큼</p>
              </div>
              <div className="bg-white/10 rounded-lg p-2">
                <p className="text-blue-200">만기일시</p>
                <p className="font-bold mt-1">월 부담 최소</p>
                <p className="text-blue-300">이자 가장 많음</p>
              </div>
            </div>
          </div>

          {/* 상환 스케줄 토글 */}
          <div className="bg-white border rounded-xl overflow-hidden">
            <div className="flex border-b">
              {["원리금균등", "원금균등", "만기일시"].map((label) => (
                <button key={label} onClick={() => setShowSchedule(showSchedule === label ? null : label)}
                  className={`flex-1 px-3 py-3 text-sm font-bold transition-colors ${showSchedule === label ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600" : "text-gray-500 hover:bg-gray-50"}`}>
                  {label}
                </button>
              ))}
            </div>
            {showSchedule && (() => {
              const scenario = showSchedule === "원리금균등" ? result.equalPrincipalInterest
                : showSchedule === "원금균등" ? result.equalPrincipal
                : result.bulletRepayment;
              // 6개월 간격으로 표시
              const filtered = scenario.schedule.filter((s) => s.month === 1 || s.month % 6 === 0 || s.month === scenario.schedule.length);
              return (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead><tr className="bg-gray-50">
                      <th className="px-3 py-2 text-left">회차</th>
                      <th className="px-3 py-2 text-right">납입액</th>
                      <th className="px-3 py-2 text-right">원금</th>
                      <th className="px-3 py-2 text-right">이자</th>
                      <th className="px-3 py-2 text-right">잔액</th>
                    </tr></thead>
                    <tbody className="divide-y">
                      {filtered.map((s) => (
                        <tr key={s.month}>
                          <td className="px-3 py-2">{s.month}회</td>
                          <td className="px-3 py-2 text-right font-mono">{formatWon(s.payment)}</td>
                          <td className="px-3 py-2 text-right font-mono">{formatWon(s.principalPart)}</td>
                          <td className="px-3 py-2 text-right font-mono text-red-600">{formatWon(s.interestPart)}</td>
                          <td className="px-3 py-2 text-right font-mono">{formatWon(s.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </div>

          {/* 참고 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
            <p className="font-medium mb-1">참고사항</p>
            <ul className="list-disc list-inside space-y-1">
              <li>실제 상환액은 금리 변동, 중도상환 등에 따라 달라질 수 있습니다.</li>
              <li>원금균등 상환은 초기 부담이 크지만 총 이자가 가장 적습니다.</li>
              <li>만기일시 상환은 월 부담이 적지만 만기에 원금을 한꺼번에 상환해야 합니다.</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
