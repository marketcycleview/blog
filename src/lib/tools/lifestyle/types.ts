/** 구별 카테고리 POI 카운트 */
export interface DistrictScores {
  code: string; // "gangnam", "mapo" 등
  name: string; // "강남구"
  lat: number;
  lng: number;
  counts: Record<string, number>; // { park: 45, cafe: 312, ... }
}

/** 전체 수집 데이터 */
export interface LifestyleData {
  updatedAt: string;
  districts: DistrictScores[];
}

/** 사용자 카테고리 설정 */
export interface UserPreference {
  categoryId: string;
  weight: number; // 1~5
  enabled: boolean;
}

/** 점수 계산 결과 */
export interface ScoredDistrict {
  code: string;
  name: string;
  lat: number;
  lng: number;
  totalScore: number; // 0~100
  breakdown: Record<string, number>; // 카테고리별 정규화 점수
  counts: Record<string, number>; // 원본 카운트
}
