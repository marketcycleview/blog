import type { LifestyleData, UserPreference, ScoredDistrict, DongLifestyleData, ScoredDong } from "./types";
import { CATEGORY_MAP } from "./categories";
import {
  RIVER_SCORES,
  NATURE_RATIO_SCORES,
  BUS_DENSITY_SCORES,
} from "./districts";

/**
 * raw count를 0~100으로 정규화
 * 각 카테고리별로 전 구 중 최대값 기준 정규화
 */
function normalizeScores(
  data: LifestyleData
): Record<string, Record<string, number>> {
  const allCategoryIds = new Set<string>();
  for (const d of data.districts) {
    for (const key of Object.keys(d.counts)) {
      allCategoryIds.add(key);
    }
  }

  // 카테고리별 최대값 계산
  const maxCounts: Record<string, number> = {};
  for (const catId of allCategoryIds) {
    let max = 0;
    for (const d of data.districts) {
      const v = d.counts[catId] ?? 0;
      if (v > max) max = v;
    }
    maxCounts[catId] = max;
  }

  // 정규화
  const normalized: Record<string, Record<string, number>> = {};
  for (const d of data.districts) {
    normalized[d.code] = {};
    for (const catId of allCategoryIds) {
      const raw = d.counts[catId] ?? 0;
      const max = maxCounts[catId];
      if (max === 0) {
        normalized[d.code][catId] = 0;
        continue;
      }

      const cat = CATEGORY_MAP[catId];
      if (!cat) {
        normalized[d.code][catId] = (raw / max) * 100;
        continue;
      }

      // 역수 처리: 유흥시설이 적을수록 높은 점수
      if (cat.search.type === "inverse") {
        normalized[d.code][catId] = (1 - raw / max) * 100;
      } else {
        normalized[d.code][catId] = (raw / max) * 100;
      }
    }

    // 사전 정의 데이터 적용
    normalized[d.code]["river"] = RIVER_SCORES[d.code] ?? 0;
    normalized[d.code]["nature_ratio"] = NATURE_RATIO_SCORES[d.code] ?? 0;
    normalized[d.code]["bus"] = BUS_DENSITY_SCORES[d.code] ?? 0;

    // 복합 지표: urban = (cafe + restaurant + convenience) 합산 정규화
    // 각각 이미 정규화되어 있으므로 평균
    const cafeScore = normalized[d.code]["cafe"] ?? 0;
    const restaurantScore = normalized[d.code]["restaurant"] ?? 0;
    const convenienceScore = normalized[d.code]["convenience"] ?? 0;
    normalized[d.code]["urban"] =
      (cafeScore + restaurantScore + convenienceScore) / 3;
  }

  return normalized;
}

/**
 * 사용자 선택 기반 최종 점수 계산
 */
export function calculateScores(
  data: LifestyleData,
  preferences: UserPreference[]
): ScoredDistrict[] {
  const enabled = preferences.filter((p) => p.enabled && p.weight > 0);
  if (enabled.length === 0) {
    return data.districts.map((d) => ({
      code: d.code,
      name: d.name,
      region: d.region,
      lat: d.lat,
      lng: d.lng,
      totalScore: 0,
      breakdown: {},
      counts: d.counts,
    }));
  }

  const normalized = normalizeScores(data);
  const totalWeight = enabled.reduce((sum, p) => sum + p.weight, 0);

  return data.districts.map((d) => {
    let weightedSum = 0;
    const breakdown: Record<string, number> = {};

    for (const pref of enabled) {
      const score = normalized[d.code]?.[pref.categoryId] ?? 0;
      breakdown[pref.categoryId] = Math.round(score * 10) / 10;
      weightedSum += pref.weight * score;
    }

    const totalScore =
      totalWeight > 0
        ? Math.round((weightedSum / totalWeight) * 10) / 10
        : 0;

    return {
      code: d.code,
      name: d.name,
      region: d.region,
      lat: d.lat,
      lng: d.lng,
      totalScore,
      breakdown,
      counts: d.counts,
    };
  });
}

/**
 * 점수순 내림차순 정렬
 */
export function rankDistricts(scored: ScoredDistrict[]): ScoredDistrict[] {
  return [...scored].sort((a, b) => b.totalScore - a.totalScore);
}

// ── 동 단위 점수 계산 ──────────────────────────────────────

/**
 * 동 단위 점수 계산 (구 내에서 정규화)
 * 구 단위와 동일한 알고리즘이지만, 정규화 범위가 해당 구 내 동들로 제한됨
 */
export function calculateDongScores(
  dongData: DongLifestyleData,
  preferences: UserPreference[]
): ScoredDong[] {
  const enabled = preferences.filter((p) => p.enabled && p.weight > 0);
  if (enabled.length === 0) {
    return dongData.dongs.map((d) => ({
      code: d.code,
      name: d.name,
      parentCode: d.parentCode,
      lat: d.lat,
      lng: d.lng,
      totalScore: 0,
      breakdown: {},
      counts: d.counts,
    }));
  }

  // 구 내 동들 사이에서 카테고리별 정규화
  const allCategoryIds = new Set<string>();
  for (const d of dongData.dongs) {
    for (const key of Object.keys(d.counts)) {
      allCategoryIds.add(key);
    }
  }

  const maxCounts: Record<string, number> = {};
  for (const catId of allCategoryIds) {
    let max = 0;
    for (const d of dongData.dongs) {
      const v = d.counts[catId] ?? 0;
      if (v > max) max = v;
    }
    maxCounts[catId] = max;
  }

  const normalized: Record<string, Record<string, number>> = {};
  for (const d of dongData.dongs) {
    normalized[d.code] = {};
    for (const catId of allCategoryIds) {
      const raw = d.counts[catId] ?? 0;
      const max = maxCounts[catId];
      if (max === 0) {
        normalized[d.code][catId] = 0;
        continue;
      }

      const cat = CATEGORY_MAP[catId];
      if (cat?.search.type === "inverse") {
        normalized[d.code][catId] = (1 - raw / max) * 100;
      } else {
        normalized[d.code][catId] = (raw / max) * 100;
      }
    }

    // 복합 지표: urban
    const cafeScore = normalized[d.code]["cafe"] ?? 0;
    const restaurantScore = normalized[d.code]["restaurant"] ?? 0;
    const convenienceScore = normalized[d.code]["convenience"] ?? 0;
    normalized[d.code]["urban"] = (cafeScore + restaurantScore + convenienceScore) / 3;
  }

  // 가중 평균 계산
  const totalWeight = enabled.reduce((sum, p) => sum + p.weight, 0);

  return dongData.dongs.map((d) => {
    let weightedSum = 0;
    const breakdown: Record<string, number> = {};

    for (const pref of enabled) {
      const score = normalized[d.code]?.[pref.categoryId] ?? 0;
      breakdown[pref.categoryId] = Math.round(score * 10) / 10;
      weightedSum += pref.weight * score;
    }

    const totalScore = totalWeight > 0
      ? Math.round((weightedSum / totalWeight) * 10) / 10
      : 0;

    return {
      code: d.code,
      name: d.name,
      parentCode: d.parentCode,
      lat: d.lat,
      lng: d.lng,
      totalScore,
      breakdown,
      counts: d.counts,
    };
  });
}

/**
 * 동 점수순 내림차순 정렬
 */
export function rankDongs(scored: ScoredDong[]): ScoredDong[] {
  return [...scored].sort((a, b) => b.totalScore - a.totalScore);
}
