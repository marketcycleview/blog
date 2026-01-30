"use client";

import { useState, useMemo } from "react";
import { calculateHousingComparison, type HousingInput, type HousingComparisonResult } from "@/lib/tools/comparator/housing-compare";

function formatNumber(n: number): string {
  return n.toLocaleString("ko-KR");
}

function formatManWon(n: number): string {
  if (Math.abs(n) >= 100_000_000) return `${(n / 100_000_000).toFixed(1)}억원`;
  return `${Math.round(n / 10_000).toLocaleString()}만원`;
}

function MoneyInput({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    onChange(raw ? parseInt(raw, 10).toLocaleString("ko-KR") : "");
  };
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input type="text" value={value} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" placeholder="0" />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">원</span>
      </div>
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

function PercentInput({ label, value, onChange, hint }: { label: string; value: number; onChange: (v: number) => void; hint?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <input type="range" min={0} max={15} step={0.5} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} className="flex-1" />
        <span className="text-sm font-bold w-12 text-right">{value}%</span>
      </div>
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

function parseNum(v: string): number {
  return parseInt(v.replace(/[^0-9]/g, ""), 10) || 0;
}

export default function HousingCostSimulator() {
  const [years, setYears] = useState(5);
  // 전세
  const [jeonseDeposit, setJeonseDeposit] = useState("300,000,000");
  const [jeonseLoanRate, setJeonseLoanRate] = useState(3.5);
  const [jeonseLoanRatio, setJeonseLoanRatio] = useState(60);
  // 월세
  const [monthlyDeposit, setMonthlyDeposit] = useState("10,000,000");
  const [monthlyRent, setMonthlyRent] = useState("800,000");
  const [rentIncreaseRate, setRentIncreaseRate] = useState(3);
  // 매매
  const [purchasePrice, setPurchasePrice] = useState("400,000,000");
  const [purchaseLoanRatio, setPurchaseLoanRatio] = useState(60);
  const [purchaseLoanRate, setPurchaseLoanRate] = useState(4.0);
  const [priceGrowthRate, setPriceGrowthRate] = useState(3);

  const result = useMemo<HousingComparisonResult | null>(() => {
    const input: HousingInput = {
      years,
      jeonseDeposit: parseNum(jeonseDeposit),
      jeonseLoanRate,
      jeonseLoanRatio,
      monthlyDeposit: parseNum(monthlyDeposit),
      monthlyRent: parseNum(monthlyRent),
      rentIncreaseRate,
      purchasePrice: parseNum(purchasePrice),
      purchaseLoanRatio,
      purchaseLoanRate,
      priceGrowthRate,
    };
    if (input.jeonseDeposit <= 0 && input.monthlyRent <= 0 && input.purchasePrice <= 0) return null;
    return calculateHousingComparison(input);
  }, [years, jeonseDeposit, jeonseLoanRate, jeonseLoanRatio, monthlyDeposit, monthlyRent, rentIncreaseRate, purchasePrice, purchaseLoanRatio, purchaseLoanRate, priceGrowthRate]);

  return (
    <div className="space-y-6">
      {/* 입력 */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-5">
        <h2 className="text-lg font-bold text-gray-900">조건 입력</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">거주 기간</label>
          <div className="flex gap-2">
            {[2, 3, 5, 7, 10].map((y) => (
              <button key={y} onClick={() => setYears(y)} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${years === y ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}>
                {y}년
              </button>
            ))}
          </div>
        </div>

        {/* 전세 */}
        <div className="border-t pt-4">
          <h3 className="text-sm font-bold text-blue-700 mb-3">전세 조건</h3>
          <div className="space-y-3">
            <MoneyInput label="전세보증금" value={jeonseDeposit} onChange={setJeonseDeposit} />
            <PercentInput label="전세대출 비율" value={jeonseLoanRatio} onChange={setJeonseLoanRatio} hint="보증금 대비 대출 비율" />
            <PercentInput label="전세대출 금리" value={jeonseLoanRate} onChange={setJeonseLoanRate} />
          </div>
        </div>

        {/* 월세 */}
        <div className="border-t pt-4">
          <h3 className="text-sm font-bold text-green-700 mb-3">월세 조건</h3>
          <div className="space-y-3">
            <MoneyInput label="월세 보증금" value={monthlyDeposit} onChange={setMonthlyDeposit} />
            <MoneyInput label="월 임대료" value={monthlyRent} onChange={setMonthlyRent} />
            <PercentInput label="연 인상률" value={rentIncreaseRate} onChange={setRentIncreaseRate} />
          </div>
        </div>

        {/* 매매 */}
        <div className="border-t pt-4">
          <h3 className="text-sm font-bold text-orange-700 mb-3">매매 조건</h3>
          <div className="space-y-3">
            <MoneyInput label="매매가" value={purchasePrice} onChange={setPurchasePrice} />
            <PercentInput label="대출 비율 (LTV)" value={purchaseLoanRatio} onChange={setPurchaseLoanRatio} />
            <PercentInput label="대출 금리" value={purchaseLoanRate} onChange={setPurchaseLoanRate} />
            <PercentInput label="연 시세 상승률 예상" value={priceGrowthRate} onChange={setPriceGrowthRate} hint="부동산 가격 상승률" />
          </div>
        </div>
      </div>

      {/* 결과 */}
      {result && (
        <>
          {/* 승자 */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white text-center">
            <p className="text-blue-100 text-sm mb-1">{years}년 거주 기준 가장 경제적인 선택</p>
            <p className="text-4xl font-bold">{result.winner}</p>
            <p className="text-blue-200 text-sm mt-2">{result.winnerReason}</p>
            {result.breakeven && <p className="text-blue-300 text-xs mt-2">{result.breakeven}</p>}
          </div>

          {/* 비교표 */}
          <div className="bg-white border rounded-xl p-4 sm:p-6 overflow-x-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{years}년 비교 분석</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">항목</th>
                  <th className="py-2 text-right text-blue-700">전세</th>
                  <th className="py-2 text-right text-green-700">월세</th>
                  <th className="py-2 text-right text-orange-700">매매</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">초기 비용</td>
                  <td className="py-2 text-right font-medium">{formatManWon(result.jeonse.initialCost)}</td>
                  <td className="py-2 text-right font-medium">{formatManWon(result.monthly.initialCost)}</td>
                  <td className="py-2 text-right font-medium">{formatManWon(result.purchase.initialCost)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">월 평균 비용</td>
                  <td className="py-2 text-right font-medium">{formatNumber(result.jeonse.monthlyCost)}원</td>
                  <td className="py-2 text-right font-medium">{formatNumber(result.monthly.monthlyCost)}원</td>
                  <td className="py-2 text-right font-medium">{formatNumber(result.purchase.monthlyCost)}원</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">{years}년 총비용</td>
                  <td className="py-2 text-right font-medium">{formatManWon(result.jeonse.totalCost)}</td>
                  <td className="py-2 text-right font-medium">{formatManWon(result.monthly.totalCost)}</td>
                  <td className="py-2 text-right font-medium">{formatManWon(result.purchase.totalCost)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">자산 형성</td>
                  <td className="py-2 text-right font-medium text-gray-400">-</td>
                  <td className="py-2 text-right font-medium text-gray-400">-</td>
                  <td className="py-2 text-right font-medium text-green-600">+{formatManWon(result.purchase.assetValue)}</td>
                </tr>
                <tr className="bg-blue-50 font-bold">
                  <td className="py-3">순비용 (핵심)</td>
                  <td className={`py-3 text-right ${result.winner === "전세" ? "text-blue-600" : ""}`}>{formatManWon(result.jeonse.netCost)}</td>
                  <td className={`py-3 text-right ${result.winner === "월세" ? "text-green-600" : ""}`}>{formatManWon(result.monthly.netCost)}</td>
                  <td className={`py-3 text-right ${result.winner === "매매" ? "text-orange-600" : ""}`}>{formatManWon(result.purchase.netCost)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 각 방식 장단점 */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "전세", color: "blue", pros: ["보증금 돌려받음", "초기 비용 중간", "월 부담 낮음"], cons: ["전세사기 위험", "2년마다 이사 가능성", "자산 형성 없음"] },
              { label: "월세", color: "green", pros: ["초기 비용 최소", "유동성 높음", "이사 부담 적음"], cons: ["매달 지출 발생", "자산 형성 없음", "임대료 인상"] },
              { label: "매매", color: "orange", pros: ["자산 형성", "안정적 거주", "인테리어 자유"], cons: ["초기 비용 최대", "유동성 낮음", "시세 하락 위험"] },
            ].map((item) => (
              <div key={item.label} className="bg-white border rounded-xl p-4">
                <h4 className={`font-bold text-${item.color}-700 mb-2`}>{item.label}</h4>
                <div className="space-y-1 text-xs">
                  {item.pros.map((p) => <p key={p} className="text-green-600">+ {p}</p>)}
                  {item.cons.map((c) => <p key={c} className="text-red-500">- {c}</p>)}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        <p className="font-medium mb-2">참고사항</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>기회비용은 연 3%로 가정합니다 (다른 곳에 투자했을 경우).</li>
          <li>매매 취득세는 1%, 보유세는 연 0.2%로 가정합니다.</li>
          <li>매매 대출은 원리금균등상환으로 계산됩니다.</li>
          <li>실제 비용은 지역, 물건, 개인 상황에 따라 크게 다릅니다.</li>
        </ul>
      </div>
    </div>
  );
}
