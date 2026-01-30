"use client";

import { useState, useMemo } from "react";
import { calculateHomePurchase, type HomePurchaseInput } from "@/lib/tools/comparator/home-purchase";

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

export default function HomePurchaseTimeline() {
  const [currentSavings, setCurrentSavings] = useState(5000); // 만원
  const [monthlySaving, setMonthlySaving] = useState(150);
  const [savingsRate, setSavingsRate] = useState(4);
  const [targetPrice, setTargetPrice] = useState(50000);
  const [loanRatio, setLoanRatio] = useState(60);
  const [loanRate, setLoanRate] = useState(4);
  const [loanTermYears, setLoanTermYears] = useState(30);

  const result = useMemo(() => {
    if (targetPrice <= 0) return null;
    const input: HomePurchaseInput = {
      currentSavings: currentSavings * 10000,
      monthlySaving: monthlySaving * 10000,
      savingsRate,
      targetPrice: targetPrice * 10000,
      loanRatio,
      loanRate,
      loanTermYears,
    };
    return calculateHomePurchase(input);
  }, [currentSavings, monthlySaving, savingsRate, targetPrice, loanRatio, loanRate, loanTermYears]);

  const maxCapacity = result ? Math.max(...result.accumulation.slice(0, 20).map((d) => d.totalCapacity), 1) : 1;

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">현재 자금</h2>
        <div className="grid grid-cols-2 gap-4">
          <NumberInput label="현재 보유 자금" value={currentSavings} onChange={setCurrentSavings} />
          <NumberInput label="월 저축액" value={monthlySaving} onChange={setMonthlySaving} />
          <NumberInput label="저축 수익률" value={savingsRate} onChange={setSavingsRate} suffix="%" step={0.5} min={0} max={10} />
        </div>

        <h2 className="text-lg font-bold text-gray-900 pt-2">목표 주택</h2>
        <div className="grid grid-cols-2 gap-4">
          <NumberInput label="목표 주택 가격" value={targetPrice} onChange={setTargetPrice} />
          <NumberInput label="대출 비율" value={loanRatio} onChange={setLoanRatio} suffix="%" min={0} max={80} />
          <NumberInput label="대출 금리" value={loanRate} onChange={setLoanRate} suffix="%" step={0.1} min={1} max={10} />
          <NumberInput label="대출 기간" value={loanTermYears} onChange={setLoanTermYears} suffix="년" min={5} max={40} />
        </div>
      </div>

      {result && (
        <>
          <div className={`rounded-xl p-6 text-white text-center ${result.yearsToGoal !== null ? "bg-gradient-to-r from-blue-600 to-blue-700" : "bg-gradient-to-r from-red-600 to-red-700"}`}>
            <p className="text-sm opacity-80 mb-1">내 집 마련 예상</p>
            {result.yearsToGoal !== null ? (
              <>
                <p className="text-3xl font-bold">{result.yearsToGoal === 0 ? "지금 바로 가능!" : `약 ${result.yearsToGoal}년 후`}</p>
                <p className="text-sm mt-2 opacity-90">필요 자기자금 {formatWon(result.requiredDown)} + 대출 {formatWon(result.loanAmount)}</p>
              </>
            ) : (
              <>
                <p className="text-3xl font-bold">30년 이내 달성 어려움</p>
                <p className="text-sm mt-2 opacity-90">저축액 증가 또는 대출 비율 조정을 검토하세요</p>
              </>
            )}
          </div>

          <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-3">
            <h3 className="font-bold text-gray-900">상세 분석</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b"><span className="text-gray-500">목표 주택 가격</span><span className="font-bold">{formatWon(result.targetPrice)}</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-500">필요 자기자금 ({100 - loanRatio}%)</span><span className="font-bold">{formatWon(result.requiredDown)}</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-500">대출 금액 ({loanRatio}%)</span><span className="font-bold">{formatWon(result.loanAmount)}</span></div>
              <div className="flex justify-between py-2"><span className="text-gray-500">대출 월 상환액</span><span className="font-bold text-blue-600">{formatWon(result.monthlyPayment)}</span></div>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <h3 className="font-bold text-gray-900 mb-3">자금 축적 추이</h3>
            <div className="space-y-2">
              {result.accumulation.filter((d) => d.year <= 20 && (d.year % 2 === 0 || d.year <= 5)).map((d) => (
                <div key={d.year} className="flex items-center gap-3 text-sm">
                  <span className={`w-10 text-right font-mono ${d.achievePercent >= 100 ? "font-bold text-green-600" : "text-gray-500"}`}>{d.year}년</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-end pr-2">
                      {d.achievePercent >= 100 && <span className="text-xs text-green-700 font-bold">달성!</span>}
                    </div>
                    <div className={`h-full rounded-full transition-all ${d.achievePercent >= 100 ? "bg-green-500" : "bg-blue-500"}`}
                      style={{ width: `${Math.min(100, (d.totalCapacity / maxCapacity) * 100)}%` }} />
                  </div>
                  <span className="w-20 text-right text-gray-700 font-mono text-xs">{formatWon(d.savings)}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">* 저축액 기준 (대출 포함 시 달성 시점이 앞당겨집니다)</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="font-bold text-green-800 mb-2">종합 판단</p>
            <p className="text-sm text-green-700">{result.summary}</p>
          </div>
        </>
      )}
    </div>
  );
}
