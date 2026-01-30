"use client";

import { useState, useMemo } from "react";
import {
  calculateInvestmentComparison,
  type InvestmentCompareResult,
} from "@/lib/tools/comparator/investment-compare";

function formatWon(n: number): string {
  if (Math.abs(n) >= 100_000_000)
    return `${(n / 100_000_000).toFixed(1)}억원`;
  if (Math.abs(n) >= 10_000)
    return `${Math.round(n / 10_000).toLocaleString("ko-KR")}만원`;
  return `${n.toLocaleString("ko-KR")}원`;
}

function NumberInput({
  label,
  value,
  onChange,
  suffix = "만원",
  min = 0,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="text-sm text-gray-500 w-12 text-right">{suffix}</span>
      </div>
    </div>
  );
}

const WINNER_LABELS: Record<string, string> = {
  savings: "적금",
  etf: "ETF/펀드",
  realEstate: "부동산",
};

const WINNER_EMOJI: Record<string, string> = {
  savings: "🏦",
  etf: "📈",
  realEstate: "🏠",
};

export default function InvestmentComparator() {
  const [initialAmount, setInitialAmount] = useState(3000);
  const [monthlyAmount, setMonthlyAmount] = useState(50);
  const [years, setYears] = useState(10);
  const [savingsRate, setSavingsRate] = useState(3.5);
  const [etfReturnRate, setEtfReturnRate] = useState(8);
  const [etfVolatility, setEtfVolatility] = useState(15);
  const [realEstateAppreciation, setRealEstateAppreciation] = useState(3);
  const [realEstateRentalYield, setRealEstateRentalYield] = useState(4);
  const [realEstateLoanRatio, setRealEstateLoanRatio] = useState(60);
  const [realEstateLoanRate, setRealEstateLoanRate] = useState(4.5);
  const [taxApplied, setTaxApplied] = useState(true);

  const result: InvestmentCompareResult | null = useMemo(() => {
    if (years <= 0 || initialAmount < 0) return null;
    return calculateInvestmentComparison({
      initialAmount: initialAmount * 10000,
      monthlyAmount: monthlyAmount * 10000,
      years,
      savingsRate,
      etfReturnRate,
      etfVolatility,
      realEstateAppreciation,
      realEstateRentalYield,
      realEstateLoanRatio,
      realEstateLoanRate,
      taxApplied,
    });
  }, [
    initialAmount,
    monthlyAmount,
    years,
    savingsRate,
    etfReturnRate,
    etfVolatility,
    realEstateAppreciation,
    realEstateRentalYield,
    realEstateLoanRatio,
    realEstateLoanRate,
    taxApplied,
  ]);

  return (
    <div className="space-y-6">
      {/* 투자 조건 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">투자 조건</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberInput
            label="초기 투자금"
            value={initialAmount}
            onChange={setInitialAmount}
            suffix="만원"
            min={0}
          />
          <NumberInput
            label="월 추가 투자"
            value={monthlyAmount}
            onChange={setMonthlyAmount}
            suffix="만원"
            min={0}
          />
          <NumberInput
            label="투자 기간"
            value={years}
            onChange={setYears}
            suffix="년"
            min={1}
            max={30}
          />
        </div>
      </div>

      {/* 상품별 조건 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-900">상품별 조건</h2>

        {/* 적금 */}
        <div className="border-l-4 border-blue-400 pl-4 space-y-3">
          <h3 className="font-semibold text-blue-700">🏦 적금</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberInput
              label="적금 금리"
              value={savingsRate}
              onChange={setSavingsRate}
              suffix="%"
              min={0}
              max={20}
              step={0.1}
            />
          </div>
        </div>

        {/* ETF */}
        <div className="border-l-4 border-green-400 pl-4 space-y-3">
          <h3 className="font-semibold text-green-700">📈 ETF / 인덱스펀드</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberInput
              label="예상 수익률"
              value={etfReturnRate}
              onChange={setEtfReturnRate}
              suffix="%"
              min={0}
              max={30}
              step={0.5}
            />
            <NumberInput
              label="변동성 (리스크)"
              value={etfVolatility}
              onChange={setEtfVolatility}
              suffix="%"
              min={0}
              max={50}
              step={1}
            />
          </div>
        </div>

        {/* 부동산 */}
        <div className="border-l-4 border-orange-400 pl-4 space-y-3">
          <h3 className="font-semibold text-orange-700">🏠 부동산</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberInput
              label="시세 상승률"
              value={realEstateAppreciation}
              onChange={setRealEstateAppreciation}
              suffix="%"
              min={-5}
              max={20}
              step={0.5}
            />
            <NumberInput
              label="임대 수익률"
              value={realEstateRentalYield}
              onChange={setRealEstateRentalYield}
              suffix="%"
              min={0}
              max={15}
              step={0.5}
            />
            <NumberInput
              label="대출 비율"
              value={realEstateLoanRatio}
              onChange={setRealEstateLoanRatio}
              suffix="%"
              min={0}
              max={80}
              step={5}
            />
            <NumberInput
              label="대출 금리"
              value={realEstateLoanRate}
              onChange={setRealEstateLoanRate}
              suffix="%"
              min={0}
              max={15}
              step={0.1}
            />
          </div>
        </div>
      </div>

      {/* 세금 적용 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={taxApplied}
            onChange={(e) => setTaxApplied(e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded"
          />
          <span className="font-medium text-gray-900">세금 적용하여 비교</span>
          <span className="text-sm text-gray-500">
            (이자소득세, 금투세, 양도세 반영)
          </span>
        </label>
      </div>

      {/* 결과 */}
      {result && (
        <>
          {/* 결과 요약 */}
          <div className="rounded-xl p-6 text-white text-center bg-gradient-to-r from-green-600 to-green-700">
            <p className="text-sm opacity-80 mb-1">
              {years}년 투자 기준 {taxApplied ? "세후" : "세전"} 최고 수익
            </p>
            <p className="text-4xl font-bold mb-2">
              {WINNER_EMOJI[result.winner]} {WINNER_LABELS[result.winner]}
            </p>
            <p className="text-lg opacity-90">{result.summary}</p>
          </div>

          {/* 비교표 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <h3 className="font-bold text-gray-900 mb-4">상세 비교표</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left py-2 pr-2">항목</th>
                    <th className="text-right py-2 px-2">
                      <span className="text-blue-600">🏦 적금</span>
                    </th>
                    <th className="text-right py-2 px-2">
                      <span className="text-green-600">📈 ETF</span>
                    </th>
                    <th className="text-right py-2 px-2">
                      <span className="text-orange-600">🏠 부동산</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 pr-2 text-gray-500">총 투자금</td>
                    <td className="text-right py-2 px-2">
                      {formatWon(result.savings.totalInvested)}
                    </td>
                    <td className="text-right py-2 px-2">
                      {formatWon(result.etf.totalInvested)}
                    </td>
                    <td className="text-right py-2 px-2">
                      {formatWon(result.realEstate.totalInvested)}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-2 text-gray-500">최종 가치</td>
                    <td className="text-right py-2 px-2">
                      {formatWon(result.savings.finalValue)}
                    </td>
                    <td className="text-right py-2 px-2">
                      {formatWon(result.etf.finalValue)}
                    </td>
                    <td className="text-right py-2 px-2">
                      {formatWon(result.realEstate.finalPropertyValue)}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-2 text-gray-500">
                      {taxApplied ? "세후 수익" : "세전 수익"}
                    </td>
                    <td
                      className={`text-right py-2 px-2 font-bold ${result.savings.profit >= 0 ? "text-blue-600" : "text-red-600"}`}
                    >
                      {result.savings.profit >= 0 ? "+" : ""}
                      {formatWon(result.savings.profit)}
                    </td>
                    <td
                      className={`text-right py-2 px-2 font-bold ${result.etf.profit >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {result.etf.profit >= 0 ? "+" : ""}
                      {formatWon(result.etf.profit)}
                    </td>
                    <td
                      className={`text-right py-2 px-2 font-bold ${result.realEstate.netProfit >= 0 ? "text-orange-600" : "text-red-600"}`}
                    >
                      {result.realEstate.netProfit >= 0 ? "+" : ""}
                      {formatWon(result.realEstate.netProfit)}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-2 text-gray-500">수익률</td>
                    <td className="text-right py-2 px-2">
                      {result.savings.profitRate.toFixed(1)}%
                    </td>
                    <td className="text-right py-2 px-2">
                      {result.etf.profitRate.toFixed(1)}%
                    </td>
                    <td className="text-right py-2 px-2">
                      {result.realEstate.profitRate.toFixed(1)}%
                    </td>
                  </tr>
                  {taxApplied && (
                    <tr className="border-b bg-gray-50">
                      <td className="py-2 pr-2 text-gray-500 font-medium">
                        세후 자산
                      </td>
                      <td className="text-right py-2 px-2 font-bold">
                        {formatWon(result.savings.afterTax)}
                      </td>
                      <td className="text-right py-2 px-2 font-bold">
                        {formatWon(result.etf.afterTax)}
                      </td>
                      <td className="text-right py-2 px-2 font-bold">
                        {formatWon(result.realEstate.afterTax)}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ETF 시나리오 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <h3 className="font-bold text-gray-900 mb-3">
              ETF 시나리오 분석 (변동성 반영)
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-red-600 font-medium">비관적</p>
                <p className="text-lg font-bold text-red-700">
                  {formatWon(result.etf.pessimistic)}
                </p>
                <p className="text-xs text-red-500">
                  수익률 {Math.max(0, etfReturnRate - etfVolatility / 2).toFixed(1)}%
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-green-600 font-medium">보통</p>
                <p className="text-lg font-bold text-green-700">
                  {formatWon(result.etf.finalValue)}
                </p>
                <p className="text-xs text-green-500">
                  수익률 {etfReturnRate}%
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-blue-600 font-medium">낙관적</p>
                <p className="text-lg font-bold text-blue-700">
                  {formatWon(result.etf.optimistic)}
                </p>
                <p className="text-xs text-blue-500">
                  수익률 {(etfReturnRate + etfVolatility / 2).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          {/* 부동산 상세 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-3">
            <h3 className="font-bold text-gray-900">부동산 상세 분석</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">매입가 (레버리지 포함)</span>
                <span className="font-bold">
                  {formatWon(result.realEstate.purchasePrice)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">
                  {years}년 후 시세
                </span>
                <span className="font-bold">
                  {formatWon(result.realEstate.finalPropertyValue)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">누적 임대수익</span>
                <span className="font-bold text-green-600">
                  +{formatWon(result.realEstate.totalRentalIncome)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">누적 대출이자</span>
                <span className="font-bold text-red-600">
                  -{formatWon(result.realEstate.totalLoanInterest)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">잔여 대출금</span>
                <span className="font-bold">
                  {formatWon(result.realEstate.remainingLoan)}
                </span>
              </div>
            </div>
          </div>

          {/* 연도별 추이 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6">
            <h3 className="font-bold text-gray-900 mb-4">연도별 자산 추이</h3>
            <div className="space-y-3">
              {(() => {
                const displayYears = result.savings.yearlyData.filter(
                  (d) =>
                    d.year === 1 ||
                    d.year === 3 ||
                    d.year === 5 ||
                    d.year % 5 === 0 ||
                    d.year === years
                );
                const allValues = [
                  ...result.savings.yearlyData.map((d) => d.value),
                  ...result.etf.yearlyData.map((d) => d.value),
                  ...result.realEstate.yearlyData.map((d) => d.value),
                ];
                const maxVal = Math.max(...allValues, 1);

                return displayYears.map((sd) => {
                  const ed = result.etf.yearlyData.find(
                    (d) => d.year === sd.year
                  );
                  const rd = result.realEstate.yearlyData.find(
                    (d) => d.year === sd.year
                  );

                  return (
                    <div key={sd.year} className="space-y-1">
                      <p className="text-xs font-medium text-gray-500">
                        {sd.year}년차
                      </p>
                      {/* 적금 */}
                      <div className="flex items-center gap-2 text-xs">
                        <span className="w-10 text-blue-600">적금</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{
                              width: `${Math.max(1, (sd.value / maxVal) * 100)}%`,
                            }}
                          />
                        </div>
                        <span className="w-20 text-right font-mono">
                          {formatWon(sd.value)}
                        </span>
                      </div>
                      {/* ETF */}
                      <div className="flex items-center gap-2 text-xs">
                        <span className="w-10 text-green-600">ETF</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-green-500"
                            style={{
                              width: `${Math.max(1, ((ed?.value ?? 0) / maxVal) * 100)}%`,
                            }}
                          />
                        </div>
                        <span className="w-20 text-right font-mono">
                          {formatWon(ed?.value ?? 0)}
                        </span>
                      </div>
                      {/* 부동산 */}
                      <div className="flex items-center gap-2 text-xs">
                        <span className="w-10 text-orange-600">부동산</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-orange-500"
                            style={{
                              width: `${Math.max(1, ((rd?.value ?? 0) / maxVal) * 100)}%`,
                            }}
                          />
                        </div>
                        <span className="w-20 text-right font-mono">
                          {formatWon(rd?.value ?? 0)}
                        </span>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>

          {/* 참고사항 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
            <p className="font-medium mb-1">참고사항</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                적금은 월복리 기준, ETF는 연평균 수익률 기반 시뮬레이션입니다.
              </li>
              <li>
                부동산은 레버리지(대출) 효과를 반영하며, 취득세/보유세 등 부대비용은 제외했습니다.
              </li>
              <li>
                ETF 수익률과 부동산 시세는 과거 실적이며 미래 수익을 보장하지 않습니다.
              </li>
              <li>
                세금은 간략 계산이며, 실제 세액은 개인 상황에 따라 다릅니다.
              </li>
              <li>
                투자 결정 전 반드시 전문가 상담을 권장합니다.
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
