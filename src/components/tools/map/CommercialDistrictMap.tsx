"use client";

import { useState, useMemo, useCallback } from "react";
import KakaoMap, { type MapMarker } from "./KakaoMap";
import type { CommercialData } from "@/lib/tools/commercial/types";
import {
  BUSINESS_CATEGORIES,
  COMMERCIAL_REGIONS,
  COMMERCIAL_SIDOS,
} from "@/lib/tools/commercial/types";

interface Props {
  initialData: CommercialData;
}

// 카테고리별 마커 색상
const CATEGORY_COLORS: Record<string, string> = {
  음식점: "#ef4444",
  소매업: "#3b82f6",
  생활서비스: "#10b981",
  교육: "#f59e0b",
  부동산: "#8b5cf6",
  의료: "#ec4899",
  숙박: "#14b8a6",
  "스포츠·여가": "#f97316",
};

export default function CommercialDistrictMap({ initialData }: Props) {
  const [data, setData] = useState<CommercialData>(initialData);
  const [sido, setSido] = useState("11");
  const [dongCode, setDongCode] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(false);

  // 현재 시도에 해당하는 구/군 목록
  const regions = useMemo(
    () => COMMERCIAL_REGIONS.filter((r) => r.sidoCode === sido),
    [sido]
  );

  // 선택된 지역 좌표 (기본: 서울 강남)
  const mapCenter = useMemo(() => {
    if (data.stores.length > 0) {
      const avgLat =
        data.stores.reduce((s, st) => s + st.lat, 0) / data.stores.length;
      const avgLng =
        data.stores.reduce((s, st) => s + st.lng, 0) / data.stores.length;
      return { lat: avgLat, lng: avgLng };
    }
    return { lat: 37.497, lng: 127.027 };
  }, [data.stores]);

  // 마커
  const markers: MapMarker[] = useMemo(
    () =>
      data.stores
        .filter((s) => s.lat > 0 && s.lng > 0)
        .slice(0, 200) // 성능 위해 200개 제한
        .map((s) => ({
          lat: s.lat,
          lng: s.lng,
          title: s.name,
          content: `<b>${s.name}</b><br/><span style="color:#666;font-size:11px;">${s.category} · ${s.subCategory}</span><br/><span style="font-size:11px;">${s.address}</span>`,
        })),
    [data.stores]
  );

  // 카테고리별 업소 수
  const categoryStats = useMemo(() => {
    const map: Record<string, number> = {};
    data.stores.forEach((s) => {
      map[s.category] = (map[s.category] || 0) + 1;
    });
    return map;
  }, [data.stores]);

  // 데이터 가져오기
  const fetchData = useCallback(
    async (dong: string, cat: string) => {
      if (!dong) return;
      setLoading(true);
      try {
        const params = new URLSearchParams({ dong });
        if (cat) params.set("category", cat);
        const res = await fetch(`/api/commercial-district?${params}`);
        if (res.ok) {
          const json: CommercialData = await res.json();
          setData(json);
        }
      } catch {
        // keep existing
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleSidoChange = (code: string) => {
    setSido(code);
    setDongCode("");
  };

  const handleDongChange = (code: string) => {
    setDongCode(code);
    if (code) fetchData(code, categoryFilter);
  };

  const handleCategoryChange = (code: string) => {
    const next = categoryFilter === code ? "" : code;
    setCategoryFilter(next);
    if (dongCode) fetchData(dongCode, next);
  };

  // 필터링된 목록 (클라이언트 카테고리 필터)
  const filteredStores = useMemo(() => {
    if (!categoryFilter) return data.stores;
    const label = BUSINESS_CATEGORIES.find(
      (c) => c.code === categoryFilter
    )?.label;
    return label ? data.stores.filter((s) => s.category === label) : data.stores;
  }, [data.stores, categoryFilter]);

  return (
    <div className="space-y-6">
      {/* 데이터 상태 */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          {data.regionName || "지역을 선택하세요"} · {data.totalCount}개 업소
        </span>
        {!data.isLive && (
          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
            샘플 데이터
          </span>
        )}
      </div>

      {/* 지역 선택 */}
      <div className="bg-white border rounded-xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              시/도
            </label>
            <select
              value={sido}
              onChange={(e) => handleSidoChange(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500"
            >
              {COMMERCIAL_SIDOS.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              구/군
            </label>
            <select
              value={dongCode}
              onChange={(e) => handleDongChange(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">구/군을 선택하세요</option>
              {regions.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 지도 */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <KakaoMap
          center={mapCenter}
          level={dongCode ? 5 : 9}
          height="450px"
          markers={markers}
        />
      </div>

      {loading && (
        <div className="text-center py-8 text-gray-500">
          <div className="inline-block w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
          <p className="text-sm">상권 데이터 불러오는 중...</p>
        </div>
      )}

      {!loading && data.stores.length > 0 && (
        <>
          {/* 업종 카테고리 필터 */}
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm text-gray-500 py-2 mr-1">업종:</span>
            {BUSINESS_CATEGORIES.map((cat) => {
              const count = categoryStats[cat.label] || 0;
              return (
                <button
                  key={cat.code}
                  onClick={() => handleCategoryChange(cat.code)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    categoryFilter === cat.code
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                  {count > 0 && (
                    <span
                      className={`ml-1 ${
                        categoryFilter === cat.code
                          ? "text-blue-200"
                          : "text-gray-400"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* 업종 분포 요약 */}
          <div className="bg-white border rounded-xl p-5">
            <h3 className="text-sm font-bold text-gray-700 mb-3">
              업종 분포
            </h3>
            <div className="space-y-2">
              {Object.entries(categoryStats)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 8)
                .map(([cat, count]) => {
                  const max = Math.max(
                    ...Object.values(categoryStats)
                  );
                  const width = max > 0 ? Math.max((count / max) * 100, 4) : 0;
                  const color = CATEGORY_COLORS[cat] || "#6b7280";
                  return (
                    <div key={cat} className="flex items-center gap-3">
                      <span className="text-xs w-20 text-right font-medium text-gray-600 shrink-0">
                        {cat}
                      </span>
                      <div className="flex-1 bg-gray-100 rounded-full h-5 relative">
                        <div
                          className="h-5 rounded-full transition-all"
                          style={{
                            width: `${width}%`,
                            backgroundColor: color,
                          }}
                        />
                      </div>
                      <span className="text-xs w-10 font-medium text-gray-700 shrink-0">
                        {count}개
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* 업소 목록 */}
          <div className="bg-white border rounded-xl overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-bold text-gray-900">
                업소 목록{" "}
                <span className="text-sm font-normal text-gray-500">
                  ({filteredStores.length}개)
                </span>
              </h3>
            </div>
            {/* 데스크톱 테이블 */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      상호명
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      업종
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      주소
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStores.slice(0, 50).map((s, i) => (
                    <tr
                      key={s.id || i}
                      className="border-b last:border-b-0 hover:bg-blue-50/50"
                    >
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {s.name}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className="inline-block px-2 py-0.5 rounded text-xs font-medium text-white"
                          style={{
                            backgroundColor:
                              CATEGORY_COLORS[s.category] || "#6b7280",
                          }}
                        >
                          {s.subCategory || s.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-xs">
                        {s.address}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* 모바일 카드 */}
            <div className="sm:hidden divide-y">
              {filteredStores.slice(0, 30).map((s, i) => (
                <div key={s.id || i} className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-900 text-sm">
                      {s.name}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded text-xs font-medium text-white"
                      style={{
                        backgroundColor:
                          CATEGORY_COLORS[s.category] || "#6b7280",
                      }}
                    >
                      {s.subCategory || s.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{s.address}</p>
                </div>
              ))}
            </div>
            {filteredStores.length > 50 && (
              <div className="p-4 text-center text-sm text-gray-500 border-t">
                상위 50개만 표시됩니다
              </div>
            )}
          </div>
        </>
      )}

      {!loading && !dongCode && (
        <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">
          시/도와 구/군을 선택하면 해당 지역의 상권 현황을 확인할 수 있습니다.
        </div>
      )}
    </div>
  );
}
