"use client";

import { useState, useMemo } from "react";
import { calculateRetirementFund, type RetirementInput } from "@/lib/calculators/retirement-fund";

function formatWon(n: number): string {
  if (Math.abs(n) >= 100_000_000) return `${(n / 100_000_000).toFixed(1)}억원`;
  if (Math.abs(n) >= 10_000) return `${Math.round(n / 10_000).toLocaleString()}만원`;
  return `${n.toLocaleString()}원`;
}

function NumberInput({ label, value, onChange, suffix = "만원", min = 0, max, step = 1 }: {
  label: string; value: number; onChange: (v: number) => void; suffix?: string; min?: number; max?: number; step?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} min={min} max={max} step={step}
          className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        <span className="text-sm text-gray-500 w-12 text-right">{suffix}</span>
      </div>
    </div>
  );
}

export default function RetirementFundSimulator() {
  const [currentAge, setCurrentAge] = useState(35);
  const [retireAge, setRetireAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [currentSavings, setCurrentSavings] = useState(3000); // 만원
  const [monthlyContribution, setMonthlyContribution] = useState(100); // 만원
  const [returnRate, setReturnRate] = useState(5);
  const [inflationRate, setInflationRate] = useState(2.5);
  const [monthlyExpense, setMonthlyExpense] = useState(250); // 만원
  const [pensionMonthly, setPensionMonthly] = useState(80); // 만원

  const result = useMemo(() => {
    if (currentAge >= retireAge || retireAge >= lifeExpectancy) return null;
    const input: RetirementInput = {
      currentAge, retireAge, lifeExpectancy,
      currentSavings: currentSavings * 10000,
      monthlyContribution: monthlyContribution * 10000,
      expectedReturnRate: returnRate,
      inflationRate,
      monthlyExpense: monthlyExpense * 10000,
      pensionMonthly: pensionMonthly * 10000,
    };
    return calculateRetirementFund(input);
  }, [currentAge, retireAge, lifeExpectancy, currentSavings, monthlyContribution, returnRate, inflationRate, monthlyExpense, pensionMonthly]);

  // 간단 차트: 나이별 자산 추이 바
  const maxAsset = result ? Math.max(...result.yearlyData.map((d) => d.asset), 1) : 1;

  return (
    <div className="space-y-6">
      {/* 입력 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">기본 정보</h2>
        <div className="grid grid-cols-2 gap-4">
          <NumberInput label="현재 나이" value={currentAge} onChange={setCurrentAge} suffix="세" min={20} max={70} />
          <NumberInput label="은퇴 희망 나이" value={retireAge} onChange={setRetireAge} suffix="세" min={40} max={80} />
          <NumberInput label="기대 수명" value={lifeExpectancy} onChange={setLifeExpectancy} suffix="세" min={70} max={100} />
          <NumberInput label="현재 보유 자산" value={currentSavings} onChange={setCurrentSavings} />
        </div>

        <h2 className="text-lg font-bold text-gray-900 pt-2">저축/투자 계획</h2>
        <div className="grid grid-cols-2 gap-4">
          <NumberInput label="월 저축/투자액" value={monthlyContribution} onChange={setMonthlyContribution} />
          <NumberInput label="예상 수익률" value={returnRate} onChange={setReturnRate} suffix="%" step={0.5} min={0} max={15} />
          <NumberInput label="물가상승률" value={inflationRate} onChange={setInflationRate} suffix="%" step={0.5} min={0} max={10} />
        </div>

        <h2 className="text-lg font-bold text-gray-900 pt-2">은퇴 후 계획</h2>
        <div className="grid grid-cols-2 gap-4">
          <NumberInput label="은퇴 후 월 생활비" value={monthlyExpense} onChange={setMonthlyExpense} />
          <NumberInput label="국민연금 예상 월액" value={pensionMonthly} onChange={setPensionMonthly} />
        </div>
      </div>

      {/* 결과 */}
      {result && (
        <>
          {/* 메인 결과 */}
          <div className={`rounded-xl p-6 text-white text-center ${result.shortage > 0 ? "bg-gradient-to-r from-red-600 to-red-700" : "bg-gradient-to-r from-blue-600 to-blue-700"}`}>
            <p className="text-sm opacity-80 mb-1">{retireAge}세 은퇴 시 예상 자산</p>
            <p className="text-3xl font-bold">{formatWon(result.retireAsset)}</p>
            {result.shortage > 0 ? (
              <p className="text-sm mt-2 opacity-90">은퇴자금 부족: <strong>{formatWon(result.shortage)}</strong> (월 {formatWon(result.monthlyShortage)} 추가 저축 필요)</p>
            ) : (
              <p className="text-sm mt-2 opacity-90">여유자금: <strong>{formatWon(Math.abs(result.shortage))}</strong></p>
            )}
            {result.depletionAge ? (
              <p className="mt-2 text-sm bg-white/20 rounded-lg px-3 py-1 inline-block">자산 소진 예상: {result.depletionAge}세</p>
            ) : (
              <p className="mt-2 text-sm bg-white/20 rounded-lg px-3 py-1 inline-block">{lifeExpectancy}세까지 자산 유지 가능</p>
            )}
          </div>

          {/* 상세 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-3">
            <h3 className="font-bold text-gray-900">상세 분석</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b"><span className="text-gray-500">은퇴 시 자산</span><span className="font-bold">{formatWon(result.retireAsset)}</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-500">은퇴 후 필요 총액</span><span className="font-bold">{formatWon(result.totalNeeded)}</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-500">국민연금 총 수령</span><span className="font-bold text-blue-600">{formatWon(result.pensionTotal)}</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-500">순 필요 자금</span><span className="font-bold">{formatWon(result.totalNeeded - result.pensionTotal)}</span></div>
              <div className="flex justify-between py-2"><span className="text-gray-500">{result.shortage > 0 ? "부족분" : "여유분"}</span><span className={`font-bold ${result.shortage > 0 ? "text-red-600" : "text-blue-600"}`}>{formatWon(Math.abs(result.shortage))}</span></div>
            </div>
          </div>

          {/* 시나리오 비교 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <h3 className="font-bold text-gray-900 mb-3">시나리오 비교</h3>
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-gray-500 text-xs">낙관적 (+2%)</p>
                <p className="font-bold text-green-700 mt-1">{formatWon(result.scenarios.optimistic.retireAsset)}</p>
                <p className="text-xs text-gray-400 mt-1">{result.scenarios.optimistic.depletionAge ? `${result.scenarios.optimistic.depletionAge}세 소진` : "유지 가능"}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 ring-2 ring-blue-200">
                <p className="text-gray-500 text-xs">기본 ({returnRate}%)</p>
                <p className="font-bold text-blue-700 mt-1">{formatWon(result.scenarios.normal.retireAsset)}</p>
                <p className="text-xs text-gray-400 mt-1">{result.scenarios.normal.depletionAge ? `${result.scenarios.normal.depletionAge}세 소진` : "유지 가능"}</p>
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-gray-500 text-xs">비관적 (-2%)</p>
                <p className="font-bold text-red-700 mt-1">{formatWon(result.scenarios.pessimistic.retireAsset)}</p>
                <p className="text-xs text-gray-400 mt-1">{result.scenarios.pessimistic.depletionAge ? `${result.scenarios.pessimistic.depletionAge}세 소진` : "유지 가능"}</p>
              </div>
            </div>
          </div>

          {/* 자산 추이 차트 (텍스트 기반) */}
          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <h3 className="font-bold text-gray-900 mb-3">자산 추이 (5년 단위)</h3>
            <div className="space-y-2">
              {result.yearlyData.filter((d) => d.age % 5 === 0 || d.age === retireAge || d.age === lifeExpectancy).map((d) => (
                <div key={d.age} className="flex items-center gap-3 text-sm">
                  <span className={`w-10 text-right font-mono ${d.age === retireAge ? "font-bold text-blue-600" : "text-gray-500"}`}>{d.age}세</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${d.age < retireAge ? "bg-blue-500" : d.asset > 0 ? "bg-green-500" : "bg-red-400"}`}
                      style={{ width: `${Math.max(1, (d.asset / maxAsset) * 100)}%` }} />
                  </div>
                  <span className="w-20 text-right text-gray-700 font-mono text-xs">{formatWon(d.asset)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 참고 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
            <p className="font-medium mb-1">참고사항</p>
            <ul className="list-disc list-inside space-y-1">
              <li>물가상승률을 반영한 실질 구매력 기준 계산입니다.</li>
              <li>국민연금은 물가연동이므로 명목금액 기준 입력하세요.</li>
              <li>은퇴 후 수익률은 보수적(기본 -1%)으로 적용됩니다.</li>
              <li>퇴직금, 개인연금 등은 자산에 포함해서 입력하세요.</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
