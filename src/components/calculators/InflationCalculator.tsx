"use client";

import { useState, useMemo } from "react";
import { calculateInflation, type InflationInput } from "@/lib/calculators/inflation";

function formatWon(n: number): string {
  if (Math.abs(n) >= 100_000_000) return `${(n / 100_000_000).toFixed(1)}억원`;
  if (Math.abs(n) >= 10_000) return `${Math.round(n / 10_000).toLocaleString()}만원`;
  return `${n.toLocaleString()}원`;
}

export default function InflationCalculator() {
  const [baseYear, setBaseYear] = useState(2000);
  const [compareYear, setCompareYear] = useState(2026);
  const [amount, setAmount] = useState(100); // 만원
  const [useCustomRate, setUseCustomRate] = useState(false);
  const [customRate, setCustomRate] = useState(2.5);

  const result = useMemo(() => {
    if (baseYear === compareYear || amount <= 0) return null;
    const input: InflationInput = {
      baseYear,
      compareYear,
      amount: amount * 10000,
      customRate: useCustomRate ? customRate : undefined,
    };
    return calculateInflation(input);
  }, [baseYear, compareYear, amount, useCustomRate, customRate]);

  const maxValue = result ? Math.max(...result.yearlyData.map((d) => d.value), 1) : 1;

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">기준 설정</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">기준 연도</label>
            <input type="number" value={baseYear} onChange={(e) => setBaseYear(Number(e.target.value))} min={1990} max={2026}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비교 연도</label>
            <input type="number" value={compareYear} onChange={(e) => setCompareYear(Number(e.target.value))} min={1990} max={2026}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">금액</label>
          <div className="flex items-center gap-2">
            <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} min={1}
              className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            <span className="text-sm text-gray-500">만원</span>
          </div>
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={useCustomRate} onChange={(e) => setUseCustomRate(e.target.checked)} className="rounded" />
            <span className="text-gray-700">물가상승률 직접 입력</span>
          </label>
          {useCustomRate && (
            <div className="flex items-center gap-2 mt-2">
              <input type="number" value={customRate} onChange={(e) => setCustomRate(Number(e.target.value))} step={0.1} min={0} max={20}
                className="w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
              <span className="text-sm text-gray-500">% (연)</span>
            </div>
          )}
        </div>
      </div>

      {result && (
        <>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white text-center">
            <p className="text-sm opacity-80 mb-1">{baseYear}년 {formatWon(result.baseAmount)}의 {compareYear}년 가치</p>
            <p className="text-3xl font-bold">{formatWon(result.adjustedAmount)}</p>
            <div className="flex justify-center gap-6 mt-3 text-sm">
              <div><p className="text-blue-200">총 상승률</p><p className="font-bold">{result.totalInflation}%</p></div>
              <div><p className="text-blue-200">연평균</p><p className="font-bold">{result.annualAverage}%</p></div>
              <div><p className="text-blue-200">구매력</p><p className="font-bold">{result.purchasingPower}%</p></div>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <h3 className="font-bold text-gray-900 mb-2">다르게 말하면</h3>
            <p className="text-sm text-gray-600">
              {baseYear}년에 {formatWon(result.baseAmount)}으로 살 수 있던 것을
              {compareYear}년에 사려면 <strong className="text-red-600">{formatWon(result.adjustedAmount)}</strong>이 필요합니다.
              돈의 가치가 <strong>{(100 - result.purchasingPower).toFixed(1)}%</strong> 줄어든 셈입니다.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <h3 className="font-bold text-gray-900 mb-3">체감 비교</h3>
            <div className="space-y-3">
              {result.examples.map((ex) => (
                <div key={ex.item} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-sm text-gray-600">{ex.item}</span>
                  <div className="text-right">
                    <span className="text-sm text-gray-400">{formatWon(ex.baseCost)}</span>
                    <span className="text-gray-400 mx-2">→</span>
                    <span className="text-sm font-bold text-red-600">{formatWon(ex.currentCost)}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">* 물가상승률 기준 추정치이며 실제와 다를 수 있습니다</p>
          </div>

          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <h3 className="font-bold text-gray-900 mb-3">연도별 변화 (5년 단위)</h3>
            <div className="space-y-2">
              {result.yearlyData.filter((d) => d.year % 5 === 0 || d.year === compareYear).map((d) => (
                <div key={d.year} className="flex items-center gap-3 text-sm">
                  <span className="w-12 text-right text-gray-500 font-mono">{d.year}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-5">
                    <div className="bg-blue-500 h-5 rounded-full transition-all" style={{ width: `${(d.value / maxValue) * 100}%` }} />
                  </div>
                  <span className="w-20 text-right text-gray-700 font-mono text-xs">{formatWon(d.value)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
            <p className="font-medium mb-1">참고</p>
            <ul className="list-disc list-inside space-y-1">
              <li>{useCustomRate ? `사용자 지정 연 ${customRate}% 물가상승률 적용` : "통계청 소비자물가지수 기반 실제 물가상승률 적용"}</li>
              <li>부동산, 교육비 등은 일반 물가보다 더 빠르게 오르는 경우가 많습니다.</li>
              <li>물가상승에 대비하려면 예금 금리 이상의 수익률로 자산을 운용해야 합니다.</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
