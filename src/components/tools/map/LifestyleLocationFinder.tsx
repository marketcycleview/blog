"use client";

import { useState, useMemo, useCallback } from "react";
import KakaoMap, { type MapMarker } from "./KakaoMap";
import type { LifestyleData, UserPreference, ScoredDistrict, RegionCode } from "@/lib/tools/lifestyle/types";
import {
  CATEGORY_GROUPS,
  PRESETS,
  ALL_CATEGORIES,
  type Preset,
} from "@/lib/tools/lifestyle/categories";
import { DISTRICT_DESCRIPTIONS, REGIONS } from "@/lib/tools/lifestyle/districts";
import { calculateScores, rankDistricts } from "@/lib/tools/lifestyle/scoring";

interface Props {
  data: LifestyleData;
}

/** 점수 → 색상 */
function scoreColor(score: number): string {
  if (score >= 80) return "#ef4444";
  if (score >= 60) return "#f97316";
  if (score >= 40) return "#eab308";
  return "#3b82f6";
}

/** 점수 → 등급 텍스트 */
function scoreGrade(score: number): string {
  if (score >= 80) return "최적";
  if (score >= 60) return "좋음";
  if (score >= 40) return "보통";
  return "부족";
}

/** 랭킹 메달 */
function rankMedal(rank: number): string {
  if (rank === 0) return "🥇";
  if (rank === 1) return "🥈";
  if (rank === 2) return "🥉";
  return `${rank + 1}`;
}

/** 지역 라벨 */
const REGION_LABELS: Record<RegionCode, string> = {
  seoul: "서울",
  gyeonggi: "경기",
  incheon: "인천",
  busan: "부산",
  daegu: "대구",
  gwangju: "광주",
  daejeon: "대전",
  ulsan: "울산",
  sejong: "세종",
  chungbuk: "충북",
  chungnam: "충남",
  jeonbuk: "전북",
  jeonnam: "전남",
  gyeongbuk: "경북",
  gyeongnam: "경남",
  gangwon: "강원",
  jeju: "제주",
};

export default function LifestyleLocationFinder({ data }: Props) {
  // ── 상태 ──────────────────────────────────────────────
  const [preferences, setPreferences] = useState<Record<string, UserPreference>>(() => {
    const init: Record<string, UserPreference> = {};
    for (const cat of ALL_CATEGORIES) {
      init[cat.id] = { categoryId: cat.id, weight: 3, enabled: false };
    }
    return init;
  });

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<ScoredDistrict | null>(null);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [regionFilter, setRegionFilter] = useState<RegionCode | "all">("all");

  // ── 활성 카테고리 수 ──────────────────────────────────
  const enabledCount = useMemo(
    () => Object.values(preferences).filter((p) => p.enabled).length,
    [preferences]
  );

  // ── 점수 계산 ──────────────────────────────────────────
  const scored = useMemo(() => {
    if (!analyzed) return [];
    const prefs = Object.values(preferences);
    return rankDistricts(calculateScores(data, prefs));
  }, [analyzed, preferences, data]);

  // ── 지역 필터 적용 ────────────────────────────────────
  const filteredScored = useMemo(() => {
    if (regionFilter === "all") return scored;
    return scored.filter((d) => d.region === regionFilter);
  }, [scored, regionFilter]);

  // ── 현재 지역의 지도 설정 ──────────────────────────────
  const currentRegion = useMemo(
    () => REGIONS.find((r) => r.code === regionFilter) || REGIONS[0],
    [regionFilter]
  );

  // ── 지도 마커 생성 ─────────────────────────────────────
  const markers: MapMarker[] = useMemo(() => {
    if (!analyzed || filteredScored.length === 0) return [];
    return filteredScored.map((d) => ({
      lat: d.lat,
      lng: d.lng,
      title: d.name,
      content: `<div style="text-align:center;min-width:80px;"><strong>${d.name}</strong><br/><span style="font-size:18px;font-weight:bold;color:${scoreColor(d.totalScore)}">${d.totalScore}점</span></div>`,
    }));
  }, [analyzed, filteredScored]);

  // ── 프리셋 적용 ────────────────────────────────────────
  const applyPreset = useCallback((preset: Preset) => {
    const next: Record<string, UserPreference> = {};
    for (const cat of ALL_CATEGORIES) {
      const weight = preset.settings[cat.id];
      next[cat.id] = {
        categoryId: cat.id,
        weight: weight ?? 3,
        enabled: !!weight,
      };
    }
    setPreferences(next);
    setActivePreset(preset.id);
    setAnalyzed(false);
    setSelectedDistrict(null);

    const groupsToOpen: Record<string, boolean> = {};
    for (const catId of Object.keys(preset.settings)) {
      const cat = ALL_CATEGORIES.find((c) => c.id === catId);
      if (cat) groupsToOpen[cat.groupId] = true;
    }
    setOpenGroups(groupsToOpen);
  }, []);

  // ── 카테고리 토글 ──────────────────────────────────────
  const toggleCategory = useCallback((catId: string) => {
    setPreferences((prev) => ({
      ...prev,
      [catId]: { ...prev[catId], enabled: !prev[catId].enabled },
    }));
    setActivePreset(null);
    setAnalyzed(false);
  }, []);

  // ── 가중치 변경 ────────────────────────────────────────
  const setWeight = useCallback((catId: string, weight: number) => {
    setPreferences((prev) => ({
      ...prev,
      [catId]: { ...prev[catId], weight },
    }));
    if (preferences[catId]?.enabled) {
      setAnalyzed(false);
    }
  }, [preferences]);

  // ── 초기화 ─────────────────────────────────────────────
  const reset = useCallback(() => {
    const init: Record<string, UserPreference> = {};
    for (const cat of ALL_CATEGORIES) {
      init[cat.id] = { categoryId: cat.id, weight: 3, enabled: false };
    }
    setPreferences(init);
    setActivePreset(null);
    setAnalyzed(false);
    setSelectedDistrict(null);
    setOpenGroups({});
  }, []);

  // ── 그룹 토글 ──────────────────────────────────────────
  const toggleGroup = useCallback((groupId: string) => {
    setOpenGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  }, []);

  // ── 분석 실행 ──────────────────────────────────────────
  const analyze = useCallback(() => {
    setAnalyzed(true);
    setSelectedDistrict(null);
  }, []);

  // ── 활성 카테고리 목록 ─────────────────────────────────
  const enabledCategories = useMemo(
    () => ALL_CATEGORIES.filter((c) => preferences[c.id]?.enabled),
    [preferences]
  );

  // ── 지역별 통계 ────────────────────────────────────────
  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = { all: data.districts.length };
    for (const d of data.districts) {
      counts[d.region] = (counts[d.region] || 0) + 1;
    }
    return counts;
  }, [data]);

  return (
    <div className="space-y-6">
      {/* ── 프리셋 버튼 ── */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">
          빠른 시작: 라이프스타일 유형 선택
        </p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activePreset === preset.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {preset.icon} {preset.label}
            </button>
          ))}
          <button
            onClick={reset}
            className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-50 text-gray-500 hover:bg-gray-100 transition-all"
          >
            ⚙️ 직접설정
          </button>
        </div>
      </div>

      {/* ── 카테고리 선택 아코디언 ── */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        {CATEGORY_GROUPS.map((group) => {
          const isOpen = openGroups[group.id] ?? false;
          const groupEnabled = group.categories.filter(
            (c) => preferences[c.id]?.enabled
          ).length;

          return (
            <div key={group.id} className="border-b border-gray-100 last:border-b-0">
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <span className="flex items-center gap-2 font-medium text-gray-800">
                  <span>{group.icon}</span>
                  <span>{group.label}</span>
                  {groupEnabled > 0 && (
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                      {groupEnabled}개 선택
                    </span>
                  )}
                </span>
                <span className="text-gray-400 text-sm">
                  {group.categories.length}개 항목 {isOpen ? "▲" : "▼"}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-3 space-y-2">
                  {group.categories.map((cat) => {
                    const pref = preferences[cat.id];
                    return (
                      <div
                        key={cat.id}
                        className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                          pref?.enabled ? "bg-blue-50" : "bg-gray-50"
                        }`}
                      >
                        <button
                          onClick={() => toggleCategory(cat.id)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            pref?.enabled
                              ? "bg-blue-600 border-blue-600 text-white"
                              : "border-gray-300 hover:border-blue-400"
                          }`}
                        >
                          {pref?.enabled && (
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <span className="text-sm flex-shrink-0 w-5">{cat.icon}</span>
                        <span className={`text-sm flex-1 ${pref?.enabled ? "text-gray-900 font-medium" : "text-gray-600"}`}>
                          {cat.label}
                        </span>

                        {pref?.enabled && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-gray-400 w-3">1</span>
                            <input
                              type="range"
                              min={1}
                              max={5}
                              value={pref.weight}
                              onChange={(e) => setWeight(cat.id, Number(e.target.value))}
                              className="w-20 h-1.5 accent-blue-600"
                            />
                            <span className="text-xs text-gray-400 w-3">5</span>
                            <span className="text-xs font-bold text-blue-600 w-4 text-center">
                              {pref.weight}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── 분석 버튼 ── */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          선택한 조건: <strong className="text-blue-600">{enabledCount}개</strong>
        </p>
        <div className="flex gap-2">
          <button
            onClick={reset}
            className="px-4 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors"
          >
            ↺ 초기화
          </button>
          <button
            onClick={analyze}
            disabled={enabledCount === 0}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              enabledCount > 0
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            🔍 분석하기
          </button>
        </div>
      </div>

      {/* ── 결과 영역 ── */}
      {analyzed && scored.length > 0 && (
        <>
          {/* 지역 필터 탭 */}
          <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-lg">
            {REGIONS.map((r) => (
              <button
                key={r.code}
                onClick={() => { setRegionFilter(r.code); setSelectedDistrict(null); }}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  regionFilter === r.code
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {r.label}
                <span className="text-xs ml-1 text-gray-400">
                  {regionCounts[r.code] || 0}
                </span>
              </button>
            ))}
          </div>

          {/* 지도 */}
          <div>
            <div className="flex items-center gap-4 mb-2 text-xs text-gray-500">
              <span>범례:</span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> 80+점
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" /> 60~79점
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" /> 40~59점
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> ~39점
              </span>
            </div>
            <KakaoMap
              center={currentRegion.center}
              level={currentRegion.level}
              height="450px"
              markers={markers}
            />
          </div>

          {/* TOP 10 랭킹 */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              📊 {regionFilter === "all" ? "전국" : currentRegion.label} 추천 순위 TOP 10
            </h3>
            <div className="space-y-2">
              {filteredScored.slice(0, 10).map((d, idx) => (
                <button
                  key={d.code}
                  onClick={() =>
                    setSelectedDistrict(selectedDistrict?.code === d.code ? null : d)
                  }
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedDistrict?.code === d.code
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg w-7 text-center">{rankMedal(idx)}</span>
                      <span className="font-bold text-gray-900">{d.name}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                        {REGION_LABELS[d.region]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold" style={{ color: scoreColor(d.totalScore) }}>
                        {d.totalScore}점
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: scoreColor(d.totalScore) + "20",
                          color: scoreColor(d.totalScore),
                        }}
                      >
                        {scoreGrade(d.totalScore)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {enabledCategories.slice(0, 5).map((cat) => {
                      const score = d.breakdown[cat.id] ?? 0;
                      return (
                        <div key={cat.id} className="flex items-center gap-1 text-xs text-gray-500">
                          <span>{cat.icon}</span>
                          <span className="w-12 truncate">{cat.label}</span>
                          <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${score}%`, backgroundColor: scoreColor(score) }}
                            />
                          </div>
                        </div>
                      );
                    })}
                    {enabledCategories.length > 5 && (
                      <span className="text-xs text-gray-400">+{enabledCategories.length - 5}개</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 구 상세 분석 패널 */}
          {selectedDistrict && (
            <div className="border border-blue-200 rounded-xl p-5 bg-blue-50/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  📊 {selectedDistrict.name} 상세 분석
                </h3>
                <button
                  onClick={() => setSelectedDistrict(null)}
                  className="text-gray-400 hover:text-gray-600 text-sm"
                >
                  ✕ 닫기
                </button>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl font-bold" style={{ color: scoreColor(selectedDistrict.totalScore) }}>
                  {selectedDistrict.totalScore}
                </span>
                <span className="text-gray-500 text-sm">/ 100점</span>
                <span
                  className="text-sm px-3 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: scoreColor(selectedDistrict.totalScore) + "20",
                    color: scoreColor(selectedDistrict.totalScore),
                  }}
                >
                  {scoreGrade(selectedDistrict.totalScore)}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {enabledCategories.map((cat) => {
                  const score = selectedDistrict.breakdown[cat.id] ?? 0;
                  const count = selectedDistrict.counts[cat.id];
                  return (
                    <div key={cat.id} className="flex items-center gap-2">
                      <span className="text-sm w-5">{cat.icon}</span>
                      <span className="text-sm text-gray-700 w-28 truncate">{cat.label}</span>
                      <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${score}%`, backgroundColor: scoreColor(score) }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right" style={{ color: scoreColor(score) }}>
                        {Math.round(score)}점
                      </span>
                      {count !== undefined && (
                        <span className="text-xs text-gray-400 w-12 text-right">({count}개)</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {DISTRICT_DESCRIPTIONS[selectedDistrict.code] && (
                <p className="text-sm text-gray-600 bg-white rounded-lg p-3 border border-gray-100">
                  💡 {DISTRICT_DESCRIPTIONS[selectedDistrict.code]}
                </p>
              )}
            </div>
          )}
        </>
      )}

      {/* 데이터 기준일 */}
      <p className="text-xs text-gray-400 text-center">
        데이터 기준: {new Date(data.updatedAt).toLocaleDateString("ko-KR")} · 카카오 Local API 기반 · {data.districts.length}개 지역
      </p>
    </div>
  );
}
