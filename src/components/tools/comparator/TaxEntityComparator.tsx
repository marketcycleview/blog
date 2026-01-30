"use client";

import { useState, useMemo } from "react";
import { calculateTaxEntityComparison, type TaxEntityInput, type TaxEntityResult, type EntityResult } from "@/lib/tools/comparator/tax-entity-compare";

function formatNumber(n: number): string { return n.toLocaleString("ko-KR"); }
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

function parseNum(v: string): number { return parseInt(v.replace(/[^0-9]/g, ""), 10) || 0; }

function TaxBreakdown({ data, color }: { data: EntityResult; color: string }) {
  return (
    <div className="bg-white border rounded-xl p-4 space-y-2">
      <h4 className={`font-bold text-${color}-700`}>{data.label}</h4>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between py-1 border-b"><span className="text-gray-600">매출</span><span>{formatManWon(data.revenue)}</span></div>
        <div className="flex justify-between py-1 border-b"><span className="text-gray-600">경비</span><span className="text-red-500">-{formatManWon(data.expenses)}</span></div>
        <div className="flex justify-between py-1 border-b"><span className="text-gray-600">과세표준</span><span className="font-medium">{formatManWon(data.taxableIncome)}</span></div>
        <div className="flex justify-between py-1 border-b"><span className="text-gray-600">{data.mainTaxLabel}</span><span>{formatManWon(data.mainTax)}</span></div>
        <div className="flex justify-between py-1 border-b"><span className="text-gray-600">지방소득세</span><span>{formatManWon(data.localTax)}</span></div>
        <div className="flex justify-between py-1 border-b"><span className="text-gray-600">4대보험</span><span>{formatManWon(data.insuranceCost)}</span></div>
        {data.dividendTax > 0 && <div className="flex justify-between py-1 border-b"><span className="text-gray-600">배당세/급여소득세</span><span>{formatManWon(data.dividendTax)}</span></div>}
        <div className="flex justify-between py-2 font-bold text-red-600 border-t"><span>총 세금 부담</span><span>{formatManWon(data.totalTax)}</span></div>
        <div className="flex justify-between py-2 font-bold text-blue-600"><span>실수령 (순이익)</span><span>{formatManWon(data.netIncome)}</span></div>
        <div className="text-xs text-gray-400 text-right">실효세율: {data.effectiveRate}%</div>
      </div>
    </div>
  );
}

export default function TaxEntityComparator() {
  const [revenue, setRevenue] = useState("100,000,000");
  const [expenseRatio, setExpenseRatio] = useState(40);
  const [ceoSalary, setCeoSalary] = useState("36,000,000");

  const result = useMemo<TaxEntityResult | null>(() => {
    const input: TaxEntityInput = { annualRevenue: parseNum(revenue), expenseRatio, ceoSalary: parseNum(ceoSalary) };
    if (input.annualRevenue <= 0) return null;
    return calculateTaxEntityComparison(input);
  }, [revenue, expenseRatio, ceoSalary]);

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">사업 정보 입력</h2>
        <MoneyInput label="연 매출" value={revenue} onChange={setRevenue} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">경비율</label>
          <div className="flex items-center gap-2">
            <input type="range" min={10} max={80} step={5} value={expenseRatio} onChange={(e) => setExpenseRatio(parseInt(e.target.value))} className="flex-1" />
            <span className="text-sm font-bold w-12 text-right">{expenseRatio}%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">매출 대비 비용 비율 (임대료, 재료비, 인건비 등)</p>
        </div>
        <MoneyInput label="법인 대표자 급여 (연봉)" value={ceoSalary} onChange={setCeoSalary} hint="법인 설립 시 대표에게 지급할 급여. 법인 경비로 처리됩니다." />
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-gray-400">빠른 매출 선택:</span>
          {[5000, 8000, 10000, 15000, 20000, 30000, 50000].map((v) => (
            <button key={v} onClick={() => setRevenue((v * 10000).toLocaleString("ko-KR"))} className="px-2 py-1 text-xs bg-gray-100 hover:bg-blue-100 rounded transition-colors">
              {v >= 10000 ? `${v / 10000}억` : `${v}만`}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <>
          <div className={`rounded-xl p-6 text-white text-center ${result.winner === "개인사업자" ? "bg-gradient-to-r from-blue-600 to-blue-700" : "bg-gradient-to-r from-purple-600 to-purple-700"}`}>
            <p className="text-white/80 text-sm mb-1">현재 조건에서 유리한 선택</p>
            <p className="text-4xl font-bold">{result.winner}</p>
            <p className="text-white/70 text-sm mt-2">{result.breakeven}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <TaxBreakdown data={result.individual} color="blue" />
            <TaxBreakdown data={result.corporation} color="purple" />
          </div>

          <div className="bg-white border rounded-xl p-4 sm:p-6 overflow-x-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">핵심 비교</h3>
            <table className="w-full text-sm">
              <thead><tr className="border-b"><th className="py-2 text-left">항목</th><th className="py-2 text-right text-blue-700">개인사업자</th><th className="py-2 text-right text-purple-700">법인사업자</th></tr></thead>
              <tbody>
                <tr className="border-b"><td className="py-2 text-gray-600">주요 세금</td><td className="py-2 text-right">종합소득세 (6~42%)</td><td className="py-2 text-right">법인세 (9~24%)</td></tr>
                <tr className="border-b"><td className="py-2 text-gray-600">총 세금</td><td className="py-2 text-right font-bold">{formatManWon(result.individual.totalTax)}</td><td className="py-2 text-right font-bold">{formatManWon(result.corporation.totalTax)}</td></tr>
                <tr className="border-b"><td className="py-2 text-gray-600">실수령</td><td className="py-2 text-right font-bold">{formatManWon(result.individual.netIncome)}</td><td className="py-2 text-right font-bold">{formatManWon(result.corporation.netIncome)}</td></tr>
                <tr className="bg-blue-50"><td className="py-2 font-bold">실효세율</td><td className="py-2 text-right font-bold">{result.individual.effectiveRate}%</td><td className="py-2 text-right font-bold">{result.corporation.effectiveRate}%</td></tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        <p className="font-medium mb-2">참고사항</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>법인은 배당 시 배당소득세(15.4%)가 추가로 발생합니다.</li>
          <li>법인 설립/유지 비용(등기, 세무사, 4대보험 등)은 미포함입니다.</li>
          <li>2026년 세율 기준이며, 정확한 세금은 세무사 상담을 권합니다.</li>
        </ul>
      </div>
    </div>
  );
}
