/**
 * 라이프스타일 데이터 수집 스크립트
 * 카카오 Local REST API로 서울 25개 구별 POI 카운트를 수집합니다.
 *
 * 사용법: npx tsx scripts/collect-lifestyle-data.ts
 *
 * 필요 환경변수: KAKAO_REST_API_KEY (.env.local)
 */

import fs from "fs";
import path from "path";

// ──────────────────────────────────────────────────────────
// 1. 서울 25개 구 중심좌표
// ──────────────────────────────────────────────────────────

const DISTRICTS = [
  { code: "gangnam", name: "강남구", lat: 37.4979, lng: 127.0276 },
  { code: "gangdong", name: "강동구", lat: 37.5301, lng: 127.1238 },
  { code: "gangbuk", name: "강북구", lat: 37.6397, lng: 127.0115 },
  { code: "gangseo", name: "강서구", lat: 37.5510, lng: 126.8495 },
  { code: "gwanak", name: "관악구", lat: 37.4784, lng: 126.9516 },
  { code: "gwangjin", name: "광진구", lat: 37.5385, lng: 127.0824 },
  { code: "guro", name: "구로구", lat: 37.4954, lng: 126.8874 },
  { code: "geumcheon", name: "금천구", lat: 37.4519, lng: 126.8959 },
  { code: "nowon", name: "노원구", lat: 37.6542, lng: 127.0568 },
  { code: "dobong", name: "도봉구", lat: 37.6688, lng: 127.0471 },
  { code: "dongdaemun", name: "동대문구", lat: 37.5744, lng: 127.0396 },
  { code: "dongjak", name: "동작구", lat: 37.5124, lng: 126.9393 },
  { code: "mapo", name: "마포구", lat: 37.5663, lng: 126.9014 },
  { code: "seodaemun", name: "서대문구", lat: 37.5791, lng: 126.9368 },
  { code: "seocho", name: "서초구", lat: 37.4837, lng: 127.0324 },
  { code: "seongdong", name: "성동구", lat: 37.5633, lng: 127.0371 },
  { code: "seongbuk", name: "성북구", lat: 37.5894, lng: 127.0167 },
  { code: "songpa", name: "송파구", lat: 37.5145, lng: 127.1060 },
  { code: "yangcheon", name: "양천구", lat: 37.5170, lng: 126.8664 },
  { code: "yeongdeungpo", name: "영등포구", lat: 37.5264, lng: 126.8963 },
  { code: "yongsan", name: "용산구", lat: 37.5326, lng: 126.9909 },
  { code: "eunpyeong", name: "은평구", lat: 37.6027, lng: 126.9291 },
  { code: "jongno", name: "종로구", lat: 37.5735, lng: 126.9790 },
  { code: "junggu", name: "중구", lat: 37.5641, lng: 126.9979 },
  { code: "jungnang", name: "중랑구", lat: 37.6066, lng: 127.0927 },
];

// ──────────────────────────────────────────────────────────
// 2. 카테고리 검색 정의
// ──────────────────────────────────────────────────────────

interface SearchDef {
  id: string;
  type: "keyword" | "category" | "inverse";
  query: string; // keyword 검색어 또는 category_group_code
}

const SEARCH_DEFS: SearchDef[] = [
  // 자연/환경
  { id: "park", type: "keyword", query: "공원" },
  { id: "mountain", type: "keyword", query: "등산로" },
  { id: "trail", type: "keyword", query: "산책로 둘레길" },
  { id: "bike_road", type: "keyword", query: "자전거도로 자전거길" },

  // 운동/스포츠
  { id: "gym", type: "keyword", query: "헬스장 피트니스" },
  { id: "swimming", type: "keyword", query: "수영장" },
  { id: "yoga", type: "keyword", query: "요가 필라테스" },
  { id: "futsal", type: "keyword", query: "풋살장 축구장" },
  { id: "tennis", type: "keyword", query: "테니스장" },
  { id: "golf", type: "keyword", query: "골프연습장 스크린골프" },
  { id: "climbing", type: "keyword", query: "클라이밍 볼더링" },
  { id: "bowling", type: "keyword", query: "볼링장" },

  // 식음료
  { id: "cafe", type: "category", query: "CE7" },
  { id: "restaurant", type: "category", query: "FD6" },
  { id: "bakery", type: "keyword", query: "베이커리 빵집" },
  { id: "bar", type: "keyword", query: "와인바 칵테일바" },

  // 생활편의
  { id: "convenience", type: "category", query: "CS2" },
  { id: "mart", type: "category", query: "MT1" },
  { id: "market", type: "keyword", query: "전통시장 재래시장" },
  { id: "laundry", type: "keyword", query: "세탁소" },
  { id: "bank", type: "category", query: "BK9" },
  { id: "parking", type: "category", query: "PK6" },

  // 의료/건강
  { id: "hospital", type: "keyword", query: "종합병원" },
  { id: "clinic", type: "category", query: "HP8" },
  { id: "pharmacy", type: "category", query: "PM9" },
  { id: "dentist", type: "keyword", query: "치과" },
  { id: "oriental", type: "keyword", query: "한의원" },

  // 교통
  { id: "subway", type: "category", query: "SW8" },
  { id: "ktx", type: "keyword", query: "KTX 기차역" },

  // 교육/문화
  { id: "school", type: "category", query: "SC4" },
  { id: "academy", type: "category", query: "AC5" },
  { id: "kindergarten", type: "category", query: "PS3" },
  { id: "university", type: "keyword", query: "대학교" },
  { id: "library", type: "keyword", query: "도서관" },
  { id: "bookstore", type: "keyword", query: "서점" },
  { id: "cinema", type: "keyword", query: "영화관 CGV 메가박스 롯데시네마" },
  { id: "museum", type: "keyword", query: "미술관 박물관" },
  { id: "performance", type: "keyword", query: "공연장 극장" },

  // 주거환경/특수 (inverse는 코드에서 역수 처리)
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
const RADIUS = 3000; // 3km 반경

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function searchCategory(
  apiKey: string,
  code: string,
  lng: number,
  lat: number
): Promise<number> {
  const url = `${KAKAO_BASE}/category.json?category_group_code=${code}&x=${lng}&y=${lat}&radius=${RADIUS}&sort=distance&size=1`;
  const res = await fetch(url, {
    headers: { Authorization: `KakaoAK ${apiKey}` },
  });
  if (!res.ok) {
    console.error(`  ❌ category ${code} → ${res.status} ${res.statusText}`);
    return 0;
  }
  const json = await res.json();
  return json.meta?.total_count ?? 0;
}

async function searchKeyword(
  apiKey: string,
  keyword: string,
  lng: number,
  lat: number
): Promise<number> {
  const url = `${KAKAO_BASE}/keyword.json?query=${encodeURIComponent(keyword)}&x=${lng}&y=${lat}&radius=${RADIUS}&sort=distance&size=1`;
  const res = await fetch(url, {
    headers: { Authorization: `KakaoAK ${apiKey}` },
  });
  if (!res.ok) {
    console.error(`  ❌ keyword "${keyword}" → ${res.status} ${res.statusText}`);
    return 0;
  }
  const json = await res.json();
  return json.meta?.total_count ?? 0;
}

// ──────────────────────────────────────────────────────────
// 4. 메인 수집 로직
// ──────────────────────────────────────────────────────────

async function main() {
  // .env.local 수동 파싱 (dotenv 의존성 없이)
  let apiKey = process.env.KAKAO_REST_API_KEY || "";
  if (!apiKey) {
    try {
      const envPath = path.join(process.cwd(), ".env.local");
      const envContent = fs.readFileSync(envPath, "utf-8");
      const match = envContent.match(/KAKAO_REST_API_KEY=(.+)/);
      if (match) apiKey = match[1].trim();
    } catch {
      // ignore
    }
  }

  if (!apiKey) {
    console.error("❌ KAKAO_REST_API_KEY가 .env.local에 없습니다.");
    process.exit(1);
  }

  console.log("🚀 라이프스타일 데이터 수집 시작");
  console.log(`   구: ${DISTRICTS.length}개`);
  console.log(`   카테고리: ${SEARCH_DEFS.length}개`);
  console.log(`   예상 API 호출: ${DISTRICTS.length * SEARCH_DEFS.length}회\n`);

  const results: Array<{
    code: string;
    name: string;
    lat: number;
    lng: number;
    counts: Record<string, number>;
  }> = [];

  let totalCalls = 0;

  for (const district of DISTRICTS) {
    console.log(`📍 ${district.name} (${district.code}) 수집 중...`);
    const counts: Record<string, number> = {};

    for (const def of SEARCH_DEFS) {
      let count: number;

      if (def.type === "category") {
        count = await searchCategory(
          apiKey,
          def.query,
          district.lng,
          district.lat
        );
      } else {
        // keyword & inverse 둘 다 keyword 검색
        count = await searchKeyword(
          apiKey,
          def.query,
          district.lng,
          district.lat
        );
      }

      counts[def.id] = count;
      totalCalls++;

      // 카카오 API rate limit 방지 (초당 10건)
      await sleep(110);
    }

    results.push({
      code: district.code,
      name: district.name,
      lat: district.lat,
      lng: district.lng,
      counts,
    });

    console.log(`   ✅ 완료 (${Object.keys(counts).length}개 카테고리)\n`);
  }

  // JSON 저장
  const outputDir = path.join(process.cwd(), "public", "data");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const output = {
    updatedAt: new Date().toISOString(),
    districts: results,
  };

  const outputPath = path.join(outputDir, "lifestyle-scores.json");
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), "utf-8");

  console.log(`✅ 수집 완료!`);
  console.log(`   총 API 호출: ${totalCalls}회`);
  console.log(`   저장 위치: ${outputPath}`);

  // 요약 출력
  console.log("\n📊 구별 샘플 데이터:");
  for (const r of results.slice(0, 3)) {
    console.log(`   ${r.name}: cafe=${r.counts.cafe}, gym=${r.counts.gym}, subway=${r.counts.subway}, park=${r.counts.park}`);
  }
}

main().catch((err) => {
  console.error("❌ 에러 발생:", err);
  process.exit(1);
});
