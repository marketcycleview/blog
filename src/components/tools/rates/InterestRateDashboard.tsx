"use client";

import { useState, useMemo } from "react";
import type { RateProduct, RatesData } from "@/lib/tools/rates/types";

type Tab = "deposits" | "savings";
type SortKey = "maxRate" | "baseRate" | "bankName";

const TERMS = [6, 12, 24, 36] as const;

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "maxRate", label: "최고금리순" },
  { key: "baseRate", label: "기본금리순" },
  { key: "bankName", label: "은행명순" },
];

const MEDAL = ["🥇", "🥈", "🥉"];

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default function InterestRateDashboard({ data }: { data: RatesData }) {
  const [tab, setTab] = useState<Tab>("deposits");
  const [term, setTerm] = useState<number>(12);
  const [sort, setSort] = useState<SortKey>("maxRate");

  const products = tab === "deposits" ? data.deposits : data.savings;

  // 선택된 기간의 상품만 필터
  const filtered = useMemo(() => {
    return products.filter((p) => p.saveTerm === term);
  }, [products, term]);

  // 정렬
  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "maxRate") {
      arr.sort((a, b) => b.maxRate - a.maxRate);
    } else if (sort === "baseRate") {
      arr.sort((a, b) => b.baseRate - a.baseRate);
    } else {
      arr.sort((a, b) => a.bankName.localeCompare(b.bankName, "ko"));
    }
    return arr;
  }, [filtered, sort]);

  // TOP 3 (최고금리 기준)
  const top3 = useMemo(() => {
    return [...filtered].sort((a, b) => b.maxRate - a.maxRate).slice(0, 3);
  }, [filtered]);

  // 현재 탭에서 해당 기간 상품이 없는 경우 가용 기간 체크
  const availableTerms = useMemo(() => {
    const terms = new Set(products.map((p) => p.saveTerm));
    return TERMS.filter((t) => terms.has(t));
  }, [products]);

  return (
    <div className="space-y-6">
      {/* 업데이트 날짜 + 데이터 소스 */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>마지막 업데이트: {formatDate(data.updatedAt)}</span>
        {!data.isLive && (
          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
            샘플 데이터
          </span>
        )}
      </div>

      {/* 탭 */}
      <div className="flex gap-2">
        {(["deposits", "savings"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
              tab === t
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t === "deposits" ? "정기예금" : "적금"}
          </button>
        ))}
      </div>

      {/* TOP 3 카드 */}
      {top3.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5">
          <h3 className="text-sm font-bold text-blue-800 mb-3">
            {tab === "deposits" ? "🏆 정기예금" : "🏆 적금"} TOP 3 고금리 ({term}개월)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {top3.map((p, i) => (
              <TopCard key={`${p.bankName}-${p.productName}-${i}`} product={p} rank={i} />
            ))}
          </div>
        </div>
      )}

      {/* 필터 바: 기간 + 정렬 */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        {/* 기간 */}
        <div className="flex gap-2 flex-wrap">
          <span className="text-sm text-gray-500 self-center mr-1">기간:</span>
          {TERMS.map((t) => {
            const available = availableTerms.includes(t);
            return (
              <button
                key={t}
                onClick={() => available && setTerm(t)}
                disabled={!available}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  term === t
                    ? "bg-blue-600 text-white"
                    : available
                      ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      : "bg-gray-50 text-gray-300 cursor-not-allowed"
                }`}
              >
                {t}개월
              </button>
            );
          })}
        </div>

        {/* 정렬 */}
        <div className="flex gap-2 flex-wrap">
          <span className="text-sm text-gray-500 self-center mr-1">정렬:</span>
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSort(opt.key)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                sort === opt.key
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 테이블 */}
      {sorted.length > 0 ? (
        <div className="bg-white border rounded-xl overflow-hidden">
          {/* 데스크톱 테이블 */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">은행</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">상품명</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">기본금리</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">최고금리</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">가입방법</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((p, i) => (
                  <tr
                    key={`${p.bankName}-${p.productName}-${p.saveTerm}-${i}`}
                    className={`border-b last:border-b-0 hover:bg-blue-50/50 transition-colors ${
                      i < 3 ? "bg-yellow-50/30" : ""
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {i < 3 && sort === "maxRate" && (
                        <span className="mr-1">{MEDAL[i]}</span>
                      )}
                      {p.bankName}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      <div>{p.productName}</div>
                      {p.specialCondition && (
                        <div className="text-xs text-gray-400 mt-0.5">
                          {p.specialCondition}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-700">
                      {p.baseRate.toFixed(2)}%
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-blue-700">
                      {p.maxRate.toFixed(2)}%
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs">{p.joinWay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 모바일 카드 */}
          <div className="sm:hidden divide-y">
            {sorted.map((p, i) => (
              <MobileCard
                key={`m-${p.bankName}-${p.productName}-${p.saveTerm}-${i}`}
                product={p}
                rank={i}
                showMedal={sort === "maxRate"}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">
          해당 기간의 상품 데이터가 없습니다.
        </div>
      )}

      {/* 상품 수 */}
      <p className="text-xs text-gray-400 text-right">
        총 {sorted.length}개 상품
        {data.isLive && " · 출처: 금융감독원 금융상품한눈에"}
      </p>
    </div>
  );
}

function TopCard({ product, rank }: { product: RateProduct; rank: number }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{MEDAL[rank]}</span>
        <span className="text-sm font-medium text-gray-800">{product.bankName}</span>
      </div>
      <div className="text-2xl font-bold text-blue-700 mb-1">
        {product.maxRate.toFixed(2)}%
      </div>
      <div className="text-xs text-gray-500">{product.productName}</div>
      {product.baseRate !== product.maxRate && (
        <div className="text-xs text-gray-400 mt-0.5">
          기본 {product.baseRate.toFixed(2)}%
        </div>
      )}
    </div>
  );
}

function MobileCard({
  product,
  rank,
  showMedal,
}: {
  product: RateProduct;
  rank: number;
  showMedal: boolean;
}) {
  return (
    <div className={`p-4 ${rank < 3 ? "bg-yellow-50/30" : ""}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium text-gray-900">
          {showMedal && rank < 3 && <span className="mr-1">{MEDAL[rank]}</span>}
          {product.bankName}
        </span>
        <span className="text-lg font-bold text-blue-700">
          {product.maxRate.toFixed(2)}%
        </span>
      </div>
      <div className="text-sm text-gray-600">{product.productName}</div>
      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
        <span>기본 {product.baseRate.toFixed(2)}%</span>
        <span>{product.joinWay}</span>
      </div>
      {product.specialCondition && (
        <div className="text-xs text-gray-400 mt-0.5">
          {product.specialCondition}
        </div>
      )}
    </div>
  );
}
