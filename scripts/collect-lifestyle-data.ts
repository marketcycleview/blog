/**
 * 라이프스타일 데이터 수집 스크립트
 * 카카오 Local REST API로 수도권 구/시별 POI 카운트를 수집합니다.
 *
 * 사용법:
 *   npx tsx scripts/collect-lifestyle-data.ts          # 전체 수집
 *   npx tsx scripts/collect-lifestyle-data.ts --only gyeonggi incheon  # 특정 지역만
 *
 * 필요 환경변수: KAKAO_REST_API_KEY (.env.local)
 */

import fs from "fs";
import path from "path";

// ──────────────────────────────────────────────────────────
// 1. 수도권 전체 지역 (서울 25 + 경기 30 + 인천 8 = 63개)
// ──────────────────────────────────────────────────────────

interface DistrictDef {
  code: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
}

const DISTRICTS: DistrictDef[] = [
  // ── 서울 25개 구 ──
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

  // ── 경기도 30개 시/구 ──
  { code: "sw_jangan", name: "수원 장안구", region: "gyeonggi", lat: 37.3005, lng: 127.0108 },
  { code: "sw_gwonseon", name: "수원 권선구", region: "gyeonggi", lat: 37.2572, lng: 126.9717 },
  { code: "sw_paldal", name: "수원 팔달구", region: "gyeonggi", lat: 37.2794, lng: 127.0131 },
  { code: "sw_yeongtong", name: "수원 영통구", region: "gyeonggi", lat: 37.2596, lng: 127.0465 },
  { code: "sn_sujeong", name: "성남 수정구", region: "gyeonggi", lat: 37.4508, lng: 127.1458 },
  { code: "sn_jungwon", name: "성남 중원구", region: "gyeonggi", lat: 37.4315, lng: 127.1372 },
  { code: "sn_bundang", name: "성남 분당구", region: "gyeonggi", lat: 37.3825, lng: 127.1190 },
  { code: "gy_deogyang", name: "고양 덕양구", region: "gyeonggi", lat: 37.6373, lng: 126.8322 },
  { code: "gy_ilsandong", name: "고양 일산동구", region: "gyeonggi", lat: 37.6586, lng: 126.7741 },
  { code: "gy_ilsanseo", name: "고양 일산서구", region: "gyeonggi", lat: 37.6750, lng: 126.7520 },
  { code: "yi_cheoin", name: "용인 처인구", region: "gyeonggi", lat: 37.2340, lng: 127.2014 },
  { code: "yi_giheung", name: "용인 기흥구", region: "gyeonggi", lat: 37.2804, lng: 127.1153 },
  { code: "yi_suji", name: "용인 수지구", region: "gyeonggi", lat: 37.3220, lng: 127.0980 },
  { code: "as_sangnok", name: "안산 상록구", region: "gyeonggi", lat: 37.3010, lng: 126.8466 },
  { code: "as_danwon", name: "안산 단원구", region: "gyeonggi", lat: 37.3185, lng: 126.7988 },
  { code: "ay_manan", name: "안양 만안구", region: "gyeonggi", lat: 37.3866, lng: 126.9217 },
  { code: "ay_dongan", name: "안양 동안구", region: "gyeonggi", lat: 37.3943, lng: 126.9568 },
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

  // ── 인천 8개 구 ──
  { code: "ic_junggu", name: "인천 중구", region: "incheon", lat: 37.4736, lng: 126.6214 },
  { code: "ic_donggu", name: "인천 동구", region: "incheon", lat: 37.4735, lng: 126.6432 },
  { code: "ic_michuhol", name: "인천 미추홀구", region: "incheon", lat: 37.4424, lng: 126.6531 },
  { code: "ic_yeonsu", name: "인천 연수구", region: "incheon", lat: 37.4100, lng: 126.6784 },
  { code: "ic_namdong", name: "인천 남동구", region: "incheon", lat: 37.4488, lng: 126.7309 },
  { code: "ic_bupyeong", name: "인천 부평구", region: "incheon", lat: 37.5074, lng: 126.7218 },
  { code: "ic_gyeyang", name: "인천 계양구", region: "incheon", lat: 37.5372, lng: 126.7376 },
  { code: "ic_seogu", name: "인천 서구", region: "incheon", lat: 37.5457, lng: 126.6760 },

  // ── 부산 16개 구/군 ──
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

  // ── 대구 8개 구/군 ──
  { code: "dg_nam", name: "대구 남구", region: "daegu", lat: 35.8460, lng: 128.5977 },
  { code: "dg_dalseo", name: "대구 달서구", region: "daegu", lat: 35.8297, lng: 128.5327 },
  { code: "dg_dalseong", name: "대구 달성군", region: "daegu", lat: 35.7745, lng: 128.4319 },
  { code: "dg_dong", name: "대구 동구", region: "daegu", lat: 35.8863, lng: 128.6357 },
  { code: "dg_buk", name: "대구 북구", region: "daegu", lat: 35.8858, lng: 128.5828 },
  { code: "dg_seo", name: "대구 서구", region: "daegu", lat: 35.8718, lng: 128.5592 },
  { code: "dg_suseong", name: "대구 수성구", region: "daegu", lat: 35.8584, lng: 128.6318 },
  { code: "dg_jung", name: "대구 중구", region: "daegu", lat: 35.8698, lng: 128.6061 },

  // ── 광주 5개 구 ──
  { code: "gj_gwangsan", name: "광주 광산구", region: "gwangju", lat: 35.1396, lng: 126.7935 },
  { code: "gj_nam", name: "광주 남구", region: "gwangju", lat: 35.1327, lng: 126.9024 },
  { code: "gj_dong", name: "광주 동구", region: "gwangju", lat: 35.1459, lng: 126.9232 },
  { code: "gj_buk", name: "광주 북구", region: "gwangju", lat: 35.1745, lng: 126.9120 },
  { code: "gj_seo", name: "광주 서구", region: "gwangju", lat: 35.1520, lng: 126.8896 },

  // ── 대전 5개 구 ──
  { code: "dj_daedeok", name: "대전 대덕구", region: "daejeon", lat: 36.3468, lng: 127.4159 },
  { code: "dj_dong", name: "대전 동구", region: "daejeon", lat: 36.3120, lng: 127.4547 },
  { code: "dj_seo", name: "대전 서구", region: "daejeon", lat: 36.3553, lng: 127.3837 },
  { code: "dj_yuseong", name: "대전 유성구", region: "daejeon", lat: 36.3622, lng: 127.3561 },
  { code: "dj_jung", name: "대전 중구", region: "daejeon", lat: 36.3253, lng: 127.4214 },

  // ── 울산 5개 구/군 ──
  { code: "us_nam", name: "울산 남구", region: "ulsan", lat: 35.5444, lng: 129.3303 },
  { code: "us_dong", name: "울산 동구", region: "ulsan", lat: 35.5050, lng: 129.4167 },
  { code: "us_buk", name: "울산 북구", region: "ulsan", lat: 35.5828, lng: 129.3610 },
  { code: "us_ulju", name: "울산 울주군", region: "ulsan", lat: 35.5225, lng: 129.2432 },
  { code: "us_jung", name: "울산 중구", region: "ulsan", lat: 35.5699, lng: 129.3324 },

  // ── 세종 ──
  { code: "sejong", name: "세종시", region: "sejong", lat: 36.4800, lng: 127.2590 },

  // ── 충북 (청주 4구) ──
  { code: "cj_sangdang", name: "청주 상당구", region: "chungbuk", lat: 36.6358, lng: 127.4914 },
  { code: "cj_seowon", name: "청주 서원구", region: "chungbuk", lat: 36.6370, lng: 127.4700 },
  { code: "cj_heungdeok", name: "청주 흥덕구", region: "chungbuk", lat: 36.6430, lng: 127.4300 },
  { code: "cj_cheongwon", name: "청주 청원구", region: "chungbuk", lat: 36.7100, lng: 127.4900 },

  // ── 충남 (천안 2구 + 아산) ──
  { code: "ca_dongnam", name: "천안 동남구", region: "chungnam", lat: 36.8148, lng: 127.1714 },
  { code: "ca_seobuk", name: "천안 서북구", region: "chungnam", lat: 36.8600, lng: 127.1400 },
  { code: "asan", name: "아산시", region: "chungnam", lat: 36.7898, lng: 127.0018 },

  // ── 전북 (전주 2구 + 군산 + 익산) ──
  { code: "jj_wansan", name: "전주 완산구", region: "jeonbuk", lat: 35.8100, lng: 127.1200 },
  { code: "jj_deokjin", name: "전주 덕진구", region: "jeonbuk", lat: 35.8400, lng: 127.1300 },
  { code: "gunsan", name: "군산시", region: "jeonbuk", lat: 35.9676, lng: 126.7366 },
  { code: "iksan", name: "익산시", region: "jeonbuk", lat: 35.9483, lng: 126.9577 },

  // ── 전남 (여수 + 순천 + 목포) ──
  { code: "yeosu", name: "여수시", region: "jeonnam", lat: 34.7604, lng: 127.6622 },
  { code: "suncheon", name: "순천시", region: "jeonnam", lat: 34.9506, lng: 127.4874 },
  { code: "mokpo", name: "목포시", region: "jeonnam", lat: 34.8118, lng: 126.3922 },

  // ── 경북 (포항 2구 + 구미 + 경주 + 김천) ──
  { code: "ph_nam", name: "포항 남구", region: "gyeongbuk", lat: 36.0080, lng: 129.3590 },
  { code: "ph_buk", name: "포항 북구", region: "gyeongbuk", lat: 36.0418, lng: 129.3650 },
  { code: "gumi", name: "구미시", region: "gyeongbuk", lat: 36.1196, lng: 128.3441 },
  { code: "gyeongju", name: "경주시", region: "gyeongbuk", lat: 35.8562, lng: 129.2247 },
  { code: "gimcheon", name: "김천시", region: "gyeongbuk", lat: 36.1198, lng: 128.1136 },

  // ── 경남 (창원 5구 + 김해 + 진주) ──
  { code: "cw_uichang", name: "창원 의창구", region: "gyeongnam", lat: 35.2540, lng: 128.6387 },
  { code: "cw_seongsan", name: "창원 성산구", region: "gyeongnam", lat: 35.2000, lng: 128.7000 },
  { code: "cw_masanhappo", name: "창원 마산합포구", region: "gyeongnam", lat: 35.1800, lng: 128.5700 },
  { code: "cw_masanhoewon", name: "창원 마산회원구", region: "gyeongnam", lat: 35.2200, lng: 128.5800 },
  { code: "cw_jinhae", name: "창원 진해구", region: "gyeongnam", lat: 35.1500, lng: 128.6800 },
  { code: "gimhae", name: "김해시", region: "gyeongnam", lat: 35.2286, lng: 128.8892 },
  { code: "jinju", name: "진주시", region: "gyeongnam", lat: 35.1800, lng: 128.1076 },

  // ── 강원 (춘천 + 원주 + 강릉) ──
  { code: "chuncheon", name: "춘천시", region: "gangwon", lat: 37.8813, lng: 127.7300 },
  { code: "wonju", name: "원주시", region: "gangwon", lat: 37.3422, lng: 127.9202 },
  { code: "gangneung", name: "강릉시", region: "gangwon", lat: 37.7519, lng: 128.8760 },

  // ── 제주 ──
  { code: "jejusi", name: "제주시", region: "jeju", lat: 33.4996, lng: 126.5312 },
  { code: "seogwipo", name: "서귀포시", region: "jeju", lat: 33.2541, lng: 126.5600 },
];

// ──────────────────────────────────────────────────────────
// 2. 카테고리 검색 정의
// ──────────────────────────────────────────────────────────

interface SearchDef {
  id: string;
  type: "keyword" | "category" | "inverse";
  query: string;
}

const SEARCH_DEFS: SearchDef[] = [
  { id: "park", type: "keyword", query: "공원" },
  { id: "mountain", type: "keyword", query: "등산로" },
  { id: "trail", type: "keyword", query: "산책로 둘레길" },
  { id: "bike_road", type: "keyword", query: "자전거도로 자전거길" },
  { id: "gym", type: "keyword", query: "헬스장 피트니스" },
  { id: "swimming", type: "keyword", query: "수영장" },
  { id: "yoga", type: "keyword", query: "요가 필라테스" },
  { id: "futsal", type: "keyword", query: "풋살장 축구장" },
  { id: "tennis", type: "keyword", query: "테니스장" },
  { id: "golf", type: "keyword", query: "골프연습장 스크린골프" },
  { id: "climbing", type: "keyword", query: "클라이밍 볼더링" },
  { id: "bowling", type: "keyword", query: "볼링장" },
  { id: "cafe", type: "category", query: "CE7" },
  { id: "restaurant", type: "category", query: "FD6" },
  { id: "bakery", type: "keyword", query: "베이커리 빵집" },
  { id: "bar", type: "keyword", query: "와인바 칵테일바" },
  { id: "convenience", type: "category", query: "CS2" },
  { id: "mart", type: "category", query: "MT1" },
  { id: "market", type: "keyword", query: "전통시장 재래시장" },
  { id: "laundry", type: "keyword", query: "세탁소" },
  { id: "bank", type: "category", query: "BK9" },
  { id: "parking", type: "category", query: "PK6" },
  { id: "hospital", type: "keyword", query: "종합병원" },
  { id: "clinic", type: "category", query: "HP8" },
  { id: "pharmacy", type: "category", query: "PM9" },
  { id: "dentist", type: "keyword", query: "치과" },
  { id: "oriental", type: "keyword", query: "한의원" },
  { id: "subway", type: "category", query: "SW8" },
  { id: "ktx", type: "keyword", query: "KTX 기차역" },
  { id: "school", type: "category", query: "SC4" },
  { id: "academy", type: "category", query: "AC5" },
  { id: "kindergarten", type: "category", query: "PS3" },
  { id: "university", type: "keyword", query: "대학교" },
  { id: "library", type: "keyword", query: "도서관" },
  { id: "bookstore", type: "keyword", query: "서점" },
  { id: "cinema", type: "keyword", query: "영화관 CGV 메가박스 롯데시네마" },
  { id: "museum", type: "keyword", query: "미술관 박물관" },
  { id: "performance", type: "keyword", query: "공연장 극장" },
  { id: "quiet", type: "inverse", query: "유흥주점 노래방" },
  { id: "safe", type: "keyword", query: "경찰서 파출소" },
  { id: "vet", type: "keyword", query: "동물병원" },
  { id: "kids_cafe", type: "keyword", query: "키즈카페" },
  { id: "pediatric", type: "keyword", query: "소아과 소아청소년과" },
];

// ──────────────────────────────────────────────────────────
// 3. API 호출 함수
// ──────────────────────────────────────────────────────────

const KAKAO_BASE = "https://dapi.kakao.com/v2/local/search";
const RADIUS = 3000;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function searchCategory(apiKey: string, code: string, lng: number, lat: number): Promise<number> {
  const url = `${KAKAO_BASE}/category.json?category_group_code=${code}&x=${lng}&y=${lat}&radius=${RADIUS}&sort=distance&size=1`;
  const res = await fetch(url, { headers: { Authorization: `KakaoAK ${apiKey}` } });
  if (!res.ok) { console.error(`  ❌ category ${code} → ${res.status}`); return 0; }
  const json = await res.json();
  return json.meta?.total_count ?? 0;
}

async function searchKeyword(apiKey: string, keyword: string, lng: number, lat: number): Promise<number> {
  const url = `${KAKAO_BASE}/keyword.json?query=${encodeURIComponent(keyword)}&x=${lng}&y=${lat}&radius=${RADIUS}&sort=distance&size=1`;
  const res = await fetch(url, { headers: { Authorization: `KakaoAK ${apiKey}` } });
  if (!res.ok) { console.error(`  ❌ keyword "${keyword}" → ${res.status}`); return 0; }
  const json = await res.json();
  return json.meta?.total_count ?? 0;
}

// ──────────────────────────────────────────────────────────
// 4. 메인 수집 로직
// ──────────────────────────────────────────────────────────

async function main() {
  // .env.local에서 API 키 로드
  let apiKey = process.env.KAKAO_REST_API_KEY || "";
  if (!apiKey) {
    try {
      const envPath = path.join(process.cwd(), ".env.local");
      const envContent = fs.readFileSync(envPath, "utf-8");
      const match = envContent.match(/KAKAO_REST_API_KEY=(.+)/);
      if (match) apiKey = match[1].trim();
    } catch { /* ignore */ }
  }
  if (!apiKey) { console.error("❌ KAKAO_REST_API_KEY가 .env.local에 없습니다."); process.exit(1); }

  // --only 옵션: 특정 지역만 수집
  const args = process.argv.slice(2);
  const onlyIdx = args.indexOf("--only");
  const onlyRegions = onlyIdx >= 0 ? args.slice(onlyIdx + 1) : null;

  // 기존 데이터 로드 (--only 모드일 때 기존 데이터 유지)
  const outputDir = path.join(process.cwd(), "public", "data");
  const outputPath = path.join(outputDir, "lifestyle-scores.json");
  let existingData: Record<string, any> = {};
  if (onlyRegions && fs.existsSync(outputPath)) {
    try {
      const raw = JSON.parse(fs.readFileSync(outputPath, "utf-8"));
      for (const d of raw.districts || []) {
        existingData[d.code] = d;
      }
      console.log(`📂 기존 데이터 로드: ${Object.keys(existingData).length}개 지역\n`);
    } catch { /* ignore */ }
  }

  // 수집 대상 필터링
  const targets = onlyRegions
    ? DISTRICTS.filter((d) => onlyRegions.includes(d.region))
    : DISTRICTS;

  console.log("🚀 라이프스타일 데이터 수집 시작");
  if (onlyRegions) console.log(`   대상 지역: ${onlyRegions.join(", ")}`);
  console.log(`   수집 대상: ${targets.length}개`);
  console.log(`   카테고리: ${SEARCH_DEFS.length}개`);
  console.log(`   예상 API 호출: ${targets.length * SEARCH_DEFS.length}회\n`);

  const results: Array<{
    code: string;
    name: string;
    region: string;
    lat: number;
    lng: number;
    counts: Record<string, number>;
  }> = [];

  let totalCalls = 0;

  for (const district of targets) {
    console.log(`📍 ${district.name} (${district.code}) 수집 중...`);
    const counts: Record<string, number> = {};

    for (const def of SEARCH_DEFS) {
      const count = def.type === "category"
        ? await searchCategory(apiKey, def.query, district.lng, district.lat)
        : await searchKeyword(apiKey, def.query, district.lng, district.lat);

      counts[def.id] = count;
      totalCalls++;
      await sleep(110);
    }

    results.push({
      code: district.code,
      name: district.name,
      region: district.region,
      lat: district.lat,
      lng: district.lng,
      counts,
    });

    console.log(`   ✅ 완료 (${Object.keys(counts).length}개 카테고리)\n`);
  }

  // 기존 데이터와 병합
  for (const r of results) {
    existingData[r.code] = r;
  }

  // 전체 지역 목록에 맞춰 정렬된 최종 결과 생성
  const finalDistricts = DISTRICTS
    .map((d) => existingData[d.code])
    .filter(Boolean);

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const output = {
    updatedAt: new Date().toISOString(),
    districts: finalDistricts,
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), "utf-8");

  console.log(`✅ 수집 완료!`);
  console.log(`   신규 수집: ${results.length}개 지역 (API ${totalCalls}회)`);
  console.log(`   총 저장: ${finalDistricts.length}개 지역`);
  console.log(`   저장 위치: ${outputPath}`);
}

main().catch((err) => { console.error("❌ 에러:", err); process.exit(1); });
