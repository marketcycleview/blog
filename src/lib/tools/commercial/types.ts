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

/** 주요 지역 중심 좌표 (반경 검색용) */
export const COMMERCIAL_REGIONS = [
  { code: "gangnam", name: "서울 강남구", sidoCode: "11", lat: 37.4979, lng: 127.0276 },
  { code: "seocho", name: "서울 서초구", sidoCode: "11", lat: 37.4837, lng: 127.0324 },
  { code: "mapo", name: "서울 마포구", sidoCode: "11", lat: 37.5663, lng: 126.9014 },
  { code: "gangse", name: "서울 강서구", sidoCode: "11", lat: 37.5510, lng: 126.8495 },
  { code: "gwangjin", name: "서울 광진구", sidoCode: "11", lat: 37.5385, lng: 127.0824 },
  { code: "yeongdeung", name: "서울 영등포구", sidoCode: "11", lat: 37.5264, lng: 126.8963 },
  { code: "eunpyeong", name: "서울 은평구", sidoCode: "11", lat: 37.6027, lng: 126.9291 },
  { code: "gangbuk", name: "서울 강북구", sidoCode: "11", lat: 37.6397, lng: 127.0115 },
  { code: "seongdong", name: "서울 성동구", sidoCode: "11", lat: 37.5633, lng: 127.0371 },
  { code: "jongno", name: "서울 종로구", sidoCode: "11", lat: 37.5735, lng: 126.9790 },
  { code: "junggu", name: "서울 중구", sidoCode: "11", lat: 37.5641, lng: 126.9979 },
  { code: "songpa", name: "서울 송파구", sidoCode: "11", lat: 37.5145, lng: 127.1060 },
  { code: "haeundae", name: "부산 해운대구", sidoCode: "26", lat: 35.1631, lng: 129.1636 },
  { code: "suyeong", name: "부산 수영구", sidoCode: "26", lat: 35.1459, lng: 129.1130 },
  { code: "busanjung", name: "부산 중구", sidoCode: "26", lat: 35.1060, lng: 129.0324 },
  { code: "suseong", name: "대구 수성구", sidoCode: "27", lat: 35.8566, lng: 128.6317 },
  { code: "daegujung", name: "대구 중구", sidoCode: "27", lat: 35.8694, lng: 128.6063 },
  { code: "yeonsu", name: "인천 연수구", sidoCode: "28", lat: 37.4100, lng: 126.6784 },
  { code: "icheonseo", name: "인천 서구", sidoCode: "28", lat: 37.5457, lng: 126.6760 },
  { code: "gwangjuseo", name: "광주 서구", sidoCode: "29", lat: 35.1519, lng: 126.8895 },
  { code: "daejeondong", name: "대전 동구", sidoCode: "30", lat: 36.3512, lng: 127.4276 },
  { code: "yuseong", name: "대전 유성구", sidoCode: "30", lat: 36.3622, lng: 127.3561 },
  { code: "paldal", name: "경기 수원 팔달구", sidoCode: "41", lat: 37.2794, lng: 127.0131 },
  { code: "bundang", name: "경기 성남 분당구", sidoCode: "41", lat: 37.3825, lng: 127.1190 },
  { code: "hwaseong", name: "경기 화성시", sidoCode: "41", lat: 37.1996, lng: 126.8312 },
  { code: "suji", name: "경기 용인 수지구", sidoCode: "41", lat: 37.3220, lng: 127.0980 },
  { code: "ilsanseo", name: "경기 고양 일산서구", sidoCode: "41", lat: 37.6750, lng: 126.7520 },
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
