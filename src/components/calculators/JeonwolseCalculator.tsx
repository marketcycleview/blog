"use client";

import { useState, useMemo } from "react";
import {
  jeonseToWolse,
  wolseToJeonse,
  calculateRentReduction,
  MARKET_CONVERSION_RATES,
  REGION_NAMES,
  LEGAL_CONVERSION_RATE_CAP,
  type JeonwolseResult,
} from "@/lib/calculators/jeonwolse";

function formatNumber(num: number): string {
  return num.toLocaleString("ko-KR");
}

type Mode = "jeonse_to_wolse" | "wolse_to_jeonse";

export default function JeonwolseCalculator() {
  const [mode, setMode] = useState<Mode>("jeonse_to_wolse");
  const [region, setRegion] = useState<string>("seoul");
  const [conversionRate, setConversionRate] = useState<string>("4.5");

  // 전세 → 월세
  const [jeonseDeposit, setJeonseDeposit] = useState<string>("300000000");
  const [wolseDeposit, setWolseDeposit] = useState<string>("50000000");

  // 월세 → 전세
  const [currentWolseDeposit, setCurrentWolseDeposit] = useState<string>("10000000");
  const [monthlyRent, setMonthlyRent] = useState<string>("700000");

  const result = useMemo<JeonwolseResult | null>(() => {
    const rate = parseFloat(conversionRate);
    if (isNaN(rate) || rate <= 0) return null;

    if (mode === "jeonse_to_wolse") {
      const jeonse = parseInt(jeonseDeposit.replace(/,/g, ""), 10);
      const wolse = parseInt(wolseDeposit.replace(/,/g, ""), 10);
      if (isNaN(jeonse) || isNaN(wolse)) return null;
      return jeonseToWolse(jeonse, wolse, rate);
    } else {
      const deposit = parseInt(currentWolseDeposit.replace(/,/g, ""), 10);
      const rent = parseInt(monthlyRent.replace(/,/g, ""), 10);
      if (isNaN(deposit) || isNaN(rent)) return null;
      return wolseToJeonse(deposit, rent, rate);
    }
  }, [mode, conversionRate, jeonseDeposit, wolseDeposit, currentWolseDeposit, monthlyRent]);

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

  const handleRegionChange = (newRegion: string) => {
    setRegion(newRegion);
    setConversionRate(MARKET_CONVERSION_RATES[newRegion].toString());
  };

  return (
    <div className="space-y-6">
      {/* 모드 선택 */}
      <div className="bg-white border rounded-xl p-4">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setMode("jeonse_to_wolse")}
            className={`py-3 rounded-lg font-medium transition-colors ${
              mode === "jeonse_to_wolse"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            전세 → 월세
          </button>
          <button
            onClick={() => setMode("wolse_to_jeonse")}
            className={`py-3 rounded-lg font-medium transition-colors ${
              mode === "wolse_to_jeonse"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            월세 → 전세
          </button>
        </div>
      </div>

      {/* 입력 섹션 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">
          {mode === "jeonse_to_wolse" ? "전세 → 월세 전환" : "월세 → 전세 전환"}
        </h2>

        {/* 지역 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            지역 (평균 전환율 참고)
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(MARKET_CONVERSION_RATES).map((r) => (
              <button
                key={r}
                onClick={() => handleRegionChange(r)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  region === r
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 hover:bg-purple-100 hover:text-purple-700"
                }`}
              >
                {REGION_NAMES[r]} ({MARKET_CONVERSION_RATES[r]}%)
              </button>
            ))}
          </div>
        </div>

        {/* 전환율 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            전월세 전환율 (법정 상한: {LEGAL_CONVERSION_RATE_CAP}%)
          </label>
          <div className="relative">
            <input
              type="text"
              value={conversionRate}
              onChange={(e) => setConversionRate(e.target.value.replace(/[^0-9.]/g, ""))}
              className="w-full px-4 py-3 text-lg font-bold border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="4.5"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              %
            </span>
          </div>
        </div>

        {mode === "jeonse_to_wolse" ? (
          <>
            {/* 전세 보증금 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                전세 보증금
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={jeonseDeposit}
                  onChange={(e) => handleNumberChange(e.target.value, setJeonseDeposit)}
                  className="w-full px-4 py-3 text-lg font-bold border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="300,000,000"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  원
                </span>
              </div>
            </div>

            {/* 월세 보증금 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                희망 월세 보증금
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={wolseDeposit}
                  onChange={(e) => handleNumberChange(e.target.value, setWolseDeposit)}
                  className="w-full px-4 py-3 text-lg font-bold border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="50,000,000"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  원
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* 현재 월세 보증금 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                현재 월세 보증금
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={currentWolseDeposit}
                  onChange={(e) => handleNumberChange(e.target.value, setCurrentWolseDeposit)}
                  className="w-full px-4 py-3 text-lg font-bold border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="10,000,000"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  원
                </span>
              </div>
            </div>

            {/* 월세 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                월세
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={monthlyRent}
                  onChange={(e) => handleNumberChange(e.target.value, setMonthlyRent)}
                  className="w-full px-4 py-3 text-lg font-bold border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="700,000"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  원
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 결과 섹션 */}
      {result && (
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          {mode === "jeonse_to_wolse" ? (
            <>
              <div className="text-center">
                <p className="text-purple-100 mb-1">전환 시 월세</p>
                <p className="text-4xl font-bold mb-2">
                  {formatNumber(result.monthlyRent)}원
                </p>
                <p className="text-purple-200 text-sm">
                  보증금 {formatNumber(result.wolseDeposit)}원 기준
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-purple-500 grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-purple-200 text-sm">보증금 차액</p>
                  <p className="text-xl font-bold">{formatNumber(result.differenceDeposit)}원</p>
                </div>
                <div>
                  <p className="text-purple-200 text-sm">연간 월세</p>
                  <p className="text-xl font-bold">{formatNumber(result.annualRent)}원</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <p className="text-purple-100 mb-1">필요 전세 보증금</p>
                <p className="text-4xl font-bold mb-2">
                  {formatNumber(result.jeonseDeposit)}원
                </p>
                <p className="text-purple-200 text-sm">
                  월세 {formatNumber(result.monthlyRent)}원 → 전세 전환 시
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-purple-500 grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-purple-200 text-sm">추가 필요 보증금</p>
                  <p className="text-xl font-bold">{formatNumber(result.differenceDeposit)}원</p>
                </div>
                <div>
                  <p className="text-purple-200 text-sm">연간 절약 월세</p>
                  <p className="text-xl font-bold text-green-300">
                    {formatNumber(result.annualRent)}원
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* 전환율별 비교표 */}
      {result && mode === "jeonse_to_wolse" && (
        <div className="bg-white border rounded-xl p-4 sm:p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">전환율별 월세 비교</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="py-2 px-3 text-left">전환율</th>
                  <th className="py-2 px-3 text-right">월세</th>
                  <th className="py-2 px-3 text-right">연간 월세</th>
                </tr>
              </thead>
              <tbody>
                {[3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0].map((rate) => {
                  const calc = jeonseToWolse(
                    result.jeonseDeposit,
                    result.wolseDeposit,
                    rate
                  );
                  const isSelected = Math.abs(rate - parseFloat(conversionRate)) < 0.1;
                  return (
                    <tr
                      key={rate}
                      className={`border-b ${isSelected ? "bg-purple-50 font-bold" : ""}`}
                    >
                      <td className="py-2 px-3">{rate}%</td>
                      <td className="py-2 px-3 text-right">
                        {formatNumber(calc.monthlyRent)}원
                      </td>
                      <td className="py-2 px-3 text-right">
                        {formatNumber(calc.annualRent)}원
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 보증금 증액 시뮬레이션 */}
      {result && mode === "jeonse_to_wolse" && (
        <div className="bg-white border rounded-xl p-4 sm:p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            보증금 증액 시 월세 감소 효과
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="py-2 px-3 text-left">보증금</th>
                  <th className="py-2 px-3 text-right">증액분</th>
                  <th className="py-2 px-3 text-right">월세</th>
                </tr>
              </thead>
              <tbody>
                {[0, 10000000, 30000000, 50000000, 100000000].map((increase) => {
                  const newDeposit = result.wolseDeposit + increase;
                  if (newDeposit > result.jeonseDeposit) return null;
                  const calc = jeonseToWolse(
                    result.jeonseDeposit,
                    newDeposit,
                    parseFloat(conversionRate)
                  );
                  const isSelected = increase === 0;
                  return (
                    <tr
                      key={increase}
                      className={`border-b ${isSelected ? "bg-purple-50 font-bold" : ""}`}
                    >
                      <td className="py-2 px-3">{formatNumber(newDeposit)}원</td>
                      <td className="py-2 px-3 text-right">
                        {increase > 0 ? `+${formatNumber(increase)}` : "-"}
                      </td>
                      <td className="py-2 px-3 text-right">
                        {formatNumber(calc.monthlyRent)}원
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 안내 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        <p className="font-medium mb-2">💡 전월세 전환율이란?</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>보증금을 월세로 전환할 때 적용하는 연 이율입니다.</li>
          <li>법정 상한은 기준금리 + 3.5% (현재 약 10%)입니다.</li>
          <li>실제 시장에서는 지역에 따라 4~6%가 일반적입니다.</li>
          <li>임대인과 협의하여 조정 가능합니다.</li>
        </ul>
      </div>
    </div>
  );
}
