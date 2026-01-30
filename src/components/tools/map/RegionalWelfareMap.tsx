"use client";

import { useState, useMemo } from "react";
import KakaoMap, { type MapMarker } from "./KakaoMap";
import type { WelfareData, WelfareCategory } from "@/lib/tools/welfare/types";
import { WELFARE_CATEGORIES, TARGET_GROUPS } from "@/lib/tools/welfare/types";
import { WELFARE_REGIONS, WELFARE_CENTERS } from "@/lib/tools/welfare/regions";

interface Props {
  initialData: WelfareData;
}

export default function RegionalWelfareMap({ initialData }: Props) {
  const [region, setRegion] = useState("all");
  const [category, setCategory] = useState<WelfareCategory | "all">("all");
  const [target, setTarget] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // 지역 정보
  const regionInfo = useMemo(
    () => WELFARE_REGIONS.find((r) => r.code === region) || WELFARE_REGIONS[0],
    [region]
  );

  // 지도 마커: 선택 지역의 복지센터
  const markers: MapMarker[] = useMemo(() => {
    if (region === "all") {
      return WELFARE_CENTERS.map((c) => ({
        lat: c.lat,
        lng: c.lng,
        title: c.name,
        content: `<b>${c.name}</b><br/>복지 상담 가능`,
      }));
    }
    return WELFARE_CENTERS.filter((c) => c.region === region).map((c) => ({
      lat: c.lat,
      lng: c.lng,
      title: c.name,
      content: `<b>${c.name}</b><br/>복지 상담 가능`,
    }));
  }, [region]);

  // 필터링된 서비스 목록
  const filtered = useMemo(() => {
    return initialData.services.filter((s) => {
      if (category !== "all" && s.category !== category) return false;
      if (target !== "all" && s.targetGroup !== target && s.targetGroup !== "전체") return false;
      return true;
    });
  }, [initialData.services, category, target]);

  // 카테고리별 통계
  const categoryStats = useMemo(() => {
    const map: Record<string, number> = {};
    initialData.services.forEach((s) => {
      map[s.category] = (map[s.category] || 0) + 1;
    });
    return map;
  }, [initialData.services]);

  return (
    <div className="space-y-6">
      {/* 데이터 상태 */}
      <div className="text-sm text-gray-500">
        <span>총 {initialData.totalCount}개 복지서비스</span>
      </div>

      {/* 지역 선택 + 지도 */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="p-4 border-b">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            지역 선택
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {WELFARE_REGIONS.map((r) => (
              <option key={r.code} value={r.code}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <KakaoMap
          center={{ lat: regionInfo.lat, lng: regionInfo.lng }}
          level={regionInfo.level}
          height="350px"
          markers={markers}
        />
      </div>

      {/* 카테고리별 요약 */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {WELFARE_CATEGORIES.map((cat) => (
          <button
            key={cat.code}
            onClick={() =>
              setCategory(category === cat.code ? "all" : cat.code)
            }
            className={`rounded-xl p-3 text-center transition-all ${
              category === cat.code
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white border text-gray-700 hover:border-blue-300 hover:bg-blue-50"
            }`}
          >
            <div className="text-xl mb-1">{cat.icon}</div>
            <div className="text-xs font-medium">{cat.label}</div>
            <div
              className={`text-xs mt-0.5 ${
                category === cat.code ? "text-blue-200" : "text-gray-400"
              }`}
            >
              {categoryStats[cat.code] || 0}건
            </div>
          </button>
        ))}
      </div>

      {/* 대상 필터 */}
      <div className="flex gap-2 flex-wrap">
        <span className="text-sm text-gray-500 py-1.5 mr-1">대상:</span>
        {TARGET_GROUPS.map((g) => (
          <button
            key={g.code}
            onClick={() => setTarget(target === g.code ? "all" : g.code)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              target === g.code
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* 결과 카운트 */}
      <div className="text-sm text-gray-600 font-medium">
        {category !== "all" && (
          <span className="text-blue-600">
            {WELFARE_CATEGORIES.find((c) => c.code === category)?.label}
          </span>
        )}
        {category !== "all" && target !== "all" && " · "}
        {target !== "all" && (
          <span className="text-blue-600">
            {TARGET_GROUPS.find((g) => g.code === target)?.label}
          </span>
        )}
        {(category !== "all" || target !== "all") && " — "}
        검색 결과 <strong>{filtered.length}</strong>건
      </div>

      {/* 서비스 목록 */}
      {filtered.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">
          조건에 맞는 복지서비스가 없습니다.
          <br />
          <button
            onClick={() => {
              setCategory("all");
              setTarget("all");
            }}
            className="mt-2 text-blue-600 underline text-sm"
          >
            필터 초기화
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((svc) => {
            const isExpanded = expandedId === svc.id;
            return (
              <div
                key={svc.id}
                className="bg-white border rounded-xl overflow-hidden transition-shadow hover:shadow-md"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : svc.id)}
                  className="w-full text-left p-4 sm:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
                          {svc.category}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                          {svc.targetGroup === "전체"
                            ? "전국민"
                            : svc.targetGroup}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900">{svc.name}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {svc.summary}
                      </p>
                    </div>
                    <span
                      className={`text-gray-400 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t bg-gray-50">
                    <div className="pt-4 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-500">담당부처</span>
                          <p className="font-medium text-gray-900">
                            {svc.department || "-"}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">신청방법</span>
                          <p className="font-medium text-gray-900">
                            {svc.applyMethod}
                          </p>
                        </div>
                      </div>
                      {svc.url && (
                        <a
                          href={svc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          상세 보기 →
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
