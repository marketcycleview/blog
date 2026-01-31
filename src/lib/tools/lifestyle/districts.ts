import type { RegionCode } from "./types";

/** 구/시 단위 지역 */
export interface District {
  code: string;
  name: string;
  region: RegionCode;
  lat: number;
  lng: number;
}

/** 지역 탭 정보 */
export interface RegionInfo {
  code: RegionCode | "all";
  label: string;
  center: { lat: number; lng: number };
  level: number; // kakao map zoom
}

export const REGIONS: RegionInfo[] = [
  { code: "all", label: "전체", center: { lat: 36.5, lng: 127.8 }, level: 13 },
  { code: "seoul", label: "서울", center: { lat: 37.5665, lng: 126.978 }, level: 9 },
  { code: "gyeonggi", label: "경기", center: { lat: 37.41, lng: 127.02 }, level: 10 },
  { code: "incheon", label: "인천", center: { lat: 37.46, lng: 126.70 }, level: 10 },
  { code: "busan", label: "부산", center: { lat: 35.18, lng: 129.07 }, level: 9 },
  { code: "daegu", label: "대구", center: { lat: 35.87, lng: 128.60 }, level: 9 },
  { code: "gwangju", label: "광주", center: { lat: 35.16, lng: 126.85 }, level: 9 },
  { code: "daejeon", label: "대전", center: { lat: 36.35, lng: 127.38 }, level: 9 },
  { code: "ulsan", label: "울산", center: { lat: 35.54, lng: 129.31 }, level: 9 },
  { code: "sejong", label: "세종", center: { lat: 36.48, lng: 127.26 }, level: 9 },
  { code: "chungbuk", label: "충북", center: { lat: 36.64, lng: 127.47 }, level: 9 },
  { code: "chungnam", label: "충남", center: { lat: 36.83, lng: 127.10 }, level: 10 },
  { code: "jeonbuk", label: "전북", center: { lat: 35.87, lng: 127.05 }, level: 10 },
  { code: "jeonnam", label: "전남", center: { lat: 34.87, lng: 127.05 }, level: 10 },
  { code: "gyeongbuk", label: "경북", center: { lat: 36.00, lng: 128.90 }, level: 10 },
  { code: "gyeongnam", label: "경남", center: { lat: 35.23, lng: 128.60 }, level: 10 },
  { code: "gangwon", label: "강원", center: { lat: 37.65, lng: 128.20 }, level: 10 },
  { code: "jeju", label: "제주", center: { lat: 33.38, lng: 126.55 }, level: 10 },
];

// ──────────────────────────────────────────────────────────
// 서울 25개 구
// ──────────────────────────────────────────────────────────
const SEOUL: District[] = [
  { code: "gangnam", name: "강남구", region: "seoul", lat: 37.4979, lng: 127.0276 },
  { code: "gangdong", name: "강동구", region: "seoul", lat: 37.5301, lng: 127.1238 },
  { code: "gangbuk", name: "강북구", region: "seoul", lat: 37.6397, lng: 127.0115 },
  { code: "gangseo", name: "강서구", region: "seoul", lat: 37.5510, lng: 126.8495 },
  { code: "gwanak", name: "관악구", region: "seoul", lat: 37.4784, lng: 126.9516 },
  { code: "gwangjin", name: "광진구", region: "seoul", lat: 37.5385, lng: 127.0824 },
  { code: "guro", name: "구로구", region: "seoul", lat: 37.4954, lng: 126.8874 },
  { code: "geumcheon", name: "금천구", region: "seoul", lat: 37.4519, lng: 126.8959 },
  { code: "nowon", name: "노원구", region: "seoul", lat: 37.6542, lng: 127.0568 },
  { code: "dobong", name: "도봉구", region: "seoul", lat: 37.6688, lng: 127.0471 },
  { code: "dongdaemun", name: "동대문구", region: "seoul", lat: 37.5744, lng: 127.0396 },
  { code: "dongjak", name: "동작구", region: "seoul", lat: 37.5124, lng: 126.9393 },
  { code: "mapo", name: "마포구", region: "seoul", lat: 37.5663, lng: 126.9014 },
  { code: "seodaemun", name: "서대문구", region: "seoul", lat: 37.5791, lng: 126.9368 },
  { code: "seocho", name: "서초구", region: "seoul", lat: 37.4837, lng: 127.0324 },
  { code: "seongdong", name: "성동구", region: "seoul", lat: 37.5633, lng: 127.0371 },
  { code: "seongbuk", name: "성북구", region: "seoul", lat: 37.5894, lng: 127.0167 },
  { code: "songpa", name: "송파구", region: "seoul", lat: 37.5145, lng: 127.1060 },
  { code: "yangcheon", name: "양천구", region: "seoul", lat: 37.5170, lng: 126.8664 },
  { code: "yeongdeungpo", name: "영등포구", region: "seoul", lat: 37.5264, lng: 126.8963 },
  { code: "yongsan", name: "용산구", region: "seoul", lat: 37.5326, lng: 126.9909 },
  { code: "eunpyeong", name: "은평구", region: "seoul", lat: 37.6027, lng: 126.9291 },
  { code: "jongno", name: "종로구", region: "seoul", lat: 37.5735, lng: 126.9790 },
  { code: "junggu", name: "중구", region: "seoul", lat: 37.5641, lng: 126.9979 },
  { code: "jungnang", name: "중랑구", region: "seoul", lat: 37.6066, lng: 127.0927 },
];

// ──────────────────────────────────────────────────────────
// 경기도 주요 시/구 (30개)
// ──────────────────────────────────────────────────────────
const GYEONGGI: District[] = [
  // 수원시 4구
  { code: "sw_jangan", name: "수원 장안구", region: "gyeonggi", lat: 37.3005, lng: 127.0108 },
  { code: "sw_gwonseon", name: "수원 권선구", region: "gyeonggi", lat: 37.2572, lng: 126.9717 },
  { code: "sw_paldal", name: "수원 팔달구", region: "gyeonggi", lat: 37.2794, lng: 127.0131 },
  { code: "sw_yeongtong", name: "수원 영통구", region: "gyeonggi", lat: 37.2596, lng: 127.0465 },
  // 성남시 3구
  { code: "sn_sujeong", name: "성남 수정구", region: "gyeonggi", lat: 37.4508, lng: 127.1458 },
  { code: "sn_jungwon", name: "성남 중원구", region: "gyeonggi", lat: 37.4315, lng: 127.1372 },
  { code: "sn_bundang", name: "성남 분당구", region: "gyeonggi", lat: 37.3825, lng: 127.1190 },
  // 고양시 3구
  { code: "gy_deogyang", name: "고양 덕양구", region: "gyeonggi", lat: 37.6373, lng: 126.8322 },
  { code: "gy_ilsandong", name: "고양 일산동구", region: "gyeonggi", lat: 37.6586, lng: 126.7741 },
  { code: "gy_ilsanseo", name: "고양 일산서구", region: "gyeonggi", lat: 37.6750, lng: 126.7520 },
  // 용인시 3구
  { code: "yi_cheoin", name: "용인 처인구", region: "gyeonggi", lat: 37.2340, lng: 127.2014 },
  { code: "yi_giheung", name: "용인 기흥구", region: "gyeonggi", lat: 37.2804, lng: 127.1153 },
  { code: "yi_suji", name: "용인 수지구", region: "gyeonggi", lat: 37.3220, lng: 127.0980 },
  // 안산시 2구
  { code: "as_sangnok", name: "안산 상록구", region: "gyeonggi", lat: 37.3010, lng: 126.8466 },
  { code: "as_danwon", name: "안산 단원구", region: "gyeonggi", lat: 37.3185, lng: 126.7988 },
  // 안양시 2구
  { code: "ay_manan", name: "안양 만안구", region: "gyeonggi", lat: 37.3866, lng: 126.9217 },
  { code: "ay_dongan", name: "안양 동안구", region: "gyeonggi", lat: 37.3943, lng: 126.9568 },
  // 단일 시
  { code: "bucheon", name: "부천시", region: "gyeonggi", lat: 37.5034, lng: 126.7660 },
  { code: "namyangju", name: "남양주시", region: "gyeonggi", lat: 37.6360, lng: 127.2163 },
  { code: "hwaseong", name: "화성시", region: "gyeonggi", lat: 37.1996, lng: 126.8312 },
  { code: "uijeongbu", name: "의정부시", region: "gyeonggi", lat: 37.7381, lng: 127.0337 },
  { code: "siheung", name: "시흥시", region: "gyeonggi", lat: 37.3800, lng: 126.8029 },
  { code: "paju", name: "파주시", region: "gyeonggi", lat: 37.7590, lng: 126.7800 },
  { code: "gwangmyeong", name: "광명시", region: "gyeonggi", lat: 37.4786, lng: 126.8642 },
  { code: "gimpo", name: "김포시", region: "gyeonggi", lat: 37.6152, lng: 126.7156 },
  { code: "gunpo", name: "군포시", region: "gyeonggi", lat: 37.3617, lng: 126.9352 },
  { code: "hanam", name: "하남시", region: "gyeonggi", lat: 37.5393, lng: 127.2148 },
  { code: "guri", name: "구리시", region: "gyeonggi", lat: 37.5943, lng: 127.1295 },
  { code: "gwacheon", name: "과천시", region: "gyeonggi", lat: 37.4292, lng: 126.9876 },
  { code: "osan", name: "오산시", region: "gyeonggi", lat: 37.1498, lng: 127.0694 },
];

// ──────────────────────────────────────────────────────────
// 인천 8개 구
// ──────────────────────────────────────────────────────────
const INCHEON: District[] = [
  { code: "ic_junggu", name: "인천 중구", region: "incheon", lat: 37.4736, lng: 126.6214 },
  { code: "ic_donggu", name: "인천 동구", region: "incheon", lat: 37.4735, lng: 126.6432 },
  { code: "ic_michuhol", name: "인천 미추홀구", region: "incheon", lat: 37.4424, lng: 126.6531 },
  { code: "ic_yeonsu", name: "인천 연수구", region: "incheon", lat: 37.4100, lng: 126.6784 },
  { code: "ic_namdong", name: "인천 남동구", region: "incheon", lat: 37.4488, lng: 126.7309 },
  { code: "ic_bupyeong", name: "인천 부평구", region: "incheon", lat: 37.5074, lng: 126.7218 },
  { code: "ic_gyeyang", name: "인천 계양구", region: "incheon", lat: 37.5372, lng: 126.7376 },
  { code: "ic_seogu", name: "인천 서구", region: "incheon", lat: 37.5457, lng: 126.6760 },
];

// ──────────────────────────────────────────────────────────
// 부산 16개 구/군
// ──────────────────────────────────────────────────────────
const BUSAN: District[] = [
  { code: "bs_gangseo", name: "부산 강서구", region: "busan", lat: 35.0787, lng: 128.9337 },
  { code: "bs_geumjeong", name: "부산 금정구", region: "busan", lat: 35.2430, lng: 129.0922 },
  { code: "bs_gijang", name: "부산 기장군", region: "busan", lat: 35.2446, lng: 129.2222 },
  { code: "bs_nam", name: "부산 남구", region: "busan", lat: 35.1365, lng: 129.0846 },
  { code: "bs_dong", name: "부산 동구", region: "busan", lat: 35.1295, lng: 129.0458 },
  { code: "bs_dongnae", name: "부산 동래구", region: "busan", lat: 35.2050, lng: 129.0838 },
  { code: "bs_busanjin", name: "부산 부산진구", region: "busan", lat: 35.1631, lng: 129.0530 },
  { code: "bs_buk", name: "부산 북구", region: "busan", lat: 35.1978, lng: 129.0307 },
  { code: "bs_sasang", name: "부산 사상구", region: "busan", lat: 35.1526, lng: 128.9916 },
  { code: "bs_saha", name: "부산 사하구", region: "busan", lat: 35.1043, lng: 128.9748 },
  { code: "bs_seo", name: "부산 서구", region: "busan", lat: 35.0951, lng: 129.0244 },
  { code: "bs_suyeong", name: "부산 수영구", region: "busan", lat: 35.1454, lng: 129.1133 },
  { code: "bs_yeonje", name: "부산 연제구", region: "busan", lat: 35.1762, lng: 129.0799 },
  { code: "bs_yeongdo", name: "부산 영도구", region: "busan", lat: 35.0884, lng: 129.0687 },
  { code: "bs_jung", name: "부산 중구", region: "busan", lat: 35.1060, lng: 129.0327 },
  { code: "bs_haeundae", name: "부산 해운대구", region: "busan", lat: 35.1631, lng: 129.1635 },
];

// ──────────────────────────────────────────────────────────
// 대구 8개 구/군
// ──────────────────────────────────────────────────────────
const DAEGU: District[] = [
  { code: "dg_nam", name: "대구 남구", region: "daegu", lat: 35.8460, lng: 128.5977 },
  { code: "dg_dalseo", name: "대구 달서구", region: "daegu", lat: 35.8297, lng: 128.5327 },
  { code: "dg_dalseong", name: "대구 달성군", region: "daegu", lat: 35.7745, lng: 128.4319 },
  { code: "dg_dong", name: "대구 동구", region: "daegu", lat: 35.8863, lng: 128.6357 },
  { code: "dg_buk", name: "대구 북구", region: "daegu", lat: 35.8858, lng: 128.5828 },
  { code: "dg_seo", name: "대구 서구", region: "daegu", lat: 35.8718, lng: 128.5592 },
  { code: "dg_suseong", name: "대구 수성구", region: "daegu", lat: 35.8584, lng: 128.6318 },
  { code: "dg_jung", name: "대구 중구", region: "daegu", lat: 35.8698, lng: 128.6061 },
];

// ──────────────────────────────────────────────────────────
// 광주 5개 구
// ──────────────────────────────────────────────────────────
const GWANGJU: District[] = [
  { code: "gj_gwangsan", name: "광주 광산구", region: "gwangju", lat: 35.1396, lng: 126.7935 },
  { code: "gj_nam", name: "광주 남구", region: "gwangju", lat: 35.1327, lng: 126.9024 },
  { code: "gj_dong", name: "광주 동구", region: "gwangju", lat: 35.1459, lng: 126.9232 },
  { code: "gj_buk", name: "광주 북구", region: "gwangju", lat: 35.1745, lng: 126.9120 },
  { code: "gj_seo", name: "광주 서구", region: "gwangju", lat: 35.1520, lng: 126.8896 },
];

// ──────────────────────────────────────────────────────────
// 대전 5개 구
// ──────────────────────────────────────────────────────────
const DAEJEON: District[] = [
  { code: "dj_daedeok", name: "대전 대덕구", region: "daejeon", lat: 36.3468, lng: 127.4159 },
  { code: "dj_dong", name: "대전 동구", region: "daejeon", lat: 36.3120, lng: 127.4547 },
  { code: "dj_seo", name: "대전 서구", region: "daejeon", lat: 36.3553, lng: 127.3837 },
  { code: "dj_yuseong", name: "대전 유성구", region: "daejeon", lat: 36.3622, lng: 127.3561 },
  { code: "dj_jung", name: "대전 중구", region: "daejeon", lat: 36.3253, lng: 127.4214 },
];

// ──────────────────────────────────────────────────────────
// 울산 5개 구/군
// ──────────────────────────────────────────────────────────
const ULSAN: District[] = [
  { code: "us_nam", name: "울산 남구", region: "ulsan", lat: 35.5444, lng: 129.3303 },
  { code: "us_dong", name: "울산 동구", region: "ulsan", lat: 35.5050, lng: 129.4167 },
  { code: "us_buk", name: "울산 북구", region: "ulsan", lat: 35.5828, lng: 129.3610 },
  { code: "us_ulju", name: "울산 울주군", region: "ulsan", lat: 35.5225, lng: 129.2432 },
  { code: "us_jung", name: "울산 중구", region: "ulsan", lat: 35.5699, lng: 129.3324 },
];

// ──────────────────────────────────────────────────────────
// 세종특별자치시
// ──────────────────────────────────────────────────────────
const SEJONG: District[] = [
  { code: "sejong", name: "세종시", region: "sejong", lat: 36.4800, lng: 127.2590 },
];

// ──────────────────────────────────────────────────────────
// 충북 (청주시 4구)
// ──────────────────────────────────────────────────────────
const CHUNGBUK: District[] = [
  { code: "cj_sangdang", name: "청주 상당구", region: "chungbuk", lat: 36.6358, lng: 127.4914 },
  { code: "cj_seowon", name: "청주 서원구", region: "chungbuk", lat: 36.6370, lng: 127.4700 },
  { code: "cj_heungdeok", name: "청주 흥덕구", region: "chungbuk", lat: 36.6430, lng: 127.4300 },
  { code: "cj_cheongwon", name: "청주 청원구", region: "chungbuk", lat: 36.7100, lng: 127.4900 },
];

// ──────────────────────────────────────────────────────────
// 충남 (천안시 2구 + 아산시)
// ──────────────────────────────────────────────────────────
const CHUNGNAM: District[] = [
  { code: "ca_dongnam", name: "천안 동남구", region: "chungnam", lat: 36.8148, lng: 127.1714 },
  { code: "ca_seobuk", name: "천안 서북구", region: "chungnam", lat: 36.8600, lng: 127.1400 },
  { code: "asan", name: "아산시", region: "chungnam", lat: 36.7898, lng: 127.0018 },
];

// ──────────────────────────────────────────────────────────
// 전북특별자치도 (전주 2구 + 군산 + 익산)
// ──────────────────────────────────────────────────────────
const JEONBUK: District[] = [
  { code: "jj_wansan", name: "전주 완산구", region: "jeonbuk", lat: 35.8100, lng: 127.1200 },
  { code: "jj_deokjin", name: "전주 덕진구", region: "jeonbuk", lat: 35.8400, lng: 127.1300 },
  { code: "gunsan", name: "군산시", region: "jeonbuk", lat: 35.9676, lng: 126.7366 },
  { code: "iksan", name: "익산시", region: "jeonbuk", lat: 35.9483, lng: 126.9577 },
];

// ──────────────────────────────────────────────────────────
// 전남 (여수 + 순천 + 목포)
// ──────────────────────────────────────────────────────────
const JEONNAM: District[] = [
  { code: "yeosu", name: "여수시", region: "jeonnam", lat: 34.7604, lng: 127.6622 },
  { code: "suncheon", name: "순천시", region: "jeonnam", lat: 34.9506, lng: 127.4874 },
  { code: "mokpo", name: "목포시", region: "jeonnam", lat: 34.8118, lng: 126.3922 },
];

// ──────────────────────────────────────────────────────────
// 경북 (포항 2구 + 구미 + 경주 + 김천)
// ──────────────────────────────────────────────────────────
const GYEONGBUK: District[] = [
  { code: "ph_nam", name: "포항 남구", region: "gyeongbuk", lat: 36.0080, lng: 129.3590 },
  { code: "ph_buk", name: "포항 북구", region: "gyeongbuk", lat: 36.0418, lng: 129.3650 },
  { code: "gumi", name: "구미시", region: "gyeongbuk", lat: 36.1196, lng: 128.3441 },
  { code: "gyeongju", name: "경주시", region: "gyeongbuk", lat: 35.8562, lng: 129.2247 },
  { code: "gimcheon", name: "김천시", region: "gyeongbuk", lat: 36.1198, lng: 128.1136 },
];

// ──────────────────────────────────────────────────────────
// 경남 (창원 5구 + 김해 + 진주)
// ──────────────────────────────────────────────────────────
const GYEONGNAM: District[] = [
  { code: "cw_uichang", name: "창원 의창구", region: "gyeongnam", lat: 35.2540, lng: 128.6387 },
  { code: "cw_seongsan", name: "창원 성산구", region: "gyeongnam", lat: 35.2000, lng: 128.7000 },
  { code: "cw_masanhappo", name: "창원 마산합포구", region: "gyeongnam", lat: 35.1800, lng: 128.5700 },
  { code: "cw_masanhoewon", name: "창원 마산회원구", region: "gyeongnam", lat: 35.2200, lng: 128.5800 },
  { code: "cw_jinhae", name: "창원 진해구", region: "gyeongnam", lat: 35.1500, lng: 128.6800 },
  { code: "gimhae", name: "김해시", region: "gyeongnam", lat: 35.2286, lng: 128.8892 },
  { code: "jinju", name: "진주시", region: "gyeongnam", lat: 35.1800, lng: 128.1076 },
];

// ──────────────────────────────────────────────────────────
// 강원특별자치도 (춘천 + 원주 + 강릉)
// ──────────────────────────────────────────────────────────
const GANGWON: District[] = [
  { code: "chuncheon", name: "춘천시", region: "gangwon", lat: 37.8813, lng: 127.7300 },
  { code: "wonju", name: "원주시", region: "gangwon", lat: 37.3422, lng: 127.9202 },
  { code: "gangneung", name: "강릉시", region: "gangwon", lat: 37.7519, lng: 128.8760 },
];

// ──────────────────────────────────────────────────────────
// 제주특별자치도
// ──────────────────────────────────────────────────────────
const JEJU: District[] = [
  { code: "jejusi", name: "제주시", region: "jeju", lat: 33.4996, lng: 126.5312 },
  { code: "seogwipo", name: "서귀포시", region: "jeju", lat: 33.2541, lng: 126.5600 },
];

/** 전체 지역 */
export const ALL_DISTRICTS: District[] = [
  ...SEOUL, ...GYEONGGI, ...INCHEON,
  ...BUSAN, ...DAEGU, ...GWANGJU, ...DAEJEON, ...ULSAN,
  ...SEJONG, ...CHUNGBUK, ...CHUNGNAM, ...JEONBUK, ...JEONNAM,
  ...GYEONGBUK, ...GYEONGNAM, ...GANGWON, ...JEJU,
];

// ──────────────────────────────────────────────────────────
// 사전 정의 데이터
// ──────────────────────────────────────────────────────────

/** 강/하천 인접 점수 (0~100) */
export const RIVER_SCORES: Record<string, number> = {
  // 서울
  gangnam: 60, gangdong: 70, gangbuk: 30, gangseo: 80,
  gwanak: 25, gwangjin: 85, guro: 40, geumcheon: 30,
  nowon: 45, dobong: 40, dongdaemun: 35, dongjak: 75,
  mapo: 90, seodaemun: 30, seocho: 55, seongdong: 90,
  seongbuk: 25, songpa: 80, yangcheon: 60, yeongdeungpo: 85,
  yongsan: 95, eunpyeong: 35, jongno: 50, junggu: 55, jungnang: 60,
  // 경기
  sw_jangan: 35, sw_gwonseon: 40, sw_paldal: 30, sw_yeongtong: 45,
  sn_sujeong: 50, sn_jungwon: 55, sn_bundang: 60,
  gy_deogyang: 50, gy_ilsandong: 70, gy_ilsanseo: 65,
  yi_cheoin: 40, yi_giheung: 45, yi_suji: 50,
  as_sangnok: 55, as_danwon: 60,
  ay_manan: 45, ay_dongan: 40,
  bucheon: 35, namyangju: 75, hwaseong: 50,
  uijeongbu: 40, siheung: 55, paju: 60,
  gwangmyeong: 30, gimpo: 70, gunpo: 35,
  hanam: 85, guri: 80, gwacheon: 40, osan: 35,
  // 인천
  ic_junggu: 80, ic_donggu: 60, ic_michuhol: 40, ic_yeonsu: 85,
  ic_namdong: 50, ic_bupyeong: 35, ic_gyeyang: 45, ic_seogu: 55,
  // 부산
  bs_gangseo: 70, bs_geumjeong: 45, bs_gijang: 55, bs_nam: 60,
  bs_dong: 50, bs_dongnae: 40, bs_busanjin: 35, bs_buk: 50,
  bs_sasang: 55, bs_saha: 65, bs_seo: 45, bs_suyeong: 85,
  bs_yeonje: 30, bs_yeongdo: 75, bs_jung: 55, bs_haeundae: 80,
  // 대구
  dg_nam: 35, dg_dalseo: 40, dg_dalseong: 60, dg_dong: 50,
  dg_buk: 45, dg_seo: 35, dg_suseong: 70, dg_jung: 30,
  // 광주
  gj_gwangsan: 55, gj_nam: 50, gj_dong: 45, gj_buk: 60, gj_seo: 40,
  // 대전
  dj_daedeok: 55, dj_dong: 45, dj_seo: 50, dj_yuseong: 60, dj_jung: 40,
  // 울산
  us_nam: 50, us_dong: 65, us_buk: 45, us_ulju: 70, us_jung: 40,
  // 세종
  sejong: 55,
  // 충북
  cj_sangdang: 40, cj_seowon: 35, cj_heungdeok: 45, cj_cheongwon: 50,
  // 충남
  ca_dongnam: 40, ca_seobuk: 35, asan: 45,
  // 전북
  jj_wansan: 45, jj_deokjin: 50, gunsan: 60, iksan: 40,
  // 전남
  yeosu: 80, suncheon: 65, mokpo: 70,
  // 경북
  ph_nam: 55, ph_buk: 50, gumi: 45, gyeongju: 55, gimcheon: 50,
  // 경남
  cw_uichang: 45, cw_seongsan: 40, cw_masanhappo: 60, cw_masanhoewon: 35, cw_jinhae: 70, gimhae: 50, jinju: 55,
  // 강원
  chuncheon: 60, wonju: 50, gangneung: 75,
  // 제주
  jejusi: 65, seogwipo: 70,
};

/** 녹지 비율 점수 (0~100) */
export const NATURE_RATIO_SCORES: Record<string, number> = {
  // 서울
  gangnam: 45, gangdong: 55, gangbuk: 80, gangseo: 50,
  gwanak: 85, gwangjin: 50, guro: 40, geumcheon: 35,
  nowon: 75, dobong: 85, dongdaemun: 30, dongjak: 55,
  mapo: 55, seodaemun: 65, seocho: 70, seongdong: 55,
  seongbuk: 70, songpa: 50, yangcheon: 35, yeongdeungpo: 40,
  yongsan: 55, eunpyeong: 70, jongno: 75, junggu: 50, jungnang: 55,
  // 경기
  sw_jangan: 40, sw_gwonseon: 45, sw_paldal: 25, sw_yeongtong: 50,
  sn_sujeong: 55, sn_jungwon: 40, sn_bundang: 65,
  gy_deogyang: 60, gy_ilsandong: 55, gy_ilsanseo: 50,
  yi_cheoin: 80, yi_giheung: 60, yi_suji: 55,
  as_sangnok: 50, as_danwon: 45,
  ay_manan: 55, ay_dongan: 50,
  bucheon: 35, namyangju: 80, hwaseong: 60,
  uijeongbu: 65, siheung: 50, paju: 75,
  gwangmyeong: 40, gimpo: 55, gunpo: 50,
  hanam: 70, guri: 65, gwacheon: 85, osan: 45,
  // 인천
  ic_junggu: 50, ic_donggu: 35, ic_michuhol: 30, ic_yeonsu: 55,
  ic_namdong: 45, ic_bupyeong: 40, ic_gyeyang: 60, ic_seogu: 50,
  // 부산
  bs_gangseo: 65, bs_geumjeong: 75, bs_gijang: 60, bs_nam: 45,
  bs_dong: 30, bs_dongnae: 55, bs_busanjin: 35, bs_buk: 50,
  bs_sasang: 40, bs_saha: 50, bs_seo: 30, bs_suyeong: 40,
  bs_yeonje: 45, bs_yeongdo: 35, bs_jung: 25, bs_haeundae: 55,
  // 대구
  dg_nam: 40, dg_dalseo: 50, dg_dalseong: 75, dg_dong: 60,
  dg_buk: 55, dg_seo: 35, dg_suseong: 65, dg_jung: 30,
  // 광주
  gj_gwangsan: 55, gj_nam: 50, gj_dong: 60, gj_buk: 65, gj_seo: 45,
  // 대전
  dj_daedeok: 55, dj_dong: 50, dj_seo: 45, dj_yuseong: 75, dj_jung: 35,
  // 울산
  us_nam: 40, us_dong: 35, us_buk: 50, us_ulju: 80, us_jung: 45,
  // 세종
  sejong: 65,
  // 충북
  cj_sangdang: 50, cj_seowon: 45, cj_heungdeok: 55, cj_cheongwon: 60,
  // 충남
  ca_dongnam: 45, ca_seobuk: 50, asan: 55,
  // 전북
  jj_wansan: 50, jj_deokjin: 55, gunsan: 45, iksan: 40,
  // 전남
  yeosu: 50, suncheon: 70, mokpo: 40,
  // 경북
  ph_nam: 45, ph_buk: 50, gumi: 40, gyeongju: 55, gimcheon: 50,
  // 경남
  cw_uichang: 50, cw_seongsan: 45, cw_masanhappo: 40, cw_masanhoewon: 45, cw_jinhae: 55, gimhae: 50, jinju: 55,
  // 강원
  chuncheon: 65, wonju: 55, gangneung: 60,
  // 제주
  jejusi: 60, seogwipo: 70,
};

/** 버스정류장 밀도 점수 (0~100) */
export const BUS_DENSITY_SCORES: Record<string, number> = {
  // 서울
  gangnam: 90, gangdong: 65, gangbuk: 55, gangseo: 70,
  gwanak: 65, gwangjin: 70, guro: 65, geumcheon: 55,
  nowon: 65, dobong: 55, dongdaemun: 75, dongjak: 70,
  mapo: 85, seodaemun: 70, seocho: 80, seongdong: 75,
  seongbuk: 65, songpa: 80, yangcheon: 65, yeongdeungpo: 80,
  yongsan: 80, eunpyeong: 60, jongno: 90, junggu: 95, jungnang: 55,
  // 경기
  sw_jangan: 65, sw_gwonseon: 60, sw_paldal: 70, sw_yeongtong: 65,
  sn_sujeong: 60, sn_jungwon: 60, sn_bundang: 75,
  gy_deogyang: 55, gy_ilsandong: 60, gy_ilsanseo: 55,
  yi_cheoin: 35, yi_giheung: 55, yi_suji: 60,
  as_sangnok: 55, as_danwon: 50,
  ay_manan: 60, ay_dongan: 65,
  bucheon: 70, namyangju: 45, hwaseong: 40,
  uijeongbu: 60, siheung: 50, paju: 40,
  gwangmyeong: 65, gimpo: 45, gunpo: 60,
  hanam: 55, guri: 60, gwacheon: 55, osan: 50,
  // 인천
  ic_junggu: 55, ic_donggu: 55, ic_michuhol: 65, ic_yeonsu: 70,
  ic_namdong: 65, ic_bupyeong: 70, ic_gyeyang: 60, ic_seogu: 55,
  // 부산
  bs_gangseo: 45, bs_geumjeong: 55, bs_gijang: 40, bs_nam: 70,
  bs_dong: 65, bs_dongnae: 65, bs_busanjin: 80, bs_buk: 60,
  bs_sasang: 65, bs_saha: 55, bs_seo: 60, bs_suyeong: 70,
  bs_yeonje: 70, bs_yeongdo: 50, bs_jung: 75, bs_haeundae: 70,
  // 대구
  dg_nam: 65, dg_dalseo: 70, dg_dalseong: 40, dg_dong: 55,
  dg_buk: 65, dg_seo: 60, dg_suseong: 75, dg_jung: 80,
  // 광주
  gj_gwangsan: 60, gj_nam: 70, gj_dong: 75, gj_buk: 65, gj_seo: 70,
  // 대전
  dj_daedeok: 55, dj_dong: 60, dj_seo: 70, dj_yuseong: 65, dj_jung: 75,
  // 울산
  us_nam: 70, us_dong: 60, us_buk: 55, us_ulju: 40, us_jung: 65,
  // 세종
  sejong: 60,
  // 충북
  cj_sangdang: 60, cj_seowon: 55, cj_heungdeok: 65, cj_cheongwon: 50,
  // 충남
  ca_dongnam: 65, ca_seobuk: 60, asan: 55,
  // 전북
  jj_wansan: 65, jj_deokjin: 60, gunsan: 55, iksan: 55,
  // 전남
  yeosu: 55, suncheon: 55, mokpo: 60,
  // 경북
  ph_nam: 60, ph_buk: 55, gumi: 60, gyeongju: 50, gimcheon: 50,
  // 경남
  cw_uichang: 60, cw_seongsan: 65, cw_masanhappo: 55, cw_masanhoewon: 60, cw_jinhae: 50, gimhae: 55, jinju: 55,
  // 강원
  chuncheon: 55, wonju: 60, gangneung: 50,
  // 제주
  jejusi: 55, seogwipo: 45,
};

/** 구/시별 한줄 설명 */
export const DISTRICT_DESCRIPTIONS: Record<string, string> = {
  // ── 서울 ──
  gangnam: "강남구는 테헤란로 중심의 비즈니스 밀집 지역으로, 교통과 생활 인프라가 잘 갖춰져 있습니다.",
  gangdong: "강동구는 한강과 가까운 주거 중심 지역으로, 올림픽공원과 고덕천 등 녹지가 풍부합니다.",
  gangbuk: "강북구는 북한산과 가까워 자연환경이 뛰어나고, 비교적 조용한 주거 환경을 제공합니다.",
  gangseo: "강서구는 마곡지구 개발로 인프라가 빠르게 성장 중이며, 한강 접근성이 좋습니다.",
  gwanak: "관악구는 서울대와 관악산을 품은 지역으로, 학생·청년층 비율이 높고 생활비가 상대적으로 저렴합니다.",
  gwangjin: "광진구는 건대입구·뚝섬 상권이 활발하며, 한강과 어린이대공원 등 여가 시설이 풍부합니다.",
  guro: "구로구는 디지털단지 중심의 직주근접 지역으로, 대중교통이 편리합니다.",
  geumcheon: "금천구는 가산디지털단지가 있어 직주근접에 유리하며, 생활비가 저렴한 편입니다.",
  nowon: "노원구는 수락산·불암산 등 자연환경이 좋고, 학원가가 밀집한 교육 중심 지역입니다.",
  dobong: "도봉구는 도봉산 접근성이 뛰어나고, 조용하고 안전한 주거 환경이 장점입니다.",
  dongdaemun: "동대문구는 경희대·한국외대가 있는 대학가로, 교통이 편리하고 생활비가 적당합니다.",
  dongjak: "동작구는 한강 접근성이 좋고, 사당역·이수역 상권이 활발한 교통 요지입니다.",
  mapo: "마포구는 홍대·합정·연남동 상권 덕분에 카페와 문화시설이 밀집한 젊은 지역입니다.",
  seodaemun: "서대문구는 연세대·이대 등 대학가로, 자연과 도심이 공존하는 환경입니다.",
  seocho: "서초구는 교대·법원·예술의전당이 있는 지역으로, 교육·문화·교통 인프라가 고르게 발달했습니다.",
  seongdong: "성동구는 성수동·서울숲을 중심으로 빠르게 발전 중이며, 한강 접근성이 뛰어납니다.",
  seongbuk: "성북구는 고려대·성신여대 일대 대학가로, 북악산과 가까워 자연환경이 좋습니다.",
  songpa: "송파구는 잠실·석촌호수·올림픽공원이 있는 인프라 풍부한 대규모 주거 지역입니다.",
  yangcheon: "양천구는 목동을 중심으로 교육 인프라가 뛰어난 가족 친화 지역입니다.",
  yeongdeungpo: "영등포구는 여의도·영등포역 상권이 발달했으며, 한강 접근성과 교통이 우수합니다.",
  yongsan: "용산구는 이태원·한남동 등 국제적인 분위기와 한강·남산 자연환경을 동시에 누릴 수 있습니다.",
  eunpyeong: "은평구는 북한산 자락에 위치해 자연환경이 뛰어나고, 은평뉴타운 등 쾌적한 주거지가 있습니다.",
  jongno: "종로구는 경복궁·인사동 등 역사·문화 자원이 풍부하고, 서울 도심 접근성이 최고입니다.",
  junggu: "중구는 서울 최중심부로 교통과 편의시설이 밀집해 있으며, 명동·을지로 상권이 활발합니다.",
  jungnang: "중랑구는 중랑천을 끼고 있어 산책·자전거 여건이 좋고, 주거비가 상대적으로 저렴합니다.",
  // ── 경기 ──
  sw_jangan: "수원 장안구는 수원화성·팔달문이 가깝고, 전통시장과 주거지가 어우러진 지역입니다.",
  sw_gwonseon: "수원 권선구는 대규모 택지지구와 산업단지가 공존하는 직주근접 지역입니다.",
  sw_paldal: "수원 팔달구는 수원역·수원화성 중심의 구도심으로, 상권과 교통이 밀집해 있습니다.",
  sw_yeongtong: "수원 영통구는 삼성전자 인근의 신도시 지역으로, 젊은 직장인이 많고 인프라가 잘 갖춰져 있습니다.",
  sn_sujeong: "성남 수정구는 모란시장과 위례신도시가 있는 지역으로, 서울 접근성이 좋습니다.",
  sn_jungwon: "성남 중원구는 성남시 중심부로, 8호선과 신분당선이 지나가 교통이 편리합니다.",
  sn_bundang: "분당구는 판교테크노밸리·정자역 상권이 발달한 신도시로, 교육·교통 인프라가 우수합니다.",
  gy_deogyang: "고양 덕양구는 삼송지구·향동지구 등 신규 택지가 개발 중인 성장 지역입니다.",
  gy_ilsandong: "일산동구는 호수공원·킨텍스가 있는 일산 신도시의 중심으로, 녹지와 상권이 균형 잡혀 있습니다.",
  gy_ilsanseo: "일산서구는 대화역·주엽역 중심의 주거 지역으로, 호수공원 접근성이 좋습니다.",
  yi_cheoin: "용인 처인구는 에버랜드·한국민속촌이 있는 자연 친화 지역이며, 용인시청 소재지입니다.",
  yi_giheung: "용인 기흥구는 삼성반도체 인근의 직주근접 지역으로, 신갈·구갈 상권이 활발합니다.",
  yi_suji: "용인 수지구는 강남 접근성이 좋은 주거 신도시로, 교육열이 높고 카페·맛집이 많습니다.",
  as_sangnok: "안산 상록구는 안산시 주거 중심 지역으로, 수리산과 안산호수공원이 있습니다.",
  as_danwon: "안산 단원구는 반월공단·시화호 인근의 산업·주거 복합 지역입니다.",
  ay_manan: "안양 만안구는 안양역·만안구청 중심의 구도심으로, 관악산 접근성이 좋습니다.",
  ay_dongan: "안양 동안구는 평촌신도시를 품은 교육·주거 특화 지역입니다.",
  bucheon: "부천시는 서울·인천 사이의 교통 요지로, 문화도시 브랜드와 함께 인프라가 밀집해 있습니다.",
  namyangju: "남양주시는 다산신도시·별내신도시 등 대규모 택지가 개발되며, 자연환경이 뛰어납니다.",
  hwaseong: "화성시는 동탄신도시 중심으로 빠르게 성장 중이며, 삼성전자 반도체 인근의 직주근접 지역입니다.",
  uijeongbu: "의정부시는 1호선·경전철 교통이 편리하고, 부대찌개 거리 등 독자적 상권이 있습니다.",
  siheung: "시흥시는 배곧신도시와 시화호 레저 시설이 있는 성장형 도시입니다.",
  paju: "파주시는 운정신도시 중심의 주거지로, 출판도시·헤이리 등 문화 시설이 특색 있습니다.",
  gwangmyeong: "광명시는 KTX 광명역과 이케아가 있어 서울 접근성이 뛰어난 소형 도시입니다.",
  gimpo: "김포시는 한강신도시·구래동 중심으로 개발이 활발하며, 김포공항 접근성이 좋습니다.",
  gunpo: "군포시는 산본신도시를 품은 안정적 주거 지역으로, 수리산 접근성이 좋습니다.",
  hanam: "하남시는 미사강변도시·감일지구가 있어 한강 접근성이 뛰어나고, 스타필드가 대표 시설입니다.",
  guri: "구리시는 왕숙천·한강이 만나는 지역으로, 서울 도심 접근성이 좋고 자연환경이 쾌적합니다.",
  gwacheon: "과천시는 서울대공원·경마공원·관악산에 둘러싸인 녹지율 최고의 도시입니다.",
  osan: "오산시는 수도권 남부의 소형 도시로, 세교신도시 개발과 함께 인프라가 확충 중입니다.",
  // ── 인천 ──
  ic_junggu: "인천 중구는 차이나타운·월미도·인천공항이 있는 관광·교통 중심지입니다.",
  ic_donggu: "인천 동구는 인천역·동인천역 중심의 구도심으로, 재개발이 진행 중입니다.",
  ic_michuhol: "인천 미추홀구는 인천시청 소재지로, 수봉공원과 숭의동 상권이 있습니다.",
  ic_yeonsu: "인천 연수구는 송도국제도시를 품은 지역으로, 센트럴파크와 최신 인프라가 돋보입니다.",
  ic_namdong: "인천 남동구는 소래습지·논현 상권이 있으며, 인천 최대 인구를 가진 주거 중심 지역입니다.",
  ic_bupyeong: "인천 부평구는 부평역 지하상가·부평시장이 유명하며, 1호선·7호선 교통이 편리합니다.",
  ic_gyeyang: "인천 계양구는 계양산이 있어 자연환경이 좋고, GTX-B 개통 예정으로 교통 호재가 기대됩니다.",
  ic_seogu: "인천 서구는 청라국제도시·루원시티 등 대규모 신도시가 개발된 성장 지역입니다.",
  // ── 부산 ──
  bs_gangseo: "부산 강서구는 에코델타시티·명지국제신도시가 개발 중인 부산의 미래 성장 거점입니다.",
  bs_geumjeong: "부산 금정구는 금정산과 범어사가 있는 자연 친화 지역으로, 부산대학교가 위치해 있습니다.",
  bs_gijang: "부산 기장군은 해안선을 따라 일광·정관 신도시가 있으며, 동부산 개발의 중심지입니다.",
  bs_nam: "부산 남구는 UN기념공원·부산문화회관이 있는 문화·교육 중심 주거 지역입니다.",
  bs_dong: "부산 동구는 부산항·부산역이 가까운 구도심으로, 이바구길 등 관광 자원이 있습니다.",
  bs_dongnae: "부산 동래구는 동래온천·금정산이 있으며, 교통과 교육 인프라가 잘 갖춰진 전통 주거지입니다.",
  bs_busanjin: "부산 부산진구는 서면 상권이 위치한 부산 최대 번화가로, 교통과 상업 시설이 밀집해 있습니다.",
  bs_buk: "부산 북구는 구포시장·화명생태공원이 있으며, 부산 북부의 주거 중심 지역입니다.",
  bs_sasang: "부산 사상구는 사상공업지역과 서부터미널이 있는 교통·산업 요지입니다.",
  bs_saha: "부산 사하구는 다대포해수욕장·감천문화마을이 있으며, 낙동강 하구와 바다를 모두 접합니다.",
  bs_seo: "부산 서구는 송도해수욕장·암남공원이 있는 해안 지역으로, 원도심 재생이 진행 중입니다.",
  bs_suyeong: "부산 수영구는 광안리해수욕장·F1963이 있어 문화·여가 생활이 풍부한 인기 주거지입니다.",
  bs_yeonje: "부산 연제구는 부산시청·종합운동장이 있는 행정 중심지로, 생활 편의시설이 잘 갖춰져 있습니다.",
  bs_yeongdo: "부산 영도구는 태종대·흰여울마을이 있는 섬 지역으로, 독특한 해안 경관이 매력입니다.",
  bs_jung: "부산 중구는 남포동·자갈치시장·BIFF거리가 있는 부산 원도심의 상업·관광 중심지입니다.",
  bs_haeundae: "부산 해운대구는 해운대해수욕장·센텀시티·벡스코가 있는 부산 대표 관광·주거 지역입니다.",
  // ── 대구 ──
  dg_nam: "대구 남구는 앞산공원·대명동 문화거리가 있으며, 대구 남부의 주거·문화 지역입니다.",
  dg_dalseo: "대구 달서구는 대구 최대 인구 지역으로, 성서공단과 대규모 아파트단지가 밀집해 있습니다.",
  dg_dalseong: "대구 달성군은 테크노폴리스·비슬산이 있으며, 대구의 외곽 성장 거점입니다.",
  dg_dong: "대구 동구는 동대구역·아양기찻길이 있는 교통 요지로, 신서혁신도시가 개발 중입니다.",
  dg_buk: "대구 북구는 칠곡·관문시장이 있으며, 경북대학교와 함께 교육·주거 중심 지역입니다.",
  dg_seo: "대구 서구는 대구 서부의 주거 지역으로, 비산동·내당동 등 생활 밀착형 상권이 있습니다.",
  dg_suseong: "대구 수성구는 수성못·범어 상권이 있는 대구 대표 교육·주거 명품 지역입니다.",
  dg_jung: "대구 중구는 동성로·서문시장이 있는 대구 최중심부로, 상업·문화 시설이 밀집해 있습니다.",
  // ── 광주 ──
  gj_gwangsan: "광주 광산구는 하남산업단지·수완지구가 있으며, 광주 최대 인구의 성장형 지역입니다.",
  gj_nam: "광주 남구는 양림동 역사문화마을·사직공원이 있으며, 문화·예술의 중심지입니다.",
  gj_dong: "광주 동구는 충장로·국립아시아문화전당이 있는 광주 원도심의 문화 중심지입니다.",
  gj_buk: "광주 북구는 전남대학교·중외공원이 있으며, 교육과 자연환경이 조화로운 지역입니다.",
  gj_seo: "광주 서구는 상무지구를 중심으로 행정·상업 기능이 집중된 광주의 새 중심지입니다.",
  // ── 대전 ──
  dj_daedeok: "대전 대덕구는 대덕연구단지와 인접하며, 신탄진·법동 등 산업·주거가 공존하는 지역입니다.",
  dj_dong: "대전 동구는 대전역·중앙시장이 있는 구도심으로, 대동하늘공원 등 재생사업이 활발합니다.",
  dj_seo: "대전 서구는 둔산 행정타운·갤러리아 등 대전의 행정·상업 중심지입니다.",
  dj_yuseong: "대전 유성구는 KAIST·충남대·유성온천이 있는 대전 대표 교육·연구 도시입니다.",
  dj_jung: "대전 중구는 대전 원도심으로, 은행동·중앙로 상권과 보문산이 어우러진 지역입니다.",
  // ── 울산 ──
  us_nam: "울산 남구는 삼산동·신정동 중심의 울산 최대 상권으로, 교통과 편의시설이 밀집해 있습니다.",
  us_dong: "울산 동구는 현대중공업·대왕암공원이 있으며, 산업과 해안 관광이 공존하는 지역입니다.",
  us_buk: "울산 북구는 현대자동차 공장과 염포산·강동 해안이 있는 산업·자연 복합 지역입니다.",
  us_ulju: "울산 울주군은 간절곶·영남알프스가 있으며, 울산 외곽의 자연 친화 광역 지역입니다.",
  us_jung: "울산 중구는 성남동·태화강국가정원이 있는 울산의 행정·문화 중심지입니다.",
  // ── 세종 ──
  sejong: "세종시는 정부세종청사가 위치한 행정수도로, 신도시 인프라가 잘 갖춰져 있고 호수공원·세종중앙공원이 매력적입니다.",
  // ── 충북 ──
  cj_sangdang: "청주 상당구는 청주 구도심으로, 성안길 상권과 수암골 벽화마을이 있는 생활·문화 중심지입니다.",
  cj_seowon: "청주 서원구는 충북대학교·무심천이 있으며, 대학가와 주거지가 어우러진 지역입니다.",
  cj_heungdeok: "청주 흥덕구는 복대동·가경동 중심의 신시가지로, 청주 최대 상권과 편의시설이 집중된 곳입니다.",
  cj_cheongwon: "청주 청원구는 오송생명과학단지·오창산업단지가 있으며, KTX 오송역이 가까운 성장 지역입니다.",
  // ── 충남 ──
  ca_dongnam: "천안 동남구는 천안역·신부동 상권이 있는 천안의 구도심으로, 교통과 상업 시설이 밀집해 있습니다.",
  ca_seobuk: "천안 서북구는 불당·백석동 중심의 신도시 지역으로, 대규모 아파트단지와 상권이 발달했습니다.",
  asan: "아산시는 온양온천·현충사가 있으며, KTX 천안아산역과 삼성디스플레이로 성장 중인 도시입니다.",
  // ── 전북 ──
  jj_wansan: "전주 완산구는 한옥마을·전주천이 있는 전주의 문화·관광 중심지로, 전통과 현대가 공존합니다.",
  jj_deokjin: "전주 덕진구는 전북대학교·덕진공원이 있으며, 혁신도시와 함께 성장 중인 교육·주거 지역입니다.",
  gunsan: "군산시는 근대문화유산과 새만금이 있는 항구도시로, 독특한 역사적 분위기와 해안 경관이 매력입니다.",
  iksan: "익산시는 KTX 정차역·보석박물관이 있으며, 전북 서부의 교통 요지이자 산업·주거 도시입니다.",
  // ── 전남 ──
  yeosu: "여수시는 여수밤바다·오동도·엑스포해양공원이 있는 해양관광 도시로, 석유화학단지와 공존합니다.",
  suncheon: "순천시는 순천만국가정원·순천만습지가 있는 대한민국 대표 생태도시로, 자연환경이 뛰어납니다.",
  mokpo: "목포시는 유달산·목포대교·근대역사문화거리가 있는 전남 서남부의 해양·관광 도시입니다.",
  // ── 경북 ──
  ph_nam: "포항 남구는 포스코 본사·영일대해수욕장이 있으며, 산업과 해안 관광이 공존하는 포항의 중심지입니다.",
  ph_buk: "포항 북구는 죽도시장·포항역이 있는 포항 구도심으로, 환호공원과 포항운하가 있습니다.",
  gumi: "구미시는 구미국가산업단지 중심의 전자·IT 산업도시로, 금오산과 낙동강이 자연환경을 제공합니다.",
  gyeongju: "경주시는 불국사·첨성대 등 천년 고도의 역사 자원과 보문관광단지가 있는 문화·관광 도시입니다.",
  gimcheon: "김천시는 경부선·경북선이 만나는 교통 요지로, KTX 김천구미역과 직지사가 있습니다.",
  // ── 경남 ──
  cw_uichang: "창원 의창구는 창원시청·용지호수가 있는 창원의 행정 중심지로, 계획도시 인프라가 잘 갖춰져 있습니다.",
  cw_seongsan: "창원 성산구는 창원컨벤션센터·반송동 상권이 있으며, 창원 신도심의 상업·주거 중심지입니다.",
  cw_masanhappo: "창원 마산합포구는 마산항·어시장이 있는 해안 지역으로, 마산의 전통 상권과 바다가 매력입니다.",
  cw_masanhoewon: "창원 마산회원구는 마산 내륙 지역의 주거 중심지로, 3·15의거 기념관과 무학산이 있습니다.",
  cw_jinhae: "창원 진해구는 군항제·벚꽃으로 유명한 해군 도시로, 해양공원과 진해만 경관이 아름답습니다.",
  gimhae: "김해시는 김해공항·가야 유적이 있으며, 부산과 인접한 수도권급 성장 도시입니다.",
  jinju: "진주시는 진주성·남강이 있는 경남 서부의 거점도시로, 진주남강유등축제가 유명합니다.",
  // ── 강원 ──
  chuncheon: "춘천시는 소양호·남이섬·닭갈비골목이 있는 강원도청 소재지로, 자연과 맛의 도시입니다.",
  wonju: "원주시는 치악산국립공원과 혁신도시가 있으며, 강원도 남부의 교통·행정 중심지입니다.",
  gangneung: "강릉시는 경포대·안목해변·오죽헌이 있는 동해안 대표 관광도시로, KTX로 서울과 2시간 거리입니다.",
  // ── 제주 ──
  jejusi: "제주시는 제주공항·탑동·연동 상권이 있는 제주도의 행정·경제 중심지로, 한라산 북측에 위치합니다.",
  seogwipo: "서귀포시는 중문관광단지·천지연폭포·올레길이 있는 제주도 남부의 자연·관광 중심지입니다.",
};
