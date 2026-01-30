/** 상가업소 */
export interface Store {
  id: string;
  name: string;
  category: string; // 대분류
  subCategory: string; // 소분류
  address: string;
  lat: number;
  lng: number;
  phone?: string;
}

/** 상권 */
export interface CommercialDistrict {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

/** API 응답 */
export interface CommercialData {
  stores: Store[];
  totalCount: number;
  updatedAt: string;
  isLive: boolean;
  regionName?: string;
}

/** 업종 대분류 */
export const BUSINESS_CATEGORIES = [
  { code: "Q", label: "음식점" },
  { code: "D", label: "소매업" },
  { code: "R", label: "생활서비스" },
  { code: "P", label: "교육" },
  { code: "O", label: "부동산" },
  { code: "N", label: "의료" },
  { code: "F", label: "숙박" },
  { code: "L", label: "스포츠·여가" },
] as const;

/** 행정동코드 - 주요 지역 (간소화) */
export const COMMERCIAL_REGIONS = [
  { code: "11680", name: "서울 강남구", sidoCode: "11" },
  { code: "11650", name: "서울 서초구", sidoCode: "11" },
  { code: "11440", name: "서울 마포구", sidoCode: "11" },
  { code: "11500", name: "서울 강서구", sidoCode: "11" },
  { code: "11215", name: "서울 광진구", sidoCode: "11" },
  { code: "11560", name: "서울 영등포구", sidoCode: "11" },
  { code: "11380", name: "서울 은평구", sidoCode: "11" },
  { code: "11305", name: "서울 강북구", sidoCode: "11" },
  { code: "11200", name: "서울 성동구", sidoCode: "11" },
  { code: "11110", name: "서울 종로구", sidoCode: "11" },
  { code: "11140", name: "서울 중구", sidoCode: "11" },
  { code: "11740", name: "서울 송파구", sidoCode: "11" },
  { code: "26440", name: "부산 해운대구", sidoCode: "26" },
  { code: "26410", name: "부산 수영구", sidoCode: "26" },
  { code: "26110", name: "부산 중구", sidoCode: "26" },
  { code: "27200", name: "대구 수성구", sidoCode: "27" },
  { code: "27110", name: "대구 중구", sidoCode: "27" },
  { code: "28177", name: "인천 연수구", sidoCode: "28" },
  { code: "28245", name: "인천 서구", sidoCode: "28" },
  { code: "29140", name: "광주 서구", sidoCode: "29" },
  { code: "30110", name: "대전 동구", sidoCode: "30" },
  { code: "30170", name: "대전 유성구", sidoCode: "30" },
  { code: "41135", name: "경기 수원 팔달구", sidoCode: "41" },
  { code: "41173", name: "경기 성남 분당구", sidoCode: "41" },
  { code: "41390", name: "경기 화성시", sidoCode: "41" },
  { code: "41281", name: "경기 용인 수지구", sidoCode: "41" },
  { code: "41195", name: "경기 고양 일산서구", sidoCode: "41" },
] as const;

/** 시도 목록 */
export const COMMERCIAL_SIDOS = [
  { code: "11", name: "서울" },
  { code: "26", name: "부산" },
  { code: "27", name: "대구" },
  { code: "28", name: "인천" },
  { code: "29", name: "광주" },
  { code: "30", name: "대전" },
  { code: "31", name: "울산" },
  { code: "36", name: "세종" },
  { code: "41", name: "경기" },
  { code: "42", name: "강원" },
  { code: "43", name: "충북" },
  { code: "44", name: "충남" },
  { code: "45", name: "전북" },
  { code: "46", name: "전남" },
  { code: "47", name: "경북" },
  { code: "48", name: "경남" },
  { code: "50", name: "제주" },
] as const;
