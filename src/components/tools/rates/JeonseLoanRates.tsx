"use client";

import { useState, useMemo } from "react";
import type { JeonseLoanData } from "@/lib/tools/rates/loan-types";

type SortKey = "minRate" | "maxRate" | "bankName";
const MEDAL = ["🥇", "🥈", "🥉"];

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default function JeonseLoanRates({ data }: { data: JeonseLoanData }) {
  const [rateType, setRateType] = useState("전체");
  const [sort, setSort] = useState<SortKey>("minRate");

  const rateTypes = useMemo(
    () => ["전체", ...new Set(data.products.map((p) => p.rateType))],
    [data.products]
  );

  const filtered = useMemo(
    () => data.products.filter((p) => rateType === "전체" || p.rateType === rateType),
    [data.products, rateType]
  );

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "minRate") arr.sort((a, b) => a.minRate - b.minRate);
    else if (sort === "maxRate") arr.sort((a, b) => a.maxRate - b.maxRate);
    else arr.sort((a, b) => a.bankName.localeCompare(b.bankName, "ko"));
    return arr;
  }, [filtered, sort]);

  const top3 = useMemo(
    () => [...filtered].sort((a, b) => a.minRate - b.minRate).slice(0, 3),
    [filtered]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>마지막 업데이트: {formatDate(data.updatedAt)}</span>
        {!data.isLive && (
          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
            샘플 데이터
          </span>
        )}
      </div>

      {/* TOP 3 */}
      {top3.length > 0 && (
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-5">
          <h3 className="text-sm font-bold text-teal-800 mb-3">
            🏆 최저금리 TOP 3 전세대출
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {top3.map((p, i) => (
              <div key={`top-${i}`} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{MEDAL[i]}</span>
                  <span className="text-sm font-medium text-gray-800">{p.bankName}</span>
                </div>
                <div className="text-2xl font-bold text-teal-700 mb-1">{p.minRate.toFixed(2)}%~</div>
                <div className="text-xs text-gray-500">{p.productName} · {p.rateType}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 필터 */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-sm text-gray-500 mr-1">금리유형:</span>
          {rateTypes.map((rt) => (
            <button
              key={rt}
              onClick={() => setRateType(rt)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                rateType === rt ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {rt}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-sm text-gray-500 mr-1">정렬:</span>
          {([["minRate", "최저금리순"], ["maxRate", "최고금리순"], ["bankName", "은행명순"]] as const).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setSort(k)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                sort === k ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* 테이블 */}
      {sorted.length > 0 ? (
        <div className="bg-white border rounded-xl overflow-hidden">
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">은행</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">상품명</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">금리유형</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">최저금리</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">최고금리</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">평균금리</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">한도</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((p, i) => (
                  <tr
                    key={`row-${i}`}
                    className={`border-b last:border-b-0 hover:bg-teal-50/50 ${i < 3 && sort === "minRate" ? "bg-teal-50/30" : ""}`}
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {i < 3 && sort === "minRate" && <span className="mr-1">{MEDAL[i]}</span>}
                      {p.bankName}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{p.productName}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        p.rateType === "고정금리" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                      }`}>{p.rateType}</span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-teal-700">{p.minRate.toFixed(2)}%</td>
                    <td className="py-3 px-4 text-right text-gray-700">{p.maxRate.toFixed(2)}%</td>
                    <td className="py-3 px-4 text-right text-gray-500">{p.avgRate?.toFixed(2) ?? "-"}%</td>
                    <td className="py-3 px-4 text-xs text-gray-500">{p.loanLimit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="sm:hidden divide-y">
            {sorted.map((p, i) => (
              <div key={`m-${i}`} className={`p-4 ${i < 3 && sort === "minRate" ? "bg-teal-50/30" : ""}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">
                    {i < 3 && sort === "minRate" && <span className="mr-1">{MEDAL[i]}</span>}
                    {p.bankName}
                  </span>
                  <span className="text-lg font-bold text-teal-700">{p.minRate.toFixed(2)}%~</span>
                </div>
                <div className="text-sm text-gray-600">{p.productName}</div>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                  <span className={`px-1.5 py-0.5 rounded ${
                    p.rateType === "고정금리" ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"
                  }`}>{p.rateType}</span>
                  <span>최고 {p.maxRate.toFixed(2)}%</span>
                  <span>{p.loanLimit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">해당 조건의 상품이 없습니다.</div>
      )}

      <p className="text-xs text-gray-400 text-right">
        총 {sorted.length}개 상품{data.isLive && " · 출처: 금융감독원 금융상품한눈에"}
      </p>
    </div>
  );
}
