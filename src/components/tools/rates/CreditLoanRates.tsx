"use client";

import { useState, useMemo } from "react";
import type { CreditLoanData } from "@/lib/tools/rates/loan-types";
import { CREDIT_GRADES } from "@/lib/tools/rates/loan-types";

const MEDAL = ["🥇", "🥈", "🥉"];

const GRADE_OPTIONS = CREDIT_GRADES.map((g) => ({
  key: g.key,
  label: g.label,
}));

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default function CreditLoanRates({ data }: { data: CreditLoanData }) {
  const [grade, setGrade] = useState("crdt_grad_1");
  const [sort, setSort] = useState<"rate" | "avg" | "bankName">("rate");

  const gradeLabel = GRADE_OPTIONS.find((g) => g.key === grade)?.label ?? "1등급";

  // 선택한 등급의 금리가 있는 상품만
  const filtered = useMemo(
    () => data.products.filter((p) => p.rates[grade] != null),
    [data.products, grade]
  );

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "rate")
      arr.sort((a, b) => (a.rates[grade] ?? 99) - (b.rates[grade] ?? 99));
    else if (sort === "avg")
      arr.sort((a, b) => (a.avgRate ?? 99) - (b.avgRate ?? 99));
    else arr.sort((a, b) => a.bankName.localeCompare(b.bankName, "ko"));
    return arr;
  }, [filtered, grade, sort]);

  const top3 = useMemo(
    () =>
      [...filtered]
        .sort((a, b) => (a.rates[grade] ?? 99) - (b.rates[grade] ?? 99))
        .slice(0, 3),
    [filtered, grade]
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

      {/* 신용등급 선택 */}
      <div className="bg-white border rounded-xl p-5">
        <h3 className="text-sm font-bold text-gray-700 mb-3">
          내 신용등급 선택
        </h3>
        <div className="flex gap-2 flex-wrap">
          {GRADE_OPTIONS.map((g) => (
            <button
              key={g.key}
              onClick={() => setGrade(g.key)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                grade === g.key
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* TOP 3 */}
      {top3.length > 0 && (
        <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl p-5">
          <h3 className="text-sm font-bold text-indigo-800 mb-3">
            🏆 {gradeLabel} 기준 최저금리 TOP 3
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {top3.map((p, i) => (
              <div key={`top-${i}`} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{MEDAL[i]}</span>
                  <span className="text-sm font-medium text-gray-800">
                    {p.bankName}
                  </span>
                </div>
                <div className="text-2xl font-bold text-indigo-700 mb-1">
                  {p.rates[grade]?.toFixed(2)}%
                </div>
                <div className="text-xs text-gray-500">
                  {p.productName} · 평균 {p.avgRate?.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 정렬 */}
      <div className="flex gap-2 flex-wrap items-center">
        <span className="text-sm text-gray-500 mr-1">정렬:</span>
        {([
          ["rate", `${gradeLabel} 금리순`],
          ["avg", "평균금리순"],
          ["bankName", "은행명순"],
        ] as const).map(([k, l]) => (
          <button
            key={k}
            onClick={() => setSort(k)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              sort === k
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {l}
          </button>
        ))}
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
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">{gradeLabel} 금리</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">평균금리</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">CB</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">가입방법</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((p, i) => (
                  <tr
                    key={`row-${i}`}
                    className={`border-b last:border-b-0 hover:bg-indigo-50/50 ${
                      i < 3 && sort === "rate" ? "bg-indigo-50/30" : ""
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {i < 3 && sort === "rate" && <span className="mr-1">{MEDAL[i]}</span>}
                      {p.bankName}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{p.productName}</td>
                    <td className="py-3 px-4 text-right font-bold text-indigo-700">
                      {p.rates[grade]?.toFixed(2) ?? "-"}%
                    </td>
                    <td className="py-3 px-4 text-right text-gray-500">
                      {p.avgRate?.toFixed(2) ?? "-"}%
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium text-gray-600">
                        {p.cbName}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-500">{p.joinWay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* 모바일 */}
          <div className="sm:hidden divide-y">
            {sorted.map((p, i) => (
              <div key={`m-${i}`} className={`p-4 ${i < 3 && sort === "rate" ? "bg-indigo-50/30" : ""}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">
                    {i < 3 && sort === "rate" && <span className="mr-1">{MEDAL[i]}</span>}
                    {p.bankName}
                  </span>
                  <span className="text-lg font-bold text-indigo-700">
                    {p.rates[grade]?.toFixed(2) ?? "-"}%
                  </span>
                </div>
                <div className="text-sm text-gray-600">{p.productName}</div>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                  <span className="px-1.5 py-0.5 bg-gray-100 rounded">{p.cbName}</span>
                  <span>평균 {p.avgRate?.toFixed(2)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">
          해당 등급 데이터가 없습니다.
        </div>
      )}

      {/* 등급별 금리 차이 시각화 */}
      {sorted.length > 0 && (
        <div className="bg-white border rounded-xl p-5">
          <h3 className="text-sm font-bold text-gray-700 mb-4">
            등급별 평균 금리 비교
          </h3>
          <div className="space-y-2">
            {GRADE_OPTIONS.map((g) => {
              const rates = filtered
                .map((p) => p.rates[g.key])
                .filter((r): r is number => r != null);
              const avg = rates.length > 0 ? rates.reduce((a, b) => a + b, 0) / rates.length : 0;
              const maxBar = 15; // max percentage for bar width
              const width = avg > 0 ? Math.min((avg / maxBar) * 100, 100) : 0;
              return (
                <div key={g.key} className="flex items-center gap-3">
                  <span className={`text-xs w-14 text-right font-medium ${
                    g.key === grade ? "text-indigo-700" : "text-gray-500"
                  }`}>
                    {g.label}
                  </span>
                  <div className="flex-1 bg-gray-100 rounded-full h-5 relative">
                    <div
                      className={`h-5 rounded-full transition-all ${
                        g.key === grade ? "bg-indigo-500" : "bg-gray-300"
                      }`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <span className={`text-xs w-14 font-medium ${
                    g.key === grade ? "text-indigo-700" : "text-gray-500"
                  }`}>
                    {avg > 0 ? avg.toFixed(2) + "%" : "-"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 text-right">
        총 {sorted.length}개 상품{data.isLive && " · 출처: 금융감독원 금융상품한눈에"}
      </p>
    </div>
  );
}
