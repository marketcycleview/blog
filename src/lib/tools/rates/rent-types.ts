// 국토교통부 아파트 전월세 실거래 API 타입

/** XML에서 파싱된 개별 거래 */
export interface RentTransaction {
  dong: string;        // 법정동
  deposit: number;     // 보증금 (만원)
  monthlyRent: number; // 월세 (만원, 0이면 전세)
  area: number;        // 전용면적 (㎡)
  aptName: string;     // 아파트명
  floor: number;       // 층
  builtYear: number;   // 건축년도
  contractType: string; // 계약구분 (신규/갱신)
  year: number;
  month: number;
  day: number;
}

/** 집계된 구/군 단위 데이터 */
export interface DistrictSummary {
  code: string;    // 법정동코드 5자리
  name: string;    // 구/군 이름
  jeonse: {
    count: number;
    avgDeposit: number;  // 만원
    minDeposit: number;
    maxDeposit: number;
  };
  wolse: {
    count: number;
    avgDeposit: number;
    avgRent: number;     // 월세 만원
  };
  totalCount: number;
}

/** 동(neighbourhood) 단위 상세 */
export interface DongDetail {
  dong: string;
  jeonseCount: number;
  jeonseAvg: number;
  wolseCount: number;
  wolseAvgDeposit: number;
  wolseAvgRent: number;
}

/** 히트맵 전체 응답 */
export interface RentHeatmapData {
  districts: DistrictSummary[];
  sido: string;
  sidoName: string;
  month: string; // YYYYMM
  updatedAt: string;
  isLive: boolean;
}

/** 면적 카테고리 */
export const SIZE_CATEGORIES = [
  { key: "all", label: "전체", min: 0, max: 9999 },
  { key: "small", label: "소형(~60㎡)", min: 0, max: 60 },
  { key: "mid", label: "중형(60~85㎡)", min: 60, max: 85 },
  { key: "large", label: "대형(85㎡~)", min: 85, max: 9999 },
] as const;
