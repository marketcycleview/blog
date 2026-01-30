"use client";

import { useState, useMemo, useCallback } from "react";
import type { RentHeatmapData, DistrictSummary } from "@/lib/tools/rates/rent-types";
import { PROVINCES } from "@/lib/tools/rates/rent-regions";

// ─── 유틸 ─────────────────────────────────────────────────

function formatPrice(manwon: number): string {
  if (manwon >= 10000) {
    const uk = Math.floor(manwon / 10000);
    const rest = manwon % 10000;
    return rest > 0 ? `${uk}억 ${rest.toLocaleString("ko-KR")}` : `${uk}억`;
  }
  return `${manwon.toLocaleString("ko-KR")}만`;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

/** 가격 → HSL 색상 (파랑→빨강 그라디언트) */
function priceColor(value: number, min: number, max: number): string {
  if (max === min || value === 0) return "hsl(210,15%,95%)";
  const ratio = Math.min(Math.max((value - min) / (max - min), 0), 1);
  // hue: 200(파랑) → 40(주황) → 0(빨강)
  const hue = 200 - ratio * 200;
  const sat = 55 + ratio * 20;
  const light = 88 - ratio * 20;
  return `hsl(${hue},${sat}%,${light}%)`;
}

function getDefaultMonth(): string {
  const now = new Date();
  now.setMonth(now.getMonth() - 2);
  return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(ym: string): string {
  return `${ym.slice(0, 4)}년 ${parseInt(ym.slice(4), 10)}월`;
}

// 최근 12개월 옵션 생성
function getMonthOptions(): { value: string; label: string }[] {
  const opts: { value: string; label: string }[] = [];
  const now = new Date();
  for (let i = 2; i <= 13; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const val = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}`;
    opts.push({ value: val, label: monthLabel(val) });
  }
  return opts;
}

type ViewMode = "jeonse" | "wolse";
type SortKey = "name" | "price" | "count";

// ─── 메인 컴포넌트 ────────────────────────────────────────

export default function RentPriceHeatmap({ initialData }: { initialData: RentHeatmapData }) {
  const [data, setData] = useState<RentHeatmapData>(initialData);
  const [sido, setSido] = useState(initialData.sido);
  const [month, setMonth] = useState(initialData.month);
  const [view, setView] = useState<ViewMode>("jeonse");
  const [sort, setSort] = useState<SortKey>("price");
  const [loading, setLoading] = useState(false);

  const monthOptions = useMemo(() => getMonthOptions(), []);

  const fetchData = useCallback(async (newSido: string, newMonth: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/rent-prices?sido=${newSido}&month=${newMonth}`);
      if (res.ok) {
        const json: RentHeatmapData = await res.json();
        setData(json);
      }
    } catch {
      // keep existing data
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSidoChange = (code: string) => {
    setSido(code);
    fetchData(code, month);
  };

  const handleMonthChange = (m: string) => {
    setMonth(m);
    fetchData(sido, m);
  };

  // 정렬된 districts
  const sorted = useMemo(() => {
    const arr = [...data.districts].filter((d) => d.totalCount > 0);
    if (sort === "name") {
      arr.sort((a, b) => a.name.localeCompare(b.name, "ko"));
    } else if (sort === "price") {
      if (view === "jeonse") {
        arr.sort((a, b) => b.jeonse.avgDeposit - a.jeonse.avgDeposit);
      } else {
        arr.sort((a, b) => b.wolse.avgRent - a.wolse.avgRent);
      }
    } else {
      arr.sort((a, b) => b.totalCount - a.totalCount);
    }
    return arr;
  }, [data.districts, sort, view]);

  // 가격 범위 (색상 계산용)
  const priceRange = useMemo(() => {
    const vals =
      view === "jeonse"
        ? sorted.map((d) => d.jeonse.avgDeposit).filter((v) => v > 0)
        : sorted.map((d) => d.wolse.avgRent).filter((v) => v > 0);
    return { min: Math.min(...vals, 0), max: Math.max(...vals, 1) };
  }, [sorted, view]);

  // 통계
  const stats = useMemo(() => {
    const active = sorted.filter((d) => d.totalCount > 0);
    if (active.length === 0)
      return { totalTxn: 0, avgPrice: 0, mostExpensive: "-", cheapest: "-" };

    const totalTxn = active.reduce((s, d) => s + d.totalCount, 0);

    if (view === "jeonse") {
      const withData = active.filter((d) => d.jeonse.avgDeposit > 0);
      const avgPrice =
        withData.length > 0
          ? Math.round(withData.reduce((s, d) => s + d.jeonse.avgDeposit, 0) / withData.length)
          : 0;
      const sortedByPrice = [...withData].sort(
        (a, b) => b.jeonse.avgDeposit - a.jeonse.avgDeposit
      );
      return {
        totalTxn,
        avgPrice,
        mostExpensive: sortedByPrice[0]?.name || "-",
        cheapest: sortedByPrice[sortedByPrice.length - 1]?.name || "-",
      };
    } else {
      const withData = active.filter((d) => d.wolse.avgRent > 0);
      const avgPrice =
        withData.length > 0
          ? Math.round(withData.reduce((s, d) => s + d.wolse.avgRent, 0) / withData.length)
          : 0;
      const sortedByPrice = [...withData].sort(
        (a, b) => b.wolse.avgRent - a.wolse.avgRent
      );
      return {
        totalTxn,
        avgPrice,
        mostExpensive: sortedByPrice[0]?.name || "-",
        cheapest: sortedByPrice[sortedByPrice.length - 1]?.name || "-",
      };
    }
  }, [sorted, view]);

  const getPriceValue = (d: DistrictSummary) =>
    view === "jeonse" ? d.jeonse.avgDeposit : d.wolse.avgRent;

  const getCount = (d: DistrictSummary) =>
    view === "jeonse" ? d.jeonse.count : d.wolse.count;

  return (
    <div className="space-y-6">
      {/* 업데이트 정보 */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>기준: {monthLabel(data.month)} · 업데이트: {formatDate(data.updatedAt)}</span>
        {!data.isLive && (
          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
            샘플 데이터
          </span>
        )}
      </div>

      {/* 필터 */}
      <div className="bg-white border rounded-xl p-5 space-y-4">
        {/* 시/도 선택 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">지역 선택</label>
          <select
            value={sido}
            onChange={(e) => handleSidoChange(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {PROVINCES.map((p) => (
              <option key={p.code} value={p.code}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* 기간 + 전세/월세 토글 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">계약 시기</label>
            <select
              value={month}
              onChange={(e) => handleMonthChange(e.target.value)}
              className="px-4 py-2.5 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {monthOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">거래 유형</label>
            <div className="flex gap-1">
              {(["jeonse", "wolse"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    view === v
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {v === "jeonse" ? "전세" : "월세"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-8 text-gray-500">
          <div className="inline-block w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
          <p className="text-sm">데이터 불러오는 중...</p>
        </div>
      )}

      {!loading && sorted.length === 0 && (
        <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">
          해당 기간의 거래 데이터가 없습니다.
        </div>
      )}

      {!loading && sorted.length > 0 && (
        <>
          {/* 통계 요약 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard
              label="총 거래"
              value={`${stats.totalTxn.toLocaleString("ko-KR")}건`}
              color="blue"
            />
            <StatCard
              label={view === "jeonse" ? "평균 보증금" : "평균 월세"}
              value={formatPrice(stats.avgPrice)}
              color="green"
            />
            <StatCard label="가장 비싼 곳" value={stats.mostExpensive} color="red" />
            <StatCard label="가장 저렴한 곳" value={stats.cheapest} color="emerald" />
          </div>

          {/* 정렬 */}
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-sm text-gray-500 mr-1">정렬:</span>
            {([
              ["price", view === "jeonse" ? "보증금순" : "월세순"],
              ["count", "거래량순"],
              ["name", "이름순"],
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

          {/* 히트맵 그리드 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {sorted.map((d) => {
              const val = getPriceValue(d);
              const cnt = getCount(d);
              const bg = priceColor(val, priceRange.min, priceRange.max);
              return (
                <div
                  key={d.code}
                  className="rounded-lg p-3 border transition-shadow hover:shadow-md"
                  style={{ backgroundColor: bg }}
                >
                  <div className="font-semibold text-gray-900 text-sm mb-1">
                    {d.name}
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {val > 0 ? formatPrice(val) : "-"}
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    {cnt > 0 ? `${cnt}건` : "거래 없음"}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 상세 테이블 */}
          <div className="bg-white border rounded-xl overflow-hidden">
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">지역</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">
                      전세 평균
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">
                      전세 건수
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">
                      월세 보증금
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">
                      평균 월세
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">
                      월세 건수
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">
                      총 거래
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((d, i) => (
                    <tr
                      key={d.code}
                      className={`border-b last:border-b-0 hover:bg-blue-50/50 ${
                        i < 3 && sort === "price" ? "bg-red-50/30" : ""
                      }`}
                    >
                      <td className="py-3 px-4 font-medium text-gray-900">{d.name}</td>
                      <td className="py-3 px-4 text-right font-bold text-blue-700">
                        {d.jeonse.avgDeposit > 0 ? formatPrice(d.jeonse.avgDeposit) : "-"}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-500">{d.jeonse.count}건</td>
                      <td className="py-3 px-4 text-right text-gray-700">
                        {d.wolse.avgDeposit > 0 ? formatPrice(d.wolse.avgDeposit) : "-"}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-orange-600">
                        {d.wolse.avgRent > 0 ? `${d.wolse.avgRent}만` : "-"}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-500">{d.wolse.count}건</td>
                      <td className="py-3 px-4 text-right font-medium text-gray-900">
                        {d.totalCount}건
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* 모바일 */}
            <div className="sm:hidden divide-y">
              {sorted.map((d) => (
                <div key={d.code} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{d.name}</span>
                    <span className="text-xs text-gray-500">총 {d.totalCount}건</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-blue-50 rounded-lg p-2">
                      <div className="text-xs text-blue-600 mb-0.5">전세 평균</div>
                      <div className="font-bold text-blue-800">
                        {d.jeonse.avgDeposit > 0 ? formatPrice(d.jeonse.avgDeposit) : "-"}
                      </div>
                      <div className="text-xs text-blue-500">{d.jeonse.count}건</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-2">
                      <div className="text-xs text-orange-600 mb-0.5">월세 평균</div>
                      <div className="font-bold text-orange-800">
                        {d.wolse.avgRent > 0
                          ? `${formatPrice(d.wolse.avgDeposit)}/${d.wolse.avgRent}만`
                          : "-"}
                      </div>
                      <div className="text-xs text-orange-500">{d.wolse.count}건</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 바 차트 */}
          <div className="bg-white border rounded-xl p-5">
            <h3 className="text-sm font-bold text-gray-700 mb-4">
              {view === "jeonse" ? "전세 보증금" : "월세"} 구별 비교
            </h3>
            <div className="space-y-2">
              {sorted.slice(0, 15).map((d) => {
                const val = getPriceValue(d);
                const maxVal = sorted.length > 0 ? getPriceValue(sorted[0]) : 1;
                const width = maxVal > 0 ? Math.max((val / maxVal) * 100, 2) : 0;
                return (
                  <div key={d.code} className="flex items-center gap-3">
                    <span className="text-xs w-20 text-right font-medium text-gray-600 shrink-0">
                      {d.name}
                    </span>
                    <div className="flex-1 bg-gray-100 rounded-full h-5 relative">
                      <div
                        className="h-5 rounded-full transition-all bg-gradient-to-r from-blue-400 to-blue-600"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                    <span className="text-xs w-20 font-medium text-gray-700 shrink-0">
                      {val > 0 ? formatPrice(val) : "-"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-gray-400 text-right">
            {data.sidoName} {monthLabel(data.month)} 아파트 전월세 실거래
            {data.isLive && " · 출처: 국토교통부 실거래가 공개시스템"}
          </p>
        </>
      )}
    </div>
  );
}

// ─── 작은 컴포넌트 ────────────────────────────────────────

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-700",
    emerald: "bg-emerald-50 text-emerald-700",
  };
  return (
    <div className={`rounded-xl p-4 ${colorMap[color] || "bg-gray-50 text-gray-700"}`}>
      <div className="text-xs font-medium opacity-75 mb-1">{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
}
